import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Note } from "@/components/primitives";
import { COMPLIANCE } from "@/lib/brand";
import { cn } from "@/lib/utils";

const CONSENT_COPY =
  "I consent to Madi-Tota processing this information to contact me about the pilot, per the Privacy Policy (POPIA).";

type Audience = "worker" | "employer";

interface FieldDef {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
}

const WORKER_FIELDS: FieldDef[] = [
  { name: "firstName", label: "First name", required: true, autoComplete: "given-name" },
  { name: "mobile", label: "Mobile number", type: "tel", required: true, autoComplete: "tel" },
  { name: "employerName", label: "Employer name (optional)" },
  {
    name: "channel",
    label: "Channel preference",
    type: "select",
    options: ["App", "USSD", "WhatsApp"],
    required: true,
  },
];

const EMPLOYER_FIELDS: FieldDef[] = [
  { name: "company", label: "Company name", required: true, autoComplete: "organization" },
  { name: "contactName", label: "Contact name", required: true, autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "payroll", label: "Payroll system", required: true },
  {
    name: "size",
    label: "Workforce size band",
    type: "select",
    options: ["10–200", "200–2,000", "2,000+"],
    required: true,
  },
];

/** Prototype store: a simple local table. No third-party marketing pixels. */
const TABLE_KEY = "madi-tota.pilot_interest";

function storeSubmission(audience: Audience, data: Record<string, string>) {
  try {
    const raw = window.localStorage.getItem(TABLE_KEY);
    const rows: unknown[] = raw ? JSON.parse(raw) : [];
    rows.push({ audience, ...data, submittedAt: new Date().toISOString() });
    window.localStorage.setItem(TABLE_KEY, JSON.stringify(rows));
  } catch {
    /* storage unavailable — prototype only */
  }
}

export function PilotForms() {
  const [audience, setAudience] = useState<Audience>("employer");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  const fields = audience === "worker" ? WORKER_FIELDS : EMPLOYER_FIELDS;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      data[k] = String(v);
    });
    storeSubmission(audience, data);
    setDone(true);
  }

  function switchAudience(next: Audience) {
    setAudience(next);
    setConsent(false);
    setDone(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
      <div
        role="tablist"
        aria-label="Who are you joining as"
        className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1"
      >
        {(["worker", "employer"] as Audience[]).map((a) => (
          <button
            key={a}
            role="tab"
            type="button"
            aria-selected={audience === a}
            aria-controls="pilot-form-panel"
            onClick={() => switchAudience(a)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              audience === a
                ? "bg-background text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {a === "worker" ? "I am a worker" : "I am an employer"}
          </button>
        ))}
      </div>

      {done ? (
        <div
          id="pilot-form-panel"
          role="status"
          className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center"
        >
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
          <p className="mt-4 font-display text-xl font-bold">
            Thank you — our team will be in touch.
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => {
              setDone(false);
              setConsent(false);
            }}
          >
            Submit another response
          </Button>
        </div>
      ) : (
        <form id="pilot-form-panel" onSubmit={handleSubmit} className="space-y-5">
          <Note variant="warning">{COMPLIANCE.formWarning}</Note>

          {fields.map((f) => (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>
                {f.label}
                {f.required && (
                  <span className="text-destructive" aria-hidden="true">
                    {" "}
                    *
                  </span>
                )}
              </Label>
              {f.type === "select" ? (
                <select
                  id={f.name}
                  name={f.name}
                  required={f.required}
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={f.name}
                  name={f.name}
                  type={f.type ?? "text"}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  maxLength={255}
                  className="h-11"
                />
              )}
            </div>
          ))}

          <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
            <Checkbox
              id="pilot-consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
              aria-describedby="pilot-consent-help"
            />
            <div className="space-y-1">
              <Label
                htmlFor="pilot-consent"
                className="text-sm font-medium leading-snug"
              >
                {CONSENT_COPY}
              </Label>
              <p id="pilot-consent-help" className="text-xs text-muted-foreground">
                Read the{" "}
                <Link to="/privacy" className="font-medium text-primary underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={!consent}
          >
            Join the pilot
          </Button>
          {!consent && (
            <p className="text-center text-xs text-muted-foreground">
              Tick the consent box to enable submission.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
