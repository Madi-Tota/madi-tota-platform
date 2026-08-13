import { FormEvent, useState } from "react";
import { BRAND, BRAND_IMAGES } from "@/lib/brand";
import { tryUnlockFromPasscode } from "@/lib/previewAccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

/**
 * Public-facing wall shown on the custom domain before launch. Anyone with
 * the investor link or passcode can get past it via `onUnlock`.
 */
export function ComingSoon({ onUnlock }: { onUnlock: () => void }) {
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (tryUnlockFromPasscode(passcode)) {
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-hero px-6 py-16 text-center text-primary-foreground">
      <img
        src={BRAND_IMAGES.mark}
        alt="Madi-Tota gem M mark"
        width={72}
        height={72}
        className="h-16 w-16 rounded-2xl object-cover shadow-md"
      />
      <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">
        Madi-Tota
        <sup className="ml-0.5 text-[0.4em] font-bold text-primary-foreground/70">™</sup>
      </h1>
      <p className="mt-3 max-w-md text-base font-medium text-primary-foreground/85">
        Coming soon.
      </p>
      <p className="mt-1 max-w-sm text-sm text-primary-foreground/70">
        {BRAND.tagline}
      </p>

      <div className="mt-10">
        {!showPasscode ? (
          <button
            type="button"
            onClick={() => setShowPasscode(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground/70 underline-offset-4 hover:text-primary-foreground hover:underline"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Have access?
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <Input
                type="password"
                autoFocus
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Passcode"
                className="w-48 border-white/40 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50"
                aria-label="Preview passcode"
              />
              <Button type="submit" variant="hero" size="default">
                Enter
              </Button>
            </div>
            {error && (
              <p className="text-xs font-medium text-destructive-foreground">
                That passcode isn&apos;t right.
              </p>
            )}
          </form>
        )}
      </div>

      <p className="mt-12 text-xs text-primary-foreground/60">
        {BRAND.owner} · {BRAND.email}
      </p>
    </div>
  );
}
