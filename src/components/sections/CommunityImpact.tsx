import { Section, SectionHeading } from "@/components/primitives";

const PERSONAS = [
  {
    title: "Security Officers",
    body: "Shift-based. Often underserved. USSD-first access.",
  },
  {
    title: "BPO & Call Centre Agents",
    body: "High turnover. Young workforce. WhatsApp-native.",
  },
  {
    title: "Retail Staff",
    body: "Multiple locations. Thin margins. Real payroll complexity.",
  },
  {
    title: "Domestic Workers",
    body: "Often excluded from formal financial products entirely.",
  },
  {
    title: "Healthcare Workers",
    body: "Shift-based. Essential. Deserve financial dignity.",
  },
  {
    title: "Logistics & Mining",
    body: "Remote sites. Connectivity challenges. USSD-critical.",
  },
];

export function CommunityImpact() {
  return (
    <Section id="community">
      <SectionHeading
        eyebrow="Community impact"
        title="Built for the People Who Build South Africa"
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PERSONAS.map((p) => (
          <article
            key={p.title}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div className="grid aspect-[4/3] place-items-center border-b border-dashed border-border bg-muted p-4 text-center text-xs font-medium text-muted-foreground">
              [PHOTO PENDING — CEO approval required]
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Real photography. Real South Africans. Not stock images. [PHOTOGRAPHY
        COMMISSION PENDING — CEO approval]
      </p>
    </Section>
  );
}
