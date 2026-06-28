import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RATES } from "@/lib/brand";

interface Msg {
  role: "bot" | "user";
  text: string;
}

const GUIDED = [
  "What is CHILL?",
  "What is ZAP?",
  "How does the 20% cap work?",
  "How do I budget before a draw?",
  "Where do I see my fee?",
];

const ANSWERS: Record<string, string> = {
  "What is CHILL?": `CHILL is a lower-fee access option at ${RATES.chill}% per draw. It is designed for planned, lower-cost access. Remember: I explain, I do not give financial advice.`,
  "What is ZAP?": `ZAP is a faster access option at ${RATES.zap}% per draw. Because the fee is higher, it is worth comparing with CHILL first. I explain, I do not give financial advice.`,
  "How does the 20% cap work?": `You can access up to ${RATES.capPercent}% of your monthly salary in a month. This is a guardrail to support responsible access. I explain, I do not give financial advice.`,
  "How do I budget before a draw?": `A simple habit: list your needs first, then see how a draw plus its fee fits your month. The calculator shows the fee before you confirm. I explain, I do not give financial advice.`,
  "Where do I see my fee?": `Your exact fee always shows on the confirmation screen before you confirm anything — no surprises. I explain, I do not give financial advice.`,
};

export function AskTota() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi, I am Tota — your financial learning helper. I explain, I do not give financial advice. Pick a prompt below to begin.",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function ask(q: string) {
    const answer =
      ANSWERS[q] ??
      "Thanks for asking. In this demo I can explain CHILL, ZAP, the 20% cap, fee disclosure and budgeting basics. I explain, I do not give financial advice.";
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "bot", text: answer }]);
    setInput("");
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md">
      <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display font-semibold">Ask Tota</p>
          <p className="text-xs text-primary-foreground/70">
            I explain, I do not give financial advice
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                m.role === "bot"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/20 text-secondary-foreground"
              }`}
            >
              {m.role === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "bot"
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="mb-2 flex flex-wrap gap-2">
          {GUIDED.map((g) => (
            <button
              key={g}
              onClick={() => ask(g)}
              className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10"
            >
              {g}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input.trim());
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about CHILL, ZAP, the cap…"
          />
          <Button type="submit" size="icon" variant="hero" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
