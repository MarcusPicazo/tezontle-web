// Aviso de "sigue bajando": aparece cuando el usuario deja de hacer scroll (sin terminar el
// recorrido) y se esconde apenas lo retoma. Esto sí necesita un listener de scroll de verdad
// (Lenis dispara su propio evento "scroll"; el nativo queda de respaldo): no hay forma de
// detectar "se detuvo" con IntersectionObserver, que solo ve posición, no inactividad.
const IDLE_MS = 2200;
const BOTTOM_MARGIN = 80;

export function initScrollHint() {
  const hint = document.getElementById('scroll-hint');
  if (!hint) return;

  let idleTimer: ReturnType<typeof setTimeout> | undefined;

  const nearBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_MARGIN;

  const show = () => {
    if (nearBottom()) return;
    hint.classList.add('is-visible');
  };
  const hide = () => hint.classList.remove('is-visible');

  const scheduleIdle = () => {
    hide();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(show, IDLE_MS);
  };

  window.tezontleLenis?.on('scroll', scheduleIdle);
  window.addEventListener('scroll', scheduleIdle, { passive: true });
  scheduleIdle();
}
