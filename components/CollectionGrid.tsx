"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import ProductCard, { type Product } from "./ProductCard";

type Props = {
  products: Product[];
  facets?: { label: string; value: string }[];
};

const DEFAULT_FACETS = [
  { label: "All", value: "all" },
  { label: "4K", value: "4k" },
  { label: "Dual Channel", value: "dual" },
  { label: "With Screen", value: "screen" },
  { label: "Stealth Mount", value: "stealth" },
  { label: "Under $100", value: "under-100" },
];

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "rating", label: "Top Rated" },
];

export default function CollectionGrid({
  products,
  facets = DEFAULT_FACETS,
}: Props) {
  const [activeFacet, setActiveFacet] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div>
      {/* Filter + sort toolbar */}
      <div className="sticky top-[100px] z-20 -mx-6 mb-10 border-b border-slate-100 bg-white/85 px-6 py-4 backdrop-blur-xl md:top-[124px] lg:-mx-10 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {facets.map((f) => {
              const active = activeFacet === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFacet(f.value)}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs font-medium tracking-tight transition-all duration-300 md:text-sm",
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium tracking-tight text-slate-700 transition-all duration-300 hover:bg-slate-200"
            >
              Sort:{" "}
              <span className="text-slate-900">
                {SORTS.find((s) => s.key === sort)?.label}
              </span>
              <ChevronDown
                className={[
                  "h-3.5 w-3.5 transition-transform duration-300",
                  sortOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100">
                {SORTS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setSort(s.key);
                      setSortOpen(false);
                    }}
                    className={[
                      "block w-full px-4 py-2.5 text-left text-sm transition-colors duration-300",
                      sort === s.key
                        ? "bg-slate-50 font-semibold text-slate-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
      >
        {sorted.map((p) => (
          <motion.div
            key={p.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
