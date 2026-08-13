import { Link } from "react-router-dom";
import { Mail, Phone, AtSign } from "lucide-react";
import { Logo } from "./Logo";
import {
  BRAND,
  CONTACTS,
  SOCIALS,
  COMPLIANCE,
  FOOTER_TAGLINE,
  BRAND_IMAGES,
} from "@/lib/brand";

const COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", to: "/how-it-works" },
      { label: "Simulators", to: "/#simulators" },
      { label: "Learn hub", to: "/learn" },
      { label: "App prototype", to: "/app" },
    ],
  },
  {
    heading: "Employers",
    links: [
      { label: "Why Madi-Tota", to: "/#why-now" },
      { label: "Employer FAQ", to: "/#faq" },
      { label: "Join the pilot", to: "/pilot" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Meet the Founder", to: "/#founder-letter" },
      { label: "Our Philosophy", to: "/#philosophy" },
      { label: "Governance", to: "/#governance" },
      { label: "Our Journey", to: "/#our-journey" },
      { label: "Utlwala Tactical System", to: "/#utlwala" },
      { label: "The Utlwala Chronicles", to: "/#chronicles" },
      { label: "Contact", to: "/contact" },
      { label: "Press & investors", to: "/compliance" },
    ],
  },

  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Use", to: "/terms" },
      { label: "PAIA Manual", to: "/paia" },
      { label: "Regulatory disclaimer", to: "/regulatory-disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-1">
          <div className="rounded-xl bg-background/95 px-3 py-2 w-fit">
            <Logo />
          </div>
          <p className="text-sm text-primary-foreground/70">
            Madi-Tota™ is {BRAND.descriptor} for South African workers and
            employers.
          </p>
          <div className="space-y-2 text-sm">
            {Object.values(CONTACTS).map((c) => (
              <a
                key={c.email}
                href={`mailto:${c.email}`}
                className="flex items-center gap-2 hover:text-secondary"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>
                  {c.email}
                  <span className="block text-xs text-primary-foreground/60">
                    {c.label}
                  </span>
                </span>
              </a>
            ))}
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 hover:text-secondary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {BRAND.phone}
            </a>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
              <AtSign className="h-4 w-4" aria-hidden="true" />
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium hover:text-secondary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">
              {col.heading}
            </h2>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-secondary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-tight space-y-3 py-6 text-xs text-primary-foreground/70">
          <p className="rounded-lg bg-secondary/10 px-3 py-2 text-secondary">
            {COMPLIANCE.classification}. {COMPLIANCE.popia}.
          </p>
          <p>
            {COMPLIANCE.disclaimers[0]} {COMPLIANCE.disclaimers[1]}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <img
              src={BRAND_IMAGES.utlwalaLockup}
              alt="Utlwala Tactical Systems — gold shield emblem. African Systems. Global Standard."
              className="h-11 w-auto object-contain"
            />
            <p className="text-sm font-medium text-primary-foreground/90">
              {FOOTER_TAGLINE}
            </p>
          </div>
          <p className="pt-2">
            © 2026 Madi-Tota™. Non-live prototype using simulated data.
            Regulatory classification pending independent legal opinion. No
            credit is extended on this site.
          </p>
          <p className="pt-2 text-sm font-medium text-primary-foreground/90">
            Madi-Tota™ · A Utlwala Tactical System Platform · Built in South
            Africa 🇿🇦
          </p>
          <p className="text-sm font-semibold text-secondary">
            Re Tla Fenya Mmogo.
          </p>

        </div>
      </div>
    </footer>
  );
}
