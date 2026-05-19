"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useAssetUrl } from "./AssetUrlsProvider";

export type ProductBanner = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  /** Tailwind grid span classes for bento layout. */
  span?: string;
  /** Background tone — controls overlay + text color. */
  tone?: "dark" | "light";
  /** Optional accent (e.g., price badge). */
  accent?: string;
};

const DEFAULT_BANNERS: ProductBanner[] = [
  {
    id: "m550-pro",
    eyebrow: "Best Seller",
    title: "M550 Pro",
    subtitle: "4K dual-channel · IR night vision",
    image: "/images/banners/mini-m550-pro.jpg",
    href: "/products/m550-pro",
    span: "lg:col-span-2 lg:row-span-2",
    tone: "dark",
    accent: "From $129.99",
  },
  {
    id: "m550-max",
    eyebrow: "New",
    title: "M550 Max",
    subtitle: "Three cameras. One mount.",
    image: "/images/banners/mini-m550-max.jpg",
    href: "/products/m550-max",
    tone: "dark",
    accent: "$139.99",
  },
  {
    id: "pg17-pro",
    eyebrow: "Flagship",
    title: "PG17 Pro Mirror",
    subtitle: "12\" touchscreen · STARVIS 2",
    image: "/images/banners/mini-pg17.jpg",
    href: "/products/pg17-pro",
    tone: "dark",
    accent: "$279.99",
  },
  {
    id: "accessories",
    eyebrow: "Complete the kit",
    title: "Accessories",
    subtitle: "Hardwire kits · SD cards · mounts",
    image: "/images/banners/mini-accessories.jpg",
    href: "/collections/accessories",
    tone: "light",
  },
  {
    id: "scenarios",
    eyebrow: "Use cases",
    title: "Designed for your drive",
    subtitle: "Family · rideshare · 24h parking",
    image: "/images/banners/mini-scenarios.jpg",
    href: "/scenarios/family",
    span: "lg:col-span-2",
    tone: "dark",
  },
];

export default function ProductBanners({
  banners = DEFAULT_BANNERS,
}: {
  banners?: ProductBanner[];
}) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 md:auto-rows-[300px] md:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-4">
          {banners.map((b, i) => (
            <BannerCard key={b.id} banner={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BannerCard({ banner, index }: { banner: ProductBanner; index: number }) {
  const isDark = (banner.tone ?? "dark") === "dark";
  const src = useAssetUrl(banner.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-md",
        banner.span ?? "",
      ].join(" ")}
    >
      <Link href={banner.href} className="absolute inset-0 z-10">
        <span className="sr-only">{banner.title}</span>
      </Link>

      <Image
        src={src}
        alt={banner.title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Overlay tint */}
      {isDark ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-slate-950/85 via-slate-950/40 to-slate-950/10"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-tr from-white/85 via-white/30 to-transparent"
        />
      )}

      {/* Content */}
      <div className="relative z-[1] flex h-full flex-col justify-between p-6 md:p-8">
        <div>
          {banner.eyebrow && (
            <span
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm",
                isDark
                  ? "bg-white/10 text-white/90"
                  : "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/5",
              ].join(" ")}
            >
              {banner.eyebrow}
            </span>
          )}
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <h3
              className={[
                "text-balance text-2xl font-bold tracking-tight md:text-3xl",
                isDark ? "text-white" : "text-slate-900",
              ].join(" ")}
            >
              {banner.title}
            </h3>
            {banner.subtitle && (
              <p
                className={[
                  "mt-1 max-w-xs text-sm",
                  isDark ? "text-white/75" : "text-slate-600",
                ].join(" ")}
              >
                {banner.subtitle}
              </p>
            )}
            {banner.accent && (
              <p
                className={[
                  "mt-3 text-xs font-semibold tabular-nums tracking-tight",
                  isDark ? "text-blue-200" : "text-blue-700",
                ].join(" ")}
              >
                {banner.accent}
              </p>
            )}
          </div>
          <span
            className={[
              "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
              isDark
                ? "bg-white/15 text-white group-hover:bg-white group-hover:text-slate-900"
                : "bg-slate-900/5 text-slate-900 group-hover:bg-slate-900 group-hover:text-white",
            ].join(" ")}
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
