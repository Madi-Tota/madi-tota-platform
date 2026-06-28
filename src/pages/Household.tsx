import { Home, HandHeart, FileText, ScrollText, ShieldCheck, Users } from "lucide-react";
import { PageHero, Section, SectionHeading, Note } from "@/components/primitives";
import { ProtoForm } from "@/components/ProtoForm";

const HOUSEHOLD = [
  { icon: Home, title: "Simple, fair setup", text: "A household employer could offer payroll-linked wage access to a domestic worker with clear, transparent terms." },
  { icon: FileText, title: "Clear agreements", text: "Plain-language consent and disclosure designed for an informal employment context." },
  { icon: ShieldCheck, title: "Responsible guardrails", text: "The same caps and fee-before-confirm principles would apply." },
];

const WORKER = [
  { icon: HandHeart, title: "Dignified access", text: "Domestic workers could access part of earned pay without high-cost informal credit." },
  { icon: ScrollText, title: "Know your fee", text: "CHILL or ZAP fees would be shown before confirming any draw." },
  { icon: Users, title: "Support included", text: "Education, language options and field-agent support are part of the concept." },
];

export default function Household() {
  return (
    <>
      <PageHero
        eyebrow="Household node"
        title="Domestic worker & household model"
        subtitle="A future household model for domestic employment — positioned as a concept subject to separate legal and implementation review."
      />

      <Section>
        <Note variant="warning">
          This Household Node is a future concept only. It is subject to separate
          legal and implementation review and is not part of the current pilot.
        </Note>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-primary">
              For household employers
            </h3>
            <p className="mt-2 text-muted-foreground">
              Support the people who support your home, fairly.
            </p>
            <ul className="mt-6 space-y-5">
              {HOUSEHOLD.map((h) => (
                <li key={h.title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-7 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-accent">
              For domestic workers
            </h3>
            <p className="mt-2 text-muted-foreground">
              Access part of what you have earned, with dignity.
            </p>
            <ul className="mt-6 space-y-5">
              {WORKER.map((w) => (
                <li key={w.title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{w.title}</p>
                    <p className="text-sm text-muted-foreground">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Register interest"
          title="Household employer interest list"
          subtitle="Tell us you would like to hear more when the household model is reviewed."
        />
        <div className="mx-auto mt-8 max-w-xl">
          <ProtoForm
            submitLabel="Join household interest list"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "city", label: "City / town" },
              { name: "note", label: "Anything you would like us to know", type: "textarea" },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
