import {
  Scale,
  FileLock2,
  CheckCircle2,
  ClipboardCheck,
  Landmark,
  Flag,
  Gauge,
  GitBranch,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/primitives";

const CARDS = [
  {
    icon: Scale,
    title: "AI Executive Board",
    body: "Three independent AI board members challenge every decision before it reaches the CEO.",
  },
  {
    icon: FileLock2,
    title: "POPIA-First Architecture",
    body: "Consent, purpose limitation, and data retention are designed into the system, not bolted on.",
  },
  {
    icon: CheckCircle2,
    title: "Consent Before Action",
    body: "No draw, no deduction, no data use without explicit, recorded worker consent.",
  },
  {
    icon: ClipboardCheck,
    title: "Audit-Ready by Design",
    body: "Every transaction, fee, and consent is immutably logged for regulatory and investor review.",
  },
  {
    icon: Landmark,
    title: "Payroll-Linked, Not Credit-Linked",
    body: "Recovery happens through payroll deduction — not through debt collection.",
  },
  {
    icon: Flag,
    title: "South African Built",
    body: "Designed, governed, and engineered in South Africa, for South African workers.",
  },
  {
    icon: Gauge,
    title: "20% Hard Cap",
    body: "No worker can ever access more than 20% of monthly net salary. Non-negotiable.",
  },
  {
    icon: GitBranch,
    title: "Version-Controlled Governance",
    body: "Every architecture decision, cost line, and risk is tracked in a controlled register.",
  },
];

export function GovernanceTrust() {
  return (
    <Section id="governance">
      <SectionHeading
        eyebrow="Governance"
        title="Built on Governance. Designed for Trust."
        subtitle="Madi-Tota is engineered with institutional-grade controls from day one."
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {CARDS.map((c) => (
          <li
            key={c.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <c.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
