import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { PrivacyModal } from './components/PrivacyModal';
import { RiverDivider } from './components/RiverDivider';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ToastContainer, type ToastMessage } from './components/ToastContainer';
import { SITE_CONTENT } from './data/content';
import { useActiveSection } from './hooks/useActiveSection';
import { useTheme } from './hooks/useTheme';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { FaqSection } from './sections/FaqSection';
import { FooterSection } from './sections/FooterSection';
import { GallerySection } from './sections/GallerySection';
import { HeroSection } from './sections/HeroSection';
import { HowWeWorkSection } from './sections/HowWeWorkSection';
import { ImpactStatsSection } from './sections/ImpactStatsSection';
import { SchemesSection } from './sections/SchemesSection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { TrustMarquee } from './sections/TrustMarquee';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const callbackCardRef = useRef<HTMLDivElement>(null);

  // Show the signature 2.8s preloader once per session
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem('kss-intro-played') !== '1';
    } catch {
      return true;
    }
  });

  const sectionIds = useMemo(
    () => SITE_CONTENT.navLinks.map((item) => item.id),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  const pushToast = useCallback(
    (title: string, description: string, variant: 'success' | 'info' = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5200);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 404-safe single-page routing guard & initial hash sync
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname !== '/' && pathname !== '/index.html') {
      window.history.replaceState(null, '', '/');
    }

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        window.setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      }
    }
  }, []);

  // Clicking the logo jumps to the top and replays the signature Kevat Seva Setu intro
  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setShowIntro(true);
  }, []);

  const handleRequestCallback = useCallback(() => {
    if (window.scrollY > 450) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      callbackCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => {
        callbackCardRef.current?.querySelector('input')?.focus();
      }, 450);
    }
  }, []);

  const handleSelectServiceQuote = useCallback((serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FBF8F3] text-[#1B1A5E] dark:bg-[#0E0D3A] dark:text-[#FBF8F3]">
        <Preloader visible={showIntro} onComplete={() => setShowIntro(false)} />
        <ScrollProgressBar />
        <CustomCursor />

        <Navbar
          activeSection={activeSection}
          theme={theme}
          introDone={!showIntro}
          onToggleTheme={toggleTheme}
          onRequestCallback={handleRequestCallback}
          onLogoClick={handleLogoClick}
        />

        <main>
          <HeroSection
            onFormSuccess={(title, desc) => pushToast(title, desc, 'success')}
            callbackCardRef={callbackCardRef}
          />
          <TrustMarquee />
          <RiverDivider
            variant="bridge"
            topBg="bg-[#FBF8F3] dark:bg-[#0E0D3A]"
            label="Bridging the Claim Gap"
          />
          <AboutSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#FBF8F3] dark:bg-[#0E0D3A]"
            bottomBg="text-[#F4EEE3] dark:text-[#121147]"
          />
          <ServicesSection onSelectServiceQuote={handleSelectServiceQuote} />
          <RiverDivider
            variant="wave"
            topBg="bg-[#F4EEE3] dark:bg-[#121147]"
            bottomBg="text-[#0E0D3A]"
          />
          <ImpactStatsSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#0E0D3A]"
            bottomBg="text-[#FBF8F3] dark:text-[#0E0D3A]"
          />
          <WhyChooseUsSection />
          <RiverDivider
            variant="bridge"
            topBg="bg-[#F4EEE3] dark:bg-[#121147]"
            label="The Setu Claim Crossing"
          />
          <HowWeWorkSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#F4EEE3] dark:bg-[#121147]"
            bottomBg="text-[#FBF8F3] dark:text-[#0E0D3A]"
          />
          <SchemesSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#FBF8F3] dark:bg-[#0E0D3A]"
            bottomBg="text-[#F4EEE3] dark:text-[#121147]"
          />
          <GallerySection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#F4EEE3] dark:bg-[#121147]"
            bottomBg="text-[#FBF8F3] dark:text-[#0E0D3A]"
          />
          <TestimonialsSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#FBF8F3] dark:bg-[#0E0D3A]"
            bottomBg="text-[#F4EEE3] dark:text-[#121147]"
          />
          <FaqSection />
          <RiverDivider
            variant="wave"
            topBg="bg-[#F4EEE3] dark:bg-[#121147]"
            bottomBg="text-[#FBF8F3] dark:text-[#0E0D3A]"
          />
          <ContactSection
            preselectedService={preselectedService}
            onNotify={pushToast}
          />
        </main>

        <FooterSection onOpenPrivacy={() => setPrivacyOpen(true)} />
        <FloatingWidgets />
        <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </MotionConfig>
  );
}
