import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(SITE_CONTENT.faqs.items[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="relative bg-[#F4EEE3] py-20 sm:py-28 dark:bg-[#121147]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left-Aligned Sticky Editorial Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.faqs.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.faqs.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:leading-[1.1] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.faqs.title}
            </motion.h2>
            <motion.p
              variants={fadeUpBlur}
              className="mt-4 text-sm leading-relaxed text-[#1B1A5E]/72 sm:text-base dark:text-[#FBF8F3]/74"
            >
              {SITE_CONTENT.faqs.subtitle}
            </motion.p>
          </motion.div>

          {/* Right 1px Ruled Accordion Ledger */}
          <div className="border-t border-[#1B1A5E]/16 lg:col-span-8 dark:border-[#FBF8F3]/16">
            {SITE_CONTENT.faqs.items.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  variants={fadeUpBlur}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="border-b border-[#1B1A5E]/16 dark:border-[#FBF8F3]/16"
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-bold text-[#D9650E] tabular-nums dark:text-[#FBA94C]">
                        0{idx + 1}.
                      </span>
                      <span className="text-base font-bold text-[#1B1A5E] sm:text-lg dark:text-[#FBF8F3]">
                        {faq.question}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_KSS }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isOpen
                          ? 'bg-[#F58220] text-[#0E0D3A]'
                          : 'border border-[#1B1A5E]/20 text-[#1B1A5E] dark:border-[#FBF8F3]/20 dark:text-[#FBF8F3]'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: EASE_KSS }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-10 text-sm leading-relaxed text-[#1B1A5E]/78 sm:text-base dark:text-[#FBF8F3]/78">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
