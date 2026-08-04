/**
 * BQ-017 — Option A fee model. SINGLE source of truth for every fee figure.
 *
 * Rules (locked):
 *   fee            = amount * rate / 100
 *   workerReceives = amount            <- the worker ALWAYS receives the full amount
 *   paydayDeduction= amount + fee
 *
 * Never display "amount minus fee" anywhere in the product.
 * No lending language (BR-08): this is access to already-earned wages.
 */

export type ProductId = "CHILL" | "ZAP";

export interface FeeQuote {
  amount: number;
  rate: number;
  fee: number;
  workerReceives: number;
  paydayDeduction: number;
  product: ProductId;
}

export const PRODUCT_RATES: Record<ProductId, number> = {
  CHILL: 5.8,
  ZAP: 11.1,
};

export function rateFor(product: ProductId): number {
  return PRODUCT_RATES[product];
}

export function quote(amount: number, product: ProductId): FeeQuote {
  const rate = rateFor(product);
  const safeAmount = Math.max(0, amount);
  const fee = (safeAmount * rate) / 100;
  return {
    amount: safeAmount,
    rate,
    fee,
    workerReceives: safeAmount,
    paydayDeduction: safeAmount + fee,
    product,
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
