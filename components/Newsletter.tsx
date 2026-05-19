"use client";

import { motion } from "framer-motion";
import { BadgePercent, Sparkles, Truck } from "lucide-react";

import EmailCapture from "./ui/EmailCapture";

const PERKS = [
  { icon: BadgePercent, label: "Save $20 on your first order" },
  { icon: Sparkles, label: "Early access to new releases" },
  { icon: Truck, label: "Subscriber-only free shipping" },
];

export default function Newsletter() {
  return (
    <section className="bg-slate-50 px-6 py-24 md:py-32 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center shadow-lg md:px-16 md:py-20"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.35),_transparent_70%)]"
        />
        <div className="relative">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
            Join the AZDOME club
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Drive smarter. Save more.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Subscribe for product drops, drive tips, and an instant $20 off your
            first order.
          </p>

          <div className="mx-auto mt-8 flex justify-center">
            <EmailCapture
              variant="dark"
              placeholder="you@example.com"
              submitLabel="Sign me up"
              successLabel="You're in!"
              className="backdrop-blur-md"
            />
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
            {PERKS.map((p) => (
              <li
                key={p.label}
                className="flex items-center justify-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-slate-300 ring-1 ring-white/10 md:text-sm"
              >
                <p.icon className="h-4 w-4 text-blue-400" />
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
