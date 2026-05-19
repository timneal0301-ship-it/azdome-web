"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Star, ThumbsUp } from "lucide-react";

import WriteReviewModal from "./WriteReviewModal";

type Review = {
  id: string;
  title: string;
  body: string;
  rating: number;
  name: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  photo?: string;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    title: "Saved me $4,200 in a fault dispute",
    body: "A driver ran a red and clipped my bumper. Insurance initially blamed me. Pulled the 4K footage off the SD card, sent it in, and got a fault reversal within 72 hours. The plate readability at night is the real deal.",
    rating: 5,
    name: "Sarah W.",
    date: "Verified buyer · Mar 12, 2026",
    verified: true,
    helpful: 124,
    photo: "/images/reviews/r1.jpg",
  },
  {
    id: "r2",
    title: "Install was easier than I expected",
    body: "I was nervous about routing the rear cable, but the trim tool and 3.5m cable were perfect for my SUV. Total install: 22 minutes. App pairing was instant on 5GHz.",
    rating: 5,
    name: "Hugo M.",
    date: "Verified buyer · Feb 28, 2026",
    verified: true,
    helpful: 87,
  },
  {
    id: "r3",
    title: "Night vision is genuinely impressive",
    body: "Compared three other dash cams in my driveway at midnight. The Starvis 2 sensor on the M550 picked up details the others completely missed. 5 stars.",
    rating: 5,
    name: "Lena R.",
    date: "Verified buyer · Feb 14, 2026",
    verified: true,
    helpful: 56,
    photo: "/images/reviews/r3.jpg",
  },
  {
    id: "r4",
    title: "Great camera, parking mode needs the hardwire kit",
    body: "Camera quality is excellent. Wish parking mode was clearer in the listing — you do need to add the hardwire kit to get 24h surveillance. Once installed, works flawlessly.",
    rating: 4,
    name: "Devon P.",
    date: "Verified buyer · Feb 02, 2026",
    verified: true,
    helpful: 41,
  },
];

const DISTRIBUTION = [
  { stars: 5, percent: 87 },
  { stars: 4, percent: 9 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const FILTERS = ["All", "5★", "4★", "With Photos", "Verified"];

export default function Reviews() {
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [helpful, setHelpful] = useState<Record<string, number>>(() =>
    Object.fromEntries(REVIEWS.map((r) => [r.id, r.helpful ?? 0])),
  );
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setVoted((v) => {
      const next = { ...v, [id]: !v[id] };
      setHelpful((h) => ({
        ...h,
        [id]: (h[id] ?? 0) + (next[id] ? 1 : -1),
      }));
      return next;
    });
  };

  const visibleReviews = REVIEWS.slice(0, visible);

  return (
    <section id="reviews" className="scroll-mt-28 bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Customer reviews
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            12,000+ drivers can't be wrong.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
          {/* Summary */}
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-slate-900">
                4.8
              </span>
              <span className="text-sm text-slate-400">/ 5</span>
            </div>
            <div className="mt-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Based on 12,418 verified reviews
            </p>

            <ul className="mt-6 space-y-2.5">
              {DISTRIBUTION.map((d) => (
                <li key={d.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-7 tabular-nums text-slate-700">
                    {d.stars}★
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${d.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-right tabular-nums text-slate-400">
                    {d.percent}%
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModalOpen(true)}
              className="mt-7 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-slate-800"
            >
              Write a review
            </button>
          </div>

          {/* List */}
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs font-medium tracking-tight transition-all duration-300",
                    filter === f
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>

            <ul className="space-y-4">
              {visibleReviews.map((r) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-white p-6 shadow-sm md:p-7"
                >
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={[
                          "h-4 w-4",
                          i < r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                    {r.body}
                  </p>
                  {r.photo && (
                    <div className="relative mt-4 h-32 w-32 overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={r.photo}
                        alt={`Photo from ${r.name}`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold tracking-tight text-slate-700">
                        {r.name}
                      </span>
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      )}
                      <span className="text-slate-400">· {r.date}</span>
                    </div>
                    <button
                      onClick={() => toggleHelpful(r.id)}
                      className={[
                        "inline-flex items-center gap-1 transition-colors duration-300",
                        voted[r.id]
                          ? "text-blue-600"
                          : "text-slate-500 hover:text-slate-900",
                      ].join(" ")}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      Helpful ({helpful[r.id] ?? 0})
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            {visible < REVIEWS.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setVisible((v) => Math.min(v + 3, REVIEWS.length))}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  Load more reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <WriteReviewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
