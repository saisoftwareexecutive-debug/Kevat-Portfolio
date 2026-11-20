import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

type CursorVariant = 'default' | 'pointer' | 'view';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 250, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (
        target.closest('a, button, input, select, textarea, [role="button"], [data-cursor="pointer"]')
      ) {
        setVariant('pointer');
      } else {
        setVariant('default');
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [mouseX, mouseY, prefersReduced, visible]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F58220]"
        style={{
          x: mouseX,
          y: mouseY,
          width: variant === 'view' ? 0 : 6,
          height: variant === 'view' ? 0 : 6,
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[89] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: variant === 'view' ? 62 : variant === 'pointer' ? 42 : 28,
          height: variant === 'view' ? 62 : variant === 'pointer' ? 42 : 28,
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === 'view'
              ? 'rgba(27, 26, 94, 0.94)'
              : variant === 'pointer'
                ? 'rgba(245, 130, 32, 0.14)'
                : 'rgba(27, 26, 94, 0)',
          borderColor:
            variant === 'view'
              ? 'rgba(245, 130, 32, 0.9)'
              : variant === 'pointer'
                ? 'rgba(245, 130, 32, 0.78)'
                : 'rgba(27, 26, 94, 0.35)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {variant === 'view' && (
          <span className="text-[11px] font-semibold tracking-wide text-[#FBF8F3]">
            View
          </span>
        )}
      </motion.div>
    </>
  );
}
