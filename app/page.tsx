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
import { HOME_LAYOUT, HOME_LAYOUT_DEFAULTS } from "@/lib/content/layout";

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
  // Merge with in-code defaults so any module added after the admin last
  // saved /admin/content/layout.home (eg hero2 / hero3) still has its
  // default visibility instead of falling through as undefined → hidden.
  const L = { ...HOME_LAYOUT_DEFAULTS, ...layout };
  return (
    <>
      {L.flashSale && <FlashSaleBar content={flashSale} />}
      <main>
        {L.hero && <HeroCarousel slides={slides} />}
        {L.promise && <PromiseThreeCol promises={promise} />}
        {L.banners && <ProductBanners banners={banners} />}
        {L.press && <PressLogos />}
        {L.featured && <FeaturedProducts />}
        {L.hero2 && slides2.length > 0 && (
          <HeroCarousel slides={slides2} />
        )}
        {L.priceCompare && <PriceCompare content={compare} />}
        {L.video && <VideoModal />}
        {L.scenarios && <ScenarioGrid />}
        {L.hero3 && slides3.length > 0 && (
          <HeroCarousel slides={slides3} />
        )}
        {L.tech && <TechFeature />}
        {L.pressStrip && <PressQuotesStrip quotes={pressStrip} />}
        {L.testimonials && <Testimonials />}
        {L.newsletter && <Newsletter />}
      </main>
    </>
  );
}
