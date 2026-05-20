// Schemas describing the shape of each editable content array, so the
// admin /admin/content/[key] page can render a typed form (add row /
// move / hide / delete) instead of a raw JSON textarea.
//
// Only sections registered here get the form UI. Anything else still
// falls back to the JSON editor.

export type PrimitiveKind =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "url"
  | "select";

export type FieldSpec =
  | {
      kind: PrimitiveKind;
      label: string;
      placeholder?: string;
      hint?: string;
      options?: { value: string; label: string }[];
      rows?: number;
    }
  | {
      kind: "object";
      label: string;
      fields: Record<string, FieldSpec>;
      hint?: string;
    }
  | {
      kind: "stringList";
      label: string;
      itemLabel?: string;
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
    eyebrow: { kind: "text", label: "Eyebrow(标题上方小字)" },
    titleA: { kind: "text", label: "标题(主)" },
    titleB: { kind: "text", label: "标题(蓝色渐变后半)" },
    subtitle: { kind: "textarea", label: "副标题", rows: 3 },
    image: { kind: "text", label: "背景图路径", placeholder: "/images/banners/hero-1.jpg" },
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
      fields: {
        label: { kind: "text", label: "文字" },
        href: { kind: "url", label: "链接", placeholder: "/products/m550-pro" },
      },
    },
    secondary: {
      kind: "object",
      label: "次 CTA 按钮",
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
    eyebrow: { kind: "text", label: "Eyebrow" },
    title: { kind: "text", label: "标题" },
    subtitle: { kind: "text", label: "副标题" },
    accent: { kind: "text", label: "Accent(如价格)", placeholder: "From $129.99" },
    image: { kind: "text", label: "图片路径" },
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
    helpful: { kind: "number", label: "Helpful 数(可选)" },
    photo: { kind: "text", label: "图片路径(可选)" },
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
    image: { kind: "text", label: "右侧图片路径" },
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
    image: { kind: "text", label: "图片路径" },
    hidden: { kind: "boolean", label: "隐藏" },
  },
};

// catalog.products has nested arrays (variants, gallery) — too complex
// for the v1 form editor. Registered without schema so it stays JSON.

export const ARRAY_SCHEMAS: Record<string, ItemSchema> = {
  "home.hero": HOME_HERO_SCHEMA,
  "home.banners": HOME_BANNERS_SCHEMA,
  "pdp.reviews": PDP_REVIEWS_SCHEMA,
  "pdp.faq": PDP_FAQ_SCHEMA,
  "pdp.feature-split": FEATURE_SPLIT_SCHEMA,
  "pdp.whats-in-box": WHATS_IN_BOX_SCHEMA,
  "pdp.use-cases": USE_CASE_TABS_SCHEMA,
};

export function getArraySchema(sectionKey: string): ItemSchema | undefined {
  return ARRAY_SCHEMAS[sectionKey];
}

/** Build a blank item from a schema (used when user clicks "新增"). */
export function buildBlankItem(schema: ItemSchema): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, spec] of Object.entries(schema.fields)) {
    if (spec.kind === "boolean") out[key] = false;
    else if (spec.kind === "number") out[key] = 0;
    else if (spec.kind === "stringList") out[key] = [];
    else if (spec.kind === "object") out[key] = buildBlankItem({ fields: spec.fields });
    else out[key] = "";
  }
  return out;
}
