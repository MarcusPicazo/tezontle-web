// Configuración real del sitio: valores que cambian por campaña, no por código.
// Todos son placeholders hasta tener los datos reales de Tezontle 3D.

export const brand = {
  name: 'tezontle',
  fullName: 'Tezontle 3D',
};

// Dominio real del sitio (SPEC §7: canonical, hreflang, sitemap, Open Graph). Debe
// coincidir con "site" en astro.config.mjs. Placeholder hasta tener el dominio real.
export const siteUrl = 'https://tezontle3d.com';

export const site = {
  // Placeholder: URL de la demo de Aura.
  demoUrl: '#',
  // Placeholder: demo pública de la maqueta 3D y de la landing cinematográfica (sección
  // "El paquete"). "#" hasta tenerlas: los botones que las usan caen a #contacto en vez de
  // quedar muertos (ver Paquete.astro).
  demoMaquetaUrl: '#',
  demoLandingUrl: '#',
  // Placeholder: enlace de Cal.com o Calendly.
  calendarUrl: '#',
  // Placeholder: correo de contacto.
  email: 'hola@tezontle3d.com',
  // Placeholder: LinkedIn de la empresa (pie de página).
  linkedinUrl: '#',
};

export const whatsapp = {
  // Número real de Tezontle 3D: +52 735 106 0241.
  number: '527351060241',
  message: 'Hola, quiero ver una demo de Tezontle 3D.',
};

// Mensaje prearmado genérico (botón de Cierre) y builder para mensajes a la medida (demo
// del panel de ventas en "El paquete", formulario de #contacto con los datos capturados).
export const buildWhatsappHref = (message: string) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;

export const whatsappHref = buildWhatsappHref(whatsapp.message);

// Aviso de privacidad (SPEC: "datos como variables en site.ts"). Domicilio genérico a
// nivel ciudad, no una dirección fiscal real — placeholders hasta tener los datos
// legales reales de la empresa (razón social, domicilio completo, en su caso RFC).
export const legal = {
  legalName: brand.fullName,
  address: 'Ciudad de México, México',
  privacyEmail: site.email,
  lastUpdated: '2026-10-13',
};

// Analítica ligera (SPEC §7: Plausible o PostHog). Dominio placeholder: no hay cuenta
// real de Plausible todavía, así que el script no reportará nada hasta configurarla.
export const analytics = {
  plausibleDomain: 'tezontle3d.com',
};
