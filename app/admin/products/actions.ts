"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { COOKIE, verifyToken } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { PRODUCTS, type ProductDetail } from "@/lib/products";

async function requireAuth() {
  const token = cookies().get(COOKIE)?.value;
  if (!(await verifyToken(token))) throw new Error("unauthorized");
}

export type Result =
  | { ok: true; message: string; hidden: boolean }
  | { ok: false; error: string };

export type FieldUpdateResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;
const BADGE_MAX = 32;
const TAGLINE_MAX = 140;
const PRICE_MAX = 100_000;

/**
 * Toggle the `hidden` flag on a single SKU and persist the full catalog
 * back to the KV overlay so visibility takes effect everywhere the
 * overlay is consulted (PDP, collection grids, search, etc.).
 *
 * When no overlay exists yet, we materialize one from the in-code seed
 * (PRODUCTS) so the toggle becomes the first override.
 */
export async function toggleProductHidden(slug: string): Promise<Result> {
  await requireAuth();
  if (!SLUG_RE.test(slug)) return { ok: false, error: "非法 slug" };

  const overlay = await db.get<ProductDetail[]>("content:catalog.products");
  const current = overlay ?? PRODUCTS;
  const idx = current.findIndex((p) => p.slug === slug);
  if (idx === -1) return { ok: false, error: "未知 SKU" };

  const target = current[idx];
  const updated = current.map((p, i) =>
    i === idx ? { ...p, hidden: !target.hidden } : p,
  );
  await db.set("content:catalog.products", updated);

  // Invalidate every page that reads the catalog overlay.
  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath("/admin");

  const nowHidden = !target.hidden;
  return {
    ok: true,
    message: nowHidden ? `${target.short} 已隐藏` : `${target.short} 已显示`,
    hidden: nowHidden,
  };
}

/**
 * Update merchandising fields on a single SKU (price, comparePrice, badge,
 * tagline). Same overlay-rewrite pattern as toggleProductHidden — reads
 * the catalog overlay (or seeds from PRODUCTS), patches the target entry,
 * writes back, revalidates.
 *
 * Each field is optional; `null` means "clear this field" (only meaningful
 * for the three non-required fields), `undefined` means "leave alone".
 * Price is required and must be > 0.
 */
export async function updateProductFields(
  slug: string,
  fields: {
    price?: number;
    comparePrice?: number | null;
    badge?: string | null;
    tagline?: string | null;
  },
): Promise<FieldUpdateResult> {
  await requireAuth();
  if (!SLUG_RE.test(slug)) return { ok: false, error: "非法 slug" };

  // ── Validate ────────────────────────────────────────────────────────
  if (fields.price !== undefined) {
    if (
      typeof fields.price !== "number" ||
      !Number.isFinite(fields.price) ||
      fields.price <= 0 ||
      fields.price > PRICE_MAX
    ) {
      return { ok: false, error: "价格必须是 0 到 100000 之间的数字" };
    }
  }
  if (fields.comparePrice !== undefined && fields.comparePrice !== null) {
    if (
      typeof fields.comparePrice !== "number" ||
      !Number.isFinite(fields.comparePrice) ||
      fields.comparePrice <= 0 ||
      fields.comparePrice > PRICE_MAX
    ) {
      return { ok: false, error: "对比价必须是正数" };
    }
  }
  if (fields.badge !== undefined && fields.badge !== null) {
    if (typeof fields.badge !== "string" || fields.badge.length > BADGE_MAX) {
      return { ok: false, error: `Badge 文本最长 ${BADGE_MAX} 字符` };
    }
  }
  if (fields.tagline !== undefined && fields.tagline !== null) {
    if (typeof fields.tagline !== "string" || fields.tagline.length > TAGLINE_MAX) {
      return { ok: false, error: `Tagline 最长 ${TAGLINE_MAX} 字符` };
    }
  }

  const overlay = await db.get<ProductDetail[]>("content:catalog.products");
  const current = overlay ?? PRODUCTS;
  const idx = current.findIndex((p) => p.slug === slug);
  if (idx === -1) return { ok: false, error: "未知 SKU" };

  const target = current[idx];
  const next: ProductDetail = { ...target };
  if (fields.price !== undefined) next.price = fields.price;
  if (fields.comparePrice !== undefined) {
    if (fields.comparePrice === null) delete next.comparePrice;
    else next.comparePrice = fields.comparePrice;
  }
  if (fields.badge !== undefined) {
    const trimmed = fields.badge?.trim();
    if (!trimmed) delete next.badge;
    else next.badge = trimmed;
  }
  if (fields.tagline !== undefined) {
    const trimmed = fields.tagline?.trim();
    if (!trimmed) delete next.tagline;
    else next.tagline = trimmed;
  }

  const updated = current.map((p, i) => (i === idx ? next : p));
  await db.set("content:catalog.products", updated);

  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${slug}`);
  revalidatePath(`/products/${slug}`, "page");

  return { ok: true, message: `${target.short} 已保存` };
}
