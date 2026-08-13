import { money0, type FeeQuote } from "@/lib/fees";
import {
  AGREEMENT_VERSION,
  HASH_LABEL,
  prototypeHash,
  type ConsentRecord,
} from "@/lib/governance";
import { StageBadge } from "./StageBadge";
import { DoctrineLine } from "./DoctrineLine";
import { ReceiptText } from "lucide-react";

/** Item 7 — worker-facing consent receipt. */
export function ConsentReceipt({
  record,
  quote,
  showHash = true,
}: {
  record: ConsentRecord;
  quote: FeeQuote;
  showHash?: boolean;
}) {
  const rows: [string, string][] = [
    ["Agreement version", record.agreementVersion || AGREEMENT_VERSION],
    ["Consent timestamp", new Date(record.timestamp).toLocaleString("en-ZA")],
    ["Transaction / reference ID", record.referenceId],
    ["Fee applicable", `${quote.product} ${quote.rate}% — ${money0(quote.fee)}`],
    ["Requested amount", money0(quote.amount)],
    ["Net disbursement", money0(quote.netReceived)],
    ["Payroll recovery", money0(quote.payrollRecovery)],
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
          <ReceiptText className="h-5 w-5 text-primary" aria-hidden="true" />
          Consent receipt
        </h3>
        <StageBadge stage="prototype" />
      </div>
      <dl className="divide-y divide-border text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {k}
            </dt>
            <dd className="text-right font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <DoctrineLine className="mt-4" />
      {showHash && (
        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
          <p className="break-all font-mono text-[11px] leading-relaxed text-muted-foreground">
            {prototypeHash(record)}
          </p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">{HASH_LABEL}</p>
        </div>
      )}
    </div>
  );
}
