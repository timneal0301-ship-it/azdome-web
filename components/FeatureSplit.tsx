"use client";

import Image from "@/components/ui/HQImage";
import { motion } from "framer-motion";
import {
  Eye,
  ShieldCheck,
  Smartphone,
  Wifi,
  Zap,
  Moon,
  Camera,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DEFAULT_FEATURES, type FeatureBlock } from "./FeatureSplit.data";

const ICONS: Record<string, LucideIcon> = {
  Eye,
  ShieldCheck,
  Smartphone,
  Wifi,
  Zap,
  Moon,
  Camera,
  Cloud,
};

export default function FeatureSplit({
  features = DEFAULT_FEATURES,
}: {
  features?: FeatureBlock[];
}) {
  const visible = features.filter((f) => !f.hidden);
  if (visible.length === 0) return null;
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-6 md:gap-32 lg:px-10">
        {visible.map((feature, i) => (
          <FeatureRow
            key={feature.title}
            feature={feature}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  reverse,
}: {
  feature: FeatureBlock;
  reverse: boolean;
}) {
  const Icon = ICONS[feature.iconName] ?? Eye;
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={["max-w-xl", reverse ? "lg:order-2" : ""].join(" ")}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </span>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          {feature.eyebrow}
        </p>
        <h3 className="mt-3 text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
          {feature.description}
        </p>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm md:aspect-[5/4]",
          reverse ? "lg:order-1" : "",
        ].join(" ")}
      >
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
