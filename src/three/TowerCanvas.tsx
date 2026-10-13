import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { AmbientLight, DirectionalLight, Fog, PerspectiveCamera } from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdaptivePerformance } from './AdaptivePerformance';
import { ProceduralTower } from './ProceduralTower';
import { towerColors, towerCenterY, towerGeometry } from './tower-config';
import { lerp } from './tower-poses';
import { FOCUS_FLOOR_INDEX } from './tower-status';

gsap.registerPlugin(ScrollTrigger);

// Encuadre amplio (escenas 1-3 y, de vuelta, escena 9): el mismo de antes.
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
 * SPEC §3) se acerca según el scroll hasta el piso enfocado y se queda ahí durante la
 * escena 5; en la escena 9 ("la torre terminada", SPEC §3) se aleja de vuelta al
 * encuadre amplio para mostrarla completa.
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

    // Vuelta al encuadre amplio en la escena 9: t=1 (cerrado en la unidad) al entrar,
    // t=0 (torre completa) al salir — el inverso del acercamiento de la escena 4.
    const pullBackTrigger = ScrollTrigger.create({
      trigger: '#cierre',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setCamera(1 - self.progress);
        invalidate();
      },
    });

    setCamera(Math.max(zoomTrigger.progress, 1 - pullBackTrigger.progress));
    invalidate();

    return () => {
      zoomTrigger.kill();
      pullBackTrigger.kill();
    };
  }, [camera, invalidate]);

  return null;
}

const DAY_FOG_COLOR = towerColors.noche;
// Tono cálido oscuro para el atardecer, mezcla de noche con rojo tezontle — no un color
// nuevo de marca, es la misma paleta de SPEC §2 llevada a la atmósfera de la escena.
const SUNSET_FOG_COLOR = '#2a1712';
const DAY_LIGHT_COLOR = '#fff4e6';
const SUNSET_LIGHT_COLOR = towerColors.laton;
const DAY_LIGHT_INTENSITY = 1.1;
const SUNSET_LIGHT_INTENSITY = 1.7;
const DAY_AMBIENT_INTENSITY = 0.55;
const SUNSET_AMBIENT_INTENSITY = 0.32;

/** Luz, niebla y fondo: de día (escenas 1-8) a atardecer en la escena 9 (SPEC §4). */
function SunsetRig() {
  const invalidate = useThree((state) => state.invalidate);
  const lightRef = useRef<DirectionalLight>(null!);
  const ambientRef = useRef<AmbientLight>(null!);
  const bgColorRef = useRef<THREE.Color>(null!);
  const fogRef = useRef<Fog>(null!);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dayLight = new THREE.Color(DAY_LIGHT_COLOR);
    const sunsetLight = new THREE.Color(SUNSET_LIGHT_COLOR);
    const dayFog = new THREE.Color(DAY_FOG_COLOR);
    const sunsetFog = new THREE.Color(SUNSET_FOG_COLOR);
    const blended = new THREE.Color();

    function setSunset(t: number) {
      lightRef.current.color.copy(dayLight).lerp(sunsetLight, t);
      lightRef.current.intensity = lerp(DAY_LIGHT_INTENSITY, SUNSET_LIGHT_INTENSITY, t);
      ambientRef.current.intensity = lerp(DAY_AMBIENT_INTENSITY, SUNSET_AMBIENT_INTENSITY, t);
      blended.copy(dayFog).lerp(sunsetFog, t);
      bgColorRef.current.copy(blended);
      fogRef.current.color.copy(blended);
    }

    if (reduceMotion) {
      setSunset(0);
      invalidate();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: '#cierre',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setSunset(self.progress);
        invalidate();
      },
    });

    setSunset(trigger.progress);
    invalidate();

    return () => trigger.kill();
  }, [invalidate]);

  return (
    <>
      <color ref={bgColorRef} attach="background" args={[towerColors.noche]} />
      <fog ref={fogRef} attach="fog" args={[towerColors.noche, 9, 28]} />
      <ambientLight ref={ambientRef} intensity={DAY_AMBIENT_INTENSITY} />
      <directionalLight ref={lightRef} position={[6, 10, 4]} intensity={DAY_LIGHT_INTENSITY} color={DAY_LIGHT_COLOR} />
    </>
  );
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
      <SunsetRig />
      <CameraRig />
      <AdaptivePerformance dprRange={[1, 1.5]} />
      <ProceduralTower />
    </Canvas>
  );
}
