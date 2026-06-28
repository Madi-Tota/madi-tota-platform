import { useState } from "react";
import {
  CheckSquare,
  Square,
  Languages,
  PlayCircle,
  Ticket,
  AlertOctagon,
  BellRing,
  WifiOff,
} from "lucide-react";
import { PageHero, Section, SectionHeading, Note } from "@/components/primitives";
import { ProtoForm } from "@/components/ProtoForm";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/brand";

const SCRIPT = [
  "Introduce yourself and Madi-Tota™ as payroll-linked wage-access infrastructure.",
  "Explain participation is voluntary and consent-based.",
  "Show how the fee appears before confirming a draw.",
  "Explain the 20% monthly access cap.",
  "Confirm the person understands recovery happens at payday.",
  "Share where to get support across channels.",
];

export default function FieldAgent() {
  const [checked, setChecked] = useState<boolean[]>(SCRIPT.map(() => false));
  const [lang, setLang] = useState<string>(LANGUAGES[0]);
  const completed = checked.filter(Boolean).length;

  return (
    <>
      <PageHero
        eyebrow="Field agent portal · Preview"
        title="Tools for education & onboarding support"
        subtitle="A preview of the field-agent workspace for helping workers understand Madi-Tota™ — focused on education, not sales."
      />

      <Section>
        <Note variant="warning">
          Preview only. This is a non-live mockup and does not connect to any real
          systems or data.
        </Note>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Consent script checklist */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Consent script checklist</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {completed}/{SCRIPT.length} done
              </span>
            </div>
            <ul className="space-y-2">
              {SCRIPT.map((s, i) => (
                <li key={s}>
                  <button
                    onClick={() =>
                      setChecked((c) => c.map((v, j) => (j === i ? !v : v)))
                    }
                    className="flex w-full items-start gap-3 rounded-xl border border-border p-3 text-left text-sm hover:bg-muted"
                  >
                    {checked[i] ? (
                      <CheckSquare className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    ) : (
                      <Square className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <span className={checked[i] ? "text-muted-foreground line-through" : ""}>
                      {s}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Language + video + reminder */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                <Languages className="h-5 w-5 text-primary" /> Language preference
              </h3>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                      lang === l
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                <PlayCircle className="h-5 w-5 text-primary" /> Video guide
              </h3>
              <div className="grid aspect-video place-items-center rounded-xl bg-gradient-card text-primary-foreground">
                <PlayCircle className="h-10 w-10 text-secondary" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Onboarding walkthrough ({lang}) — placeholder.
              </p>
            </div>

            <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-6">
              <h3 className="flex items-center gap-2 font-display font-bold">
                <BellRing className="h-5 w-5 text-accent" /> Voluntary opt-in reminder
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Always confirm participation is voluntary and never pressure a
                worker to opt in.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <WifiOff className="h-5 w-5 text-primary" /> Low-data / offline concept
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Checklists and scripts are designed to work in low-connectivity
              areas and sync later — a concept for field reliability.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <AlertOctagon className="h-5 w-5 text-destructive" /> Complaint escalation
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A clear path to escalate complaints to the support and compliance
              teams via Utlwala OmniChannel™.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Support ticket"
              title="Log a support ticket"
              subtitle="Field agents can raise tickets on behalf of a worker (demo form)."
            />
          </div>
          <ProtoForm
            submitLabel="Log ticket (demo)"
            fields={[
              { name: "agent", label: "Field agent name", required: true },
              { name: "type", label: "Ticket type", type: "select", options: ["Education question", "Onboarding help", "Complaint escalation", "Technical issue"], required: true },
              { name: "lang", label: "Worker language preference", type: "select", options: [...LANGUAGES] },
              { name: "details", label: "Details", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>

      <div className="container-tight pb-6 text-center">
        <Button variant="soft" size="lg" onClick={() => setChecked(SCRIPT.map(() => false))}>
          Reset checklist
        </Button>
      </div>
    </>
  );
}
