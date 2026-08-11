/**
 * VAS / airtime pricing — DELIBERATELY SEPARATE from the EWA engine.
 * No VAS value may be derived from, or applied to, a wage-access quote.
 * Every field below is configuration; nothing is hard-coded in the UI.
 */

export type SettlementStatus = "pending" | "settled" | "failed";

export interface VasPricing {
  /** Face value of the product, in cents. */
  productCostCents: number;
  /** Madi-Tota service fee, in cents. */
  serviceFeeCents: number;
  /** What the supplier charges us, in cents. */
  supplierCostCents: number;
}

export interface VasQuote extends VasPricing {
  totalCents: number;
  marginCents: number;
  disclosure: string;
  settlement: SettlementStatus;
}

/** Editable pricing block — configuration only. */
export const VAS_PRICING: Record<string, VasPricing> = {
  airtime: {
    productCostCents: 3000,
    serviceFeeCents: 50,
    supplierCostCents: 2910,
  },
  data: {
    productCostCents: 5000,
    serviceFeeCents: 100,
    supplierCostCents: 4850,
  },
  electricity: {
    productCostCents: 10000,
    serviceFeeCents: 150,
    supplierCostCents: 9800,
  },
};

export const VAS_DISCLOSURE =
  "Value-added services are priced separately from wage access. The product cost and the service fee are shown before you confirm.";

export function vasQuote(
  productKey: keyof typeof VAS_PRICING | string,
  settlement: SettlementStatus = "pending",
): VasQuote | null {
  const p = VAS_PRICING[productKey];
  if (!p) return null;
  const totalCents = p.productCostCents + p.serviceFeeCents;
  return {
    ...p,
    totalCents,
    marginCents: totalCents - p.supplierCostCents,
    disclosure: VAS_DISCLOSURE,
    settlement,
  };
}
