import { notFound } from "next/navigation";

import ProductPDP from "@/components/ProductPDP";
import { PRODUCTS, type ProductDetail } from "@/lib/products";
import { getProductForPDP, getProductWithOverlay } from "@/lib/products-server";
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
import { getSpecsForSlug } from "@/components/SpecsTable.data";
import { getCurrentLocale } from "@/lib/i18n/server";
import { buildPathAlternates, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n/url";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const product = await getProductWithOverlay(params.slug);
  if (!product) return { title: "Product not found — AZDOME" };
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const alternates = buildPathAlternates(locale, `/products/${product.slug}`);
  const ogImage = product.image.startsWith("http")
    ? product.image
    : `https://azdome.com${product.image}`;
  return {
    title: `${product.short} — AZDOME`,
    description: product.description,
    alternates,
    openGraph: {
      title: `${product.name} — AZDOME`,
      description: product.description,
      url: alternates.canonical,
      type: "website",
      images: [{ url: ogImage, alt: product.short }],
    },
  };
}

/** Build Schema.org Product JSON-LD for a single PDP. */
function buildProductJsonLd(p: ProductDetail) {
  const url = `https://azdome.com/products/${p.slug}`;
  const image = p.image.startsWith("http")
    ? p.image
    : `https://azdome.com${p.image}`;
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url,
    priceCurrency: "USD",
    price: p.price.toFixed(2),
    availability: p.hidden
      ? "https://schema.org/Discontinued"
      : "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image,
    sku: p.slug,
    brand: { "@type": "Brand", name: "AZDOME" },
    category: p.category === "dash-cam" ? "Dash Camera" : "Dash Cam Accessory",
    ...(p.channels && { additionalProperty: [{ "@type": "PropertyValue", name: "channels", value: p.channels }] }),
    offers: offer,
    ...(p.rating != null && p.reviewCount != null && p.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating.toFixed(1),
        reviewCount: p.reviewCount,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductForPDP(params.slug);
  if (!product) notFound();
  const locale = getCurrentLocale();
  const [
    manual,
    firmware,
    contentSpecs,
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
  // M550 Pro keeps its admin-editable spec sheet via the content system;
  // other SKUs use the slug-specific seed (EN-only for now).
  const specs =
    params.slug === "m550-pro" ? contentSpecs : getSpecsForSlug(params.slug, locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductJsonLd(product)),
        }}
      />
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
    </>
  );
}
