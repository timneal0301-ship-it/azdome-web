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
import ImmersiveFeature from "@/components/ImmersiveFeature";
import UseCaseTabs from "@/components/UseCaseTabs";
import ProductCompare from "@/components/ProductCompare";
import type { ProductDetail } from "@/lib/products";
import type { FirmwareRelease, Manual } from "@/lib/downloads";
import type { SpecGroup } from "@/components/SpecsTable";
import type { Review } from "@/components/Reviews";
import type { FAQ } from "@/components/FaqAccordion";
import type { ImmersiveContent } from "@/components/ImmersiveFeature";
import type { FeatureBlock } from "@/components/FeatureSplit";
import type { BoxItem } from "@/components/WhatsInBox";
import type { UseCaseTab } from "@/components/UseCaseTabs";

export default function ProductPDP({
  product,
  manual,
  firmware,
  specs,
  reviews,
  faqs,
  immersive,
  features,
  boxItems,
  useCases,
}: {
  product: ProductDetail;
  manual?: Manual;
  firmware?: FirmwareRelease;
  specs?: SpecGroup[];
  reviews?: Review[];
  faqs?: FAQ[];
  immersive?: ImmersiveContent;
  features?: FeatureBlock[];
  boxItems?: BoxItem[];
  useCases?: UseCaseTab[];
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
      <FeatureSplit features={features} />
      <ImmersiveFeature content={immersive} />
      <UseCaseTabs tabs={useCases} />
      <VideoModal />
      <WhatsInBox items={boxItems} />
      <SpecsTable specs={specs} />
      {product.category === "dash-cam" && <ProductCompare currentSlug={product.slug} />}
      <Reviews reviews={reviews} />
      <FaqAccordion faqs={faqs} />
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
