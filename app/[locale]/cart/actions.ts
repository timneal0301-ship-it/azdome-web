"use server";

import {
  getPromo,
  normalizeCode,
  validatePromoAgainstSubtotal,
  type ValidatePromoResult,
} from "@/lib/promo";

// Public-facing promo lookup. Called from the cart drawer on Apply.
// Doesn't require auth — promo codes are public input — but does the
// full validation chain so the client can't fake a discount: the
// response always reflects the *current* state of the promo in KV.
export async function lookupPromo(
  code: string,
  subtotal: number,
): Promise<ValidatePromoResult> {
  const normalized = normalizeCode(code);
  const promo = await getPromo(normalized);
  // Re-validate even after a successful match — covers the case where
  // subtotal arrives stale or the promo was toggled off between the
  // client's last read and now.
  const safeSubtotal = Number.isFinite(subtotal) ? Math.max(0, subtotal) : 0;
  return validatePromoAgainstSubtotal(promo, safeSubtotal);
}
