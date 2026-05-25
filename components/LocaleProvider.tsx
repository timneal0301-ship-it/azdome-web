"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
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
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  isRtlLocale,
  splitLocaleFromPath,
  withLocale,
} from "@/lib/i18n/url";

type LocaleContextValue = {
  /** Country code (e.g. "us", "jp"). Persists across sessions. */
  country: string;
  /** Country entry — flag, native name, language label, locale code. */
  countryEntry: CountryEntry;
  /** Effective locale — derived from the current URL segment. */
  locale: Locale;
  /** True if the active locale has hand-written translations. */
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
const COOKIE_KEY = "azdome-country";

/** Write/read a 1-year cookie so server components can resolve the
 *  country preference on the next request. */
function writeCookie(value: string) {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${oneYear}; SameSite=Lax`;
}

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // URL is the authoritative source of `locale`. Country picker drives
  // navigation between locales but the dictionary always follows the URL.
  const { locale: urlLocale } = splitLocaleFromPath(pathname ?? "/");
  const activeLocale: Locale = urlLocale ?? DEFAULT_LOCALE;

  // Country preference is separate — used by /where-to-buy and any region-
  // aware copy. Persists in localStorage + cookie across sessions.
  const [country, setCountryState] = useState<string>(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && COUNTRIES[stored]) {
        setCountryState(stored);
        writeCookie(stored);
      }
    } catch {
      /* private mode / storage disabled */
    }
  }, []);

  const setCountry = useCallback(
    (code: string) => {
      const entry = COUNTRIES[code];
      if (!entry) return;
      setCountryState(code);
      try {
        localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* private mode / quota */
      }
      writeCookie(code);

      // If the chosen country implies a different locale, navigate so the
      // URL reflects the new language and middleware can re-derive
      // headers/cookies cleanly. Otherwise just refresh server data so
      // region-keyed content (retailers, currency) re-renders.
      const targetLocale = entry.locale;
      if (targetLocale !== activeLocale) {
        router.push(withLocale(pathname ?? "/", targetLocale));
      } else {
        router.refresh();
      }
    },
    [activeLocale, pathname, router],
  );

  const value = useMemo<LocaleContextValue>(() => {
    const entry = COUNTRIES[country] ?? COUNTRIES[DEFAULT_COUNTRY_CODE];
    const isTranslated = TRANSLATED_LOCALES.includes(activeLocale);
    return {
      country,
      countryEntry: entry,
      locale: activeLocale,
      isTranslated,
      setCountry,
      t: getDict(activeLocale),
    };
  }, [activeLocale, country, setCountry]);

  useEffect(() => {
    // Root layout sets <html lang> + dir on initial render via headers().
    // For *client-side* navigation between locales the document element
    // isn't re-rendered by React, so sync it imperatively here.
    document.documentElement.lang = LOCALE_HTML_LANG[activeLocale];
    document.documentElement.dir = isRtlLocale(activeLocale) ? "rtl" : "ltr";
  }, [activeLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
