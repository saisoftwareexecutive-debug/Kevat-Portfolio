import type { Transition, Variants } from 'motion/react';

// Single restrained editorial easing curve across the entire site
export const EASE_KSS: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO = EASE_KSS;

export const SPRING_MAGNETIC: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 0.5,
};

export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_KSS,
    },
  },
};

export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_KSS,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.16 as const,
};
