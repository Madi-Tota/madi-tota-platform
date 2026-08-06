import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives";

export function UtlwalaSection() {
  return (
    <Section id="utlwala">
      <div className="grid gap-8 md:grid-cols-[200px_1fr] md:items-start">
        <div className="grid h-32 w-full max-w-[200px] place-items-center rounded-2xl border border-dashed border-border bg-muted p-4 text-center text-xs font-medium text-muted-foreground">
          [UTLWALA LOGO MARK — pending CEO approval]
        </div>
        <div>
          <SectionHeading
            eyebrow="Parent company"
            title="Built by Utlwala Tactical System"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
            Madi-Tota is the flagship platform of Utlwala Tactical System, a South
            African technology company building sovereign digital infrastructure for
            Africa. Utlwala provides the strategic vision, governance framework, and
            long-term technology ecosystem within which Madi-Tota operates.
          </p>
          {/* [URL PENDING — CEO to confirm] */}
          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
          >
            Learn more about Utlwala <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
