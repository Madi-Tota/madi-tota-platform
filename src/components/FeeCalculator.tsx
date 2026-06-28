import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RATES } from "@/lib/brand";
import { ProtoBadge } from "./primitives";

const fmt = (n: number) =>
  "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 });

export function FeeCalculator() {
  const [salary, setSalary] = useState(12000);
  const cap = Math.round((salary * RATES.capPercent) / 100);
  const [draw, setDraw] = useState(1500);
  const clampedDraw = Math.min(draw, cap);

  const chillFee = (clampedDraw * RATES.chill) / 100;
  const zapFee = (clampedDraw * RATES.zap) / 100;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold">CHILL / ZAP calculator</h3>
        <ProtoBadge />
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Illustrative only. Figures are examples, not an offer. CHILL is{" "}
        {RATES.chill}% per draw, ZAP is {RATES.zap}% per draw, with a{" "}
        {RATES.capPercent}% monthly salary access cap.
      </p>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="salary">Monthly salary</Label>
            <span className="font-display font-bold text-primary">{fmt(salary)}</span>
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
            <span className="font-semibold text-foreground">{fmt(cap)}</span>
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Draw amount</Label>
            <span className="font-display font-bold text-primary">
              {fmt(clampedDraw)}
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
          <Result
            label="CHILL"
            rate={RATES.chill}
            fee={chillFee}
            total={clampedDraw + chillFee}
            tone="primary"
          />
          <Result
            label="ZAP"
            rate={RATES.zap}
            fee={zapFee}
            total={clampedDraw + zapFee}
            tone="accent"
          />
        </div>
      </div>
    </div>
  );
}

function Result({
  label,
  rate,
  fee,
  total,
  tone,
}: {
  label: string;
  rate: number;
  fee: number;
  total: number;
  tone: "primary" | "accent";
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        tone === "primary"
          ? "border-primary/20 bg-primary/5"
          : "border-accent/20 bg-accent/5"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label} · {rate}% per draw
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Fee: <span className="font-semibold text-foreground">{fmt(fee)}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Recovered at payday:{" "}
        <span className="font-display font-bold text-foreground">{fmt(total)}</span>
      </p>
    </div>
  );
}
