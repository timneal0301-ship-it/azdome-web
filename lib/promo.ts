// Promo code domain model + server-side store. Codes live in KV under
// `promo:{CODE}` keys (uppercased). Admin CRUD and cart application both
// go through this module so the validation rules stay in one place.

import "server-only";

import { db } from "./db";

export type PromoType = "percent" | "amount";

export type Promo = {
  /** Uppercased primary key (e.g., "WELCOME20"). */
  code: string;
  type: PromoType;
  /** Percent (1–100) when type === "percent", USD when type === "amount". */
  value: number;
  /** Minimum cart subtotal in USD required to use the code. */
  minSubtotal?: number;
  /** ISO date string. After this, code is rejected. */
  expiresAt?: string;
  /** Toggle without deleting — handy for seasonal rotation. */
  active: boolean;
  /** Operator-only note (campaign name, etc.). Not shown to customers. */
  note?: string;
  createdAt: string;
};

const CODE_RE = /^[A-Z0-9][A-Z0-9_-]{1,31}$/;
const PROMO_KEY_PREFIX = "promo:";

export function normalizeCode(input: string): string {
  return input.trim().toUpperCase();
}

export function isValidCodeFormat(code: string): boolean {
  return CODE_RE.test(code);
}

function promoKey(code: string): string {
  return `${PROMO_KEY_PREFIX}${code}`;
}

export async function listPromos(): Promise<Promo[]> {
  const keys = await db.keys(PROMO_KEY_PREFIX);
  if (keys.length === 0) return [];
  const promos = await Promise.all(
    keys.map((k) => db.get<Promo>(k).then((p) => p ?? null)),
  );
  return promos
    .filter((p): p is Promo => p !== null)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getPromo(code: string): Promise<Promo | undefined> {
  const normalized = normalizeCode(code);
  if (!isValidCodeFormat(normalized)) return undefined;
  return db.get<Promo>(promoKey(normalized));
}

export async function savePromo(promo: Promo): Promise<void> {
  await db.set(promoKey(promo.code), promo);
}

export async function deletePromo(code: string): Promise<void> {
  const normalized = normalizeCode(code);
  if (!isValidCodeFormat(normalized)) return;
  await db.delete(promoKey(normalized));
}

// ── Pure validation (no IO) — reused at cart-apply and at checkout ──

export type ValidatePromoResult =
  | {
      ok: true;
      code: string;
      type: PromoType;
      value: number;
      /** USD discount the promo produces against `subtotal`. */
      discount: number;
    }
  | { ok: false; reason: PromoRejection };

export type PromoRejection =
  | "not-found"
  | "inactive"
  | "expired"
  | "min-subtotal"
  | "zero-subtotal";

/**
 * Apply a promo to a subtotal and surface the resulting discount, or a
 * specific rejection reason. The caller renders user-facing messages so
 * locale-correct copy lives in the UI, not in the domain.
 */
export function validatePromoAgainstSubtotal(
  promo: Promo | undefined,
  subtotal: number,
): ValidatePromoResult {
  if (!promo) return { ok: false, reason: "not-found" };
  if (!promo.active) return { ok: false, reason: "inactive" };
  if (promo.expiresAt && new Date(promo.expiresAt).getTime() < Date.now()) {
    return { ok: false, reason: "expired" };
  }
  if (subtotal <= 0) return { ok: false, reason: "zero-subtotal" };
  if (promo.minSubtotal != null && subtotal < promo.minSubtotal) {
    return { ok: false, reason: "min-subtotal" };
  }
  const raw =
    promo.type === "percent"
      ? subtotal * (promo.value / 100)
      : promo.value;
  // Never exceed the subtotal — discount caps at the cart total.
  const discount = Math.min(raw, subtotal);
  // Round to cents to match the rest of the catalog math.
  const rounded = Math.round(discount * 100) / 100;
  return {
    ok: true,
    code: promo.code,
    type: promo.type,
    value: promo.value,
    discount: rounded,
  };
}
