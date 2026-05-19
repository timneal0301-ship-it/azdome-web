"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  Download,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { useCart } from "./CartProvider";
import { useLocale } from "./LocaleProvider";
import { PRODUCTS, type ProductDetail } from "@/lib/products";
import type { FirmwareRelease, Manual } from "@/lib/downloads";

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function ProductBuyBox({
  product = PRODUCTS[0],
  manual,
  firmware,
}: {
  product?: ProductDetail;
  manual?: Manual;
  firmware?: FirmwareRelease;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState<string>(variants[0]?.id ?? "");
  const variant = variants.find((v) => v.id === variantId);
  const priceDelta = variant?.priceDelta ?? 0;
  const price = product.price + priceDelta;
  const compare = (product.comparePrice ?? product.price) + priceDelta;
  const savings = Math.max(compare - price, 0);
  const installment = price / 4;

  const { add, open } = useCart();
  const { t } = useLocale();

  const manualEn = manual?.files.en;

  const GUARANTEES = [
    { icon: RotateCcw, label: t.buyBox.return30 },
    { icon: ShieldCheck, label: t.buyBox.warranty2yr },
    { icon: Truck, label: t.buyBox.freeShipping },
  ];

  const cartItemId = variant ? `${product.slug}::${variant.id}` : product.slug;
  const cartItemName = variant
    ? `${product.name}`
    : product.name;
  const cartItemVariant = variant?.label;

  const handleAddToCart = () => {
    add({
      id: cartItemId,
      productSlug: product.slug,
      name: cartItemName,
      variant: cartItemVariant,
      price,
      image: product.image,
    });
    open();
  };

  const images = product.gallery.length > 0 ? product.gallery : [{ src: product.image, alt: product.name }];
  const activeImg = images[activeImage] ?? images[0];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-4 md:pt-6 lg:px-10 lg:pb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImg.src}
                  alt={activeImg.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority
                  className="object-contain p-6 md:p-12"
                />
              </motion.div>
            </div>

            {images.length > 1 && (
              <div className="mt-4 -mx-2 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex gap-3">
                  {images.map((img, i) => {
                    const isActive = i === activeImage;
                    return (
                      <button
                        key={img.src + i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`Show image ${i + 1}`}
                        className={[
                          "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 transition-all duration-300 md:h-24 md:w-24",
                          isActive
                            ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white"
                            : "ring-1 ring-slate-100 hover:ring-slate-300",
                        ].join(" ")}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="96px"
                          className="object-contain p-2"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-28">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              AZDOME
            </p>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {product.name}
            </h1>

            {product.rating !== undefined && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={[
                        "h-4 w-4",
                        i < Math.round(product.rating ?? 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium tracking-tight text-slate-700">
                  {product.rating}
                </span>
                {product.reviewCount !== undefined && (
                  <a
                    href="#reviews"
                    className="text-sm text-slate-400 transition-colors duration-300 hover:text-slate-700"
                  >
                    · {product.reviewCount.toLocaleString()} {t.buyBox.reviews}
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-bold tracking-tight tabular-nums text-slate-900">
                {formatUSD(price)}
              </span>
              {compare > price && (
                <span className="text-lg tabular-nums text-slate-400 line-through">
                  {formatUSD(compare)}
                </span>
              )}
              {savings > 0 && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold tracking-tight text-blue-700">
                  {t.buyBox.save} {formatUSD(savings)}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {t.buyBox.payIn4}{" "}
              <span className="font-semibold text-slate-700">
                {formatUSD(installment)}
              </span>{" "}
              {t.buyBox.payWith}{" "}
              <span className="font-semibold tracking-tight text-slate-900">
                Klarna
              </span>
            </p>

            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            {variants.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold tracking-tight text-slate-900">
                  {t.buyBox.chooseBundle}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {variants.map((v) => {
                    const isActive = v.id === variantId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVariantId(v.id)}
                        aria-pressed={isActive}
                        className={[
                          "relative rounded-xl border bg-white p-4 text-left transition-all duration-300",
                          isActive
                            ? "border-blue-600 ring-2 ring-blue-600/15 shadow-sm"
                            : "border-slate-200 hover:border-slate-300",
                        ].join(" ")}
                      >
                        {isActive && (
                          <span className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                        )}
                        <span
                          className={[
                            "block text-sm tracking-tight transition-colors duration-300",
                            isActive
                              ? "font-bold text-slate-900"
                              : "font-semibold text-slate-700",
                          ].join(" ")}
                        >
                          {v.label}
                        </span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {v.sub}
                        </span>
                        <span
                          className={[
                            "mt-2 block text-xs font-semibold tracking-tight transition-colors duration-300",
                            isActive ? "text-blue-600" : "text-slate-400",
                          ].join(" ")}
                        >
                          {v.priceDelta === 0
                            ? "Included"
                            : `+${formatUSD(v.priceDelta)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <motion.button
              type="button"
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
            >
              <ShoppingBag className="h-5 w-5" />
              {t.buyBox.addToCart} · {formatUSD(price)}
            </motion.button>

            <Link
              href="/checkout"
              onClick={() =>
                add({
                  id: cartItemId,
                  productSlug: product.slug,
                  name: cartItemName,
                  variant: cartItemVariant,
                  price,
                  image: product.image,
                })
              }
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-slate-800"
            >
              {t.buyBox.buyNow}
            </Link>

            {/* Downloads */}
            {(manualEn || firmware) && (
              <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
                {manualEn && (
                  <a
                    href={manualEn.file}
                    download
                    className="group inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold tracking-tight text-slate-700 transition-colors duration-300 hover:bg-slate-200 hover:text-slate-900"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                    User manual
                    <span className="text-slate-400 tabular-nums">· {manualEn.size}</span>
                  </a>
                )}
                {firmware && (
                  <a
                    href={firmware.file}
                    download
                    className="group inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold tracking-tight text-slate-700 transition-colors duration-300 hover:bg-slate-200 hover:text-slate-900"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-600" />
                    Firmware <span className="tabular-nums">{firmware.version}</span>
                  </a>
                )}
              </div>
            )}

            <ul
              className={[
                "grid grid-cols-3 gap-2 border-t border-slate-100 pt-6",
                manualEn || firmware ? "mt-6" : "mt-8",
              ].join(" ")}
            >
              {GUARANTEES.map((g) => (
                <li
                  key={g.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <g.icon className="h-5 w-5 text-slate-700" strokeWidth={1.6} />
                  <span className="text-[11px] font-medium leading-tight tracking-tight text-slate-500">
                    {g.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
