import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zu from "./locales/zu.json";
import xh from "./locales/xh.json";
import af from "./locales/af.json";
import nso from "./locales/nso.json";

/**
 * i18n architecture is provisioned for all 12 official SA-relevant languages.
 * PILOT SET (shipped): en, zu, xh, af, nso.
 * All non-English strings currently fall back to English and are marked
 * "TRANSLATION PENDING HUMAN VERIFICATION" — no machine translation is shown
 * as if it were verified copy.
 */
export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", pilot: true },
  { code: "zu", label: "isiZulu", pilot: true },
  { code: "xh", label: "isiXhosa", pilot: true },
  { code: "af", label: "Afrikaans", pilot: true },
  { code: "nso", label: "Sepedi", pilot: true },
  { code: "tn", label: "Setswana", pilot: false },
  { code: "st", label: "Sesotho", pilot: false },
  { code: "ts", label: "Xitsonga", pilot: false },
  { code: "ss", label: "siSwati", pilot: false },
  { code: "ve", label: "Tshivenda", pilot: false },
  { code: "nr", label: "isiNdebele", pilot: false },
  { code: "sn", label: "Shona", pilot: false },
] as const;

export const PILOT_LANGUAGES = SUPPORTED_LANGUAGES.filter((l) => l.pilot);

export const LANGUAGE_STORAGE_KEY = "madi-tota.language";

/** Analytics hook — wired to a provider in a later sprint. */
export function fireLanguageSelected(code: string) {
  const detail = { event: "language_selected", language: code, ts: new Date().toISOString() };
  window.dispatchEvent(new CustomEvent("madi-tota:analytics", { detail }));
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zu: { translation: zu },
      xh: { translation: xh },
      af: { translation: af },
      nso: { translation: nso },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ["localStorage"],
    },
  });

export default i18n;
