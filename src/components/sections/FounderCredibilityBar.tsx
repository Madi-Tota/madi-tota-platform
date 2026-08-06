import { Linkedin } from "lucide-react";

export function FounderCredibilityBar() {
  return (
    <div className="border-y border-border bg-card">
      <div className="container-tight flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-border bg-muted text-center text-[8px] leading-tight text-muted-foreground">
            PHOTO PENDING
          </div>
          <div className="text-sm">
            <p className="font-display text-base font-semibold text-foreground">
              Lebo Koloi
            </p>
            <p className="text-muted-foreground">Founder &amp; CEO</p>
            <p className="mt-1 text-muted-foreground">
              22 years building and leading South African workforce operations.
            </p>
            <p className="text-muted-foreground">
              Creator of Madi-Tota. Founder of Utlwala Tactical System.
            </p>
          </div>
        </div>
        {/* [LINKEDIN URL PENDING — CEO to provide] */}
        <a
          href="#"
          aria-label="Founder LinkedIn profile — URL pending"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </div>
  );
}
