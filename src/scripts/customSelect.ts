// Combobox propio para "Número de departamentos" (Contacto.astro): un <select> nativo pinta
// su lista desplegada con el sistema operativo (panel blanco, resaltado azul de Windows),
// imposible de afinar al vidrio oscuro del resto del sitio — por eso esto es un input de
// texto (readonly+required, SÍ participa en la validación nativa, a diferencia de un
// type=hidden) más una lista propia (CSS igual que el panel de idioma).
export function initCustomSelect(inputId: string) {
  const input = document.getElementById(inputId) as HTMLInputElement | null;
  const listbox = document.getElementById(`${inputId}-listbox`);
  if (!input || !listbox) return;

  const options = [...listbox.querySelectorAll<HTMLButtonElement>('[data-select-option]')];
  let open = false;

  const setOpen = (next: boolean) => {
    if (open === next) return;
    open = next;
    listbox.hidden = !open;
    input.setAttribute('aria-expanded', String(open));
  };

  const select = (option: HTMLButtonElement) => {
    input.value = option.textContent?.trim() ?? '';
    input.dataset.selectIndex = option.dataset.index;
    options.forEach((o) => o.setAttribute('aria-selected', String(o === option)));
    setOpen(false);
  };

  input.addEventListener('click', () => setOpen(!open));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  });

  options.forEach((option) => {
    option.addEventListener('click', () => select(option));
  });

  document.addEventListener('click', (event) => {
    if (!open) return;
    const target = event.target as Node;
    if (input.contains(target) || listbox.contains(target)) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !open) return;
    setOpen(false);
    input.focus();
  });

  // Las opciones ya cambiaron de idioma (swapText recorre .i18n-text antes de que este
  // evento se dispare, ver src/scripts/i18n.ts): si ya había una elegida, releemos su texto
  // ya traducido en vez de dejar el valor viejo en el idioma anterior.
  window.addEventListener('tezontle:langswitch', () => {
    const index = input.dataset.selectIndex;
    if (index === undefined) return;
    const option = options[Number(index)];
    if (option) input.value = option.textContent?.trim() ?? '';
  });
}
