import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PILOT_LANGUAGES, fireLanguageSelected } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  onChange,
}: {
  onChange?: (lang: string) => void;
}) {
  const { i18n } = useTranslation();
  const active = i18n.resolvedLanguage ?? "en";

  return (
    <div className="space-y-2">
      <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-border bg-card p-1">
        <span className="flex items-center gap-1 px-2 text-xs font-medium text-muted-foreground">
          <Languages className="h-4 w-4" aria-hidden="true" />
        </span>
        {PILOT_LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            aria-pressed={active === l.code}
            onClick={() => {
              void i18n.changeLanguage(l.code);
              fireLanguageSelected(l.code);
              onChange?.(l.code);
            }}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active === l.code
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      {active !== "en" && (
        <p className="text-xs font-medium text-muted-foreground">
          Translation pending human verification — English copy is shown where a
          verified translation does not yet exist.
        </p>
      )}
    </div>
  );
}
