import { notFound } from "next/navigation";

import ProductPDP from "@/components/ProductPDP";
import { PRODUCTS, getProduct } from "@/lib/products";
import { getLatestFirmware, getManualEntry } from "@/lib/downloads-server";
import { getContent } from "@/lib/content-server";
import { PDP_SPECS, PDP_REVIEWS, PDP_FAQ, PDP_IMMERSIVE } from "@/lib/content/pdp";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
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
  const product = getProduct(params.slug);
  if (!product) notFound();
  const [manual, firmware, specs, reviews, faqs, immersive] = await Promise.all([
    getManualEntry(params.slug),
    getLatestFirmware(params.slug),
    getContent(PDP_SPECS),
    getContent(PDP_REVIEWS),
    getContent(PDP_FAQ),
    getContent(PDP_IMMERSIVE),
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
    />
  );
}
