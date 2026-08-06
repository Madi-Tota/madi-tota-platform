import { Section } from "@/components/primitives";

const LINES = [
  "African Systems. Global Standard.",
  "Re Tla Fenya Mmogo.",
  "Technology serving people — not the other way around.",
  "Legacy before valuation.",
];

export function Philosophy() {
  return (
    <Section id="philosophy" muted className="text-center">
      <span className="eyebrow">Our philosophy</span>
      <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
        Our Philosophy
      </h2>
      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        {LINES.map((l) => (
          <p
            key={l}
            className="font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl"
          >
            {l}
          </p>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
        We are not building another fintech app. We are building sovereign digital
        infrastructure for African workers — designed with the discipline of a global
        institution and the heart of a South African family.
      </p>
    </Section>
  );
}
