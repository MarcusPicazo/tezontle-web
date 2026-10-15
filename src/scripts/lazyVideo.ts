// Videos de "El paquete" (SPEC): preload="none" hasta acercarse, reproducción solo en
// pantalla, pausados fuera. Nunca se inicializa en modo .stills (Layout.astro ya decidió
// que este visitante no ve video): ahí basta con el póster quieto.
export function initLazyVideos() {
  const videos = [...document.querySelectorAll<HTMLVideoElement>('[data-lazy-video]')];
  if (!videos.length) return;

  const loadNear = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const video = entry.target as HTMLVideoElement;
        const source = video.querySelector('source[data-src]');
        const src = source?.getAttribute('data-src');
        if (src) {
          source?.setAttribute('src', src);
          video.load();
        }
        loadNear.unobserve(video);
      }
    },
    { rootMargin: '150% 0px' },
  );

  const playInView = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }
    },
    { threshold: 0.4 },
  );

  videos.forEach((video) => {
    loadNear.observe(video);
    playInView.observe(video);
  });
}
