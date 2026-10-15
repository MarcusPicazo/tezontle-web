import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollWorld } from './scrollWorld';

declare global {
  interface Window {
    // Nombre distinto a window.lenis: esa global ya la declara el propio paquete lenis
    // con otro tipo (version/horizontal/snap/touch), no es la instancia.
    tezontleLenis?: Lenis;
    plausible?: (eventName: string, options?: Record<string, unknown>) => void;
  }
}

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll suave sincronizado con ScrollTrigger. El recorrido depende del scroll real,
// así que esto solo suaviza el gesto, nunca lo reemplaza.
if (!reduceMotion) {
  const lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.tezontleLenis = lenis;
}

// Entradas al hacer scroll: IntersectionObserver, nunca un listener de scroll.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

// Recorridos con video (SPEC §3 y §4): la página puede tener más de uno. En modo capturas
// fijas (ver Layout.astro) no se inicializan: ya se ven las imágenes fijas de cada escena.
if (!document.documentElement.classList.contains('stills')) {
  document.querySelectorAll<HTMLElement>('[data-world]').forEach((world) => initScrollWorld(world, reduceMotion));
}

// Raíl de progreso: marca el punto activo según la escena visible en el centro de la pantalla.
const railDots = new Map<string, HTMLElement>();
document.querySelectorAll<HTMLElement>('[data-rail-dot]').forEach((dot) => {
  const target = dot.dataset.railDot;
  if (target) railDots.set(target, dot);
});

const scenes = document.querySelectorAll<HTMLElement>('[data-scene]');
if (scenes.length && railDots.size) {
  const progress = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const dot = railDots.get(entry.target.id);
        if (!dot) continue;
        dot.classList.toggle('is-active', entry.isIntersecting);
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  scenes.forEach((scene) => progress.observe(scene));
}

// Punto de la fila enfocada en el mockup de laptop (escena 5): pasa de "disponible" a
// "vendida" con el mismo scroll que recorre la escena.
const focusDot = document.getElementById('panel-focus-dot');
if (focusDot && !reduceMotion) {
  const AVAILABLE_RGB = [79, 157, 110];
  const SOLD_RGB = [92, 89, 85];
  const lerpChannel = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

  ScrollTrigger.create({
    trigger: '#vendido',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const [r, g, b] = AVAILABLE_RGB.map((channel, i) => lerpChannel(channel, SOLD_RGB[i], self.progress));
      focusDot.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    },
  });
}

// Analítica ligera (SPEC §7): eventos de conversión en Plausible. Nombres de evento en
// inglés a propósito — es la convención habitual de Plausible/analítica, no texto de
// cara al visitante, así que no vive en src/i18n.
document.querySelectorAll<HTMLElement>('[data-analytics-event]').forEach((el) => {
  el.addEventListener('click', () => {
    const eventName = el.dataset.analyticsEvent;
    if (eventName) window.plausible?.(eventName);
  });
});
