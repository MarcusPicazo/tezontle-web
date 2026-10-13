import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { towerColors, towerGeometry } from './tower-config';
import { blendPose, floorStackProgress, rectPerimeterMullions, scatteredPose, stackedPose } from './tower-poses';
import { FOCUS_FLOOR_INDEX, statusColors, unitStatusByFloor } from './tower-status';

gsap.registerPlugin(ScrollTrigger);

const { numFloors, floorWidth, floorDepth, floorHeight, slabThickness, mullionSpacing, mullionThickness, mullionDepth } = towerGeometry;

const mullionPoints = rectPerimeterMullions(floorWidth - 0.1, floorDepth - 0.1, mullionSpacing);
const mullionCount = mullionPoints.length * numFloors;

const slabLocalY = slabThickness / 2;
const glassLocalY = slabThickness + (floorHeight - slabThickness) / 2;
const mullionLocalY = glassLocalY;

/** Barrido total de la "órbita lenta" de la escena 3, en grados, repartido en escena 3. */
const ROTATION_SWEEP_DEG = 70;
const ROTATION_BASE_DEG = -35;

const SCALE_ONE = new THREE.Vector3(1, 1, 1);

/**
 * Torre procedural simplificada: tres InstancedMesh (losas, vidrio, canceles) — una
 * instancia por nivel para losas/vidrio, varias por nivel para canceles — cuyas matrices
 * se recalculan en cada evento de scroll (nunca en un loop de render) y se escriben una
 * sola vez por evento. `frameloop="demand"` en el Canvas padre: sin esto, nada pide un
 * frame nuevo salvo estas invalidaciones puntuales.
 */
export function ProceduralTower() {
  const groupRef = useRef<THREE.Group>(null!);
  const slabRef = useRef<THREE.InstancedMesh>(null!);
  const glassRef = useRef<THREE.InstancedMesh>(null!);
  const mullionRef = useRef<THREE.InstancedMesh>(null!);
  const invalidate = useThree((state) => state.invalidate);

  const slabGeometry = useMemo(() => new THREE.BoxGeometry(floorWidth, slabThickness, floorDepth), []);
  const glassGeometry = useMemo(
    () => new THREE.BoxGeometry(floorWidth - 0.1, floorHeight - slabThickness, floorDepth - 0.1),
    [],
  );
  const mullionGeometry = useMemo(
    () => new THREE.BoxGeometry(mullionThickness, floorHeight - slabThickness, mullionDepth),
    [],
  );

  const slabMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: towerColors.piedra, roughness: 0.85, metalness: 0.08 }),
    [],
  );
  const glassMaterial = useMemo(
    () =>
      // MeshStandardMaterial, no Physical: sin mapa de entorno real el clearcoat casi no
      // se nota y sí cuesta un segundo lóbulo especular por pixel en las 9 unidades —
      // en Android medio eso pesa más de lo que aporta (SPEC §8: >=50 fps). FrontSide
      // porque la cámara siempre queda afuera del volumen de la torre (ver TowerCanvas),
      // así que la cara trasera nunca hace falta y cuesta la mitad de fragmentos.
      new THREE.MeshStandardMaterial({
        // Blanco puro: el tinte real de cada unidad viene del color de instancia
        // (disponible/apartado/vendido), que se multiplica contra este color base.
        color: '#ffffff',
        transparent: true,
        opacity: 0.32,
        roughness: 0.12,
        metalness: 0,
        depthWrite: false,
      }),
    [],
  );
  const mullionMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: towerColors.grafito, roughness: 0.6, metalness: 0.25 }),
    [],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const floorMatrix = new THREE.Matrix4();
    const partMatrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();

    function writeFloorMatrices(stackT: number, forceComplete: boolean) {
      let mullionIndex = 0;
      for (let floor = 0; floor < numFloors; floor += 1) {
        const t = forceComplete ? 1 : floorStackProgress(floor, stackT, numFloors);
        const pose = blendPose(scatteredPose(floor), stackedPose(floor), t);
        quaternion.setFromEuler(new THREE.Euler(...pose.rotation));
        floorMatrix.compose(new THREE.Vector3(...pose.position), quaternion, SCALE_ONE);

        partMatrix.copy(floorMatrix).multiply(new THREE.Matrix4().makeTranslation(0, slabLocalY, 0));
        slabRef.current.setMatrixAt(floor, partMatrix);

        partMatrix.copy(floorMatrix).multiply(new THREE.Matrix4().makeTranslation(0, glassLocalY, 0));
        glassRef.current.setMatrixAt(floor, partMatrix);

        for (const point of mullionPoints) {
          const localQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, point.rotationY, 0));
          const localMatrix = new THREE.Matrix4().compose(
            new THREE.Vector3(point.x, mullionLocalY, point.z),
            localQuaternion,
            SCALE_ONE,
          );
          partMatrix.copy(floorMatrix).multiply(localMatrix);
          mullionRef.current.setMatrixAt(mullionIndex, partMatrix);
          mullionIndex += 1;
        }
      }

      slabRef.current.instanceMatrix.needsUpdate = true;
      glassRef.current.instanceMatrix.needsUpdate = true;
      mullionRef.current.instanceMatrix.needsUpdate = true;
      slabRef.current.computeBoundingSphere();
      glassRef.current.computeBoundingSphere();
      mullionRef.current.computeBoundingSphere();
    }

    function setRotation(progress: number) {
      const deg = ROTATION_BASE_DEG + progress * ROTATION_SWEEP_DEG;
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(deg);
    }

    // Color de disponibilidad por piso (SPEC §3 escena 3): se fija una sola vez, no
    // depende del scroll. El piso enfocado (escenas 4-5) lo vuelve a tocar `setSoldProgress`.
    function applyStatusColors() {
      const color = new THREE.Color();
      for (let floor = 0; floor < numFloors; floor += 1) {
        color.set(statusColors[unitStatusByFloor[floor]]);
        glassRef.current.setColorAt(floor, color);
      }
      if (glassRef.current.instanceColor) glassRef.current.instanceColor.needsUpdate = true;
    }

    const soldFrom = new THREE.Color(statusColors.available);
    const soldTo = new THREE.Color(statusColors.sold);
    const soldColor = new THREE.Color();

    /** Escena 5: la unidad enfocada pasa sola de disponible a vendida según el scroll. */
    function setSoldProgress(progress: number) {
      soldColor.copy(soldFrom).lerp(soldTo, progress);
      glassRef.current.setColorAt(FOCUS_FLOOR_INDEX, soldColor);
      if (glassRef.current.instanceColor) glassRef.current.instanceColor.needsUpdate = true;
    }

    if (reduceMotion) {
      // Sin animación: la torre ya armada y quieta, sin bloques sueltos ni giro.
      writeFloorMatrices(1, true);
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(15);
      applyStatusColors();
      invalidate();
      return;
    }

    const stackTrigger = ScrollTrigger.create({
      trigger: '#cimientos',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        writeFloorMatrices(self.progress, false);
        invalidate();
      },
    });

    const rotateTrigger = ScrollTrigger.create({
      trigger: '#torre',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setRotation(self.progress);
        invalidate();
      },
    });

    const soldTrigger = ScrollTrigger.create({
      trigger: '#vendido',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setSoldProgress(self.progress);
        invalidate();
      },
    });

    writeFloorMatrices(stackTrigger.progress, false);
    setRotation(rotateTrigger.progress);
    applyStatusColors();
    setSoldProgress(soldTrigger.progress);
    invalidate();

    return () => {
      stackTrigger.kill();
      rotateTrigger.kill();
      soldTrigger.kill();
    };
  }, [invalidate]);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={slabRef} args={[slabGeometry, slabMaterial, numFloors]} />
      <instancedMesh ref={glassRef} args={[glassGeometry, glassMaterial, numFloors]} />
      <instancedMesh ref={mullionRef} args={[mullionGeometry, mullionMaterial, mullionCount]} />
    </group>
  );
}
