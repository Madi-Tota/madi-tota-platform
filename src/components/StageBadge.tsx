import { cn } from "@/lib/utils";
import { FlaskConical, Hammer } from "lucide-react";

/**
 * Item 10 — architecture honesty. Every screen states whether what you are
 * looking at is a simulated prototype surface or a planned production capability.
 */
export function StageBadge({
  stage,
  className,
}: {
  stage: "prototype" | "planned";
  className?: string;
}) {
  const proto = stage === "prototype";
  const Icon = proto ? FlaskConical : Hammer;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        proto
          ? "border-warning/40 bg-warning/15 text-warning-foreground"
          : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {proto ? "Prototype · simulated" : "Production · planned"}
    </span>
  );
}
