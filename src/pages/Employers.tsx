import { Link } from "react-router-dom";
import { BadgeDollarSign, RefreshCw, Eye, Headphones, BarChart3, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { RATES } from "@/lib/brand";

const VALUE = [
  { icon: BadgeDollarSign, title: "R0 employer core access", text: "Core access for employers is R0. Worker-facing fees are transparent and shown up front." },
  { icon: RefreshCw, title: "Payroll-linked reconciliation", text: "Draws are reconciled against payroll at payday, subject to consent and controls." },
  { icon: Eye, title: "Transparent fee disclosure", text: `Employees always see CHILL ${RATES.chill}% or ZAP ${RATES.zap}% per draw before confirming.` },
  { icon: Headphones, title: "Support routing", text: "Employee support is routed through the Utlwala OmniChannel concept — app, WhatsApp-style, email, USSD and field agents." },
  { icon: BarChart3, title: "Adoption reporting", text: "Pilot dashboards show opt-ins, access activity and support volumes (mock placeholders in this demo)." },
  { icon: ClipboardCheck, title: "Pilot preparation", text: "We help prepare consent flows, communications and a compliance checklist before go-live." },
];

export default function Employers() {
  return (
    <>
      <PageHero
        eyebrow="For employers"
        title="A wellbeing benefit at R0 core access"
        subtitle="Offer payroll-linked wage access as a staff benefit with transparent worker fees and clean reconciliation."
      >
        <Button asChild variant="hero" size="lg">
          <Link to="/pilot">Enquire about the pilot <ArrowRight /></Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Employer value" title="Built for easy adoption" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUE.map((v) => (
            <FeatureCard key={v.title} icon={v.icon} title={v.title}>
              {v.text}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="Model the business case"
          title="Employer ROI & cost-of-turnover simulator"
          subtitle="Set your own headcount, salary and turnover assumptions. Every output is modelled, not promised."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <EmployerRoiCalculator />
          <div className="space-y-4">
            <Note>
              Employer core access is {RATES.employerCore}. Worker fees are
              disclosed before every draw and capped at {RATES.capPercent}% of
              monthly salary.
            </Note>
            <Note variant="warning">
              These outputs depend entirely on the assumptions you set. They are
              not a forecast, guarantee or offer.
            </Note>
            <Button asChild variant="soft" size="lg">
              <Link to="/compliance">See the employer trust ladder <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </Section>


      <Section muted>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow="Employer dashboard"
              title="Visibility without complexity"
              subtitle="A preview of the employer view is part of the app prototype, with mock pilot metrics and a compliance checklist."
            />
            <Button asChild className="mt-6" variant="soft" size="lg">
              <Link to="/app?screen=employer">Preview employer dashboard <ArrowRight /></Link>
            </Button>
          </div>
          <Note>
            All employer metrics shown in this prototype are placeholders for
            demonstration. No real employee or payroll data is collected.
          </Note>
        </div>
      </Section>
    </>
  );
}
