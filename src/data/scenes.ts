// Orden de las escenas del recorrido — SPEC §3. Único lugar que define el orden, para que
// el raíl de progreso, el header y la página siempre coincidan.
export const sceneOrder = [
  'presentacion',
  'experiencia',
  'control',
  'paquete',
  'caracteristicas',
  'dondeEncaja',
  'intercambio',
  'faq',
  'contacto',
  'cierre',
] as const;

export type SceneId = (typeof sceneOrder)[number];

// El raíl lateral agrupa en 5, sincronizado con los 5 enlaces del header + el logo
// ("Inicio"). href siempre apunta a la primera escena del grupo, que es el mismo ancla que
// usa el header para esa sección. "Funciones" y "Dónde encaja/Lo que nos envía" se
// reparten en los grupos ya existentes (paquete, proceso) en vez de sumar más puntos al
// raíl; preguntas frecuentes entra al grupo de contacto, justo antes.
export const railGroups = [
  { id: 'inicio', scenes: ['presentacion'] },
  { id: 'showroom', scenes: ['experiencia', 'control'] },
  { id: 'paquete', scenes: ['paquete', 'caracteristicas'] },
  { id: 'proceso', scenes: ['dondeEncaja', 'intercambio'] },
  { id: 'contacto', scenes: ['faq', 'contacto', 'cierre'] },
] as const satisfies readonly { id: string; scenes: SceneId[] }[];

export type RailGroupId = (typeof railGroups)[number]['id'];

export const sceneToGroup = Object.fromEntries(
  railGroups.flatMap((group) => group.scenes.map((scene) => [scene, group.id])),
) as Record<SceneId, RailGroupId>;
