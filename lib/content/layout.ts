// Page-level visibility toggles. Admin can hide whole modules
// (sections / blocks) on the homepage and PDP without editing JSON.
//
// Each layout config is a flat { moduleId: boolean } map. The admin UI
// detects ContentSections whose page === "layout" and renders a
// checkbox-toggle UI instead of the raw JSON textarea.

import type { ContentSection } from "./types";

export type LayoutConfig = Record<string, boolean>;

/**
 * Merge a saved layout override with the in-code defaults so:
 *  - The user's saved key ORDER is preserved (object insertion order in
 *    JavaScript persists through JSON.parse / structuredClone, so reads
 *    of the saved value reflect the user's drag-reordering).
 *  - Keys present in defaults but missing from the override (new modules
 *    added in code after the user last saved) are appended at the end
 *    with their default visibility.
 */
export function mergeLayoutWithDefaults(
  override: LayoutConfig,
  defaults: LayoutConfig,
): LayoutConfig {
  const result: LayoutConfig = {};
  for (const k of Object.keys(override)) {
    result[k] = override[k];
  }
  for (const k of Object.keys(defaults)) {
    if (!(k in result)) result[k] = defaults[k];
  }
  return result;
}

/** Module visibility for the homepage. Add new modules as the home grows. */
export const HOME_LAYOUT_DEFAULTS: LayoutConfig = {
  flashSale: false,     // FlashSaleBar (default OFF — turn on for promos)
  hero: true,           // HeroCarousel (top)
  promise: true,        // PromiseThreeCol (trust signals)
  banners: true,        // ProductBanners (bento grid)
  press: true,          // PressLogos
  featured: true,       // FeaturedProducts
  hero2: true,          // Mid-page Hero band (between Featured and PriceCompare)
  priceCompare: true,   // PriceCompare matrix
  video: true,          // VideoModal (the watch-video CTA target)
  scenarios: true,      // ScenarioGrid
  hero3: false,         // Optional lower Hero band (between Scenarios and Tech)
  tech: true,           // TechFeature
  pressStrip: true,     // PressQuotesStrip (rotating quote)
  testimonials: true,   // Testimonials
  newsletter: true,     // Newsletter
};

export const HOME_LAYOUT: ContentSection<LayoutConfig> = {
  key: "layout.home",
  label: "首页 · 模块开关",
  description:
    "勾选 = 显示, 取消勾选 = 隐藏整块。关掉某块,前台直接跳过渲染。新增模块要在 lib/content/layout.ts 里注册。",
  page: "layout",
  previewHref: "/",
  defaults: HOME_LAYOUT_DEFAULTS,
};

/** Module visibility for the PDP. BuyBox is always shown (core). */
export const PDP_LAYOUT_DEFAULTS: LayoutConfig = {
  immersive: true,      // ImmersiveFeature (深色全屏)
  featureSplit: true,   // FeatureSplit (3 段交替图文)
  specs: true,          // SpecsTable
  whatsInBox: true,     // WhatsInBox
  useCases: true,       // UseCaseTabs
  reviews: true,        // Reviews
  faq: true,            // FaqAccordion
  related: true,        // RelatedProducts
  compare: true,        // ProductCompare
};

export const PDP_LAYOUT: ContentSection<LayoutConfig> = {
  key: "layout.pdp",
  label: "PDP · 模块开关",
  description:
    "产品详情页每个段落的显示开关。BuyBox(标题/图集/购买区)始终显示。",
  page: "layout",
  previewHref: "/products/m550-pro",
  defaults: PDP_LAYOUT_DEFAULTS,
};
