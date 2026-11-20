import { Check } from 'lucide-react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { useRef } from 'react';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

export function HowWeWorkSection() {
  const prefersReduced = useReducedMotion() ?? false;
  const pathContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pathContainerRef,
    offset: ['start 72%', 'end 68%'],
  });

  return (
    <section
      aria-label="How We Work Process"
      className="relative overflow-hidden bg-[#F4EEE3] py-20 sm:py-28 dark:bg-[#121147]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-end gap-6 border-b border-[#1B1A5E]/15 pb-10 lg:grid-cols-12 dark:border-[#FBF8F3]/15"
        >
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.howWeWork.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.howWeWork.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.howWeWork.title}
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpBlur}
            className="text-sm leading-relaxed text-[#1B1A5E]/72 lg:col-span-4 dark:text-[#FBF8F3]/75"
          >
            {SITE_CONTENT.howWeWork.subtitle}
          </motion.p>
        </motion.div>

        {/* 5-Step Animated Crossing Path */}
        <div ref={pathContainerRef} className="relative mt-16">
          {/* Desktop horizontal river-bridge line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[6%] right-[6%] top-[28px] h-[2px] bg-[#1B1A5E]/15 dark:bg-[#FBF8F3]/18"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: prefersReduced ? 1 : scrollYProgress }}
            className="hidden lg:block absolute left-[6%] right-[6%] top-[27px] h-[3.5px] origin-left bg-gradient-to-r from-[#D9650E] via-[#F58220] to-[#FBA94C]"
          />

          {/* Mobile vertical connecting line */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-[23px] top-6 bottom-6 w-[2px] bg-[#1B1A5E]/15 dark:bg-[#FBF8F3]/18"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReduced ? 1 : scrollYProgress }}
            className="lg:hidden absolute left-[23px] top-6 bottom-6 w-[3px] origin-top bg-[#F58220]"
          />

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-5 lg:gap-5">
            {SITE_CONTENT.howWeWork.steps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: EASE_KSS }}
                className="relative flex gap-5 lg:flex-col lg:items-start"
              >
                <motion.div
                  initial={{ scale: 0.72, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.55, delay: idx * 0.085, ease: EASE_KSS }}
                  className="relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#F58220] bg-[#FBF8F3] font-mono text-base font-bold text-[#1B1A5E] shadow-sm dark:bg-[#0E0D3A] dark:text-[#FBF8F3]"
                >
                  {step.step}
                </motion.div>

                <div className="flex-1 rounded-[18px] border border-[#1B1A5E]/14 bg-[#FBF8F3] p-5 transition-colors hover:border-[#F58220] lg:mt-4 lg:w-full dark:border-[#FBF8F3]/14 dark:bg-[#0E0D3A]">
                  <p className="font-mono text-[11px] font-bold text-[#D9650E] dark:text-[#FBA94C]">
                    {step.duration}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#1B1A5E]/72 dark:text-[#FBF8F3]/74">
                    {step.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 border-t border-[#1B1A5E]/12 pt-3 text-xs font-bold text-[#1B1A5E] dark:border-[#FBF8F3]/12 dark:text-[#FBF8F3]/90">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#F58220]" />
                    <span>{step.checkpoint}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
