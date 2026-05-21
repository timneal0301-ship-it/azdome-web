// Country / region picker config — mirrors 70mai's global selector.
// One country = one row; clicking it sets `locale` (used by the
// dictionary system). Many countries share English locale; only the
// non-English locales actually swap UI strings today.

import type { Locale } from "./dictionaries";

export type CountryEntry = {
  /** Short country code (lowercase ISO 3166-1 alpha-2). Used as the
   *  persisted key in localStorage. */
  code: string;
  /** Country name in its native script (e.g. "日本", "Deutschland"). */
  name: string;
  /** Flag emoji. */
  flag: string;
  /** Language label as it should appear under the country name
   *  (in the chosen native script — e.g. "日本語", "Deutsch", "English"). */
  langLabel: string;
  /** Locale code mapped to this country. Picker writes this to
   *  LocaleProvider; many countries share "en". */
  locale: Locale;
};

export type Region = {
  key: string;
  /** English region name shown in the picker header / tab. */
  label: string;
  countries: CountryEntry[];
};

export const REGIONS: Region[] = [
  {
    key: "asia-pacific",
    label: "Asia Pacific",
    countries: [
      { code: "au", name: "Australia",   flag: "🇦🇺", langLabel: "English",     locale: "en" },
      { code: "jp", name: "日本",         flag: "🇯🇵", langLabel: "日本語",       locale: "ja" },
      { code: "my", name: "Malaysia",    flag: "🇲🇾", langLabel: "English",     locale: "en" },
      { code: "th", name: "ไทย",          flag: "🇹🇭", langLabel: "ภาษาไทย",     locale: "th" },
      { code: "vn", name: "Việt Nam",    flag: "🇻🇳", langLabel: "Tiếng Việt",  locale: "vi" },
      { code: "in", name: "India",       flag: "🇮🇳", langLabel: "English",     locale: "en" },
      { code: "ph", name: "Philippines", flag: "🇵🇭", langLabel: "English",     locale: "en" },
      { code: "cn", name: "中国大陆",      flag: "🇨🇳", langLabel: "简体中文",     locale: "zh" },
    ],
  },
  {
    key: "europe",
    label: "Europe",
    countries: [
      { code: "by", name: "Belarus",        flag: "🇧🇾", langLabel: "English",      locale: "en" },
      { code: "be", name: "Belgium",        flag: "🇧🇪", langLabel: "English",      locale: "en" },
      { code: "cz", name: "Czech Republic", flag: "🇨🇿", langLabel: "English",      locale: "en" },
      { code: "dk", name: "Denmark",        flag: "🇩🇰", langLabel: "English",      locale: "en" },
      { code: "de", name: "Deutschland",    flag: "🇩🇪", langLabel: "Deutsch",      locale: "de" },
      { code: "ee", name: "Estonia",        flag: "🇪🇪", langLabel: "English",      locale: "en" },
      { code: "fr", name: "France",         flag: "🇫🇷", langLabel: "Français",     locale: "fr" },
      { code: "gr", name: "Greece",         flag: "🇬🇷", langLabel: "English",      locale: "en" },
      { code: "hu", name: "Hungary",        flag: "🇭🇺", langLabel: "English",      locale: "en" },
      { code: "ie", name: "Ireland",        flag: "🇮🇪", langLabel: "English",      locale: "en" },
      { code: "it", name: "Italia",         flag: "🇮🇹", langLabel: "italiano",     locale: "it" },
      { code: "lv", name: "Latvia",         flag: "🇱🇻", langLabel: "English",      locale: "en" },
      { code: "lt", name: "Lithuania",      flag: "🇱🇹", langLabel: "English",      locale: "en" },
      { code: "nl", name: "Netherlands",    flag: "🇳🇱", langLabel: "English",      locale: "en" },
      { code: "no", name: "Norway",         flag: "🇳🇴", langLabel: "English",      locale: "en" },
      { code: "ru", name: "Россия",          flag: "🇷🇺", langLabel: "русский язык",  locale: "ru" },
      { code: "pl", name: "Polska",         flag: "🇵🇱", langLabel: "Polski",       locale: "pl" },
      { code: "ro", name: "România",        flag: "🇷🇴", langLabel: "Română",       locale: "ro" },
      { code: "sk", name: "Slovakia",       flag: "🇸🇰", langLabel: "English",      locale: "en" },
      { code: "tr", name: "Türkiye",        flag: "🇹🇷", langLabel: "Türkçe",       locale: "tr" },
      { code: "uk", name: "United Kingdom", flag: "🇬🇧", langLabel: "English",      locale: "en" },
      { code: "es", name: "España",         flag: "🇪🇸", langLabel: "Español",      locale: "es" },
    ],
  },
  {
    key: "north-america",
    label: "North America",
    countries: [
      { code: "ca", name: "Canada",        flag: "🇨🇦", langLabel: "English", locale: "en" },
      { code: "us", name: "United States", flag: "🇺🇸", langLabel: "English", locale: "en" },
      { code: "mx", name: "México",        flag: "🇲🇽", langLabel: "Español", locale: "es" },
    ],
  },
  {
    key: "south-america",
    label: "South America",
    countries: [
      { code: "br", name: "Brasil", flag: "🇧🇷", langLabel: "Português", locale: "pt" },
    ],
  },
  {
    key: "middle-east",
    label: "The Middle East",
    countries: [
      { code: "sa", name: "المملكة العربية السعودية", flag: "🇸🇦", langLabel: "اللغة العربية", locale: "ar" },
    ],
  },
  {
    key: "other",
    label: "Other Countries and Regions",
    countries: [
      { code: "ot", name: "Other Regions", flag: "🌐", langLabel: "English", locale: "en" },
    ],
  },
];

/** Flat lookup. Used by LocaleProvider to resolve persisted country code → entry. */
export const COUNTRIES: Record<string, CountryEntry> = Object.fromEntries(
  REGIONS.flatMap((r) => r.countries).map((c) => [c.code, c]),
);

/** Default landing country when no preference is stored. */
export const DEFAULT_COUNTRY_CODE = "us";
