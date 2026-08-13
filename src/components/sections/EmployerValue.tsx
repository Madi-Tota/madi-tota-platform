import { Link } from "react-router-dom";
import { HeartHandshake, ShieldCheck, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, FeatureCard } from "@/components/primitives";
import { FEE_LABELS } from "@/lib/fee-schedule";
import { BRAND_IMAGES } from "@/lib/brand";

const TILES = [
  {
    icon: HeartHandshake,
    title: "Retention you can feel",
    text: "Payday stress drives turnover and absenteeism in shift-based work. Giving workers a safe bridge to their own earned wages is a benefit employees actually use.",
  },
  {
    icon: ShieldCheck,
    title: "No lending, no balance-sheet risk",
    text: "Recovery is payroll-linked at payday, subject to consent and applicable law. You are not a lender, and workers are not borrowers.",
  },
  {
    icon: ScrollText,
    title: "Governance-ready by design",
    text: "Consent records, disclosure records and an immutable audit trail on every transaction — built for audit from day one.",
  },
];

export function EmployerValue() {
  return (
    <Section id="employers" muted>
      <figure className="mb-10 overflow-hidden rounded-2xl border border-border">
        <img
          src={BRAND_IMAGES.bpoCallCentre}
          alt="South African BPO and call-centre agents wearing headsets at workstations with performance dashboards."
          className="aspect-video w-full object-cover"
        />
        <figcaption className="bg-card px-4 py-2.5 text-xs font-medium text-muted-foreground">
          BPO & CX workforces — our pilot segment. Shift-based, WhatsApp/USSD-native.
        </figcaption>
      </figure>
      <SectionHeading
        eyebrow="For employers"
        title="A retention benefit that costs your business nothing."
        subtitle={`Employer core access is ${FEE_LABELS.employerCore}. Your workers pay one disclosed flat fee; you pay nothing for core access.`}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TILES.map((t) => (
          <FeatureCard key={t.title} icon={t.icon} title={t.title}>
            {t.text}
          </FeatureCard>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="hero" size="lg">
          <Link to="/pilot">Join the pilot interest list</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#faq">Read employer FAQ</a>
        </Button>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        We meet your payroll process where it is. The pilot runs on a dedicated
        connector with our first employer partner; Sage, VIP and SimplePay
        connectors are on the published engineering roadmap.
      </p>
    </Section>
  );
}
