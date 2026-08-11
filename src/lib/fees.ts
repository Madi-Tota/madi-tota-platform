/**
 * AMENDMENT A1 — TRANSACTION ECONOMICS (supersedes all earlier fee logic).
 *
 * SINGLE shared calculation module used by the web demo, USSD sim, WhatsApp sim,
 * PWA prototype and employer portal. All money is handled in integer cents.
 *
 *   Fee              = round(A * r, 2)
 *   You receive      = A - Fee
 *   Payroll recovery = A            <- the fee is NEVER added to recovery
 *
 * Rates are configuration, never hard-coded in UI components.
 */

export type ProductId = "CHILL" | "ZAP";

/** Configurable rate table — the only place rates are defined. */
export const PRODUCT_RATES: Record<ProductId, number> = {
  CHILL: 5.8,
  ZAP: 11.1,
};

export const PRODUCTS: ProductId[] = ["CHILL", "ZAP"];

/** Monthly access cap as a percentage of monthly net pay. */
export const CAP_PERCENT = 20;

export interface FeeQuote {
  product: ProductId;
  rate: number;
  /** integer cents */
  amountCents: number;
  feeCents: number;
  netCents: number;
  payrollRecoveryCents: number;
  /** rand convenience values (already rounded to cents) */
  amount: number;
  fee: number;
  netReceived: number;
  payrollRecovery: number;
}

export const toCents = (rand: number) => Math.round(rand * 100);
export const fromCents = (cents: number) => cents / 100;

export function rateFor(product: ProductId): number {
  return PRODUCT_RATES[product];
}

export function quote(amount: number, product: ProductId): FeeQuote {
  const rate = rateFor(product);
  const amountCents = Math.max(0, toCents(amount));
  const feeCents = Math.round((amountCents * rate) / 100);
  const netCents = Math.max(0, amountCents - feeCents);
  return {
    product,
    rate,
    amountCents,
    feeCents,
    netCents,
    payrollRecoveryCents: amountCents,
    amount: fromCents(amountCents),
    fee: fromCents(feeCents),
    netReceived: fromCents(netCents),
    payrollRecovery: fromCents(amountCents),
  };
}

export const money = (n: number) =>
  "R" +
  n.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const money0 = (n: number) =>
  "R" + Math.round(n).toLocaleString("en-ZA", { maximumFractionDigits: 0 });

/** Governed confirmation line — identical wording on every channel. */
export function confirmationLine(q: FeeQuote): string {
  return `YOU ARE ACCESSING ${money0(q.amount)} · YOUR FEE ${money0(q.fee)} — ${q.product} ${q.rate}% · YOU RECEIVE ${money0(q.netReceived)} · PAYROLL RECOVERY ${money0(q.payrollRecovery)}`;
}

/** Governed consent statement — must be ticked (never pre-ticked) to transact. */
export const CONSENT_STATEMENT =
  "I understand the amount I am accessing, the fee I will pay and the amount that will be recovered from my payroll.";

/**
 * Remaining monthly capacity. Capacity is reduced by the REQUESTED amount,
 * never by the net amount received.
 */
export function remainingCapacity(
  capRand: number,
  priorRequestedRand: number,
  thisRequestRand = 0,
): number {
  const cents =
    toCents(capRand) - toCents(priorRequestedRand) - toCents(thisRequestRand);
  return fromCents(Math.max(0, cents));
}
