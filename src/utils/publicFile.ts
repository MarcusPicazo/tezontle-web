import { existsSync } from 'node:fs';
import { join } from 'node:path';

// "El paquete" referencia videos y pósteres que el usuario agrega después (SPEC). astro
// dev/build siempre corre desde la raíz del proyecto, así que process.cwd() + "public" +
// la misma ruta que usaría un <img>/<video> nos dice si el archivo ya existe, en build.
export function publicFileExists(relPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', relPath));
}

// "Qué hace la maqueta" necesita sus 6 videos para no verse como tarjetas vacías: mientras
// falte alguno, la sección entera (y su enlace en el header) se oculta en vez de mostrarse
// a medias. En cuanto existan los 6, aparece sola — nada que prender a mano.
const FEATURE_KEYS = ['disponibilidad', 'sol', 'pagos', 'plantas', 'vistas', 'contacto'] as const;

export function featuresReady(): boolean {
  return FEATURE_KEYS.every((key) => publicFileExists(`/features/feat-${key}.mp4`));
}
