import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  decimals?: number;
  startWhen: boolean;
  reducedMotion?: boolean;
}

export function useCountUp({
  target,
  duration = 1600,
  decimals = 0,
  startWhen,
  reducedMotion = false,
}: UseCountUpOptions) {
  const [value, setValue] = useState<number>(reducedMotion ? target : 0);

  useEffect(() => {
    if (!startWhen) return;
    if (reducedMotion || target === 0) {
      setValue(target);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration, decimals, startWhen, reducedMotion]);

  return value.toFixed(decimals);
}
