import { PageHero, Section, SectionHeading, Note, FeatureCard } from "@/components/primitives";
import { ProtoForm } from "@/components/ProtoForm";
import { Building2, Users, FileCheck2 } from "lucide-react";
import { RATES } from "@/lib/brand";

export default function Pilot() {
  return (
    <>
      <PageHero
        eyebrow="Employer pilot"
        title="Enquire about the Madi-Tota™ pilot"
        subtitle="Tell us about your organisation and we will share pilot details. Employer core access is R0."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="What to expect"
              title="A guided, low-risk pilot"
            />
            <div className="grid gap-4">
              <FeatureCard icon={Building2} title="R0 employer core access">
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
              the journey. {""}
              No real payroll data is collected through this prototype.
            </Note>
          </div>

          <ProtoForm
            title="Employer pilot enquiry"
            submitLabel="Send pilot enquiry"
            fields={[
              { name: "company", label: "Company name", required: true },
              { name: "contact", label: "Contact person", required: true },
              { name: "email", label: "Work email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "size", label: "Approx. number of employees", type: "select", options: ["1–50", "51–200", "201–1000", "1000+"], required: true },
              { name: "sector", label: "Sector / industry" },
              { name: "note", label: "Anything you would like us to know", type: "textarea" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
