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

export default async function HomePage() {
  const [slides, banners] = await Promise.all([
    getContent(HOME_HERO),
    getContent(HOME_BANNERS),
  ]);
  return (
    <main>
      <HeroCarousel slides={slides} />
      <ProductBanners banners={banners} />
      <PressLogos />
      <FeaturedProducts />
      <VideoModal />
      <ScenarioGrid />
      <TechFeature />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
