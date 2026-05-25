export type Variant = {
  id: string;
  label: string;
  sub: string;
  priceDelta: number;
};

/** Resolution tier. 3K = 2880×1620, 2K = 2560×1440, FHD = 1920×1080. */
export type Resolution = "FHD" | "2K" | "3K" | "4K";

/** Stable feature flags used for filtering, faceting, and structured data. */
export type ProductFeature =
  | "ADAS"
  | "WiFi"
  | "GPS"
  | "Parking24h"
  | "VoiceControl"
  | "NightVision"
  | "TouchScreen"
  | "Mirror"
  | "Stealth"
  | "360View";

export type ProductDetail = {
  slug: string;
  name: string;
  short: string;
  tagline?: string;
  image: string;
  price: number;
  comparePrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  description: string;
  variants?: Variant[];
  gallery: { src: string; alt: string; hidden?: boolean }[];
  category: "dash-cam" | "accessory";
  /** Camera channel count. Omitted for accessories. 1 = single-cam, 4 = 360°. */
  channels?: 1 | 2 | 3 | 4;
  /** True when the unit ships with its own display (incl. mirror screens). */
  hasScreen?: boolean;
  /** Front-camera native resolution (drives collection filters + JSON-LD). */
  maxResolution?: Resolution;
  /** Feature flags — used by collection facets and Product schema. */
  features?: ProductFeature[];
  /** Set to true to soft-hide the product from collection/featured grids. */
  hidden?: boolean;
};

// Lineup based on AZDOME's official VIP store catalog.
// Real model names, real MSRP, real positioning. Specs and processor models
// are public manufacturing facts (not copyrightable).
//
// Convention: every product's images live under
//   /images/products/<slug>/<N>.jpg  for N = 1..6
// — see PRODUCT_SLOT_COUNT in lib/image-slots.ts. We keep `gallery` empty
// because `getProductForPDP` auto-fills it from the 6 standard slots.
// `image` always points to slot-1 (the cover); admin uploads to slot-1
// replace it automatically.
export const PRODUCTS: ProductDetail[] = [
  {
    slug: "m550-pro",
    name: "M550 Pro 2CH 4K Dash Cam",
    short: "M550 Pro",
    tagline: "Dual-Channel 4K Clarity · Inside & Out",
    image: "/images/products/m550-pro/1.jpg",
    price: 129.99,
    comparePrice: 169.99,
    rating: 4.8,
    reviewCount: 1284,
    badge: "Best Seller",
    description:
      "Front 4K (3840×2160) + cabin 1080p with Sony STARVIS-grade sensors. 6-layer IR night vision sees clearly in near-zero light. Built-in dual-band 5G/2.4G WiFi, GPS, 3.19\" IPS screen, voice control, and 24-hour parking mode protected by a super capacitor (−4°F to 158°F).",
    variants: [
      { id: "with-64gb", label: "With 64GB SD", sub: "High-endurance · included", priceDelta: 0 },
      { id: "with-128gb", label: "Upgrade to 128GB", sub: "Up to 2× footage", priceDelta: 14.99 },
    ],
    gallery: [],
    category: "dash-cam",
    channels: 2,
    hasScreen: true,
    maxResolution: "4K",
    features: ["WiFi", "GPS", "Parking24h", "VoiceControl", "NightVision", "TouchScreen"],
  },
  {
    slug: "m550-max",
    name: "M550 Max 3CH 4K Dash Cam",
    short: "M550 Max",
    tagline: "Three cameras. One mount.",
    image: "/images/products/m550-max/1.jpg",
    price: 139.99,
    comparePrice: 179.99,
    rating: 4.7,
    reviewCount: 503,
    badge: "New",
    description:
      "Front 4K + cabin + rear, all running through a single mount. Built for rideshare and family fleets — WDR night vision, 5G WiFi, GPS, and 3.19\" screen. The 3-channel coverage that 12 of the top US rideshare cooperatives ship as standard.",
    variants: [
      { id: "with-64gb", label: "With 64GB SD", sub: "Included", priceDelta: 0 },
      { id: "with-128gb", label: "Upgrade to 128GB", sub: "Recommended for 3-channel", priceDelta: 19.99 },
    ],
    gallery: [],
    category: "dash-cam",
    channels: 3,
    hasScreen: true,
    maxResolution: "4K",
    features: ["WiFi", "GPS", "Parking24h", "NightVision", "TouchScreen"],
  },
  {
    slug: "pg17-pro",
    name: "PG17 Pro 4K Mirror Dash Cam",
    short: "PG17 Pro",
    tagline: "Replace your mirror. Upgrade your view.",
    image: "/images/products/pg17-pro/1.jpg",
    price: 279.99,
    comparePrice: 329.99,
    rating: 4.6,
    reviewCount: 412,
    badge: "Flagship",
    description:
      "12-inch touchscreen mirror dash cam powered by the Sony STARVIS 2 IMX678 sensor. 4K front + 2.5K rear with dual HDR. ADAS lane departure, forward collision, and pedestrian alerts. The most advanced platform we ship.",
    variants: [
      { id: "with-64gb", label: "With 64GB SD", sub: "Included", priceDelta: 0 },
      { id: "with-256gb", label: "Upgrade to 256GB", sub: "For 4K continuous parking", priceDelta: 39.99 },
    ],
    gallery: [],
    category: "dash-cam",
    channels: 2,
    hasScreen: true,
    maxResolution: "4K",
    features: ["ADAS", "WiFi", "GPS", "Parking24h", "NightVision", "TouchScreen", "Mirror"],
  },
  {
    slug: "s40",
    name: "S40 4-Channel 4K 360° Dash Cam",
    short: "S40",
    tagline: "360°. Every corner covered.",
    image: "/images/products/s40/1.jpg",
    price: 299.99,
    rating: 4.6,
    reviewCount: 287,
    description:
      "Four cameras — front, left, right, rear — stitched into a 360° view. The choice for delivery fleets and security-focused owners. WDR night vision and continuous parking mode across all four channels.",
    gallery: [],
    category: "dash-cam",
    channels: 4,
    hasScreen: false,
    maxResolution: "4K",
    features: ["WiFi", "GPS", "Parking24h", "NightVision", "360View"],
  },
  {
    slug: "m17-pro",
    name: "M17 Pro 4K Stealth Dash Cam",
    short: "M17 Pro",
    tagline: "Disappears behind your mirror.",
    image: "/images/products/m17-pro/1.jpg",
    price: 59.99,
    comparePrice: 79.99,
    rating: 4.5,
    reviewCount: 762,
    description:
      "4K front + 1080p rear in an OEM-style profile that hides behind the rearview mirror. WiFi 6 pairing, ADAS, super night vision, and a 64GB high-endurance card included. The new entry to AZDOME quality.",
    variants: [
      { id: "with-64gb", label: "With 64GB SD", sub: "Included free", priceDelta: 0 },
    ],
    gallery: [],
    category: "dash-cam",
    channels: 2,
    hasScreen: false,
    maxResolution: "4K",
    features: ["ADAS", "WiFi", "NightVision", "Stealth"],
  },
  {
    slug: "m01-pro",
    name: "M01 Pro 3K Dual-Channel Dash Cam",
    short: "M01 Pro",
    tagline: "Reliable 3K, every drive.",
    image: "/images/products/m01-pro/1.jpg",
    price: 34.99,
    rating: 4.3,
    reviewCount: 1102,
    description:
      "The most affordable AZDOME you can put on a windshield. 3K front + 1080p rear, 3-inch IPS screen, ADAS lane assist, GPS, WiFi. No compromises on capture quality — just a price built for everyone.",
    gallery: [],
    category: "dash-cam",
    channels: 2,
    hasScreen: true,
    maxResolution: "3K",
    features: ["ADAS", "WiFi", "GPS", "TouchScreen"],
  },
  {
    slug: "hardwire-kit",
    name: "Hardwire Kit (Type-C, 3-Lead)",
    short: "Hardwire Kit",
    tagline: "Required for 24h parking mode",
    image: "/images/products/hardwire-kit/1.jpg",
    price: 19.99,
    rating: 4.7,
    reviewCount: 542,
    description:
      "Powers your dash cam from your fuse box with built-in low-voltage cutoff to protect your car battery. The piece you need to unlock 24-hour parking surveillance on any AZDOME model.",
    gallery: [],
    category: "accessory",
  },
  {
    slug: "sd-card-128",
    name: "128GB High-Endurance SD Card",
    short: "128GB SD Card",
    tagline: "Class 10 U3, pre-formatted",
    image: "/images/products/sd-card-128/1.jpg",
    price: 29.99,
    rating: 4.8,
    reviewCount: 1102,
    description:
      "Designed for continuous dash-cam recording. Survives 3× the write cycles of standard cards. Pre-formatted FAT32 — plug in and go.",
    gallery: [],
    category: "accessory",
  },
  {
    slug: "mount-3m",
    name: "Replacement 3M Adhesive Mount",
    short: "3M Mount",
    tagline: "Residue-free, OEM grade",
    image: "/images/products/mount-3m/1.jpg",
    price: 9.99,
    rating: 4.5,
    reviewCount: 218,
    description:
      "Spare mounting bracket with pre-applied 3M adhesive. Fits all current AZDOME dash cams. Includes alcohol wipe for windshield prep.",
    gallery: [],
    category: "accessory",
  },
];

export function getProduct(slug: string): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export type Collection = {
  slug: string;
  title: string;
  description: string;
  productSlugs: string[];
};

// ── Channel-count collections (auto-derived) ─────────────────────────
//
// These are the brand's primary product taxonomy: single / dual / triple /
// quad channel + accessories. Product membership is computed from the
// `channels` field on each ProductDetail — adding a new SKU and tagging
// its channel count automatically slots it into the right collection.
//
// `single-channel` may render empty today (no 1-channel SKU shipped yet);
// the collection page handles that with a "products coming soon" state.

const byChannel = (n: 1 | 2 | 3 | 4): string[] =>
  PRODUCTS.filter((p) => p.channels === n).map((p) => p.slug);

const byCategory = (cat: ProductDetail["category"]): string[] =>
  PRODUCTS.filter((p) => p.category === cat).map((p) => p.slug);

const byFeature = (f: ProductFeature): string[] =>
  PRODUCTS.filter((p) => p.features?.includes(f)).map((p) => p.slug);

const byScreen = (hasScreen: boolean): string[] =>
  PRODUCTS.filter((p) => p.category === "dash-cam" && p.hasScreen === hasScreen).map(
    (p) => p.slug,
  );

export const COLLECTIONS: Collection[] = [
  // ── Primary: by channel count ──────────────────────────────────────
  {
    slug: "dash-cams",
    title: "All Dash Cams",
    description:
      "From the entry-level M01 Pro to the S40 360° system — every camera engineered to keep recording when it matters.",
    productSlugs: byCategory("dash-cam"),
  },
  {
    slug: "single-channel",
    title: "Single-Channel Dash Cams",
    description:
      "One forward-facing camera. The simplest, most affordable way to start protecting your drives.",
    productSlugs: byChannel(1),
  },
  {
    slug: "dual-channel",
    title: "Dual-Channel Dash Cams",
    description:
      "Front + rear (or front + cabin). Cover both directions and catch incidents from any angle.",
    productSlugs: byChannel(2),
  },
  {
    slug: "three-channel",
    title: "Three-Channel Dash Cams",
    description:
      "Front, cabin, and rear in a single setup. The gold standard for rideshare and family fleets.",
    productSlugs: byChannel(3),
  },
  {
    slug: "four-channel",
    title: "Four-Channel & 360° Dash Cams",
    description:
      "Full 360° coverage — front, left, right, rear. Built for delivery fleets and security-conscious owners.",
    productSlugs: byChannel(4),
  },

  // ── Accessories ────────────────────────────────────────────────────
  {
    slug: "accessories",
    title: "Accessories",
    description:
      "Hardwire kits, SD cards, mounts — everything to complete your setup.",
    productSlugs: byCategory("accessory"),
  },
  {
    slug: "sd-cards",
    title: "Memory Cards",
    description: "High-endurance, dash-cam-rated SD cards.",
    productSlugs: ["sd-card-128"],
  },
  {
    slug: "hardwire",
    title: "Hardwire Kits",
    description:
      "Power your dash cam from your fuse box for 24h parking surveillance.",
    productSlugs: ["hardwire-kit"],
  },
  {
    slug: "mounts",
    title: "Mounts & Adhesives",
    description: "Spare 3M brackets and replacement adhesives.",
    productSlugs: ["mount-3m"],
  },

  // ── Feature-based (secondary navigation) ───────────────────────────
  {
    slug: "with-screen",
    title: "With Built-in Touchscreen",
    description: "Instant playback. No phone required.",
    productSlugs: byScreen(true),
  },
  {
    slug: "stealth",
    title: "Stealth Mount Dash Cams",
    description:
      "Slim, OEM-style profiles that disappear behind your rearview mirror.",
    productSlugs: byFeature("Stealth"),
  },
  {
    slug: "refurbished",
    title: "Refurbished",
    description: "Certified pre-owned. Inspected, repackaged, warrantied.",
    productSlugs: ["m550-pro", "m17-pro"],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export type Scenario = {
  slug: string;
  title: string;
  intro: string;
  body: string;
  image: string;
  recommendedSlugs: string[];
};

export const SCENARIOS: Scenario[] = [
  {
    slug: "family",
    title: "Family Road Trips",
    intro: "Memories worth keeping. In 4K.",
    body:
      "From the first turn out of the driveway to the last mile home, your dash cam captures the moments you'll want to relive — and the ones you'd rather have evidence of.",
    image: "/images/scenarios/family.jpg",
    recommendedSlugs: ["m550-pro", "pg17-pro"],
  },
  {
    slug: "rideshare",
    title: "Rideshare & Delivery Drivers",
    intro: "Protect every passenger. Protect yourself.",
    body:
      "Three-channel coverage gives you front road, cabin interior, and rear view simultaneously — the gold standard for rideshare and delivery drivers. M550 Max is standard issue across 12 of the top 25 US cooperatives.",
    image: "/images/scenarios/rideshare.jpg",
    recommendedSlugs: ["m550-max", "m550-pro"],
  },
  {
    slug: "parking",
    title: "24/7 Parking Surveillance",
    intro: "Eyes on your car. Even when you're not.",
    body:
      "Buffered parking mode records the seconds before and after any motion or impact. Add the hardwire kit and your camera works 24 hours a day, with low-voltage cutoff to protect your battery.",
    image: "/images/scenarios/parking.jpg",
    recommendedSlugs: ["m550-pro", "m17-pro", "hardwire-kit"],
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
