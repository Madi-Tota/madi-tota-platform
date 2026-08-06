import { ArrowRight } from "lucide-react";

const PARAGRAPHS = [
  "My name is Lebo Koloi. I am the founder of Madi-Tota.",
  "For 22 years, I built and led workforce operations in South Africa's BPO industry. I watched thousands of workers — security officers, call centre agents, retail staff, cleaners — live in the same cycle I grew up in.",
  "Payday comes. By the 5th, the money is gone. By the 15th, they are borrowing. By the 25th, they are desperate. And the cycle starts again.",
  "I watched my mother struggle after payday. I experienced debt myself. I buried my father with borrowed money.",
  "I spent 22 years seeing workers repeat this cycle. And I decided: enough.",
  "Madi-Tota is not a lending app. It is not a credit product. It is payroll-linked wage access — letting workers reach the money they have ALREADY EARNED, before payday, with full transparency and a hard cap.",
  "I built this because no one else was going to build it for us.",
  "Re Tla Fenya Mmogo. We will win together.",
];

export function FounderLetter() {
  return (
    <section id="founder-letter" className="bg-secondary/5 py-16 md:py-24">
      <div className="container-tight max-w-3xl">
        <span className="eyebrow">Our story</span>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          A Letter from the Founder
        </h2>

        <div className="mt-8 space-y-6">
          {PARAGRAPHS.map((p) => (
            <p key={p} className="text-base leading-relaxed text-foreground md:text-lg">
              {p}
            </p>
          ))}
          <p className="text-base font-semibold leading-relaxed text-foreground md:text-lg">
            — Lebo Koloi
            <span className="block font-normal text-muted-foreground">
              Founder &amp; CEO, Madi-Tota
            </span>
            <span className="block font-normal text-muted-foreground">
              Founder, Utlwala Tactical System
            </span>
          </p>
        </div>

        <figure className="mt-10 w-full max-w-[240px]">
          <div className="grid aspect-[4/5] place-items-center rounded-2xl border border-dashed border-border bg-muted p-4 text-center text-xs font-medium text-muted-foreground">
            [FOUNDER PORTRAIT — pending CEO-approved photograph]
          </div>
          <figcaption className="mt-3 text-sm font-medium text-foreground">
            Lebo Koloi — Founder &amp; CEO
          </figcaption>
        </figure>

        <a
          href="#our-journey"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Read the full founder story <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
