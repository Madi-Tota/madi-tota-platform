import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPLIANCE } from "@/lib/brand";
import { Note } from "./primitives";

export interface Field {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export function ProtoForm({
  fields,
  submitLabel = "Submit interest",
  title,
}: {
  fields: Field[];
  submitLabel?: string;
  title?: string;
}) {
  const { toast } = useToast();
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) return;
    setDone(true);
    toast({
      title: "Thanks — interest noted (demo)",
      description:
        "This prototype does not store or transmit any data. No information was submitted.",
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold">Interest noted (demo)</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a prototype. Nothing was saved or sent. In the live product a
          team member would follow up via approved channels.
        </p>
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => {
            setDone(false);
            setConsent(false);
          }}
        >
          Reset form
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-md">
      {title && <h3 className="font-display text-xl font-bold">{title}</h3>}
      <Note variant="warning">{COMPLIANCE.formWarning}</Note>
      {fields.map((f) => (
        <div key={f.name} className="space-y-2">
          <Label htmlFor={f.name}>
            {f.label} {f.required && <span className="text-destructive">*</span>}
          </Label>
          {f.type === "textarea" ? (
            <Textarea id={f.name} placeholder={f.placeholder} required={f.required} maxLength={1000} />
          ) : f.type === "select" ? (
            <select
              id={f.name}
              required={f.required}
              defaultValue=""
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              required={f.required}
              maxLength={255}
            />
          )}
        </div>
      ))}

      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <Checkbox
          id="popia-consent"
          checked={consent}
          onCheckedChange={(v) => setConsent(v === true)}
          aria-describedby="popia-consent-help"
        />
        <div className="space-y-1">
          <Label htmlFor="popia-consent" className="text-sm font-medium leading-snug">
            {COMPLIANCE.consentLabel} <span className="text-destructive">*</span>
          </Label>
          <p id="popia-consent-help" className="text-xs text-muted-foreground">
            Read the{" "}
            <Link to="/privacy" className="font-medium text-primary underline">
              Privacy Notice
            </Link>
            . In this prototype nothing is stored or transmitted.
          </p>
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!consent}>
        {submitLabel}
      </Button>
      {!consent && (
        <p className="text-center text-xs text-muted-foreground">
          Tick the consent box to enable submission.
        </p>
      )}
    </form>
  );
}
