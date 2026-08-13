/**
 * Soft "coming soon" gate for the pre-launch custom domain.
 *
 * This is NOT real authentication — it's a client-side SPA with no backend,
 * so the code below is visible in the shipped bundle to anyone who looks.
 * Its job is to keep casual/public visitors on the domain from browsing the
 * full site, while making it trivial for the owner to share a working link
 * with investors. Do not use this pattern to gate anything that needs real
 * security (real user data, payments, etc).
 *
 * To change the passcode, edit PREVIEW_ACCESS_CODE below and redeploy —
 * that invalidates any previously shared link/passcode.
 */

export const PREVIEW_ACCESS_CODE = "maditota-investor-2026";

export const PREVIEW_QUERY_PARAM = "key";
const PREVIEW_UNLOCK_STORAGE_KEY = "madi-tota.preview-unlocked";

/** Shareable link that unlocks the site instantly for whoever opens it. */
export function previewUnlockUrl(origin: string): string {
  return `${origin}/?${PREVIEW_QUERY_PARAM}=${encodeURIComponent(PREVIEW_ACCESS_CODE)}`;
}

export function isPreviewUnlocked(): boolean {
  try {
    return window.localStorage.getItem(PREVIEW_UNLOCK_STORAGE_KEY) === "true";
  } catch {
    // localStorage unavailable (e.g. privacy mode) — fail closed.
    return false;
  }
}

function persistUnlock() {
  try {
    window.localStorage.setItem(PREVIEW_UNLOCK_STORAGE_KEY, "true");
  } catch {
    // Best-effort only; an in-memory unlock for this page view still works.
  }
}

/** Checks the current URL for `?key=<code>`. Unlocks and returns true on match. */
export function tryUnlockFromQuery(search: string): boolean {
  const code = new URLSearchParams(search).get(PREVIEW_QUERY_PARAM);
  if (code === PREVIEW_ACCESS_CODE) {
    persistUnlock();
    return true;
  }
  return false;
}

/** Manual passcode entry on the Coming Soon screen. */
export function tryUnlockFromPasscode(input: string): boolean {
  if (input.trim() === PREVIEW_ACCESS_CODE) {
    persistUnlock();
    return true;
  }
  return false;
}
