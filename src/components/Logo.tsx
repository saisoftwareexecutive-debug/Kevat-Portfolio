import { motion, useReducedMotion } from 'motion/react';
import { EASE_KSS } from '../utils/animations';

export type LogoVariant = 'full' | 'compact' | 'mark';

interface LogoProps {
  variant?: LogoVariant;
  /** Enables draw-in / entrance animation sequence (used in Preloader & Footer) */
  animated?: boolean;
  /** Enables slow rhythmic rowing cycle of boatman pole & gentle hull bob */
  rowing?: boolean;
  /** Light colors for dark navy backgrounds (#0E0D3A) */
  inverted?: boolean;
  /** Optional interactive hover bob & ripple ring (used in Navbar) */
  interactive?: boolean;
  className?: string;
}

const KEVAT_LETTERS = ['K', 'e', 'v', 'a', 't'];

/**
 * Hand-crafted layered SVG rebuild of the official Kevat Seva Setu LLP logo:
 * - Separate animated groups: boat + passengers, boatman, rowing pole, water ripples,
 *   cable-stayed Setu bridge (left & right pylons + deck), hand-brushed navy "Kevat",
 *   and spaced uppercase "SEVA SETU LLP".
 */
export function Logo({
  variant = 'full',
  animated = false,
  rowing = false,
  inverted = false,
  interactive = false,
  className = '',
}: LogoProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const shouldAnimate = animated && !prefersReduced;
  const shouldRow = rowing && !prefersReduced;

  const orangeMain = '#F58220';
  const orangeLight = '#FBA94C';
  const orangeDeep = '#D9650E';
  const navyInk = inverted ? '#FBF8F3' : '#1B1A5E';

  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 130 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Kevat Boat Mark"
      >
        <BoatAndBoatmanGroup
          orangeMain={orangeMain}
          orangeLight={orangeLight}
          orangeDeep={orangeDeep}
          rowing={shouldRow}
          animated={shouldAnimate}
          offsetX={0}
          offsetY={0}
        />
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`group/logo relative inline-flex items-center gap-2.5 select-none ${className}`}
      >
        <div className="relative flex items-center justify-center">
          <motion.svg
            viewBox="0 0 130 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-[62px] shrink-0 overflow-visible"
            whileHover={
              interactive && !prefersReduced
                ? { y: [0, -2.5, 0], rotate: [0, -1.8, 1.2, 0] }
                : undefined
            }
            transition={{ duration: 0.75, ease: EASE_KSS }}
            aria-hidden="true"
          >
            <BoatAndBoatmanGroup
              orangeMain={orangeMain}
              orangeLight={orangeLight}
              orangeDeep={orangeDeep}
              rowing={shouldRow}
              animated={shouldAnimate}
              offsetX={0}
              offsetY={0}
            />
          </motion.svg>
          {interactive && !prefersReduced && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full border border-[#F58220]/50 opacity-0 scale-50 transition-all duration-500 ease-out group-hover/logo:scale-125 group-hover/logo:opacity-100"
            />
          )}
        </div>

        <div className="flex flex-col leading-none">
          <span
            className={`text-[1.45rem] font-extrabold italic tracking-[-0.035em] leading-none ${
              inverted ? 'text-[#FBF8F3]' : 'text-[#1B1A5E] dark:text-[#FBF8F3]'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Kevat
          </span>
          <span
            className={`mt-0.5 text-[8.5px] font-bold tracking-[0.18em] uppercase ${
              inverted
                ? 'text-[#FBA94C]'
                : 'text-[#1B1A5E]/75 dark:text-[#FBA94C]'
            }`}
          >
            SEVA SETU LLP
          </span>
        </div>
      </div>
    );
  }

  // Full vertical-emblem lockup faithful to the attached official logo proportions
  return (
    <div className={`group/logo relative inline-block select-none ${className}`}>
      <svg
        viewBox="0 0 280 172"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Kevat Seva Setu LLP Official Logo"
      >
        {/* LAYER 1: Boat, Boatman, Pole, Passengers & Water Reflection */}
        <motion.g
          initial={shouldAnimate ? { x: -56, opacity: 0 } : false}
          animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE_KSS }}
          whileHover={
            interactive && !prefersReduced
              ? { y: [0, -3, 0], rotate: [0, -1.5, 1, 0] }
              : undefined
          }
          style={{ originX: '140px', originY: '62px' }}
        >
          <BoatAndBoatmanGroup
            orangeMain={orangeMain}
            orangeLight={orangeLight}
            orangeDeep={orangeDeep}
            rowing={shouldRow}
            animated={shouldAnimate}
            offsetX={76}
            offsetY={2}
          />
        </motion.g>

        {/* LAYER 2: Hand-Brushed Navy Italic Wordmark "Kevat" with iconic curved K tail */}
        <g aria-label="Kevat">
          {/* Signature sweeping calligraphic underline tail emerging from the K */}
          <motion.path
            d="M78 134 C84 148, 102 156, 117 148 C124 144, 128 138, 130 133"
            stroke={navyInk}
            strokeWidth="5.4"
            strokeLinecap="round"
            fill="none"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.65, delay: 1.1, ease: EASE_KSS }}
          />
          {KEVAT_LETTERS.map((char, idx) => {
            const xPositions = [66, 112, 141, 171, 200];
            return (
              <motion.text
                key={`${char}-${idx}`}
                x={xPositions[idx]}
                y={131}
                fill={navyInk}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 800,
                  fontSize: idx === 0 ? '54px' : '46px',
                  letterSpacing: '-0.04em',
                }}
                initial={
                  shouldAnimate
                    ? { opacity: 0, y: 12, skewX: -14 }
                    : false
                }
                animate={
                  shouldAnimate
                    ? { opacity: 1, y: 0, skewX: 0 }
                    : undefined
                }
                transition={{
                  duration: 0.55,
                  delay: 0.95 + idx * 0.08,
                  ease: EASE_KSS,
                }}
              >
                {char}
              </motion.text>
            );
          })}
        </g>

        {/* LAYER 3: "SEVA SETU LLP" in crisp spaced capitals */}
        <motion.text
          x="132"
          y="149"
          fill={navyInk}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: '12.5px',
          }}
          initial={
            shouldAnimate
              ? { opacity: 0, y: 8, letterSpacing: '0.38em' }
              : { letterSpacing: '0.11em' }
          }
          animate={
            shouldAnimate
              ? { opacity: 1, y: 0, letterSpacing: '0.11em' }
              : undefined
          }
          transition={{ duration: 0.65, delay: 1.48, ease: EASE_KSS }}
        >
          SEVA SETU LLP
        </motion.text>

        {/* LAYER 4: Cable-Stayed Setu Bridge (Left Pylon + Right Pylon + Span Deck) */}
        <g>
          {/* Left Bridge Pylon & Stay Cables */}
          <motion.path
            d="M45 159 L53 123 L57 159"
            stroke={orangeDeep}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_KSS }}
          />
          <motion.path
            d="M52 126 L20 158 M52 132 L29 158 M52 138 L37 158"
            stroke={orangeMain}
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_KSS }}
          />

          {/* Right Bridge Pylon & Stay Cables */}
          <motion.path
            d="M235 159 L227 123 L223 159"
            stroke={orangeDeep}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_KSS }}
          />
          <motion.path
            d="M228 126 L260 158 M228 132 L251 158 M228 138 L243 158"
            stroke={orangeMain}
            strokeWidth="1.4"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_KSS }}
          />

          {/* Horizontal Sweeping Bridge Deck & Lower Reflection Span */}
          <motion.path
            d="M10 159 Q140 165 270 159"
            stroke={orangeMain}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE_KSS }}
          />
          <motion.path
            d="M36 165 Q140 169 244 165"
            stroke={orangeLight}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { pathLength: 1, opacity: 0.85 } : undefined}
            transition={{ duration: 0.65, delay: 0.3, ease: EASE_KSS }}
          />
        </g>
      </svg>

      {/* Subtle hover ripple ring under navbar logo */}
      {interactive && !prefersReduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full border border-[#F58220]/50 opacity-0 scale-75 transition-all duration-500 ease-out group-hover/logo:scale-110 group-hover/logo:opacity-100"
        />
      )}
    </div>
  );
}

interface BoatAndBoatmanGroupProps {
  orangeMain: string;
  orangeLight: string;
  orangeDeep: string;
  rowing: boolean;
  animated: boolean;
  offsetX: number;
  offsetY: number;
}

function BoatAndBoatmanGroup({
  orangeMain,
  orangeLight,
  orangeDeep,
  rowing,
  animated,
  offsetX,
  offsetY,
}: BoatAndBoatmanGroupProps) {
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* Gentle bobbing boat + boatman + passengers */}
      <motion.g
        animate={
          rowing
            ? {
                y: [0, -2.6, 0.8, 0],
                rotate: [-1.2, 1.4, -0.8, -1.2],
              }
            : undefined
        }
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ originX: '64px', originY: '54px' }}
      >
        {/* Stern Pennant Flag */}
        <path
          d="M17 44 L17 31 L8 34.5 L17 38"
          fill={orangeMain}
          stroke={orangeDeep}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Standing Boatman ("Kevat") in dhoti silhouette */}
        <g aria-label="Boatman">
          {/* Head */}
          <circle cx="40" cy="14" r="4.6" fill={orangeDeep} />
          {/* Torso & raised arms holding pole */}
          <path
            d="M36 20 C35 24, 35 28, 37 32 L43 32 C44 28, 45 24, 42 20 Z"
            fill={orangeMain}
          />
          <path
            d="M42 22 L51 19 M37 22 L43 26"
            stroke={orangeDeep}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Dhoti & Striding Legs bracing on boat */}
          <path
            d="M36.5 32 L43.5 32 L45 41 L35 41 Z"
            fill={orangeLight}
            stroke={orangeDeep}
            strokeWidth="1.2"
          />
          <path
            d="M37 41 L33 53 M43 41 L46 54"
            stroke={orangeDeep}
            strokeWidth="3.1"
            strokeLinecap="round"
          />
        </g>

        {/* Long Rowing Pole dipping & pushing in slow cycle */}
        <motion.g
          animate={
            rowing
              ? {
                  rotate: [-5.5, 4.5, -5.5],
                  x: [-1.5, 2, -1.5],
                  y: [0, 2, 0],
                }
              : undefined
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ originX: '44px', originY: '26px' }}
        >
          <path
            d="M17 64 L62 4"
            stroke={orangeDeep}
            strokeWidth="2.7"
            strokeLinecap="round"
          />
          {/* Small brush-stroke paddle splash at bottom of pole */}
          <path
            d="M14 63 L21 66 M15 66 L20 62"
            stroke={orangeMain}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Three Seated Passengers in the bow of the boat */}
        <g aria-label="Seated passengers">
          {/* Passenger 1 */}
          <path
            d="M68 55 C68 47, 72 41, 76 41 C80 41, 83 47, 84 55 Z"
            fill={orangeMain}
          />
          {/* Passenger 2 */}
          <path
            d="M82 55 C82 49, 85 45, 88.5 45 C92 45, 95 49, 95.5 55 Z"
            fill={orangeDeep}
          />
          {/* Passenger 3 */}
          <path
            d="M93 55 C94 48, 96.5 43, 100 43 C103.5 43, 106 48, 107 55 Z"
            fill={orangeMain}
          />
        </g>

        {/* Curved Hand-Brushed Wooden Boat Hull */}
        <path
          d="M14 43 C27 52, 46 56, 72 56 C93 56, 109 53, 121 47 C116 56, 106 63, 94 64 L40 64 C28 63, 19 54, 14 43 Z"
          fill={orangeMain}
        />
        <path
          d="M22 50 C42 58, 86 60, 114 52"
          stroke={orangeDeep}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      </motion.g>

      {/* Water Reflection Brush Strokes below Boat */}
      <motion.g
        animate={
          rowing || animated
            ? {
                x: [-2.5, 2.5, -2.5],
                opacity: [0.78, 1, 0.78],
              }
            : undefined
        }
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path
          d="M36 68 H97 M44 72 H92 M52 76 H84 M60 80 H76"
          stroke={orangeLight}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </motion.g>
    </g>
  );
}

/**
 * Small boat mark loading spinner used in buttons & async states
 */
export function BoatSpinner({ className = 'h-5 w-7' }: { className?: string }) {
  const prefersReduced = useReducedMotion() ?? false;
  return (
    <motion.span
      aria-hidden="true"
      animate={prefersReduced ? undefined : { y: [0, -2.5, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <Logo variant="mark" className="h-full w-full" />
    </motion.span>
  );
}
