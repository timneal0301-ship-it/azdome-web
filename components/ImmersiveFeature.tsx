"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useAssetUrl } from "./AssetUrlsProvider";
import {
  DEFAULT_IMMERSIVE,
  type ImmersiveContent,
} from "./ImmersiveFeature.data";

export default function ImmersiveFeature({
  content = DEFAULT_IMMERSIVE,
}: {
  content?: ImmersiveContent;
}) {
  const { eyebrow, titleA, titleB, subtitle, image, stats } = content;
  const src = useAssetUrl(image);
  return (
    <section
      data-hero-dark
      className="relative overflow-hidden bg-slate-950 py-24 text-white md:py-32"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.18),_transparent_60%)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
        >
          {titleA}{" "}
          <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            {titleB}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:max-w-3xl md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold tracking-tight tabular-nums text-white md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-400 md:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
