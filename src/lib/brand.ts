// Central brand & content constants for the Madi-Tota prototype.
// Prototype only — mock data, no live deployment.

export const BRAND = {
  name: "Madi-Tota",
  owner: "Utlwala Tactical System (Pty) Ltd",
  tagline: "Wage access made simple, fair and payroll-linked.",
  descriptor:
    "designed and intended as payroll-linked wage-access infrastructure",
  motto: "Re tla fenya mmogo — we will succeed together",
  email: "partners@maditota.co.za",
  phone: "+27 69 058 5643",
  social: "@maditota",
  omnichannel: "Utlwala OmniChannel",
};

/** Governed contact register — routing is enforced by form type. */
export const CONTACTS = {
  partners: {
    label: "Partners & employers",
    email: "partners@maditota.co.za",
  },
  support: {
    label: "Worker support (post-launch)",
    email: "support@maditota.co.za",
  },
  general: { label: "General enquiries", email: "info@maditota.co.za" },
} as const;

export type ContactRoute = keyof typeof CONTACTS;

export const SOCIALS = [
  { id: "linkedin", label: "LinkedIn", handle: "@maditota", url: "https://linkedin.com/company/maditota" },
  { id: "x", label: "X", handle: "@maditota", url: "https://x.com/maditota" },
  { id: "facebook", label: "Facebook", handle: "@maditota", url: "https://facebook.com/maditota" },
  { id: "instagram", label: "Instagram", handle: "@maditota", url: "https://instagram.com/maditota" },
  { id: "tiktok", label: "TikTok", handle: "@maditota", url: "https://tiktok.com/@maditota" },
] as const;

export const RATES = {
  chill: 5.8, // % per draw
  zap: 11.1, // % per draw
  capPercent: 20, // % monthly salary access cap
  employerCore: "R0",
};

/** DEF-002 — simulated monthly salary used by every simulator. */
export const SIM_SALARY = 12000;
export const SIM_WORKING_DAYS = 22;
export const SIM_DAYS_WORKED = 14;
export const SIM_PRIOR_DRAWS = 500;
/** Derived — never hardcode a rand cap anywhere. */
export const SIM_CAP = (SIM_SALARY * RATES.capPercent) / 100;

export const BRAND_IMAGES = {
  lockup: "/brand/madi-tota-lockup.webp",
  mark: "/brand/mark.png",
  workforce: "/brand/workforce-sectors.webp",
  workersMap: "/brand/workers-map.webp",
  household: "/brand/household-workers.webp",
  verticals: [
    {
      src: "/brand/vertical-clinic.webp",
      alt: "Madi-Tota concept clinic with community health staff at sunrise",
      title: "Community health",
    },
    {
      src: "/brand/vertical-logistics.webp",
      alt: "Madi-Tota concept logistics depot with warehouse and freight staff",
      title: "Logistics",
    },
    {
      src: "/brand/vertical-retail.webp",
      alt: "Madi-Tota concept neighbourhood retail store with staff and customers",
      title: "Community retail",
    },
  ],
} as const;

/** Mandatory governance caption for every future-vertical image. */
export const ILLUSTRATIVE_CAPTION = "Illustrative concept — future vertical";

export const COMPLIANCE = {
  classification:
    "Regulatory classification pending independent counsel opinion — legal and compliance review is a launch gate",
  deductions:
    "Employer-authorised, worker-consented payroll deduction — framework under external legal review",
  popia:
    "POPIA-aligned consent, purpose limitation and retention — compliance pack under external review",
  disclaimers: [
    "This is a non-live prototype using mock data only.",
    "No real payments, no real employee data collection, no regulated activity.",
    "We do not claim approval, registration, licensing, guaranteed availability, or completed compliance.",
  ],
  formWarning:
    "Do not submit salary, ID number or payroll documents through this public form.",
  simLabel: "SIMULATED DATA — ILLUSTRATIVE ONLY.",
  simNote: "Simulation for illustration — no live transaction.",
  funding: "Seed round — final terms in the diligence data room under NDA.",
  consentLabel:
    "I consent to Madi-Tota processing this information to respond to my interest (POPIA).",
};

export const FOOTER_TAGLINE =
  "Madi-Tota™ — a vertical of Utlwala Tactical System (Pty) Ltd · African Systems. Global Standard.";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/employees", label: "For Employees" },
  { to: "/employers", label: "For Employers" },
  { to: "/household", label: "Household Wellness (Roadmap)" },
  { to: "/learn", label: "Learn" },
  { to: "/moneywise", label: "MoneyWise Challenge" },
  { to: "/support", label: "Support" },
  { to: "/pilot", label: "Employer Pilot" },
  { to: "/field-agent", label: "Field Onboarding" },
  { to: "/compliance", label: "Trust & Compliance" },
  { to: "/privacy", label: "Privacy Notice" },
  { to: "/contact", label: "Contact" },
  { to: "/app", label: "App Prototype" },
];

export const FOOTER_POLICY_LINKS = [
  "Privacy Policy",
  "PAIA Manual",
  "AML Policy",
  "Code of Ethics",
  "Terms of Use",
  "Complaints & Support",
];

export const LANGUAGES = ["English", "Setswana", "isiZulu"] as const;
