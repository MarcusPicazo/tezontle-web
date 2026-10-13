// La decisión de usar capturas fijas (SPEC §4) ya se tomó de forma síncrona en el
// <script is:inline> de Layout.astro (clase "stills" en <html>), para que no haya
// parpadeo. Aquí solo se lee esa decisión: si no aplica, se importa dinámicamente el
// motor 3D (React, react-dom, three.js, R3F, drei) — así quien tiene ahorro de datos,
// gama baja o prefers-reduced-motion nunca descarga ese bundle.
declare global {
  interface Window {
    $RefreshReg$?: (type: unknown, id: string) => void;
    $RefreshSig$?: () => (type: unknown) => unknown;
    __vite_plugin_react_preamble_installed__?: boolean;
  }
}

async function mount() {
  // Solo en dev: @vitejs/plugin-react espera que su "preamble" de Fast Refresh ya esté
  // instalado antes de cargar cualquier .tsx. Astro lo instala automáticamente para los
  // componentes con client:*, pero este archivo carga TowerCanvas con un import()
  // manual (a propósito, para no descargarlo en el fallback de capturas), así que hay
  // que instalarlo a mano. En producción esta rama ni se incluye en el bundle.
  if (import.meta.env.DEV) {
    // @ts-expect-error — módulo virtual de Vite en dev, sin tipos ni resolución estática.
    const refresh = await import(/* @vite-ignore */ '/@react-refresh');
    refresh.injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  }

  const root = document.getElementById('tower-canvas-root');
  if (!root) return;

  const [{ createElement }, { createRoot }, { default: TowerCanvas }] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('../three/TowerCanvas'),
  ]);
  createRoot(root).render(createElement(TowerCanvas));
}

if (!document.documentElement.classList.contains('stills')) {
  mount();
}
