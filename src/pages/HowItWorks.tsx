import { Building2, Handshake, CalendarClock, Eye, ShieldCheck, FileCheck2, Workflow } from "lucide-react";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { AccessCard } from "@/components/AccessCard";
import { RATES, COMPLIANCE } from "@/lib/brand";

const FLOW = [
  { icon: Building2, title: "Employer joins the pilot", text: "Employer opts in to the pilot and connects payroll context. Employer core access is R0." },
  { icon: Eye, title: "Employee sees what is available", text: `The employee views available access this month, capped at ${RATES.capPercent}% of monthly salary.` },
  { icon: Handshake, title: "Choose CHILL or ZAP", text: `CHILL is ${RATES.chill}% per draw, ZAP is ${RATES.zap}% per draw. The fee is shown before confirming.` },
  { icon: FileCheck2, title: "Confirm with full fee disclosure", text: "The exact fee and payday recovery amount are displayed on the confirmation screen." },
  { icon: CalendarClock, title: "Payroll-linked recovery at payday", text: "Recovery happens at payday, subject to consent and controls." },
  { icon: ShieldCheck, title: "Controls throughout", text: "Caps, disclosures and consent are applied across the journey by design." },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A transparent, payroll-linked flow"
        subtitle="Madi-Tota™ is designed and intended as payroll-linked wage-access infrastructure. Here is the end-to-end concept."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="grid gap-6 sm:grid-cols-2">
            {FLOW.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title}>
                {f.text}
              </FeatureCard>
            ))}
          </div>
          <div className="space-y-6 lg:sticky lg:top-24">
            <AccessCard />
            <Note>
              Every example here uses mock data. {COMPLIANCE.disclaimers[2]}
            </Note>
          </div>
        </div>
      </Section>
      <Section muted>
        <SectionHeading
          eyebrow="Why it is different"
          title="Designed around fairness and clarity"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard icon={Workflow} title="Payroll-linked by design">
            Recovery is tied to payroll and consent — not open-ended lending.
          </FeatureCard>
          <FeatureCard icon={Eye} title="Fee before confirmation">
            Workers always see the exact fee before they confirm a draw.
          </FeatureCard>
          <FeatureCard icon={ShieldCheck} title="Guardrails built in">
            The {RATES.capPercent}% monthly cap and clear disclosures support responsible access.
          </FeatureCard>
        </div>
      </Section>
    </>
  );
}
