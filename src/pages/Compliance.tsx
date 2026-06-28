import { ShieldCheck, Lock, FileText, Scale, Eye, UserCheck } from "lucide-react";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { COMPLIANCE, FOOTER_POLICY_LINKS, RATES, BRAND } from "@/lib/brand";

const PRINCIPLES = [
  { icon: Eye, title: "Transparency", text: `Workers see CHILL ${RATES.chill}% or ZAP ${RATES.zap}% per draw before confirming. No hidden fees.` },
  { icon: ShieldCheck, title: "Responsible access", text: `A ${RATES.capPercent}% monthly salary access cap is built in as a guardrail.` },
  { icon: UserCheck, title: "Consent-led", text: "Participation is voluntary and payroll-linked recovery depends on consent." },
  { icon: Lock, title: "Data protection", text: `${COMPLIANCE.popia}, including access controls and data-minimisation principles.` },
];

export default function Compliance() {
  return (
    <>
      <PageHero
        eyebrow="Compliance & trust"
        title="Built with compliance front of mind"
        subtitle="This page is maintained to answer common questions about how Madi-Tota™ approaches compliance, privacy and responsible access."
      />

      <Section>
        <Note variant="warning">
          {COMPLIANCE.classification}. We do not claim approval, registration,
          licensing, guaranteed availability, or completed compliance. This is a
          non-live prototype using mock data only.
        </Note>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Scale className="h-7 w-7 text-primary" />
            <h3 className="mt-3 font-display text-lg font-bold">Regulatory status</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {COMPLIANCE.classification}. Madi-Tota™ is {BRAND.descriptor}.
              Nothing on this site should be read as a claim of approval or
              licensing.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Lock className="h-7 w-7 text-primary" />
            <h3 className="mt-3 font-display text-lg font-bold">Privacy & data</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {COMPLIANCE.popia}. In this prototype no real personal, salary or
              payroll data is collected, stored or transmitted.
            </p>
          </div>
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
              <FileText className="h-5 w-5 text-primary" />
              {p}
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                Placeholder
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
