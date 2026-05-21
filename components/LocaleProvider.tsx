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
  TRANSLATED_LOCALES,
  getDict,
} from "@/lib/i18n/dictionaries";
import {
  COUNTRIES,
  DEFAULT_COUNTRY_CODE,
  type CountryEntry,
} from "@/lib/i18n/regions";

type LocaleContextValue = {
  /** Country code (e.g. "us", "jp"). Persists across sessions. */
  country: string;
  /** Country entry — flag, native name, language label, locale code. */
  countryEntry: CountryEntry;
  /** Effective locale used to look up the dictionary. */
  locale: Locale;
  /** True if the active locale has hand-written translations. False
   *  means the UI is rendering English content under a non-English meta. */
  isTranslated: boolean;
  setCountry: (code: string) => void;
  t: Dict;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

const STORAGE_KEY = "azdome.country.v1";

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to US (English). Switch to stored preference on mount.
  const [country, setCountryState] = useState<string>(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && COUNTRIES[stored]) {
        setCountryState(stored);
      }
    } catch {
      /* private mode / storage disabled */
    }
  }, []);

  const setCountry = useCallback((code: string) => {
    if (!COUNTRIES[code]) return;
    setCountryState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* private mode / quota */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const entry = COUNTRIES[country] ?? COUNTRIES[DEFAULT_COUNTRY_CODE];
    const locale = entry.locale;
    const isTranslated = TRANSLATED_LOCALES.includes(locale);
    return {
      country,
      countryEntry: entry,
      locale,
      isTranslated,
      setCountry,
      t: getDict(locale),
    };
  }, [country, setCountry]);

  useEffect(() => {
    // Set <html lang> to the effective locale's BCP-47 tag, but only when
    // it's a translated locale — otherwise the document is still English.
    const tag = value.isTranslated
      ? DICTIONARIES[value.locale].meta.lang
      : "en";
    document.documentElement.lang = tag;
    // Right-to-left scripts: Arabic. Apply dir on <html> so future
    // layout code can lean on it.
    document.documentElement.dir = value.locale === "ar" ? "rtl" : "ltr";
  }, [value.locale, value.isTranslated]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
