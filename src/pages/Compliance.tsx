import { ShieldCheck, Lock, FileText, Scale, Eye, UserCheck, Gavel, Landmark, ClipboardCheck, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { COMPLIANCE, FOOTER_POLICY_LINKS, RATES, BRAND } from "@/lib/brand";

const PRINCIPLES = [
  { icon: Eye, title: "Transparency", text: `Workers see CHILL ${RATES.chill}% or ZAP ${RATES.zap}% per draw before confirming. No hidden fees.` },
  { icon: ShieldCheck, title: "Responsible access", text: `A ${RATES.capPercent}% monthly salary access cap is built in as a guardrail.` },
  { icon: UserCheck, title: "Consent-led", text: "Participation is voluntary and payroll-linked recovery depends on worker consent and employer authorisation." },
  { icon: Lock, title: "Data protection", text: "POPIA-aligned consent, purpose limitation, access controls and data minimisation — under external review." },
];

const POSTURE = [
  {
    icon: Gavel,
    title: "Regulatory classification",
    text: `${COMPLIANCE.classification}. Whether the model falls inside or outside the NCA is a question for independent counsel, and we will publish the opinion position before any live rollout.`,
  },
  {
    icon: Landmark,
    title: "Payroll deduction framework",
    text: `${COMPLIANCE.deductions}. Deductions require employer authorisation and worker consent, and must respect the BCEA limits on deductions from remuneration.`,
  },
  {
    icon: Lock,
    title: "POPIA posture",
    text: `${COMPLIANCE.popia}. See the Privacy Notice for purposes, sharing, retention and data-subject rights.`,
  },
];

const LADDER = [
  { step: "1", title: "Discovery", text: "Employer reviews the model, fee structure and worker protections. No data exchanged." },
  { step: "2", title: "Legal & compliance review", text: "Counsel opinion, deduction mandate wording and POPIA pack reviewed by the employer's own advisors." },
  { step: "3", title: "Controlled pilot", text: "Limited, voluntary cohort with capped access, reporting and an agreed exit path." },
  { step: "4", title: "Scale decision", text: "Employer decides on wider rollout based on pilot evidence, not on a sales promise." },
];

export default function Compliance() {
  return (
    <>
      <PageHero
        eyebrow="Trust & compliance centre"
        title="Compliance is a launch gate, not a footnote"
        subtitle="This page is maintained by Utlwala Tactical System (Pty) Ltd to answer common legal, privacy and responsible-access questions about Madi-Tota™. It is app-owned content, not independent verification or certification."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/privacy">Read the Privacy Notice</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
          >
            <Link to="/pilot">Request the diligence pack</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Note variant="warning">
          {COMPLIANCE.classification}. We do not claim approval, registration,
          licensing, guaranteed availability, or completed compliance. This is a
          non-live prototype using mock data only.
        </Note>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {POSTURE.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title}>
              {p.text}
            </FeatureCard>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Scale className="h-7 w-7 text-primary" aria-hidden="true" />
          <h3 className="mt-3 font-display text-lg font-bold">Product positioning</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Madi-Tota™ is {BRAND.descriptor}. Nothing on this site should be read
            as a claim of approval, licensing or completed audit, and no figure
            shown anywhere in this prototype represents a live transaction.
          </p>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Our principles" title="How we think about trust" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title}>
              {p.text}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Employer trust ladder"
          title="How an employer moves from interest to rollout"
          subtitle="Each rung has its own evidence requirement. No employer is asked to skip a step."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {LADDER.map((l) => (
            <li key={l.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 font-display text-lg font-bold text-primary">
                {l.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{l.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Investor diligence"
          title="What sits behind the prototype"
          subtitle="Detailed materials are shared with qualified counterparties under NDA."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard icon={Briefcase} title="Funding position">
            {COMPLIANCE.funding} We publish no valuation, no committed amounts
            and no return expectations on this public site.
          </FeatureCard>
          <FeatureCard icon={ClipboardCheck} title="Diligence data room">
            Legal opinion status, deduction mandate wording, POPIA pack, unit
            economics and pilot design are available on request to employers and
            investors under NDA.
          </FeatureCard>
        </div>
        <div className="mt-8">
          <Button asChild variant="soft" size="lg">
            <Link to="/contact">Request data room access</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Policies"
          title="Governance documents"
          subtitle="These documents would be published with the live product. In this prototype they are placeholders."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FOOTER_POLICY_LINKS.map((p) => (
            <div
              key={p}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium shadow-sm"
            >
              <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
              {p}
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {p === "Privacy Policy" ? "Draft published" : "Placeholder"}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
