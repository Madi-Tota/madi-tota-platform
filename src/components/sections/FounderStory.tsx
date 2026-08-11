import { Section, SectionHeading } from "@/components/primitives";

const BEATS = [
  "[FOUNDER NAME] spent [X years] working in [industry]. The pattern never changed: by the third week of the month, good people were making hard choices — borrowing against the next salary at prices that made the next month harder.",
  "The insight was simple: wages already earned should never be a favour, and never a debt trap. Access linked to payroll — recovered at payday, with consent — is the safest form of wage access that exists. No collections. No credit checks. No spiral.",
  "So we are building Madi-Tota the way infrastructure is built, not the way apps are built: disclosed fees, a hard 20% cap, consent first, and every cent auditable. The people who rely on it most deserve the most disciplined platform in the market.",
];

const SEGMENTS = [
  "Security",
  "BPO & call centres",
  "Retail",
  "Hospitality",
  "Manufacturing",
  "Healthcare",
];

export function FounderStory() {
  return (
    <Section id="founder-story">
      <SectionHeading eyebrow="Founder story" title="Why Madi-Tota exists" />

      <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
        <figure className="mx-auto w-full max-w-[280px]">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <img
              src="/brand/worker-lebo-koloi.jpg"
              alt="Lebo Koloi, Founder and CEO of Madi-Tota"
              width={560}
              height={700}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Lebo Koloi — Founder & CEO, Madi-Tota.
          </figcaption>
        </figure>

        <div className="space-y-6">
          {BEATS.map((beat, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground md:text-lg"
            >
              {beat}
            </p>
          ))}

          <blockquote className="rounded-2xl border-l-4 border-secondary bg-muted/50 p-6">
            <p className="font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
              "We are not lending people money. We are handing them what they
              already earned — safely, transparently, and with dignity."
            </p>
            <footer className="mt-4 text-sm font-medium text-muted-foreground">
              — [FOUNDER NAME], Founder, Madi-Tota
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Built for shift-based workforces
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
