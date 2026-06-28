import { ShieldCheck, Wallet } from "lucide-react";
import { RATES } from "@/lib/brand";

export function AccessCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-gradient-card p-6 text-primary-foreground shadow-lg ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-secondary">
          <Wallet className="h-4 w-4" /> Available this month
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          Demo
        </span>
      </div>
      <p className="mt-2 font-display text-5xl font-extrabold">R2,400</p>

      <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        <Stat label="CHILL" value={`${RATES.chill}%`} />
        <Stat label="ZAP" value={`${RATES.zap}%`} />
        <Stat label="Monthly cap" value={`${RATES.capPercent}%`} />
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 text-sm">
        <ShieldCheck className="h-4 w-4 text-secondary" />
        Always see your fee before confirming.
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 py-3">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-primary-foreground/70">
        {label}
      </p>
    </div>
  );
}
