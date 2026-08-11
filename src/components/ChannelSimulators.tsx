import { Section, SectionHeading, Note } from "@/components/primitives";
import { UssdSimulator } from "./UssdSimulator";
import { WhatsAppDemo } from "./WhatsAppDemo";

export function ChannelSimulators() {
  return (
    <Section muted id="simulators">
      <SectionHeading
        center
        eyebrow="Try the channels"
        title="USSD and assistant simulators"
        subtitle="Working simulations of the low-data channels workers would use — key in real amounts and watch the cap, fee, payout and payroll recovery recalculate."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
        <UssdSimulator />
        <WhatsAppDemo />
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <Note variant="warning">
          Both simulators run entirely in your browser using mock data. No
          messages, numbers or amounts leave this page, and no real transaction
          is created.
        </Note>
      </div>
    </Section>
  );
}
