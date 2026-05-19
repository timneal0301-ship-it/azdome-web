import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import ProductBanners from "@/components/ProductBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import PressLogos from "@/components/PressLogos";
import ScenarioGrid from "@/components/ScenarioGrid";
import TechFeature from "@/components/TechFeature";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import VideoModal from "@/components/VideoModal";

const HERO_SLIDES: Slide[] = [
  {
    id: "m550-pro",
    eyebrow: "New · AZDOME M550 Pro",
    titleA: "Capture Every Detail,",
    titleB: "Day or Night.",
    subtitle:
      "True 4K Ultra HD at 3840×2160. Starvis-grade sensor with 6-layer IR night vision sees what your eyes miss — license plates, road signs, every detail.",
    image: "/images/banners/hero-1.jpg",
    primary: { label: "Shop M550 Pro", href: "/products/m550-pro" },
    secondary: { label: "Watch Video", href: "#watch-video" },
    tone: "dark",
  },
  {
    id: "pg17-pro",
    eyebrow: "Flagship · PG17 Pro Mirror",
    titleA: "Replace your mirror.",
    titleB: "Upgrade your view.",
    subtitle:
      "12-inch touchscreen mirror dash cam powered by the Sony STARVIS 2 IMX678 sensor. 4K front + 2.5K rear with dual HDR and ADAS alerts.",
    image: "/images/banners/hero-2.jpg",
    primary: { label: "Discover PG17 Pro", href: "/products/pg17-pro" },
    secondary: { label: "Compare models", href: "/collections/dash-cams" },
    tone: "dark",
  },
  {
    id: "m550-max",
    eyebrow: "Built for rideshare · M550 Max",
    titleA: "Three cameras.",
    titleB: "One mount.",
    subtitle:
      "Front 4K + cabin + rear, all on a single mount. Standard issue across 12 of the top 25 US rideshare cooperatives.",
    image: "/images/banners/hero-3.jpg",
    primary: { label: "Shop M550 Max", href: "/products/m550-max" },
    secondary: { label: "For rideshare drivers", href: "/scenarios/rideshare" },
    tone: "dark",
  },
  {
    id: "promo",
    eyebrow: "Limited time",
    titleA: "Save $20",
    titleB: "on your first order.",
    subtitle:
      "Sign up for the AZDOME newsletter and we'll send a $20 credit you can use on anything. Free shipping over $99.",
    image: "/images/banners/hero-4.jpg",
    primary: { label: "Get the offer", href: "/account/signup" },
    secondary: { label: "Shop dash cams", href: "/collections/dash-cams" },
    tone: "dark",
  },
];

export default function HomePage() {
  return (
    <main>
      <HeroCarousel slides={HERO_SLIDES} />
      <ProductBanners />
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
