"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe, X } from "lucide-react";

import { useLocale } from "./LocaleProvider";
import { REGIONS } from "@/lib/i18n/regions";

type Variant = "dark" | "light";

/**
 * 70mai-style country / region picker. The trigger is a small pill that
 * shows the current country flag + language label. Clicking it opens a
 * full-screen modal with all regions stacked vertically — each region is
 * a header followed by a responsive grid of countries (flag + native
 * country name + native language label). Picking a country sets the
 * locale via LocaleProvider and closes the modal.
 */
export default function LanguageSwitcher({
  variant = "dark",
}: {
  variant?: Variant;
  /** Kept for API compat — modal centers itself, so alignment is moot. */
  align?: "left" | "right";
}) {
  const { country, countryEntry, setCountry, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isLight = variant === "light";

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={t.langSwitcher.region}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300",
        isLight
          ? "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
      ].join(" ")}
    >
      <Globe className="h-3.5 w-3.5" />
      <span aria-hidden className="text-base leading-none">
        {countryEntry.flag}
      </span>
      <span className="hidden sm:inline">{countryEntry.langLabel}</span>
      <ChevronDown
        className={[
          "h-3 w-3 transition-transform duration-300",
          open ? "rotate-180" : "",
        ].join(" ")}
      />
    </button>
  );

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.langSwitcher.region}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Globe className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
                    {t.langSwitcher.region}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Select your country to choose your store and language.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Region sections — stacked vertically, each with its own
                country grid. Sticky region label on the left at md+. */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
              {REGIONS.map((region) => (
                <section
                  key={region.key}
                  className="grid grid-cols-1 gap-4 border-t border-slate-100 py-6 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr] md:gap-8"
                >
                  <div className="md:sticky md:top-0 md:self-start">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                      {region.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {region.countries.length} {region.countries.length === 1 ? "region" : "regions"}
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {region.countries.map((c) => {
                      const active = c.code === country;
                      return (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => {
                              setCountry(c.code);
                              setOpen(false);
                            }}
                            className={[
                              "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              active
                                ? "bg-blue-50 ring-1 ring-blue-200"
                                : "ring-1 ring-transparent hover:bg-slate-50",
                            ].join(" ")}
                          >
                            <span
                              className="text-2xl leading-none"
                              aria-hidden
                            >
                              {c.flag}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p
                                className={[
                                  "truncate text-sm font-semibold tracking-tight",
                                  active ? "text-blue-900" : "text-slate-900",
                                ].join(" ")}
                              >
                                {c.name}
                              </p>
                              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                                {c.langLabel}
                              </p>
                            </div>
                            {active && (
                              <Check className="h-4 w-4 flex-shrink-0 text-blue-600" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
