// Configuración real del sitio: valores que cambian por campaña, no por código.
// Todos son placeholders hasta tener los datos reales de Tezontle 3D.

export const brand = {
  name: 'tezontle',
  fullName: 'Tezontle 3D',
};

export const site = {
  // Placeholder: URL de la demo de Aura.
  demoUrl: '#',
  // Placeholder: enlace de Cal.com o Calendly.
  calendarUrl: '#',
  // Placeholder: correo de contacto.
  email: 'hola@tezontle3d.com',
};

export const whatsapp = {
  // Placeholder: número con lada de país, sin signos.
  number: '5215500000000',
  message: 'Hola, quiero ver una demo de Tezontle 3D.',
};

export const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;
