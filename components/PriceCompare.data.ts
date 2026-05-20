export type CompareBrand = {
  name: string;
  price?: string;
  /** When true, this column gets the brand highlight ring + badge. */
  highlight?: boolean;
};

export type CompareRow = {
  feature: string;
  /** Aligned with `brands[]`. Either a short string ("Yes", "256GB", "—") or
   * a special sentinel "✓" / "✗" / "—" for icon cells. */
  values: string[];
};

export type CompareContent = {
  eyebrow?: string;
  title?: string;
  body?: string;
  brands: CompareBrand[];
  rows: CompareRow[];
};

export const DEFAULT_COMPARE: CompareContent = {
  eyebrow: "Why AZDOME",
  title: "More inside. Less to pay.",
  body: "We benchmarked the M550 Pro against the dash cams shoppers ask about most. Here's what you get for your money — and what you don't.",
  brands: [
    { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
    { name: "Brand X 4K", price: "$169" },
    { name: "Brand Y Mirror", price: "$239" },
  ],
  rows: [
    { feature: "True 4K (3840×2160) front", values: ["✓", "✓", "✗"] },
    { feature: "Sony Starvis 2 sensor", values: ["✓", "✗", "✗"] },
    { feature: "Dual-band 5GHz Wi-Fi", values: ["✓", "—", "✓"] },
    { feature: "Built-in GPS", values: ["✓", "✓", "✗"] },
    { feature: "On-device ADAS", values: ["✓", "—", "✗"] },
    { feature: "24h parking mode", values: ["✓", "—", "✓"] },
    { feature: "Free firmware updates", values: ["5 years", "1 year", "—"] },
    { feature: "Warranty included", values: ["2 years", "1 year", "1 year"] },
  ],
};
