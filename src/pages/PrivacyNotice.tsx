import { Link } from "react-router-dom";
import { Lock, Database, Clock, UserCheck, Share2, Mail } from "lucide-react";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { BRAND, COMPLIANCE } from "@/lib/brand";

const PURPOSES: Array<[string, string]> = [
  ["Pilot and partnership enquiries", "To respond to an employer, partner or worker who contacts us."],
  ["Product education", "To share plain-language material about how wage access works."],
  ["Service operation (future, live product)", "To operate payroll-linked wage access once an employer and worker have consented."],
];

const RIGHTS = [
  "Ask what personal information we hold about you",
  "Ask us to correct or delete it",
  "Object to processing or withdraw consent at any time",
  "Complain to the Information Regulator of South Africa",
];

export default function PrivacyNotice() {
  return (
    <>
      <PageHero
        eyebrow="Privacy notice"
        title="How Madi-Tota™ would handle your information"
        subtitle="A plain-language POPIA notice for this prototype. It describes intended practice for the live product and what happens (and does not happen) on this site today."
      />

      <Section>
        <Note variant="warning">
          {COMPLIANCE.disclaimers[0]} {COMPLIANCE.disclaimers[1]} Forms on this
          site do not store or transmit anything — submissions are simulated in
          your browser only.
        </Note>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FeatureCard icon={Database} title="Responsible party">
            {BRAND.owner}, operating Madi-Tota™. Contact{" "}
            <a href={`mailto:${BRAND.email}`} className="font-medium text-primary underline">
              {BRAND.email}
            </a>{" "}
            for privacy questions or an information request.
          </FeatureCard>
          <FeatureCard icon={Lock} title="Lawful basis">
            Consent for enquiries and voluntary participation; contractual
            necessity and employer authorisation for payroll-linked recovery in
            the live product.
          </FeatureCard>
          <FeatureCard icon={Clock} title="Retention">
            Enquiry data would be kept only as long as needed to respond, and
            transaction records for the period required by applicable law.
            Retention schedule is part of the compliance pack under review.
          </FeatureCard>
          <FeatureCard icon={Share2} title="Sharing">
            In the live product, limited data would be shared with the
            participating employer's payroll function and processors such as
            hosting and payment partners, under written agreements. No selling
            of personal information.
          </FeatureCard>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Purpose limitation" title="Why we would collect information" />
        <dl className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {PURPOSES.map(([k, v]) => (
            <div key={k} className="gap-4 p-5 sm:flex">
              <dt className="font-semibold sm:w-1/3">{k}</dt>
              <dd className="text-sm text-muted-foreground sm:w-2/3">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading eyebrow="Your rights" title="What you can ask us to do" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {RIGHTS.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm shadow-sm">
              <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-sm shadow-sm">
          <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Privacy requests:{" "}
            <a href={`mailto:${BRAND.email}`} className="font-medium text-primary underline">
              {BRAND.email}
            </a>{" "}
            · See also the{" "}
            <Link to="/compliance" className="font-medium text-primary underline">
              Trust &amp; Compliance Centre
            </Link>
            .
          </span>
        </div>
      </Section>
    </>
  );
}
