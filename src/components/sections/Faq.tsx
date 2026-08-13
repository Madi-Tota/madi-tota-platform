import { DOCTRINE_LINE, REGULATORY_STATEMENT } from "@/lib/governance";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, SectionHeading } from "@/components/primitives";

const WORKER_FAQ = [
  {
    q: "Is Madi-Tota a loan?",
    a: "No. Madi-Tota gives you access to wages you have already earned but not yet been paid. It is not credit and carries no interest — only a single disclosed flat fee per draw, shown before you confirm.",
  },
  {
    q: "What exactly will I pay?",
    a: "CHILL is 5.8% and ZAP is 11.1% per draw. The exact Rand fee is always shown on the confirmation screen before you confirm.",
  },
  {
    q: "Is there a limit to what I can access?",
    a: "Yes. Access is capped at 20% of your monthly net pay as a responsible-use guardrail.",
  },
  {
    q: "Do you check my credit score?",
    a: "No. There is no credit check and no credit agreement when accessing your own earned wages.",
  },
  {
    q: "Is my personal information safe?",
    a: "Madi-Tota is built POPIA-aligned: consent first, minimal data, and your information is never sold.",
  },
  {
    q: "Which channels can I use?",
    a: "A mobile app experience, a USSD option for low-data phones, and a WhatsApp-style assistant. On this site they are simulations while the pilot is prepared.",
  },
];

const EMPLOYER_FAQ = [
  {
    q: "What does it cost our company?",
    a: "Employer core access is R0. Workers pay one disclosed flat fee; the employer pays nothing for core access.",
  },
  {
    q: "Does this create risk on our balance sheet?",
    a: "No. Recovery is payroll-linked at payday, subject to consent and applicable law. The employer is not a lender.",
  },
  {
    q: "How much administration is involved?",
    a: "Designed to be minimal: we integrate with your payroll process and carry worker support. Pilot onboarding is hands-on and supported by our team.",
  },
  {
    q: "Which payroll systems do you support?",
    a: "The pilot runs on a dedicated connector with our first employer partner. Sage, VIP and SimplePay connectors are on the published engineering roadmap.",
  },
  {
    q: "How do we position it to our team?",
    a: "As a financial-wellness benefit — a retention and wellbeing tool for shift-based workforces.",
  },
  {
    q: "When can we join?",
    a: "We are onboarding a limited number of pilot employers. Join the pilot interest list and our team will contact you.",
  },
];

function FaqColumn({
  id,
  heading,
  items,
}: {
  id: string;
  heading: string;
  items: { q: string; a: string }[];
}) {
  return (
    <div>
      <h3
        id={id}
        className="font-display text-xl font-semibold text-foreground"
      >
        {heading}
      </h3>
      <Accordion type="single" collapsible className="mt-4">
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`${id}-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq" muted>
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered plainly"
        subtitle="Worker and employer questions, with the same numbers used everywhere else on this site."
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <FaqColumn id="worker-faq" heading="Worker FAQ" items={WORKER_FAQ} />
        <FaqColumn
          id="employer-faq"
          heading="Employer FAQ"
          items={EMPLOYER_FAQ}
        />
      </div>
      <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
        {DOCTRINE_LINE} {REGULATORY_STATEMENT}
      </p>
    </Section>
  );
}
