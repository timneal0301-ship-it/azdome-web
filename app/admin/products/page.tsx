import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  EyeOff,
  Package,
  Plus,
} from "lucide-react";

import { db } from "@/lib/db";
import { getAssetUrlMap } from "@/lib/asset-urls";
import { getAllProducts } from "@/lib/products-server";
import { PRODUCTS } from "@/lib/products";
import { PRODUCT_SLOT_COUNT, productSlotPath } from "@/lib/image-slots";
import ProductHiddenToggle from "@/components/admin/ProductHiddenToggle";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const [products, assetMap, catalogOverride] = await Promise.all([
    getAllProducts(),
    getAssetUrlMap(),
    db.get<unknown>("content:catalog.products"),
  ]);
  const catalogIsOverridden = catalogOverride !== undefined;

  const resolve = (path: string) => assetMap[path] ?? path;

  // Per-product upload status against the standard 6-slot main-image
  // array. Slot-1 (when uploaded) doubles as the card thumbnail —
  // matches the auto-promote behavior in getProductForPDP.
  const productStats = products.map((p) => {
    let uploaded = 0;
    for (let i = 1; i <= PRODUCT_SLOT_COUNT; i++) {
      const path = `/${productSlotPath(p.slug, i)}`;
      if (assetMap[path] !== undefined) uploaded++;
    }
    const slot1 = `/${productSlotPath(p.slug, 1)}`;
    const thumbnail = assetMap[slot1] !== undefined ? assetMap[slot1] : resolve(p.image);
    return {
      product: p,
      thumbnail,
      uploaded,
      total: PRODUCT_SLOT_COUNT,
    };
  });

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Product Manager
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            产品管理
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            10+ SKU 集中管理 · 每个型号统一 6 张主图 · 点单品卡片进入图片上传 + A+ 详情页编辑。
            新增 / 改产品型号请去{" "}
            <Link
              href="/admin/content/catalog.products"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              产品目录
            </Link>{" "}
            表单(slug 是 URL,改了会断链;name / tagline / price 可随时改)。
          </p>
        </div>
        <Link
          href="/admin/content/catalog.products"
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold tracking-tight text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          新增 / 批量编辑
        </Link>
      </header>

      {/* Stats */}
      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="SKUs" value={products.length} icon={Package} tone="blue" />
        <Tile
          label="已编辑过目录"
          value={catalogIsOverridden ? "✓" : "—"}
          icon={CheckCircle2}
          tone={catalogIsOverridden ? "emerald" : "slate"}
        />
        <Tile
          label="已上传图片"
          value={productStats.reduce((s, p) => s + p.uploaded, 0)}
          icon={CheckCircle2}
          tone="emerald"
        />
        <Tile
          label="待上传"
          value={productStats.reduce((s, p) => s + (p.total - p.uploaded), 0)}
          icon={EyeOff}
          tone="slate"
        />
      </section>

      {/* Product grid */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productStats.map(({ product, thumbnail, uploaded, total }) => {
          const isCatalogEntry = PRODUCTS.some((p) => p.slug === product.slug);
          const percent = total === 0 ? 0 : Math.round((uploaded / total) * 100);
          return (
            <Link
              key={product.slug}
              href={`/admin/products/${product.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                <Image
                  src={thumbnail}
                  alt={product.short}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                <ProductHiddenToggle
                  slug={product.slug}
                  initialHidden={Boolean(product.hidden)}
                  label={product.short}
                />
                {!isCatalogEntry && (
                  <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Override
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
                      {product.short}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-slate-400">
                      {product.slug}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </div>

                {product.tagline && (
                  <p className="mt-2 line-clamp-1 text-xs text-slate-500">
                    {product.tagline}
                  </p>
                )}

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-base font-bold tracking-tight tabular-nums text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-xs tabular-nums text-slate-400 line-through">
                      ${product.comparePrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Image upload progress */}
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="font-semibold uppercase tracking-[0.12em] text-slate-400">
                      图片上传
                    </span>
                    <span className="tabular-nums text-slate-500">
                      {uploaded} / {total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={[
                        "h-full rounded-full transition-all duration-500",
                        percent === 100
                          ? "bg-emerald-500"
                          : percent > 0
                          ? "bg-blue-500"
                          : "bg-slate-200",
                      ].join(" ")}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Bottom links */}
      <section className="mt-12 rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="mb-3 text-sm font-bold tracking-tight text-slate-900">
          快捷入口
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLink
            href="/admin/content/catalog.products"
            title="批量编辑全部 SKU"
            body="一个 JSON / 表单管 10+ 个产品的字段"
          />
          <QuickLink
            href="/admin/images"
            title="图片资源库"
            body="所有图片 slot 集中管理 · 拖拽上传"
          />
          <QuickLink
            href="/admin/content/pdp.immersive"
            title="A+ 沉浸段"
            body="PDP 中部大背景 + 数据 stat"
          />
          <QuickLink
            href="/admin/content/pdp.feature-split"
            title="A+ Feature Split"
            body="3 段图文交替"
          />
          <QuickLink
            href="/admin/content/pdp.whats-in-box"
            title="A+ 开箱清单"
            body="6 项 What's in the Box"
          />
          <QuickLink
            href="/admin/content/pdp.specs"
            title="规格表"
            body="完整 spec sheet"
          />
        </div>
      </section>
    </main>
  );
}

function Tile({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "blue" | "emerald" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "slate"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-50 text-blue-600";
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
      <span
        className={[
          "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
          toneClass,
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight tabular-nums text-slate-900 md:text-3xl">
          {value}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <ExternalLink className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold tracking-tight text-slate-900">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{body}</p>
      </div>
    </Link>
  );
}
