"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

import { PRODUCTS } from "@/lib/products";

type Spec = {
  label: string;
  /** Per-slug value: number | string | true | false | null. */
  values: Record<string, string | number | boolean | null>;
};

const SPECS: Spec[] = [
  {
    label: "Front resolution",
    values: { "m550-pro": "4K", "m550-max": "4K", "pg17-pro": "4K", "s40": "4K", "m17-pro": "4K", "m01-pro": "3K" },
  },
  {
    label: "Channels",
    values: { "m550-pro": "2", "m550-max": "3", "pg17-pro": "2", "s40": "4", "m17-pro": "2", "m01-pro": "2" },
  },
  {
    label: "Built-in screen",
    values: { "m550-pro": '3.19"', "m550-max": '3.19"', "pg17-pro": '12" touchscreen', "s40": false, "m17-pro": false, "m01-pro": '3"' },
  },
  {
    label: "Sony STARVIS sensor",
    values: { "m550-pro": true, "m550-max": true, "pg17-pro": "STARVIS 2 IMX678", "s40": true, "m17-pro": true, "m01-pro": false },
  },
  {
    label: "5GHz Wi-Fi",
    values: { "m550-pro": true, "m550-max": true, "pg17-pro": true, "s40": true, "m17-pro": "Wi-Fi 6", "m01-pro": "2.4GHz only" },
  },
  {
    label: "GPS",
    values: { "m550-pro": true, "m550-max": true, "pg17-pro": true, "s40": true, "m17-pro": true, "m01-pro": true },
  },
  {
    label: "24h parking mode",
    values: { "m550-pro": true, "m550-max": true, "pg17-pro": true, "s40": true, "m17-pro": true, "m01-pro": true },
  },
  {
    label: "ADAS lane / collision",
    values: { "m550-pro": "Lane departure", "m550-max": "Lane departure", "pg17-pro": "Full ADAS suite", "s40": false, "m17-pro": "Lane departure", "m01-pro": "Lane departure" },
  },
];

function renderValue(v: string | number | boolean | null) {
  if (v === true)
    return <Check className="h-5 w-5 text-emerald-600" />;
  if (v === false)
    return <X className="h-4 w-4 text-slate-300" />;
  if (v === null)
    return <Minus className="h-4 w-4 text-slate-300" />;
  return (
    <span className="text-sm font-semibold tracking-tight text-slate-900">{v}</span>
  );
}

const formatUSD = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function ProductCompare({
  currentSlug,
}: {
  currentSlug: string;
}) {
  // Compare to two siblings (other dash cams, prefer adjacent prices).
  const current = PRODUCTS.find((p) => p.slug === currentSlug);
  if (!current || current.category !== "dash-cam") return null;
  const siblings = PRODUCTS.filter(
    (p) => p.category === "dash-cam" && p.slug !== currentSlug,
  )
    .sort(
      (a, b) =>
        Math.abs(a.price - current.price) - Math.abs(b.price - current.price),
    )
    .slice(0, 2);

  const cols = [current, ...siblings];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Compare
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            How does {current.short} stack up?
          </h2>
        </motion.div>

        <div className="overflow-x-auto rounded-2xl bg-slate-50 shadow-sm">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr>
                <th className="w-[200px] px-6 py-6 align-bottom text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Feature
                </th>
                {cols.map((p, i) => {
                  const isCurrent = p.slug === currentSlug;
                  return (
                    <th
                      key={p.slug}
                      className={[
                        "px-6 py-6 align-bottom",
                        isCurrent ? "bg-white" : "",
                        i === cols.length - 1 ? "rounded-tr-2xl" : "",
                      ].join(" ")}
                    >
                      <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-xl bg-white">
                        <Image
                          src={p.image}
                          alt={p.short}
                          fill
                          sizes="120px"
                          className="object-contain p-3"
                        />
                      </div>
                      <Link
                        href={`/products/${p.slug}`}
                        className="mt-3 block text-base font-bold tracking-tight text-slate-900 hover:text-blue-600 md:text-lg"
                      >
                        {p.short}
                      </Link>
                      <p className="mt-1 text-sm tabular-nums text-slate-500">
                        {formatUSD(p.price)}
                      </p>
                      {isCurrent && (
                        <span className="mt-2 inline-flex items-center rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                          Viewing
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              {SPECS.map((spec) => (
                <tr key={spec.label} className="border-t border-white">
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    {spec.label}
                  </td>
                  {cols.map((p) => {
                    const isCurrent = p.slug === currentSlug;
                    return (
                      <td
                        key={p.slug}
                        className={[
                          "px-6 py-4",
                          isCurrent ? "bg-white" : "",
                        ].join(" ")}
                      >
                        {renderValue(spec.values[p.slug] ?? null)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t border-white">
                <td className="px-6 py-5"></td>
                {cols.map((p) => {
                  const isCurrent = p.slug === currentSlug;
                  return (
                    <td
                      key={p.slug}
                      className={[
                        "px-6 py-5",
                        isCurrent ? "rounded-b-2xl bg-white" : "",
                      ].join(" ")}
                    >
                      <Link
                        href={`/products/${p.slug}`}
                        className={[
                          "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300",
                          isCurrent
                            ? "bg-slate-100 text-slate-500"
                            : "bg-blue-600 text-white hover:bg-blue-700",
                        ].join(" ")}
                      >
                        {isCurrent ? "You're here" : `Shop ${p.short}`}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
