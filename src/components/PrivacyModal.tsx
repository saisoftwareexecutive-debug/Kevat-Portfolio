import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS } from '../utils/animations';
import { Logo } from './Logo';

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#0E0D3A]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.4, ease: EASE_KSS }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#1B1A5E]/18 bg-[#FBF8F3] p-6 sm:p-8 shadow-2xl dark:border-[#FBF8F3]/15 dark:bg-[#121147]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#1B1A5E]/15 pb-5 dark:border-[#FBF8F3]/15">
              <div className="flex items-center gap-3.5">
                <Logo variant="mark" className="h-9 w-14 shrink-0" />
                <div>
                  <h2
                    id="privacy-modal-title"
                    className="text-xl font-bold text-[#1B1A5E] dark:text-[#FBF8F3]"
                  >
                    Privacy Policy & Data Governance
                  </h2>
                  <p className="text-xs text-[#1B1A5E]/65 dark:text-[#FBF8F3]/65">
                    {SITE_CONTENT.company.name} · {SITE_CONTENT.company.udyamNo}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close privacy policy"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[#1B1A5E]/60 transition-colors hover:bg-[#1B1A5E]/10 hover:text-[#1B1A5E] dark:text-[#FBF8F3]/60 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {SITE_CONTENT.footer.privacyPolicy.map((item) => (
                <div key={item.heading}>
                  <h3 className="text-sm font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                    {item.heading}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#1B1A5E]/78 dark:text-[#FBF8F3]/78">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t border-[#1B1A5E]/15 pt-5 dark:border-[#FBF8F3]/15">
              <button
                type="button"
                onClick={onClose}
                className="btn-crafted bg-[#1B1A5E] px-6 py-2.5 text-sm font-semibold text-[#FBF8F3] transition-colors hover:bg-[#D9650E] dark:bg-[#F58220] dark:text-[#0E0D3A] dark:hover:bg-[#FBA94C]"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
