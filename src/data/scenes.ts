// Orden de las escenas del recorrido — SPEC §3. Único lugar que define el orden, para que
// el raíl de progreso, el header y la página siempre coincidan.
export const sceneOrder = [
  'presentacion',
  'experiencia',
  'control',
  'paquete',
  'comoTrabajamos',
  'contacto',
  'cierre',
] as const;

export type SceneId = (typeof sceneOrder)[number];

// El raíl lateral agrupa en 5, sincronizado con los 4 enlaces del header + el logo
// ("Inicio"). href siempre apunta a la primera escena del grupo, que es el mismo ancla que
// usa el header para esa sección.
export const railGroups = [
  { id: 'inicio', scenes: ['presentacion'] },
  { id: 'showroom', scenes: ['experiencia', 'control'] },
  { id: 'paquete', scenes: ['paquete'] },
  { id: 'proceso', scenes: ['comoTrabajamos'] },
  { id: 'contacto', scenes: ['contacto', 'cierre'] },
] as const satisfies readonly { id: string; scenes: SceneId[] }[];

export type RailGroupId = (typeof railGroups)[number]['id'];

export const sceneToGroup = Object.fromEntries(
  railGroups.flatMap((group) => group.scenes.map((scene) => [scene, group.id])),
) as Record<SceneId, RailGroupId>;
