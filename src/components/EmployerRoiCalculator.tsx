import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RATES, SIM_SALARY, COMPLIANCE } from "@/lib/brand";
import { SimBadge } from "./SimBadge";
import { Note } from "./primitives";

const money = (n: number) =>
  "R" + Math.round(n).toLocaleString("en-ZA");

/** Employer-side ROI / cost-of-turnover simulator. Illustrative only. */
export function EmployerRoiCalculator() {
  const [headcount, setHeadcount] = useState(250);
  const [salary, setSalary] = useState(SIM_SALARY);
  const [turnover, setTurnover] = useState(18); // % annual
  const [adoption, setAdoption] = useState(40); // % of workers using
  const [reduction, setReduction] = useState(10); // % assumed turnover reduction

  const replacementCost = salary * 1.5; // assumption: 1.5x monthly salary to replace
  const leavers = (headcount * turnover) / 100;
  const currentCost = leavers * replacementCost;
  const avoided = (leavers * (adoption / 100) * (reduction / 100)) * replacementCost;
  const payrollAdminHours = Math.round((headcount * adoption) / 100 / 25);

  const rows: Array<[string, string]> = [
    ["Estimated annual leavers", `${leavers.toFixed(0)} people`],
    ["Assumed replacement cost each", money(replacementCost)],
    ["Current annual replacement cost", money(currentCost)],
    ["Modelled cost avoided per year", money(avoided)],
    ["Employer core access cost", RATES.employerCore],
    ["Extra payroll admin (modelled)", `~${payrollAdminHours} hrs/month`],
  ];

  const sliders: Array<{
    id: string;
    label: string;
    value: number;
    set: (v: number) => void;
    min: number;
    max: number;
    step: number;
    fmt: (v: number) => string;
  }> = [
    { id: "headcount", label: "Headcount", value: headcount, set: setHeadcount, min: 10, max: 5000, step: 10, fmt: (v) => `${v}` },
    { id: "salary", label: "Average monthly salary", value: salary, set: setSalary, min: 4000, max: 45000, step: 500, fmt: money },
    { id: "turnover", label: "Annual staff turnover", value: turnover, set: setTurnover, min: 2, max: 45, step: 1, fmt: (v) => `${v}%` },
    { id: "adoption", label: "Assumed adoption", value: adoption, set: setAdoption, min: 5, max: 100, step: 5, fmt: (v) => `${v}%` },
    { id: "reduction", label: "Assumed turnover reduction", value: reduction, set: setReduction, min: 0, max: 30, step: 1, fmt: (v) => `${v}%` },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">
          Employer ROI & cost-of-turnover simulator
        </h3>
        <SimBadge />
      </div>

      <div className="space-y-5">
        {sliders.map((s) => (
          <div key={s.id}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <label htmlFor={s.id} className="font-medium">
                {s.label}
              </label>
              <span className="font-semibold text-primary">{s.fmt(s.value)}</span>
            </div>
            <Slider
              id={s.id}
              value={[s.value]}
              min={s.min}
              max={s.max}
              step={s.step}
              onValueChange={([v]) => s.set(v)}
              aria-label={s.label}
            />
          </div>
        ))}
      </div>

      <dl className="mt-6 divide-y divide-border rounded-xl border border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <Note variant="warning">
          Modelled outcome, not a promise of savings. Assumes replacement cost of
          1.5× monthly salary and a user-set turnover reduction. {COMPLIANCE.simNote}
        </Note>
      </div>
    </div>
  );
}
