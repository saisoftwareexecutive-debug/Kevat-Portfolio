import { SITE_CONTENT, type MarqueePartner } from '../data/content';

export function TrustMarquee() {
  const rowOne = [...SITE_CONTENT.marquee.rowOne, ...SITE_CONTENT.marquee.rowOne];
  const rowTwo = [...SITE_CONTENT.marquee.rowTwo, ...SITE_CONTENT.marquee.rowTwo];

  return (
    <section
      aria-label="Partner Schemes and Hospitals"
      className="relative overflow-hidden border-y border-[#1B1A5E]/14 bg-[#F4EEE3] py-10 sm:py-12 dark:border-[#FBF8F3]/14 dark:bg-[#121147]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-left text-xs font-bold tracking-[0.14em] uppercase text-[#1B1A5E]/65 dark:text-[#FBA94C]/85">
          {SITE_CONTENT.marquee.label}
        </p>
      </div>

      <div className="marquee-wrapper relative mt-6 space-y-3.5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#F4EEE3] to-transparent dark:from-[#121147]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#F4EEE3] to-transparent dark:from-[#121147]"
        />

        <div className="overflow-hidden">
          <div className="animate-marquee-left gap-4 pr-4">
            {rowOne.map((partner, idx) => (
              <PartnerLedgerCard key={`r1-${partner.name}-${idx}`} partner={partner} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee-right gap-4 pr-4">
            {rowTwo.map((partner, idx) => (
              <PartnerLedgerCard key={`r2-${partner.name}-${idx}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLedgerCard({ partner }: { partner: MarqueePartner }) {
  return (
    <div className="flex shrink-0 items-center gap-4 rounded-xl border border-[#1B1A5E]/14 bg-[#FBF8F3] px-5 py-3.5 transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/14 dark:bg-[#0E0D3A]">
      <span className="font-mono text-xs font-bold tracking-wider text-[#D9650E] dark:text-[#FBA94C]">
        {partner.abbr}
      </span>
      <span aria-hidden="true" className="h-5 w-px bg-[#1B1A5E]/15 dark:bg-[#FBF8F3]/15" />
      <div className="whitespace-nowrap">
        <p className="text-sm font-bold text-[#1B1A5E] dark:text-[#FBF8F3] leading-tight">
          {partner.name}
        </p>
        <p className="mt-0.5 text-[11px] text-[#1B1A5E]/60 dark:text-[#FBF8F3]/60">
          {partner.category}
        </p>
      </div>
    </div>
  );
}
