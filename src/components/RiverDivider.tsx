import { motion, useReducedMotion } from 'motion/react';
import { EASE_KSS, viewportOnce } from '../utils/animations';

interface RiverDividerProps {
  variant?: 'wave' | 'bridge';
  /** Top background color class or hex for seamless visual join */
  topBg?: string;
  bottomBg?: string;
  label?: string;
}

/**
 * Soft drifting river wave & cable-stayed bridge arch ("Setu") dividers between sections.
 */
export function RiverDivider({
  variant = 'wave',
  topBg = 'bg-[#FBF8F3] dark:bg-[#0E0D3A]',
  bottomBg = 'text-[#F4EEE3] dark:text-[#121147]',
  label,
}: RiverDividerProps) {
  const prefersReduced = useReducedMotion() ?? false;

  if (variant === 'bridge') {
    return (
      <div
        aria-hidden="true"
        className={`relative overflow-hidden py-5 ${topBg}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="h-px flex-1 bg-[#1B1A5E]/15 dark:bg-[#FBF8F3]/15" />
          <div className="mx-5 flex flex-col items-center">
            <svg
              width="180"
              height="38"
              viewBox="0 0 180 38"
              fill="none"
              className="overflow-visible"
            >
              {/* Left & Right mini Setu pylons */}
              <motion.path
                d="M36 32 L42 8 L45 32 M144 32 L138 8 L135 32"
                stroke="#D9650E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={prefersReduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: EASE_KSS }}
              />
              {/* Suspension cables */}
              <motion.path
                d="M42 10 L14 31 M42 16 L24 31 M138 10 L166 31 M138 16 L156 31"
                stroke="#F58220"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={prefersReduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE_KSS }}
              />
              {/* Graceful bridge arch span */}
              <motion.path
                d="M4 32 Q90 22 176 32"
                stroke="#1B1A5E"
                className="dark:stroke-[#FBF8F3]"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={prefersReduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.85, ease: EASE_KSS }}
              />
            </svg>
            {label && (
              <span className="mt-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1B1A5E]/60 dark:text-[#FBA94C]/80">
                {label}
              </span>
            )}
          </div>
          <div className="h-px flex-1 bg-[#1B1A5E]/15 dark:bg-[#FBF8F3]/15" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative -mt-px overflow-hidden leading-none ${topBg}`}
    >
      <svg
        viewBox="0 0 1440 54"
        preserveAspectRatio="none"
        className={`block h-8 w-[calc(100%+48px)] sm:h-11 ${bottomBg} ${
          prefersReduced ? '' : 'animate-wave-drift'
        }`}
      >
        <path
          d="M0,26 C240,52 480,2 720,26 C960,50 1200,6 1440,26 L1440,54 L0,54 Z"
          fill="currentColor"
        />
        <path
          d="M0,26 C240,52 480,2 720,26 C960,50 1200,6 1440,26"
          fill="none"
          stroke="#F58220"
          strokeOpacity="0.32"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}
