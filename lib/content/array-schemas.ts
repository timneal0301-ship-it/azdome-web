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
import { PROMISE_ICONS } from "@/components/PromiseThreeCol.data";

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

/** Convenience: build a select FieldSpec from a readonly list of icon names. */
const iconSelect = (names: readonly string[]) => ({
  kind: "select" as const,
  label: "图标",
  options: names.map((v) => ({ value: v, label: v })),
});

const HOME_HERO_SCHEMA: ItemSchema = {
  titleKey: "titleA",
  subtitleKey: "eyebrow",
  order: [
    "layout",
    "eyebrow",
    "titleA",
    "titleB",
    "subtitle",
    "image",
    "mobileImage",
    "videoSrc",
    "tone",
    "accentColor",
    "gradientStrength",
    "gradientDirection",
    "badges",
    "pricing",
    "primary",
    "secondary",
    "hidden",
    "id",
  ],
  fields: {
    id: { kind: "text", label: "ID", hint: "唯一标识,不可重复" },
    layout: {
      kind: "select",
      label: "布局",
      options: [
        { value: "centered", label: "Centered · 文字居中(默认)" },
        { value: "split-left", label: "Split Left · 左图右文" },
        { value: "split-right", label: "Split Right · 右图左文" },
        { value: "video", label: "Video · 全屏视频背景" },
      ],
      hint: "video 模式需要填 videoSrc",
    },
    eyebrow: { kind: "text", label: "Eyebrow(标题上方小字)", optional: true },
    titleA: { kind: "text", label: "标题(主)" },
    titleB: {
      kind: "text",
      label: "标题(渐变后半)",
      optional: true,
      hint: "会以 accentColor 渐变色显示",
    },
    subtitle: { kind: "textarea", label: "副标题", rows: 3, optional: true },
    image: {
      kind: "image",
      label: "背景图(桌面端)",
      placeholder: "/images/banners/hero-1.jpg",
      hint: "推荐 2878×1002(约 2.87:1 影院宽幅)。窄屏会从中间裁切,主体和文字位置请放在画面中部 60%。",
    },
    mobileImage: {
      kind: "image",
      label: "背景图(手机端)",
      placeholder: "/images/banners/hero-1-mobile.jpg",
      hint: "竖版裁切,推荐 750×1334(9:16)。留空则手机端复用桌面图。",
      optional: true,
    },
    videoSrc: {
      kind: "text",
      label: "背景视频路径(仅 video 布局)",
      placeholder: "/videos/hero.mp4",
      optional: true,
    },
    tone: {
      kind: "select",
      label: "色调",
      options: [
        { value: "dark", label: "深色 dark(白字 + 深色蒙版)" },
        { value: "light", label: "浅色 light(深字,不加蒙版)" },
      ],
    },
    accentColor: {
      kind: "text",
      label: "强调色(CSS 颜色)",
      placeholder: "#60a5fa",
      hint: "影响 eyebrow 圆点 + titleB 渐变",
      optional: true,
    },
    gradientStrength: {
      kind: "number",
      label: "深色蒙版强度 0–100",
      hint: "数字越大文字越突出,默认 70",
      optional: true,
    },
    gradientDirection: {
      kind: "select",
      label: "蒙版方向",
      options: [
        { value: "bottom", label: "底部加深(默认)" },
        { value: "left", label: "左侧加深(适合右图左文)" },
        { value: "radial", label: "径向 vignette" },
      ],
      optional: true,
    },
    badges: {
      kind: "stringList",
      label: "信任徽章(标题下方小芯片)",
      itemLabel: "徽章文字",
      hint: '例如 "★ 12K+ reviews"',
    },
    pricing: {
      kind: "object",
      label: "价格标签(主 CTA 旁)",
      optional: true,
      fields: {
        price: { kind: "text", label: "售价", placeholder: "$129.99" },
        strike: {
          kind: "text",
          label: "划线价",
          placeholder: "$169.99",
          optional: true,
        },
        note: {
          kind: "text",
          label: "标签文字",
          placeholder: "Today only",
          optional: true,
        },
      },
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

const APP_COMPATIBILITY_SCHEMA: ItemSchema = {
  titleKey: "product",
  subtitleKey: "firmware",
  fields: {
    product: { kind: "text", label: "型号" },
    firmware: { kind: "text", label: "最低固件版本" },
    ios: { kind: "text", label: "iOS 要求" },
    android: { kind: "text", label: "Android 要求" },
  },
};

const HOME_PROMISE_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "iconName",
  fields: {
    iconName: iconSelect(PROMISE_ICONS),
    title: { kind: "text", label: "标题" },
    body: { kind: "textarea", label: "正文", rows: 3 },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const HOME_PRESS_STRIP_SCHEMA: ItemSchema = {
  titleKey: "outlet",
  subtitleKey: "quote",
  fields: {
    quote: { kind: "textarea", label: "引语", rows: 3 },
    outlet: { kind: "text", label: "媒体出处" },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

const LEGAL_DOCS_SCHEMA: ItemSchema = {
  titleKey: "title",
  subtitleKey: "slug",
  order: ["slug", "title", "updated", "effective", "intro", "sections"],
  fields: {
    slug: {
      kind: "text",
      label: "Slug(URL 路径,改了链接会断)",
      hint: "如 privacy / terms / warranty",
    },
    title: { kind: "text", label: "文档标题" },
    updated: {
      kind: "text",
      label: "Last updated 文案",
      placeholder: "Last updated April 4, 2026",
    },
    effective: {
      kind: "text",
      label: "Effective 文案",
      placeholder: "Effective April 18, 2026",
    },
    intro: { kind: "textarea", label: "前言", rows: 4 },
    sections: {
      kind: "objectList",
      label: "章节",
      itemLabel: "章节",
      item: {
        titleKey: "heading",
        subtitleKey: "id",
        order: ["id", "heading", "paragraphs", "list"],
        fields: {
          id: { kind: "text", label: "锚点 ID" },
          heading: { kind: "text", label: "章节标题" },
          paragraphs: {
            kind: "stringList",
            label: "段落(每段一条)",
            itemLabel: "段落",
            hint: "支持空白分段",
          },
          list: {
            kind: "objectList",
            label: "术语表(term / def 对)",
            itemLabel: "术语",
            item: {
              titleKey: "term",
              fields: {
                term: { kind: "text", label: "术语" },
                def: { kind: "textarea", label: "定义", rows: 2 },
              },
            },
          },
        },
      },
    },
  },
};

export const ARRAY_SCHEMAS: Record<string, ItemSchema> = {
  "home.hero": HOME_HERO_SCHEMA,
  "home.banners": HOME_BANNERS_SCHEMA,
  "home.promise": HOME_PROMISE_SCHEMA,
  "home.pressStrip": HOME_PRESS_STRIP_SCHEMA,
  "pdp.reviews": PDP_REVIEWS_SCHEMA,
  "pdp.faq": PDP_FAQ_SCHEMA,
  "pdp.feature-split": FEATURE_SPLIT_SCHEMA,
  "pdp.whats-in-box": WHATS_IN_BOX_SCHEMA,
  "pdp.use-cases": USE_CASE_TABS_SCHEMA,
  "pdp.specs": PDP_SPECS_SCHEMA,
  "catalog.products": CATALOG_PRODUCTS_SCHEMA,
  "legal.docs": LEGAL_DOCS_SCHEMA,
  "app.compatibility": APP_COMPATIBILITY_SCHEMA,
};

export function getArraySchema(sectionKey: string): ItemSchema | undefined {
  return ARRAY_SCHEMAS[sectionKey];
}

// ── Sub-array schemas (used inside object-section editors) ─────────
//
// (iconSelect helper is declared earlier so the top-level ARRAY_SCHEMAS
// can reuse it too.)

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

// ── Single-object schemas (mixed scalar + nested arrays) ────────────

const PDP_IMMERSIVE_SCHEMA: ItemSchema = {
  fields: {
    eyebrow: { kind: "text", label: "Eyebrow(小字)" },
    titleA: { kind: "text", label: "标题前半" },
    titleB: {
      kind: "text",
      label: "标题后半(蓝色渐变)",
      optional: true,
    },
    subtitle: { kind: "textarea", label: "副标题", rows: 3 },
    image: {
      kind: "image",
      label: "背景图",
      placeholder: "/images/pdp/immersive-night.jpg",
    },
    stats: {
      kind: "objectList",
      label: "底部 stat 卡(4 项)",
      itemLabel: "Stat",
      item: {
        titleKey: "label",
        subtitleKey: "value",
        fields: {
          value: { kind: "text", label: "数值", placeholder: "0.001 lux" },
          label: { kind: "text", label: "标签", placeholder: "Min illumination" },
        },
      },
    },
  },
};

const HOME_PRICE_COMPARE_SCHEMA: ItemSchema = {
  fields: {
    eyebrow: { kind: "text", label: "Eyebrow", optional: true },
    title: { kind: "text", label: "区块标题", optional: true },
    body: { kind: "textarea", label: "引导文案", rows: 3, optional: true },
    brands: {
      kind: "objectList",
      label: "对比品牌(列)",
      itemLabel: "品牌列",
      item: {
        titleKey: "name",
        subtitleKey: "price",
        fields: {
          name: { kind: "text", label: "品牌 / 型号" },
          price: { kind: "text", label: "价格", placeholder: "$129.99", optional: true },
          highlight: {
            kind: "boolean",
            label: "高亮列(蓝色 + Best Value 徽章)",
          },
        },
      },
    },
    rows: {
      kind: "objectList",
      label: "对比维度(行)",
      itemLabel: "行",
      item: {
        titleKey: "feature",
        fields: {
          feature: { kind: "text", label: "维度名" },
          values: {
            kind: "stringList",
            label: "各列的值(顺序与品牌列对齐)",
            itemLabel: "值",
            hint: '✓ ✗ — 显示为图标徽章;其他文字原样显示',
          },
        },
      },
    },
  },
};

const HOME_FLASH_SALE_SCHEMA: ItemSchema = {
  fields: {
    active: {
      kind: "boolean",
      label: "启用 Flash Sale 倒计时条",
    },
    text: {
      kind: "text",
      label: "标语",
      placeholder: "🎉 SPRING SALE — 20% OFF DASH CAMS",
    },
    cta: { kind: "text", label: "按钮文字", placeholder: "Shop Sale", optional: true },
    href: { kind: "url", label: "按钮链接", placeholder: "/collections/dash-cams", optional: true },
    endsAt: {
      kind: "text",
      label: "结束时间 (ISO)",
      placeholder: "2026-06-30T23:59:00Z",
      hint: "过期后自动隐藏",
      optional: true,
    },
    dismissible: {
      kind: "boolean",
      label: "允许用户关闭(关闭状态存 localStorage)",
    },
  },
};

const APP_DOWNLOAD_SCHEMA: ItemSchema = {
  fields: {
    eyebrow: { kind: "text", label: "Eyebrow(顶部小字)" },
    title: { kind: "text", label: "主标题" },
    subtitle: { kind: "textarea", label: "副标题", rows: 2 },
    qrImage: {
      kind: "image",
      label: "二维码图片",
      placeholder: "/images/app/qr.png",
      hint: "建议上传 app-qr 槽位的方形 PNG。二维码内容由你在外部工具生成,内容可指向一个智能跳转 URL(扫码自动识别 iOS/Android)。",
    },
    qrCaption: { kind: "text", label: "二维码下方说明" },
    appStoreUrl: {
      kind: "url",
      label: "App Store URL",
      placeholder: "https://apps.apple.com/app/...",
    },
    googlePlayUrl: {
      kind: "url",
      label: "Google Play URL",
      placeholder: "https://play.google.com/store/apps/details?id=...",
    },
    appIcon: {
      kind: "image",
      label: "App 图标(方形)",
      placeholder: "/images/app/icon.png",
      optional: true,
    },
    phoneScreenshot: {
      kind: "image",
      label: "右侧手机截图",
      placeholder: "/images/product/m550-app.jpg",
    },
    rating: {
      kind: "text",
      label: "评分文字",
      placeholder: "★ 4.7 · 18,000+ App Store 评价",
      optional: true,
    },
    bullets: {
      kind: "stringList",
      label: "关键卖点(每条一行)",
      itemLabel: "卖点",
    },
  },
};

export const SINGLE_OBJECT_SCHEMAS: Record<string, ItemSchema> = {
  "pdp.immersive": PDP_IMMERSIVE_SCHEMA,
  "home.priceCompare": HOME_PRICE_COMPARE_SCHEMA,
  "home.flashSale": HOME_FLASH_SALE_SCHEMA,
  "app.download": APP_DOWNLOAD_SCHEMA,
};

export function getSingleObjectSchema(
  sectionKey: string,
): ItemSchema | undefined {
  return SINGLE_OBJECT_SCHEMAS[sectionKey];
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
