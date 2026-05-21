"use client";

import Link from "next/link";
import Image from "@/components/ui/HQImage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useLocale } from "./LocaleProvider";

type Scenario = {
  title: string;
  tagline: string;
  href: string;
  image: string;
  span: string; // tailwind classes for grid placement
};

const SCENARIOS: Scenario[] = [
  {
    title: "Family Road Trips",
    tagline: "Memories worth keeping in 4K.",
    href: "/scenarios/family",
    image: "/images/scenarios/family.jpg",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Rideshare Safety",
    tagline: "Protect every passenger, every shift.",
    href: "/scenarios/rideshare",
    image: "/images/scenarios/rideshare.jpg",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    title: "24H Parking Monitor",
    tagline: "Eyes on your car, even when you're not.",
    href: "/scenarios/parking",
    image: "/images/scenarios/parking.jpg",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardPop = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ScenarioGrid() {
  const { t } = useLocale();
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
            >
              {t.scenarios.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="max-w-2xl text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
            >
              {t.scenarios.title}
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-base leading-relaxed text-slate-500"
          >
            {t.scenarios.subtitle}
          </motion.p>
        </motion.div>

        {/* Bento grid — stagger children */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={gridStagger}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:grid-rows-2"
        >
          {SCENARIOS.map((scenario) => (
            <ScenarioCard key={scenario.title} scenario={scenario} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <motion.div
      variants={cardPop}
      className={[
        "relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-md",
        "min-h-[280px] md:min-h-[340px] lg:min-h-0",
        scenario.span,
      ].join(" ")}
    >
      <Link
        href={scenario.href}
        className="group absolute inset-0 flex flex-col justify-end"
      >
        {/* Background image */}
        <Image
          src={scenario.image}
          alt={scenario.title}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 flex items-end justify-between gap-4 p-6 md:p-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {scenario.title}
            </h3>
            <p className="mt-1 max-w-xs text-sm text-white/75">
              {scenario.tagline}
            </p>
          </div>
          <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-slate-900">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
