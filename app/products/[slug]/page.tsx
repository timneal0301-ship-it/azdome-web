import { notFound } from "next/navigation";

import ProductPDP from "@/components/ProductPDP";
import { PRODUCTS } from "@/lib/products";
import { getProductWithOverlay } from "@/lib/products-server";
import { getLatestFirmware, getManualEntry } from "@/lib/downloads-server";
import { getContent } from "@/lib/content-server";
import {
  PDP_SPECS,
  PDP_REVIEWS,
  PDP_FAQ,
  PDP_IMMERSIVE,
  PDP_FEATURE_SPLIT,
  PDP_WHATS_IN_BOX,
  PDP_USE_CASES,
} from "@/lib/content/pdp";
import { PDP_LAYOUT } from "@/lib/content/layout";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductWithOverlay(params.slug);
  if (!product) return { title: "Product not found — AZDOME" };
  return {
    title: `${product.short} — AZDOME`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductWithOverlay(params.slug);
  if (!product) notFound();
  const [
    manual,
    firmware,
    specs,
    reviews,
    faqs,
    immersive,
    features,
    boxItems,
    useCases,
    layout,
  ] = await Promise.all([
    getManualEntry(params.slug),
    getLatestFirmware(params.slug),
    getContent(PDP_SPECS),
    getContent(PDP_REVIEWS),
    getContent(PDP_FAQ),
    getContent(PDP_IMMERSIVE),
    getContent(PDP_FEATURE_SPLIT),
    getContent(PDP_WHATS_IN_BOX),
    getContent(PDP_USE_CASES),
    getContent(PDP_LAYOUT),
  ]);
  return (
    <ProductPDP
      product={product}
      manual={manual}
      firmware={firmware}
      specs={specs}
      reviews={reviews}
      faqs={faqs}
      immersive={immersive}
      features={features}
      boxItems={boxItems}
      useCases={useCases}
      layout={layout}
    />
  );
}
