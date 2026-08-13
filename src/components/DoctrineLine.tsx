import { cn } from "@/lib/utils";
import { DOCTRINE_LINE } from "@/lib/governance";

/** Item 1 — the locked doctrine line, rendered wherever money is shown. */
export function DoctrineLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      {DOCTRINE_LINE}
    </p>
  );
}
