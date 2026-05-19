"use client";

import { useRef } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import ProductBuyBox from "@/components/ProductBuyBox";
import FeatureSplit from "@/components/FeatureSplit";
import VideoModal from "@/components/VideoModal";
import WhatsInBox from "@/components/WhatsInBox";
import SpecsTable from "@/components/SpecsTable";
import Reviews from "@/components/Reviews";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedProducts from "@/components/RelatedProducts";
import StickyBottomCTA from "@/components/StickyBottomCTA";
import ScrollProgress from "@/components/ScrollProgress";
import type { ProductDetail } from "@/lib/products";
import type { FirmwareRelease, Manual } from "@/lib/downloads";

export default function ProductPDP({
  product,
  manual,
  firmware,
}: {
  product: ProductDetail;
  manual?: Manual;
  firmware?: FirmwareRelease;
}) {
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const collectionHref =
    product.category === "accessory" ? "/collections/accessories" : "/collections/dash-cams";
  const collectionLabel =
    product.category === "accessory" ? "Accessories" : "Dash Cams";

  return (
    <main>
      <ScrollProgress />
      <div ref={buyBoxRef}>
        <div className="mx-auto max-w-7xl px-6 pt-28 md:pt-32 lg:px-10">
          <Breadcrumbs
            items={[
              { label: collectionLabel, href: collectionHref },
              { label: product.short },
            ]}
          />
        </div>
        <ProductBuyBox product={product} manual={manual} firmware={firmware} />
      </div>
      <FeatureSplit />
      <VideoModal />
      <WhatsInBox />
      <SpecsTable />
      <Reviews />
      <FaqAccordion />
      <RelatedProducts currentSlug={product.slug} />
      <StickyBottomCTA
        triggerRef={buyBoxRef}
        productSlug={product.slug}
        productName={product.name}
        image={product.image}
        price={product.price}
        comparePrice={product.comparePrice}
      />
    </main>
  );
}
