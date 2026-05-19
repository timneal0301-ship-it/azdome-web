"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";

import { useLocale } from "./LocaleProvider";
import { DICTIONARIES, LOCALES } from "@/lib/i18n/dictionaries";

type Variant = "dark" | "light";

export default function LanguageSwitcher({
  variant = "dark",
  align = "right",
}: {
  variant?: Variant;
  align?: "left" | "right";
}) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click / escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = DICTIONARIES[locale];

  const isLight = variant === "light";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.langSwitcher.label}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300",
          isLight
            ? "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900",
        ].join(" ")}
      >
        <Globe className="h-3.5 w-3.5" />
        <span aria-hidden>{current.meta.flag}</span>
        <span>{current.meta.short}</span>
        <ChevronDown
          className={[
            "h-3 w-3 transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="listbox"
            aria-label={t.langSwitcher.region}
            className={[
              "absolute z-50 mt-2 w-52 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-100",
              align === "left" ? "left-0" : "right-0",
            ].join(" ")}
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {t.langSwitcher.region}
              </p>
            </div>
            <ul className="py-1">
              {LOCALES.map((code) => {
                const meta = DICTIONARIES[code].meta;
                const active = code === locale;
                return (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setLocale(code);
                        setOpen(false);
                      }}
                      className={[
                        "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200",
                        active
                          ? "bg-slate-50 font-semibold text-slate-900"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                      ].join(" ")}
                    >
                      <span className="text-base leading-none" aria-hidden>
                        {meta.flag}
                      </span>
                      <span className="flex-1 truncate">{meta.name}</span>
                      {active && <Check className="h-4 w-4 text-blue-600" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
