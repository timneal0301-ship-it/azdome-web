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

export async function getProductWithOverlay(
  slug: string,
): Promise<ProductDetail | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsBySlug(
  slugs: string[],
): Promise<ProductDetail[]> {
  const all = await getAllProducts();
  return slugs
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is ProductDetail => Boolean(p));
}
