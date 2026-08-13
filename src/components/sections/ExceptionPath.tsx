import { useState } from "react";
import { Section, SectionHeading } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { money0 } from "@/lib/fees";
import { DEMO_ONLY_LABEL } from "@/lib/governance";
import { StageBadge } from "@/components/StageBadge";
import { AlertTriangle, ClipboardList, Building2, UserCog, CheckCircle2 } from "lucide-react";

const EXPECTED = 1000;
const ACTUAL = 800;

const STAGES = [
  {
    icon: AlertTriangle,
    title: "Exception detected",
    text: "Recovery does not match the expected amount. The transaction is flagged, not closed.",
  },
  {
    icon: ClipboardList,
    title: "Reconciliation record created",
    text: "Expected, actual and variance are written to an immutable-style reconciliation record.",
  },
  {
    icon: Building2,
    title: "Employer reconciliation",
    text: "The employer receives the variance line item for confirmation against the payroll run.",
  },
  {
    icon: UserCog,
    title: "Worker / account status controlled",
    text: "Further access is paused for that worker while the variance is open. No silent write-off.",
  },
  {
    icon: CheckCircle2,
    title: "Resolution workflow",
    text: "The variance is resolved, carried to the next cycle under agreement, or escalated for review.",
  },
];

/** Item 6 — controlled exception / shortfall demonstration. */
export function ExceptionPath({ inline = false }: { inline?: boolean }) {
  const [step, setStep] = useState(0);
  const variance = EXPECTED - ACTUAL;

  const body = (
    <>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["Expected", money0(EXPECTED)],
          ["Actual", money0(ACTUAL)],
          ["Variance", money0(variance)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {k}
            </p>
            <p className="mt-2 font-display text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>

      <ol className="mt-6 space-y-3">
        {STAGES.map((s, i) => {
          const active = i <= step;
          return (
            <li
              key={s.title}
              className={
                active
                  ? "flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                  : "flex gap-4 rounded-2xl border border-dashed border-border p-5 opacity-50"
              }
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">
                  {i + 1} · {s.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          onClick={() => setStep((s) => Math.min(s + 1, STAGES.length - 1))}
          disabled={step >= STAGES.length - 1}
        >
          Advance exception workflow
        </Button>
        <Button variant="soft" onClick={() => setStep(0)}>
          Reset
        </Button>
      </div>

      <p className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm font-semibold">
        Madi-Tota does not silently close transactions that do not reconcile.
      </p>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{DEMO_ONLY_LABEL}</p>
    </>
  );

  if (inline) return <div>{body}</div>;

  return (
    <Section muted id="exception-path">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeading
          eyebrow="Exception path"
          title="When recovery does not match, the system says so"
        />
        <StageBadge stage="planned" />
      </div>
      {body}
    </Section>
  );
}
