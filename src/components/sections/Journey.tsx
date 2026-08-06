import { Section, SectionHeading } from "@/components/primitives";

type Entry = {
  period: string;
  title: string;
  body: string;
  badge?: "UPCOMING" | "IN PROGRESS";
};

const ENTRIES: Entry[] = [
  {
    period: "2025",
    title: "Company Founded",
    body: "Utlwala Tactical System registered. Madi-Tota concept born from 22 years of workforce operations experience.",
  },
  {
    period: "2025",
    title: "Problem Validated",
    body: "Research confirms: South African workers spend up to 80% of income servicing debt. 78% turn to expensive short-term credit before payday.",
  },
  {
    period: "2025–2026",
    title: "Architecture & Governance",
    body: "Full engineering blueprint, AI Executive Board, Master Cost Register, and Stage-Gate framework established.",
  },
  {
    period: "2026",
    title: "Prototype Built",
    body: "Interactive platform prototype developed: PWA, USSD, WhatsApp channels. Fee transparency and 20% cap engineered in.",
  },
  {
    period: "2026",
    title: "Employer Engagement",
    body: "Pilot employer identified. LOI in progress. Payroll integration scoped.",
    badge: "IN PROGRESS",
  },
  {
    period: "2026",
    title: "Pilot Launch",
    body: "90-day pilot with first employer. 83 workers. Three access channels live.",
    badge: "UPCOMING",
  },
  {
    period: "2026–2027",
    title: "Scale",
    body: "National rollout. Multiple payroll adapters. 14,000 workers.",
    badge: "UPCOMING",
  },
  {
    period: "2027+",
    title: "African Expansion",
    body: "Continental deployment. Utlwala technology ecosystem.",
    badge: "UPCOMING",
  },
];

export function Journey() {
  return (
    <Section id="our-journey" muted>
      <SectionHeading
        eyebrow="Timeline"
        title="Our Journey"
        subtitle="From lived experience to institutional platform."
      />
      <ol className="mt-10 space-y-8 border-l border-border pl-6 md:pl-8">
        {ENTRIES.map((e) => (
          <li key={e.title} className="relative">
            <span
              className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary md:-left-[39px]"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
                {e.period}
              </span>
              {e.badge && (
                <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {e.badge}
                </span>
              )}
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
              {e.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {e.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
