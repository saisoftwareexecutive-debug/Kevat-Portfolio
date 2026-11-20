import { CheckCircle2, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_KSS } from '../utils/animations';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  variant?: 'success' | 'info';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-24 right-4 z-[85] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE_KSS }}
            className="flex items-start gap-3 rounded-2xl border border-[#1B1A5E]/18 bg-[#FBF8F3]/98 p-4 shadow-xl backdrop-blur-md dark:border-[#FBF8F3]/18 dark:bg-[#15144B]/98"
            role="status"
          >
            {toast.variant === 'info' ? (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1B1A5E] dark:text-[#FBA94C]" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D9650E] dark:text-[#FBA94C]" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                {toast.title}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#1B1A5E]/72 dark:text-[#FBF8F3]/75">
                {toast.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 text-[#1B1A5E]/45 transition-colors hover:bg-[#1B1A5E]/10 hover:text-[#1B1A5E] dark:text-[#FBF8F3]/50 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
