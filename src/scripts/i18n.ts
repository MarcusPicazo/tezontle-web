import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

declare global {
  interface Window {
    tezontleLenis?: Lenis;
  }
}

const STORAGE_KEY = 'tezontle-lang';
const HTML_LANG = { es: 'es-MX', en: 'en' };

let currentLang: 'es' | 'en' = (document.documentElement.lang === 'en' ? 'en' : 'es') as 'es' | 'en';

// Delay explícito por elemento según su posición horizontal real en pantalla (izquierda
// primero), no el stagger por eje de GSAP (con decenas de elementos repartidos en toda la
// página, no barre de forma perceptible). Misma técnica que
// E:\referencias\taylor-website\js\i18n.js (leftToRightDelays).
const leftToRightDelays = (elements: Element[], totalSpread: number) => {
  const sorted = [...elements].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
  const n = sorted.length;
  const delays = new Map<Element, number>();
  sorted.forEach((el, i) => delays.set(el, n > 1 ? (i / (n - 1)) * totalSpread : 0));
  return (_i: number, target: Element) => delays.get(target) ?? 0;
};

// Cambia el texto de un elemento y anima lo que cambie de tamaño en vez de dejarlo saltar
// de golpe: un botón de ancho "auto" (p. ej. "Ver la demo"/"See the demo") anima su ancho;
// un párrafo o viñeta que pasa a ocupar otro número de líneas en el otro idioma (el inglés
// y el español casi nunca miden lo mismo) anima su alto — si no, todo lo que viene debajo
// (viñetas, botón) se reacomoda de golpe y se pierde la sensación de orden del sitio.
// clearProps al terminar para que el elemento vuelva a medirse solo (si no, quedaría fijo
// en píxeles y no respondería bien a un cambio de layout más adelante, como un resize).
const swapText = (el: HTMLElement, lang: 'es' | 'en') => {
  const html = lang === 'es' ? el.dataset.es : el.dataset.en;
  if (html === undefined) return;

  const btn = el.closest<HTMLElement>('.btn');
  if (btn) {
    const oldWidth = btn.getBoundingClientRect().width;
    el.innerHTML = html;
    const newWidth = btn.getBoundingClientRect().width;
    gsap.fromTo(btn, { width: oldWidth }, { width: newWidth, duration: 0.5, ease: 'power2.inOut', clearProps: 'width' });
    return;
  }

  const oldHeight = el.getBoundingClientRect().height;
  el.innerHTML = html;
  const newHeight = el.getBoundingClientRect().height;
  if (Math.abs(newHeight - oldHeight) > 1) {
    gsap.fromTo(
      el,
      { height: oldHeight, overflow: 'hidden' },
      { height: newHeight, duration: 0.45, ease: 'power2.inOut', clearProps: 'height,overflow' },
    );
  }
};

const updateAria = (lang: 'es' | 'en') => {
  document.querySelectorAll<HTMLElement>('[data-aria-es]').forEach((el) => {
    const value = lang === 'es' ? el.dataset.ariaEs : el.dataset.ariaEn;
    if (value) el.setAttribute('aria-label', value);
  });
};

const updateTrigger = (lang: 'es' | 'en') => {
  const flag = document.getElementById('lang-trigger-flag') as HTMLImageElement | null;
  const code = document.getElementById('lang-trigger-code');
  if (flag) flag.src = (lang === 'es' ? flag.dataset.flagEs : flag.dataset.flagEn) ?? flag.src;
  if (code) code.textContent = lang === 'es' ? (code.dataset.codeEs ?? 'ES') : (code.dataset.codeEn ?? 'EN');
  document.querySelectorAll<HTMLElement>('[data-lang-option]').forEach((opt) => {
    opt.setAttribute('aria-selected', String(opt.dataset.langOption === lang));
  });
};

const finishSwitch = (lang: 'es' | 'en') => {
  currentLang = lang;
  document.documentElement.lang = HTML_LANG[lang];
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Privado/bloqueado: el cambio de idioma sigue funcionando, solo no se recuerda.
  }
  // El cambio de idioma altera la altura de secciones enteras (ES suele ser más largo que
  // EN). Sin avisarle a Lenis, su scroll virtual queda con las medidas viejas y el resto del
  // recorrido con scroll se desincroniza de ahí en adelante.
  window.tezontleLenis?.resize();
  ScrollTrigger.refresh();
  // Algunos elementos reconstruyen su contenido tras el barrido (p. ej. las palabras sueltas
  // del título de la escena 9, ver src/scripts/cierrePin.ts): el innerHTML ya quedó en el
  // idioma nuevo arriba, así que este es el momento correcto para que lo vuelvan a armar.
  window.dispatchEvent(new Event('tezontle:langswitch'));
};

export function switchLanguage(newLang: 'es' | 'en', reduceMotion: boolean) {
  if (newLang === currentLang) return;
  const elements = [...document.querySelectorAll<HTMLElement>('.i18n-text')];

  updateTrigger(newLang);

  if (reduceMotion) {
    gsap.to(elements, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        elements.forEach((el) => swapText(el, newLang));
        updateAria(newLang);
        gsap.to(elements, { opacity: 1, duration: 0.2, onComplete: () => finishSwitch(newLang) });
      },
    });
    return;
  }

  // Barrido de salida (izquierda → derecha), igual que la referencia de Taylor.
  gsap.set(elements, { willChange: 'clip-path' });
  gsap.to(elements, {
    clipPath: 'inset(0% 0% 0% 100%)',
    duration: 0.55,
    ease: 'sine.inOut',
    stagger: leftToRightDelays(elements, 0.55),
    onComplete: () => {
      elements.forEach((el) => swapText(el, newLang));
      updateAria(newLang);

      // Prepara el barrido de entrada, ya con las posiciones recalculadas (el texto nuevo
      // puede tener otro ancho/alto).
      gsap.set(elements, { clipPath: 'inset(0% 100% 0% 0%)' });
      gsap.to(elements, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.65,
        ease: 'sine.inOut',
        stagger: leftToRightDelays(elements, 0.55),
        onComplete: () => {
          gsap.set(elements, { clearProps: 'clipPath,willChange' });
          finishSwitch(newLang);
        },
      });
    },
  });
}

export function initI18n() {
  // Preferencia guardada (SPEC): si no coincide con el idioma servido, se aplica una vez,
  // sin barrido (es la primera pintura de la página, no un cambio que el usuario está viendo).
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if ((saved === 'es' || saved === 'en') && saved !== currentLang) {
      const lang = saved;
      document.querySelectorAll<HTMLElement>('.i18n-text').forEach((el) => {
        const html = lang === 'es' ? el.dataset.es : el.dataset.en;
        if (html !== undefined) el.innerHTML = html;
      });
      updateAria(lang);
      updateTrigger(lang);
      document.documentElement.lang = HTML_LANG[lang];
      currentLang = lang;
    }
  } catch {
    // Privado/bloqueado: se queda con el idioma que sirvió el servidor.
  }
}
