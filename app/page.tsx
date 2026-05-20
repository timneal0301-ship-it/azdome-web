import HeroCarousel from "@/components/HeroCarousel";
import ProductBanners from "@/components/ProductBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import PressLogos from "@/components/PressLogos";
import ScenarioGrid from "@/components/ScenarioGrid";
import TechFeature from "@/components/TechFeature";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import VideoModal from "@/components/VideoModal";
import { getContent } from "@/lib/content-server";
import { HOME_HERO, HOME_BANNERS } from "@/lib/content/home";
import { HOME_LAYOUT } from "@/lib/content/layout";

export default async function HomePage() {
  const [slides, banners, layout] = await Promise.all([
    getContent(HOME_HERO),
    getContent(HOME_BANNERS),
    getContent(HOME_LAYOUT),
  ]);
  return (
    <main>
      {layout.hero && <HeroCarousel slides={slides} />}
      {layout.banners && <ProductBanners banners={banners} />}
      {layout.press && <PressLogos />}
      {layout.featured && <FeaturedProducts />}
      {layout.video && <VideoModal />}
      {layout.scenarios && <ScenarioGrid />}
      {layout.tech && <TechFeature />}
      {layout.testimonials && <Testimonials />}
      {layout.newsletter && <Newsletter />}
    </main>
  );
}
