import { Globe } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const PENDING_MESSAGE =
  "Professional translation and legal review in progress.";

const OPTIONS = [
  { code: "en", label: "English", active: true },
  { code: "zu", label: "isiZulu", active: false },
  { code: "tn", label: "Setswana", active: false },
] as const;

/**
 * Display-only language selector. Non-English options are explicitly
 * "Coming soon" — the site is never machine-translated.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label="Language selection"
    >
      <Globe
        className="h-4 w-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      {OPTIONS.map((o) =>
        o.active ? (
          <span
            key={o.code}
            aria-current="true"
            className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground"
          >
            {o.label}
          </span>
        ) : (
          <Tooltip key={o.code}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${o.label} — coming soon`}
                onClick={() => toast(PENDING_MESSAGE)}
                className="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {o.label}
                <span className="sr-only"> (Coming soon)</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>{PENDING_MESSAGE}</TooltipContent>
          </Tooltip>
        ),
      )}
    </div>
  );
}
