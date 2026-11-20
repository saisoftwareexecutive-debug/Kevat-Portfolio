import { Check, Clock, Copy, FileCheck, Mail, MapPin, Phone, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { BoatSpinner } from '../components/Logo';
import { MagneticButton } from '../components/MagneticButton';
import { SITE_CONTENT } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';
import { sendInquiry } from '../utils/sendInquiry';

interface ContactSectionProps {
  preselectedService?: string;
  onNotify: (title: string, description: string, variant?: 'success' | 'info') => void;
}

interface QuoteFormState {
  name: string;
  hospital: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const CONFETTI_PIECES = [
  { x: -95, y: -75, color: '#F58220', rot: -45 },
  { x: -62, y: -105, color: '#FBA94C', rot: 35 },
  { x: -24, y: -115, color: '#1B1A5E', rot: -20 },
  { x: 18, y: -120, color: '#D9650E', rot: 50 },
  { x: 64, y: -98, color: '#FBA94C', rot: -35 },
  { x: 96, y: -68, color: '#F58220', rot: 65 },
  { x: -84, y: -35, color: '#1B1A5E', rot: 25 },
  { x: 86, y: -30, color: '#D9650E', rot: -55 },
  { x: -45, y: -65, color: '#F58220', rot: 15 },
  { x: 42, y: -62, color: '#FBA94C', rot: -15 },
];

export function ContactSection({ preselectedService, onNotify }: ContactSectionProps) {
  const [form, setForm] = useState<QuoteFormState>({
    name: '',
    hospital: '',
    email: '',
    phone: '',
    service: SITE_CONTENT.contact.serviceOptions[0],
    message: '',
  });
  const [errors, setErrors] = useState<Partial<QuoteFormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (!preselectedService) return;
    const match = SITE_CONTENT.contact.serviceOptions.find((opt) =>
      opt.toLowerCase().includes(preselectedService.toLowerCase().split(' ')[0])
    );
    if (match) {
      setForm((prev) => ({ ...prev, service: match }));
    }
  }, [preselectedService]);

  const validate = () => {
    const next: Partial<QuoteFormState> = {};
    if (form.name.trim().length < 2) next.name = 'Enter your name';
    if (form.hospital.trim().length < 2) next.hospital = 'Enter hospital or organization name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (form.phone.replace(/\D/g, '').length !== 10) next.phone = 'Enter a valid 10-digit phone number';
    if (form.message.trim().length < 8) next.message = 'Please add brief details about your requirement';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await sendInquiry({
        source: 'contact-proposal',
        name: form.name,
        hospital: form.hospital,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
        hp: honeypot,
      });
      setSubmitted(true);
      onNotify(
        'Quote Request Received',
        `Thank you, ${form.name}. Our Kalyan team is preparing a scheme execution proposal for ${form.hospital}.`
      );
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(SITE_CONTENT.company.fullAddress).catch(() => {});
    setCopiedAddress(true);
    onNotify('Address Copied', 'Kalyan East office address copied to clipboard.', 'info');
    window.setTimeout(() => setCopiedAddress(false), 2400);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#FBF8F3] py-20 sm:py-28 dark:bg-[#0E0D3A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Deep Navy Editorial CTA Banner with Hand-Brushed Orange Bridge Rule */}
        <motion.div
          variants={fadeUpBlur}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[24px] bg-[#0E0D3A] p-8 text-[#FBF8F3] border border-[#1B1A5E] sm:p-12 dark:border-[#FBF8F3]/18"
        >
          {/* Decorative Setu bridge arch lines in background */}
          <svg
            aria-hidden="true"
            viewBox="0 0 800 160"
            preserveAspectRatio="none"
            className="pointer-events-none absolute right-0 bottom-0 h-36 w-[540px] opacity-15"
          >
            <path d="M40 150 Q 400 40 760 150" stroke="#F58220" strokeWidth="2.5" fill="none" />
            <path d="M220 150 L235 28 L244 150 M580 150 L565 28 L556 150" stroke="#FBA94C" strokeWidth="2.5" fill="none" />
          </svg>

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-baseline gap-4">
                <span className="outline-numeral-dark text-4xl sm:text-5xl font-bold" aria-hidden="true">
                  {SITE_CONTENT.contact.sectionNo}
                </span>
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#FBA94C]">
                  Begin Your Crossing With Zero Rejections
                </p>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#FBF8F3] sm:text-4xl lg:text-[2.85rem]">
                {SITE_CONTENT.contact.bannerTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#FBF8F3]/78">
                {SITE_CONTENT.contact.bannerSubtitle}
              </p>
            </div>
            <div className="shrink-0">
              <MagneticButton
                href={SITE_CONTENT.company.phoneHref}
                className="btn-crafted h-12 bg-[#F58220] px-7 text-sm font-bold text-[#0E0D3A] shadow-lg transition-colors hover:bg-[#FBA94C]"
              >
                <Phone className="h-4 w-4" />
                <span>Call {SITE_CONTENT.company.phone}</span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Verified Letterhead Info + Validated Form */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            <div className="space-y-4 rounded-[22px] border border-[#1B1A5E]/15 bg-white p-7 dark:border-[#FBF8F3]/15 dark:bg-[#15144B]">
              <h3 className="text-xl font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                Registered Office — Kalyan East
              </h3>

              <div className="space-y-4 pt-2">
                <ContactInfoRow
                  icon={MapPin}
                  label="Office Address"
                  value={SITE_CONTENT.company.fullAddress}
                />
                <ContactInfoRow
                  icon={Phone}
                  label="Mobile / Direct Helpline"
                  value={`${SITE_CONTENT.company.phone} (${SITE_CONTENT.company.phoneRaw})`}
                  href={SITE_CONTENT.company.phoneHref}
                />
                <ContactInfoRow
                  icon={Mail}
                  label="Official Email"
                  value={SITE_CONTENT.company.email}
                  href={`mailto:${SITE_CONTENT.company.email}`}
                />
                <ContactInfoRow
                  icon={FileCheck}
                  label="MSME Udyam Aadhar No."
                  value={SITE_CONTENT.company.udyamNo}
                />
                <ContactInfoRow
                  icon={Clock}
                  label="Working Hours"
                  value={`${SITE_CONTENT.company.workingHours} · ${SITE_CONTENT.company.emergencyDesk}`}
                />
              </div>
            </div>

            {/* Stylized Kalyan East Embedded Map Placeholder */}
            <div className="relative overflow-hidden rounded-[22px] border border-[#1B1A5E]/15 bg-[#F4EEE3] p-5 dark:border-[#FBF8F3]/15 dark:bg-[#121147]">
              <svg
                viewBox="0 0 460 210"
                className="h-44 w-full rounded-xl bg-[#EAE2D6] dark:bg-[#0E0D3A]"
                role="img"
                aria-label="Map location of Kevat Seva Setu LLP at Malhar Park, Chinchpada, Kalyan East 421306"
              >
                <defs>
                  <pattern id="kalyan-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#1B1A5E]/10 dark:text-[#FBF8F3]/10"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="460" height="210" fill="url(#kalyan-grid)" />
                {/* Stylized Chinchpada Road & Kalyan East grid */}
                <path
                  d="M0 148 Q 160 132 250 104 T 460 68"
                  fill="none"
                  stroke="currentColor"
                  className="text-[#FBF8F3] dark:text-[#1F1E66]"
                  strokeWidth="10"
                />
                <path
                  d="M155 0 L 212 210"
                  fill="none"
                  stroke="currentColor"
                  className="text-[#FBF8F3]/90 dark:text-[#1F1E66]/85"
                  strokeWidth="7"
                />
                <path
                  d="M325 0 L 296 210"
                  fill="none"
                  stroke="currentColor"
                  className="text-[#FBF8F3]/80 dark:text-[#1F1E66]/70"
                  strokeWidth="5"
                />
                {/* Ulhas River subtle blue-navy ribbon in upper left */}
                <path
                  d="M0 32 Q 95 48 165 20 T 340 16"
                  fill="none"
                  stroke="#1B1A5E"
                  strokeOpacity="0.16"
                  strokeWidth="9"
                />
                {/* Location Pin at Malhar Park, Chinchpada */}
                <g transform="translate(230, 102)">
                  <circle r="24" fill="#F58220" fillOpacity="0.22" />
                  <circle r="11" fill="#1B1A5E" stroke="#FBF8F3" strokeWidth="3" />
                  <circle r="4.2" fill="#F58220" />
                </g>
              </svg>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                    Malhar Park, Chinchpada · Kalyan East 421306
                  </p>
                  <p className="text-[11px] text-[#1B1A5E]/62 dark:text-[#FBF8F3]/62">
                    Back Side of Priya Bldg · Maharashtra
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#1B1A5E]/22 bg-[#FBF8F3] px-3.5 py-2 text-xs font-bold text-[#1B1A5E] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/22 dark:bg-[#0E0D3A] dark:text-[#FBF8F3] whitespace-nowrap"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#F58220]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Validated Proposal Form */}
          <div className="rounded-[22px] border border-[#1B1A5E]/15 bg-white p-7 sm:p-9 shadow-[0_14px_38px_rgba(27,26,94,0.06)] lg:col-span-7 dark:border-[#FBF8F3]/15 dark:bg-[#15144B]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="quote-submitted"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden text-center"
                >
                  <div aria-hidden="true" className="pointer-events-none relative">
                    {CONFETTI_PIECES.map((piece, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
                        animate={{
                          x: piece.x,
                          y: piece.y,
                          opacity: [1, 1, 0],
                          scale: [0.6, 1.15, 0.7],
                          rotate: piece.rot,
                        }}
                        transition={{ duration: 1.0, ease: EASE_KSS }}
                        style={{ backgroundColor: piece.color }}
                        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-xs"
                      />
                    ))}
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F58220]/15">
                    <Check className="h-10 w-10 text-[#D9650E] dark:text-[#FBA94C]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
                    Proposal Request Received
                  </h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-[#1B1A5E]/74 dark:text-[#FBF8F3]/74">
                    Thank you, <span className="font-bold">{form.name}</span>. Our regional desk is
                    preparing a tailored scheme & manpower blueprint for{' '}
                    <span className="font-bold">{form.hospital}</span> and will reach out shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        hospital: '',
                        email: '',
                        phone: '',
                        service: SITE_CONTENT.contact.serviceOptions[0],
                        message: '',
                      });
                    }}
                    className="btn-crafted mt-7 border border-[#1B1A5E]/22 px-6 py-2.5 text-sm font-bold text-[#1B1A5E] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/22 dark:text-[#FBF8F3]"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div key="quote-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-2xl font-bold tracking-tight text-[#1B1A5E] dark:text-[#FBF8F3]">
                    {SITE_CONTENT.contact.formTitle}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#1B1A5E]/68 dark:text-[#FBF8F3]/70">
                    {SITE_CONTENT.contact.formSubtitle}
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormInput
                        id="contact-name"
                        label="Full Name"
                        placeholder="Dr. / Mr. / Ms. Name"
                        value={form.name}
                        error={errors.name}
                        onChange={(v) => {
                          setForm((p) => ({ ...p, name: v }));
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                      />
                      <FormInput
                        id="contact-hospital"
                        label="Hospital / Organization Name"
                        placeholder="e.g. City Multi-Specialty Hospital"
                        value={form.hospital}
                        error={errors.hospital}
                        onChange={(v) => {
                          setForm((p) => ({ ...p, hospital: v }));
                          if (errors.hospital) setErrors((p) => ({ ...p, hospital: undefined }));
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormInput
                        id="contact-email"
                        label="Work Email"
                        type="email"
                        placeholder="director@hospital.in"
                        value={form.email}
                        error={errors.email}
                        onChange={(v) => {
                          setForm((p) => ({ ...p, email: v }));
                          if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                        }}
                      />
                      <FormInput
                        id="contact-phone"
                        label="Phone Number"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="8169101411"
                        value={form.phone}
                        error={errors.phone}
                        onChange={(v) => {
                          setForm((p) => ({ ...p, phone: v.replace(/\D/g, '').slice(0, 10) }));
                          if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-bold text-[#1B1A5E] dark:text-[#FBF8F3]"
                      >
                        Primary Service Requirement
                      </label>
                      <select
                        id="contact-service"
                        value={form.service}
                        onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                        className="mt-1.5 block w-full rounded-xl border border-[#1B1A5E]/18 bg-[#FBF8F3] px-4 py-3 text-sm text-[#1B1A5E] transition-colors focus:border-[#F58220] focus:bg-white focus:outline-none dark:border-[#FBF8F3]/18 dark:bg-[#0E0D3A] dark:text-[#FBF8F3] dark:focus:border-[#FBA94C]"
                      >
                        {SITE_CONTENT.contact.serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-bold text-[#1B1A5E] dark:text-[#FBF8F3]"
                      >
                        Bed Capacity, Active Schemes & Notes
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Share your bed count, current schemes (PM-JAY / MJPJAY / TPAs), and how our team can assist..."
                        value={form.message}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, message: e.target.value }));
                          if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
                        }}
                        className={`mt-1.5 block w-full resize-none rounded-xl border bg-[#FBF8F3] px-4 py-3 text-sm text-[#1B1A5E] transition-colors focus:bg-white focus:outline-none dark:bg-[#0E0D3A] dark:text-[#FBF8F3] ${
                          errors.message
                            ? 'border-[#C2410C]'
                            : 'border-[#1B1A5E]/18 focus:border-[#F58220] dark:border-[#FBF8F3]/18 dark:focus:border-[#FBA94C]'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs font-medium text-[#C2410C] dark:text-[#FBA94C]">
                          {errors.message}
                        </p>
                      )}
                    </div>

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
                      className="btn-crafted flex h-12 w-full items-center justify-center gap-2.5 bg-[#1B1A5E] px-6 text-sm font-bold text-[#FBF8F3] shadow-md transition-colors hover:bg-[#D9650E] disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2 dark:bg-[#F58220] dark:text-[#0E0D3A] dark:hover:bg-[#FBA94C]"
                    >
                      {submitting ? (
                        <>
                          <BoatSpinner className="h-5 w-8" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Request Custom Proposal</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4EEE3] text-[#D9650E] dark:bg-[#0E0D3A] dark:text-[#FBA94C]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#1B1A5E]/55 dark:text-[#FBF8F3]/55">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block text-sm font-bold text-[#1B1A5E] transition-colors hover:text-[#D9650E] dark:text-[#FBF8F3] dark:hover:text-[#FBA94C]"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 text-sm font-semibold leading-snug text-[#1B1A5E] dark:text-[#FBF8F3]/90">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-[#1B1A5E] dark:text-[#FBF8F3]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`mt-1.5 block w-full rounded-xl border bg-[#FBF8F3] px-4 py-3 text-sm text-[#1B1A5E] transition-colors focus:bg-white focus:outline-none dark:bg-[#0E0D3A] dark:text-[#FBF8F3] ${
          error
            ? 'border-[#C2410C]'
            : 'border-[#1B1A5E]/18 focus:border-[#F58220] dark:border-[#FBF8F3]/18 dark:focus:border-[#FBA94C]'
        }`}
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-[#C2410C] dark:text-[#FBA94C]">{error}</p>
      )}
    </div>
  );
}
