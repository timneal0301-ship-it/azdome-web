"use client";

import { motion } from "framer-motion";
import {
  RotateCcw,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Headphones,
  Wrench,
  CheckCircle2,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const PROMISE_ICONS = [
  "RotateCcw",
  "ShieldCheck",
  "Truck",
  "HeartHandshake",
  "Headphones",
  "Wrench",
  "CheckCircle2",
  "Package",
] as const;

const ICONS: Record<string, LucideIcon> = {
  RotateCcw,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Headphones,
  Wrench,
  CheckCircle2,
  Package,
};

export type Promise = {
  iconName: string;
  title: string;
  body: string;
  hidden?: boolean;
};

export const DEFAULT_PROMISES: Promise[] = [
  {
    iconName: "RotateCcw",
    title: "30-day free returns",
    body: "Try any AZDOME camera for 30 days. If it isn't the right fit, return it for a full refund — no restocking fees.",
  },
  {
    iconName: "ShieldCheck",
    title: "2-year warranty included",
    body: "Every product is covered for two years against manufacturing defects. Wholesale orders extend to three years.",
  },
  {
    iconName: "Truck",
    title: "Free US shipping over $99",
    body: "Orders over $99 ship free to the contiguous US. Most orders arrive in 2–4 business days.",
  },
];

export default function PromiseThreeCol({
  promises = DEFAULT_PROMISES,
}: {
  promises?: Promise[];
}) {
  const visible = promises.filter((p) => !p.hidden);
  if (visible.length === 0) return null;
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ul
          className={[
            "grid grid-cols-1 gap-8 md:gap-10",
            visible.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
          ].join(" ")}
        >
          {visible.map((p, i) => {
            const Icon = ICONS[p.iconName] ?? ShieldCheck;
            return (
              <motion.li
                key={p.title + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-5"
              >
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-slate-100">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500 md:text-[15px]">
                    {p.body}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
