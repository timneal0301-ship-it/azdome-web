"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

import { DEFAULT_COMPARE, type CompareContent } from "./PriceCompare.data";

function Cell({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === "✗") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
        <X className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === "—") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="text-sm font-semibold tracking-tight text-slate-900">
      {value}
    </span>
  );
}

export default function PriceCompare({
  content = DEFAULT_COMPARE,
}: {
  content?: CompareContent;
}) {
  if (content.brands.length === 0 || content.rows.length === 0) return null;
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          {content.eyebrow && (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {content.eyebrow}
            </p>
          )}
          {content.title && (
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {content.title}
            </h2>
          )}
          {content.body && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              {content.body}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="sticky left-0 z-10 bg-slate-50 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Feature
                  </th>
                  {content.brands.map((b, i) => (
                    <th
                      key={b.name + i}
                      className={[
                        "px-4 py-4 text-left align-bottom",
                        b.highlight ? "bg-blue-50/50" : "",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-1">
                        {b.highlight && (
                          <span className="self-start rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                            Best value
                          </span>
                        )}
                        <span
                          className={[
                            "text-sm font-bold tracking-tight",
                            b.highlight ? "text-blue-700" : "text-slate-900",
                          ].join(" ")}
                        >
                          {b.name}
                        </span>
                        {b.price && (
                          <span
                            className={[
                              "text-xs tabular-nums",
                              b.highlight
                                ? "font-semibold text-blue-600"
                                : "text-slate-500",
                            ].join(" ")}
                          >
                            {b.price}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {content.rows.map((row, ri) => (
                  <tr key={row.feature + ri}>
                    <td className="sticky left-0 z-10 bg-white px-5 py-4 text-sm font-medium text-slate-700">
                      {row.feature}
                    </td>
                    {content.brands.map((b, ci) => (
                      <td
                        key={ci}
                        className={[
                          "px-4 py-4",
                          b.highlight ? "bg-blue-50/30" : "",
                        ].join(" ")}
                      >
                        <Cell value={row.values[ci] ?? "—"} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
