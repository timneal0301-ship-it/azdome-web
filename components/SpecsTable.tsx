"use client";

import { motion } from "framer-motion";

import { DEFAULT_SPECS, type SpecGroup } from "./SpecsTable.data";

export default function SpecsTable({
  specs = DEFAULT_SPECS,
}: {
  specs?: SpecGroup[];
}) {
  const SPECS = specs.filter((g) => !g.hidden);
  if (SPECS.length === 0) return null;
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Specifications
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            The fine print, in plain text.
          </h2>
        </motion.div>

        <div className="space-y-10">
          {SPECS.map((group) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group.title}
              </h3>
              <dl className="overflow-hidden rounded-2xl bg-slate-50">
                {group.rows.map(([k, v], i) => (
                  <div
                    key={k}
                    className={[
                      "grid grid-cols-1 gap-1 px-5 py-4 md:grid-cols-[200px_1fr] md:gap-6 md:px-7 md:py-5",
                      i !== group.rows.length - 1
                        ? "border-b border-white"
                        : "",
                    ].join(" ")}
                  >
                    <dt className="text-sm font-medium text-slate-500">{k}</dt>
                    <dd className="text-sm tracking-tight text-slate-900 md:text-[15px]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
