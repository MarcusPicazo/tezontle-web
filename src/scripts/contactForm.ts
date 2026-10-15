import { whatsapp } from '../data/site';

// Formulario de #contacto (SPEC): sin backend, nada se guarda en ningún servidor. El
// navegador ya bloquea el submit si falta un campo requerido (sin novalidate, su validación
// nativa corre antes de que este listener reciba el evento), así que aquí solo armamos el
// mensaje y abrimos WhatsApp. Las etiquetas del mensaje se leen de los <label> ya
// renderizados (T.astro), así el mensaje sale en el idioma que esté viendo el visitante sin
// duplicar texto en este script.
export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[name]')];
    const lines = fields
      .map((field) => {
        const value = field.value.trim();
        if (!value) return null;
        const label = form.querySelector(`label[for="${field.id}"]`)?.textContent?.trim();
        return label ? `${label}: ${value}` : value;
      })
      .filter((line): line is string => Boolean(line));

    const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(href, '_blank', 'noopener');
  });
}
