import { useTranslation } from "react-i18next";
import { accrual, ACCESS_CAP_PERCENT } from "@/lib/accrual";
import { money0 } from "@/lib/fees";
import { cn } from "@/lib/utils";

interface Props {
  netMonthlyPay: number;
  workingDays: number;
  daysWorked: number;
  priorDraws?: number;
  className?: string;
  tone?: "light" | "dark";
}

/** DEC-008 — visible earnings bar. Consumed by AccessCard, AppPrototype, USSD and chat demos. */
export function EarningsBar({
  netMonthlyPay,
  workingDays,
  daysWorked,
  priorDraws = 0,
  className,
  tone = "light",
}: Props) {
  const { t } = useTranslation();
  const r = accrual({ netMonthlyPay, workingDays, daysWorked, priorDraws });
  const capPct = Math.min(100, (r.cap / Math.max(1, netMonthlyPay)) * 100);
  const earnedPct = Math.min(100, r.progress * 100);
  const dark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className={cn("text-xs font-semibold uppercase tracking-wide", dark ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {t("earnings.title")}
        </p>
        <p className={cn("text-xs", dark ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {t("earnings.daysWorked", { worked: daysWorked, total: workingDays })}
        </p>
      </div>

      <div
        className={cn("relative mt-2 h-3 w-full overflow-hidden rounded-full", dark ? "bg-white/15" : "bg-muted")}
        role="progressbar"
        aria-label={t("earnings.title")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(earnedPct)}
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${earnedPct}%` }} />
        <span
          className={cn("absolute inset-y-0 w-0.5", dark ? "bg-secondary" : "bg-secondary")}
          style={{ left: `${capPct}%` }}
          aria-hidden="true"
        />
      </div>

      <dl className={cn("mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs", dark ? "text-primary-foreground/80" : "text-muted-foreground")}>
        <Item k={t("earnings.earned")} v={money0(r.earned)} dark={dark} />
        <Item k={t("earnings.cap", { percent: ACCESS_CAP_PERCENT })} v={money0(r.cap)} dark={dark} />
        <Item k={t("earnings.priorDraws")} v={money0(r.priorDraws)} dark={dark} />
        <Item k={t("earnings.available")} v={money0(r.available)} dark={dark} strong />
      </dl>
    </div>
  );
}

function Item({ k, v, dark, strong }: { k: string; v: string; dark: boolean; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt>{k}</dt>
      <dd
        className={cn(
          "font-semibold",
          strong && "font-display",
          strong ? (dark ? "text-secondary" : "text-primary") : dark ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {v}
      </dd>
    </div>
  );
}
