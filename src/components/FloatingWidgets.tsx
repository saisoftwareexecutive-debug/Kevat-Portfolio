import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { SITE_CONTENT } from '../data/content';

export function FloatingWidgets() {
  const { scrollY, scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quickOpen, setQuickOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowTop(latest > 440);
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Back-to-top button with circular orange scroll-progress ring */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#1B1A5E]/18 bg-[#FBF8F3] text-[#1B1A5E] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] dark:border-[#FBF8F3]/20 dark:bg-[#15144B] dark:text-[#FBF8F3]"
          >
            <svg
              className="absolute inset-0 -rotate-90"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.14"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="#F58220"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp className="relative z-10 h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Quick-connect drawer */}
      <AnimatePresence>
        {quickOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            className="flex flex-col gap-1.5 rounded-2xl border border-[#1B1A5E]/18 bg-[#FBF8F3] p-2.5 shadow-2xl dark:border-[#FBF8F3]/18 dark:bg-[#15144B]"
          >
            <a
              href={`https://wa.me/${SITE_CONTENT.company.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kevat Seva Setu LLP, we would like to discuss government health scheme or TPA claim support for our hospital.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1B1A5E] transition-colors hover:bg-[#F58220]/12 hover:text-[#D9650E] dark:text-[#FBF8F3] dark:hover:bg-[#F58220]/20 whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 text-[#F58220]" />
              <span>WhatsApp Help Desk</span>
            </a>
            <a
              href={SITE_CONTENT.company.phoneHref}
              className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#1B1A5E] transition-colors hover:bg-[#1B1A5E]/10 dark:text-[#FBF8F3] dark:hover:bg-white/10 whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-[#1B1A5E] dark:text-[#FBA94C]" />
              <span>Call {SITE_CONTENT.company.phone}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp / Call Action Button */}
      <div className="relative">
        <motion.span
          aria-hidden="true"
          animate={{ scale: [1, 1.3, 1], opacity: [0.42, 0, 0.42] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[#F58220]"
        />
        <button
          type="button"
          onClick={() => setQuickOpen((prev) => !prev)}
          aria-label="Contact Kevat Seva Setu via WhatsApp or Call"
          aria-expanded={quickOpen}
          className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#F58220] text-[#0E0D3A] shadow-[0_10px_26px_rgba(217,101,14,0.38)] transition-transform hover:scale-105 hover:bg-[#FBA94C] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1A5E] focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
