import { Link } from "react-router-dom";
import { Mail, Phone, AtSign } from "lucide-react";
import { Logo } from "./Logo";
import {
  BRAND,
  CONTACTS,
  SOCIALS,
  COMPLIANCE,
  FOOTER_TAGLINE,
  FOOTER_POLICY_LINKS,
  NAV_LINKS,
} from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="container-tight grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-1">
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
                  <span className="block text-xs text-primary-foreground/60">{c.label}</span>
                </span>
              </a>
            ))}
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-secondary">
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

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {NAV_LINKS.slice(0, 7).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-secondary">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">
            More
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {NAV_LINKS.slice(7).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-secondary">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-secondary">
            Policies
          </h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {FOOTER_POLICY_LINKS.map((l) => (
              <li key={l}>
                <Link
                  to={l === "Privacy Policy" ? "/privacy" : "/compliance"}
                  className="hover:text-secondary"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-tight space-y-3 py-6 text-xs text-primary-foreground/70">
          <p className="rounded-lg bg-secondary/10 px-3 py-2 text-secondary">
            {COMPLIANCE.classification}. {COMPLIANCE.popia}.
          </p>
          <p>{COMPLIANCE.disclaimers[0]} {COMPLIANCE.disclaimers[1]}</p>
          <p className="pt-2 text-sm font-medium text-primary-foreground/90">
            {FOOTER_TAGLINE}
          </p>
        </div>
      </div>
    </footer>
  );
}
