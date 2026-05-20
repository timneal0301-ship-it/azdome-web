"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

export type PressQuoteItem = {
  quote: string;
  outlet: string;
  hidden?: boolean;
};

export const DEFAULT_PRESS_QUOTES: PressQuoteItem[] = [
  {
    quote:
      "AZDOME has quietly become the brand to beat at this price point. Night footage is genuinely class-leading.",
    outlet: "The Verge",
  },
  {
    quote:
      "If your only complaint is that you wish more brands cared about firmware support — AZDOME is the answer.",
    outlet: "Wired",
  },
  {
    quote:
      "A five-year firmware commitment, in writing, is unheard of in this category.",
    outlet: "CNET",
  },
  {
    quote:
      "Hands on: the M550 Pro feels almost overspecced for the price.",
    outlet: "Engadget",
  },
];

const ROTATE_MS = 6000;

export default function PressQuotesStrip({
  quotes = DEFAULT_PRESS_QUOTES,
}: {
  quotes?: PressQuoteItem[];
}) {
  const visible = quotes.filter((q) => !q.hidden);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visible.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % visible.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [visible.length]);

  if (visible.length === 0) return null;
  const q = visible[index % visible.length];

  return (
    <section className="bg-slate-950 py-20 text-white md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <Quote className="mx-auto h-8 w-8 text-blue-400" />
        <div className="relative mt-6 min-h-[120px] md:min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={q.quote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                — {q.outlet}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {visible.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {visible.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Quote ${i + 1}`}
                className={[
                  "h-1 rounded-full transition-all duration-500",
                  i === index ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/60",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
