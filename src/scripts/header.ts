import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { switchLanguage } from './i18n';

// Ease-in-out suave para toda navegación que dispare el header (logo y enlaces de sección):
// el "anchors: true" de Lenis (src/scripts/motion.ts) por sí solo usa su ease-out por
// defecto (arranca a toda velocidad), no la aceleración y desaceleración que pidió el
// usuario. Mismo helper para los tres casos de abajo.
const easeInOutSoft = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Intercepta el clic del propio <a> (fase de burbuja, antes de llegar a window) y detiene
// la propagación: si no, el listener de clics de Lenis (anchors: true, agregado en window)
// vuelve a procesar el mismo href con SU ease por defecto justo después del nuestro.
function initSmoothNav() {
  const lenis = window.tezontleLenis;
  if (!lenis) return; // reduced-motion: no hay instancia, se deja el salto nativo tal cual

  const goTo = (target: number | HTMLElement) => {
    lenis.scrollTo(target, { duration: 1.2, easing: easeInOutSoft });
  };

  const logoLink = document.getElementById('header-logo-link');
  logoLink?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(0);
  });

  document.querySelectorAll<HTMLAnchorElement>('#site-header nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href')?.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;
      event.preventDefault();
      event.stopPropagation();

      if (id === 'cierre') {
        // Escena 9: fijada (Scene.astro, min-h-[250dvh]), con los botones ligados al
        // PROGRESO del scroll dentro del fijado (cierrePin.ts), no a si la sección ya
        // entró en pantalla. Saltar solo a la cima del fijado deja progreso 0, es decir
        // los botones todavía ocultos — por eso "Contacto" no los mostraba. 0.95 cae
        // después de BUTTONS_END (0.9) con margen, sin depender del último pixel exacto.
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollDistance = section.offsetHeight - window.innerHeight;
        goTo(sectionTop + 0.95 * scrollDistance);
      } else {
        goTo(section);
      }
    });
  });
}

// Header flotante (SPEC, técnica de E:\referencias\taylor-website\js\animations.js): vidrio
// esmerilado al pasar 50px de scroll, transparente arriba. Mismo patrón que el resto del
// sitio: toggleClass en vez de un listener de scroll a mano. Una sola apariencia siempre,
// igual que la referencia: no cambia de tinte según la escena de atrás.
export function initHeader(reduceMotion: boolean) {
  const header = document.getElementById('site-header');
  if (!header) return;

  initSmoothNav();

  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: { className: 'floating-nav', targets: header },
  });

  // Panel de idioma: una tarjeta propia anclada bajo el botón (LanguageSwitch.astro hace la
  // transición entera en CSS, con opacidad y escala — no hace falta GSAP aquí), no el header
  // completo expandiéndose.
  const trigger = document.getElementById('lang-trigger');
  const panel = document.getElementById('lang-panel');
  if (!trigger || !panel) return;

  let open = false;

  const setOpen = (next: boolean) => {
    if (open === next) return;
    open = next;
    header.classList.toggle('panel-open', open);
    trigger.setAttribute('aria-expanded', String(open));
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
