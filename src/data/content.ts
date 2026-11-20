export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface TrustBadge {
  label: string;
  detail: string;
}

export interface MarqueePartner {
  name: string;
  category: string;
  abbr: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  summary: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  metric: string;
  metricLabel: string;
  span: 'wide' | 'standard';
  deliverables: string[];
  outcome: string;
}

export interface ImpactStat {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
  isRing?: boolean;
}

export interface WhyChooseItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  animationType: 'manpower' | 'training' | 'analytics' | 'medico' | 'tat' | 'zero';
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  checkpoint: string;
}

export interface SchemeItem {
  id: string;
  code: string;
  name: string;
  category: 'Government' | 'Trust-based' | 'Private Insurance / TPA';
  coverage: string;
  summary: string;
  tatTarget: string;
  workflowHighlights: string[];
  eligibilityNote: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  location: string;
  caption: string;
  src: string;
  aspect: 'tall' | 'wide' | 'standard';
}

export interface GalleryVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  summary: string;
  thumbnail: string;
  keyTakeaways: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  hospital: string;
  city: string;
  rating: number;
  outcome: string;
  initials: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONTENT = {
  company: {
    name: 'Kevat Seva Setu LLP',
    shortName: 'Kevat',
    subBrand: 'SEVA SETU LLP',
    tagline: 'Outstanding & Constant Contribution in the Health Sector',
    brandStory:
      'Just as a Kevat ferries travellers safely from one bank of a river to the other, Kevat Seva Setu LLP carries hospitals and patients across the complex gap in government health schemes and TPA claim settlements.',
    established: 2021,
    establishedLabel: 'Est. 2021, Kalyan',
    copyrightYear: 2026,
    phone: '+91 81691 01411',
    phoneRaw: '8169101411',
    phoneHref: 'tel:+918169101411',
    whatsappNumber: '918169101411',
    email: 'kevatsevasetu21@gmail.com',
    addressLine1: '302 A Wing, Malhar Park, Back Side of Priya Bldg',
    addressLine2: 'Chinchpada, Kalyan East, Maharashtra 421306',
    fullAddress:
      '302 A Wing, Malhar Park, Back Side of Priya Bldg, Chinchpada, Kalyan East, 421306',
    udyamNo: 'UDYAM-MH-33-0059247',
    workingHours: 'Mon – Sat · 09:00 AM to 07:00 PM IST',
    emergencyDesk: '24×7 Urgent Pre-Auth Desk for Partner Hospitals',
    credentialsLine:
      'ISO 9001:2015 Certified · MSME UDYAM-MH-33-0059247 · Women-led Enterprise',
  },

  navLinks: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'schemes', label: 'Schemes', href: '#schemes' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ] as NavItem[],

  hero: {
    eyebrow: 'Outstanding & Constant Contribution in the Health Sector',
    headlinePrefix: 'When It Comes To',
    headlineHighlight: 'Reliability',
    headlineSuffix: 'in Claim Settlements, We Are The One You Need.',
    subheading:
      'Complete implementation of Government Health Insurance, Assurance, and Trust-based schemes. Like a steady boatman crossing the river, we carry hospitals and patients across documentation, TATs, and approvals with 99.86% claim accuracy.',
    primaryCta: 'Request Callback',
    secondaryCta: 'Explore Services',
    trustBadges: [
      { label: 'ISO Certified', detail: '9001:2015 Quality Systems' },
      { label: 'MSME Registered', detail: 'UDYAM-MH-33-0059247' },
      { label: 'Women-led Enterprise', detail: 'Accountable Leadership' },
      { label: 'Est. 2021, Kalyan', detail: 'Serving Hospitals Across India' },
    ] as TrustBadge[],
    callbackForm: {
      title: 'Speak With Our Operations Desk',
      subtitle: 'Leave your hospital details. Our regional lead calls back within 2 working hours.',
      submitLabel: 'Request Callback',
    },
  },

  marquee: {
    label: 'Schemes, TPAs & Empanelled Hospital Network Carried Across Every Bank',
    rowOne: [
      { name: 'Ayushman Bharat PM-JAY', category: 'Central Govt. Scheme', abbr: 'PM-JAY' },
      { name: 'MJPJAY Maharashtra', category: 'State Health Assurance', abbr: 'MJPJAY' },
      { name: 'CGHS Central Govt.', category: 'Employee Health Scheme', abbr: 'CGHS' },
      { name: 'ECHS Armed Forces', category: 'Defence Healthcare', abbr: 'ECHS' },
      { name: 'ESIC Cashless', category: 'Labour Welfare Scheme', abbr: 'ESIC' },
      { name: 'CM Relief Fund', category: 'State Medical Trust', abbr: 'CMRF' },
      { name: 'MPKAY & Charitable Trusts', category: 'Indigent Patient Care', abbr: 'TRUST' },
    ] as MarqueePartner[],
    rowTwo: [
      { name: 'Medi Assist TPA', category: 'Third-Party Administrator', abbr: 'MEDI' },
      { name: 'Vidal Health TPA', category: 'Cashless Network', abbr: 'VIDAL' },
      { name: 'MDIndia Healthcare', category: 'Insurance TPA', abbr: 'MDIN' },
      { name: 'Paramount Health TPA', category: 'Claims Partner', abbr: 'PHM' },
      { name: 'Raksha TPA', category: 'Private Cashless', abbr: 'RAKSHA' },
      { name: 'Partner Multi-Specialty Hospitals', category: 'Thane · Kalyan · Pune', abbr: 'HOSP' },
      { name: 'Regional Critical Care Centres', category: 'Maharashtra Network', abbr: 'CARE' },
    ] as MarqueePartner[],
  },

  about: {
    sectionNo: '01',
    kicker: 'The Kevat & Setu Philosophy',
    title: 'Bridging the Gap in Government Health Scheme Execution',
    lead: 'Founded in 2021 in Kalyan as a women-led, ISO-certified healthcare partner, Kevat Seva Setu LLP exists to carry hospitals and families safely across the wide river between medical treatment and settled claims.',
    body: 'Hospitals rarely lose revenue because a surgery lacked clinical merit — they lose it to missed portal TATs, unverified case sheets, or misread tariff circulars. Our centralized team of verification doctors and trained on-site Hospital Coordinators audit every file before upload so approvals arrive on time and rejections stay at zero.',
    image: '/src/assets/images/about_hospital_team_1795075851853.jpg',
    imageAlt:
      'Kevat Seva Setu LLP coordinators and medical doctors auditing digital health scheme claim records in an Indian hospital',
    timeline: [
      {
        year: '2021',
        title: 'Est. 2021, Kalyan — The First Crossing',
        summary:
          'Founded Kevat Seva Setu LLP with an SOP-governed desk model for MJPJAY and AB PM-JAY execution across Thane and Kalyan hospitals.',
      },
      {
        year: '2022',
        title: 'Centralized Medico Audit Desk',
        summary:
          'Built an in-house doctor verification team reviewing every indoor case sheet, diagnostic film, and discharge summary before portal submission.',
      },
      {
        year: '2024',
        title: 'ISO Certification & Full-Desk Expansion',
        summary:
          'Earned ISO 9001:2015 certification and expanded into private cashless TPA desks, trained hospital manpower, and clinical equipment supply.',
      },
      {
        year: '2026',
        title: '99.86% Claim Accuracy Benchmark',
        summary:
          'Over 2.5 Lakh+ patients guided safely across cashless admissions with 0 avoidable claim rejections and weekly hospital growth analytics.',
      },
    ] as TimelineMilestone[],
    highlights: [
      'ISO 9001:2015 certified quality management',
      'MSME registered (UDYAM-MH-33-0059247)',
      'SOP-driven daily desk implementation',
      'Centralized claim document verification team',
      'Expert medical doctors team for clinical pre-audit',
      'Dedicated manpower (Hospital Coordinator, Regional Manager, Front Desk, Operations Executive)',
      'Regular guideline & NHA circular training',
      'Data analysis for hospital patient-count growth',
      'Dedicated call center support for queries',
      'Established working relations with government authorities & TPAs',
    ],
  },

  services: {
    sectionNo: '02',
    kicker: 'Four Integrated Verticals',
    title: 'How We Carry Your Hospital From Admission to Settlement',
    subtitle:
      'Every desk, audit, and supply line runs under documented SOPs so doctors focus on clinical care while your accounts stay healthy.',
    items: [
      {
        id: 'scheme-implementation',
        index: '01.',
        title: 'Scheme Implementation',
        shortDesc:
          'Implement government health schemes properly in hospitals with 99.86% claim accuracy, following every statutory TAT and clinical guideline.',
        metric: '99.86%',
        metricLabel: 'Claim Accuracy',
        span: 'wide',
        deliverables: [
          'Hospital empanelment readiness and scheme desk setup for AB PM-JAY, MJPJAY, CGHS, and ECHS',
          'Pre-authorization filing within statutory TATs with accurate package-code mapping',
          'Centralized doctor-led discharge file audit prior to final portal submission',
          'Weekly pending-claim reconciliation and state health authority coordination',
        ],
        outcome: 'Stops avoidable deductions and brings settled funds into hospital accounts faster.',
      },
      {
        id: 'tpa-help-desk',
        index: '02.',
        title: 'TPA Help Desk',
        shortDesc:
          'Private insurance cashless facility management, clear patient counselling, and steady TPA coordination from pre-auth to discharge.',
        metric: '< 45 min',
        metricLabel: 'Avg. Filing Time',
        span: 'standard',
        deliverables: [
          'Lobby cashless desk managing 25+ private insurers and TPAs',
          'Plain-language patient counselling on policy sub-limits, room rent, and co-pays',
          'Prompt clinical query defense and mid-stay enhancement approvals',
          'Discharge-day final bill clearance to free up hospital beds without delay',
        ],
        outcome: 'Shorter lobby wait times and consistently higher cashless conversion.',
      },
      {
        id: 'manpower-services',
        index: '03.',
        title: 'Manpower Services',
        shortDesc:
          'Trained, disciplined, and dedicated hospital manpower ready from day one for scheme desks, billing support, and operations.',
        metric: '100%',
        metricLabel: 'SOP-Trained Staff',
        span: 'standard',
        deliverables: [
          'Hospital Coordinators, Regional Managers, Front Desk & Operations Executives',
          'Hands-on training in NHA guidelines, case-paper completeness, and patient empathy',
          'Managed leave coverage and monthly KPI audits by our regional supervisors',
          'Refresher briefings whenever government circulars or tariff rules change',
        ],
        outcome: 'Reliable, accountable desk personnel without adding hiring burden to hospital HR.',
      },
      {
        id: 'implants-equipment',
        index: '04.',
        title: 'Implants & Equipment',
        shortDesc:
          'Dependable hospital supply of BTE machines, clinical sanitizers, adjustable beds, institutional bedsheets, and scheme-compliant requirements.',
        metric: '48 hrs',
        metricLabel: 'Dispatch SLA',
        span: 'wide',
        deliverables: [
          'Certified BTE hearing machines and scheme-approved implants with traceable batch records',
          'ICU and ward adjustable hospital beds, mattresses, and durable institutional bedsheets',
          'Hospital-grade clinical sanitizers and regular ward hygiene consumables',
          'Audit-ready GST invoicing formatted cleanly for government claim verification',
        ],
        outcome: 'Single-partner procurement with transparent paperwork that passes every scheme audit.',
      },
    ] as ServiceItem[],
  },

  impactStats: {
    sectionNo: '03',
    kicker: 'Proof on the Far Bank',
    title: 'Numbers Audited Across Every Settled Claim',
    subtitle:
      'Every figure below reflects documented work carried out with empanelled hospitals, trusts, and TPAs since 2021.',
    stats: [
      {
        id: 'success-ratio',
        value: 99.86,
        decimals: 2,
        suffix: '%',
        label: 'Success Ratio',
        context: 'Audited claim settlement accuracy across FY 2021–2026',
        isRing: true,
      },
      {
        id: 'claim-rejections',
        value: 0,
        decimals: 0,
        suffix: '',
        label: 'Claim Rejections',
        context: 'Multi-tier doctor verification catches errors before portal upload',
      },
      {
        id: 'patients-benefited',
        value: 2.5,
        decimals: 1,
        suffix: ' Lakh+',
        label: 'Patients Benefited',
        context: 'Families carried safely through cashless hospital admissions',
      },
      {
        id: 'pre-auth-amount',
        value: 185,
        decimals: 0,
        prefix: '₹',
        suffix: ' Cr+',
        label: 'Pre-Auth Amount',
        context: 'Approved treatment authorizations processed within TAT',
      },
      {
        id: 'claims-settled',
        value: 178,
        decimals: 0,
        prefix: '₹',
        suffix: ' Cr+',
        label: 'Claims Settled',
        context: 'Realized directly into partner hospital bank accounts',
      },
    ] as ImpactStat[],
  },

  whyChooseUs: {
    sectionNo: '04',
    kicker: 'Why Hospitals Stay With Us',
    title: 'Six Disciplines That Keep Rejections at Zero',
    subtitle:
      'Scroll across the six working practices our team upholds on every hospital floor.',
    items: [
      {
        id: 'trained-manpower',
        index: '01',
        title: 'Trained & Dedicated Manpower',
        subtitle: 'On-Site Accountability',
        description:
          'Assigned Hospital Coordinators, Front Desk executives, and Regional Managers take full daily ownership of your scheme and TPA desks.',
        metric: '4-Tier Staffing',
        animationType: 'manpower',
      },
      {
        id: 'continuous-training',
        index: '02',
        title: 'Continuous Training',
        subtitle: 'Updated Before Circulars Hit',
        description:
          'State health authorities and NHA update package criteria regularly. Bi-weekly team workshops ensure your desk never works off outdated rules.',
        metric: '24+ Workshops / Yr',
        animationType: 'training',
      },
      {
        id: 'reporting-analytics',
        index: '03',
        title: 'Reporting & Data Analysis',
        subtitle: 'Growing Eligible Patient Volume',
        description:
          'Weekly MIS reviews break down specialty utilization, query aging, and untapped scheme packages so leadership can grow inpatient occupancy.',
        metric: 'Weekly MIS Reports',
        animationType: 'analytics',
      },
      {
        id: 'medico-expert-team',
        index: '04',
        title: 'Medico Expert Team',
        subtitle: 'Doctor-Led Pre-Audit',
        description:
          'Every file is verified by our centralized team of medical doctors — checking indoor notes, OT logs, investigations, and implant stickers before upload.',
        metric: '100% Doctor Verified',
        animationType: 'medico',
      },
      {
        id: 'all-tats-followed',
        index: '05',
        title: 'All TATs Followed',
        subtitle: 'No Missed Deadlines',
        description:
          'Daily escalation logs guard admission intimation, pre-auth filing, query response, and post-discharge claim upload windows without slippage.',
        metric: '100% TAT Compliance',
        animationType: 'tat',
      },
      {
        id: 'zero-claim-rejection',
        index: '06',
        title: '"0" Claim Rejection',
        subtitle: 'Protected Cash Flow',
        description:
          'SOP checklists plus doctor audits plus direct authority follow-up sustain our 99.86% claim accuracy and zero avoidable rejections.',
        metric: '99.86% Settled',
        animationType: 'zero',
      },
    ] as WhyChooseItem[],
  },

  howWeWork: {
    sectionNo: '05',
    kicker: 'The Crossing Path',
    title: 'Five Steps From Onboarding to Bank Settlement',
    subtitle:
      'A predictable bridge from the day your hospital signs on to every monthly bank reconciliation.',
    steps: [
      {
        step: '01',
        title: 'Onboarding',
        duration: 'Days 1–5',
        description:
          'On-site audit of hospital empanelment status, specialty tariff packages, pending claims backlog, and portal access.',
        checkpoint: 'Gap & Recovery Roadmap',
      },
      {
        step: '02',
        title: 'SOP Setup',
        duration: 'Days 6–10',
        description:
          'Deployment of trained coordinators, concise documentation checklists for doctors and nurses, and daily TAT trackers.',
        checkpoint: 'Live Scheme & TPA Desk',
      },
      {
        step: '03',
        title: 'Claim Verification',
        duration: 'Before Every Upload',
        description:
          'Centralized medical doctors cross-check clinical case papers, diagnostic proofs, operative images, and package tariffs.',
        checkpoint: 'Medico Pre-Audit Sign-Off',
      },
      {
        step: '04',
        title: 'Submission & Follow-up',
        duration: 'Within Statutory TAT',
        description:
          'Clean portal filings, medically defended query replies, and steady follow-up with state health authorities and TPAs.',
        checkpoint: 'Zero Stalled Queries',
      },
      {
        step: '05',
        title: 'Settlement & Reporting',
        duration: 'Weekly & Monthly',
        description:
          'Bank UTR reconciliation, variance checks, and data analysis meetings focused on steady patient-count growth.',
        checkpoint: '99.86% Realized Claims',
      },
    ] as ProcessStep[],
  },

  schemes: {
    sectionNo: '06',
    kicker: 'Schemes & Payers We Serve',
    title: 'Government, Trust-Based & Private Cashless Coverage',
    subtitle:
      'Filter by payer category and hover or click any card to inspect the turnaround targets and desk playbook.',
    categories: ['All', 'Government', 'Trust-based', 'Private Insurance / TPA'] as const,
    items: [
      {
        id: 'pmjay',
        code: 'AB PM-JAY',
        name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
        category: 'Government',
        coverage: 'Up to ₹5 Lakh / Family / Year',
        summary:
          'National cashless assurance covering secondary and tertiary hospitalization across empanelled hospitals.',
        tatTarget: 'Pre-Auth < 6 hrs · Upload < 48 hrs',
        workflowHighlights: [
          'BIS & e-KYC verification at admission desk',
          'TMS package blocking & mandatory clinical photo protocol',
          'NHA anti-fraud documentation readiness',
        ],
        eligibilityNote: 'Eligible SECC families, Ayushman Card holders, and 70+ senior citizens.',
      },
      {
        id: 'mjpjay',
        code: 'MJPJAY',
        name: 'Mahatma Jyotirao Phule Jan Arogya Yojana',
        category: 'Government',
        coverage: 'Universal Maharashtra State Cover',
        summary:
          'Maharashtra’s flagship cashless assurance scheme integrated with PM-JAY across 1,350+ medical & surgical packages.',
        tatTarget: 'Real-Time Pre-Auth & Clinical Audit',
        workflowHighlights: [
          'Arogyamitra coordination and smooth admission guidance',
          'Pre-op and post-op clinical documentation verification',
          'Dedicated district & state health society follow-up',
        ],
        eligibilityNote: 'Eligible state ration card & notified beneficiary families.',
      },
      {
        id: 'cghs-echs',
        code: 'CGHS & ECHS',
        name: 'Central Govt. & Ex-Servicemen Contributory Schemes',
        category: 'Government',
        coverage: 'Cashless Referral & Veteran Care',
        summary:
          'Accurate package/non-package billing, referral checks, and UTI-ITSL / NHA portal processing.',
        tatTarget: 'Zero-Deduction Tariff Mapping',
        workflowHighlights: [
          'Exact CGHS package rate & room entitlement checks',
          'Referral memo & emergency certificate compliance',
          'Timely scrutiny query resolution on portal',
        ],
        eligibilityNote: 'Serving & retired Central Govt. staff and Armed Forces veterans.',
      },
      {
        id: 'esic',
        code: 'ESIC',
        name: 'Employees’ State Insurance Corporation',
        category: 'Government',
        coverage: 'Secondary & Super-Specialty Care',
        summary:
          'Structured ESIC tie-up hospital billing, referral tracking, and BPA portal claim settlement.',
        tatTarget: 'BPA Filing Within Statutory Window',
        workflowHighlights: [
          'Pehchan card & referral validity verification',
          'Strict adherence to ESIC implant & procedure ceilings',
          'Monthly reconciliation with regional ESIC offices',
        ],
        eligibilityNote: 'Insured Persons (IPs) and registered dependents.',
      },
      {
        id: 'cmrf-trust',
        code: 'CMRF / PMNRF',
        name: 'Chief Minister & Prime Minister Relief Funds',
        category: 'Trust-based',
        coverage: 'Critical Care Financial Grants',
        summary:
          'Accurate treatment estimates, portal filing, and grant tracking for cardiac, oncology, and critical cases.',
        tatTarget: 'Same-Day Estimate Preparation',
        workflowHighlights: [
          'Hospital estimate & income documentation compilation',
          'Online Mantralaya & Relief Fund submission',
          'Post-discharge utilization certificate filing',
        ],
        eligibilityNote: 'Economically weaker patients needing life-saving care.',
      },
      {
        id: 'charitable-trust',
        code: 'IPF / Trusts',
        name: 'Charitable Hospital IPF & Medical Trusts',
        category: 'Trust-based',
        coverage: 'Indigent & Weaker Section Beds',
        summary:
          'Charity Commissioner compliance, Indigent Patient Fund (IPF) upkeep, and philanthropic trust coordination.',
        tatTarget: '100% Statutory Ledger Compliance',
        workflowHighlights: [
          'IPF bed allocation and beneficiary documentation',
          'Coordination with Siddhivinayak, Tata & CSR trusts',
          'Monthly Charity Commissioner reporting',
        ],
        eligibilityNote: 'BPL / EWS beneficiaries treated under charitable mandates.',
      },
      {
        id: 'private-tpa',
        code: '25+ TPAs',
        name: 'Private Health Insurance & Cashless TPA Desk',
        category: 'Private Insurance / TPA',
        coverage: 'Retail & Corporate Mediclaim',
        summary:
          'Dedicated cashless coordination across Medi Assist, Vidal, MDIndia, Paramount, Raksha, Star, and HDFC ERGO.',
        tatTarget: 'Initial Pre-Auth < 45 mins',
        workflowHighlights: [
          'IRDAI-compliant cashless forms & clinical summaries',
          'Mid-stay enhancement tracking & medical query replies',
          'Fast final discharge clearance to ease lobby crowding',
        ],
        eligibilityNote: 'Retail, corporate group mediclaim, and PSU policyholders.',
      },
      {
        id: 'corporate-psu',
        code: 'PSU & GIPSA',
        name: 'Public Sector Insurers & Corporate Tie-Ups',
        category: 'Private Insurance / TPA',
        coverage: 'PPN Agreed Package Tariffs',
        summary:
          'Exact PPN tariff mapping and corporate credit billing for New India, United India, Oriental, and National Insurance.',
        tatTarget: 'Zero Tariff Variance Billing',
        workflowHighlights: [
          'GIPSA PPN package validation & proportionate deduction prevention',
          'Direct corporate MOU credit billing & follow-up',
          'Recovery of aged receivables and short settlements',
        ],
        eligibilityNote: 'PSU mediclaim holders and corporate employees.',
      },
    ] as SchemeItem[],
  },

  gallery: {
    sectionNo: '07',
    kicker: 'Inside Daily Operations',
    title: 'On the Floor With Partner Hospitals & Audit Teams',
    subtitle:
      'Real glimpses of scheme help desks, doctor verification reviews, training workshops, and ward supplies.',
    photos: [
      {
        id: 'photo-1',
        title: 'Multi-Specialty Scheme Coordination Desk',
        category: 'Scheme Execution',
        location: 'Maharashtra Partner Network',
        caption: 'Hospital coordinators and doctors aligning AB PM-JAY pre-auth case records.',
        src: '/src/assets/images/about_hospital_team_1795075851853.jpg',
        aspect: 'wide',
      },
      {
        id: 'photo-2',
        title: 'Centralized Medical Officer Audit Desk',
        category: 'Medico Verification',
        location: 'Central Verification Team',
        caption: 'Senior doctor reviewing indoor case sheets and ICD-10 package alignment before upload.',
        src: '/src/assets/images/gallery_medical_audit_1795075852780.jpg',
        aspect: 'tall',
      },
      {
        id: 'photo-3',
        title: 'Cashless TPA & Family Counselling Desk',
        category: 'TPA Help Desk',
        location: 'Partner Hospital Lobby',
        caption: 'Dedicated front-desk coordinator guiding a patient family through cashless admission approval.',
        src: '/src/assets/images/gallery_claim_desk_1795075851766.jpg',
        aspect: 'standard',
      },
      {
        id: 'photo-4',
        title: 'SOP & NHA Guidelines Training Workshop',
        category: 'Continuous Training',
        location: 'Regional Training Hall',
        caption: 'Quarterly hands-on compliance workshop for Hospital Coordinators and Operations Executives.',
        src: '/src/assets/images/gallery_training_workshop_1795075852117.jpg',
        aspect: 'wide',
      },
      {
        id: 'photo-5',
        title: 'Hospital Leadership & Growth Review',
        category: 'Data Analytics',
        location: 'Partner Boardroom',
        caption: 'Regional Managers presenting weekly claim MIS and specialty patient-growth data.',
        src: '/src/assets/images/gallery_leadership_summit_1795075853456.jpg',
        aspect: 'tall',
      },
      {
        id: 'photo-6',
        title: 'Ward Beds, Linens & Clinical Supply Setup',
        category: 'Implants & Equipment',
        location: 'Partner ICU Wing',
        caption: 'Scheme-compliant hospital beds, linens, BTE units, and hygiene consumables ready for inspection.',
        src: '/src/assets/images/gallery_hospital_equipment_1795075851883.jpg',
        aspect: 'standard',
      },
    ] as GalleryPhoto[],
    videos: [
      {
        id: 'video-1',
        title: 'How Doctor-Led Pre-Audits Sustain 99.86% Claim Accuracy',
        duration: '03:45',
        category: 'Audit Walkthrough',
        summary:
          'Follow an indoor case sheet from ward discharge to our centralized medical officer desk before it reaches the government portal.',
        thumbnail: '/src/assets/images/gallery_medical_audit_1795075852780.jpg',
        keyTakeaways: [
          'Pre-auth package check within 45 minutes of admission',
          '18-point clinical verification by in-house doctors',
          'Structured query replies eliminating avoidable rejections',
        ],
      },
      {
        id: 'video-2',
        title: 'Inside a Hospital TPA & Government Scheme Help Desk',
        duration: '02:50',
        category: 'Hospital Case Study',
        summary:
          'See how our trained front-desk coordinators counsel patient families clearly and speed up cashless discharge approvals.',
        thumbnail: '/src/assets/images/gallery_claim_desk_1795075851766.jpg',
        keyTakeaways: [
          'Single-window help for PM-JAY, MJPJAY & 25+ TPAs',
          'Clear family communication reducing billing friction',
          'Synchronized clearance with nursing & billing teams',
        ],
      },
      {
        id: 'video-3',
        title: 'Quarterly SOP & NHA Policy Training Session',
        duration: '04:15',
        category: 'Staff Training',
        summary:
          'Highlights from our compliance training preparing Hospital Coordinators and Regional Managers for updated NHA circulars.',
        thumbnail: '/src/assets/images/gallery_training_workshop_1795075852117.jpg',
        keyTakeaways: [
          'Practical walkthrough of updated State & NHA rules',
          'Case studies preventing common documentation gaps',
          'Written certification for every deployed coordinator',
        ],
      },
    ] as GalleryVideo[],
  },

  testimonials: {
    sectionNo: '08',
    kicker: 'Hospital Partner Reviews',
    title: 'What Medical Directors & Trustees Say',
    averageRating: '4.9',
    reviewCount: '84 Verified Hospital Reviews',
    items: [
      {
        id: 't1',
        quote:
          'Before Kevat Seva Setu LLP took over our desk, nearly 14% of our MJPJAY and PM-JAY claims were stalled in repeated queries. Within 60 days of their SOP setup and doctor pre-audits, our claim accuracy crossed 99.8% with zero rejections.',
        author: 'Dr. Arvind Deshmukh',
        role: 'Medical Director',
        hospital: 'Shree Sai Multi-Specialty Hospital',
        city: 'Kalyan-Dombivli, Maharashtra',
        rating: 5,
        outcome: 'Query backlog cut by 92% in 60 days',
        initials: 'AD',
      },
      {
        id: 't2',
        quote:
          'Their TPA Help Desk staff work like part of our own administration. Cashless discharge approvals that earlier kept families waiting 5 hours now clear in under 90 minutes, improving both bed turnover and patient trust.',
        author: 'Mrs. Sunita Kulkarni',
        role: 'Chief Operating Officer',
        hospital: 'Pranav Heart & Critical Care Institute',
        city: 'Thane, Maharashtra',
        rating: 5,
        outcome: 'Discharge approval wait cut by 65%',
        initials: 'SK',
      },
      {
        id: 't3',
        quote:
          'Their weekly data analysis showed us which cardiology and orthopaedic scheme packages were under-utilized. Acting on those reports grew our eligible scheme patient count by 42% in two quarters.',
        author: 'Dr. Rajeshwar Patil',
        role: 'Managing Trustee',
        hospital: 'Navjeevan Charitable & Superspecialty Hospital',
        city: 'Pune, Maharashtra',
        rating: 5,
        outcome: '+42% scheme admissions in 6 months',
        initials: 'RP',
      },
      {
        id: 't4',
        quote:
          'From trained Hospital Coordinators to timely supply of BTE machines, ward beds, and linens with audit-ready GST invoices, having one dependable partner from Kalyan simplified our entire compliance workload.',
        author: 'Dr. Meenakshi Joshi',
        role: 'Medical Superintendent',
        hospital: 'Arogya Setu General Hospital',
        city: 'Navi Mumbai, Maharashtra',
        rating: 5,
        outcome: '100% clean audit across 4 quarters',
        initials: 'MJ',
      },
    ] as TestimonialItem[],
  },

  faqs: {
    sectionNo: '09',
    kicker: 'Straight Answers',
    title: 'Questions Hospital Directors Ask Before Signing On',
    subtitle:
      'Clear, practical answers on onboarding timelines, doctor audits, manpower coverage, and claim recovery.',
    items: [
      {
        id: 'faq-1',
        question: 'How do you maintain 99.86% claim accuracy and 0 claim rejections?',
        answer:
          'Every file crosses two separate checkpoints before portal upload. First, your on-site Hospital Coordinator verifies KYC, package blocking, and statutory TAT deadlines. Second, our centralized medical doctors audit the indoor case papers, lab reports, OT notes, and implant barcodes against NHA and TPA guidelines. Gaps are fixed before submission, never after rejection.',
      },
      {
        id: 'faq-2',
        question: 'How many days does it take to launch a scheme or TPA desk at our hospital?',
        answer:
          'Onboarding and SOP rollout take 5 to 10 working days. We audit your existing empanelment and pending files, place pre-trained coordinators at your desk, and hand your nursing and billing teams concise one-page documentation checklists.',
      },
      {
        id: 'faq-3',
        question: 'Can your team recover claims that are already stuck in query or pending?',
        answer:
          'Yes. During onboarding, our medical audit team reviews historical pending and query-flagged files across PM-JAY, MJPJAY, CGHS, and private TPAs. We prepare clinical justifications and follow up systematically to release trapped hospital receivables.',
      },
      {
        id: 'faq-4',
        question: 'Who handles recruitment, training, and leave backups for desk staff?',
        answer:
          'Kevat Seva Setu LLP handles recruitment, structured guideline training, daily supervision, and leave replacement for all deployed Hospital Coordinators, Front Desk executives, Operations Executives, and Regional Managers.',
      },
      {
        id: 'faq-5',
        question: 'Do you manage Government Schemes and Private Cashless TPAs under one roof?',
        answer:
          'Yes. Most partner hospitals engage us across Government schemes (AB PM-JAY, MJPJAY, CGHS, ECHS, ESIC), Charitable/CMRF trusts, and 25+ private TPAs with a single accountable Regional Manager.',
      },
      {
        id: 'faq-6',
        question: 'Which hospital equipment and consumables do you supply?',
        answer:
          'We supply BTE hearing machines, scheme-compliant surgical implants, hospital beds, institutional bedsheets, clinical sanitizers, and essential ward supplies — always backed by batch-traceable, GST-compliant invoices.',
      },
    ] as FaqItem[],
  },

  contact: {
    sectionNo: '10',
    bannerTitle: 'Request a Quote Today',
    bannerSubtitle:
      'Let Kevat Seva Setu LLP carry your hospital across government health schemes and TPA settlements with 99.86% claim accuracy.',
    formTitle: 'Share Your Hospital Requirement',
    formSubtitle:
      'Tell us your bed strength and active schemes to receive a clear, customized execution plan.',
    serviceOptions: [
      'Government Scheme Implementation (PM-JAY / MJPJAY)',
      'Private Insurance / TPA Help Desk',
      'Dedicated Hospital Manpower Services',
      'Implants, BTE Machines & Hospital Equipment',
      'Pending Claim Audit & Recovery',
      'Complete Multi-Service Partnership',
    ],
  },

  footer: {
    description:
      'ISO 9001:2015 certified, MSME registered (UDYAM-MH-33-0059247), women-led healthcare claim-settlement partner carrying hospitals across government and TPA schemes since 2021.',
    schemesList: [
      'Ayushman Bharat PM-JAY',
      'MJPJAY Maharashtra',
      'CGHS & ECHS Cashless',
      'ESIC & Relief Fund Trusts',
      '25+ Private TPA Desks',
    ],
    privacyPolicy: [
      {
        heading: '1. Healthcare Data Confidentiality',
        body: 'Kevat Seva Setu LLP treats all hospital inquiries, partner contacts, and operational records under strict institutional confidentiality and Indian healthcare data governance standards.',
      },
      {
        heading: '2. Website Inquiry Information',
        body: 'Callback and Quote forms collect only the details you voluntarily provide (name, hospital name, phone number, email, and notes) strictly to respond to your B2B inquiry.',
      },
      {
        heading: '3. Zero Third-Party Sharing',
        body: 'We never sell or disclose hospital partner data to third-party brokers. Records are reviewed solely by our Kalyan headquarters and regional onboarding leads.',
      },
      {
        heading: '4. Privacy Contact',
        body: 'For any data update or removal request, email kevatsevasetu21@gmail.com or call +91 81691 01411.',
      },
    ],
  },
};
