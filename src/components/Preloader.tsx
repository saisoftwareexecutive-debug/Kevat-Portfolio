import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { EASE_KSS } from '../utils/animations';
import { Logo } from './Logo';

interface PreloaderProps {
  visible: boolean;
  onComplete: () => void;
}

/**
 * Signature 2.8s session-once Preloader:
 * 1. Off-white #FBF8F3 canvas with thin navy water line across center
 * 2. Bridge lines draw from both sides + slow sine-wave water ripple morph
 * 3. Orange boat glides in from left with rowing pole & bob
 * 4. "Kevat" masks in letter-by-letter with italic skew settling, "SEVA SETU LLP" tracks in
 * 5. Shared layoutId="kss-brand-logo" shrinks & flies to navbar as curtain lifts
 */
export function Preloader({ visible, onComplete }: PreloaderProps) {
  const prefersReduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (!visible) return;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('kss-intro-played', '1');
      } catch {
        // Ignore sessionStorage restrictions
      }
      onComplete();
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [visible, prefersReduced, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="kss-preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: EASE_KSS },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#FBF8F3] px-6 text-[#1B1A5E]"
          role="status"
          aria-label="Opening Kevat Seva Setu LLP"
        >
          {/* Paper grain texture */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 paper-grain" />

          {/* Thin Navy River Water Line spanning across middle with slow sine-wave morph */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 w-full"
          >
            <motion.path
              stroke="#1B1A5E"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              fill="none"
              initial={{
                pathLength: 0,
                d: 'M0 40 Q 360 40 720 40 T 1440 40',
              }}
              animate={{
                pathLength: 1,
                d: [
                  'M0 40 Q 360 40 720 40 T 1440 40',
                  'M0 40 Q 240 28 480 40 T 960 40 T 1440 40',
                  'M0 40 Q 240 52 480 40 T 960 40 T 1440 40',
                  'M0 40 Q 360 36 720 40 T 1440 40',
                ],
              }}
              transition={{
                pathLength: { duration: 0.75, ease: EASE_KSS },
                d: { duration: 2.6, delay: 0.35, ease: 'easeInOut' },
              }}
            />
            <motion.path
              stroke="#F58220"
              strokeOpacity="0.32"
              strokeWidth="1.2"
              fill="none"
              initial={{
                pathLength: 0,
                d: 'M0 48 Q 360 48 720 48 T 1440 48',
              }}
              animate={{
                pathLength: 1,
                d: [
                  'M0 48 Q 360 48 720 48 T 1440 48',
                  'M0 48 Q 300 58 600 48 T 1200 48 T 1440 48',
                  'M0 48 Q 300 38 600 48 T 1200 48 T 1440 48',
                ],
              }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.25, ease: EASE_KSS },
                d: { duration: 2.4, delay: 0.4, ease: 'easeInOut' },
              }}
            />
          </svg>

          {/* Center Animated Logo with shared layoutId into Navbar */}
          <motion.div
            layoutId="kss-brand-logo"
            transition={{ duration: 0.8, ease: EASE_KSS }}
            className="relative z-10 w-[260px] sm:w-[320px]"
          >
            <Logo variant="full" animated rowing />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.75, ease: EASE_KSS }}
            className="relative z-10 mt-6 text-center text-xs font-medium tracking-[0.14em] uppercase text-[#1B1A5E]/65"
          >
            Carrying Hospitals Across Every Claim
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
