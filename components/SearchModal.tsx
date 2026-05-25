"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

import { PRODUCTS, COLLECTIONS } from "@/lib/products";
import { useLocale } from "./LocaleProvider";

const POPULAR = ["4K", "Dual channel", "Hardwire kit", "Parking mode", "SD card"];

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const productHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  const collectionHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return COLLECTIONS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    ).slice(0, 4);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[65]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-label="Site search"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-24 w-full max-w-2xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-100">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  autoFocus
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.modals.searchPlaceholder}
                  className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  aria-label="Close search"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-all duration-300 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
                {!query && (
                  <>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Popular searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-300 hover:bg-slate-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {productHits.length > 0 && (
                  <div className={query ? "mt-0" : "mt-6"}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {query ? "Products" : "Featured"}
                    </p>
                    <ul className="space-y-1">
                      {productHits.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 rounded-xl px-2 py-2 transition-all duration-300 hover:bg-slate-50"
                          >
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold tracking-tight text-slate-900">
                                {p.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                ${p.price.toFixed(2)} · {p.tagline ?? p.short}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {collectionHits.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Collections
                    </p>
                    <ul className="space-y-1">
                      {collectionHits.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/collections/${c.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 transition-all duration-300 hover:bg-slate-50"
                          >
                            {c.title}
                            <ArrowRight className="h-4 w-4 text-slate-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {query && productHits.length === 0 && collectionHits.length === 0 && (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No results for{" "}
                    <span className="font-semibold text-slate-900">{`"${query}"`}</span>
                    .
                    <br />
                    Try a model number or feature.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
