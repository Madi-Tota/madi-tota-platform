import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  UserRound,
  ClipboardList,
  Building2,
  Handshake,
  CalendarClock,
  ShieldCheck,
  Eye,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccessCard } from "@/components/AccessCard";
import { Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { BRAND, RATES, COMPLIANCE, BRAND_IMAGES } from "@/lib/brand";
import { FEE_LABELS } from "@/lib/fee-schedule";

const WhyNow = lazy(() =>
  import("@/components/sections/WhyNow").then((m) => ({ default: m.WhyNow })),
);
const EmployerValue = lazy(() =>

  import("@/components/sections/EmployerValue").then((m) => ({
    default: m.EmployerValue,
  })),
);
const TrustGovernance = lazy(() =>
  import("@/components/sections/TrustGovernance").then((m) => ({
    default: m.TrustGovernance,
  })),
);
const Faq = lazy(() =>
  import("@/components/sections/Faq").then((m) => ({ default: m.Faq })),
);
const ChannelSimulators = lazy(() =>
  import("@/components/ChannelSimulators").then((m) => ({
    default: m.ChannelSimulators,
  })),
);
const FounderLetter = lazy(() =>
  import("@/components/sections/FounderLetter").then((m) => ({
    default: m.FounderLetter,
  })),
);
const FounderCredibilityBar = lazy(() =>
  import("@/components/sections/FounderCredibilityBar").then((m) => ({
    default: m.FounderCredibilityBar,
  })),
);
const WhyEmployersChoose = lazy(() =>
  import("@/components/sections/WhyEmployersChoose").then((m) => ({
    default: m.WhyEmployersChoose,
  })),
);
const GovernanceTrust = lazy(() =>
  import("@/components/sections/GovernanceTrust").then((m) => ({
    default: m.GovernanceTrust,
  })),
);
const Philosophy = lazy(() =>
  import("@/components/sections/Philosophy").then((m) => ({
    default: m.Philosophy,
  })),
);
const UtlwalaSection = lazy(() =>
  import("@/components/sections/UtlwalaSection").then((m) => ({
    default: m.UtlwalaSection,
  })),
);
const Journey = lazy(() =>
  import("@/components/sections/Journey").then((m) => ({ default: m.Journey })),
);
const CommunityImpact = lazy(() =>
  import("@/components/sections/CommunityImpact").then((m) => ({
    default: m.CommunityImpact,
  })),
);
const RoadAhead = lazy(() =>
  import("@/components/sections/RoadAhead").then((m) => ({
    default: m.RoadAhead,
  })),
);
const Chronicles = lazy(() =>
  import("@/components/sections/Chronicles").then((m) => ({
    default: m.Chronicles,
  })),
);


const SectionFallback = () => (
  <div className="container-tight py-14" aria-hidden="true">
    <div className="h-40 rounded-2xl bg-muted/50" />
  </div>
);

const TRUST_CHIPS = [
  "Fee shown before you confirm",
  `${FEE_LABELS.cap} monthly cap`,
  "POPIA-aligned consent",
];

const STEPS = [
  {
    icon: Building2,
    title: "1 · Employer joins the pilot",
    text: `An employer opts in and connects payroll context. Employer core access is ${FEE_LABELS.employerCore}.`,
  },
  {
    icon: Handshake,
    title: "2 · Employee chooses CHILL or ZAP",
    text: `The employee sees the fee up front — CHILL ${RATES.chill}% or ZAP ${RATES.zap}% per draw — before confirming.`,
  },
  {
    icon: CalendarClock,
    title: "3 · Payroll-linked recovery at payday",
    text: "Recovery happens at payday, subject to consent and controls. No surprises.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="container-tight relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Payroll-linked wage access · Prototype
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 font-display text-4xl font-extrabold leading-[1.1] md:text-6xl motion-reduce:transform-none"
            >
              {BRAND.tagline}
            </motion.h1>
            <p className="mt-4 max-w-xl text-lg font-medium text-primary-foreground">
              Access wages you have already earned. One disclosed flat fee. No
              interest, no credit check, no surprises.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {TRUST_CHIPS.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-sm font-semibold text-primary-foreground"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/85">
              Madi-Tota™ is {BRAND.descriptor} for South African workers and
              employers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/employees">
                  <UserRound /> I am an employee
                </Link>
              </Button>
              <Button asChild size="xl" variant="warm">
                <Link to="/employers">
                  <Briefcase /> I am an employer
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
              >
                <Link to="/pilot">
                  <ClipboardList /> Join pilot interest list
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/70">
              A Utlwala Tactical System platform · Built in South Africa
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-primary-foreground/85">
              <span className="font-semibold uppercase tracking-wide text-secondary">
                Channels:
              </span>
              {["App", "USSD", "WhatsApp-style assistant", "Field agent"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1"
                >
                  {c}
                </span>
              ))}
              <a
                href="#simulators"
                className="font-semibold text-secondary underline underline-offset-4"
              >
                Try the simulators
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:justify-self-end motion-reduce:transform-none"
          >
            <AccessCard />
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <FounderLetter />
      </Suspense>

      <Suspense fallback={null}>
        <FounderCredibilityBar />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyNow />
      </Suspense>


      <Section>
        <figure className="overflow-hidden rounded-3xl border border-border shadow-md">
          <img
            src={BRAND_IMAGES.workforce}
            alt="Security, mining, retail and healthcare workers together under the Madi-Tota mark"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </figure>
      </Section>

      <Section>
        <SectionHeading
          center
          eyebrow="How it works"
          title="Three simple steps"
          subtitle="Built to be transparent for employees and effortless for employers."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <FeatureCard key={s.title} icon={s.icon} title={s.title}>
              {s.text}
            </FeatureCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="soft" size="lg">
            <Link to="/how-it-works">
              See the full flow <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      <Suspense fallback={<SectionFallback />}>
        <WhyEmployersChoose />
      </Suspense>

      <Section muted>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon={Eye} title="Fee shown before you confirm">
            Your exact fee always appears on the confirmation screen — CHILL{" "}
            {RATES.chill}% or ZAP {RATES.zap}% per draw.
          </FeatureCard>
          <FeatureCard icon={ShieldCheck} title={`${RATES.capPercent}% monthly cap`}>
            A built-in guardrail. Access is capped at {RATES.capPercent}% of
            monthly salary to support responsible use.
          </FeatureCard>
          <FeatureCard icon={Smartphone} title="Mobile-first & low-data">
            Designed for everyday phones, with a USSD fallback concept for
            low-data and offline situations.
          </FeatureCard>
        </div>
      </Section>

      <Suspense fallback={<SectionFallback />}>
        <ChannelSimulators />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <EmployerValue />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TrustGovernance />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GovernanceTrust />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Philosophy />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <UtlwalaSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Journey />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CommunityImpact />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <RoadAhead />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Chronicles />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Faq />
      </Suspense>


      <Section>
        <div className="rounded-3xl bg-gradient-card p-8 text-primary-foreground md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold">
                Ready to see the app demo?
              </h2>
              <p className="mt-3 text-primary-foreground/85">
                Walk through the full Madi-Tota™ employee journey — from language
                selection to fee confirmation — all with mock data.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/app">Open app prototype <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
                  <Link to="/learn">Visit Learn hub</Link>
                </Button>
              </div>
            </div>
            <div className="md:justify-self-end">
              <AccessCard />
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <Note>
          <strong>{COMPLIANCE.classification}.</strong> {COMPLIANCE.popia}.{" "}
          {COMPLIANCE.disclaimers[0]}
        </Note>
      </Section>
    </>
  );
}
