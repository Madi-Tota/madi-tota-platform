import { useState } from "react";
import { Trophy, GraduationCap, Gift, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { RATES } from "@/lib/brand";

interface Q {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

const QUESTIONS: Q[] = [
  {
    q: "What is the CHILL fee per draw?",
    options: ["2.5%", `${RATES.chill}%`, "8.0%", `${RATES.zap}%`],
    answer: 1,
    explain: `CHILL is ${RATES.chill}% per draw — the lower-fee option.`,
  },
  {
    q: "What is the ZAP fee per draw?",
    options: [`${RATES.zap}%`, "6.0%", "15%", `${RATES.chill}%`],
    answer: 0,
    explain: `ZAP is ${RATES.zap}% per draw — the faster option.`,
  },
  {
    q: "What is the monthly salary access cap?",
    options: ["10%", "50%", `${RATES.capPercent}%`, "100%"],
    answer: 2,
    explain: `Access is capped at ${RATES.capPercent}% of monthly salary.`,
  },
  {
    q: "When do you see your fee?",
    options: [
      "After payday",
      "Before you confirm a draw",
      "Only on request",
      "You never see it",
    ],
    answer: 1,
    explain: "You always see the exact fee before you confirm.",
  },
  {
    q: "A good habit before taking a draw is to…",
    options: [
      "Ignore your budget",
      "List your needs and check the fee fits",
      "Always pick the highest amount",
      "Take a draw every day",
    ],
    answer: 1,
    explain: "Plan your needs first and check the fee fits your month.",
  },
];

export default function MoneyWise() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setPicked(null);
    }
  }
  function restart() {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }

  return (
    <>
      <PageHero
        eyebrow="MoneyWise Challenge"
        title="The Madi-Tota™ MoneyWise Challenge"
        subtitle="An original, education-first quiz that helps people learn how wage access works. No paid entry, no purchase required."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon={GraduationCap} title="Education first">
            Designed purely to build financial understanding — not a gameshow.
          </FeatureCard>
          <FeatureCard icon={Gift} title="No purchase required">
            Free to take part. Any prizes or rewards would be funded from
            marketing budget, never from pilot float.
          </FeatureCard>
          <FeatureCard icon={Trophy} title="Rules under review">
            Prize and reward rules are subject to legal review before any launch.
          </FeatureCard>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {!done ? (
            <div className="rounded-2xl border border-border bg-card p-7 shadow-md">
              <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Question {idx + 1} of {QUESTIONS.length}
                </span>
                <span className="font-semibold text-primary">Score: {score}</span>
              </div>
              <div className="mb-5 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-gradient-warm transition-all"
                  style={{ width: `${((idx + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <h3 className="font-display text-xl font-bold">{q.q}</h3>
              <div className="mt-5 space-y-3">
                {q.options.map((o, i) => {
                  const isAnswer = i === q.answer;
                  const isPicked = i === picked;
                  const reveal = picked !== null;
                  return (
                    <button
                      key={o}
                      onClick={() => pick(i)}
                      disabled={reveal}
                      className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                        reveal && isAnswer
                          ? "border-success bg-success/10 text-success"
                          : reveal && isPicked
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : "border-border hover:border-primary hover:bg-primary/5"
                      }`}
                    >
                      {o}
                      {reveal && isAnswer && <CheckCircle2 className="h-5 w-5" />}
                      {reveal && isPicked && !isAnswer && <XCircle className="h-5 w-5" />}
                    </button>
                  );
                })}
              </div>
              {picked !== null && (
                <div className="mt-5">
                  <Note>{q.explain}</Note>
                  <Button onClick={next} variant="hero" size="lg" className="mt-4 w-full">
                    {idx + 1 >= QUESTIONS.length ? "See result" : "Next question"}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
              <Trophy className="mx-auto h-14 w-14 text-secondary" />
              <h3 className="mt-4 font-display text-2xl font-bold">
                You scored {score} / {QUESTIONS.length}
              </h3>
              <p className="mt-2 text-muted-foreground">
                Great learning! Remember, this challenge is educational only.
              </p>
              <Button onClick={restart} variant="outline" size="lg" className="mt-5">
                <RotateCcw /> Play again
              </Button>
            </div>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <Note variant="warning">
            This is an original educational campaign. It does not reference or
            imitate any existing TV gameshow. No paid entry or purchase is
            required, and reward rules are subject to legal review.
          </Note>
        </div>
      </Section>
    </>
  );
}
