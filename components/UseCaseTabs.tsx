"use client";

import { useState } from "react";
import Image from "@/components/ui/HQImage";
import { AnimatePresence, motion } from "framer-motion";
import {
  Car,
  Globe2,
  Heart,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useAssetUrl } from "./AssetUrlsProvider";
import { DEFAULT_USE_CASE_TABS, type UseCaseTab } from "./UseCaseTabs.data";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Car,
  ShieldCheck,
  Truck,
  Heart,
  Globe2,
};

export default function UseCaseTabs({
  tabs = DEFAULT_USE_CASE_TABS,
}: {
  tabs?: UseCaseTab[];
}) {
  const TABS = tabs.filter((t) => !t.hidden);
  const [activeId, setActiveId] = useState(TABS[0]?.id ?? "");
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const imageSrc = useAssetUrl(active?.image ?? "");
  if (!active) return null;
  const ActiveIcon = ICONS[active.iconName] ?? Users;

  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Built for every drive
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            One camera. Many lives.
          </h2>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            const Icon = ICONS[tab.iconName] ?? Users;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={[
                  "relative inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-tight transition-colors duration-300 md:text-base",
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="use-case-underline"
                    className="absolute inset-x-3 bottom-[-2px] h-0.5 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image (left) — fade between tabs */}
          <div className="relative order-first aspect-[5/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm lg:aspect-auto lg:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt={active.label}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Copy (right) */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  <span className="mr-2 inline-flex items-center text-blue-600">
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                  {active.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                  {active.body}
                </p>
                <ul className="mt-7 space-y-3">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                      <span className="text-sm leading-relaxed text-slate-700 md:text-base">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
