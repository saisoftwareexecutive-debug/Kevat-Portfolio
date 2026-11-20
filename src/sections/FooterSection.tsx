import { Globe, Linkedin, Mail, Phone } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { Logo } from '../components/Logo';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS } from '../utils/animations';

interface FooterSectionProps {
  onOpenPrivacy: () => void;
}

export function FooterSection({ onOpenPrivacy }: FooterSectionProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, amount: 0.2 });

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialItems = [
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email Kevat Seva Setu LLP', href: `mailto:${SITE_CONTENT.company.email}`, icon: Mail },
    { label: 'Call Kevat Seva Setu LLP', href: SITE_CONTENT.company.phoneHref, icon: Phone },
    { label: 'Back to top', href: '#home', icon: Globe },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0E0D3A] pt-14 pb-10 text-[#FBF8F3]/80"
    >
      {/* Signature Finale: Boat Crossing the Bridge animation when footer scrolls into view */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="relative mb-12 flex flex-col items-center justify-center overflow-hidden border-b border-[#FBF8F3]/12 pb-10"
        >
          {/* Wide Setu Cable-Stayed Bridge Span & River Line */}
          <svg
            viewBox="0 0 960 72"
            fill="none"
            className="w-full max-w-4xl h-16 overflow-visible"
          >
            {/* River line */}
            <motion.path
              d="M16 56 Q 240 62 480 56 T 944 56"
              stroke="#FBF8F3"
              strokeOpacity="0.22"
              strokeWidth="1.5"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.9, ease: EASE_KSS }}
            />
            {/* Bridge deck & pylons */}
            <motion.path
              d="M90 54 L102 14 L108 54 M870 54 L858 14 L852 54"
              stroke="#D9650E"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE_KSS }}
            />
            <motion.path
              d="M102 18 L52 54 M102 26 L72 54 M858 18 L908 54 M858 26 L888 54 M44 54 Q 480 42 916 54"
              stroke="#F58220"
              strokeWidth="1.6"
              strokeLinecap="round"
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.85, delay: 0.2, ease: EASE_KSS }}
            />
          </svg>

          {/* Boat gliding across from left bank and resting gently at center */}
          <motion.div
            initial={prefersReduced ? false : { x: '-38vw', opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : undefined}
            transition={{ duration: 1.55, delay: 0.3, ease: EASE_KSS }}
            className="-mt-14 w-[210px] sm:w-[240px]"
          >
            <Logo variant="full" animated={inView} rowing inverted />
          </motion.div>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, delay: 1.15, ease: EASE_KSS }}
            className="mt-3 text-center text-xs font-semibold tracking-[0.14em] uppercase text-[#FBA94C]"
          >
            {SITE_CONTENT.company.tagline}
          </motion.p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#FBF8F3]/12 pb-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Verified Letterhead Credentials Column */}
          <div className="lg:col-span-5">
            <h3 className="text-base font-bold text-[#FBF8F3]">
              {SITE_CONTENT.company.name}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#FBF8F3]/68">
              {SITE_CONTENT.footer.description}
            </p>
            <div className="mt-5 space-y-1.5 text-xs text-[#FBF8F3]/75">
              <p>{SITE_CONTENT.company.fullAddress}</p>
              <p>
                Mobile:{' '}
                <a
                  href={SITE_CONTENT.company.phoneHref}
                  className="font-semibold text-[#FBA94C] hover:underline"
                >
                  {SITE_CONTENT.company.phoneRaw}
                </a>{' '}
                · Email:{' '}
                <a
                  href={`mailto:${SITE_CONTENT.company.email}`}
                  className="font-semibold text-[#FBA94C] hover:underline"
                >
                  {SITE_CONTENT.company.email}
                </a>
              </p>
              <p className="font-mono text-[11px] text-[#FBF8F3]/60">
                UDYAM AADHAR NO: {SITE_CONTENT.company.udyamNo}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialItems.map((item) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith('http');
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    onClick={
                      item.href.startsWith('#')
                        ? (e) => {
                            e.preventDefault();
                            scrollToSection(item.href);
                          }
                        : undefined
                    }
                    aria-label={item.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: EASE_KSS }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FBF8F3]/15 bg-white/[0.04] text-[#FBF8F3] transition-colors hover:border-[#F58220] hover:bg-[#F58220] hover:text-[#0E0D3A]"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[#FBF8F3]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONTENT.navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-[#FBF8F3]/68 transition-colors hover:text-[#FBA94C]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schemes Supported */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold text-[#FBF8F3]">Schemes & Desks Supported</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONTENT.footer.schemesList.map((scheme) => (
                <li key={scheme}>
                  <a
                    href="#schemes"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#schemes');
                    }}
                    className="text-[#FBF8F3]/68 transition-colors hover:text-[#FBA94C]"
                  >
                    {scheme}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#FBF8F3]/60 sm:flex-row">
          <p>
            Copyright © {SITE_CONTENT.company.copyrightYear} {SITE_CONTENT.company.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="font-semibold text-[#FBF8F3]/80 transition-colors hover:text-[#FBA94C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded"
            >
              Privacy Policy
            </button>
            <span>{SITE_CONTENT.company.establishedLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
