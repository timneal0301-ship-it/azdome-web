import { notFound } from "next/navigation";

import ProductPDP from "@/components/ProductPDP";
import { PRODUCTS, getProduct } from "@/lib/products";
import { getLatestFirmware, getManualEntry } from "@/lib/downloads-server";

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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const manual = getManualEntry(params.slug);
  const firmware = getLatestFirmware(params.slug);
  return <ProductPDP product={product} manual={manual} firmware={firmware} />;
}
