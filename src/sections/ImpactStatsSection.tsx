import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { SITE_CONTENT, type ImpactStat } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

export function ImpactStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.22 });
  const prefersReduced = useReducedMotion() ?? false;

  const ringStat = SITE_CONTENT.impactStats.stats[0];
  const otherStats = SITE_CONTENT.impactStats.stats.slice(1);

  return (
    <section
      ref={sectionRef}
      aria-label="Impact Statistics"
      className="relative overflow-hidden bg-[#0E0D3A] py-20 text-[#FBF8F3] sm:py-28"
    >
      {/* Subtle architectural river ripples along bottom edge (no generic neon blobs) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-15"
      >
        <path
          d="M0 64 Q 360 24 720 64 T 1440 64"
          stroke="#F58220"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 86 Q 360 116 720 86 T 1440 86"
          stroke="#FBA94C"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 items-end gap-6 border-b border-[#FBF8F3]/14 pb-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral-dark text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.impactStats.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#FBA94C]">
                {SITE_CONTENT.impactStats.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.025em] text-[#FBF8F3] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09]"
            >
              {SITE_CONTENT.impactStats.title}
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpBlur}
            className="text-sm leading-relaxed text-[#FBF8F3]/72 lg:col-span-4"
          >
            {SITE_CONTENT.impactStats.subtitle}
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Featured 99.86% Circular Saffron Progress Ring */}
          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col items-center justify-center rounded-[22px] border border-[#FBF8F3]/15 bg-[#15144B]/80 p-8 text-center lg:col-span-5"
          >
            <AccuracyRing
              stat={ringStat}
              startWhen={inView}
              reducedMotion={prefersReduced}
            />
            <h3 className="mt-6 text-2xl font-bold text-[#FBF8F3]">
              {ringStat.label}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#FBF8F3]/70">
              {ringStat.context}
            </p>
          </motion.div>

          {/* 4 Hairline-Structured Metric Blocks */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
            {otherStats.map((stat, idx) => (
              <ImpactMetricCard
                key={stat.id}
                stat={stat}
                index={idx}
                startWhen={inView}
                reducedMotion={prefersReduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccuracyRing({
  stat,
  startWhen,
  reducedMotion,
}: {
  stat: ImpactStat;
  startWhen: boolean;
  reducedMotion: boolean;
}) {
  const animatedVal = useCountUp({
    target: stat.value,
    decimals: stat.decimals ?? 2,
    duration: 1800,
    startWhen,
    reducedMotion,
  });

  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - stat.value / 100);

  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg
        width="208"
        height="208"
        viewBox="0 0 208 208"
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="104"
          cy="104"
          r={radius}
          fill="none"
          stroke="rgba(251,248,243,0.12)"
          strokeWidth="10"
        />
        <motion.circle
          cx="104"
          cy="104"
          r={radius}
          fill="none"
          stroke="url(#kss-ring-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reducedMotion ? targetOffset : circumference }}
          animate={
            startWhen
              ? { strokeDashoffset: targetOffset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.75, ease: EASE_KSS }}
        />
        <defs>
          <linearGradient id="kss-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9650E" />
            <stop offset="55%" stopColor="#F58220" />
            <stop offset="100%" stopColor="#FBA94C" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-bold tracking-tight text-[#FBF8F3] tabular-nums">
          {animatedVal}
          {stat.suffix}
        </span>
        <span className="mt-1 text-xs font-semibold text-[#FBA94C]">
          Claim Accuracy
        </span>
      </div>
    </div>
  );
}

function ImpactMetricCard({
  stat,
  index,
  startWhen,
  reducedMotion,
}: {
  stat: ImpactStat;
  index: number;
  startWhen: boolean;
  reducedMotion: boolean;
}) {
  const displayVal = useCountUp({
    target: stat.value,
    decimals: stat.decimals ?? 0,
    duration: 1500 + index * 110,
    startWhen,
    reducedMotion,
  });

  return (
    <motion.div
      variants={fadeUpBlur}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col justify-between rounded-[22px] border border-[#FBF8F3]/14 bg-[#15144B]/65 p-7 transition-colors hover:border-[#F58220]/60"
    >
      <div>
        <p className="font-mono text-4xl font-bold tracking-tight text-[#FBF8F3] tabular-nums sm:text-[2.65rem]">
          <span className="text-[#F58220]">{stat.prefix ?? ''}</span>
          {displayVal}
          <span className="text-[#FBA94C]">{stat.suffix}</span>
        </p>
        <h3 className="mt-3 text-lg font-bold text-[#FBF8F3]">{stat.label}</h3>
      </div>
      <p className="mt-4 border-t border-[#FBF8F3]/12 pt-3.5 text-xs leading-relaxed text-[#FBF8F3]/68">
        {stat.context}
      </p>
    </motion.div>
  );
}
