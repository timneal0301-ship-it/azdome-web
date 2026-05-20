// Schemas describing the shape of each editable content array, so the
// admin /admin/content/[key] page can render a typed form (add row /
// move / hide / delete) instead of a raw JSON textarea.
//
// Two registries:
//   ARRAY_SCHEMAS         — section.defaults is itself an array
//   OBJECT_SECTION_SCHEMAS — section.defaults is { foo: [...], bar: [...] }
//                            (about / careers / wholesale / etc.)
//
// Anything not registered here still falls back to the JSON editor.

import {
  ABOUT_VALUE_ICONS,
  ABOUT_COMMITMENT_ICONS,
} from "./about";
import {
  AFFILIATE_STAT_ICONS,
  AFFILIATE_STEP_ICONS,
} from "./affiliate";
import {
  CAREER_VALUE_ICONS,
  CAREER_BENEFIT_ICONS,
} from "./careers";
import { PRESS_KIT_ICONS } from "./press";
import {
  WHOLESALE_BENEFIT_ICONS,
  WHOLESALE_VERTICAL_ICONS,
} from "./wholesale";
import { APP_FEATURE_ICONS } from "./app-page";

export type PrimitiveKind =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "url"
  | "image"
  | "select";

export type FieldSpec =
  | {
      kind: PrimitiveKind;
      label: string;
      placeholder?: string;
      hint?: string;
      options?: { value: string; label: string }[];
      rows?: number;
      /** If true, an inline "✕ 清除" button is shown; cleared fields render
       * nothing on the public site (consumers use truthy guards). */
      optional?: boolean;
    }
  | {
      kind: "object";
      label: string;
      fields: Record<string, FieldSpec>;
      hint?: string;
      /** If true, the whole sub-object can be removed/added. When removed,
       * the parent's property is set to undefined and the public site
       * renders nothing. */
      optional?: boolean;
    }
  | {
      kind: "stringList";
      label: string;
      itemLabel?: string;
      hint?: string;
    }
  | {
      kind: "objectList";
      label: string;
      itemLabel?: string;
      hint?: string;
      /** Sub-schema used to render each child item inline. */
      item: {
        titleKey?: string;
        subtitleKey?: string;
        order?: string[];
        fields: Record<string, FieldSpec>;
      };
    }
  | {
      kind: "tupleList";
      label: string;
      /** Two column headers, e.g. ["参数名", "参数值"] */
      columns: [string, string];
      hint?: string;
    };

export type ItemSchema = {
  /** Field used as the visible row title in collapsed state. */
  titleKey?: string;
  /** Field used as the row subtitle. */
  subtitleKey?: string;
  /** Order of fields in the form. Keys not listed render at the end. */
  order?: string[];
  fields: Record<string, FieldSpec>;
};

// ── Schemas ─────────────────────────────────────────────────────────

const HOME_HERO_SCHEMA: ItemSchema = {
  titleKey: "titleA",
  subtitleKey: "eyebrow",
  order: ["eyebrow", "titleA", "titleB", "subtitle", "image", "tone", "primary", "secondary", "hidden", "id"],
  fields: {
    id: { kind: "text", label: "ID", hint: "唯一标识,不可重复" },
    eyebrow: { kind: "text", label: "Eyebrow(标题上方小字)", optional: true },
    titleA: { kind: "text", label: "标题(主)" },
    titleB: { kind: "text", label: "标题(蓝色渐变后半)", optional: true },
    subtitle: { kind: "textarea", label: "副标题", rows: 3, optional: true },
    image: { kind: "image", label: "背景图路径", placeholder: "/images/banners/hero-1.jpg" },
    tone: {
      kind: "select",
      label: "色调",
      options: [
        { value: "dark", label: "深色 dark" },
        { value: "light", label: "浅色 light" },
      ],
    },
    primary: {
      kind: "object",
      label: "主 CTA 按钮",
      optional: true,
      fields: {
        label: { kind: "text", label: "文字" },
        href: { kind: "url", label: "链接", placeholder: "/products/m550-pro" },
      },
    },
    secondary: {
      kind: "object",
      label: "次 CTA 按钮",
      optional: true,
      fields: {
        label: { kind: "text", label: "文字" },
        href: { kind: "url", label: "链接" },
      },
    },
    hidden: { kind: "boolean", label: "隐藏这张 slide" },
  },
};

const HOME_BANNERS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "subtitle",
  order: ["eyebrow", "title", "subtitle", "accent", "image", "href", "tone", "span", "hidden", "id"],
  fields: {
    id: { kind: "text", label: "ID" },
    eyebrow: { kind: "text", label: "Eyebrow", optional: true },
    title: { kind: "text", label: "标题" },
    subtitle: { kind: "text", label: "副标题", optional: true },
    accent: { kind: "text", label: "Accent(如价格)", placeholder: "From $129.99", optional: true },
    image: { kind: "image", label: "图片路径" },
    href: { kind: "url", label: "跳转链接" },
    tone: {
      kind: "select",
      label: "色调",
      options: [
        { value: "dark", label: "深色 dark" },
        { value: "light", label: "浅色 light" },
      ],
    },
    span: {
      kind: "text",
      label: "网格 span(Tailwind 类)",
      placeholder: "lg:col-span-2 lg:row-span-2",
      hint: "留空则按默认 1 格放置",
      optional: true,
    },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const PDP_REVIEWS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "name",
  order: ["title", "body", "rating", "name", "date", "verified", "helpful", "photo", "hidden", "id"],
  fields: {
    id: { kind: "text", label: "ID" },
    title: { kind: "text", label: "评价标题" },
    body: { kind: "textarea", label: "正文", rows: 4 },
    rating: { kind: "number", label: "星级 (1-5)" },
    name: { kind: "text", label: "评价人姓名" },
    date: { kind: "text", label: "日期", placeholder: "Verified buyer · Mar 12, 2026" },
    verified: { kind: "boolean", label: "已验证购买" },
    helpful: { kind: "number", label: "Helpful 数", optional: true },
    photo: { kind: "image", label: "图片路径", optional: true },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const PDP_FAQ_SCHEMA: ItemSchema = {
  titleKey: "q",
  fields: {
    q: { kind: "text", label: "问题" },
    a: { kind: "textarea", label: "回答", rows: 4 },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const FEATURE_SPLIT_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "eyebrow",
  order: ["eyebrow", "title", "description", "iconName", "image", "hidden"],
  fields: {
    iconName: {
      kind: "select",
      label: "图标",
      options: [
        "Eye", "ShieldCheck", "Smartphone", "Wifi", "Zap", "Moon", "Camera", "Cloud",
      ].map((v) => ({ value: v, label: v })),
    },
    eyebrow: { kind: "text", label: "Eyebrow" },
    title: { kind: "text", label: "标题" },
    description: { kind: "textarea", label: "描述", rows: 3 },
    image: { kind: "image", label: "右侧图片路径" },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const WHATS_IN_BOX_SCHEMA: ItemSchema = {
  titleKey: "name",
  subtitleKey: "detail",
  order: ["name", "detail", "iconName", "hidden"],
  fields: {
    iconName: {
      kind: "select",
      label: "图标",
      options: [
        "Camera", "CircleDot", "Layers", "Cable", "Hammer", "BookOpen", "Package", "Smartphone", "Wifi",
      ].map((v) => ({ value: v, label: v })),
    },
    name: { kind: "text", label: "名称" },
    detail: { kind: "text", label: "细节" },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const USE_CASE_TABS_SCHEMA: ItemSchema = {
  titleKey: "label",
  subtitleKey: "title",
  order: ["id", "label", "iconName", "title", "body", "bullets", "image", "hidden"],
  fields: {
    id: { kind: "text", label: "ID(供 React key 用)" },
    iconName: {
      kind: "select",
      label: "图标",
      options: [
        "Users", "Car", "ShieldCheck", "Truck", "Heart", "Globe2",
      ].map((v) => ({ value: v, label: v })),
    },
    label: { kind: "text", label: "Tab 名" },
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
    bullets: {
      kind: "stringList",
      label: "要点(每条一行)",
      itemLabel: "要点",
    },
    image: { kind: "image", label: "图片路径" },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const CATALOG_PRODUCTS_SCHEMA: ItemSchema = {
  titleKey: "name",
  subtitleKey: "tagline",
  order: [
    "slug",
    "name",
    "short",
    "tagline",
    "category",
    "image",
    "price",
    "comparePrice",
    "rating",
    "reviewCount",
    "badge",
    "description",
    "variants",
    "gallery",
    "hidden",
  ],
  fields: {
    slug: {
      kind: "text",
      label: "Slug(URL 路径,改了链接会断)",
      hint: "唯一标识。除非你确定要换 URL,不要改",
    },
    name: { kind: "text", label: "完整产品名" },
    short: { kind: "text", label: "短名(卡片显示)" },
    tagline: { kind: "text", label: "Tagline 标语", optional: true },
    category: {
      kind: "select",
      label: "类目",
      options: [
        { value: "dash-cam", label: "Dash Cam 行车记录仪" },
        { value: "accessory", label: "Accessory 配件" },
      ],
    },
    image: {
      kind: "image",
      label: "主图路径",
      placeholder: "/images/product/m550-front.jpg",
    },
    price: { kind: "number", label: "售价(USD)" },
    comparePrice: { kind: "number", label: "划线价(USD)", optional: true },
    rating: { kind: "number", label: "星级(0-5)", optional: true },
    reviewCount: { kind: "number", label: "评价数", optional: true },
    badge: { kind: "text", label: "角标文字(如 NEW / 热销)", optional: true },
    description: {
      kind: "textarea",
      label: "完整描述",
      rows: 4,
    },
    variants: {
      kind: "objectList",
      label: "变体(颜色 / 套装 / 容量)",
      itemLabel: "变体",
      item: {
        titleKey: "label",
        subtitleKey: "sub",
        order: ["id", "label", "sub", "priceDelta"],
        fields: {
          id: { kind: "text", label: "ID" },
          label: { kind: "text", label: "标签(如 Pro 套装)" },
          sub: { kind: "text", label: "副标(展示在标签下)" },
          priceDelta: {
            kind: "number",
            label: "加价 / 减价(相对主售价,USD)",
            hint: "0 表示同价。-20 表示便宜 $20。",
          },
        },
      },
    },
    gallery: {
      kind: "objectList",
      label: "PDP 图集(顺序即左侧大图顺序)",
      itemLabel: "图片",
      item: {
        titleKey: "alt",
        subtitleKey: "src",
        order: ["src", "alt", "hidden"],
        fields: {
          src: {
            kind: "image",
            label: "图片路径",
            placeholder: "/images/product/m550-front.jpg",
          },
          alt: { kind: "text", label: "Alt 文字(无障碍/SEO)" },
          hidden: { kind: "boolean", label: "隐藏这张图" },
        },
      },
    },
    hidden: {
      kind: "boolean",
      label: "整个 SKU 隐藏(列表里不显示,PDP 直接访问仍可)",
    },
  },
};

const PDP_SPECS_SCHEMA: ItemSchema = {
  titleKey: "title",
  order: ["title", "rows", "hidden"],
  fields: {
    title: {
      kind: "text",
      label: "组标题(如 Imaging / Display & Interface)",
    },
    rows: {
      kind: "tupleList",
      label: "参数行(左列 = 名称,右列 = 值)",
      columns: ["参数名", "参数值"],
    },
    hidden: { kind: "boolean", label: "隐藏整组" },
  },
};

export const ARRAY_SCHEMAS: Record<string, ItemSchema> = {
  "home.hero": HOME_HERO_SCHEMA,
  "home.banners": HOME_BANNERS_SCHEMA,
  "pdp.reviews": PDP_REVIEWS_SCHEMA,
  "pdp.faq": PDP_FAQ_SCHEMA,
  "pdp.feature-split": FEATURE_SPLIT_SCHEMA,
  "pdp.whats-in-box": WHATS_IN_BOX_SCHEMA,
  "pdp.use-cases": USE_CASE_TABS_SCHEMA,
  "pdp.specs": PDP_SPECS_SCHEMA,
  "catalog.products": CATALOG_PRODUCTS_SCHEMA,
};

export function getArraySchema(sectionKey: string): ItemSchema | undefined {
  return ARRAY_SCHEMAS[sectionKey];
}

// ── Sub-array schemas (used inside object-section editors) ─────────

const iconSelect = (names: readonly string[]) => ({
  kind: "select" as const,
  label: "图标",
  options: names.map((v) => ({ value: v, label: v })),
});

const FAQ_SCHEMA: ItemSchema = {
  titleKey: "q",
  fields: {
    q: { kind: "text", label: "问题" },
    a: { kind: "textarea", label: "回答", rows: 4 },
  },
};

const ABOUT_STATS_SCHEMA: ItemSchema = {
  titleKey: "label",
  subtitleKey: "to",
  order: ["label", "to", "prefix", "suffix", "decimals", "separator"],
  fields: {
    label: { kind: "text", label: "标签" },
    to: { kind: "number", label: "目标数字" },
    prefix: { kind: "text", label: "前缀", placeholder: "$", optional: true },
    suffix: { kind: "text", label: "后缀", placeholder: "K+", optional: true },
    decimals: { kind: "number", label: "小数位数", optional: true },
    separator: { kind: "boolean", label: "千分位逗号" },
  },
};

const ABOUT_VALUES_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(ABOUT_VALUE_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 4 },
  },
};

const ABOUT_TIMELINE_SCHEMA: ItemSchema = {
  titleKey: "year",
  subtitleKey: "title",
  fields: {
    year: { kind: "text", label: "年份" },
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const ABOUT_COMMITMENTS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(ABOUT_COMMITMENT_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const AFFILIATE_STATS_SCHEMA: ItemSchema = {
  titleKey: "label",
  subtitleKey: "value",
  fields: {
    iconName: iconSelect(AFFILIATE_STAT_ICONS),
    value: { kind: "text", label: "数值(可含 %、$)" },
    label: { kind: "text", label: "标签" },
  },
};

const AFFILIATE_TIERS_SCHEMA: ItemSchema = {
  titleKey: "name",
  subtitleKey: "rate",
  fields: {
    name: { kind: "text", label: "等级名" },
    rate: { kind: "text", label: "佣金比例", placeholder: "10%" },
    threshold: { kind: "text", label: "门槛要求" },
    perks: { kind: "stringList", label: "权益", itemLabel: "权益" },
  },
};

const AFFILIATE_STEPS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "n",
  order: ["n", "iconName", "title", "body"],
  fields: {
    n: { kind: "number", label: "步骤序号" },
    iconName: iconSelect(AFFILIATE_STEP_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const CAREER_ROLES_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "team",
  fields: {
    title: { kind: "text", label: "职位名" },
    team: { kind: "text", label: "团队" },
    location: { kind: "text", label: "地点", placeholder: "Remote (US)" },
    level: { kind: "text", label: "级别", placeholder: "Mid-Senior" },
    type: { kind: "text", label: "类型", placeholder: "Full-time" },
  },
};

const CAREER_VALUES_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(CAREER_VALUE_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const CAREER_BENEFITS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(CAREER_BENEFIT_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "text", label: "简要描述" },
  },
};

const CAREER_PROCESS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "n",
  order: ["n", "title", "body"],
  fields: {
    n: { kind: "number", label: "步骤序号" },
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const PRESS_RELEASES_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "date",
  fields: {
    date: { kind: "text", label: "日期", placeholder: "April 04, 2026" },
    title: { kind: "text", label: "新闻稿标题" },
    excerpt: { kind: "textarea", label: "摘要(列表显示)", rows: 2 },
    body: { kind: "textarea", label: "完整正文", rows: 6 },
  },
};

const PRESS_COVERAGE_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "outlet",
  fields: {
    outlet: { kind: "text", label: "媒体 / 出版方" },
    title: { kind: "text", label: "报道标题" },
    href: { kind: "url", label: "链接", placeholder: "https://..." },
  },
};

const PRESS_QUOTES_SCHEMA: ItemSchema = {
  titleKey: "outlet",
  subtitleKey: "quote",
  fields: {
    quote: { kind: "textarea", label: "引语", rows: 3 },
    outlet: { kind: "text", label: "出处媒体" },
  },
};

const PRESS_KIT_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "detail",
  fields: {
    iconName: iconSelect(PRESS_KIT_ICONS),
    title: { kind: "text", label: "条目标题" },
    detail: { kind: "text", label: "细节(如格式 / 大小)" },
  },
};

const WHOLESALE_TIERS_SCHEMA: ItemSchema = {
  titleKey: "range",
  subtitleKey: "discount",
  fields: {
    range: { kind: "text", label: "数量段", placeholder: "10 – 49 units" },
    discount: { kind: "text", label: "折扣 / 价格", placeholder: "12% off MSRP" },
  },
};

const WHOLESALE_BENEFITS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(WHOLESALE_BENEFIT_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

const WHOLESALE_VERTICALS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(WHOLESALE_VERTICAL_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 4 },
  },
};

const APP_FEATURES_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(APP_FEATURE_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
  },
};

// ── Object-section registry ─────────────────────────────────────────

export type ObjectPropEntry = {
  /** Friendly label shown above this sub-array in the editor. */
  label: string;
  /** Optional short description / hint. */
  hint?: string;
  /** Item schema for the sub-array. */
  schema: ItemSchema;
};

export const OBJECT_SECTION_SCHEMAS: Record<
  string,
  Record<string, ObjectPropEntry>
> = {
  "about.page": {
    stats: { label: "数字统计(底部计数器)", schema: ABOUT_STATS_SCHEMA },
    values: { label: "价值观(4 张)", schema: ABOUT_VALUES_SCHEMA },
    timeline: { label: "大事记 / 时间线", schema: ABOUT_TIMELINE_SCHEMA },
    commitments: { label: "承诺", schema: ABOUT_COMMITMENTS_SCHEMA },
  },
  "affiliate.page": {
    stats: { label: "数字统计", schema: AFFILIATE_STATS_SCHEMA },
    tiers: { label: "佣金等级", schema: AFFILIATE_TIERS_SCHEMA },
    howItWorks: { label: "流程步骤", schema: AFFILIATE_STEPS_SCHEMA },
    faq: { label: "常见问题", schema: FAQ_SCHEMA },
  },
  "careers.page": {
    roles: { label: "开放岗位", schema: CAREER_ROLES_SCHEMA },
    values: { label: "文化价值观", schema: CAREER_VALUES_SCHEMA },
    benefits: { label: "福利", schema: CAREER_BENEFITS_SCHEMA },
    process: { label: "面试流程", schema: CAREER_PROCESS_SCHEMA },
  },
  "press.page": {
    releases: { label: "新闻稿", schema: PRESS_RELEASES_SCHEMA },
    coverage: { label: "媒体报道列表", schema: PRESS_COVERAGE_SCHEMA },
    quotes: { label: "媒体引语", schema: PRESS_QUOTES_SCHEMA },
    kit: { label: "Brand Kit 下载条目", schema: PRESS_KIT_SCHEMA },
  },
  "wholesale.page": {
    tiers: { label: "数量价格阶梯", schema: WHOLESALE_TIERS_SCHEMA },
    benefits: { label: "批发权益", schema: WHOLESALE_BENEFITS_SCHEMA },
    verticals: { label: "行业案例", schema: WHOLESALE_VERTICALS_SCHEMA },
    faq: { label: "常见问题", schema: FAQ_SCHEMA },
  },
  "app.page": {
    features: { label: "App 功能", schema: APP_FEATURES_SCHEMA },
    faq: { label: "常见问题", schema: FAQ_SCHEMA },
  },
};

export function getObjectSchema(
  sectionKey: string,
): Record<string, ObjectPropEntry> | undefined {
  return OBJECT_SECTION_SCHEMAS[sectionKey];
}

/** Build a blank item from a schema (used when user clicks "新增"). */
export function buildBlankItem(schema: {
  fields: Record<string, FieldSpec>;
}): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, spec] of Object.entries(schema.fields)) {
    if (spec.kind === "boolean") out[key] = false;
    else if (spec.kind === "number") out[key] = 0;
    else if (spec.kind === "stringList") out[key] = [];
    else if (spec.kind === "objectList") out[key] = [];
    else if (spec.kind === "tupleList") out[key] = [];
    else if (spec.kind === "object")
      out[key] = buildBlankItem({ fields: spec.fields });
    else out[key] = "";
  }
  return out;
}
