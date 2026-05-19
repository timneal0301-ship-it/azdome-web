"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useLocale } from "./LocaleProvider";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Got rear-ended on the 101. The M550 footage settled the claim in under a week. Easily the best $130 I've spent on my car.",
    name: "Marcus T.",
    role: "Rideshare driver · San Francisco",
    avatar: "/images/avatars/marcus.jpg",
    rating: 5,
  },
  {
    quote:
      "Installed it myself in 20 minutes. The night vision is genuinely impressive — I can read plates two cars ahead at 2am.",
    name: "Priya K.",
    role: "Daily commuter · Austin",
    avatar: "/images/avatars/priya.jpg",
    rating: 5,
  },
  {
    quote:
      "We have three of these across our fleet. The 5GHz WiFi makes pulling footage actually painless. Never going back to SD-card-shuffling.",
    name: "Daniel R.",
    role: "Fleet manager · Denver",
    avatar: "/images/avatars/daniel.jpg",
    rating: 5,
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

export default function Testimonials() {
  const { t } = useLocale();
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14 max-w-2xl md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
          >
            {t.testimonials.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
          >
            {t.testimonials.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className="flex flex-col rounded-2xl bg-slate-50 p-7 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-8"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={[
                      "h-4 w-4",
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200",
                    ].join(" ")}
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700 md:text-lg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
