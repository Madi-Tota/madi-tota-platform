import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RATES, SIM_SALARY, COMPLIANCE } from "@/lib/brand";
import { SimBadge } from "./SimBadge";
import { Note } from "./primitives";

const money = (n: number) =>
  "R" +
  n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Worker-side transparency widget: shows the real cost of a draw before confirming. */
export function WorkerTransparencyWidget() {
  const [salary, setSalary] = useState(SIM_SALARY);
  const [product, setProduct] = useState<"CHILL" | "ZAP">("CHILL");
  const cap = Math.round((salary * RATES.capPercent) / 100);
  const [amount, setAmount] = useState(Math.round(cap / 2));

  const safeAmount = Math.min(amount, cap);
  const rate = product === "CHILL" ? RATES.chill : RATES.zap;
  const fee = (safeAmount * rate) / 100;
  const net = safeAmount - fee;
  const deduction = safeAmount + fee;
  const takeHome = salary - deduction;
  const shareOfSalary = salary ? (deduction / salary) * 100 : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">
          Worker transparency widget
        </h3>
        <SimBadge />
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        See the full cost of a draw before confirming — fee, payout and the
        payday deduction. {COMPLIANCE.simNote}
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
              Monthly salary
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
            aria-label="Monthly salary"
            onValueChange={([v]) => {
              setSalary(v);
              const newCap = Math.round((v * RATES.capPercent) / 100);
              setAmount((a) => Math.min(a, newCap));
            }}
          />
        </div>
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
            max={Math.max(cap, 100)}
            step={50}
            aria-label="Amount to access"
            onValueChange={([v]) => setAmount(v)}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Capped at {RATES.capPercent}% of salary — R{cap.toLocaleString("en-ZA")}.
          </p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-border rounded-xl border border-border">
        {(
          [
            [`Fee (${rate}%)`, money(fee)],
            ["You receive today", money(net)],
            ["Deducted at payday", money(deduction)],
            ["Take-home after deduction", money(takeHome)],
            ["Deduction as share of salary", `${shareOfSalary.toFixed(1)}%`],
          ] as Array<[string, string]>
        ).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <Note>
          Illustrative figures only, not an offer of credit or a quotation.
          Recovery is a single payroll deduction — no rollover, no compounding.
        </Note>
      </div>
    </div>
  );
}
