import { Menu, Moon, PhoneCall, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import type { ThemeMode } from '../hooks/useTheme';
import { EASE_KSS } from '../utils/animations';
import { Logo } from './Logo';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  activeSection: string;
  theme: ThemeMode;
  introDone: boolean;
  onToggleTheme: () => void;
  onRequestCallback: () => void;
  onLogoClick?: () => void;
}

export function Navbar({
  activeSection,
  theme,
  introDone,
  onToggleTheme,
  onRequestCallback,
  onLogoClick,
}: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 48);
    if (latest > 220 && latest > previous && !mobileOpen) {
      setHidden(true);
    } else if (latest < previous || latest <= 220) {
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: EASE_KSS }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF8F3]/92 shadow-[0_8px_28px_rgba(27,26,94,0.08)] backdrop-blur-lg border-b border-[#1B1A5E]/12 dark:bg-[#0E0D3A]/92 dark:border-[#FBF8F3]/12 dark:shadow-[0_8px_28px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            scrolled ? 'h-[66px]' : 'h-[82px]'
          }`}
        >
          {/* Zone 1: Official Logo (full at top, swaps smoothly to compact on scroll, docks via layoutId) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (onLogoClick) onLogoClick();
              else handleNavClick('#home');
            }}
            className="flex items-center whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220]"
            aria-label="Kevat Seva Setu LLP Home"
          >
            {introDone ? (
              <motion.div
                layoutId="kss-brand-logo"
                transition={{ duration: 0.75, ease: EASE_KSS }}
                className="flex items-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {scrolled ? (
                    <motion.div
                      key="compact-logo"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25, ease: EASE_KSS }}
                    >
                      <Logo
                        variant="compact"
                        interactive
                        inverted={theme === 'dark'}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="full-logo"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: EASE_KSS }}
                      className="w-[104px] sm:w-[114px]"
                    >
                      <Logo
                        variant="full"
                        interactive
                        inverted={theme === 'dark'}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="h-12 w-[108px]" aria-hidden="true" />
            )}
          </a>

          {/* Zone 2: Clean Editorial Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {SITE_CONTENT.navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`group relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] rounded ${
                    isActive
                      ? 'text-[#1B1A5E] dark:text-[#FBF8F3]'
                      : 'text-[#1B1A5E]/68 hover:text-[#1B1A5E] dark:text-[#FBF8F3]/70 dark:hover:text-[#FBF8F3]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#F58220]/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.4, ease: EASE_KSS }}
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#F58220]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle + Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to warm light paper mode' : 'Switch to deep navy dark mode'}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/18 bg-white/75 text-[#1B1A5E] transition-colors hover:border-[#F58220] hover:text-[#D9650E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] dark:border-[#FBF8F3]/20 dark:bg-[#1B1A5E]/50 dark:text-[#FBF8F3] dark:hover:border-[#FBA94C]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-[18px] w-[18px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-[18px] w-[18px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="hidden sm:block">
              <MagneticButton
                onClick={onRequestCallback}
                className="btn-crafted h-10 bg-[#1B1A5E] px-5 text-sm font-semibold text-[#FBF8F3] shadow-sm transition-colors hover:bg-[#D9650E] dark:bg-[#F58220] dark:text-[#0E0D3A] dark:hover:bg-[#FBA94C]"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Request Callback</span>
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1B1A5E]/20 bg-white/80 text-[#1B1A5E] lg:hidden dark:border-[#FBF8F3]/20 dark:bg-[#1B1A5E]/60 dark:text-[#FBF8F3]"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Slide-In Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE_KSS }}
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#0E0D3A] p-6 text-[#FBF8F3] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="flex items-center justify-between border-b border-[#FBF8F3]/12 pb-4">
              <Logo variant="compact" inverted />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-white/5 text-[#FBF8F3]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-2 py-8">
              {SITE_CONTENT.navLinks.map((link, idx) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 + idx * 0.065,
                      ease: EASE_KSS,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between border-b border-[#FBF8F3]/10 py-3.5 text-2xl font-bold tracking-tight transition-colors ${
                      isActive ? 'text-[#FBA94C]' : 'text-[#FBF8F3]/90 hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-[#FBF8F3]/40">0{idx + 1}</span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="space-y-3 border-t border-[#FBF8F3]/12 pt-5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onRequestCallback();
                }}
                className="btn-crafted flex h-12 w-full items-center justify-center gap-2 bg-[#F58220] px-5 text-base font-bold text-[#0E0D3A] transition-colors hover:bg-[#FBA94C]"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Request Callback</span>
              </button>
              <p className="text-center text-xs text-[#FBF8F3]/65">
                {SITE_CONTENT.company.phone} · {SITE_CONTENT.company.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
