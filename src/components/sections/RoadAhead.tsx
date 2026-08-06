import { Section, SectionHeading } from "@/components/primitives";

const STEPS = [
  { title: "Pilot", body: "First employer. 83 workers. Prove the model." },
  {
    title: "National Rollout",
    body: "Multiple employers. Multiple payroll systems. 14,000 workers.",
  },
  {
    title: "Payroll Integrations",
    body: "Sage, VIP, SimplePay, SAP, Workday adapters.",
  },
  {
    title: "Financial Wellness",
    body: "Savings, budgeting tools, employer analytics.",
  },
  {
    title: "African Expansion",
    body: "Sovereign wage-access infrastructure for the continent.",
  },
  {
    title: "Utlwala Ecosystem",
    body: "A family of African technology platforms.",
  },
];

export function RoadAhead() {
  return (
    <Section id="road-ahead" muted>
      <SectionHeading eyebrow="What's next" title="This Is Only the Beginning" />
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
              {i + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
