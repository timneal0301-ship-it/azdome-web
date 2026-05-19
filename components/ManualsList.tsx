"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";

import { LANGUAGES, type Locale, type Manual } from "@/lib/downloads";
import type { ProductDetail } from "@/lib/products";

export default function ManualsList({
  entries,
}: {
  entries: { manual: Manual; product: ProductDetail }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ manual, product }) => (
        <ManualCard key={manual.productSlug} manual={manual} product={product} />
      ))}
    </div>
  );
}

function ManualCard({ manual, product }: { manual: Manual; product: ProductDetail }) {
  const availableLangs = Object.keys(manual.files) as Locale[];
  const [activeLang, setActiveLang] = useState<Locale>(availableLangs[0]);
  const active = manual.files[activeLang];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[5/3] overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.short}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm backdrop-blur-md">
          <FileText className="h-3 w-3 text-blue-600" />
          {manual.pages} pages
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
          User Manual
        </p>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="mt-1 text-sm text-slate-500">{product.tagline}</p>
        )}

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Language
          </p>
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map((lang) => {
              const has = availableLangs.includes(lang.code);
              const isActive = activeLang === lang.code;
              return (
                <button
                  key={lang.code}
                  disabled={!has}
                  onClick={() => has && setActiveLang(lang.code)}
                  title={has ? lang.label : `${lang.label} (coming soon)`}
                  className={[
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tracking-tight transition-all duration-300",
                    isActive
                      ? "bg-slate-900 text-white"
                      : has
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-white text-slate-300 ring-1 ring-slate-100 cursor-not-allowed",
                  ].join(" ")}
                >
                  <span aria-hidden>{lang.flag}</span>
                  {lang.native}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="text-xs text-slate-500">
            {active ? (
              <>PDF · <span className="tabular-nums">{active.size}</span></>
            ) : (
              "Available on request"
            )}
          </div>
          <div className="flex gap-2">
            {active && (
              <>
                <a
                  href={active.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors duration-300 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  aria-label="View online"
                  title="View in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={active.file}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
