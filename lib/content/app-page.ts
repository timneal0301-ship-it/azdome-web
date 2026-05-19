import { Cloud, Download, MapPin, ShieldCheck, Smartphone, Sparkles, Wifi, Zap } from "lucide-react";
import type { ContentSection } from "./types";

export const FEATURES = [
  {
    icon: Wifi,
    title: "5GHz Wi-Fi pairing",
    body:
      "One-tap connection to your camera over dual-band 5 GHz Wi-Fi. No router, no cables, no juggling SD cards on the side of the road.",
  },
  {
    icon: Download,
    title: "One-tap 4K downloads",
    body:
      "Browse every clip recorded by your dash cam. Download full 4K to your phone in seconds — typically 14 MB/s on M550 Pro.",
  },
  {
    icon: Cloud,
    title: "Private Cloud Library (optional)",
    body:
      "Sync select clips to your encrypted personal library. End-to-end encrypted; we can't see what you store.",
  },
  {
    icon: MapPin,
    title: "Trip overlay with GPS",
    body:
      "GS63H and M550 Pro overlay speed, GPS coordinates, and direction on every clip — auto-stamped on download.",
  },
  {
    icon: Sparkles,
    title: "AI highlights",
    body:
      "On-device AI flags events the G-sensor catches — sharp braking, impacts, ADAS alerts — so you don't scrub through hours of footage.",
  },
  {
    icon: Zap,
    title: "Live preview",
    body:
      "See the camera's live feed on your phone for install positioning, no power cycling required.",
  },
  {
    icon: ShieldCheck,
    title: "Firmware updates",
    body:
      "OTA updates over Wi-Fi. We notify you when a new version is available; install with one tap.",
  },
  {
    icon: Smartphone,
    title: "Multi-device sync",
    body:
      "Pair multiple cameras (front + rear, or multiple vehicles) and switch between them with a tap.",
  },
];

export const FAQ = [
  {
    q: "Is the AZDOME app free?",
    a: "Yes — the app is free and required to pair your camera, browse footage, and receive firmware updates. There are no in-app purchases or paywalled features. The optional Private Cloud Library has a free tier (5 GB) and paid tiers starting at $2.99/month.",
  },
  {
    q: "Does it work over cellular?",
    a: "Pairing and footage transfer use the camera's local 5 GHz Wi-Fi. Cellular is used only for cloud sync (optional) and account features. While paired with your camera, your phone temporarily disconnects from your home Wi-Fi.",
  },
  {
    q: "Can I view footage on a desktop or laptop?",
    a: "Yes — pop the SD card into your computer or use the AZDOME Desktop Companion (Mac/Windows) which pairs over the same 5 GHz Wi-Fi. The desktop app supports batch export and rendering with GPS overlay.",
  },
  {
    q: "What languages is the app available in?",
    a: "English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Simplified Chinese, Traditional Chinese, and Arabic. The app follows your phone's language setting.",
  },
  {
    q: "Does AZDOME see my footage?",
    a: "No. Footage on the SD card is private to you. The Private Cloud Library is end-to-end encrypted — the keys live on your device, not on our servers. We have no technical ability to view your clips.",
  },
  {
    q: "Can I share clips to insurance or social?",
    a: "Yes — every clip can be downloaded to your camera roll, exported with or without GPS/speed overlay, and shared to any app on your phone. Email, iMessage, WhatsApp, Facebook, YouTube — all supported.",
  },
];

export type AppPageContent = {
  features: typeof FEATURES;
  faq: typeof FAQ;
};

export const APP_PAGE: ContentSection<AppPageContent> = {
  key: "app.page",
  label: "App 页 · Features / FAQ",
  description: "App 推广页:8 个 feature 卡片 + 常见问题。",
  page: "app",
  previewHref: "/app",
  defaults: { features: FEATURES, faq: FAQ },
};
