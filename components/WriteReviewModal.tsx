"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Star, X } from "lucide-react";

import { useLocale } from "./LocaleProvider";

export default function WriteReviewModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setRating(5);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-label="Write a review"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label={t.modals.close}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="px-8 py-12 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                  {t.modals.reviewThanks}
                </h2>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                >
                  {t.modals.close}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="px-8 py-10"
              >
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {t.modals.reviewWrite}
                </h2>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold tracking-tight text-slate-600">
                    {t.modals.reviewRating}
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i < (hover ?? rating);
                      return (
                        <button
                          key={i}
                          type="button"
                          onMouseEnter={() => setHover(i + 1)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => setRating(i + 1)}
                          aria-label={`${i + 1} star`}
                          className="p-1 transition-transform duration-200 hover:scale-110"
                        >
                          <Star
                            className={[
                              "h-7 w-7",
                              filled
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200",
                            ].join(" ")}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                    {t.modals.reviewTitle}
                  </span>
                  <input
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </label>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                    {t.modals.reviewBody}
                  </span>
                  <textarea
                    required
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                >
                  {t.modals.reviewSubmit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
