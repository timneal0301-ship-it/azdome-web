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

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

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
