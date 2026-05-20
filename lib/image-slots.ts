export type ImageGroup =
  | "brand"
  | "hero"
  | "banners"
  | "miniBanners"
  | "products"
  | "mega"
  | "scenarios"
  | "features"
  | "pdp"
  | "aplus"
  | "avatars"
  | "reviews";

export type ImageSlot = {
  key: string;
  label: string;
  group: ImageGroup;
  /** Path relative to public/ — must start with "images/" */
  path: string;
  width: number;
  height: number;
};

export const GROUPS: { key: ImageGroup; label: string }[] = [
  { key: "brand", label: "品牌 Logo" },
  { key: "banners", label: "首页 Hero Carousel 大 Banner" },
  { key: "miniBanners", label: "首页 Bento 小 Banner" },
  { key: "products", label: "产品图集" },
  { key: "mega", label: "Mega Menu 分类卡" },
  { key: "scenarios", label: "首页场景图" },
  { key: "features", label: "TechFeature 功能图" },
  { key: "pdp", label: "PDP 沉浸 / 用例 Tabs 图" },
  { key: "aplus", label: "A+ 长图文 & 其他" },
  { key: "avatars", label: "用户头像" },
  { key: "reviews", label: "评价照片" },
  // "hero" group is hidden from admin — its two slots (hero-poster
  // for the 404 page, video-poster for the video modal) rarely change.
  // Re-add { key: "hero", label: "Hero & 视频海报" } above to show them.
];

export const SLOTS: ImageSlot[] = [
  // Brand logos — admin uploads here override the inline-SVG wordmark.
  // Recommended: transparent PNG, ~384×60 (or similar 6.4:1 aspect ratio).
  { key: "logo-primary", label: "Logo · 主色(浅色背景)",   group: "brand", path: "images/brand/logo-primary.png", width: 384, height: 60 },
  { key: "logo-inverse", label: "Logo · 反白(深色背景)",   group: "brand", path: "images/brand/logo-inverse.png", width: 384, height: 60 },

  // Hero / Video poster — admin-hidden (not editable). 404 page and the
  // video modal pull these paths directly. Keep the files in /public.

  // Hero Carousel — multi-slide banners (★ 首页大图轮播 ★ 改这里 ★)
  { key: "banner-1", label: "★ 首页 Hero Slide 1 (M550 Pro)",   group: "banners", path: "images/banners/hero-1.jpg", width: 1920, height: 1080 },
  { key: "banner-2", label: "★ 首页 Hero Slide 2 (PG17 Pro)",   group: "banners", path: "images/banners/hero-2.jpg", width: 1920, height: 1080 },
  { key: "banner-3", label: "★ 首页 Hero Slide 3 (M550 Max)",   group: "banners", path: "images/banners/hero-3.jpg", width: 1920, height: 1080 },
  { key: "banner-4", label: "★ 首页 Hero Slide 4 (Promo)",      group: "banners", path: "images/banners/hero-4.jpg", width: 1920, height: 1080 },

  // Mini bento banners
  { key: "mini-m550-pro",     label: "Mini · M550 Pro",       group: "miniBanners", path: "images/banners/mini-m550-pro.jpg",     width: 1200, height: 900 },
  { key: "mini-m550-max",     label: "Mini · M550 Max",       group: "miniBanners", path: "images/banners/mini-m550-max.jpg",     width: 900,  height: 600 },
  { key: "mini-pg17",         label: "Mini · PG17 Pro",       group: "miniBanners", path: "images/banners/mini-pg17.jpg",         width: 900,  height: 600 },
  { key: "mini-accessories",  label: "Mini · Accessories",    group: "miniBanners", path: "images/banners/mini-accessories.jpg",  width: 900,  height: 600 },
  { key: "mini-scenarios",    label: "Mini · Scenarios 宽幅",  group: "miniBanners", path: "images/banners/mini-scenarios.jpg",    width: 1800, height: 600 },

  // PDP new modules
  { key: "pdp-immersive-night", label: "PDP 沉浸式 · 夜视背景", group: "pdp", path: "images/pdp/immersive-night.jpg", width: 1920, height: 1080 },
  { key: "pdp-use-family",      label: "PDP Tab · 家庭",        group: "pdp", path: "images/pdp/use-family.jpg",      width: 1400, height: 1100 },
  { key: "pdp-use-rideshare",   label: "PDP Tab · 网约车",      group: "pdp", path: "images/pdp/use-rideshare.jpg",   width: 1400, height: 1100 },
  { key: "pdp-use-parking",     label: "PDP Tab · 停车",        group: "pdp", path: "images/pdp/use-parking.jpg",     width: 1400, height: 1100 },

  // Products
  { key: "m550-front",   label: "M550 Pro · Front",      group: "products", path: "images/product/m550-front.jpg",    width: 1000, height: 1000 },
  { key: "m550-side",    label: "M550 Pro · Side",       group: "products", path: "images/product/m550-side.jpg",     width: 1000, height: 1000 },
  { key: "m550-mounted", label: "M550 Pro · Mounted",    group: "products", path: "images/product/m550-mounted.jpg",  width: 1000, height: 1000 },
  { key: "m550-app",     label: "M550 Pro · App",        group: "products", path: "images/product/m550-app.jpg",      width: 1000, height: 1000 },
  { key: "m550-night",   label: "M550 Pro · 夜拍样张",   group: "products", path: "images/product/m550-night.jpg",    width: 1000, height: 1000 },
  { key: "m27",          label: "M27",                   group: "products", path: "images/products/m27.jpg",          width: 1000, height: 1000 },
  { key: "m530",         label: "M530",                  group: "products", path: "images/products/m530.jpg",         width: 1000, height: 1000 },
  { key: "gs63h",        label: "GS63H",                 group: "products", path: "images/products/gs63h.jpg",        width: 1000, height: 1000 },
  { key: "m17",          label: "M17",                   group: "products", path: "images/products/m17.jpg",          width: 1000, height: 1000 },

  // Mega menu
  { key: "mega-dual",    label: "前后双录",        group: "mega", path: "images/mega/dual-channel.jpg", width: 800, height: 600 },
  { key: "mega-stealth", label: "隐藏式安装",      group: "mega", path: "images/mega/stealth.jpg",      width: 800, height: 600 },
  { key: "mega-screen",  label: "自带屏幕",        group: "mega", path: "images/mega/with-screen.jpg",  width: 800, height: 600 },

  // Scenarios
  { key: "scenario-family",    label: "家庭出游",   group: "scenarios", path: "images/scenarios/family.jpg",    width: 1400, height: 1200 },
  { key: "scenario-rideshare", label: "网约车",     group: "scenarios", path: "images/scenarios/rideshare.jpg", width: 900,  height: 700 },
  { key: "scenario-parking",   label: "24H 停车",   group: "scenarios", path: "images/scenarios/parking.jpg",   width: 900,  height: 700 },

  // Tech features
  { key: "feature-night", label: "夜视",        group: "features", path: "images/features/night-vision.jpg", width: 1200, height: 1400 },
  { key: "feature-wifi",  label: "5GHz WiFi",   group: "features", path: "images/features/wifi.jpg",         width: 1200, height: 1400 },
  { key: "feature-adas",  label: "AI ADAS",     group: "features", path: "images/features/adas.jpg",         width: 1200, height: 1400 },

  // A+ content
  { key: "aplus-4k",      label: "4K 细节",         group: "aplus", path: "images/aplus/4k-detail.jpg", width: 1400, height: 1100 },
  { key: "aplus-parking", label: "停车监控",        group: "aplus", path: "images/aplus/parking.jpg",   width: 1400, height: 1100 },
  { key: "aplus-app",     label: "App",             group: "aplus", path: "images/aplus/app.jpg",       width: 1400, height: 1100 },
  { key: "whatsinbox",    label: "What's in Box",   group: "aplus", path: "images/whatsinbox.jpg",      width: 1400, height: 1100 },
  { key: "about-hero",    label: "About 页 Hero",   group: "aplus", path: "images/about-hero.jpg",      width: 1400, height: 1100 },

  // Avatars
  { key: "avatar-marcus", label: "Marcus T.", group: "avatars", path: "images/avatars/marcus.jpg", width: 200, height: 200 },
  { key: "avatar-priya",  label: "Priya K.",  group: "avatars", path: "images/avatars/priya.jpg",  width: 200, height: 200 },
  { key: "avatar-daniel", label: "Daniel R.", group: "avatars", path: "images/avatars/daniel.jpg", width: 200, height: 200 },

  // Review photos
  { key: "review-1", label: "Sarah W. 评价照片", group: "reviews", path: "images/reviews/r1.jpg", width: 400, height: 400 },
  { key: "review-3", label: "Lena R. 评价照片",  group: "reviews", path: "images/reviews/r3.jpg", width: 400, height: 400 },
];

export function findSlot(key: string): ImageSlot | undefined {
  return SLOTS.find((s) => s.key === key);
}
