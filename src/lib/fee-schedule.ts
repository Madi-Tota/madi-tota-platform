/**
 * GOVERNED SOURCE OF FEE CONSTANTS.
 *
 * Every fee, cap and employer-cost string rendered anywhere in the product
 * MUST read from this module (or from `@/lib/fees`, which it re-exports).
 * Never hardcode 5.8, 11.1, 20 or "R0" in a component.
 */

export { PRODUCT_RATES, rateFor, quote, money, money0 } from "./fees";
export type { ProductId, FeeQuote } from "./fees";

import { PRODUCT_RATES } from "./fees";

export const FEE_SCHEDULE = {
  chill: PRODUCT_RATES.CHILL, // 5.8 % per draw
  zap: PRODUCT_RATES.ZAP, // 11.1 % per draw
  monthlyCapPercent: 20, // % of monthly net pay
  employerCoreAccess: "R0",
} as const;

/** Pre-formatted display strings — use these in copy. */
export const FEE_LABELS = {
  chill: `${FEE_SCHEDULE.chill}%`,
  zap: `${FEE_SCHEDULE.zap}%`,
  cap: `${FEE_SCHEDULE.monthlyCapPercent}%`,
  employerCore: FEE_SCHEDULE.employerCoreAccess,
} as const;
