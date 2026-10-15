import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { switchLanguage } from './i18n';

// Header flotante (SPEC, técnica de E:\referencias\taylor-website\js\animations.js): vidrio
// esmerilado al pasar 50px de scroll, transparente arriba. Mismo patrón que el resto del
// sitio: toggleClass en vez de un listener de scroll a mano. Una sola apariencia siempre,
// igual que la referencia: no cambia de tinte según la escena de atrás.
export function initHeader(reduceMotion: boolean) {
  const header = document.getElementById('site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'floating-nav', targets: header },
  });

  // Panel de idioma: el propio header se expande (SPEC), no un menú flotante encima.
  const trigger = document.getElementById('lang-trigger');
  const panel = document.getElementById('lang-panel');
  if (!trigger || !panel) return;

  let open = false;

  const setOpen = (next: boolean) => {
    if (open === next) return;
    open = next;
    header.classList.toggle('panel-open', open);
    trigger.setAttribute('aria-expanded', String(open));

    if (reduceMotion) {
      gsap.set(panel, { height: open ? 'auto' : 0 });
      return;
    }
    if (open) {
      gsap.fromTo(panel, { height: 0 }, { height: panel.scrollHeight, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(panel, { height: 0, duration: 0.4, ease: 'power3.in' });
    }
  };

  trigger.addEventListener('click', () => setOpen(!open));

  document.addEventListener('click', (event) => {
    if (!open) return;
    const target = event.target as Node;
    if (header.contains(target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !open) return;
    setOpen(false);
    trigger.focus();
  });

  panel.querySelectorAll<HTMLButtonElement>('[data-lang-option]').forEach((option) => {
    option.addEventListener('click', () => {
      const lang = option.dataset.langOption as 'es' | 'en' | undefined;
      if (!lang) return;
      switchLanguage(lang, reduceMotion);
      setOpen(false);
    });
  });
}
