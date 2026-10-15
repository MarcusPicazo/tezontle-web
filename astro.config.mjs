// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Placeholder hasta tener el dominio real (SPEC §7: usado para canonical, hreflang,
  // sitemap y Open Graph). Debe coincidir con site.ts → siteUrl.
  site: 'https://tezontle3d.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
