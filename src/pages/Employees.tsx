import { Eye, ShieldCheck, Smartphone, Wallet, BookOpen, HeartHandshake } from "lucide-react";
import { PageHero, Section, SectionHeading, FeatureCard, Note } from "@/components/primitives";
import { FeeCalculator } from "@/components/FeeCalculator";
import { WorkerTransparencyWidget } from "@/components/WorkerTransparencyWidget";
import { ChannelSimulators } from "@/components/ChannelSimulators";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RATES } from "@/lib/brand";

export default function Employees() {
  return (
    <>
      <PageHero
        eyebrow="For employees"
        title="Access part of your pay, fairly"
        subtitle="Madi-Tota™ helps you reach a portion of money you have already earned, with the fee shown before you confirm."
      >
        <LanguageToggle />
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="In plain language"
          title="What you can expect"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <FeatureCard icon={Wallet} title="See what is available">
            Each month you can see how much you can access — up to{" "}
            {RATES.capPercent}% of your salary.
          </FeatureCard>
          <FeatureCard icon={Eye} title="Know the fee first">
            Choose CHILL ({RATES.chill}%) or ZAP ({RATES.zap}%) per draw. The fee
            is always shown before you confirm.
          </FeatureCard>
          <FeatureCard icon={ShieldCheck} title="Recovered at payday">
            What you access is recovered at payday, linked to payroll, with your
            consent.
          </FeatureCard>
          <FeatureCard icon={Smartphone} title="Works on your phone">
            Mobile-first and low-data friendly, with a USSD fallback concept.
          </FeatureCard>
          <FeatureCard icon={BookOpen} title="Learn before you choose">
            The Learn hub and Ask Tota help you understand your options first.
          </FeatureCard>
          <FeatureCard icon={HeartHandshake} title="Support when you need it">
            Reach help through app, WhatsApp-style, email, USSD or a field agent.
          </FeatureCard>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Try the calculator"
              title="See how CHILL and ZAP compare"
              subtitle="Move the sliders to explore example fees. These figures are illustrative only and are not an offer."
            />
            <div className="mt-6">
              <Note>
                Choose a language above to imagine the experience in English,
                Setswana or isiZulu (demo toggle).
              </Note>
            </div>
          </div>
          <FeeCalculator />
        </div>
      </Section>
    </>
  );
}
