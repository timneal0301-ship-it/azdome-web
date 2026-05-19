"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Plus, Wifi, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLocale } from "./LocaleProvider";

type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  detail: string;
  image: string;
};

const FEATURES: Feature[] = [
  {
    id: "night-vision",
    icon: Moon,
    title: "Starlight Night Vision",
    summary: "See clearly in near-zero light.",
    detail:
      "Sony Starvis 2 sensor paired with an f/1.55 aperture captures plates and road signs in conditions where the human eye sees only black — no infrared washout, just true color.",
    image: "/images/features/night-vision.jpg",
  },
  {
    id: "wifi-5g",
    icon: Wifi,
    title: "Built-in 5GHz Wi-Fi",
    summary: "Transfer 4K footage in seconds.",
    detail:
      "Pair with the AZDOME app over dual-band 5GHz Wi-Fi for instant 4K downloads, live preview, and OTA firmware — no SD card removal required.",
    image: "/images/features/wifi.jpg",
  },
  {
    id: "ai-adas",
    icon: Zap,
    title: "AI Driver Assist (ADAS)",
    summary: "An intelligent co-pilot, on every drive.",
    detail:
      "On-device AI detects lane drift, forward collisions, and pedestrians in real time — alerting you before incidents happen, without sending data to the cloud.",
    image: "/images/features/adas.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TechFeature() {
  const [activeId, setActiveId] = useState(FEATURES[0].id);
  const { t } = useLocale();
  const active = FEATURES.find((f) => f.id === activeId) ?? FEATURES[0];

  return (
    <section className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
          >
            {t.tech.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            {t.tech.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg"
          >
            {t.tech.subtitle}
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Visual */}
          <div className="relative order-first aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm md:aspect-[5/4] lg:order-last lg:aspect-auto lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority={active.id === FEATURES[0].id}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-xl bg-white/85 p-4 shadow-sm backdrop-blur-md md:bottom-8 md:left-8 md:right-auto md:max-w-sm md:p-5">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <active.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-slate-900">
                      {active.title}
                    </p>
                    <p className="text-xs text-slate-500">{active.summary}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Accordion */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-3">
              {FEATURES.map((feature) => {
                const isOpen = feature.id === activeId;
                return (
                  <li
                    key={feature.id}
                    className={[
                      "rounded-xl bg-white shadow-sm transition-all duration-300",
                      isOpen ? "shadow-md" : "hover:shadow-md",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(feature.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left md:px-6 md:py-6"
                    >
                      <span
                        className={[
                          "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300",
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        <feature.icon className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <h3
                          className={[
                            "text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl",
                            isOpen ? "text-slate-900" : "text-slate-700",
                          ].join(" ")}
                        >
                          {feature.title}
                        </h3>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {feature.summary}
                        </p>
                      </div>
                      <Plus
                        className={[
                          "h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300",
                          isOpen ? "rotate-45 text-blue-600" : "rotate-0",
                        ].join(" ")}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 pl-[4.75rem] text-sm leading-relaxed text-slate-500 md:px-6 md:pl-[4.75rem]">
                            {feature.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
