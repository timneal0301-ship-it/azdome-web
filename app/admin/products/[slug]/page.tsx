import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  ImagePlus,
  Layers,
  PenLine,
  Sparkles,
  Tag,
} from "lucide-react";

import { db } from "@/lib/db";
import { getAssetUrlMap } from "@/lib/asset-urls";
import { getProductWithOverlay } from "@/lib/products-server";
import {
  PRODUCT_SLOT_COUNT,
  SLOTS,
  productSlotKey,
  productSlotPath,
} from "@/lib/image-slots";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const [product, assetMap, catalogOverride] = await Promise.all([
    getProductWithOverlay(slug),
    getAssetUrlMap(),
    db.get<unknown>("content:catalog.products"),
  ]);
  if (!product) notFound();

  const resolve = (path: string) => assetMap[path] ?? path;
  const isEdited = catalogOverride !== undefined;

  // (A) Standard 6-slot main-image array — uniform layout for every SKU.
  //     Slot-1 doubles as the cover image (auto-promoted via getProductForPDP).
  const standardSlots = Array.from({ length: PRODUCT_SLOT_COUNT }, (_, idx) => {
    const i = idx + 1;
    const path = `/${productSlotPath(slug, i)}`;
    const key = productSlotKey(slug, i);
    const uploaded = assetMap[path] !== undefined;
    return {
      n: i,
      key,
      path,
      uploaded,
      resolved: resolve(path),
    };
  });
  const standardUploaded = standardSlots.filter((s) => s.uploaded).length;

  // (B) Extra / legacy paths — anything in product.gallery (or product.image)
  //     that isn't already covered by the standard 6 above. Mostly seed
  //     paths from PRODUCTS const before the 6-slot convention existed.
  const standardPaths = new Set(standardSlots.map((s) => s.path));
  const legacyPathSet = new Set<string>();
  for (const raw of [product.image, ...product.gallery.map((g) => g.src)]) {
    if (!standardPaths.has(raw)) legacyPathSet.add(raw);
  }
  const legacyEntries = Array.from(legacyPathSet).map((path) => {
    const slot = SLOTS.find((s) => `/${s.path}` === path);
    const uploaded = assetMap[path] !== undefined;
    const galleryItem = product.gallery.find((g) => g.src === path);
    return {
      path,
      slot,
      uploaded,
      isMain: product.image === path,
      alt: galleryItem?.alt ?? product.short,
      resolved: resolve(path),
      hiddenInGallery: galleryItem?.hidden,
    };
  });

  // Quick links per A+ section.
  const A_PLUS_SECTIONS = [
    { key: "pdp.immersive", title: "沉浸段(深色全屏)", body: "标题 + 副标题 + 4 项 stat + 背景图" },
    { key: "pdp.feature-split", title: "Feature Split", body: "3 段图文交替 · 适合讲核心功能" },
    { key: "pdp.specs", title: "规格表", body: "完整 spec sheet · 多组 + 多行" },
    { key: "pdp.whats-in-box", title: "What's in the Box", body: "6 项开箱清单 · 带图标" },
    { key: "pdp.use-cases", title: "Use Case Tabs", body: "Family / Rideshare / Parking 三场景" },
    { key: "pdp.reviews", title: "评价", body: "Customer reviews 卡片" },
    { key: "pdp.faq", title: "FAQ", body: "PDP 底部常见问题" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      {/* Back + breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
        >
          <ChevronLeft className="h-3 w-3" />
          全部产品
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-[11px] font-mono text-slate-500">{slug}</span>
      </div>

      {/* Hero header */}
      <header className="mb-10 grid grid-cols-1 gap-6 rounded-3xl bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm ring-1 ring-slate-100 lg:grid-cols-[200px_1fr] lg:gap-8 lg:p-8">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src={resolve(product.image)}
            alt={product.short}
            fill
            sizes="200px"
            className="object-contain p-3"
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            {product.category === "accessory" ? "Accessory" : "Dash Cam"}
          </p>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {product.name}
          </h1>
          {product.tagline && (
            <p className="mt-2 max-w-2xl text-sm text-slate-500 md:text-base">
              {product.tagline}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm tabular-nums text-slate-400 line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
            {product.badge && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                {product.badge}
              </span>
            )}
            {product.hidden && (
              <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Hidden
              </span>
            )}
            {product.rating !== undefined && (
              <span className="text-xs text-slate-500">
                ★ {product.rating} · {product.reviewCount ?? 0} reviews
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-slate-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              查看前台 PDP
            </Link>
            <Link
              href={`/admin/content/catalog.products`}
              className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-blue-700"
            >
              <PenLine className="h-3.5 w-3.5" />
              编辑产品字段
            </Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-[11px] font-semibold tracking-tight text-slate-600">
              {isEdited ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  已被 admin 编辑过
                </>
              ) : (
                <>
                  <Tag className="h-3.5 w-3.5" />
                  使用代码默认值
                </>
              )}
            </span>
          </div>
        </div>
      </header>

      {/* Standard 6-slot main-image array */}
      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
              主图阵 · {PRODUCT_SLOT_COUNT} 张
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {standardUploaded} / {PRODUCT_SLOT_COUNT} 已上传 · 第 1 张同时作为产品封面图 · PDP 画廊按 1→6 顺序展示已上传项
            </p>
          </div>
          <Link
            href={`/admin/images?q=${encodeURIComponent(`product-${slug}-`)}`}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-blue-700 transition-colors hover:bg-blue-100"
          >
            在图片库批量上传
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {/* 2-row × 3-col grid on desktop. Slot-1 gets a distinguishing
            "封面" pill since it's the auto-promoted cover image. */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {standardSlots.map((slot) => (
            <Link
              key={slot.key}
              href={`/admin/images?q=${encodeURIComponent(slot.key)}`}
              className={[
                "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                slot.uploaded ? "ring-emerald-100" : "ring-slate-100",
              ].join(" ")}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                {slot.uploaded ? (
                  <Image
                    src={slot.resolved}
                    alt={`${product.short} · 主图 ${slot.n}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 45vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImagePlus className="h-7 w-7" />
                    <span className="text-[11px] font-semibold tracking-tight">
                      点这里上传
                    </span>
                  </div>
                )}

                {/* Slot number badge (top-left) */}
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  {slot.n} / {PRODUCT_SLOT_COUNT}
                  {slot.n === 1 && (
                    <span className="ml-1 text-amber-300">封面</span>
                  )}
                </span>

                {/* Status pill (top-right) */}
                <span
                  className={[
                    "absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
                    slot.uploaded
                      ? "bg-emerald-500/90 text-white"
                      : "bg-white/85 text-slate-500 ring-1 ring-slate-200",
                  ].join(" ")}
                >
                  {slot.uploaded ? (
                    <>
                      <Check className="h-3 w-3" strokeWidth={3} />
                      已上传
                    </>
                  ) : (
                    "未上传"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <p
                  className="truncate font-mono text-[10px] text-slate-500"
                  title={slot.path}
                >
                  {slot.path.replace("/images/products/", "")}
                </p>
                <ArrowUpRight className="h-3 w-3 flex-shrink-0 text-slate-300 transition-colors group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Legacy / catalog-curated paths — only shown when product still
          references paths outside the standard 6-slot convention. */}
      {legacyEntries.length > 0 && (
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-base font-bold tracking-tight text-slate-700 md:text-lg">
              旧路径图片 ({legacyEntries.length})
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              这些图片由 <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px]">catalog.products</code> 里的 image / gallery 字段引用,不在标准 6 张主图阵里。建议把内容迁到上面的 6 个 slot 后,在产品编辑器中清空 gallery 数组。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {legacyEntries.map((entry) => (
              <div
                key={entry.path}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
                  <Image
                    src={entry.resolved}
                    alt={entry.alt}
                    fill
                    sizes="(min-width: 1280px) 20vw, 33vw"
                    className="object-contain p-3"
                  />
                  {entry.isMain && (
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      主图
                    </span>
                  )}
                  <span
                    className={[
                      "absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
                      entry.uploaded
                        ? "bg-emerald-500/90 text-white"
                        : "bg-white/85 text-slate-500 ring-1 ring-slate-200",
                    ].join(" ")}
                  >
                    {entry.uploaded ? (
                      <>
                        <Check className="h-3 w-3" strokeWidth={3} />
                        已上传
                      </>
                    ) : (
                      "未上传"
                    )}
                  </span>
                  {entry.hiddenInGallery && (
                    <span className="absolute bottom-2 right-2 inline-flex items-center rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      hidden
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p
                    className="truncate text-[11px] font-mono text-slate-500"
                    title={entry.path}
                  >
                    {entry.path.replace("/images/", "")}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-slate-400">
                    {entry.alt}
                  </p>
                  {entry.slot ? (
                    <Link
                      href={`/admin/images?q=${encodeURIComponent(entry.slot.key)}`}
                      className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold tracking-tight text-blue-700 hover:bg-blue-100"
                    >
                      <ImagePlus className="h-3 w-3" />
                      上传到 {entry.slot.key}
                    </Link>
                  ) : (
                    <p className="mt-2 text-[10px] italic text-amber-700">
                      没有对应 slot
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            变体(Variants)
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.variants.map((v) => (
              <div
                key={v.id}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Layers className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold tracking-tight text-slate-900">
                    {v.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{v.sub}</p>
                  <p className="mt-1 text-xs font-mono tabular-nums text-slate-400">
                    +/- ${v.priceDelta.toFixed(2)} · id: {v.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* A+ content quick links */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            A+ 详情页内容
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            ⚠ 注意:这些 A+ 板块当前**所有 SKU 共享**。修改会影响每个 PDP。如需单 SKU 独立 A+ 内容,需要单独立项做数据模型拆分。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {A_PLUS_SECTIONS.map((sec) => (
            <Link
              key={sec.key}
              href={`/admin/content/${sec.key}`}
              className="group flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  {sec.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{sec.body}</p>
                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  {sec.key}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-purple-600" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
