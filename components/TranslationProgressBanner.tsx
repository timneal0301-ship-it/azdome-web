"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

import { useLocale } from "./LocaleProvider";

const STORAGE_KEY = "azdome.t-progress.dismissed.v1";

/**
 * Shows a small banner under the announcement bar when the active
 * locale doesn't yet have hand-written translations — i.e. user picked
 * a country whose language we haven't translated, so the UI is
 * rendering in English under that country's branding. Dismissable per
 * locale; key includes the locale code so picking a different
 * untranslated locale re-surfaces the notice.
 */
export default function TranslationProgressBanner() {
  const { locale, countryEntry, isTranslated } = useLocale();
  const [dismissedFor, setDismissedFor] = useState<string | null>(null);

  // Read dismissal state on mount + when locale changes.
  useEffect(() => {
    try {
      setDismissedFor(localStorage.getItem(STORAGE_KEY));
    } catch {
      /* private mode */
    }
  }, [locale]);

  const dismiss = () => {
    setDismissedFor(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* private mode */
    }
  };

  const visible = !isTranslated && dismissedFor !== locale;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="overflow-hidden border-b border-amber-200 bg-amber-50 text-amber-900"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 text-xs sm:px-6 lg:px-10">
            <Info className="h-3.5 w-3.5 flex-shrink-0" />
            <p className="flex-1">
              <span className="mr-1">{countryEntry.flag}</span>
              <span className="font-semibold">{countryEntry.langLabel}</span>{" "}
              translation is in progress — pages currently render in English.
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-amber-700 transition-colors hover:bg-amber-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
