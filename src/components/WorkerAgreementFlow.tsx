import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ShieldQuestion, FileText, Lock } from "lucide-react";
import { quote, money0, type ProductId } from "@/lib/fees";
import {
  AGREEMENT_CONSENT_STATEMENT,
  AGREEMENT_TERMS,
  AGREEMENT_VERSION,
  LEGAL_REVIEW_LABEL,
  makeReference,
  recordConsent,
  type ConsentRecord,
} from "@/lib/governance";
import { StageBadge } from "./StageBadge";
import { DoctrineLine } from "./DoctrineLine";
import { ConsentReceipt } from "./ConsentReceipt";

/** Mock employer register — simulation only. */
const EMPLOYERS = [
  "Thabo Security Services",
  "Kgosi Retail Group",
  "Marikana Logistics",
];

type Step = "verify" | "agreement" | "done";

/**
 * Item 4 — Worker consent & payroll recovery agreement as a first-class
 * registration flow. Activation is blocked until affirmative consent is given.
 */
export function WorkerAgreementFlow({
  amount = 1000,
  product = "ZAP" as ProductId,
}: {
  amount?: number;
  product?: ProductId;
}) {
  const [step, setStep] = useState<Step>("verify");
  const [workerId, setWorkerId] = useState("MT-W-0042");
  const [employer, setEmployer] = useState(EMPLOYERS[0]);
  const [employerError, setEmployerError] = useState("");
  const [consented, setConsented] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [showAgreement, setShowAgreement] = useState(false);

  const q = useMemo(() => quote(amount, product), [amount, product]);
  const recoveryDate = "Next payday — 25th of this month";

  function verify() {
    if (!workerId.trim()) {
      setEmployerError("Enter a worker identifier to continue.");
      return;
    }
    if (!EMPLOYERS.includes(employer)) {
      setEmployerError(
        "No participating employer relationship found. Activation cannot proceed.",
      );
      return;
    }
    setEmployerError("");
    setStep("agreement");
  }

  function activate() {
    if (!consented) return;
    const rec = recordConsent({
      workerId: workerId.trim(),
      employer,
      agreementVersion: AGREEMENT_VERSION,
      timestamp: new Date().toISOString(),
      consented: true,
      referenceId: makeReference(),
    });
    setRecord(rec);
    setStep("done");
  }

  function reset() {
    setStep("verify");
    setConsented(false);
    setRecord(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">
          Worker agreement &amp; consent
        </h3>
        <StageBadge stage="prototype" />
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Registration cannot be completed until the employer relationship is
        validated and the worker gives affirmative consent to payroll recovery.
      </p>

      {step === "verify" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="wa-worker">Worker identifier (simulated)</Label>
            <Input
              id="wa-worker"
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="wa-employer">Participating employer</Label>
            <select
              id="wa-employer"
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {EMPLOYERS.map((e) => (
                <option key={e}>{e}</option>
              ))}
              <option>Employer not on the register</option>
            </select>
          </div>
          {employerError && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {employerError}
            </p>
          )}
          <Button onClick={verify} className="w-full">
            <ShieldQuestion /> Validate employer relationship
          </Button>
        </div>
      )}

      {step === "agreement" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
            <p className="font-semibold">
              Madi-Tota Worker Agreement — version {AGREEMENT_VERSION}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {workerId} · {employer}
            </p>
            <button
              type="button"
              onClick={() => setShowAgreement((v) => !v)}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline underline-offset-4"
            >
              <FileText className="h-3.5 w-3.5" />
              {showAgreement ? "Hide agreement" : "View agreement"}
            </button>
            {showAgreement && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-foreground">
                {AGREEMENT_TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>

          <dl className="divide-y divide-border rounded-xl border border-border p-4 text-sm">
            {[
              ["Requested amount", money0(q.amount)],
              [`Fee (${q.product} ${q.rate}%)`, money0(q.fee)],
              ["Net disbursement", money0(q.netReceived)],
              ["Payroll recovery", money0(q.payrollRecovery)],
              ["Recovery date", recoveryDate],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {k}
                </dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          <DoctrineLine />

          <label
            htmlFor="wa-consent"
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-3 text-sm"
          >
            <Checkbox
              id="wa-consent"
              checked={consented}
              onCheckedChange={(v) => setConsented(v === true)}
              className="mt-0.5"
            />
            <span>{AGREEMENT_CONSENT_STATEMENT}</span>
          </label>

          <Button onClick={activate} disabled={!consented} className="w-full">
            <Lock /> Activate account
          </Button>
          {!consented && (
            <p className="text-xs text-muted-foreground">
              Activation is blocked until consent is given.
            </p>
          )}
        </div>
      )}

      {step === "done" && record && (
        <div className="space-y-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 className="h-4 w-4" /> Consent recorded and retrievable
          </p>
          <ConsentReceipt record={record} quote={q} />
          <Button variant="soft" onClick={reset} className="w-full">
            Run the flow again
          </Button>
        </div>
      )}

      <p className="mt-4 text-xs font-medium text-muted-foreground">
        {LEGAL_REVIEW_LABEL}
      </p>
    </div>
  );
}
