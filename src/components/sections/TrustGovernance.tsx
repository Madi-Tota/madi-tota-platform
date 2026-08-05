import {
  Eye,
  Gauge,
  FileLock2,
  Landmark,
  BookOpenCheck,
  Lock,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives";

const TILES = [
  { icon: Eye, text: "Fee shown before you confirm — every draw, every time." },
  {
    icon: Gauge,
    text: "Hard 20% cap — responsible use by design, not by promise.",
  },
  {
    icon: FileLock2,
    text: "Consent-first & POPIA-aligned — purpose-limited data, strict retention.",
  },
  {
    icon: Landmark,
    text: "Ring-fenced float — worker funds held separately and monitored.",
  },
  {
    icon: BookOpenCheck,
    text: "Auditable to the cent — double-entry ledger and immutable audit trail.",
  },
  {
    icon: Lock,
    text: "Security by design — encryption in transit and at rest, MFA for admin and employer accounts, independent penetration test before pilot launch.",
  },
];

export function TrustGovernance() {
  return (
    <Section id="trust">
      <SectionHeading
        eyebrow="Trust & governance"
        title="Built like infrastructure, not like an app."
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <li
            key={t.text}
            className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-foreground">{t.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
