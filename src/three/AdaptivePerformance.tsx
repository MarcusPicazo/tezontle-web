import { memo } from 'react';
import { useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';

interface AdaptivePerformanceProps {
  dprRange: [number, number];
}

/** DPR adaptativo (SPEC §8: >=50fps en Android medio): conecta la medición de fps de
 *  PerformanceMonitor directo a setDpr, igual que en aura-demo. */
function AdaptivePerformanceComponent({ dprRange }: AdaptivePerformanceProps) {
  const setDpr = useThree((state) => state.setDpr);
  const [min, max] = dprRange;

  return <PerformanceMonitor onIncline={() => setDpr(max)} onDecline={() => setDpr(min)} />;
}

export const AdaptivePerformance = memo(AdaptivePerformanceComponent);
