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

import { getAssetUrlMap } from "./asset-urls";
import { getContent } from "./content-server";
import { PRODUCT_CATALOG } from "./content/products";
import {
  PRODUCT_SLOT_COUNT,
  productSlotPath,
} from "./image-slots";
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

/**
 * PDP-facing read: merges any uploaded standard slot images
 * (`/images/products/<slug>/<N>.jpg`, N = 1..6) into the gallery, and
 * promotes slot-1 to the cover image if it's been uploaded. Admin can
 * always override `product.image` via catalog.products if they want a
 * non-slot-1 cover.
 */
export async function getProductForPDP(
  slug: string,
): Promise<ProductDetail | undefined> {
  const [product, assetMap] = await Promise.all([
    getProductWithOverlay(slug),
    getAssetUrlMap(),
  ]);
  if (!product) return undefined;

  // Collect uploaded standard slot images in order 1..6.
  const slotImages: ProductDetail["gallery"] = [];
  for (let i = 1; i <= PRODUCT_SLOT_COUNT; i++) {
    const path = `/${productSlotPath(slug, i)}`;
    if (assetMap[path] !== undefined) {
      slotImages.push({ src: path, alt: `${product.short} · 图 ${i}` });
    }
  }

  // Promote slot-1 to cover image when uploaded.
  const slot1Path = `/${productSlotPath(slug, 1)}`;
  const image = assetMap[slot1Path] !== undefined ? slot1Path : product.image;

  // Gallery = uploaded slot images first, then any legacy/admin-curated
  // entries that aren't already represented. Dedupe by src.
  const seen = new Set<string>();
  const gallery: ProductDetail["gallery"] = [];
  for (const item of [...slotImages, ...product.gallery]) {
    if (seen.has(item.src)) continue;
    seen.add(item.src);
    gallery.push(item);
  }

  return { ...product, image, gallery };
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
