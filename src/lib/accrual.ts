/**
 * DEC-008 — Earned-wage accrual model. Single source of truth.
 *
 *   earned    = (net / workingDays) * daysWorked
 *   available = MAX(0, MIN(earned, net * 0.20) - priorDraws)
 *
 * Reference case: net R12,000 · 22 working days · 14 worked · R500 prior draws
 *                 => available R1,900
 */

export const ACCESS_CAP_PERCENT = 20;

export interface AccrualInput {
  netMonthlyPay: number;
  workingDays: number;
  daysWorked: number;
  priorDraws?: number;
}

export interface AccrualResult {
  earned: number;
  cap: number;
  available: number;
  priorDraws: number;
  /** 0–1 progress of the pay cycle, for the earnings bar. */
  progress: number;
}

export function accrual({
  netMonthlyPay,
  workingDays,
  daysWorked,
  priorDraws = 0,
}: AccrualInput): AccrualResult {
  const safeWorkingDays = Math.max(1, workingDays);
  const worked = Math.min(Math.max(0, daysWorked), safeWorkingDays);
  const earned = (netMonthlyPay / safeWorkingDays) * worked;
  const cap = (netMonthlyPay * ACCESS_CAP_PERCENT) / 100;
  const available = Math.max(0, Math.min(earned, cap) - priorDraws);
  return {
    earned,
    cap,
    available,
    priorDraws,
    progress: worked / safeWorkingDays,
  };
}
