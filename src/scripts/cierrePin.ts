import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const clamp = gsap.utils.clamp(0, 1);

// Escena 9 (fijada ~250dvh en Scene.astro): el título entra palabra por palabra ligado al
// scroll —no de golpe— y sube unos 40px mientras avanza el atardecer; debajo, una línea
// marca el progreso del video de 0 a 100%; los botones entran en el último 25%. Todo se
// recalcula en cada evento de scroll (scrub), así que es reversible sin nada especial.
const TITLE_WORD_BAND = 0.22; // fracción del fijado en la que terminan de entrar las palabras
const TITLE_RISE_END = 0.75; // hasta dónde sigue subiendo el título
const TITLE_RISE_PX = 40;
const BUTTONS_START = 0.75; // empiezan a entrar en el último 25%
const BUTTONS_END = 0.9; // pero ya quedan nítidos antes del final: no debe depender de llegar al último pixel del scroll
const BUTTONS_RISE_PX = 12;
const BUTTONS_BLUR_PX = 12;

let words: HTMLElement[] = [];

// El título es .i18n-text (T.astro): cada cambio de idioma reemplaza su innerHTML entero y
// se lleva estos <span> por delante, así que hay que rearmarlos después (ver el listener de
// "tezontle:langswitch" más abajo, que dispara src/scripts/i18n.ts al terminar el barrido).
function splitWords(el: HTMLElement) {
  const text = el.textContent ?? '';
  words = text.split(/\s+/).filter(Boolean).map((word) => {
    const span = document.createElement('span');
    span.className = 'cierre-word';
    span.style.display = 'inline-block';
    span.textContent = word;
    return span;
  });
  el.replaceChildren();
  words.forEach((span, i) => {
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

export function initCierrePin(reduceMotion: boolean) {
  const section = document.getElementById('cierre');
  const title = document.getElementById('cierre-title');
  const progressFill = document.getElementById('cierre-progress-fill');
  const buttons = document.getElementById('cierre-buttons');
  if (!section) return;

  // Con prefers-reduced-motion: sin palabra por palabra, solo el fundido simple que ya trae
  // [data-reveal] (SPEC). La línea de progreso sigue el scroll de todos modos: es un cambio
  // de ancho suave, no el tipo de movimiento que reduced-motion busca evitar.
  if (reduceMotion) {
    title?.classList.add('is-in');
    buttons?.classList.add('is-in');
  } else if (title) {
    splitWords(title);
    window.addEventListener('tezontle:langswitch', () => splitWords(title));
    // [data-reveal] trae transition: opacity/transform/filter 1000ms (global.css): sin
    // quitarla, cada cambio ligado al scroll queda "persiguiendo" el valor en vez de
    // seguirlo al instante, y el título/los botones van a destiempo del scroll real.
    title.style.transition = 'none';
    gsap.set(title, { opacity: 1, filter: 'none' }); // limpia el estado inicial de [data-reveal]
    if (buttons) {
      buttons.style.transition = 'none';
      gsap.set(buttons, { autoAlpha: 0, y: BUTTONS_RISE_PX, filter: `blur(${BUTTONS_BLUR_PX}px)` });
    }
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      if (progressFill) progressFill.style.width = `${progress * 100}%`;
      if (reduceMotion) return;

      words.forEach((word, i) => {
        const start = (i / words.length) * TITLE_WORD_BAND;
        const end = ((i + 1) / words.length) * TITLE_WORD_BAND;
        const local = clamp((progress - start) / (end - start || 1));
        word.style.opacity = String(local);
        word.style.transform = `translateY(${(1 - local) * 12}px)`;
      });

      if (title) title.style.transform = `translateY(${-TITLE_RISE_PX * clamp(progress / TITLE_RISE_END)}px)`;

      if (buttons) {
        const buttonProgress = clamp((progress - BUTTONS_START) / (BUTTONS_END - BUTTONS_START));
        if (buttonProgress >= 1) {
          // 'none' explícito, no clearProps: [data-reveal] trae su propio filter:blur(12px)
          // en la hoja global (nunca le llega [data-reveal].is-in a este elemento), así que
          // quitar el estilo en línea solo deja ver esa regla de nuevo — quedaba borroso otra
          // vez justo cuando debía verse nítido.
          gsap.set(buttons, { autoAlpha: 1, y: 0, filter: 'none' });
        } else {
          gsap.set(buttons, {
            autoAlpha: buttonProgress,
            y: (1 - buttonProgress) * BUTTONS_RISE_PX,
            filter: `blur(${(1 - buttonProgress) * BUTTONS_BLUR_PX}px)`,
          });
        }
      }
    },
  });
}
