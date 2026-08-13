import { Checkbox } from "@/components/ui/checkbox";
import { CONSENT_STATEMENT, confirmationLine, money0, type FeeQuote } from "@/lib/fees";
import { DoctrineLine } from "./DoctrineLine";

/**
 * AMENDMENT A1 — governed confirmation screen.
 * Identical four figures on every channel, plus an unticked-by-default consent
 * checkbox. No tick = no transaction.
 */
export function DrawConfirmation({
  q,
  consented,
  onConsentChange,
  remaining,
  id = "draw-consent",
}: {
  q: FeeQuote;
  consented: boolean;
  onConsentChange: (v: boolean) => void;
  remaining?: number;
  id?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="sr-only">{confirmationLine(q)}</p>
      <dl className="divide-y divide-border text-sm">
        <Line k="YOU ARE ACCESSING" v={money0(q.amount)} />
        <Line k={`YOUR FEE — ${q.product} ${q.rate}%`} v={money0(q.fee)} />
        <Line k="YOU RECEIVE" v={money0(q.netReceived)} strong />
        <Line k="PAYROLL RECOVERY" v={money0(q.payrollRecovery)} strong />
      </dl>
      {remaining !== undefined && (
        <p className="mt-3 text-xs text-muted-foreground">
          Remaining monthly capacity after this request:{" "}
          <span className="font-semibold text-foreground">{money0(remaining)}</span>
        </p>
      )}
      <DoctrineLine className="mt-3" />
      <label
        htmlFor={id}
        className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm"
      >
        <Checkbox
          id={id}
          checked={consented}
          onCheckedChange={(v) => onConsentChange(v === true)}
          className="mt-0.5"
        />
        <span>{CONSENT_STATEMENT}</span>
      </label>
    </div>
  );
}

function Line({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {k}
      </dt>
      <dd className={strong ? "font-display text-base font-bold" : "font-semibold"}>
        {v}
      </dd>
    </div>
  );
}
