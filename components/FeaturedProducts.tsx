"use client";

import Link from "@/components/ui/Link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import ProductCard from "./ProductCard";
import { useLocale } from "./LocaleProvider";
import { PRODUCTS } from "@/lib/products";

const FEATURED = ["m550-pro", "m550-max", "pg17-pro", "m17-pro"]
  .map((slug) => PRODUCTS.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturedProducts() {
  const { t } = useLocale();
  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
            >
              {t.featured.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
            >
              {t.featured.title}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/collections/dash-cams"
              className="group inline-flex items-center gap-1 text-sm font-semibold tracking-tight text-blue-600 transition-colors duration-300 hover:text-blue-700"
            >
              {t.featured.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {FEATURED.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <ProductCard product={{ ...p, name: p.short }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
