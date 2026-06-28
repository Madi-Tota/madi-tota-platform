import { Smartphone, MessageCircle, Mail, Hash, UserRound } from "lucide-react";
import { PageHero, Section, SectionHeading, Note } from "@/components/primitives";
import { ProtoForm } from "@/components/ProtoForm";
import { BRAND } from "@/lib/brand";

const CHANNELS = [
  { icon: Smartphone, title: "In-app support", text: "Raise a ticket directly inside the Madi-Tota™ app prototype.", tag: "App" },
  { icon: MessageCircle, title: "WhatsApp-style support", text: "Chat-style support for quick questions (concept).", tag: "Chat" },
  { icon: Mail, title: "Email support", text: `Reach the team at ${BRAND.email}.`, tag: "Email" },
  { icon: Hash, title: "USSD support request", text: "A low-data, no-smartphone path to request help (concept).", tag: "USSD" },
  { icon: UserRound, title: "Field agent support", text: "In-person education and onboarding help from a field agent.", tag: "In person" },
];

export default function Support() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Help, routed the way that suits you"
        subtitle={`Support is designed around the ${BRAND.omnichannel}™ architecture so people can reach help on any channel.`}
      />

      <Section>
        <SectionHeading
          eyebrow={`${BRAND.omnichannel}™`}
          title="Support routing concept"
          subtitle="A single request can arrive through any channel and be routed to the right team."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-secondary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                  {c.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Note variant="warning">
            These channels illustrate the architecture only. They do not imply
            live deployment or an active support line.
          </Note>
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          center
          eyebrow="Demo request"
          title="Send a support request"
          subtitle="A sample of the support form. Nothing is stored or sent in this prototype."
        />
        <div className="mx-auto mt-8 max-w-xl">
          <ProtoForm
            submitLabel="Submit support request"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "channel", label: "Preferred channel", type: "select", options: ["App", "WhatsApp-style", "Email", "USSD", "Field agent"], required: true },
              { name: "topic", label: "Topic", type: "select", options: ["How CHILL/ZAP works", "The 20% cap", "A draw I made", "Account & privacy", "Other"] },
              { name: "message", label: "How can we help?", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
