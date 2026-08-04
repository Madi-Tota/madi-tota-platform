import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RATES, SIM_SALARY } from "@/lib/brand";
import { quote, money0 } from "@/lib/fees";
import { ProtoBadge } from "./primitives";

export function FeeCalculator() {
  const [salary, setSalary] = useState(SIM_SALARY);
  const cap = Math.round((salary * RATES.capPercent) / 100);
  const [draw, setDraw] = useState(Math.round(cap / 2));
  const clampedDraw = Math.min(draw, cap);

  const chill = quote(clampedDraw, "CHILL");
  const zap = quote(clampedDraw, "ZAP");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold">CHILL / ZAP calculator</h3>
        <ProtoBadge />
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Illustrative only. Figures are examples, not an offer. CHILL is{" "}
        {RATES.chill}% per draw, ZAP is {RATES.zap}% per draw, with a{" "}
        {RATES.capPercent}% monthly salary access cap. You always receive the full
        amount you request; the fee is added to the payday deduction.
      </p>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="salary">Monthly salary</Label>
            <span className="font-display font-bold text-primary">{money0(salary)}</span>
          </div>
          <Input
            id="salary"
            type="number"
            value={salary}
            min={3000}
            step={500}
            onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Monthly access cap ({RATES.capPercent}%):{" "}
            <span className="font-semibold text-foreground">{money0(cap)}</span>
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Draw amount</Label>
            <span className="font-display font-bold text-primary">
              {money0(clampedDraw)}
            </span>
          </div>
          <Slider
            value={[clampedDraw]}
            min={100}
            max={Math.max(cap, 200)}
            step={50}
            onValueChange={(v) => setDraw(v[0])}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Result label="CHILL" q={chill} tone="primary" />
          <Result label="ZAP" q={zap} tone="accent" />
        </div>
      </div>
    </div>
  );
}

function Result({
  label,
  q,
  tone,
}: {
  label: string;
  q: ReturnType<typeof quote>;
  tone: "primary" | "accent";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "primary"
          ? "border-primary/20 bg-primary/5"
          : "border-accent/30 bg-accent/10"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} · {q.rate}% per draw
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Fee: <span className="font-semibold text-foreground">{money0(q.fee)}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        You receive:{" "}
        <span className="font-semibold text-foreground">{money0(q.workerReceives)}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Deducted at payday:{" "}
        <span className="font-display font-bold text-foreground">
          {money0(q.paydayDeduction)}
        </span>
      </p>
    </div>
  );
}
