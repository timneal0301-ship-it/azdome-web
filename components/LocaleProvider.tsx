"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DICTIONARIES,
  type Dict,
  type Locale,
  LOCALES,
  getDict,
} from "@/lib/i18n/dictionaries";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

const STORAGE_KEY = "azdome.locale.v1";

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to English. Only switch if the user has explicitly picked
  // another locale before (stored in localStorage).
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && LOCALES.includes(stored as Locale)) {
        setLocaleState(stored as Locale);
      }
    } catch {
      /* private mode / storage disabled */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICTIONARIES[locale].meta.lang;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode / quota */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: getDict(locale) }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
