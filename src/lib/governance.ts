/**
 * EXPERIENCE FREEZE v1.0 — governed strings and consent evidence model.
 * Every legal / doctrine sentence rendered in the UI comes from this file.
 */

import { money0, type FeeQuote } from "./fees";

/** Item 1 — locked transaction doctrine. Rendered wherever money is shown. */
export const DOCTRINE_LINE =
  "The fee is deducted before disbursement. Payroll recovery equals the worker's requested amount.";

/** Item 3 — the ONLY permitted regulatory sentence. */
export const REGULATORY_STATEMENT =
  "Madi-Tota is designed around access to earned wages rather than conventional credit. Regulatory classification remains subject to independent legal counsel opinion.";

/** Item 2 — VAS / airtime is never part of the wage-access fee flow. */
export const VAS_SEPARATION_LABEL =
  "Separate commercial model — pending policy approval.";

/** Item 4 — governed agreement version and labels. */
export const AGREEMENT_VERSION = "1.0";
export const LEGAL_REVIEW_LABEL =
  "Wording subject to Legal Counsel review before production.";
export const DEMO_ONLY_LABEL =
  "Demonstration only — production workflow pending build.";
export const HASH_LABEL =
  "Prototype architecture — cryptographic immutability pending production verification.";

export const AGREEMENT_CONSENT_STATEMENT = `You are requesting access under the Madi-Tota Worker Agreement, version ${AGREEMENT_VERSION}. Your fee and recovery amount are shown below. I agree.`;

/** Material terms of the Worker Agreement, in plain language. */
export const AGREEMENT_TERMS = [
  "You may request access only to wages you have already earned, up to 20% of your monthly net pay.",
  "A single disclosed fee applies to each request: CHILL 5.8% or ZAP 11.1% of the requested amount.",
  "The fee is deducted before disbursement — you receive the requested amount less the fee.",
  "Payroll recovery equals your requested amount and is collected once, on your next payday.",
  "No interest, no rollover and no additional amount is added after confirmation.",
  "Your employer must authorise the payroll deduction and you must consent before activation.",
];

export interface ConsentRecord {
  workerId: string;
  employer: string;
  agreementVersion: string;
  timestamp: string;
  consented: boolean;
  referenceId: string;
}

const STORE_KEY = "mt-consent-evidence";

export function makeReference(seed = Date.now()): string {
  return (
    "MT-" +
    Math.abs(Math.round(seed % 2176782336))
      .toString(36)
      .toUpperCase()
      .padStart(6, "0")
      .slice(0, 6)
  );
}

/** Prototype-only pseudo hash — never presented as cryptographic proof. */
export function prototypeHash(record: ConsentRecord): string {
  const input = JSON.stringify(record);
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").repeat(4);
}

export function recordConsent(record: ConsentRecord): ConsentRecord {
  try {
    const all = readConsentEvidence();
    localStorage.setItem(STORE_KEY, JSON.stringify([record, ...all].slice(0, 25)));
  } catch {
    /* simulation only — storage failures are non-fatal */
  }
  return record;
}

export function readConsentEvidence(): ConsentRecord[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as ConsentRecord[]) : [];
  } catch {
    return [];
  }
}

/** Governed four-figure summary used by receipts and demo strips. */
export function figures(q: FeeQuote) {
  return [
    { k: "Requested", v: money0(q.amount) },
    { k: `Fee (${q.product} ${q.rate}%)`, v: money0(q.fee) },
    { k: "You receive", v: money0(q.netReceived) },
    { k: "Payroll recovery", v: money0(q.payrollRecovery) },
  ];
}
