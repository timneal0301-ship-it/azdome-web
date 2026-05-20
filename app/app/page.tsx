import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  Download,
  Folder,
  Languages,
  MapPin,
  Mic,
  PlayCircle,
  Play,
  Settings,
  ShieldCheck,
  Smartphone,
  Star,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { getContent } from "@/lib/content-server";
import {
  APP_COMPATIBILITY,
  APP_DOWNLOAD,
  APP_PAGE,
} from "@/lib/content/app-page";
import { getAssetUrlMap } from "@/lib/asset-urls";

const ICONS: Record<string, LucideIcon> = {
  Wifi,
  PlayCircle,
  Download,
  MapPin,
  Settings,
  Mic,
  ShieldCheck,
  Languages,
  Folder,
  Smartphone,
};

export const metadata = {
  title: "AZDOME App — AZDOME",
  description:
    "Download the free AZDOME app for iOS and Android. Pair your dash cam, browse footage, and update firmware over Wi-Fi.",
};

export default async function AppPage() {
  const [content, download, compatibility, assetMap] = await Promise.all([
    getContent(APP_PAGE),
    getContent(APP_DOWNLOAD),
    getContent(APP_COMPATIBILITY),
    getAssetUrlMap(),
  ]);
  const FEATURES = content.features.filter((f) => !f.hidden);
  const FAQ = content.faq.filter((f) => !f.hidden);
  // Server-side asset URL resolution: server components can't call the
  // useAssetUrl client hook, so we resolve paths from the map directly.
  const resolveAsset = (path: string) => assetMap[path] ?? path;
  const qrUrl = resolveAsset(download.qrImage);
  const iconUrl = resolveAsset(download.appIcon);
  const phoneUrl = resolveAsset(download.phoneScreenshot);

  return (
    <main className="bg-white">
      {/* QR-driven download hero */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-2 lg:px-10">
          {/* Left: copy + QR + store badges */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {download.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              {download.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {download.subtitle}
            </p>

            {download.rating && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span>{download.rating}</span>
              </div>
            )}

            {/* QR + store badges card */}
            <div className="mt-8 inline-flex flex-wrap items-center gap-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6">
              <div className="flex flex-shrink-0 flex-col items-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
                  <Image
                    src={qrUrl}
                    alt="Scan to download AZDOME app"
                    fill
                    sizes="128px"
                    className="object-contain p-2"
                  />
                </div>
                <p className="mt-2 text-[11px] font-medium text-slate-500">
                  {download.qrCaption}
                </p>
              </div>

              <div className="flex-1 space-y-3">
                {download.appIcon && (
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
                      <Image
                        src={iconUrl}
                        alt="AZDOME app icon"
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    </div>
                    <p className="text-sm font-semibold tracking-tight text-slate-900">
                      AZDOME
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={download.appStoreUrl || "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Apple className="h-4 w-4" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[9px] opacity-70">Download on the</span>
                      <span className="text-[13px]">App Store</span>
                    </span>
                  </Link>
                  <Link
                    href={download.googlePlayUrl || "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[9px] opacity-70">Get it on</span>
                      <span className="text-[13px]">Google Play</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {download.bullets.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                {download.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-blue-400" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: phone screenshot */}
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src={phoneUrl}
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
              The features you'll actually use.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.iconName] ?? Wifi;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl bg-slate-50 p-7 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {f.body}
                  </p>
                </div>
              );
            })}
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
                {compatibility.map((r) => (
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
            Older firmware versions are supported by the legacy AZDOME app
            available on the support page.
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
