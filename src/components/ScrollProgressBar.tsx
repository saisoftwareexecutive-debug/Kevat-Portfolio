import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Logo } from './Logo';

/**
 * Scroll Progress as a River:
 * Thin navy water line at top of viewport with a miniature orange Kevat boat sailing
 * across as the user scrolls, leaving a faint orange brush wake behind it.
 */
export function ScrollProgressBar() {
  const prefersReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  const boatLeft = useTransform(smoothProgress, [0, 1], ['0%', '96.5%']);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[70] h-6"
    >
      {/* Thin navy river surface line */}
      <div className="absolute left-0 right-0 top-[2px] h-[2px] bg-[#1B1A5E]/12 dark:bg-[#FBF8F3]/15" />

      {/* Warm orange brush wake left behind the boat */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="absolute left-0 right-0 top-[2px] h-[2.5px] origin-left bg-gradient-to-r from-[#FBA94C]/35 via-[#F58220]/75 to-[#D9650E]"
      />

      {/* Miniature sailing Kevat boat mark */}
      {!prefersReduced && (
        <motion.div
          style={{ left: boatLeft }}
          className="absolute top-0 -translate-x-1/2"
        >
          <Logo variant="mark" className="h-[18px] w-[28px] drop-shadow-xs" />
        </motion.div>
      )}
    </div>
  );
}
