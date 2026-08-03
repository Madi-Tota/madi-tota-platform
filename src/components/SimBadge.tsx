import { cn } from "@/lib/utils";
import { COMPLIANCE } from "@/lib/brand";
import { Activity } from "lucide-react";

/** Persistent, subtle badge marking every interactive number as simulated. */
export function SimBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      <Activity className="h-3.5 w-3.5" aria-hidden="true" />
      {COMPLIANCE.simLabel}
    </span>
  );
}
