import type { ContentSection } from "./types";
import { DEFAULT_SPECS } from "@/components/SpecsTable.data";
import { DEFAULT_REVIEWS } from "@/components/Reviews.data";
import { DEFAULT_FAQS, getDefaultFaqs } from "@/components/FaqAccordion.data";
import { DEFAULT_IMMERSIVE, getDefaultImmersive } from "@/components/ImmersiveFeature.data";
import {
  DEFAULT_FEATURES,
  FEATURE_SPLIT_ICONS,
} from "@/components/FeatureSplit.data";
import {
  DEFAULT_BOX_ITEMS,
  getDefaultBoxItems,
  WHATS_IN_BOX_ICONS,
} from "@/components/WhatsInBox.data";
import {
  DEFAULT_USE_CASE_TABS,
  USE_CASE_ICONS,
} from "@/components/UseCaseTabs.data";

export const PDP_SPECS: ContentSection<typeof DEFAULT_SPECS> = {
  key: "pdp.specs",
  label: "PDP · 规格表(5 组,每组 N 行)",
  description:
    "产品详情页中段的规格列表。M550 Pro 的真实硬件参数,其他型号默认共享同一份。",
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: DEFAULT_SPECS,
};

export const PDP_REVIEWS: ContentSection<typeof DEFAULT_REVIEWS> = {
  key: "pdp.reviews",
  label: "PDP · 用户评价(4 张)",
  description:
    "PDP 底部「客户评价」区的 4 张种子评论。包含标题 / 正文 / 星级 / 姓名 / 日期 / 可选 verified+photo。",
  page: "pdp",
  previewHref: "/products/m550-pro#reviews",
  defaults: DEFAULT_REVIEWS,
};

export const PDP_FAQ: ContentSection<typeof DEFAULT_FAQS> = {
  key: "pdp.faq",
  label: "PDP · FAQ(6 个问题)",
  description: "PDP 的常见问题手风琴。`q` 是问题,`a` 是答案。",
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: getDefaultFaqs,
};

export const PDP_IMMERSIVE: ContentSection<typeof DEFAULT_IMMERSIVE> = {
  key: "pdp.immersive",
  label: "PDP · 沉浸式 Section(深色全屏)",
  description:
    "夜景背景上的大标题区域。titleA 后会跟一个蓝色渐变 titleB,底部 4 项 stat 指标。",
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: getDefaultImmersive,
};

export const PDP_FEATURE_SPLIT: ContentSection<typeof DEFAULT_FEATURES> = {
  key: "pdp.feature-split",
  label: "PDP · 图文交替 Section(3 项核心特性)",
  description: `三段 image + 文案。 iconName 可选值: ${FEATURE_SPLIT_ICONS.join(", ")}`,
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: DEFAULT_FEATURES,
};

export const PDP_WHATS_IN_BOX: ContentSection<typeof DEFAULT_BOX_ITEMS> = {
  key: "pdp.whats-in-box",
  label: "PDP · 开箱清单(6 项)",
  description: `What's-in-the-Box 6 条目。 iconName 可选值: ${WHATS_IN_BOX_ICONS.join(", ")}`,
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: getDefaultBoxItems,
};

export const PDP_USE_CASES: ContentSection<typeof DEFAULT_USE_CASE_TABS> = {
  key: "pdp.use-cases",
  label: "PDP · 应用场景 Tabs(3 项)",
  description: `Family / Rideshare / Parking tab。 iconName 可选值: ${USE_CASE_ICONS.join(", ")}`,
  page: "pdp",
  previewHref: "/products/m550-pro",
  defaults: DEFAULT_USE_CASE_TABS,
};
