import { Fragment } from "react";
import type { Metadata } from "next";

import {
  buildPathAlternates,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/i18n/url";
import HeroCarousel from "@/components/HeroCarousel";
import ProductBanners from "@/components/ProductBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import FlashSaleBar from "@/components/FlashSaleBar";
import PressLogos from "@/components/PressLogos";
import PressQuotesStrip from "@/components/PressQuotesStrip";
import PriceCompare from "@/components/PriceCompare";
import PromiseThreeCol from "@/components/PromiseThreeCol";
import ScenarioGrid from "@/components/ScenarioGrid";
import TechFeature from "@/components/TechFeature";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import VideoModal from "@/components/VideoModal";
import CertBadges from "@/components/CertBadges";
import { getContent } from "@/lib/content-server";
import {
  HOME_HERO,
  HOME_HERO_2,
  HOME_HERO_3,
  HOME_BANNERS,
  HOME_PROMISE,
  HOME_PRICE_COMPARE,
  HOME_PRESS_STRIP,
  HOME_FLASH_SALE,
} from "@/lib/content/home";
import {
  HOME_LAYOUT,
  HOME_LAYOUT_DEFAULTS,
  mergeLayoutWithDefaults,
} from "@/lib/content/layout";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return { alternates: buildPathAlternates(locale, "/") };
}

export default async function HomePage() {
  const [
    slides,
    slides2,
    slides3,
    banners,
    layout,
    promise,
    compare,
    pressStrip,
    flashSale,
  ] = await Promise.all([
    getContent(HOME_HERO),
    getContent(HOME_HERO_2),
    getContent(HOME_HERO_3),
    getContent(HOME_BANNERS),
    getContent(HOME_LAYOUT),
    getContent(HOME_PROMISE),
    getContent(HOME_PRICE_COMPARE),
    getContent(HOME_PRESS_STRIP),
    getContent(HOME_FLASH_SALE),
  ]);

  // Saved order wins; unknown keys appended from code defaults.
  const L = mergeLayoutWithDefaults(layout, HOME_LAYOUT_DEFAULTS);

  // Renderer registry: each key maps to the JSX to render IF the user
  // has the toggle on. Order is determined by L's key order, not by
  // entries in this object.
  const renderers: Record<string, React.ReactNode> = {
    hero: <HeroCarousel slides={slides} />,
    promise: <PromiseThreeCol promises={promise} />,
    banners: <ProductBanners banners={banners} />,
    press: <PressLogos />,
    featured: <FeaturedProducts />,
    // hero2 / hero3 sit between other sections — small mt gap so they
    // read as a distinct band rather than fused with the previous block.
    hero2:
      slides2.length > 0 ? (
        <div className="mt-1.5 md:mt-2">
          <HeroCarousel slides={slides2} />
        </div>
      ) : null,
    priceCompare: <PriceCompare content={compare} />,
    video: <VideoModal />,
    scenarios: <ScenarioGrid />,
    hero3:
      slides3.length > 0 ? (
        <div className="mt-1.5 md:mt-2">
          <HeroCarousel slides={slides3} />
        </div>
      ) : null,
    tech: <TechFeature />,
    pressStrip: <PressQuotesStrip quotes={pressStrip} />,
    certifications: <CertBadges variant="compact" />,
    testimonials: <Testimonials />,
    newsletter: <Newsletter />,
  };

  // flashSale is a special case — renders above <main>, ignores order.
  const inMainKeys = Object.keys(L).filter(
    (k) => k !== "flashSale" && renderers[k] !== undefined,
  );

  return (
    <>
      {L.flashSale && <FlashSaleBar content={flashSale} />}
      <main>
        {inMainKeys.map((key) =>
          L[key] && renderers[key] ? (
            <Fragment key={key}>{renderers[key]}</Fragment>
          ) : null,
        )}
      </main>
    </>
  );
}
