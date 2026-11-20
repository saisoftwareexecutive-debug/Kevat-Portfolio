import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, useReducedMotion, type PanInfo } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

const AUTOPLAY_MS = 6500;

export function TestimonialsSection() {
  const prefersReduced = useReducedMotion() ?? false;
  const items = SITE_CONTENT.testimonials.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, prefersReduced, next, activeIndex]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -55) next();
    else if (info.offset.x > 55) prev();
  };

  return (
    <section
      aria-label="Hospital Partner Reviews"
      className="relative overflow-hidden bg-[#FBF8F3] py-20 sm:py-28 dark:bg-[#0E0D3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#1B1A5E]/15 pb-10 md:flex-row md:items-end md:justify-between dark:border-[#FBF8F3]/15">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl"
          >
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.testimonials.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.testimonials.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.testimonials.title}
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-[#F58220]" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-mono font-bold text-[#1B1A5E] tabular-nums dark:text-[#FBF8F3]">
                  {SITE_CONTENT.testimonials.averageRating} / 5.0
                </span>
                <span className="mx-1.5 text-[#1B1A5E]/40 dark:text-[#FBF8F3]/40">·</span>
                <span className="text-[#1B1A5E]/65 dark:text-[#FBF8F3]/65">
                  {SITE_CONTENT.testimonials.reviewCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/18 bg-white text-[#1B1A5E] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/18 dark:bg-[#15144B] dark:text-[#FBF8F3]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/18 bg-white text-[#1B1A5E] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/18 dark:bg-[#15144B] dark:text-[#FBF8F3]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Drag-to-Scroll Carousel Stage */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-12"
        >
          <motion.div
            key={activeIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE_KSS }}
            data-cursor="view"
            className="grid cursor-grab grid-cols-1 gap-6 active:cursor-grabbing lg:grid-cols-12"
          >
            {/* Primary Editorial Review Card */}
            <article className="relative overflow-hidden rounded-[22px] border border-[#1B1A5E]/15 bg-white p-8 shadow-[0_18px_46px_rgba(27,26,94,0.06)] sm:p-10 lg:col-span-8 dark:border-[#FBF8F3]/15 dark:bg-[#15144B]">
              <svg
                width="42"
                height="32"
                viewBox="0 0 44 34"
                fill="none"
                aria-hidden="true"
                className="text-[#F58220]/35"
              >
                <motion.path
                  d="M12.5 33.5C5.6 33.5 1 28.4 1 20.6C1 11.4 7.5 3.8 17.5 1L19.4 5.2C13.6 7.5 10.7 11.6 10.3 15.8C11.1 15.5 12.1 15.3 13.3 15.3C18.3 15.3 21.8 18.8 21.8 24.2C21.8 29.7 17.8 33.5 12.5 33.5ZM34.5 33.5C27.6 33.5 23 28.4 23 20.6C23 11.4 29.5 3.8 39.5 1L41.4 5.2C35.6 7.5 32.7 11.6 32.3 15.8C33.1 15.5 34.1 15.3 35.3 15.3C40.3 15.3 43.8 18.8 43.8 24.2C43.8 29.7 39.8 33.5 34.5 33.5Z"
                  fill="currentColor"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE_KSS }}
                />
              </svg>

              <blockquote
                className="mt-5 text-lg font-medium leading-relaxed text-[#1B1A5E] sm:text-xl dark:text-[#FBF8F3]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                “{items[activeIndex].quote}”
              </blockquote>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#1B1A5E]/12 pt-6 dark:border-[#FBF8F3]/12">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B1A5E] font-bold text-[#FBF8F3] dark:bg-[#F58220] dark:text-[#0E0D3A]">
                    {items[activeIndex].initials}
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                      {items[activeIndex].author}
                    </p>
                    <p className="text-xs text-[#1B1A5E]/65 dark:text-[#FBF8F3]/68">
                      {items[activeIndex].role} · {items[activeIndex].hospital},{' '}
                      {items[activeIndex].city}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[11px] font-semibold text-[#1B1A5E]/55 dark:text-[#FBF8F3]/55">
                    Measured Outcome
                  </p>
                  <p className="text-sm font-bold text-[#D9650E] dark:text-[#FBA94C]">
                    {items[activeIndex].outcome}
                  </p>
                </div>
              </div>
            </article>

            {/* Partner Selector Stack */}
            <div className="flex flex-col justify-between gap-3.5 lg:col-span-4">
              {items.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] ${
                      isSelected
                        ? 'border-[#F58220] bg-white shadow-sm dark:bg-[#15144B]'
                        : 'border-[#1B1A5E]/12 bg-white/55 opacity-75 hover:opacity-100 dark:border-[#FBF8F3]/12 dark:bg-[#15144B]/50'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isSelected
                          ? 'bg-[#F58220] text-[#0E0D3A]'
                          : 'bg-[#1B1A5E]/10 text-[#1B1A5E] dark:bg-white/10 dark:text-[#FBF8F3]'
                      }`}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                        {item.hospital}
                      </p>
                      <p className="truncate text-xs text-[#1B1A5E]/62 dark:text-[#FBF8F3]/62">
                        {item.author} · {item.city}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Auto-play Progress Bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-[#1B1A5E]/12 dark:bg-[#FBF8F3]/14">
              <motion.div
                key={`progress-${activeIndex}-${paused}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: paused || prefersReduced ? 0 : AUTOPLAY_MS / 1000,
                  ease: 'linear',
                }}
                className="h-full bg-[#F58220]"
              />
            </div>
            <span className="font-mono text-xs text-[#1B1A5E]/60 tabular-nums dark:text-[#FBF8F3]/60">
              0{activeIndex + 1} / 0{items.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
