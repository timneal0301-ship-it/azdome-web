"use client";

import { motion } from "framer-motion";

import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function RelatedProducts({
  currentSlug,
  title = "Built for the same drive.",
  eyebrow = "You may also like",
}: {
  currentSlug?: string;
  title?: string;
  eyebrow?: string;
}) {
  const related = PRODUCTS.filter(
    (p) => p.category === "dash-cam" && p.slug !== currentSlug,
  ).slice(0, 3);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {related.map((p) => (
            <motion.div
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
