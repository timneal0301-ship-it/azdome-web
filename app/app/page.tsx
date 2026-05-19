import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  Download,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Wifi,
  Zap,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";

const FEATURES = [
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

const COMPATIBILITY: { product: string; firmware: string; ios: string; android: string }[] = [
  { product: "M550 Pro", firmware: "v2.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M530",      firmware: "v1.8+", ios: "iOS 14+", android: "Android 8+" },
  { product: "GS63H",     firmware: "v3.0+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M27",       firmware: "v1.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M300S",     firmware: "v2.0+", ios: "iOS 14+", android: "Android 9+" },
  { product: "M17",       firmware: "v1.2+", ios: "iOS 14+", android: "Android 8+" },
];

const FAQ = [
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

export const metadata = {
  title: "AZDOME App — AZDOME",
  description: "Download the free AZDOME app for iOS and Android. Pair, preview, and download 4K footage in seconds.",
};

export default function AppPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              AZDOME App
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Your dash cam, in your pocket.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              Pair over 5 GHz Wi-Fi, preview live, download 4K clips, and share
              in seconds — without ever touching the SD card.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.7 · 18,402 reviews on the App Store</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
              >
                Download on the App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
              >
                Get it on Google Play
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Free · iOS 14 + / Android 8 + · 78 MB
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src="/images/product/m550-app.jpg"
              alt="AZDOME app preview"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              What you can do
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Eight reasons to keep the app installed.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-slate-50 p-7 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility table */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Compatibility
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Every current AZDOME camera, on every recent OS.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Min. firmware</th>
                  <th className="px-6 py-4">iOS</th>
                  <th className="px-6 py-4">Android</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {COMPATIBILITY.map((r) => (
                  <tr key={r.product} className="text-slate-700">
                    <td className="px-6 py-4 font-semibold tracking-tight text-slate-900">
                      {r.product}
                    </td>
                    <td className="px-6 py-4 tabular-nums">{r.firmware}</td>
                    <td className="px-6 py-4">{r.ios}</td>
                    <td className="px-6 py-4">{r.android}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Older firmware versions are supported by the legacy AZDOME app available on our support page.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion faqs={FAQ} title="App questions, answered." eyebrow="FAQ" />

      {/* CTA */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Don&apos;t have a camera yet?
          </h2>
          <p className="mt-4 text-base text-slate-500 md:text-lg">
            Browse the lineup — every model works with the same free app.
          </p>
          <Link
            href="/collections/dash-cams"
            className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
          >
            Shop dash cams
          </Link>
        </div>
      </section>
    </main>
  );
}
