// Central manifest of every downloadable artifact on the site:
//   - firmware (.bin per model + version)
//   - manuals (.pdf per model + language)
//
// The arrays below are the seeds. At runtime, /support pages call the async
// getters at the bottom of this file, which overlay admin edits stored in
// data/db.json on top of these seeds. Admin actions write to db; if no admin
// edits exist for a slug, the seed wins.

export type FirmwareRelease = {
  version: string;
  date: string; // ISO date
  size: string; // "12.4 MB"
  sha256: string; // shortened hex preview
  notes: string;
  /** Path under /public — i.e. served at this URL. */
  file: string;
  current?: boolean;
};

export type FirmwareEntry = {
  productSlug: string;
  modelLabel: string;
  releases: FirmwareRelease[];
};

export const FIRMWARE: FirmwareEntry[] = [
  {
    productSlug: "m550-pro",
    modelLabel: "M550 Pro",
    releases: [
      {
        version: "v2.4.1",
        date: "2026-03-28",
        size: "14.2 MB",
        sha256: "8c1f4a2b3d9e6f7a",
        notes:
          "Improved low-light noise reduction. Fixes occasional 5GHz Wi-Fi drop on iOS 17. Adds voice command \"Mute Audio\".",
        file: "/downloads/firmware/m550-pro-v2.4.1.bin",
        current: true,
      },
      {
        version: "v2.3.6",
        date: "2026-02-04",
        size: "13.9 MB",
        sha256: "a02b1cf83e447905",
        notes:
          "Adds ADAS lane departure warning. Tunes parking-mode wake threshold.",
        file: "/downloads/firmware/m550-pro-v2.3.6.bin",
      },
      {
        version: "v2.3.0",
        date: "2025-11-12",
        size: "13.7 MB",
        sha256: "ff2a0d12c0b88a13",
        notes:
          "5GHz Wi-Fi pairing stability for Android 14. Loop-recording overhaul.",
        file: "/downloads/firmware/m550-pro-v2.3.0.bin",
      },
    ],
  },
  {
    productSlug: "m550-max",
    modelLabel: "M550 Max",
    releases: [
      {
        version: "v1.8.2",
        date: "2026-03-14",
        size: "16.1 MB",
        sha256: "4b9c7d2a1e8f0a3b",
        notes:
          "Cabin camera audio toggle. Performance tuning for 3-channel parking mode.",
        file: "/downloads/firmware/m550-max-v1.8.2.bin",
        current: true,
      },
      {
        version: "v1.7.4",
        date: "2026-01-09",
        size: "15.7 MB",
        sha256: "c1a8e3b9d2407f15",
        notes: "Improves WDR exposure on cabin sensor.",
        file: "/downloads/firmware/m550-max-v1.7.4.bin",
      },
    ],
  },
  {
    productSlug: "pg17-pro",
    modelLabel: "PG17 Pro Mirror",
    releases: [
      {
        version: "v3.1.0",
        date: "2026-02-22",
        size: "22.4 MB",
        sha256: "9d34a0e72b15c8ff",
        notes:
          "New on-screen UI. GPS lock time reduced 40%. Improved STARVIS 2 sensor pipeline.",
        file: "/downloads/firmware/pg17-pro-v3.1.0.bin",
        current: true,
      },
      {
        version: "v3.0.4",
        date: "2025-12-18",
        size: "22.1 MB",
        sha256: "503e1a02ff8b41dd",
        notes: "Touchscreen latency improvements.",
        file: "/downloads/firmware/pg17-pro-v3.0.4.bin",
      },
    ],
  },
  {
    productSlug: "s40",
    modelLabel: "S40 360°",
    releases: [
      {
        version: "v1.2.3",
        date: "2026-03-02",
        size: "26.8 MB",
        sha256: "7a3d8b1e0c2f4519",
        notes:
          "360° stitching algorithm improvements. Resolves rare ghost frame on rear channel.",
        file: "/downloads/firmware/s40-v1.2.3.bin",
        current: true,
      },
    ],
  },
  {
    productSlug: "m17-pro",
    modelLabel: "M17 Pro",
    releases: [
      {
        version: "v1.4.5",
        date: "2026-02-02",
        size: "10.3 MB",
        sha256: "62fa9c8d4a107b3e",
        notes: "Loop recording stability fix on 256GB SD cards.",
        file: "/downloads/firmware/m17-pro-v1.4.5.bin",
        current: true,
      },
      {
        version: "v1.4.0",
        date: "2025-10-22",
        size: "10.1 MB",
        sha256: "11ab2c3d4ef50678",
        notes: "WiFi 6 pairing certification.",
        file: "/downloads/firmware/m17-pro-v1.4.0.bin",
      },
    ],
  },
  {
    productSlug: "m01-pro",
    modelLabel: "M01 Pro",
    releases: [
      {
        version: "v1.2.0",
        date: "2025-12-01",
        size: "8.6 MB",
        sha256: "a8f0e2b4d9c6135f",
        notes: "ADAS lane assist tuning. App pairing stability fixes.",
        file: "/downloads/firmware/m01-pro-v1.2.0.bin",
        current: true,
      },
    ],
  },
];

export function latestFirmware(productSlug: string): FirmwareRelease | undefined {
  const entry = FIRMWARE.find((f) => f.productSlug === productSlug);
  return entry?.releases.find((r) => r.current) ?? entry?.releases[0];
}

export type Locale = "en" | "zh" | "ja" | "de" | "fr" | "es";

export type Manual = {
  productSlug: string;
  modelLabel: string;
  pages: number;
  /** Available languages → path under /public. */
  files: Partial<Record<Locale, { file: string; size: string }>>;
};

export const MANUALS: Manual[] = [
  {
    productSlug: "m550-pro",
    modelLabel: "M550 Pro",
    pages: 24,
    files: {
      en: { file: "/downloads/manuals/m550-pro-en.pdf", size: "1.8 MB" },
      zh: { file: "/downloads/manuals/m550-pro-zh.pdf", size: "1.9 MB" },
      ja: { file: "/downloads/manuals/m550-pro-ja.pdf", size: "1.8 MB" },
      de: { file: "/downloads/manuals/m550-pro-de.pdf", size: "1.7 MB" },
      fr: { file: "/downloads/manuals/m550-pro-fr.pdf", size: "1.7 MB" },
      es: { file: "/downloads/manuals/m550-pro-es.pdf", size: "1.7 MB" },
    },
  },
  {
    productSlug: "m550-max",
    modelLabel: "M550 Max",
    pages: 28,
    files: {
      en: { file: "/downloads/manuals/m550-max-en.pdf", size: "2.1 MB" },
      zh: { file: "/downloads/manuals/m550-max-zh.pdf", size: "2.2 MB" },
      ja: { file: "/downloads/manuals/m550-max-ja.pdf", size: "2.0 MB" },
    },
  },
  {
    productSlug: "pg17-pro",
    modelLabel: "PG17 Pro Mirror",
    pages: 32,
    files: {
      en: { file: "/downloads/manuals/pg17-pro-en.pdf", size: "2.4 MB" },
      zh: { file: "/downloads/manuals/pg17-pro-zh.pdf", size: "2.5 MB" },
    },
  },
  {
    productSlug: "s40",
    modelLabel: "S40 360°",
    pages: 36,
    files: {
      en: { file: "/downloads/manuals/s40-en.pdf", size: "2.8 MB" },
    },
  },
  {
    productSlug: "m17-pro",
    modelLabel: "M17 Pro",
    pages: 20,
    files: {
      en: { file: "/downloads/manuals/m17-pro-en.pdf", size: "1.4 MB" },
      zh: { file: "/downloads/manuals/m17-pro-zh.pdf", size: "1.5 MB" },
    },
  },
  {
    productSlug: "m01-pro",
    modelLabel: "M01 Pro",
    pages: 18,
    files: {
      en: { file: "/downloads/manuals/m01-pro-en.pdf", size: "1.2 MB" },
    },
  },
];

export const LANGUAGES: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: "en", label: "English", native: "English", flag: "🇺🇸" },
  { code: "zh", label: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
];

export function getManual(productSlug: string): Manual | undefined {
  return MANUALS.find((m) => m.productSlug === productSlug);
}

// Note: DB-backed runtime getters (admin overlay) live in `lib/downloads-server.ts`.
// That file imports Node `fs` and must only be imported from server components,
// server actions, or route handlers — never from client components.
