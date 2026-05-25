"use client";

import { useMemo, useState } from "react";
import Link from "@/components/ui/Link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Hash,
} from "lucide-react";

import type { FirmwareEntry } from "@/lib/downloads";

export default function FirmwareList({ data }: { data: FirmwareEntry[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("all");
  const visible = useMemo(
    () => (activeSlug === "all" ? data : data.filter((f) => f.productSlug === activeSlug)),
    [activeSlug, data],
  );

  return (
    <>
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <Chip active={activeSlug === "all"} onClick={() => setActiveSlug("all")}>
              All models
            </Chip>
            {data.map((f) => (
              <Chip
                key={f.productSlug}
                active={activeSlug === f.productSlug}
                onClick={() => setActiveSlug(f.productSlug)}
              >
                {f.modelLabel}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl space-y-12 px-6 lg:px-10">
          {visible.map((entry) => (
            <div key={entry.productSlug}>
              <div className="mb-5 flex items-baseline justify-between border-b border-slate-100 pb-4">
                <Link
                  href={`/products/${entry.productSlug}`}
                  className="group inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 hover:text-blue-600 md:text-2xl"
                >
                  {entry.modelLabel}
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                </Link>
                <span className="text-xs uppercase tracking-[0.14em] tabular-nums text-slate-400">
                  {entry.releases.length} release{entry.releases.length !== 1 ? "s" : ""}
                </span>
              </div>

              <ul className="space-y-3">
                {entry.releases.map((r) => (
                  <li
                    key={r.version}
                    className={[
                      "rounded-2xl border bg-white p-5 transition-shadow duration-300 hover:shadow-md md:p-6",
                      r.current ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-100",
                    ].join(" ")}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-700">
                          <FileText className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold tracking-tight tabular-nums text-slate-900 md:text-lg">
                              {r.version}
                            </span>
                            {r.current && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                                <CheckCircle2 className="h-3 w-3" />
                                Current
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(r.date)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {r.size}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Hash className="h-3 w-3" />
                              {r.sha256}…
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={r.file}
                        download
                        className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download .bin
                      </a>
                    </div>
                    <p className="mt-4 border-t border-slate-50 pt-4 text-sm leading-relaxed text-slate-600">
                      {r.notes}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-1.5 text-sm font-medium tracking-tight transition-all duration-300",
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
