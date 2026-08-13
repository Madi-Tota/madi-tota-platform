import { Section, SectionHeading } from "@/components/primitives";
import { StageBadge } from "@/components/StageBadge";
import { REGULATORY_STATEMENT } from "@/lib/governance";
import {
  UserCheck,
  FileStack,
  Eye,
  Fingerprint,
  AlertTriangle,
  Gauge,
} from "lucide-react";

/** Item 8 — public-safe governance strip. No internal registers or ADR numbers. */
const TILES = [
  {
    icon: UserCheck,
    title: "Consent-first",
    text: "Nothing is activated and no draw is processed without an affirmative, unticked-by-default consent.",
  },
  {
    icon: FileStack,
    title: "Versioned agreements",
    text: "Every worker agreement carries a version, and the version in force is recorded with each consent.",
  },
  {
    icon: Eye,
    title: "Fee disclosure",
    text: "The requested amount, the fee, the net disbursement and the payroll recovery are shown before confirmation.",
  },
  {
    icon: Fingerprint,
    title: "Immutable-style audit trail",
    text: "Consent and transaction events are written as append-only records intended for independent inspection.",
  },
  {
    icon: AlertTriangle,
    title: "Exception management",
    text: "Variances are detected, recorded and worked through a resolution path rather than quietly closed.",
  },
  {
    icon: Gauge,
    title: "20% cap",
    text: "Access is capped at 20% of monthly net pay, with remaining capacity shown after every quote.",
  },
];

export function Auditability({ inline = false }: { inline?: boolean }) {
  const body = (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <article
            key={t.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{REGULATORY_STATEMENT}</p>
    </>
  );

  if (inline) return <div>{body}</div>;

  return (
    <Section id="auditability">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeading
          eyebrow="Governance"
          title="Built for auditability"
          subtitle="The controls an employer, an auditor or a regulator would ask about first."
        />
        <StageBadge stage="planned" />
      </div>
      {body}
    </Section>
  );
}
