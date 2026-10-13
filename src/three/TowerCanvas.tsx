import { useEffect } from 'react';
import type { PerspectiveCamera } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdaptivePerformance } from './AdaptivePerformance';
import { ProceduralTower } from './ProceduralTower';
import { towerColors, towerCenterY, towerGeometry } from './tower-config';
import { lerp } from './tower-poses';
import { FOCUS_FLOOR_INDEX } from './tower-status';

gsap.registerPlugin(ScrollTrigger);

// Encuadre amplio (escenas 1-3): el mismo de antes.
const WIDE_POSITION: [number, number, number] = [9, 5.4, 11];
const WIDE_TARGET: [number, number, number] = [0, towerCenterY * 0.85, 0];
// Mismo azimut que el encuadre amplio, solo que mucho más cerca: se acerca al eje
// vertical de la torre a la altura del piso enfocado, no a una fachada concreta — así
// funciona sin importar en qué ángulo haya quedado el giro de la escena 3.
const WIDE_AZIMUTH = Math.atan2(WIDE_POSITION[2], WIDE_POSITION[0]);
const CLOSE_RADIUS = 4.2;
const FOCUS_FLOOR_CENTER_Y = FOCUS_FLOOR_INDEX * towerGeometry.floorHeight + towerGeometry.floorHeight / 2;
const CLOSE_POSITION: [number, number, number] = [
  Math.cos(WIDE_AZIMUTH) * CLOSE_RADIUS,
  FOCUS_FLOOR_CENTER_Y + 0.35,
  Math.sin(WIDE_AZIMUTH) * CLOSE_RADIUS,
];
const CLOSE_TARGET: [number, number, number] = [0, FOCUS_FLOOR_CENTER_Y, 0];
// El radio no puede bajar mucho más sin meter la cámara dentro del propio volumen de la
// torre (la fachada por este azimut queda a ~3.2 m del eje), así que el acercamiento a
// "una sola unidad" se logra cerrando el campo de visión, como un zoom óptico, no
// empujando la cámara a través del vidrio.
const WIDE_FOV = 40;
const CLOSE_FOV = 18;

/**
 * Encuadre amplio en escenas 1-3; en la escena 4 ("la cámara se acerca a una unidad",
 * SPEC §3) se acerca según el scroll hasta el piso enfocado, y se queda ahí durante la
 * escena 5 (nada vuelve a tocar la cámara después de la escena 4).
 */
function CameraRig() {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const perspectiveCamera = camera as PerspectiveCamera;

    function setCamera(t: number) {
      camera.position.set(
        lerp(WIDE_POSITION[0], CLOSE_POSITION[0], t),
        lerp(WIDE_POSITION[1], CLOSE_POSITION[1], t),
        lerp(WIDE_POSITION[2], CLOSE_POSITION[2], t),
      );
      camera.lookAt(
        lerp(WIDE_TARGET[0], CLOSE_TARGET[0], t),
        lerp(WIDE_TARGET[1], CLOSE_TARGET[1], t),
        lerp(WIDE_TARGET[2], CLOSE_TARGET[2], t),
      );
      perspectiveCamera.fov = lerp(WIDE_FOV, CLOSE_FOV, t);
      perspectiveCamera.updateProjectionMatrix();
    }

    if (reduceMotion) {
      // Sin animación: encuadre amplio fijo, igual que el resto de la torre quieta.
      setCamera(0);
      invalidate();
      return;
    }

    const zoomTrigger = ScrollTrigger.create({
      trigger: '#departamento',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setCamera(self.progress);
        invalidate();
      },
    });

    setCamera(zoomTrigger.progress);
    invalidate();

    return () => zoomTrigger.kill();
  }, [camera, invalidate]);

  return null;
}

/**
 * Isla de React Three Fiber: la escena 3D fija de fondo (SPEC §4). `client:only="react"`
 * en Astro porque @react-three/fiber necesita WebGL/DOM del navegador — no se puede
 * renderizar en el build de servidor.
 */
export default function TowerCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 40, near: 0.1, far: 60 }}
    >
      <color attach="background" args={[towerColors.noche]} />
      <fog attach="fog" args={[towerColors.noche, 9, 28]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 4]} intensity={1.1} color="#fff4e6" />
      <CameraRig />
      <AdaptivePerformance dprRange={[1, 1.5]} />
      <ProceduralTower />
    </Canvas>
  );
}
