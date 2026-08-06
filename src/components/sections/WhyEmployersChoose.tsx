import { ShieldCheck, Users, CalendarCheck, Settings, Lock, LineChart } from "lucide-react";
import { Section, SectionHeading, FeatureCard } from "@/components/primitives";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "R0 Core Cost",
    body: "Employer access to the platform is free. No subscription. No integration fee at pilot.",
  },
  {
    icon: Users,
    title: "Worker Retention",
    body: "Financial stress is the #1 driver of absenteeism and turnover. Wage access reduces both.",
  },
  {
    icon: CalendarCheck,
    title: "Reduced Absenteeism",
    body: "Workers who can access earned wages mid-cycle miss fewer shifts.",
  },
  {
    icon: Settings,
    title: "Payroll Simplicity",
    body: "One deduction per worker per cycle. Automated. Reconciled. No manual admin.",
  },
  {
    icon: Lock,
    title: "No Lending Exposure",
    body: "Madi-Tota is not a credit provider. Employers carry zero lending risk or regulatory exposure.",
  },
  {
    icon: LineChart,
    title: "Financial Wellness",
    body: "Position your company as one that actively supports worker financial health.",
  },
];

export function WhyEmployersChoose() {
  return (
    <Section id="why-employers" muted>
      <SectionHeading
        eyebrow="For employers"
        title="Why Employers Choose Madi-Tota"
        subtitle="R0 core cost. No lending exposure. Measurable workforce impact."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <FeatureCard key={c.title} icon={c.icon} title={c.title}>
            {c.body}
          </FeatureCard>
        ))}
      </div>
    </Section>
  );
}
