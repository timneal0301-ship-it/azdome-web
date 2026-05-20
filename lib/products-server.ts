// Server-only product catalog with admin overlay.
//
// `lib/products.ts` holds the in-code seed (PRODUCTS const). At runtime,
// these getters pull the overlay from KV — admin edits to the
// "catalog.products" ContentSection win.
//
// Client components keep importing PRODUCTS from "@/lib/products" for
// synchronous reads. They won't see admin edits until they receive the
// overlay-aware list as a prop from a server-component parent.

import "server-only";

import { getContent } from "./content-server";
import { PRODUCT_CATALOG } from "./content/products";
import { type ProductDetail } from "./products";

export async function getAllProducts(): Promise<ProductDetail[]> {
  return getContent(PRODUCT_CATALOG);
}

/**
 * For PDP detail pages — admins viewing a hidden product directly via URL
 * should still see it (so they can preview / un-hide). Honor `hidden` only
 * in list contexts (getVisibleProducts / getProductsBySlug).
 */
export async function getProductWithOverlay(
  slug: string,
): Promise<ProductDetail | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

/** Used by grids (Collection / Featured / Related) — drops hidden SKUs. */
export async function getVisibleProducts(): Promise<ProductDetail[]> {
  const all = await getAllProducts();
  return all.filter((p) => !p.hidden);
}

export async function getProductsBySlug(
  slugs: string[],
): Promise<ProductDetail[]> {
  const all = await getAllProducts();
  return slugs
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is ProductDetail => Boolean(p) && !p!.hidden);
}
