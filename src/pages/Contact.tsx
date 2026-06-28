import { Mail, Phone, AtSign, MapPin } from "lucide-react";
import { PageHero, Section, SectionHeading, Note } from "@/components/primitives";
import { ProtoForm } from "@/components/ProtoForm";
import { BRAND } from "@/lib/brand";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="For partnerships, pilots and media. This prototype does not transmit messages — please use the details below for real enquiries."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading eyebrow="Reach us" title="Contact details" />
            <div className="space-y-3">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">{BRAND.email}</span>
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">{BRAND.phone}</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <AtSign className="h-5 w-5 text-primary" />
                <span className="font-medium">{BRAND.social}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{BRAND.owner} · South Africa</span>
              </div>
            </div>
            <Note>This prototype is for demonstration. Nothing is stored or sent.</Note>
          </div>

          <ProtoForm
            title="Send us a message (demo)"
            submitLabel="Send message"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "org", label: "Organisation" },
              { name: "reason", label: "Reason for contact", type: "select", options: ["Partnership", "Employer pilot", "Investor enquiry", "Media", "Other"], required: true },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
