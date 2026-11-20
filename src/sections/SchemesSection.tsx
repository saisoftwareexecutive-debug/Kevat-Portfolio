import { Check, RotateCw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SITE_CONTENT, type SchemeItem } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

type SchemeCategory = (typeof SITE_CONTENT.schemes.categories)[number];

export function SchemesSection() {
  const [activeCategory, setActiveCategory] = useState<SchemeCategory>('All');
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const filteredSchemes =
    activeCategory === 'All'
      ? SITE_CONTENT.schemes.items
      : SITE_CONTENT.schemes.items.filter((item) => item.category === activeCategory);

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="schemes"
      className="relative bg-[#FBF8F3] py-20 sm:py-28 dark:bg-[#0E0D3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-[#1B1A5E]/15 pb-10 lg:flex-row lg:items-end lg:justify-between dark:border-[#FBF8F3]/15">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl"
          >
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.schemes.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.schemes.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.schemes.title}
            </motion.h2>
            <motion.p
              variants={fadeUpBlur}
              className="mt-4 text-sm leading-relaxed text-[#1B1A5E]/72 sm:text-base dark:text-[#FBF8F3]/74"
            >
              {SITE_CONTENT.schemes.subtitle}
            </motion.p>
          </motion.div>

          {/* Segmented Filter Tabs with layoutId Sliding Indicator */}
          <div
            role="tablist"
            aria-label="Filter healthcare schemes by category"
            className="inline-flex flex-wrap gap-1 rounded-xl border border-[#1B1A5E]/16 bg-[#F4EEE3] p-1.5 dark:border-[#FBF8F3]/16 dark:bg-[#15144B]"
          >
            {SITE_CONTENT.schemes.categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`relative rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] ${
                    active
                      ? 'text-[#FBF8F3] dark:text-[#0E0D3A]'
                      : 'text-[#1B1A5E]/72 hover:text-[#1B1A5E] dark:text-[#FBF8F3]/72 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="schemes-tab-pill"
                      transition={{ duration: 0.45, ease: EASE_KSS }}
                      className="absolute inset-0 rounded-lg bg-[#1B1A5E] dark:bg-[#F58220]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Flip Card Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSchemes.map((scheme) => (
              <SchemeFlipCard
                key={scheme.id}
                scheme={scheme}
                isFlipped={Boolean(flippedIds[scheme.id])}
                onToggle={() => toggleFlip(scheme.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SchemeFlipCard({
  scheme,
  isFlipped,
  onToggle,
}: {
  scheme: SchemeItem;
  isFlipped: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE_KSS }}
      data-cursor="view"
      className="group perspective-1200 h-[318px]"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-pressed={isFlipped}
        aria-label={`${scheme.name} — hover or click to flip for execution playbook`}
        className={`relative h-full w-full cursor-pointer preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded-[20px] ${
          isFlipped ? 'rotate-y-180' : 'group-hover:rotate-y-180'
        }`}
      >
        {/* Front Face */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-[20px] border border-[#1B1A5E]/15 bg-white p-6 dark:border-[#FBF8F3]/15 dark:bg-[#15144B]">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[#1B1A5E]/12 pb-3.5 dark:border-[#FBF8F3]/12">
              <span className="font-mono text-xs font-bold text-[#D9650E] dark:text-[#FBA94C]">
                {scheme.code}
              </span>
              <span className="text-[11px] font-medium text-[#1B1A5E]/58 dark:text-[#FBF8F3]/60">
                {scheme.category}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold leading-snug text-[#1B1A5E] dark:text-[#FBF8F3]">
              {scheme.name}
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-[#1B1A5E]/72 dark:text-[#FBF8F3]/74">
              {scheme.summary}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#1B1A5E]/12 pt-3.5 text-xs dark:border-[#FBF8F3]/12">
            <span className="font-semibold text-[#1B1A5E] dark:text-[#FBF8F3]/90 truncate pr-2">
              {scheme.coverage}
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-[#D9650E] dark:text-[#FBA94C] shrink-0">
              <RotateCw className="h-3.5 w-3.5" />
              <span>Playbook</span>
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[20px] border border-[#F58220]/70 bg-[#0E0D3A] p-6 text-[#FBF8F3] shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-[#FBF8F3]/14 pb-3">
              <span className="font-mono text-xs font-bold text-[#FBA94C]">
                {scheme.code} Playbook
              </span>
              <span className="text-[11px] font-semibold text-[#F58220]">
                SOP Governed
              </span>
            </div>

            <p className="mt-3 text-xs font-bold text-[#FBF8F3]">
              {scheme.tatTarget}
            </p>

            <ul className="mt-3.5 space-y-2">
              {scheme.workflowHighlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs leading-snug text-[#FBF8F3]/85"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F58220]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#FBF8F3]/14 pt-3">
            <p className="text-[11px] leading-relaxed text-[#FBF8F3]/72">
              <span className="font-bold text-[#FBA94C]">Eligibility:</span>{' '}
              {scheme.eligibilityNote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
