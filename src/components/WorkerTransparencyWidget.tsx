import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  RATES,
  SIM_SALARY,
  SIM_WORKING_DAYS,
  SIM_DAYS_WORKED,
  SIM_PRIOR_DRAWS,
  COMPLIANCE,
} from "@/lib/brand";
import { quote, money, remainingCapacity, type ProductId } from "@/lib/fees";
import { accrual } from "@/lib/accrual";
import { accessWindow } from "@/lib/accessWindow";
import { SimBadge } from "./SimBadge";
import { EarningsBar } from "./EarningsBar";
import { Note } from "./primitives";
import { DrawConfirmation } from "./DrawConfirmation";

/** Worker-side transparency widget: shows the real cost of a draw before confirming. */
export function WorkerTransparencyWidget() {
  const [salary, setSalary] = useState(SIM_SALARY);
  const [product, setProduct] = useState<ProductId>("CHILL");
  const acc = accrual({
    netMonthlyPay: salary,
    workingDays: SIM_WORKING_DAYS,
    daysWorked: SIM_DAYS_WORKED,
    priorDraws: SIM_PRIOR_DRAWS,
  });
  const available = Math.round(acc.available);
  const [amount, setAmount] = useState(Math.round(available / 2));
  const [consented, setConsented] = useState(false);

  const safeAmount = Math.min(amount, Math.max(100, available));
  const q = quote(safeAmount, product);
  const takeHome = salary - q.payrollRecovery;
  const shareOfSalary = salary ? (q.payrollRecovery / salary) * 100 : 0;
  const win = accessWindow("monthly", SIM_DAYS_WORKED);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">
          Worker transparency widget
        </h3>
        <SimBadge />
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        See the full cost of a draw before confirming — the fee, what you receive
        and the amount recovered from payroll. {COMPLIANCE.simNote}
      </p>

      <div className="flex gap-2">
        {(["CHILL", "ZAP"] as const).map((p) => (
          <Button
            key={p}
            type="button"
            variant={product === p ? "default" : "outline"}
            size="sm"
            aria-pressed={product === p}
            onClick={() => setProduct(p)}
          >
            {p} · {p === "CHILL" ? RATES.chill : RATES.zap}%
          </Button>
        ))}
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="wt-salary" className="font-medium">
              Monthly net pay
            </label>
            <span className="font-semibold text-primary">
              R{salary.toLocaleString("en-ZA")}
            </span>
          </div>
          <Slider
            id="wt-salary"
            value={[salary]}
            min={4000}
            max={45000}
            step={500}
            aria-label="Monthly net pay"
            onValueChange={([v]) => {
              setSalary(v);
              const next = accrual({
                netMonthlyPay: v,
                workingDays: SIM_WORKING_DAYS,
                daysWorked: SIM_DAYS_WORKED,
                priorDraws: SIM_PRIOR_DRAWS,
              });
              setAmount((a) => Math.min(a, Math.round(next.available)));
            }}
          />
        </div>

        <EarningsBar
          netMonthlyPay={salary}
          workingDays={SIM_WORKING_DAYS}
          daysWorked={SIM_DAYS_WORKED}
          priorDraws={SIM_PRIOR_DRAWS}
        />

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="wt-amount" className="font-medium">
              Amount to access
            </label>
            <span className="font-semibold text-primary">
              R{safeAmount.toLocaleString("en-ZA")}
            </span>
          </div>
          <Slider
            id="wt-amount"
            value={[safeAmount]}
            min={100}
            max={Math.max(available, 100)}
            step={50}
            aria-label="Amount to access"
            onValueChange={([v]) => setAmount(v)}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Limited to what you have already earned, capped at {RATES.capPercent}%
            of net pay. {win.label}.
          </p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-border rounded-xl border border-border">
        {(
          [
            [`Fee (${q.rate}%)`, money(q.fee)],
            ["You receive today", money(q.netReceived)],
            ["Payroll recovery", money(q.payrollRecovery)],
            ["Take-home after recovery", money(takeHome)],
            ["Recovery as share of pay", `${shareOfSalary.toFixed(1)}%`],
            ["Remaining monthly capacity", money(remainingCapacity(acc.cap, acc.priorDraws, safeAmount))],
          ] as Array<[string, string]>
        ).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <DrawConfirmation
          q={q}
          consented={consented}
          onConsentChange={setConsented}
          remaining={remainingCapacity(acc.cap, acc.priorDraws, safeAmount)}
          id="wt-consent"
        />
        <Button
          type="button"
          variant="hero"
          size="lg"
          className="mt-3 w-full"
          disabled={!consented}
        >
          Confirm request (simulation)
        </Button>
      </div>

      <div className="mt-5">
        <Note>
          Illustrative figures only, not an offer and not a quotation. Recovery is
          a single payroll deduction — no rollover, no compounding.
        </Note>
      </div>
    </div>
  );
}
