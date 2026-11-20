import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SITE_CONTENT, type WhyChooseItem } from '../data/content';

export function WhyChooseUsSection() {
  const prefersReduced = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-58%']);
  const barWidth = useTransform(scrollYProgress, [0, 1], ['12%', '100%']);

  const scrollMobile = (dir: 'left' | 'right') => {
    mobileTrackRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  return (
    <section
      aria-label="Why Choose Kevat Seva Setu LLP"
      className="relative bg-[#FBF8F3] dark:bg-[#0E0D3A]"
    >
      {/* Desktop Scroll-Pinned Horizontal Experience */}
      <div
        ref={containerRef}
        className={`hidden lg:block relative ${prefersReduced ? '' : 'h-[260vh]'}`}
      >
        <div
          className={`${
            prefersReduced
              ? 'py-24'
              : 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden'
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-8">
            <div className="flex items-end justify-between gap-8 border-b border-[#1B1A5E]/15 pb-7 dark:border-[#FBF8F3]/15">
              <div className="max-w-2xl">
                <div className="flex items-baseline gap-4">
                  <span className="outline-numeral text-5xl font-bold" aria-hidden="true">
                    {SITE_CONTENT.whyChooseUs.sectionNo}
                  </span>
                  <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                    {SITE_CONTENT.whyChooseUs.kicker}
                  </p>
                </div>
                <h2 className="mt-3 text-4xl font-bold tracking-[-0.025em] text-[#1B1A5E] leading-[1.1] dark:text-[#FBF8F3]">
                  {SITE_CONTENT.whyChooseUs.title}
                </h2>
              </div>

              <div className="w-56 shrink-0 pb-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1B1A5E]/62 dark:text-[#FBF8F3]/65">
                  <span>Scroll to glide</span>
                  <span className="font-mono tabular-nums">01 — 06</span>
                </div>
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[#1B1A5E]/12 dark:bg-[#FBF8F3]/14">
                  <motion.div
                    style={{ width: prefersReduced ? '100%' : barWidth }}
                    className="h-full bg-[#F58220]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 overflow-hidden pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <motion.div
              style={prefersReduced ? undefined : { x }}
              className={`flex gap-6 pr-16 ${prefersReduced ? 'flex-wrap' : 'w-max'}`}
            >
              {SITE_CONTENT.whyChooseUs.items.map((item, idx) => (
                <WhyChooseCard
                  key={item.id}
                  item={item}
                  alternate={idx % 2 === 1}
                  reducedMotion={prefersReduced}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Carousel */}
      <div className="py-20 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="outline-numeral text-4xl font-bold" aria-hidden="true">
                  {SITE_CONTENT.whyChooseUs.sectionNo}
                </span>
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                  {SITE_CONTENT.whyChooseUs.kicker}
                </p>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1B1A5E] dark:text-[#FBF8F3]">
                {SITE_CONTENT.whyChooseUs.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollMobile('left')}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/20 bg-white text-[#1B1A5E] dark:border-[#FBF8F3]/20 dark:bg-[#15144B] dark:text-[#FBF8F3]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobile('right')}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/20 bg-white text-[#1B1A5E] dark:border-[#FBF8F3]/20 dark:bg-[#15144B] dark:text-[#FBF8F3]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={mobileTrackRef}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          >
            {SITE_CONTENT.whyChooseUs.items.map((item, idx) => (
              <div key={item.id} className="snap-start">
                <WhyChooseCard
                  item={item}
                  alternate={idx % 2 === 1}
                  reducedMotion={prefersReduced}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseCard({
  item,
  alternate,
  reducedMotion,
}: {
  item: WhyChooseItem;
  alternate: boolean;
  reducedMotion: boolean;
}) {
  return (
    <article
      data-cursor="view"
      className={`group flex h-[368px] shrink-0 flex-col justify-between rounded-[22px] border p-7 transition-all duration-300 hover:-translate-y-1 ${
        alternate
          ? 'w-[320px] sm:w-[375px] border-[#1B1A5E]/15 bg-[#F4EEE3] hover:border-[#F58220] dark:border-[#FBF8F3]/15 dark:bg-[#15144B] dark:hover:border-[#FBA94C]'
          : 'w-[300px] sm:w-[345px] border-[#1B1A5E]/15 bg-white hover:border-[#F58220] dark:border-[#FBF8F3]/15 dark:bg-[#121147] dark:hover:border-[#FBA94C]'
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1B1A5E]/12 bg-[#FBF8F3] dark:border-[#FBF8F3]/15 dark:bg-[#0E0D3A]">
            <AnimatedPillarSvg type={item.animationType} reducedMotion={reducedMotion} />
          </div>
          <span className="font-mono text-xs font-bold text-[#1B1A5E]/45 tabular-nums dark:text-[#FBF8F3]/45">
            {item.index} / 06
          </span>
        </div>

        <p className="mt-6 text-xs font-bold tracking-wide uppercase text-[#D9650E] dark:text-[#FBA94C]">
          {item.subtitle}
        </p>
        <h3 className="mt-1.5 text-xl font-bold tracking-tight text-[#1B1A5E] dark:text-[#FBF8F3]">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#1B1A5E]/74 dark:text-[#FBF8F3]/74">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-[#1B1A5E]/12 pt-4 dark:border-[#FBF8F3]/12">
        <span className="text-xs font-medium text-[#1B1A5E]/58 dark:text-[#FBF8F3]/58">
          Operational Standard
        </span>
        <span className="font-mono text-xs font-bold text-[#1B1A5E] tabular-nums dark:text-[#FBA94C]">
          {item.metric}
        </span>
      </div>
    </article>
  );
}

function AnimatedPillarSvg({
  type,
  reducedMotion,
}: {
  type: WhyChooseItem['animationType'];
  reducedMotion: boolean;
}) {
  const repeat = reducedMotion ? 0 : Infinity;

  switch (type) {
    case 'manpower':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <motion.circle
            cx="20"
            cy="13"
            r="5"
            stroke="#1B1A5E"
            className="dark:stroke-[#FBF8F3]"
            strokeWidth="2.2"
            animate={reducedMotion ? undefined : { scale: [1, 1.07, 1] }}
            transition={{ duration: 2.8, repeat }}
          />
          <motion.path
            d="M10 31C10 25.5 14.5 22 20 22C25.5 22 30 25.5 30 31"
            stroke="#F58220"
            strokeWidth="2.4"
            strokeLinecap="round"
            animate={reducedMotion ? undefined : { pathLength: [0.65, 1, 0.65] }}
            transition={{ duration: 3, repeat, ease: 'easeInOut' }}
          />
          <circle cx="9.5" cy="16" r="2.4" stroke="#FBA94C" strokeWidth="1.9" />
          <circle cx="30.5" cy="16" r="2.4" stroke="#FBA94C" strokeWidth="1.9" />
        </svg>
      );

    case 'training':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M6 16L20 9L34 16L20 23L6 16Z"
            stroke="#1B1A5E"
            className="dark:stroke-[#FBF8F3]"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <motion.path
            d="M12 19.5V27.5C12 27.5 15.5 31 20 31C24.5 31 28 27.5 28 27.5V19.5"
            stroke="#F58220"
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={reducedMotion ? undefined : { y: [0, -1.5, 0] }}
            transition={{ duration: 2.5, repeat }}
          />
          <motion.path
            d="M34 16V25"
            stroke="#D9650E"
            strokeWidth="2.2"
            strokeLinecap="round"
            animate={reducedMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat }}
          />
        </svg>
      );

    case 'analytics':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <motion.rect
            x="8"
            y="22"
            width="5"
            height="10"
            rx="1.2"
            fill="#1B1A5E"
            className="dark:fill-[#FBF8F3]"
            animate={reducedMotion ? undefined : { scaleY: [0.75, 1, 0.75] }}
            style={{ originY: '32px' }}
            transition={{ duration: 2.4, repeat }}
          />
          <motion.rect
            x="17.5"
            y="16"
            width="5"
            height="16"
            rx="1.2"
            fill="#F58220"
            animate={reducedMotion ? undefined : { scaleY: [0.8, 1.04, 0.8] }}
            style={{ originY: '32px' }}
            transition={{ duration: 2.4, delay: 0.25, repeat }}
          />
          <motion.rect
            x="27"
            y="10"
            width="5"
            height="22"
            rx="1.2"
            fill="#D9650E"
            animate={reducedMotion ? undefined : { scaleY: [0.78, 1, 0.78] }}
            style={{ originY: '32px' }}
            transition={{ duration: 2.4, delay: 0.5, repeat }}
          />
        </svg>
      );

    case 'medico':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect
            x="7"
            y="7"
            width="26"
            height="26"
            rx="6"
            stroke="#1B1A5E"
            className="dark:stroke-[#FBF8F3]"
            strokeWidth="2.2"
          />
          <motion.path
            d="M11 21H15.5L18 14L22 26.5L24.5 21H29"
            stroke="#F58220"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reducedMotion ? undefined : { pathLength: [0, 1, 1] }}
            transition={{ duration: 2.6, repeat, ease: 'easeInOut' }}
          />
        </svg>
      );

    case 'tat':
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle
            cx="20"
            cy="20"
            r="13"
            stroke="#1B1A5E"
            className="dark:stroke-[#FBF8F3]"
            strokeWidth="2.2"
          />
          <motion.path
            d="M20 12V20L25.5 23"
            stroke="#F58220"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reducedMotion ? undefined : { rotate: [0, 360] }}
            style={{ originX: '20px', originY: '20px' }}
            transition={{ duration: 12, repeat, ease: 'linear' }}
          />
          <circle cx="20" cy="20" r="2" fill="#D9650E" />
        </svg>
      );

    case 'zero':
    default:
      return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path
            d="M20 5L32 10V19.5C32 27.2 26.9 33 20 35.5C13.1 33 8 27.2 8 19.5V10L20 5Z"
            stroke="#1B1A5E"
            className="dark:stroke-[#FBF8F3]"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <motion.path
            d="M14.5 20.5L18.5 24.5L26 16"
            stroke="#F58220"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={reducedMotion ? undefined : { pathLength: [0, 1, 1] }}
            transition={{ duration: 2.5, repeat, ease: 'easeInOut' }}
          />
        </svg>
      );
  }
}
