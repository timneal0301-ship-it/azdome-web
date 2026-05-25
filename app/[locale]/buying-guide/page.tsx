import Link from "@/components/ui/Link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import CertBadges from "@/components/CertBadges";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "How to choose your dash cam",
  description:
    "From a single front camera to a 4-channel 360° system — find the right AZDOME for the way you drive.",
  alternates: { canonical: "/buying-guide" },
};

// One card per channel count. Picks the lowest-priced visible SKU for each
// tier as the "top pick" so the guide stays current with the catalog.
const TIERS: {
  channels: 1 | 2 | 3 | 4;
  title: string;
  who: string;
  highlights: string[];
  collectionSlug: string;
}[] = [
  {
    channels: 1,
    title: "1-Channel",
    who: "Drivers who want the simplest, most affordable record of the road ahead.",
    highlights: [
      "Front-facing only",
      "Cleanest install — single cable",
      "Best value entry tier",
    ],
    collectionSlug: "single-channel",
  },
  {
    channels: 2,
    title: "2-Channel",
    who: "The most common setup. Front + rear (or cabin) catches incidents from either direction.",
    highlights: [
      "Front + rear coverage",
      "Mirror, screen, or stealth options",
      "Most popular for personal cars",
    ],
    collectionSlug: "dual-channel",
  },
  {
    channels: 3,
    title: "3-Channel",
    who: "Rideshare drivers, families, and anyone who needs cabin coverage alongside front + rear.",
    highlights: [
      "Front + cabin + rear",
      "IR cabin for night passengers",
      "Standard for rideshare cooperatives",
    ],
    collectionSlug: "three-channel",
  },
  {
    channels: 4,
    title: "4-Channel · 360°",
    who: "Delivery fleets, commercial vehicles, and security-focused owners who want every angle covered.",
    highlights: [
      "Front · left · right · rear",
      "360° stitched view",
      "Built for full-time parking surveillance",
    ],
    collectionSlug: "four-channel",
  },
];

const SCENARIOS: { title: string; recommendation: string; slug?: string }[] = [
  {
    title: "I park on the street at night",
    recommendation:
      "Pair any AZDOME with a Hardwire Kit for 24-hour parking mode. The M550 Pro and M17 Pro are popular choices.",
    slug: "m550-pro",
  },
  {
    title: "I drive for Uber / Lyft / DoorDash",
    recommendation:
      "Go 3-channel so you have cabin footage alongside the road — the M550 Max is standard across most US rideshare cooperatives.",
    slug: "m550-max",
  },
  {
    title: "I want it to look factory-installed",
    recommendation:
      "Stealth mounts and mirror replacements hide the camera. The M17 Pro sits behind your rearview; the PG17 Pro replaces it entirely.",
    slug: "pg17-pro",
  },
  {
    title: "I drive a fleet vehicle / delivery van",
    recommendation:
      "A 4-channel system gives you full surround coverage — the S40 has all four angles in one mount.",
    slug: "s40",
  },
  {
    title: "I just want something simple and cheap",
    recommendation:
      "Start with the M01 Pro — 3K front + 1080p rear under $40, no compromises on the basics.",
    slug: "m01-pro",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need a hardwire kit?",
    a: "Only if you want 24-hour parking surveillance. The dash cam will run fine off your cigarette adapter when the car is on — but a hardwire kit (with built-in low-voltage cutoff) lets it record while you're away without draining your battery.",
  },
  {
    q: "How big an SD card do I need?",
    a: "64GB is the included default and works for most 1- and 2-channel setups. Move up to 128GB for 3-channel and 256GB+ if you want 4K continuous parking footage.",
  },
  {
    q: "Will it work in cold / hot weather?",
    a: "Every AZDOME ships with a super-capacitor instead of a lithium battery — rated −20°C to 70°C (−4°F to 158°F). Lithium-battery cameras tend to swell or shut off at the extremes.",
  },
  {
    q: "What's the difference between a dash cam with a screen and one without?",
    a: "A screen lets you check footage and change settings without a phone. Stealth models skip the screen for a cleaner install — you control them via the AZDOME app over Wi-Fi.",
  },
];

export default function BuyingGuidePage() {
  const tierToProduct = (channels: 1 | 2 | 3 | 4) =>
    PRODUCTS.filter(
      (p) => p.channels === channels && p.category === "dash-cam" && !p.hidden,
    ).sort((a, b) => a.price - b.price)[0];

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:pt-32 lg:px-10">
        <Breadcrumbs items={[{ label: "Buying Guide" }]} />

        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Buying Guide
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Which AZDOME is right for you?
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
            Pick a setup based on how many cameras you actually need. We split
            the lineup four ways — by channel count — because that&apos;s the
            decision that drives everything else.
          </p>
        </header>

        {/* Channel tier cards */}
        <section className="mb-20 md:mb-28">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Step 1 · Pick your channel count
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier) => {
              const topPick = tierToProduct(tier.channels);
              return (
                <Link
                  key={tier.channels}
                  href={`/collections/${tier.collectionSlug}`}
                  className="group flex flex-col rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:bg-slate-100 hover:shadow-md"
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
                    {tier.channels} Channel{tier.channels > 1 ? "s" : ""}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {tier.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {tier.who}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {tier.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  {topPick ? (
                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Top pick
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {topPick.short} · from ${topPick.price.toFixed(0)}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  ) : (
                    <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-500">
                      Coming soon
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Scenario-based recommendations */}
        <section className="mb-20 md:mb-28">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Step 2 · Match your driving
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-200 md:grid-cols-2">
            {SCENARIOS.map((s) => {
              const linkedProduct = s.slug
                ? PRODUCTS.find((p) => p.slug === s.slug)
                : undefined;
              return (
                <div key={s.title} className="bg-white p-7">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.recommendation}
                  </p>
                  {linkedProduct && (
                    <Link
                      href={`/products/${linkedProduct.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      See {linkedProduct.short}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Common questions
          </h2>
          <div className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-slate-100 pb-6">
                <h3 className="text-base font-semibold tracking-tight text-slate-900">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <div className="mb-12">
          <CertBadges variant="compact" />
        </div>

        {/* CTA */}
        <section className="rounded-2xl bg-slate-900 px-8 py-12 text-center text-white md:px-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Still not sure?
          </h2>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Our team can help match you to the right setup in under a minute.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
            <Link
              href="/support/contact"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-100"
            >
              Talk to us
            </Link>
            <Link
              href="/collections/dash-cams"
              className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/60"
            >
              Browse all dash cams
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
