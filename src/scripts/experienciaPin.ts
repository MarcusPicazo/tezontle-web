import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const clamp = gsap.utils.clamp(0, 1);

// Escena B (fijada ~180dvh en Scene.astro): la torre sube piso por piso durante todo el
// fijado (clip-2, ScrollWorld ya la liga al scroll de esta escena); el celular y el globo
// de WhatsApp entran DESPUÉS, en orden, para que se sienta como una sola pantalla con una
// secuencia y no dos escenas encimadas. Mismo patrón que cierrePin.ts: filter:'none'
// explícito al terminar (no clearProps), porque [data-reveal] no aplica aquí y no hace
// falta, pero el motivo de fondo es el mismo: un estilo en línea que se limpia de más
// siempre deja ver algo que no debería.
const PHONE_START = 0.5;
const PHONE_END = 0.7;
const WHATSAPP_START = 0.72;
const WHATSAPP_END = 0.92;
const RISE_PX = 16;
const BLUR_PX = 10;

function setProgress(el: HTMLElement, start: number, end: number, progress: number) {
  const local = clamp((progress - start) / (end - start));
  if (local >= 1) {
    gsap.set(el, { autoAlpha: 1, y: 0, filter: 'none' });
  } else {
    gsap.set(el, { autoAlpha: local, y: (1 - local) * RISE_PX, filter: `blur(${(1 - local) * BLUR_PX}px)` });
  }
}

export function initExperienciaPin(reduceMotion: boolean) {
  const section = document.getElementById('experiencia');
  const phone = document.getElementById('experiencia-phone');
  const whatsapp = document.getElementById('experiencia-whatsapp');
  if (!section || !phone || !whatsapp) return;

  if (reduceMotion) {
    phone.classList.add('is-in');
    whatsapp.classList.add('is-in');
    return;
  }

  [phone, whatsapp].forEach((el) => {
    el.style.transition = 'none';
    gsap.set(el, { autoAlpha: 0, y: RISE_PX, filter: `blur(${BLUR_PX}px)` });
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      setProgress(phone, PHONE_START, PHONE_END, self.progress);
      setProgress(whatsapp, WHATSAPP_START, WHATSAPP_END, self.progress);
    },
  });
}
