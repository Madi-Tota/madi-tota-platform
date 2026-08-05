import { PageHero, Section, SectionHeading, Note, FeatureCard } from "@/components/primitives";
import { PilotForms } from "@/components/PilotForms";
import { Building2, Users, FileCheck2 } from "lucide-react";
import { RATES } from "@/lib/brand";
import { FEE_LABELS } from "@/lib/fee-schedule";

export default function Pilot() {
  return (
    <>
      <PageHero
        eyebrow="Employer pilot"
        title="Join the Madi-Tota™ pilot interest list"
        subtitle={`Tell us about yourself and we will share pilot details. Employer core access is ${FEE_LABELS.employerCore}.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="What to expect"
              title="A guided, low-risk pilot"
            />
            <div className="grid gap-4">
              <FeatureCard icon={Building2} title={`${FEE_LABELS.employerCore} employer core access`}>
                No core access cost to the employer. Worker fees are transparent.
              </FeatureCard>
              <FeatureCard icon={Users} title="Consent-led rollout">
                Employees opt in voluntarily, with clear communications.
              </FeatureCard>
              <FeatureCard icon={FileCheck2} title="Compliance checklist">
                We prepare a checklist together as part of pilot readiness.
              </FeatureCard>
            </div>
            <Note>
              {RATES.capPercent}% monthly cap and fee-before-confirm apply across
              the journey. No real payroll data is collected through this
              prototype.
            </Note>
          </div>

          <PilotForms />
        </div>
      </Section>
    </>
  );
}
