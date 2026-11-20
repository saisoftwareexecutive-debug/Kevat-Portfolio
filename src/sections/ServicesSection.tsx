import { ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { TiltCard } from '../components/TiltCard';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

interface ServicesSectionProps {
  onSelectServiceQuote: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceQuote }: ServicesSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>('scheme-implementation');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="relative bg-[#F4EEE3] py-20 sm:py-28 dark:bg-[#121147]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.services.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.services.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.services.title}
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpBlur}
            className="text-sm leading-relaxed text-[#1B1A5E]/72 lg:col-span-4 dark:text-[#FBF8F3]/75"
          >
            {SITE_CONTENT.services.subtitle}
          </motion.p>
        </motion.div>

        {/* Asymmetric Editorial Bento Grid — Varied Visual Weights, No Clip-Art Icons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {SITE_CONTENT.services.items.map((service, idx) => {
            const isExpanded = expandedId === service.id;
            const isDarkFeatured = idx === 0;
            const spanClass =
              service.span === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <motion.div key={service.id} variants={fadeUpBlur} className={spanClass}>
                <TiltCard
                  cursorMode="view"
                  glowColor={
                    isDarkFeatured
                      ? 'rgba(245, 130, 32, 0.2)'
                      : 'rgba(245, 130, 32, 0.12)'
                  }
                  maxTilt={3.5}
                  className={`h-full rounded-[22px] border transition-colors duration-300 ${
                    isDarkFeatured
                      ? 'border-[#1B1A5E] bg-[#0E0D3A] text-[#FBF8F3]'
                      : 'border-[#1B1A5E]/15 bg-[#FBF8F3] text-[#1B1A5E] hover:border-[#F58220] dark:border-[#FBF8F3]/15 dark:bg-[#0E0D3A] dark:text-[#FBF8F3] dark:hover:border-[#FBA94C]'
                  }`}
                >
                  <div className="relative z-20 flex h-full flex-col justify-between p-7 sm:p-9">
                    <div>
                      <div className="flex items-start justify-between gap-4 border-b border-current/12 pb-5">
                        <div>
                          <span
                            className={`font-mono text-xs font-bold ${
                              isDarkFeatured
                                ? 'text-[#FBA94C]'
                                : 'text-[#D9650E] dark:text-[#FBA94C]'
                            }`}
                          >
                            {service.index}
                          </span>
                          <h3 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                            {service.title}
                          </h3>
                        </div>

                        <div className="text-right shrink-0">
                          <p
                            className={`font-mono text-2xl font-bold tabular-nums ${
                              isDarkFeatured
                                ? 'text-[#F58220]'
                                : 'text-[#D9650E] dark:text-[#FBA94C]'
                            }`}
                          >
                            {service.metric}
                          </p>
                          <p className="text-[11px] opacity-65">{service.metricLabel}</p>
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-relaxed opacity-80">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="mt-6">
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="detail"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45, ease: EASE_KSS }}
                            className="overflow-hidden"
                          >
                            <div className="mb-5 border-t border-current/12 pt-5">
                              <p
                                className={`text-xs font-bold uppercase tracking-[0.12em] ${
                                  isDarkFeatured
                                    ? 'text-[#FBA94C]'
                                    : 'text-[#D9650E] dark:text-[#FBA94C]'
                                }`}
                              >
                                Execution Scope
                              </p>
                              <ul className="mt-3 space-y-2.5">
                                {service.deliverables.map((point) => (
                                  <li
                                    key={point}
                                    className="flex items-start gap-2.5 text-sm leading-snug opacity-90"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F58220]" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                              <p
                                className={`mt-4 rounded-xl px-4 py-3 text-xs font-semibold ${
                                  isDarkFeatured
                                    ? 'bg-white/[0.06] text-[#FBF8F3]'
                                    : 'bg-[#F4EEE3] text-[#1B1A5E] dark:bg-white/[0.06] dark:text-[#FBF8F3]'
                                }`}
                              >
                                Outcome: {service.outcome}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-current/12 pt-5">
                        <button
                          type="button"
                          onClick={() => toggleExpand(service.id)}
                          aria-expanded={isExpanded}
                          className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-[#F58220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded px-1 py-0.5"
                        >
                          <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectServiceQuote(service.title)}
                          className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors whitespace-nowrap ${
                            isDarkFeatured
                              ? 'text-[#FBA94C] hover:text-white'
                              : 'text-[#D9650E] hover:text-[#1B1A5E] dark:text-[#FBA94C] dark:hover:text-white'
                          }`}
                        >
                          <span>Request Proposal</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
