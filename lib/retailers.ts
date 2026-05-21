// Retailer + region data for the /where-to-buy page.

export type RegionCode =
  | "us"
  | "ca"
  | "uk"
  | "de"
  | "fr"
  | "it"
  | "es"
  | "jp"
  | "au"
  | "row"; // rest of world

export type Region = {
  code: RegionCode;
  name: string;
  nativeName?: string;
  flag: string;
};

export const REGIONS: Region[] = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "uk", name: "United Kingdom", flag: "🇬🇧" },
  { code: "de", name: "Germany", nativeName: "Deutschland", flag: "🇩🇪" },
  { code: "fr", name: "France", nativeName: "France", flag: "🇫🇷" },
  { code: "it", name: "Italy", nativeName: "Italia", flag: "🇮🇹" },
  { code: "es", name: "Spain", nativeName: "España", flag: "🇪🇸" },
  { code: "jp", name: "Japan", nativeName: "日本", flag: "🇯🇵" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "row", name: "Rest of world", flag: "🌍" },
];

export type Retailer = {
  id: string;
  name: string;
  /** Per-region URLs. If the retailer doesn't ship to a region, it's absent. */
  urls: Partial<Record<RegionCode, string>>;
  /** Which AZDOME products are available at this retailer (slugs). */
  models?: string[];
  /** Optional shipping note ("Free shipping over $99", "Prime", "Ships within 24h"). */
  perk?: string;
  /** "official" appears in a top tier with a different style. */
  tier?: "official" | "marketplace" | "retailer";
  /** 2-letter brand monogram displayed on the card. Falls back to first 2
   * chars of the name. */
  monogram?: string;
  /** Tailwind background color class for the monogram chip (eg "bg-amber-500"). */
  brandColor?: string;
};

export const RETAILERS: Retailer[] = [
  // ─── Official store ──────────────────────────────────────────────
  {
    id: "azdome-official",
    name: "AZDOME Official Store",
    tier: "official",
    urls: {
      us: "https://www.azdomevip.com",
      ca: "https://www.azdomevip.com",
      uk: "https://www.azdomevip.com",
      de: "https://www.azdomevip.com",
      fr: "https://www.azdomevip.com",
      it: "https://www.azdomevip.com",
      es: "https://www.azdomevip.com",
      jp: "https://www.azdomevip.com",
      au: "https://www.azdomevip.com",
      row: "https://www.azdomevip.com",
    },
    models: ["m550-pro", "m550-max", "pg17-pro", "s40", "m17-pro", "m01-pro"],
    perk: "Free shipping · 30-day returns · Direct from AZDOME",
  },

  // ─── Amazon (regional) ───────────────────────────────────────────
  {
    id: "amazon",
    name: "Amazon",
    tier: "marketplace",
    monogram: "Az",
    brandColor: "bg-amber-500",
    urls: {
      us: "https://www.amazon.com/stores/AZDOME/page/07BFE4C2-1CC4-4EE3-AE5D-8EACABF41000",
      ca: "https://www.amazon.ca/s?k=azdome+dash+cam",
      uk: "https://www.amazon.co.uk/s?k=azdome+dash+cam",
      de: "https://www.amazon.de/s?k=azdome+dash+cam",
      fr: "https://www.amazon.fr/s?k=azdome+dash+cam",
      it: "https://www.amazon.it/s?k=azdome+dash+cam",
      es: "https://www.amazon.es/s?k=azdome+dash+cam",
      jp: "https://www.amazon.co.jp/s?k=azdome",
      au: "https://www.amazon.com.au/s?k=azdome+dash+cam",
    },
    models: ["m550-pro", "m550-max", "pg17-pro", "s40", "m17-pro", "m01-pro"],
    perk: "Prime eligible · 4.5★ avg",
  },

  // ─── US chain retailers ──────────────────────────────────────────
  { id: "bestbuy", name: "Best Buy", tier: "retailer", monogram: "BB", brandColor: "bg-blue-500", urls: { us: "https://www.bestbuy.com/site/searchpage.jsp?st=azdome", ca: "https://www.bestbuy.ca/en-ca/search?search=azdome" }, perk: "In-store pickup available" },
  { id: "walmart", name: "Walmart", tier: "retailer", monogram: "W", brandColor: "bg-sky-500", urls: { us: "https://www.walmart.com/search?q=azdome+dash+cam" }, perk: "Same-day pickup" },
  { id: "bhphoto", name: "B&H Photo Video", tier: "retailer", monogram: "BH", brandColor: "bg-gray-700", urls: { us: "https://www.bhphotovideo.com/c/search?Ntt=azdome" }, perk: "Free expedited shipping" },
  { id: "newegg", name: "Newegg", tier: "retailer", monogram: "NE", brandColor: "bg-orange-500", urls: { us: "https://www.newegg.com/p/pl?d=azdome" } },
  { id: "target", name: "Target", tier: "retailer", monogram: "T", brandColor: "bg-red-600", urls: { us: "https://www.target.com/s?searchTerm=azdome" } },

  // ─── UK + EU ─────────────────────────────────────────────────────
  { id: "argos", name: "Argos", tier: "retailer", monogram: "Ar", brandColor: "bg-red-500", urls: { uk: "https://www.argos.co.uk/search/azdome/" } },
  { id: "currys", name: "Currys", tier: "retailer", monogram: "Cu", brandColor: "bg-purple-600", urls: { uk: "https://www.currys.co.uk/search?q=azdome" }, perk: "0% finance available" },
  { id: "mediamarkt", name: "MediaMarkt", tier: "retailer", monogram: "MM", brandColor: "bg-red-600", urls: { de: "https://www.mediamarkt.de/de/search.html?query=azdome" } },
  { id: "saturn", name: "Saturn", tier: "retailer", monogram: "S", brandColor: "bg-yellow-500", urls: { de: "https://www.saturn.de/de/search.html?query=azdome" } },
  { id: "fnac", name: "Fnac", tier: "retailer", monogram: "F", brandColor: "bg-amber-600", urls: { fr: "https://www.fnac.com/SearchResult/ResultList.aspx?Search=azdome" } },
  { id: "darty", name: "Darty", tier: "retailer", monogram: "D", brandColor: "bg-red-700", urls: { fr: "https://www.darty.com/nav/recherche.html?text=azdome" } },
  { id: "elcorteingles", name: "El Corte Inglés", tier: "retailer", monogram: "EC", brandColor: "bg-emerald-700", urls: { es: "https://www.elcorteingles.es/search/?s=azdome" } },
  { id: "mediaworld", name: "MediaWorld", tier: "retailer", monogram: "MW", brandColor: "bg-red-500", urls: { it: "https://www.mediaworld.it/it/search?query=azdome" } },

  // ─── Japan ───────────────────────────────────────────────────────
  { id: "yodobashi", name: "Yodobashi Camera", tier: "retailer", monogram: "Y", brandColor: "bg-red-600", urls: { jp: "https://www.yodobashi.com/?word=azdome" } },
  { id: "biccamera", name: "Bic Camera", tier: "retailer", monogram: "B", brandColor: "bg-orange-600", urls: { jp: "https://www.biccamera.com/bc/category/?q=azdome" } },

  // ─── Australia ───────────────────────────────────────────────────
  { id: "jbhifi", name: "JB Hi-Fi", tier: "retailer", monogram: "JB", brandColor: "bg-yellow-500", urls: { au: "https://www.jbhifi.com.au/search?query=azdome" } },
  { id: "officeworks", name: "Officeworks", tier: "retailer", monogram: "OW", brandColor: "bg-blue-700", urls: { au: "https://www.officeworks.com.au/shop/officeworks/search?q=azdome" } },
];

/** Total distinct retail channels across all regions (excluding official). */
export const TOTAL_CHANNELS = RETAILERS.filter((r) => r.tier !== "official").length;

/** Per-region retailer count (excluding official). Used to label region pills. */
export function countForRegion(code: RegionCode): number {
  return RETAILERS.filter(
    (r) => r.tier !== "official" && Boolean(r.urls[code]),
  ).length;
}

export function retailersForRegion(code: RegionCode): Retailer[] {
  return RETAILERS.filter((r) => Boolean(r.urls[code]));
}
