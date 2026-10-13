import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    // Nombre distinto a window.lenis: esa global ya la declara el propio paquete lenis
    // con otro tipo (version/horizontal/snap/touch), no es la instancia.
    tezontleLenis?: Lenis;
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
