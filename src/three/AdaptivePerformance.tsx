import { memo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface AdaptivePerformanceProps {
  dprRange: [number, number];
}

// SPEC §8: no bajar de 50 fps en Android medio. Con frameloop="demand" los cuadros solo
// llegan mientras hay scroll activo, así que la muestra se llena justo cuando importa
// (scroleando) y simplemente no avanza en reposo — no hace falta drei para esto, es un
// promedio de los últimos SAMPLE_WINDOW cuadros contra setDpr, nada más.
const SAMPLE_WINDOW = 30;
const DECLINE_FPS = 50;
const INCLINE_FPS = 58;

/** DPR adaptativo: baja la resolución de render si el promedio de fps cae, la sube de
 *  vuelta cuando se recupera. Reemplaza a drei's PerformanceMonitor (no lo necesitamos
 *  solo para esto, y ahorra todo el paquete). */
function AdaptivePerformanceComponent({ dprRange }: AdaptivePerformanceProps) {
  const setDpr = useThree((state) => state.setDpr);
  const [min, max] = dprRange;
  const frames = useRef(0);
  const elapsed = useRef(0);
  const lowDpr = useRef(false);

  useFrame((_state, delta) => {
    frames.current += 1;
    elapsed.current += delta;
    if (frames.current < SAMPLE_WINDOW) return;

    const fps = frames.current / elapsed.current;
    frames.current = 0;
    elapsed.current = 0;

    if (fps < DECLINE_FPS && !lowDpr.current) {
      lowDpr.current = true;
      setDpr(min);
    } else if (fps > INCLINE_FPS && lowDpr.current) {
      lowDpr.current = false;
      setDpr(max);
    }
  });

  return null;
}

export const AdaptivePerformance = memo(AdaptivePerformanceComponent);
