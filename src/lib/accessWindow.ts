/**
 * DEC-012 — Access window.
 * The window OPENS 7 days after payday and CLOSES 5 days before the next payday.
 * Supports monthly, weekly, fortnightly, bi-weekly and custom cycles.
 * There is no "next payday in 28 days" copy anywhere — always derived.
 */

export type PayCycle =
  | "monthly"
  | "weekly"
  | "fortnightly"
  | "bi-weekly"
  | "custom";

export const CYCLE_DAYS: Record<Exclude<PayCycle, "custom">, number> = {
  monthly: 30,
  weekly: 7,
  fortnightly: 14,
  "bi-weekly": 14,
};

export const WINDOW_OPENS_AFTER_PAYDAY_DAYS = 7;
export const WINDOW_CLOSES_BEFORE_PAYDAY_DAYS = 5;

export interface AccessWindow {
  cycleDays: number;
  opensOnDay: number;
  closesOnDay: number;
  daysSincePayday: number;
  daysToNextPayday: number;
  isOpen: boolean;
  status: "pending" | "open" | "closed";
  label: string;
}

export function cycleLength(cycle: PayCycle, customDays = 30): number {
  return cycle === "custom" ? Math.max(7, customDays) : CYCLE_DAYS[cycle];
}

export function accessWindow(
  cycle: PayCycle,
  daysSincePayday: number,
  customDays = 30,
): AccessWindow {
  const cycleDays = cycleLength(cycle, customDays);
  const opensOnDay = Math.min(WINDOW_OPENS_AFTER_PAYDAY_DAYS, cycleDays - 1);
  const closesOnDay = Math.max(
    opensOnDay,
    cycleDays - WINDOW_CLOSES_BEFORE_PAYDAY_DAYS,
  );
  const day = Math.max(0, Math.min(daysSincePayday, cycleDays));
  const daysToNextPayday = Math.max(0, cycleDays - day);

  let status: AccessWindow["status"] = "open";
  if (day < opensOnDay) status = "pending";
  else if (day > closesOnDay) status = "closed";

  const label =
    status === "pending"
      ? `Access window opens in ${opensOnDay - day} day${opensOnDay - day === 1 ? "" : "s"}`
      : status === "open"
        ? `Access window closes in ${closesOnDay - day} day${closesOnDay - day === 1 ? "" : "s"}`
        : `Access window closed until the next pay cycle (${daysToNextPayday} day${daysToNextPayday === 1 ? "" : "s"})`;

  return {
    cycleDays,
    opensOnDay,
    closesOnDay,
    daysSincePayday: day,
    daysToNextPayday,
    isOpen: status === "open",
    status,
    label,
  };
}

/**
 * AMENDMENT A1 — employer-configured access window.
 * OPEN  = payday + 7 days
 * CLOSED = next payday − 5 days
 * If the employer's pay dates are unknown, the window FAILS CLOSED.
 */
export const WINDOW_CLOSED_MESSAGE =
  "Your access window is closed. Wage access opens 7 days after payday and closes 5 days before the next payday. Please try again once your next window opens.";

export const WINDOW_UNKNOWN_MESSAGE =
  "We cannot confirm your employer's pay dates, so access is closed. Please contact your employer's payroll administrator.";

export interface EmployerWindowConfig {
  /** ISO date of the last payday, or undefined if unknown. */
  lastPayday?: string;
  /** ISO date of the next payday, or undefined if unknown. */
  nextPayday?: string;
}

export interface EmployerWindowResult {
  isOpen: boolean;
  status: "open" | "closed" | "unknown";
  message: string;
}

const DAY = 86_400_000;

export function employerAccessWindow(
  config: EmployerWindowConfig,
  today: Date = new Date(),
): EmployerWindowResult {
  const last = config.lastPayday ? new Date(config.lastPayday) : null;
  const next = config.nextPayday ? new Date(config.nextPayday) : null;
  if (
    !last ||
    !next ||
    Number.isNaN(last.getTime()) ||
    Number.isNaN(next.getTime())
  ) {
    // Fail closed.
    return { isOpen: false, status: "unknown", message: WINDOW_UNKNOWN_MESSAGE };
  }
  const opens = last.getTime() + WINDOW_OPENS_AFTER_PAYDAY_DAYS * DAY;
  const closes = next.getTime() - WINDOW_CLOSES_BEFORE_PAYDAY_DAYS * DAY;
  const now = today.getTime();
  const isOpen = now >= opens && now <= closes;
  return {
    isOpen,
    status: isOpen ? "open" : "closed",
    message: isOpen
      ? "Your access window is open."
      : WINDOW_CLOSED_MESSAGE,
  };
}
