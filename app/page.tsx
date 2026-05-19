import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import PressLogos from "@/components/PressLogos";
import ScenarioGrid from "@/components/ScenarioGrid";
import TechFeature from "@/components/TechFeature";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import VideoModal from "@/components/VideoModal";

export default function HomePage() {
  return (
    <main>
      <Hero />
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
