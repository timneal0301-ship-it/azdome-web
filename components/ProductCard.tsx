"use client";

import Link from "next/link";
import Image from "@/components/ui/HQImage";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useAssetUrl } from "./AssetUrlsProvider";

export type Product = {
  slug: string;
  name: string;
  tagline?: string;
  image: string;
  price: number;
  comparePrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
};

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function ProductCard({
  product,
  href,
}: {
  product: Product;
  href?: string;
}) {
  const imageSrc = useAssetUrl(product.image);
  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group flex flex-col"
    >
      <Link
        href={href ?? `/products/${product.slug}`}
        className="block overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div className="relative aspect-square w-full">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105 md:p-10"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 px-1">
        {product.rating !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium tracking-tight text-slate-700">
              {product.rating}
            </span>
            {product.reviewCount && (
              <span className="text-slate-400">
                ({product.reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}
        <Link
          href={href ?? `/products/${product.slug}`}
          className="mt-1.5 block text-base font-semibold tracking-tight text-slate-900 transition-colors duration-300 hover:text-blue-600 md:text-lg"
        >
          {product.name}
        </Link>
        {product.tagline && (
          <p className="mt-1 text-sm text-slate-500">{product.tagline}</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold tracking-tight tabular-nums text-slate-900">
            {formatUSD(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <>
              <span className="text-sm tabular-nums text-slate-400 line-through">
                {formatUSD(product.comparePrice)}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold tracking-tight text-blue-700">
                Save {formatUSD(product.comparePrice - product.price)}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
