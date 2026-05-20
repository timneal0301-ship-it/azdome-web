"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  Cable,
  Camera,
  CircleDot,
  Hammer,
  Layers,
  Package,
  Smartphone,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DEFAULT_BOX_ITEMS, type BoxItem } from "./WhatsInBox.data";

const ICONS: Record<string, LucideIcon> = {
  Camera,
  CircleDot,
  Layers,
  Cable,
  Hammer,
  BookOpen,
  Package,
  Smartphone,
  Wifi,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhatsInBox({
  image = "/images/whatsinbox.jpg",
  items = DEFAULT_BOX_ITEMS,
}: {
  image?: string;
  items?: BoxItem[];
}) {
  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 text-center md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
          >
            What&apos;s in the box
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            Everything you need. Out of the box.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <Image
              src={image}
              alt="What's in the box"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {items.map((it) => {
              const Icon = ICONS[it.iconName] ?? Package;
              return (
                <motion.li
                  key={it.name}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-slate-900">
                      {it.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{it.detail}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
