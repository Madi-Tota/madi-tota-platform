import { Section, SectionHeading } from "@/components/primitives";

export function WhyNow() {
  return (
    <Section id="why-now" muted>
      <SectionHeading
        eyebrow="Why now"
        title="The end of the month should not be the hardest week."
      />
      <div className="mt-8 max-w-3xl space-y-4">
        <p className="text-lg leading-relaxed text-foreground">
          South African workers carry a heavy debt burden: industry research
          reports employees can spend as much as 80% of income servicing debt,
          and 78% turn to expensive short-term credit to reach payday. Earned
          wage access is not more debt — it is your own earned wages, accessible
          when you need them. Madi-Tota is building that as disciplined,
          auditable infrastructure.
        </p>
        <p className="text-sm text-muted-foreground">
          Sources: Floatpays "EWA Guide for Employers" (2025–26); JustMoney
          (2025).
        </p>
      </div>
    </Section>
  );
}
