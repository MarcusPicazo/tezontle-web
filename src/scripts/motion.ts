import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollWorld } from './scrollWorld';
import { initHeader } from './header';
import { initI18n } from './i18n';
import { initScrollHint } from './scrollHint';
import { initCierrePin } from './cierrePin';
import { initLazyVideos } from './lazyVideo';
import { initContactForm } from './contactForm';
import { sceneToGroup, type SceneId } from '../data/scenes';

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
// [data-pin-reveal] no usa este observer: entra con el scroll dentro de un fijado, más abajo.
document.querySelectorAll('[data-reveal]:not([data-pin-reveal])').forEach((el) => reveal.observe(el));

initI18n();
initHeader(reduceMotion);
initScrollHint();

// Recorridos con video (SPEC §3 y §4): la página puede tener más de uno. En modo capturas
// fijas (ver Layout.astro) no se inicializan: ya se ven las imágenes fijas de cada escena.
if (!document.documentElement.classList.contains('stills')) {
  document.querySelectorAll<HTMLElement>('[data-world]').forEach((world) => initScrollWorld(world, reduceMotion));
  initLazyVideos();
}

initContactForm();

// Raíl de progreso + enlaces del header: un solo observer prende el punto del raíl Y el
// enlace del header a la vez (mismo grupo, src/data/scenes.ts: sceneToGroup), según qué
// escena esté en el centro de la pantalla.
const railDots = new Map<string, HTMLElement>();
document.querySelectorAll<HTMLElement>('[data-rail-dot]').forEach((dot) => {
  const group = dot.dataset.railDot;
  if (group) railDots.set(group, dot);
});

const navLinks = new Map<string, HTMLElement>();
document.querySelectorAll<HTMLElement>('[data-nav-link]').forEach((link) => {
  const group = link.dataset.navLink;
  if (group) navLinks.set(group, link);
});

const scenes = document.querySelectorAll<HTMLElement>('[data-scene]');
if (scenes.length && (railDots.size || navLinks.size)) {
  const progress = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const group = sceneToGroup[entry.target.id as SceneId];
        if (!group) continue;
        railDots.get(group)?.classList.toggle('is-active', entry.isIntersecting);
        navLinks.get(group)?.classList.toggle('is-active', entry.isIntersecting);
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  scenes.forEach((scene) => progress.observe(scene));
}

// Escena 9: va fijada (Scene.astro con `pin`) para que clip-3 tenga scroll de sobra y se
// note el cambio de luz. Título palabra por palabra, línea de progreso y entrada de los
// botones, todo ligado al scroll (src/scripts/cierrePin.ts).
initCierrePin(reduceMotion);

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
