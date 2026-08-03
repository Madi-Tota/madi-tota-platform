// Central brand & content constants for the Madi-Tota prototype.
// Prototype only — mock data, no live deployment.

export const BRAND = {
  name: "Madi-Tota",
  owner: "Utlwala Tactical System (Pty) Ltd",
  tagline: "Wage access made simple, fair and payroll-linked.",
  descriptor:
    "designed and intended as payroll-linked wage-access infrastructure",
  email: "partners@maditota.co.za",
  phone: "+27 69 058 5643",
  social: "@Madi-Tota",
  omnichannel: "Utlwala OmniChannel",
};

export const RATES = {
  chill: 5.8, // % per draw
  zap: 11.1, // % per draw
  capPercent: 20, // % monthly salary access cap
  employerCore: "R0",
};

export const SIM_SALARY = 12400; // simulated monthly salary used by all simulators

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
  funding:
    "Seed round — final terms in the diligence data room under NDA.",
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
