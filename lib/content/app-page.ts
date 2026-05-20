import type { ContentSection } from "./types";

export const APP_FEATURE_ICONS = [
  "Wifi",
  "PlayCircle",
  "Download",
  "MapPin",
  "Settings",
  "Mic",
  "ShieldCheck",
  "Languages",
  "Folder",
  "Smartphone",
] as const;

export type AppFeature = {
  iconName: string;
  title: string;
  body: string;
  hidden?: boolean;
};

export const FEATURES: AppFeature[] = [
  {
    iconName: "Wifi",
    title: "One-tap Wi-Fi pairing",
    body:
      "Dual-band 5 GHz / 2.4 GHz Wi-Fi connects you directly to the dash cam — no router, no cables. Scan the camera's QR or pick its SSID in-app and you're paired.",
  },
  {
    iconName: "PlayCircle",
    title: "Live camera preview",
    body:
      "See exactly what the dash cam sees, in real time on your phone. Position the mount, frame the lens, and confirm coverage without starting the car twice.",
  },
  {
    iconName: "Download",
    title: "Playback & download",
    body:
      "Browse every clip on the SD card. Tap to download full-resolution 4K straight to your phone's camera roll — typically 12–15 MB/s on M550 Pro.",
  },
  {
    iconName: "MapPin",
    title: "GPS trip playback",
    body:
      "On GPS-equipped models (M550 Pro / GS63H), replay each trip on a live map with speed and direction stamped on the clip — perfect for incident review.",
  },
  {
    iconName: "Settings",
    title: "Camera settings",
    body:
      "Adjust resolution, bitrate, parking-mode behavior, G-sensor sensitivity, loop-recording length, and timestamp watermark from your phone.",
  },
  {
    iconName: "Mic",
    title: "Voice command setup",
    body:
      "Enable or disable voice commands like \"Lock Video\" and \"Take Photo\" for cameras with the built-in mic (M550 Pro / M550 Max).",
  },
  {
    iconName: "ShieldCheck",
    title: "OTA firmware updates",
    body:
      "Get notified when a new firmware ships, install it over Wi-Fi with one tap. No SD card removal, no PC required.",
  },
  {
    iconName: "Languages",
    title: "11-language interface",
    body:
      "English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German, French, Italian, Spanish, Portuguese, and Arabic. Follows your phone's language.",
  },
];

export type AppFAQ = { q: string; a: string; hidden?: boolean };

export const FAQ: AppFAQ[] = [
  {
    q: "Is the AZDOME app free?",
    a: "Yes — completely free. Pair the camera, browse clips, download footage, and apply firmware updates without ever paying. No in-app purchases, no premium tier.",
  },
  {
    q: "Will my phone still have internet while I'm connected to the camera?",
    a: "While paired, your phone temporarily switches to the camera's Wi-Fi hotspot, so your home Wi-Fi disconnects. Cellular data (4G / 5G) is unaffected. Your normal Wi-Fi reconnects automatically once you close the app.",
  },
  {
    q: "How do I view footage on my computer?",
    a: "Easiest path: pop the SD card into your computer and open the MP4 files directly — they play in any video player. If you want the GPS / speed overlay version, export it from the app first and AirDrop / email it to yourself.",
  },
  {
    q: "What languages does the app support?",
    a: "English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German, French, Italian, Spanish, Portuguese, and Arabic — 11 in total. The app follows your phone's system language automatically.",
  },
  {
    q: "Can AZDOME see my footage?",
    a: "No. Footage stays on the SD card and on your phone — the app does not upload to AZDOME servers. We have no technical way to access your clips.",
  },
  {
    q: "How do I share a clip with my insurance company?",
    a: "Download the clip to your phone's camera roll, then share via any app — email, iMessage, WhatsApp, Messenger. You can choose whether to include the GPS and speed overlay on export.",
  },
];

// ─── Download section (QR + store URLs) ─────────────────────────────

export type AppDownload = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Path to the QR code image. Admin uploads via /admin/images
   * (app-qr slot). One QR encoding a smart-redirect URL that auto-
   * detects iOS/Android works for both platforms. */
  qrImage: string;
  /** Caption shown under the QR code. */
  qrCaption: string;
  /** App Store URL for users who prefer not to scan. */
  appStoreUrl: string;
  /** Google Play URL for users who prefer not to scan. */
  googlePlayUrl: string;
  /** Square app icon shown beside the QR. */
  appIcon: string;
  /** Large phone screenshot shown on the right of the hero. */
  phoneScreenshot: string;
  /** Optional rating display (eg "★ 4.7 · 18,000+ reviews"). */
  rating?: string;
  /** Bullet list of key benefits below the headline. */
  bullets: string[];
};

export const DEFAULT_DOWNLOAD: AppDownload = {
  eyebrow: "AZDOME App",
  title: "Scan to download · iOS & Android",
  subtitle:
    "Point your phone camera at the QR — it'll send you to the App Store or Google Play automatically. One app, every AZDOME dash cam.",
  qrImage: "/images/app/qr.png",
  qrCaption: "Scan with your phone camera",
  appStoreUrl: "https://apps.apple.com/app/azdome",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.azdome",
  appIcon: "/images/app/icon.png",
  phoneScreenshot: "/images/product/m550-app.jpg",
  rating: "★ 4.7 · 18,000+ App Store reviews",
  bullets: [
    "Free — no in-app purchases",
    "Works with every AZDOME dash cam",
    "iOS 14+ · Android 8+",
  ],
};

export const APP_DOWNLOAD: ContentSection<AppDownload> = {
  key: "app.download",
  label: "App page · QR download hero",
  description:
    "Top-of-page download card. Upload the QR to the app-qr slot in /admin/images and put its path here in qrImage. For OS-aware redirect, point the QR's content at a smart-link URL (eg https://azdome.com/app/install) that 302s based on user agent.",
  page: "app",
  previewHref: "/app",
  defaults: DEFAULT_DOWNLOAD,
};

// ─── Compatibility table (editable) ─────────────────────────────────

export type AppCompatRow = {
  product: string;
  firmware: string;
  ios: string;
  android: string;
};

export const COMPATIBILITY: AppCompatRow[] = [
  { product: "M550 Pro", firmware: "v2.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M550 Max", firmware: "v2.0+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M530",     firmware: "v1.8+", ios: "iOS 14+", android: "Android 8+" },
  { product: "GS63H",    firmware: "v3.0+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M27",      firmware: "v1.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M300S",    firmware: "v2.0+", ios: "iOS 14+", android: "Android 9+" },
  { product: "M17 Pro",  firmware: "v1.2+", ios: "iOS 14+", android: "Android 8+" },
  { product: "PG17 Pro", firmware: "v1.5+", ios: "iOS 14+", android: "Android 8+" },
];

export const APP_COMPATIBILITY: ContentSection<AppCompatRow[]> = {
  key: "app.compatibility",
  label: "App page · Compatibility table",
  description: "Per-model app compatibility (firmware / iOS / Android requirements).",
  page: "app",
  previewHref: "/app",
  defaults: COMPATIBILITY,
};

// ─── Page core (features + faq) ─────────────────────────────────────

export type AppPageContent = {
  features: AppFeature[];
  faq: AppFAQ[];
};

export const APP_PAGE: ContentSection<AppPageContent> = {
  key: "app.page",
  label: "App page · Features / FAQ",
  description:
    "App marketing page core: feature cards + FAQ. Download hero and compatibility table are separate sections. " +
    `Features iconName options: ${APP_FEATURE_ICONS.join(", ")}`,
  page: "app",
  previewHref: "/app",
  defaults: { features: FEATURES, faq: FAQ },
};
