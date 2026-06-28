import { useState } from "react";
import { Languages } from "lucide-react";
import { LANGUAGES } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  onChange,
}: {
  onChange?: (lang: string) => void;
}) {
  const [active, setActive] = useState<string>(LANGUAGES[0]);
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1">
      <span className="flex items-center gap-1 px-2 text-xs font-medium text-muted-foreground">
        <Languages className="h-4 w-4" />
      </span>
      {LANGUAGES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            setActive(l);
            onChange?.(l);
          }}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            active === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
