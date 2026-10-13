// Config de la torre procedural simplificada — SPEC §4: losas, vidrio y canceles,
// sin modelos 3D. Los colores deben coincidir con los tokens de src/styles/global.css
// (three.js no puede leer custom properties de CSS, así que se repiten aquí a mano).
export const towerColors = {
  noche: '#15171c',
  piedra: '#8c857b',
  grafito: '#2b2b2b',
  cal: '#fbf9f5',
  laton: '#c8a27a',
};

export const towerGeometry = {
  numFloors: 9,
  floorWidth: 7,
  floorDepth: 5,
  floorHeight: 1.05,
  slabThickness: 0.14,
  glassInset: 0.18,
  mullionSpacing: 1.4,
  mullionThickness: 0.05,
  mullionDepth: 0.08,
};

export const totalHeight = towerGeometry.numFloors * towerGeometry.floorHeight;

/** Centro vertical aproximado de la torre ya armada: para encuadrar cámara y luces. */
export const towerCenterY = totalHeight / 2;
