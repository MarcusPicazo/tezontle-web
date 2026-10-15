import { existsSync } from 'node:fs';
import { join } from 'node:path';

// "El paquete" referencia videos y pósteres que el usuario agrega después (SPEC). astro
// dev/build siempre corre desde la raíz del proyecto, así que process.cwd() + "public" +
// la misma ruta que usaría un <img>/<video> nos dice si el archivo ya existe, en build.
export function publicFileExists(relPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', relPath));
}
