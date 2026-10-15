import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Key = { y: number; v: number };

// Interpola un valor por tramos según la posición de scroll.
const piecewise = (y: number, keys: Key[]) => {
  if (y <= keys[0].y) return keys[0].v;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (y <= b.y) return a.v + (b.v - a.v) * ((y - a.y) / (b.y - a.y || 1));
  }
  return keys[keys.length - 1].v;
};

const clamp = gsap.utils.clamp(0, 1);
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

// Recorrido con video (SPEC §4): el scroll mueve los clips (o los fotogramas, mientras el
// clip no ha cargado) entre las paradas de un <section data-world>. Misma técnica que
// E:\arko-landing\src\scripts\world.ts, copiada y recortada a lo que este sitio necesita: sin
// raíl ni "desliza para ver más" propios (ya los tiene el sitio) y sin foco variable por
// parada (el encuadre no cambia entre fotogramas, SPEC §4). `w` es la posición en el
// recorrido: 0 en la primera parada, 1 en la segunda, etc. Sin clips cargados, igual funciona:
// solo hace el crossfade/zoom entre fotogramas fijos.
export function initScrollWorld(world: HTMLElement, reduceMotion: boolean) {
  const stage = world.querySelector<HTMLElement>('[data-stage]');
  if (!stage) return;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-scene]')];
  const frames = [...stage.querySelectorAll<HTMLElement>('[data-frame]')];
  const clips = [...stage.querySelectorAll<HTMLVideoElement>('[data-clip]')];
  if (!stops.length) return;

  const marks = stops.map((stop) => ScrollTrigger.create({ trigger: stop, start: 'top top' }));
  const ready = clips.map(() => false);
  let w = 0;
  let active = 0;
  let shown = -1;
  let time = 0;

  // El clip del tramo entra en cuanto ha buscado su fotograma. Si aún no ha cargado, los
  // fotogramas fijos siguen viéndose. Sin clips, este bloque nunca se activa.
  const show = () => {
    if (shown !== active) {
      shown = active;
      clips.forEach((clip, i) => clip.classList.toggle('is-shown', i === active));
    }
    stage.dataset.mode = 'video';
  };

  const sync = () => {
    const clip = clips[active];
    if (!clip || !ready[active]) {
      delete stage.dataset.mode;
      return;
    }
    if (clip.seeking) return;
    if (Math.abs(clip.currentTime - time) > 0.01) clip.currentTime = time;
    else show();
  };

  clips.forEach((clip, i) =>
    clip.addEventListener('seeked', () => {
      if (i !== active) return;
      show();
      sync();
    }),
  );

  const render = (self: ScrollTrigger) => {
    const y = self.scroll();
    w = piecewise(y, [...marks.map((mark, i) => ({ y: mark.start, v: i })), { y: self.end, v: stops.length }]);

    // Fotogramas: cada uno está entero y sin escalar justo en su parada. Aparece en la
    // segunda mitad del tramo anterior y se acerca un poco al avanzar.
    frames.forEach((frame, i) => {
      frame.style.opacity = String(i === 0 ? 1 : clamp((w - i + 0.5) / 0.5));
      if (!reduceMotion) frame.style.transform = `scale(${1 + 0.06 * clamp(w - i)})`;
    });

    if (!clips.length) return;
    active = Math.min(clips.length - 1, Math.floor(w));
    const { duration } = clips[active];
    if (ready[active]) time = Math.min((w - active) * duration, duration - 0.05);
    sync();
  };

  const span = ScrollTrigger.create({
    trigger: world,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: render,
    onRefresh: render,
  });
  render(span);

  // Con movimiento reducido o ahorro de datos no hay nada que precargar (SPEC §4): los
  // fotogramas fijos ya alcanzan para ver el recorrido.
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (!clips.length || reduceMotion || saveData) return;

  // Los clips se cargan de uno en uno: primero el del tramo actual y después el más
  // cercano a la posición del scroll.
  const distance = (i: number) => {
    if (i === active) return -1;
    if (i > w) return i - w;
    return w - (i + 1) + 0.5;
  };
  const queue = clips.map((_, i) => i);

  const loadNext = async (): Promise<void> => {
    queue.sort((a, b) => distance(a) - distance(b));
    const i = queue.shift();
    if (i === undefined) return;
    const clip = clips[i];
    const src = (isMobile() ? clip.dataset.srcMobile : clip.dataset.srcDesktop) ?? '';
    clip.preload = 'auto';

    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(res.statusText);
      clip.src = URL.createObjectURL(await res.blob());
    } catch {
      clip.src = src;
    }

    const loaded = await new Promise<boolean>((resolve) => {
      clip.addEventListener('loadeddata', () => resolve(true), { once: true });
      clip.addEventListener('error', () => resolve(false), { once: true });
    });
    if (loaded) {
      // iOS no pinta los fotogramas buscados hasta que el video se ha reproducido una vez.
      await clip.play().catch(() => {});
      clip.pause();
      ready[i] = true;
      render(span);
    }
    loadNext();
  };

  // La página puede tener más de un mundo (SPEC §3: escenas 1-3 y escena 9) y no todos
  // están arriba, así que cada uno solo empieza a precargar sus clips al acercarse a la
  // pantalla, no al cargar la página.
  const proximity = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      proximity.disconnect();
      loadNext();
    },
    { rootMargin: '50% 0px' },
  );
  proximity.observe(world);
}
