import type { ContentSection } from "./types";
import { PRODUCTS, type ProductDetail } from "@/lib/products";

export const PRODUCT_CATALOG: ContentSection<ProductDetail[]> = {
  key: "catalog.products",
  label: "产品目录 · 10 个 SKU(描述 / 标语 / 价格 / 变体 / 画廊)",
  description:
    "全站产品数据的单一来源。每个 SKU 含: slug / name / short / tagline / description / price / comparePrice / rating / reviewCount / badge / variants / gallery / category。slug 不要改(动了链接会断)。",
  page: "catalog",
  previewHref: "/products/m550-pro",
  defaults: PRODUCTS,
};
