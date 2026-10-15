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
        // <select>: el value es una clave estable (units-0, units-1…), no texto — el
        // mensaje debe llevar lo que el visitante ve en pantalla, en el idioma que esté
        // viendo (la opción elegida ya cambia de idioma con el switch, ver Contacto.astro).
        const value =
          field instanceof HTMLSelectElement
            ? (field.options[field.selectedIndex]?.textContent ?? '').trim()
            : field.value.trim();
        if (!value) return null;
        const label = form.querySelector(`label[for="${field.id}"]`)?.textContent?.trim();
        return label ? `${label}: ${value}` : value;
      })
      .filter((line): line is string => Boolean(line));

    const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(href, '_blank', 'noopener');
  });
}
