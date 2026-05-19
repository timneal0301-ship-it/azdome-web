"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

type FAQ = { q: string; a: string };

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "How do I install the M550 Pro?",
    a: "Most drivers finish install in under 20 minutes. Peel the 3M mount, position the camera behind your rearview mirror, route the Type-C cable along the trim using the included tool, and plug into your 12V port. For 24-hour parking mode, add the optional hardwire kit.",
  },
  {
    q: "Does it record while my car is parked?",
    a: "Yes — with the optional hardwire kit, buffered parking mode records the seconds before and after any motion or impact, preserving incidents while protecting your car battery via low-voltage cutoff.",
  },
  {
    q: "What microSD card should I use?",
    a: "We recommend a high-endurance Class 10 / U3 card, 64GB to 512GB. Cards rated for surveillance / dash-cam use last significantly longer than standard cards.",
  },
  {
    q: "Will it drain my car battery?",
    a: "No. The included cigarette-lighter cable only powers the camera while your car is running. The hardwire kit includes a smart low-voltage cutoff to protect your battery during parking mode.",
  },
  {
    q: "Can I view footage on my phone?",
    a: "Yes. Pair the M550 Pro over its built-in 5GHz Wi-Fi using the free AZDOME app. Browse, download, and share full 4K clips — no SD card removal required.",
  },
  {
    q: "What's covered by the warranty?",
    a: "All AZDOME cameras include a 12-month limited warranty against manufacturing defects, plus 30-day returns from the date of delivery, and 24×7 technical support. Register your product within 30 days for fast-track service.",
  },
  {
    q: "Can I control the camera with my voice?",
    a: "Yes — the M550 Pro and M550 Max support hands-free voice commands including \"Lock Video\", \"Take Photo\", and \"Turn on WiFi\". The microphone is always-on while the camera is recording.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FaqAccordion({
  faqs = DEFAULT_FAQS,
  title = "Questions, answered.",
  eyebrow = "FAQ",
}: {
  faqs?: FAQ[];
  title?: string;
  eyebrow?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-12 text-center md:mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            {title}
          </motion.h2>
        </motion.div>

        <ul className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <li
                key={faq.q}
                className={[
                  "rounded-xl bg-slate-50 transition-shadow duration-300",
                  open ? "shadow-sm" : "hover:bg-slate-100",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                    {faq.q}
                  </span>
                  <Plus
                    className={[
                      "h-4 w-4 flex-shrink-0 transition-transform duration-300",
                      open ? "rotate-45 text-blue-600" : "text-slate-400",
                    ].join(" ")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-slate-500 md:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
