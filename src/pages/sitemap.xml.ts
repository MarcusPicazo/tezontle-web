import type { APIRoute } from 'astro';
import { siteUrl } from '../data/site';

// Páginas reales del sitio con su par de idioma (SPEC §7: sitemap + hreflang). Si se
// agrega una página nueva, agregarla aquí también.
const pages: { es: string; en: string }[] = [
  { es: '/', en: '/en/' },
  { es: '/privacidad', en: '/en/privacy' },
];

function url(path: string): string {
  return new URL(path, siteUrl).toString();
}

export const GET: APIRoute = () => {
  const entries = pages
    .flatMap(({ es, en }) => [
      { loc: es, alternates: { es, en } },
      { loc: en, alternates: { es, en } },
    ])
    .map(
      ({ loc, alternates }) => `  <url>
    <loc>${url(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${url(alternates.es)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url(alternates.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(alternates.es)}" />
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
