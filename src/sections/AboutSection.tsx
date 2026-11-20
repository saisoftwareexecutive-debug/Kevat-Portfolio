import { Check } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ResilientImage } from '../components/ResilientImage';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

export function AboutSection() {
  const prefersReduced = useReducedMotion() ?? false;
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(imgProgress, [0, 1], ['-5%', '5%']);

  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 68%'],
  });

  return (
    <section
      id="about"
      className="relative bg-[#FBF8F3] py-20 sm:py-28 dark:bg-[#0E0D3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Left-Aligned Section Header with Oversized Outline Numeral */}
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
                {SITE_CONTENT.about.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.about.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 max-w-3xl text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.about.title}
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUpBlur}
            className="text-sm leading-relaxed text-[#1B1A5E]/72 lg:col-span-4 dark:text-[#FBF8F3]/75"
          >
            {SITE_CONTENT.company.brandStory}
          </motion.p>
        </motion.div>

        {/* Asymmetric Split: Overlapping Editorial Image + Scroll-Drawn Timeline vs Narrative + Ruled Checklist */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column */}
          <div className="space-y-12 lg:col-span-5">
            <div className="relative pb-10 sm:pr-6">
              <motion.div
                ref={imageWrapRef}
                initial={{ opacity: 0, clipPath: 'inset(10% 0% 10% 0% round 16px)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
                viewport={viewportOnce}
                transition={{ duration: 0.85, ease: EASE_KSS }}
                className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-[#1B1A5E]/15 dark:border-[#FBF8F3]/15"
              >
                <motion.div
                  style={prefersReduced ? undefined : { y: imageY, scale: 1.1 }}
                  className="h-full w-full"
                >
                  <ResilientImage
                    src={SITE_CONTENT.about.image}
                    alt={SITE_CONTENT.about.imageAlt}
                    fallbackTitle="Kevat Seva Setu LLP Hospital Team"
                  />
                </motion.div>
              </motion.div>

              {/* Editorial Text Overlapping Photograph */}
              <motion.div
                variants={fadeUpBlur}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative -mt-12 ml-4 sm:ml-10 rounded-[16px] border border-[#1B1A5E]/15 bg-[#FBF8F3] p-5 shadow-[0_16px_38px_rgba(27,26,94,0.12)] dark:border-[#FBF8F3]/15 dark:bg-[#141347]"
              >
                <p className="font-mono text-[11px] font-semibold text-[#D9650E] dark:text-[#FBA94C]">
                  {SITE_CONTENT.company.establishedLabel} · {SITE_CONTENT.company.udyamNo}
                </p>
                <p
                  className="mt-1.5 text-base font-bold leading-snug text-[#1B1A5E] dark:text-[#FBF8F3]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  “A boatman does not leave travellers mid-river. We stay with every claim until the
                  hospital’s bank credit clears.”
                </p>
              </motion.div>
            </div>

            {/* Scroll-Drawn Vertical Journey Line */}
            <div ref={timelineRef} className="relative pl-8">
              <div
                aria-hidden="true"
                className="absolute left-[11px] top-2 bottom-2 w-px bg-[#1B1A5E]/18 dark:bg-[#FBF8F3]/18"
              />
              <motion.div
                aria-hidden="true"
                style={{ scaleY: prefersReduced ? 1 : lineProgress }}
                className="absolute left-[11px] top-2 bottom-2 w-[2px] origin-top bg-[#F58220]"
              />

              <div className="space-y-6">
                {SITE_CONTENT.about.timeline.map((milestone) => (
                  <motion.div
                    key={milestone.year}
                    variants={fadeUpBlur}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className="relative"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#F58220] bg-[#FBF8F3] dark:bg-[#0E0D3A]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#1B1A5E] dark:bg-[#FBA94C]" />
                    </span>
                    <p className="font-mono text-xs font-bold text-[#D9650E] tabular-nums dark:text-[#FBA94C]">
                      {milestone.year}
                    </p>
                    <h3 className="mt-0.5 text-base font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#1B1A5E]/72 dark:text-[#FBF8F3]/72">
                      {milestone.summary}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative + 1px Ruled Operational Checklist */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.p
              variants={fadeUpBlur}
              className="text-lg font-medium leading-relaxed text-[#1B1A5E] sm:text-xl dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.about.lead}
            </motion.p>

            <motion.p
              variants={fadeUpBlur}
              className="mt-5 text-base leading-relaxed text-[#1B1A5E]/75 dark:text-[#FBF8F3]/75"
            >
              {SITE_CONTENT.about.body}
            </motion.p>

            {/* Editorial Ruled List instead of boxed pill clutter */}
            <div className="mt-10 border-t border-[#1B1A5E]/15 dark:border-[#FBF8F3]/15">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {SITE_CONTENT.about.highlights.map((item, idx) => (
                  <motion.div
                    key={item}
                    variants={fadeUpBlur}
                    className={`flex items-start gap-3.5 border-b border-[#1B1A5E]/12 py-4 pr-4 dark:border-[#FBF8F3]/12 ${
                      idx % 2 === 0 ? 'sm:border-r sm:pr-6' : 'sm:pl-6'
                    }`}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F58220]" />
                    <span className="text-sm font-semibold leading-snug text-[#1B1A5E] dark:text-[#FBF8F3]/92">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
