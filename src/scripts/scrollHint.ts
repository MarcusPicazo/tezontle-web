// Aviso de "siga bajando" (técnica de E:\referencias\taylor-website\js\main.js
// initScrollHint): un setInterval simple cada 200ms, no una animación por frame — solo hace
// falta revisar unas pocas veces por segundo. Esto sí necesita un listener de scroll de
// verdad: no hay forma de detectar "dejó de moverse" con IntersectionObserver, que solo ve
// posición, no inactividad.
const IDLE_MS = 1000;
const BOTTOM_MARGIN = 4;

export function initScrollHint() {
  const hint = document.getElementById('scroll-hint');
  const textEl = document.getElementById('scroll-hint-text') as HTMLElement | null;
  const heroEl = document.getElementById('presentacion');
  if (!hint || !textEl || !heroEl) return;

  // Escenas oscuras (la banda noche y la piedra, Scene.astro con `dark`): el aviso pasa a
  // cal mientras alguna toca la franja de abajo, donde vive el aviso — no el centro de la
  // pantalla como el raíl de progreso.
  const darkScenes = document.querySelectorAll<HTMLElement>('[data-dark-scene]');
  if (darkScenes.length) {
    const darkObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            hint.classList.add('is-dark');
            return;
          }
        }
        hint.classList.remove('is-dark');
      },
      { rootMargin: '-90% 0px 0px 0px' },
    );
    darkScenes.forEach((scene) => darkObserver.observe(scene));
  }

  // Hero vs. resto del recorrido: cambia qué par data-es/data-en lleva el span, para que el
  // barrido de cambio de idioma (src/scripts/i18n.ts) tome el texto correcto sin más — este
  // elemento es .i18n-text como cualquier otro, solo que el par activo cambia con el scroll.
  let inHero: boolean | undefined;
  const updateLabel = () => {
    const nowInHero = heroEl.getBoundingClientRect().bottom > window.innerHeight * 0.5;
    if (nowInHero === inHero) return;
    inHero = nowInHero;
    const esLabel = nowInHero ? textEl.dataset.heroEs : textEl.dataset.restEs;
    const enLabel = nowInHero ? textEl.dataset.heroEn : textEl.dataset.restEn;
    if (!esLabel || !enLabel) return;
    textEl.dataset.es = esLabel;
    textEl.dataset.en = enLabel;
    const lang = document.documentElement.lang.startsWith('es') ? 'es' : 'en';
    textEl.textContent = lang === 'es' ? esLabel : enLabel;
  };

  let lastScrollTime = performance.now();
  window.addEventListener('scroll', () => { lastScrollTime = performance.now(); }, { passive: true });

  setInterval(() => {
    const idle = performance.now() - lastScrollTime > IDLE_MS;
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_MARGIN;
    const shouldShow = idle && !atBottom;
    hint.style.opacity = shouldShow ? '1' : '0';
    if (shouldShow) updateLabel();
  }, 200);
}
