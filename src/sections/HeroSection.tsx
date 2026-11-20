import { ArrowRight, Check } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import React, { useRef, useState } from 'react';
import { BoatSpinner, Logo } from '../components/Logo';
import { MagneticButton } from '../components/MagneticButton';
import { SplitText } from '../components/SplitText';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS } from '../utils/animations';
import { sendInquiry } from '../utils/sendInquiry';

interface HeroSectionProps {
  onFormSuccess: (title: string, description: string) => void;
  callbackCardRef: React.RefObject<HTMLDivElement | null>;
}

interface CallbackFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function HeroSection({ onFormSuccess, callbackCardRef }: HeroSectionProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Slow editorial parallax for the faint background Kevat boat & Setu bridge artwork
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, 32]);

  const [form, setForm] = useState<CallbackFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<CallbackFormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const validate = () => {
    const nextErrors: Partial<CallbackFormState> = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid hospital or work email';
    }
    if (form.phone.replace(/\D/g, '').length !== 10) {
      nextErrors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (form.message.trim().length < 6) {
      nextErrors.message = 'Share your hospital name or scheme requirement';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await sendInquiry({
        source: 'hero-callback',
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        hp: honeypot,
      });
      setSubmitted(true);
      onFormSuccess(
        'Callback Request Confirmed',
        `Thank you, ${form.name}. Our Kalyan operations desk will call you within 2 working hours.`
      );
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  const focusCallbackForm = () => {
    callbackCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => {
      callbackCardRef.current?.querySelector('input')?.focus();
    }, 450);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FBF8F3] pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24 dark:bg-[#0E0D3A]"
    >
      {/* Tactile warm paper grain & faint ledger lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ledger-lines opacity-75" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 paper-grain" />

      {/* Large, faint, low-opacity Kevat boat & Setu bridge illustration with slow parallax */}
      <motion.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { y: watermarkY, x: watermarkX }}
        className="pointer-events-none absolute -right-24 bottom-2 w-[620px] sm:w-[780px] lg:w-[920px] opacity-[0.065] dark:opacity-[0.09] select-none"
      >
        <Logo variant="full" rowing={!prefersReduced} inverted={false} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_KSS }}
              className="flex items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]"
            >
              <span className="h-[2px] w-7 bg-[#F58220]" aria-hidden="true" />
              <span>{SITE_CONTENT.hero.eyebrow}</span>
            </motion.div>

            <SplitText
              prefix={SITE_CONTENT.hero.headlinePrefix}
              highlight={SITE_CONTENT.hero.headlineHighlight}
              suffix={SITE_CONTENT.hero.headlineSuffix}
              className="mt-5 max-w-2xl text-[clamp(2.35rem,4.3vw,3.85rem)] font-bold leading-[1.07] tracking-[-0.025em] text-[#1B1A5E] dark:text-[#FBF8F3]"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.35, ease: EASE_KSS }}
              className="mt-7 max-w-xl text-base leading-relaxed text-[#1B1A5E]/78 sm:text-lg dark:text-[#FBF8F3]/78"
            >
              {SITE_CONTENT.hero.subheading}
            </motion.p>

            {/* Crafted CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.48, ease: EASE_KSS }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={focusCallbackForm}
                className="btn-crafted h-12 bg-[#1B1A5E] px-7 text-sm font-bold text-[#FBF8F3] shadow-[0_12px_28px_rgba(27,26,94,0.2)] transition-colors hover:bg-[#D9650E] dark:bg-[#F58220] dark:text-[#0E0D3A] dark:hover:bg-[#FBA94C]"
              >
                <span>{SITE_CONTENT.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() =>
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-crafted h-12 border border-[#1B1A5E]/28 bg-transparent px-7 text-sm font-bold text-[#1B1A5E] transition-colors hover:border-[#F58220] hover:bg-white/70 dark:border-[#FBF8F3]/28 dark:text-[#FBF8F3] dark:hover:border-[#FBA94C] dark:hover:bg-white/5"
              >
                <span>{SITE_CONTENT.hero.secondaryCta}</span>
              </MagneticButton>
            </motion.div>

            {/* 1px Navy Ruled Trust Credentials Ledger */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE_KSS }}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#1B1A5E]/15 pt-7 sm:grid-cols-4 dark:border-[#FBF8F3]/15"
            >
              {SITE_CONTENT.hero.trustBadges.map((badge, idx) => (
                <div key={badge.label} className="min-w-0">
                  <p className="font-mono text-[10px] font-semibold text-[#D9650E] dark:text-[#FBA94C]">
                    0{idx + 1}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#1B1A5E] dark:text-[#FBF8F3] leading-tight">
                    {badge.label}
                  </p>
                  <p className="mt-0.5 text-xs text-[#1B1A5E]/62 dark:text-[#FBF8F3]/62">
                    {badge.detail}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Editorial Request Callback Card */}
          <motion.div
            ref={callbackCardRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE_KSS }}
            className="lg:col-span-5 lg:mt-2"
          >
            <div className="relative overflow-hidden rounded-[22px] border border-[#1B1A5E]/16 bg-white/94 p-6 sm:p-8 shadow-[0_22px_50px_rgba(27,26,94,0.09)] backdrop-blur-md dark:border-[#FBF8F3]/16 dark:bg-[#141347]/94 dark:shadow-[0_22px_50px_rgba(0,0,0,0.4)]">
              {/* Hand-brushed orange top accent bar */}
              <svg
                aria-hidden="true"
                viewBox="0 0 420 8"
                preserveAspectRatio="none"
                className="absolute inset-x-0 top-0 h-[5px] w-full"
              >
                <path
                  d="M0 4 Q 140 1 280 5 T 420 3"
                  stroke="#F58220"
                  strokeWidth="6"
                  fill="none"
                />
              </svg>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="callback-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_KSS }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F58220]/15">
                      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                        <motion.path
                          d="M8 18.5L15 25.5L28.5 11.5"
                          stroke="#D9650E"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.55, ease: EASE_KSS }}
                        />
                      </svg>
                    </div>
                    <h2 className="mt-5 text-2xl font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                      Callback Scheduled
                    </h2>
                    <p className="mt-2 max-w-xs text-sm text-[#1B1A5E]/72 dark:text-[#FBF8F3]/75">
                      Thank you, <span className="font-bold">{form.name}</span>. Our operations
                      coordinator will call you on {form.phone} within 2 working hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-crafted mt-6 border border-[#1B1A5E]/20 px-5 py-2.5 text-xs font-bold text-[#1B1A5E] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/20 dark:text-[#FBF8F3]"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="callback-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#1B1A5E]/12 pb-4 dark:border-[#FBF8F3]/12">
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-[#1B1A5E] dark:text-[#FBF8F3]">
                          {SITE_CONTENT.hero.callbackForm.title}
                        </h2>
                        <p className="mt-1 text-xs leading-relaxed text-[#1B1A5E]/65 dark:text-[#FBF8F3]/68">
                          {SITE_CONTENT.hero.callbackForm.subtitle}
                        </p>
                      </div>
                      <Logo variant="mark" className="h-8 w-12 shrink-0 opacity-90" />
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <FloatingField
                        id="hero-name"
                        label="Full Name"
                        type="text"
                        value={form.name}
                        error={errors.name}
                        onChange={(val) => {
                          setForm((p) => ({ ...p, name: val }));
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                      />

                      <FloatingField
                        id="hero-email"
                        label="Hospital / Work Email"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={(val) => {
                          setForm((p) => ({ ...p, email: val }));
                          if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                        }}
                      />

                      <FloatingField
                        id="hero-phone"
                        label="Mobile Number (+91)"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.phone}
                        error={errors.phone}
                        onChange={(val) => {
                          setForm((p) => ({ ...p, phone: val.replace(/\D/g, '').slice(0, 10) }));
                          if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                      />

                      <FloatingTextArea
                        id="hero-message"
                        label="Hospital Name & Scheme Requirement"
                        value={form.message}
                        error={errors.message}
                        onChange={(val) => {
                          setForm((p) => ({ ...p, message: val }));
                          if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                        }}
                      />

                      <input
                        type="text"
                        name="company_fax_hp"
                        tabIndex={-1}
                        autoComplete="new-password"
                        aria-hidden="true"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />

                      {submitError && (
                        <p role="alert" className="text-center text-xs font-semibold text-[#C2410C] dark:text-[#FBA94C]">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-crafted flex h-12 w-full items-center justify-center gap-2.5 bg-[#F58220] px-6 text-sm font-bold text-[#0E0D3A] transition-colors hover:bg-[#FBA94C] disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B1A5E] focus-visible:ring-offset-2"
                      >
                        {submitting ? (
                          <>
                            <BoatSpinner className="h-5 w-8" />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <span>{SITE_CONTENT.hero.callbackForm.submitLabel}</span>
                            <Check className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-[#1B1A5E]/58 dark:text-[#FBF8F3]/60">
                        Direct desk: {SITE_CONTENT.company.phone} · Zero-obligation gap review
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Quiet Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-14 hidden items-center gap-3 lg:flex"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-wide text-[#1B1A5E]/62 transition-colors hover:text-[#D9650E] dark:text-[#FBF8F3]/62 dark:hover:text-[#FBA94C]"
          >
            <span className="flex h-8 w-5 items-start justify-center rounded-full border border-current p-1">
              <motion.span
                animate={prefersReduced ? undefined : { y: [0, 9, 0] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                className="h-1.5 w-1 rounded-full bg-[#F58220]"
              />
            </span>
            <span>Scroll to cross the river with us</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingField({
  id,
  label,
  type,
  value,
  error,
  onChange,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
}) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          placeholder=" "
          inputMode={inputMode}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`peer block w-full rounded-xl border bg-[#FBF8F3]/75 px-4 pt-5 pb-2 text-sm text-[#1B1A5E] transition-colors focus:bg-white focus:outline-none dark:bg-[#0E0D3A]/80 dark:text-[#FBF8F3] dark:focus:bg-[#0E0D3A] ${
            error
              ? 'border-[#C2410C]'
              : 'border-[#1B1A5E]/18 focus:border-[#F58220] dark:border-[#FBF8F3]/18 dark:focus:border-[#FBA94C]'
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 origin-left text-[11px] font-semibold text-[#1B1A5E]/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#D9650E] dark:text-[#FBF8F3]/60 dark:peer-focus:text-[#FBA94C]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-[#C2410C] dark:text-[#FBA94C]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingTextArea({
  id,
  label,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id}
          rows={3}
          value={value}
          placeholder=" "
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`peer block w-full resize-none rounded-xl border bg-[#FBF8F3]/75 px-4 pt-6 pb-2 text-sm text-[#1B1A5E] transition-colors focus:bg-white focus:outline-none dark:bg-[#0E0D3A]/80 dark:text-[#FBF8F3] dark:focus:bg-[#0E0D3A] ${
            error
              ? 'border-[#C2410C]'
              : 'border-[#1B1A5E]/18 focus:border-[#F58220] dark:border-[#FBF8F3]/18 dark:focus:border-[#FBA94C]'
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 origin-left text-[11px] font-semibold text-[#1B1A5E]/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#D9650E] dark:text-[#FBF8F3]/60 dark:peer-focus:text-[#FBA94C]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-[#C2410C] dark:text-[#FBA94C]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
