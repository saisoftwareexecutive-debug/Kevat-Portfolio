import { motion, useReducedMotion } from 'motion/react';
import { EASE_KSS } from '../utils/animations';

interface SplitTextProps {
  prefix: string;
  highlight: string;
  suffix: string;
  className?: string;
}

/**
 * Editorial headline reveal with an animated hand-drawn orange brush-stroke
 * underline beneath the key word ("Reliability").
 */
export function SplitText({ prefix, highlight, suffix, className = '' }: SplitTextProps) {
  const prefersReduced = useReducedMotion() ?? false;

  const prefixWords = prefix.trim().split(/\s+/);
  const suffixWords = suffix.trim().split(/\s+/);
  const highlightChars = highlight.split('');

  if (prefersReduced) {
    return (
      <h1 className={className}>
        {prefix}{' '}
        <span className="relative inline-block italic text-[#D9650E] dark:text-[#FBA94C]">
          {highlight}
          <BrushUnderline animated={false} />
        </span>{' '}
        {suffix}
      </h1>
    );
  }

  let runningDelay = 0.08;

  return (
    <h1 className={className} aria-label={`${prefix} ${highlight} ${suffix}`}>
      {prefixWords.map((word, idx) => {
        const delay = runningDelay;
        runningDelay += 0.06;
        return (
          <span
            key={`pre-${idx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em]"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay, ease: EASE_KSS }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}

      {/* Highlighted italic word with animated orange brush-stroke underline */}
      <span
        className="relative inline-flex align-bottom pb-[0.08em] mr-[0.25em]"
        aria-hidden="true"
      >
        <span className="inline-flex overflow-hidden pr-[0.04em]">
          {highlightChars.map((char, idx) => {
            const delay = runningDelay + idx * 0.032;
            return (
              <motion.span
                key={`hl-${idx}`}
                className="inline-block italic text-[#D9650E] dark:text-[#FBA94C]"
                initial={{ y: '110%', opacity: 0, skewX: -10 }}
                animate={{ y: '0%', opacity: 1, skewX: 0 }}
                transition={{ duration: 0.62, delay, ease: EASE_KSS }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
        <BrushUnderline animated delay={runningDelay + 0.35} />
      </span>

      {suffixWords.map((word, idx) => {
        const delay = runningDelay + highlightChars.length * 0.025 + idx * 0.055;
        return (
          <span
            key={`suf-${idx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em]"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay, ease: EASE_KSS }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

function BrushUnderline({ animated, delay = 0.5 }: { animated: boolean; delay?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 22"
      fill="none"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1.5 left-0 h-[14px] w-full overflow-visible"
    >
      <motion.path
        d="M3 14 C 52 5, 134 4, 217 12"
        stroke="#F58220"
        strokeWidth="5.2"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.78, delay, ease: EASE_KSS }}
      />
      <motion.path
        d="M18 19 C 82 14, 152 14, 206 18"
        stroke="#FBA94C"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 0.85 } : undefined}
        transition={{ duration: 0.6, delay: delay + 0.16, ease: EASE_KSS }}
      />
    </svg>
  );
}
