import { useMemo, useState } from "react";
import { PageHero, Section, Note } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PlayCircle, RotateCcw } from "lucide-react";
import { quote, money0 } from "@/lib/fees";
import {
  AGREEMENT_VERSION,
  DOCTRINE_LINE,
  REGULATORY_STATEMENT,
  makeReference,
  type ConsentRecord,
} from "@/lib/governance";
import { StageBadge } from "@/components/StageBadge";
import { DoctrineLine } from "@/components/DoctrineLine";
import { ConsentReceipt } from "@/components/ConsentReceipt";
import { WorkerAgreementFlow } from "@/components/WorkerAgreementFlow";
import { WorkerTransparencyWidget } from "@/components/WorkerTransparencyWidget";
import { UssdSimulator } from "@/components/UssdSimulator";
import { WhatsAppDemo } from "@/components/WhatsAppDemo";
import { FollowTheRand } from "@/components/sections/FollowTheRand";
import { ExceptionPath } from "@/components/sections/ExceptionPath";
import { COMPLIANCE } from "@/lib/brand";

const DEMO_AMOUNT = 1000;

function Panel({
  title,
  text,
  children,
  stage = "prototype",
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
  stage?: "prototype" | "planned";
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <StageBadge stage={stage} />
      </div>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{text}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Figures({ product }: { product: "CHILL" | "ZAP" }) {
  const q = quote(DEMO_AMOUNT, product);
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <dl className="grid gap-3 sm:grid-cols-4">
        {[
          ["Requested", money0(q.amount)],
          [`Fee (${q.product} ${q.rate}%)`, money0(q.fee)],
          ["You receive", money0(q.netReceived)],
          ["Payroll recovery", money0(q.payrollRecovery)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {k}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <DoctrineLine className="mt-4" />
    </div>
  );
}

/** Item 9 — one-tap guided investor tour: ten beats, under three minutes. */
export default function InvestorDemo() {
  const [beat, setBeat] = useState(0);

  const receiptRecord: ConsentRecord = useMemo(
    () => ({
      workerId: "MT-W-0042",
      employer: "Thabo Security Services",
      agreementVersion: AGREEMENT_VERSION,
      timestamp: new Date().toISOString(),
      consented: true,
      referenceId: makeReference(20260813),
    }),
    [],
  );

  const beats = [
    {
      label: "Worker draw",
      node: (
        <Panel
          title="1 · Worker draw"
          text="A worker with a simulated R12 000 net monthly salary requests access to wages already earned, inside the 20% cap."
        >
          <WorkerTransparencyWidget />
        </Panel>
      ),
    },
    {
      label: "Fee calculation",
      node: (
        <Panel
          title="2 · Fee calculation"
          text="One disclosed fee per draw. ZAP 11.1% and CHILL 5.8% on a R1 000 request."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Figures product="ZAP" />
            <Figures product="CHILL" />
          </div>
        </Panel>
      ),
    },
    {
      label: "Consent",
      node: (
        <Panel
          title="3 · Consent"
          text="Employer relationship validated, agreement version presented, affirmative consent required before activation."
        >
          <WorkerAgreementFlow amount={DEMO_AMOUNT} product="ZAP" />
        </Panel>
      ),
    },
    {
      label: "USSD flow",
      node: (
        <Panel
          title="4 · USSD flow"
          text="The same engine on a feature phone — the four figures never change between channels."
        >
          <UssdSimulator />
        </Panel>
      ),
    },
    {
      label: "WhatsApp flow",
      node: (
        <Panel
          title="5 · Assistant flow"
          text="A message-based channel driven by the identical calculation module."
        >
          <WhatsAppDemo />
        </Panel>
      ),
    },
    {
      label: "Follow the R1",
      node: (
        <Panel
          title="6 · Follow the R1"
          text="Request, fee, disbursement, recovery and reconciliation on a single strip."
        >
          <FollowTheRand inline />
        </Panel>
      ),
    },
    {
      label: "Payroll recovery",
      node: (
        <Panel
          title="7 · Payroll recovery"
          text="One deduction on the next payday, equal to the requested amount. Nothing rolls over."
          stage="planned"
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <dl className="divide-y divide-border text-sm">
              {[
                ["Worker", "MT-W-0042 · Thabo Security Services"],
                ["Payroll cycle", "Monthly — 25th"],
                ["Deduction instruction", money0(DEMO_AMOUNT)],
                ["Interest / rollover", "None"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <DoctrineLine className="mt-4" />
          </div>
        </Panel>
      ),
    },
    {
      label: "Reconciliation",
      node: (
        <Panel
          title="8 · Reconciliation"
          text="Draws and recoveries are matched line by line. A clean cycle closes at zero variance."
          stage="planned"
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                ["Draw", money0(DEMO_AMOUNT)],
                ["Recovery", money0(DEMO_AMOUNT)],
                ["Variance", "R0"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>
      ),
    },
    {
      label: "Exception scenario",
      node: (
        <Panel
          title="9 · Exception scenario"
          text="A R200 shortfall is detected, recorded and routed — never silently closed."
          stage="planned"
        >
          <ExceptionPath inline />
        </Panel>
      ),
    },
    {
      label: "Consent receipt",
      node: (
        <Panel
          title="10 · Consent receipt"
          text="The worker keeps a receipt of exactly what was agreed, and when."
        >
          <ConsentReceipt record={receiptRecord} quote={quote(DEMO_AMOUNT, "ZAP")} />
        </Panel>
      ),
    },
  ];

  const current = beats[beat];

  return (
    <>
      <PageHero
        eyebrow="Investor demo mode"
        title="Ten beats. Under three minutes. No founder required."
        subtitle="A guided tour of the Madi-Tota mechanic — draw, fee, consent, channels, recovery, reconciliation, exception and receipt."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="hero" size="lg" onClick={() => setBeat(0)}>
            <PlayCircle /> Start the tour
          </Button>
        </div>
      </PageHero>

      <Section>
        <ol className="flex flex-wrap gap-2" aria-label="Demo beats">
          {beats.map((b, i) => (
            <li key={b.label}>
              <button
                type="button"
                onClick={() => setBeat(i)}
                aria-current={i === beat ? "step" : undefined}
                className={
                  i === beat
                    ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                    : "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-muted"
                }
              >
                {i + 1} · {b.label}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8" key={beat}>
          {current.node}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setBeat((b) => Math.max(0, b - 1))}
            disabled={beat === 0}
          >
            <ArrowLeft /> Previous
          </Button>
          <Button
            onClick={() => setBeat((b) => Math.min(beats.length - 1, b + 1))}
            disabled={beat === beats.length - 1}
          >
            Next <ArrowRight />
          </Button>
          <Button variant="soft" onClick={() => setBeat(0)}>
            <RotateCcw /> Restart
          </Button>
          <span className="text-sm text-muted-foreground">
            Beat {beat + 1} of {beats.length}
          </span>
        </div>
      </Section>

      <Section className="pt-0">
        <Note>
          <strong>{COMPLIANCE.simLabel}</strong> {DOCTRINE_LINE} {REGULATORY_STATEMENT}
        </Note>
      </Section>
    </>
  );
}
