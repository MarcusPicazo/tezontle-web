import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptivePerformance } from './AdaptivePerformance';
import { ProceduralTower } from './ProceduralTower';
import { towerColors, towerCenterY } from './tower-config';

const CAMERA_POSITION: [number, number, number] = [9, 5.4, 11];
const CAMERA_TARGET: [number, number, number] = [0, towerCenterY * 0.85, 0];

/** Apunta la cámara una sola vez al montar: no hay OrbitControls, el punto de mira no cambia. */
function CameraRig() {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.lookAt(...CAMERA_TARGET);
  }, [camera]);
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
