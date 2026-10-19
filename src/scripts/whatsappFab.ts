import { gsap } from 'gsap';

// Botón flotante de WhatsApp: entra con un pequeño rebote (back.out) después de la carga,
// no de golpe ni junto con el resto de las revelaciones de la escena 1. Con
// prefers-reduced-motion no se anima, solo aparece (ya es visible por defecto en CSS).
export function initWhatsappFab(reduceMotion: boolean) {
  const fab = document.getElementById('whatsapp-fab');
  if (!fab || reduceMotion) return;

  gsap.fromTo(
    fab,
    { opacity: 0, scale: 0, y: 16 },
    { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 1, ease: 'back.out(1.7)' },
  );
}
