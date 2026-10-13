// Orden de las 9 escenas del recorrido — SPEC §3. Único lugar que define el orden,
// para que el raíl de progreso y la página siempre coincidan.
export const sceneOrder = [
  'piedra',
  'cimientos',
  'torre',
  'departamento',
  'vendido',
  'historia',
  'comoTrabajamos',
  'nombre',
  'cierre',
] as const;

export type SceneId = (typeof sceneOrder)[number];
