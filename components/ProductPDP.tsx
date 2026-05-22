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
import type { SpecGroup } from "@/components/SpecsTable.data";
import type { Review } from "@/components/Reviews.data";
import type { FAQ } from "@/components/FaqAccordion.data";
import type { ImmersiveContent } from "@/components/ImmersiveFeature.data";
import type { FeatureBlock } from "@/components/FeatureSplit.data";
import type { BoxItem } from "@/components/WhatsInBox.data";
import type { UseCaseTab } from "@/components/UseCaseTabs.data";
import type { LayoutConfig } from "@/lib/content/layout";

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
  layout,
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
  layout?: LayoutConfig;
}) {
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const collectionHref =
    product.category === "accessory" ? "/collections/accessories" : "/collections/dash-cams";
  const collectionLabel =
    product.category === "accessory" ? "Accessories" : "Dash Cams";
  // If no layout config is passed, default every module to visible so the
  // PDP behaves like before. `false` only hides when explicitly set.
  const show = (key: string) => layout?.[key] !== false;

  return (
    <main>
      <ScrollProgress />
      {/* Top zone gets a soft slate-50 background so the area between
          the translucent navbar and the BuyBox doesn't read as a stark
          white slab when the user scrolls to the very top. The image
          card inside BuyBox is flipped to white so it still pops
          against the new surrounding tone. */}
      <div ref={buyBoxRef} className="bg-slate-50">
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
      {show("featureSplit") && <FeatureSplit features={features} />}
      {show("immersive") && <ImmersiveFeature content={immersive} />}
      {show("useCases") && <UseCaseTabs tabs={useCases} />}
      <VideoModal />
      {show("whatsInBox") && <WhatsInBox items={boxItems} />}
      {show("specs") && <SpecsTable specs={specs} />}
      {show("compare") && product.category === "dash-cam" && (
        <ProductCompare currentSlug={product.slug} />
      )}
      {show("reviews") && <Reviews reviews={reviews} />}
      {show("faq") && <FaqAccordion faqs={faqs} />}
      {show("related") && <RelatedProducts currentSlug={product.slug} />}
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
