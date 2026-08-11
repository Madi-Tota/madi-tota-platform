import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw } from "lucide-react";
import {
  RATES,
  SIM_SALARY,
  SIM_WORKING_DAYS,
  SIM_DAYS_WORKED,
  SIM_PRIOR_DRAWS,
  COMPLIANCE,
} from "@/lib/brand";
import { quote, money, remainingCapacity, CONSENT_STATEMENT, type ProductId } from "@/lib/fees";
import { accrual } from "@/lib/accrual";
import { accessWindow } from "@/lib/accessWindow";
import { SimBadge } from "./SimBadge";
import { EarningsBar } from "./EarningsBar";

interface Msg {
  from: "bot" | "user";
  text: string;
}

type Step = "menu" | "amount" | "confirm" | "done";

const ACC = accrual({
  netMonthlyPay: SIM_SALARY,
  workingDays: SIM_WORKING_DAYS,
  daysWorked: SIM_DAYS_WORKED,
  priorDraws: SIM_PRIOR_DRAWS,
});
const cap = Math.round(ACC.available);
const WINDOW = accessWindow("monthly", SIM_DAYS_WORKED);

const WELCOME: Msg = {
  from: "bot",
  text: `Hi 👋 This is the Madi-Tota assistant (simulation).\nReply:\n1 — Check available access\n2 — CHILL draw (${RATES.chill}%)\n3 — ZAP draw (${RATES.zap}%)\n4 — How recovery works`,
};

export function WhatsAppDemo() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [step, setStep] = useState<Step>("menu");
  const [product, setProduct] = useState<ProductId>("CHILL");
  const [amount, setAmount] = useState(0);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  function say(text: string) {
    setMessages((m) => [...m, { from: "bot", text }]);
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ block: "nearest" }),
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (!value) return;
    setMessages((m) => [...m, { from: "user", text: value }]);
    setDraft("");

    if (step === "menu") {
      if (value === "1") {
        say(
          `Simulated net pay ${money(SIM_SALARY)}.\nEarned so far: ${money(ACC.earned)}.\nYour ${RATES.capPercent}% cap is ${money(ACC.cap)}.\nAvailable now: ${money(cap)}.\n${WINDOW.label}.\n\nReply 2 for CHILL or 3 for ZAP.`,
        );
        return;
      }
      if (value === "2" || value === "3") {
        setProduct(value === "2" ? "CHILL" : "ZAP");
        setStep("amount");
        say(
          `${value === "2" ? "CHILL" : "ZAP"} selected. How much do you want to access? Enter an amount up to ${money(cap)}.`,
        );
        return;
      }
      if (value === "4") {
        say(
          "What you draw plus the fee is recovered in one payroll deduction at month-end, with your consent and your employer's authorisation. Nothing rolls over into new debt.",
        );
        return;
      }
      say("Sorry, I did not understand. Reply 1, 2, 3 or 4.");
      return;
    }

    if (step === "amount") {
      const n = Number(value.replace(/[Rr,\s]/g, ""));
      if (Number.isNaN(n) || n <= 0) {
        say("Please send a number, for example 1500.");
        return;
      }
      if (n > cap) {
        say(
          `That is above what you have earned so far (${money(cap)}). Please send a lower amount.`,
        );
        return;
      }
      setAmount(n);
      setStep("confirm");
      const q = quote(n, product);
      say(
        `${product} draw\nAmount requested: ${money(q.amount)}\n${product} fee (${q.rate}%): ${money(q.fee)}\nYou receive: ${money(q.netReceived)}\nPayroll recovery: ${money(q.payrollRecovery)}\nRemaining capacity: ${money(remainingCapacity(cap, 0, n))}\n\n${CONSENT_STATEMENT}\n\nReply YES to confirm or NO to cancel.`,
      );
      return;
    }

    if (step === "confirm") {
      if (/^y(es)?$/i.test(value)) {
        const q = quote(amount, product);
        setStep("done");
        say(
          `Confirmed (simulation only). ${money(q.netReceived)} would be paid out and ${money(q.payrollRecovery)} recovered from payroll. Reply RESTART to start again.`,
        );
        return;
      }
      if (/^n(o)?$/i.test(value)) {
        setStep("menu");
        say("Cancelled. Reply 1, 2, 3 or 4 to continue.");
        return;
      }
      say("Please reply YES or NO.");
      return;
    }

    reset();
  }

  function reset() {
    setMessages([WELCOME]);
    setStep("menu");
    setAmount(0);
    setDraft("");
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-xl font-bold">
          WhatsApp-style assistant demo
        </h3>
        <SimBadge />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {COMPLIANCE.simNote} Not affiliated with or endorsed by any messaging
        provider — this is a self-contained interface concept.
      </p>

      <EarningsBar
        className="mb-5"
        netMonthlyPay={SIM_SALARY}
        workingDays={SIM_WORKING_DAYS}
        daysWorked={SIM_DAYS_WORKED}
        priorDraws={SIM_PRIOR_DRAWS}
      />

      <div className="rounded-2xl border border-border bg-muted/40 p-3">
        <div
          className="max-h-80 space-y-2 overflow-y-auto p-1"
          aria-live="polite"
          aria-label="Assistant conversation"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.from === "bot"
                  ? "max-w-[85%] whitespace-pre-line rounded-2xl rounded-tl-sm bg-card px-3 py-2 text-sm shadow-sm"
                  : "ml-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground shadow-sm"
              }
            >
              {m.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSend} className="mt-3 flex gap-2">
          <label htmlFor="wa-input" className="sr-only">
            Message the Madi-Tota assistant
          </label>
          <Input
            id="wa-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type 1, 2, 3, 4 or an amount…"
            maxLength={40}
            autoComplete="off"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={reset}
            aria-label="Restart conversation"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
