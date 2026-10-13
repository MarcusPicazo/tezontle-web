// Matemática pura de la torre: sin three.js ni React, solo números. Mismo patrón que
// src/lib/geometry.ts en aura-demo (referencia, no se importa de ahí).
import { towerGeometry } from './tower-config';

export interface Pose {
  position: [number, number, number];
  rotation: [number, number, number];
}

const DEG = Math.PI / 180;

/**
 * Pose de un nivel disperso (escena 1, "bloques sueltos"): posición y rotación
 * deterministas por índice (no Math.random, para que el resultado sea estable), en un
 * racimo bajo cerca del suelo, como piedras sueltas antes de levantar la torre.
 */
export function scatteredPose(index: number): Pose {
  const angle = index * 2.4; // múltiplo irracional-ish: evita que los bloques caigan en línea
  // El radio tiene que superar claramente la diagonal del propio nivel (~8.6 m con el
  // ancho/fondo actuales) para que los bloques queden sueltos de verdad y no amontonados.
  const radius = 7.5 + (index % 3) * 3.2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = 0.2 + (((index * 37) % 100) / 100) * 3.2;
  const rotY = (((index * 53) % 360) * DEG) * 0.4;
  const tiltX = ((((index * 17) % 20) - 10) * DEG) * 0.5;
  const tiltZ = ((((index * 29) % 20) - 10) * DEG) * 0.5;
  return { position: [x, y, z], rotation: [tiltX, rotY, tiltZ] };
}

/** Pose de un nivel ya apilado en su lugar final (escenas 2 en adelante). */
export function stackedPose(index: number): Pose {
  return { position: [0, index * towerGeometry.floorHeight, 0], rotation: [0, 0, 0] };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Progreso individual de un nivel dentro del apilado general (escena 2): se apilan de
 * abajo hacia arriba, con traslape entre niveles consecutivos para que el movimiento se
 * lea como una cascada continua y no como golpes separados.
 */
export function floorStackProgress(index: number, stackT: number, numFloors: number): number {
  const overlap = 1.3;
  const raw = (stackT * numFloors - index) / overlap;
  return Math.min(1, Math.max(0, raw));
}

/** Interpola la pose dispersa hacia la apilada según el progreso de ese nivel. */
export function blendPose(from: Pose, to: Pose, t: number): Pose {
  return {
    position: [lerp(from.position[0], to.position[0], t), lerp(from.position[1], to.position[1], t), lerp(from.position[2], to.position[2], t)],
    rotation: [lerp(from.rotation[0], to.rotation[0], t), lerp(from.rotation[1], to.rotation[1], t), lerp(from.rotation[2], to.rotation[2], t)],
  };
}

export interface MullionPoint {
  x: number;
  z: number;
  /** Rotación en Y para que el ancho local (eje X) del perfil quede a lo largo del lado. */
  rotationY: number;
}

/**
 * Puntos de carpintería vertical (canceles) a lo largo del perímetro de un rectángulo
 * centrado en el origen, espaciados cada `spacing` metros por lado, sin duplicar esquinas.
 */
export function rectPerimeterMullions(width: number, depth: number, spacing: number): MullionPoint[] {
  const halfW = width / 2;
  const halfD = depth / 2;
  const sides: { from: [number, number]; to: [number, number]; rotationY: number }[] = [
    { from: [-halfW, -halfD], to: [halfW, -halfD], rotationY: 0 },
    { from: [halfW, -halfD], to: [halfW, halfD], rotationY: Math.PI / 2 },
    { from: [halfW, halfD], to: [-halfW, halfD], rotationY: 0 },
    { from: [-halfW, halfD], to: [-halfW, -halfD], rotationY: Math.PI / 2 },
  ];

  const points: MullionPoint[] = [];
  for (const side of sides) {
    const length = Math.hypot(side.to[0] - side.from[0], side.to[1] - side.from[1]);
    const segments = Math.max(1, Math.round(length / spacing));
    for (let i = 0; i < segments; i += 1) {
      const t = i / segments;
      points.push({
        x: side.from[0] + (side.to[0] - side.from[0]) * t,
        z: side.from[1] + (side.to[1] - side.from[1]) * t,
        rotationY: side.rotationY,
      });
    }
  }
  return points;
}
