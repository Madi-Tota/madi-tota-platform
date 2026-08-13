import { Section, SectionHeading } from "@/components/primitives";
import { FileSignature, Scale } from "lucide-react";
import { DOCTRINE_LINE, REGULATORY_STATEMENT } from "@/lib/governance";

export function YourAgreement() {
  return (
    <Section id="your-agreement">
      <SectionHeading
        eyebrow="Trust & governance"
        title="Your agreement matters"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <FileSignature className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-foreground">
            Before anything happens, you see the amount you are accessing, the fee
            you will pay, the amount you receive and the amount that will be
            recovered from your payroll. You confirm that you understand those four
            figures by ticking a box that is never pre-ticked. No tick, no
            transaction. Recovery is a single payroll deduction of the amount you
            requested — nothing rolls over, nothing compounds, and no further amount
            is added later. {DOCTRINE_LINE}
          </p>
        </article>
        <article className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-foreground">
{REGULATORY_STATEMENT} Nothing on this page is legal advice, an
            offer, or a regulatory conclusion.
          </p>
        </article>
      </div>
    </Section>
  );
}
