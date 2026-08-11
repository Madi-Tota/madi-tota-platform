import { describe, expect, it } from "vitest";
import { accrual } from "@/lib/accrual";
import { quote } from "@/lib/fees";

describe("accrual (DEC-008)", () => {
  it("reference case R12,000 / 22 / 14 / R500 = R1,900", () => {
    const r = accrual({
      netMonthlyPay: 12000,
      workingDays: 22,
      daysWorked: 14,
      priorDraws: 500,
    });
    expect(Math.round(r.available)).toBe(1900);
  });

  it("never returns a negative available amount", () => {
    const r = accrual({
      netMonthlyPay: 12000,
      workingDays: 22,
      daysWorked: 2,
      priorDraws: 5000,
    });
    expect(r.available).toBe(0);
  });

  it("caps availability at 20% of net pay", () => {
    const r = accrual({ netMonthlyPay: 12000, workingDays: 22, daysWorked: 22 });
    expect(r.available).toBe(2400);
  });
});

describe("fees (Amendment A1)", () => {
  it("fee is deducted from the payout and recovery equals the requested amount", () => {
    const q = quote(1000, "CHILL");
    expect(q.fee).toBeCloseTo(58);
    expect(q.netReceived).toBeCloseTo(942);
    expect(q.payrollRecovery).toBe(1000);
  });

  it("ZAP uses the configured 11.1% rate", () => {
    const q = quote(1000, "ZAP");
    expect(q.feeCents).toBe(11100);
    expect(q.netCents).toBe(88900);
    expect(q.payrollRecoveryCents).toBe(100000);
  });
});

