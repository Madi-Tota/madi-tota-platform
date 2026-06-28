import { Play, Film } from "lucide-react";
import { PageHero, Section, SectionHeading, Note } from "@/components/primitives";
import { AskTota } from "@/components/AskTota";

const CARDS = [
  { title: "What is CHILL?", len: "1:45", desc: "The lower-fee access option at 5.8% per draw." },
  { title: "What is ZAP?", len: "1:30", desc: "The faster access option at 11.1% per draw." },
  { title: "The 20% monthly cap", len: "2:05", desc: "Why access is capped and how it protects you." },
  { title: "Fee disclosure", len: "1:20", desc: "Where and when you see your fee." },
  { title: "Budgeting basics", len: "3:10", desc: "Simple habits before you take a draw." },
  { title: "Responsible access", len: "2:40", desc: "Using wage access wisely over the month." },
];

function VideoCard({
  title,
  len,
  desc,
  large,
}: {
  title: string;
  len: string;
  desc: string;
  large?: boolean;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div
        className={`relative grid place-items-center bg-gradient-card ${
          large ? "aspect-[21/9]" : "aspect-video"
        }`}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-glow transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 translate-x-0.5" />
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-0.5 text-xs font-medium text-white">
          {len}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

export default function Learn() {
  return (
    <>
      <PageHero
        eyebrow="Learn / Education hub"
        title="Understand before you choose"
        subtitle="Short, plain-language lessons about wage access — plus Ask Tota, a learning helper that explains but does not give financial advice."
      />

      <Section>
        <SectionHeading
          eyebrow="Featured"
          title="Corporate overview video"
          subtitle="Planned language mix: 70% English, 20% Setswana, 10% isiZulu."
        />
        <div className="mt-8">
          <VideoCard
            large
            title="Madi-Tota™ corporate overview"
            len="4:30"
            desc="A complete walkthrough of how payroll-linked wage access works (placeholder)."
          />
        </div>

        <div className="mt-12 mb-6 flex items-center gap-2 text-muted-foreground">
          <Film className="h-5 w-5" />
          <h3 className="font-display text-xl font-bold text-foreground">
            Short explainers
          </h3>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <VideoCard key={c.title} {...c} />
          ))}
        </div>
        <div className="mt-6">
          <Note>Video tiles are placeholders for the prototype.</Note>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Ask Tota"
              title="Your financial learning helper"
              subtitle="Tota explains CHILL, ZAP, the 20% cap, fee disclosure and budgeting. Tota always says: I explain, I do not give financial advice."
            />
            <div className="mt-6">
              <Note>
                Ask Tota is an educational demo only. It does not provide
                financial advice or product offers.
              </Note>
            </div>
          </div>
          <AskTota />
        </div>
      </Section>
    </>
  );
}
