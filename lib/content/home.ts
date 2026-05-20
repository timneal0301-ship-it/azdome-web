import type { ContentSection } from "./types";
import type { Slide } from "@/components/HeroCarousel";
import type { ProductBanner } from "@/components/ProductBanners";
import {
  DEFAULT_PROMISES,
  type Promise as PromiseItem,
} from "@/components/PromiseThreeCol.data";
import {
  DEFAULT_COMPARE,
  type CompareContent,
} from "@/components/PriceCompare.data";
import {
  DEFAULT_PRESS_QUOTES,
  type PressQuoteItem,
} from "@/components/PressQuotesStrip.data";
import {
  DEFAULT_FLASH_SALE,
  type FlashSaleContent,
} from "@/components/FlashSaleBar.data";

// ─── Hero carousel slides ──────────────────────────────────────────

export const HERO_SLIDES: Slide[] = [
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

export const HOME_HERO: ContentSection<Slide[]> = {
  key: "home.hero",
  label: "首页 Hero 轮播(4 张大 banner)",
  description:
    "每张 slide 含 eyebrow / titleA / titleB / subtitle / image / 主副 CTA。tone='dark' 时叠加深色渐变。",
  page: "home",
  previewHref: "/",
  defaults: HERO_SLIDES,
};

// ─── Mini bento banners ────────────────────────────────────────────

export const PRODUCT_BANNERS: ProductBanner[] = [
  {
    id: "m550-pro",
    eyebrow: "Best Seller",
    title: "M550 Pro",
    subtitle: "4K dual-channel · IR night vision",
    image: "/images/banners/mini-m550-pro.jpg",
    href: "/products/m550-pro",
    span: "lg:col-span-2 lg:row-span-2",
    tone: "dark",
    accent: "From $129.99",
  },
  {
    id: "m550-max",
    eyebrow: "New",
    title: "M550 Max",
    subtitle: "Three cameras. One mount.",
    image: "/images/banners/mini-m550-max.jpg",
    href: "/products/m550-max",
    tone: "dark",
    accent: "$139.99",
  },
  {
    id: "pg17-pro",
    eyebrow: "Flagship",
    title: "PG17 Pro Mirror",
    subtitle: '12" touchscreen · STARVIS 2',
    image: "/images/banners/mini-pg17.jpg",
    href: "/products/pg17-pro",
    tone: "dark",
    accent: "$279.99",
  },
  {
    id: "accessories",
    eyebrow: "Complete the kit",
    title: "Accessories",
    subtitle: "Hardwire kits · SD cards · mounts",
    image: "/images/banners/mini-accessories.jpg",
    href: "/collections/accessories",
    tone: "light",
  },
  {
    id: "scenarios",
    eyebrow: "Use cases",
    title: "Designed for your drive",
    subtitle: "Family · rideshare · 24h parking",
    image: "/images/banners/mini-scenarios.jpg",
    href: "/scenarios/family",
    span: "lg:col-span-2",
    tone: "dark",
  },
];

export const HOME_BANNERS: ContentSection<ProductBanner[]> = {
  key: "home.banners",
  label: "首页 Bento 小 banner(5 个产品入口卡)",
  description: "5 张 mini banner,span 控制网格占比。tone='dark' 用深色覆盖。",
  page: "home",
  previewHref: "/",
  defaults: PRODUCT_BANNERS,
};

// ─── New modules (promise / price-compare / press / flash sale) ─────

export const HOME_PROMISE: ContentSection<PromiseItem[]> = {
  key: "home.promise",
  label: "首页 · 售后承诺三栏(退货 / 保修 / 运费)",
  description: "信任信号:3 个标准承诺。iconName 从 PROMISE_ICONS 选。",
  page: "home",
  previewHref: "/",
  defaults: DEFAULT_PROMISES,
};

export const HOME_PRICE_COMPARE: ContentSection<CompareContent> = {
  key: "home.priceCompare",
  label: "首页 · 价格对比矩阵(vs 竞品)",
  description:
    "对比表。brands[] 是列(highlight: true 列显示蓝色高亮和 Best value 徽章),rows[].values 长度要与 brands[] 一致。✓ / ✗ / — 会渲染为图标,其他字符串原样显示。",
  page: "home",
  previewHref: "/",
  defaults: DEFAULT_COMPARE,
};

export const HOME_PRESS_STRIP: ContentSection<PressQuoteItem[]> = {
  key: "home.pressStrip",
  label: "首页 · 媒体引语轮播(深色横幅)",
  description: "每 6 秒自动轮换。在 admin 编辑器里给 quote 加 hidden:true 可临时下线某条。",
  page: "home",
  previewHref: "/",
  defaults: DEFAULT_PRESS_QUOTES,
};

export const HOME_FLASH_SALE: ContentSection<FlashSaleContent> = {
  key: "home.flashSale",
  label: "首页 · 顶部 Flash Sale 倒计时条",
  description:
    "active=true 才会显示。endsAt 是 ISO 时间(如 2026-06-30T23:59:00Z),到期后自动隐藏。dismissible=true 时用户可关闭(用 endsAt 作为 key 存 localStorage,新活动会自动重新出现)。",
  page: "home",
  previewHref: "/",
  defaults: DEFAULT_FLASH_SALE,
};
