import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete, Phone, PhoneOff } from "lucide-react";
import {
  RATES,
  SIM_SALARY,
  SIM_WORKING_DAYS,
  SIM_DAYS_WORKED,
  SIM_PRIOR_DRAWS,
  COMPLIANCE,
} from "@/lib/brand";
import { quote, money, remainingCapacity } from "@/lib/fees";
import { accrual } from "@/lib/accrual";
import { accessWindow } from "@/lib/accessWindow";
import { SimBadge } from "./SimBadge";
import { EarningsBar } from "./EarningsBar";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

type Stage = "dial" | "menu" | "balance" | "amount" | "confirm" | "done" | "terms";

export function UssdSimulator() {
  const [entry, setEntry] = useState("");
  const [stage, setStage] = useState<Stage>("dial");
  const [product, setProduct] = useState<"CHILL" | "ZAP">("CHILL");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const acc = accrual({
    netMonthlyPay: SIM_SALARY,
    workingDays: SIM_WORKING_DAYS,
    daysWorked: SIM_DAYS_WORKED,
    priorDraws: SIM_PRIOR_DRAWS,
  });
  const cap = Math.round(acc.available);
  const win = accessWindow("monthly", SIM_DAYS_WORKED);
  const q = quote(amount, product);
  const remaining = remainingCapacity(cap, 0, amount);
  const rate = q.rate;
  const fee = q.fee;

  function reset() {
    setEntry("");
    setStage("dial");
    setAmount(0);
    setError("");
    setReference("");
  }

  function press(k: string) {
    setError("");
    setEntry((e) => (e.length >= 12 ? e : e + k));
  }

  function backspace() {
    setError("");
    setEntry((e) => e.slice(0, -1));
  }

  function send() {
    const value = entry.trim();
    setEntry("");
    if (stage === "dial") {
      if (!/^\*120\*\d*#?$/.test(value)) {
        setError("Invalid string. Dial *120* then digits then #");
        return;
      }
      setStage("menu");
      return;
    }
    if (stage === "menu") {
      if (value === "1") return setStage("balance");
      if (value === "2") {
        setProduct("CHILL");
        return setStage("amount");
      }
      if (value === "3") {
        setProduct("ZAP");
        return setStage("amount");
      }
      if (value === "4") return setStage("terms");
      setError("Invalid choice. Enter 1, 2, 3 or 4.");
      return;
    }
    if (stage === "balance" || stage === "terms") {
      setStage("menu");
      return;
    }
    if (stage === "amount") {
      const n = Number(value);
      if (!value || Number.isNaN(n) || n <= 0) {
        setError("Enter a valid amount in rand.");
        return;
      }
      if (n > cap) {
        setError(
          `Amount exceeds what you have earned so far (${money(cap)}). Enter a lower amount.`,
        );
        return;
      }
      setAmount(n);
      setStage("confirm");
      return;
    }
    if (stage === "confirm") {
      if (value === "1") {
        setReference(
          "MT-" +
            Math.round(amount * 7919 + fee * 31)
              .toString(36)
              .toUpperCase()
              .padStart(6, "0")
              .slice(0, 6),
        );
        setStage("done");
      } else if (value === "2") {
        setStage("menu");
      } else {
        setError("Enter 1 to confirm or 2 to cancel.");
      }
      return;
    }
    if (stage === "done") reset();
  }

  const screen = (() => {
    switch (stage) {
      case "dial":
        return `Madi-Tota USSD
Dial *120*XXX#
(shortcode to be assigned)

Simulated salary: ${money(SIM_SALARY)}/month`;
      case "menu":
        return `Madi-Tota
1. Balance
2. CHILL draw (${RATES.chill}%)
3. ZAP draw (${RATES.zap}%)
4. Terms

Reply with a number.`;
      case "balance":
        return `Balance
Simulated salary: ${money(SIM_SALARY)}
Earned so far: ${money(acc.earned)}
Access cap (${RATES.capPercent}%): ${money(acc.cap)}
Available now: ${money(cap)}
${win.label}
Recovery: one month-end payroll deduction

0. Back`;
      case "terms":
        return `Terms
CHILL ${RATES.chill}% per draw
ZAP ${RATES.zap}% per draw
Cap ${RATES.capPercent}% of monthly salary
Employer core access: ${RATES.employerCore}
Fee always shown before you confirm.

0. Back`;
      case "amount":
        return `${product} draw
Enter amount in rand.
Max ${money(cap)} (earned to date, ${RATES.capPercent}% cap).`;
      case "confirm":
        return `Confirm ${product} draw
Amount requested: ${money(amount)}
${product} fee (${rate}%): ${money(fee)}
You receive: ${money(q.netReceived)}
Payroll recovery: ${money(q.payrollRecovery)}
Remaining capacity: ${money(remaining)}

Confirm? 1. Accept 2. Cancel`;
      case "done":
        return `Confirmed (simulated)
Ref: ${reference}
${product} ${money(amount)} · fee ${money(fee)}
Paid out: ${money(q.netReceived)}
Payroll recovery: ${money(q.payrollRecovery)}

Any key to restart.`;
    }
  })();

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">USSD simulator</h3>
        <SimBadge />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {COMPLIANCE.simNote} Simulated monthly salary {money(SIM_SALARY)} — every
        figure recomputes from what you key in.
      </p>

      <EarningsBar
        className="mb-5"
        netMonthlyPay={SIM_SALARY}
        workingDays={SIM_WORKING_DAYS}
        daysWorked={SIM_DAYS_WORKED}
        priorDraws={SIM_PRIOR_DRAWS}
      />

      <div className="mx-auto max-w-xs rounded-3xl border-4 border-primary/20 bg-primary p-4 shadow-lg">
        <pre
          aria-live="polite"
          aria-label="USSD screen"
          className="min-h-[190px] whitespace-pre-wrap rounded-xl bg-success/15 p-3 font-mono text-xs leading-relaxed text-primary-foreground"
        >
          {screen}
        </pre>
        <div className="mt-3 rounded-lg bg-background/95 px-3 py-2 font-mono text-sm text-foreground">
          {entry || <span className="text-muted-foreground">…</span>}
        </div>
        {error && (
          <p role="alert" className="mt-2 text-xs font-medium text-secondary">
            {error}
          </p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => press(k)}
              aria-label={`Key ${k}`}
              className="min-h-11 rounded-xl bg-background/90 py-3 font-mono text-base font-bold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              {k}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={backspace}
            aria-label="Delete last digit"
            className="grid min-h-11 place-items-center rounded-xl bg-background/60 text-foreground hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Delete className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={send}
            aria-label="Send USSD entry"
            className="grid min-h-11 place-items-center rounded-xl bg-success text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="End session and restart"
            className="grid min-h-11 place-items-center rounded-xl bg-destructive text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button variant="soft" size="sm" onClick={reset}>
          Restart session
        </Button>
      </div>
    </div>
  );
}
