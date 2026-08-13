import { useState } from "react";
import { Section, SectionHeading } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { quote, money0, PRODUCTS, type ProductId } from "@/lib/fees";
import { StageBadge } from "@/components/StageBadge";
import { DoctrineLine } from "@/components/DoctrineLine";
import { ArrowRight, Scale } from "lucide-react";

/** Item 5 — Follow the R1: investor-grade money-path strip. */
export function FollowTheRand({ inline = false }: { inline?: boolean }) {
  const [product, setProduct] = useState<ProductId>("ZAP");
  const [amount, setAmount] = useState(1000);
  const q = quote(amount, product);

  const beats = [
    { label: "Request", value: money0(q.amount), note: "Worker requests access" },
    {
      label: "Fee disclosed",
      value: money0(q.fee),
      note: `${q.product} ${q.rate}% — shown before confirmation`,
    },
    { label: "Worker receives", value: money0(q.netReceived), note: "Net disbursement" },
    {
      label: "Payroll recovery",
      value: money0(q.payrollRecovery),
      note: "One deduction on payday",
    },
  ];

  const body = (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {PRODUCTS.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={product === p ? "default" : "outline"}
            onClick={() => setProduct(p)}
          >
            {p}
          </Button>
        ))}
        {[500, 1000, 2000].map((a) => (
          <Button
            key={a}
            size="sm"
            variant={amount === a ? "soft" : "ghost"}
            onClick={() => setAmount(a)}
          >
            {money0(a)}
          </Button>
        ))}
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-4">
        {beats.map((b, i) => (
          <li
            key={b.label}
            className="relative rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {i + 1} · {b.label}
            </span>
            <p className="mt-2 font-display text-2xl font-bold">{b.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{b.note}</p>
            {i < beats.length - 1 && (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-muted/40 p-5">
        <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="text-sm font-semibold">
          Reconciliation — Draw {money0(q.amount)} = Recovery{" "}
          {money0(q.payrollRecovery)} · Variance R0
        </p>
      </div>
      <DoctrineLine className="mt-4" />
    </>
  );

  if (inline) return <div>{body}</div>;

  return (
    <Section id="follow-the-rand">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeading
          eyebrow="Follow the R1"
          title="Every rand, from request to reconciliation"
        />
        <StageBadge stage="prototype" />
      </div>
      {body}
    </Section>
  );
}
