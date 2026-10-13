// Colores de disponibilidad de las unidades — SPEC §3 escena 3: "verde/ámbar/gris".
// Es una convención de estado para el demo, no una paleta de marca, así que vive aquí y
// no en los tokens de src/styles/global.css (igual razonamiento que STATUS_COLORS en
// aura-demo). Los mismos valores se repiten en Vendido.astro para el mockup de laptop —
// mantenerlos sincronizados a mano si cambian.
export type UnitStatus = 'available' | 'reserved' | 'sold';

export const statusColors: Record<UnitStatus, string> = {
  available: '#4f9d6e',
  reserved: '#d9a443',
  sold: '#5c5955',
};

// El modelo simplificado no divide cada piso en varias unidades: un piso = una unidad.
// Este es el piso que visitan las escenas 4 y 5 ("el 804" del mensaje de WhatsApp).
export const FOCUS_FLOOR_INDEX = 7;

// Distribución fija (no aleatoria) de disponibilidad por piso, de abajo hacia arriba.
// FOCUS_FLOOR_INDEX empieza disponible: la escena 5 la vende durante su propio scroll.
export const unitStatusByFloor: UnitStatus[] = [
  'available',
  'reserved',
  'available',
  'available',
  'sold',
  'available',
  'reserved',
  'available',
  'available',
];
