import type { APIRoute } from 'astro';
import { siteUrl } from '../data/site';

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', siteUrl).toString()}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
