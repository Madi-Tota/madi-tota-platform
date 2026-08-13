import { ReactNode, useEffect, useState } from "react";
import { ComingSoon } from "@/components/ComingSoon";
import { isPreviewUnlocked, tryUnlockFromQuery } from "@/lib/previewAccess";

/**
 * Pre-launch wall for the custom domain. Wraps the whole app: nothing below
 * this component mounts (no routes, no data) until unlocked, so a public
 * visitor never gets more than the Coming Soon screen.
 *
 * Unlock via a shared link (?key=...), a passcode typed into ComingSoon, or
 * a prior unlock remembered in this browser (see src/lib/previewAccess.ts).
 */
export function PreviewGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => isPreviewUnlocked());

  useEffect(() => {
    if (unlocked) return;
    if (tryUnlockFromQuery(window.location.search)) {
      setUnlocked(true);
      // Drop the passcode out of the visible/shareable URL once it's done its job.
      window.history.replaceState({}, "", window.location.pathname + window.location.hash);
    }
  }, [unlocked]);

  if (!unlocked) {
    return <ComingSoon onUnlock={() => setUnlocked(true)} />;
  }

  return <>{children}</>;
}
