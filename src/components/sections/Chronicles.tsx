import { ArrowUpRight } from "lucide-react";

const CARDS = [
  "Chapter One: The Founder Letter",
  "Behind the Build",
  "Community Stories",
  "Photo Gallery",
  "The Documentary",
];

export function Chronicles() {
  return (
    <section id="chronicles" className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container-tight">
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
          Documentary
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          The Utlwala Chronicles
        </h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/80">
          The story behind the build.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            /* [LINK PENDING — Utlwala Chronicles] */
            <a
              key={c}
              href="#"
              className="flex items-center justify-between gap-4 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 text-left transition-colors hover:bg-primary-foreground/10"
            >
              <span className="font-display text-base font-semibold">{c}</span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-primary-foreground/70">
          The Utlwala Chronicles is a living documentary of how Madi-Tota is being
          built — by the people building it. [CONTENT PENDING — CEO approval]
        </p>
      </div>
    </section>
  );
}
