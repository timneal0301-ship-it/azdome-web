"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  X,
  Zap,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import {
  REGIONS,
  RETAILERS,
  TOTAL_CHANNELS,
  countForRegion,
  retailersForRegion,
  type RegionCode,
  type Retailer,
} from "@/lib/retailers";

// Browser locale → region best-guess. Falls back to "us" if unknown.
function guessRegion(): RegionCode {
  if (typeof navigator === "undefined") return "us";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("zh") || lang.startsWith("ja")) return "jp";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("es")) return "es";
  if (lang === "en-gb" || lang === "en-uk") return "uk";
  if (lang === "en-ca") return "ca";
  if (lang === "en-au") return "au";
  if (lang.startsWith("en-us") || lang === "en") return "us";
  return "us";
}

const TRUST_ROWS = [
  {
    icon: BadgeCheck,
    title: "Genuine products",
    body:
      "Every listed reseller is an authorized AZDOME channel. We verify serial-number eligibility for warranty support.",
  },
  {
    icon: ShieldCheck,
    title: "Full 2-year warranty",
    body:
      "Same coverage whether you buy from us directly, Amazon, or a local retailer. We honor warranty across channels.",
  },
  {
    icon: Sparkles,
    title: "Firmware updates",
    body:
      "5 years of free firmware updates from the launch of every camera. Activated automatically via the AZDOME app.",
  },
  {
    icon: Headphones,
    title: "24×7 support",
    body:
      "Direct technical support from the AZDOME team — chat, email, or phone — no matter where you purchased.",
  },
];

export default function WhereToBuyPage() {
  const [region, setRegion] = useState<RegionCode>("us");
  const [autoDetected, setAutoDetected] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const r = guessRegion();
    if (r !== "us") {
      setRegion(r);
      setAutoDetected(true);
    }
  }, []);

  const list = useMemo(() => retailersForRegion(region), [region]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((r) => r.name.toLowerCase().includes(q));
  }, [list, query]);

  const official = filtered.find((r) => r.tier === "official");
  const marketplaces = filtered.filter((r) => r.tier === "marketplace");
  const retailChains = filtered.filter((r) => r.tier === "retailer");

  const activeRegion = REGIONS.find((r) => r.code === region);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),_transparent_55%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-40 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Where to Buy
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Buy AZDOME with confidence,
                <br className="hidden sm:block" />{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  anywhere in the world.
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                Authorized resellers in 60+ countries. Same product, same
                warranty, same support — whether you shop direct or at your
                favorite marketplace.
              </p>
            </div>
            {/* Hero stats */}
            <dl className="flex divide-x divide-slate-200 self-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              <Stat label="Countries" value="60+" icon={Globe2} />
              <Stat label="Retail channels" value={`${TOTAL_CHANNELS}+`} icon={Store} />
              <Stat label="Warranty" value="2 yrs" icon={ShieldCheck} />
            </dl>
          </div>
        </div>
      </section>

      {/* Region picker (sticky) */}
      <section className="sticky top-[100px] z-20 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Region
              </span>
            </div>
            {autoDetected && activeRegion && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                <Zap className="h-3 w-3" />
                Detected · {activeRegion.flag}
              </span>
            )}
            <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {REGIONS.map((r) => {
                const active = region === r.code;
                const count = countForRegion(r.code);
                return (
                  <button
                    key={r.code}
                    onClick={() => {
                      setRegion(r.code);
                      setAutoDetected(false);
                    }}
                    title={`${r.name} · ${count} channels`}
                    className={[
                      "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 md:text-sm",
                      active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    ].join(" ")}
                  >
                    <span aria-hidden>{r.flag}</span>
                    {r.name}
                    {count > 0 && (
                      <span
                        className={[
                          "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                          active ? "bg-white/20" : "bg-white text-slate-500",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a retailer…"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  className="absolute right-2.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Official tier */}
      {official && (
        <section className="bg-white py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-5 flex items-baseline justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Buy direct from AZDOME
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <BadgeCheck className="h-3 w-3" />
                Official
              </span>
            </div>
            <a
              href={official.urls[region]}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-12"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.3),_transparent_55%)]"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
              />
              <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Made by AZDOME, sold by AZDOME
                  </div>
                  <Logo size={36} inverse />
                  <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {official.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                    Latest models, exclusive bundles, and the fastest path to
                    warranty support. Best for new launches and dash-cam + accessory deals.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill icon={Truck}>Free shipping over $99</Pill>
                    <Pill icon={ShieldCheck}>2-year warranty</Pill>
                    <Pill icon={Store}>30-day returns</Pill>
                    <Pill icon={Sparkles}>Bundle discounts</Pill>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md md:self-center">
                  Visit official store
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Trust band */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Authorized channels
              </p>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Why every listed channel is the same purchase.
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-500">
              We treat every authorized reseller the same way — full warranty,
              full software support, and direct help from us. Unlisted resellers
              are not authorized and cannot honor warranty claims.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ROWS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-tight text-slate-900 md:text-base">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 md:text-sm">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplaces */}
      {marketplaces.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Online marketplaces
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Familiar checkout. Same warranty.
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                <ShoppingBag className="mr-1 inline-block h-3 w-3 -mt-0.5" />
                {marketplaces.length} marketplace
                {marketplaces.length === 1 ? "" : "s"} in {activeRegion?.name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaces.map((r) => (
                <RetailerCard key={r.id} retailer={r} region={region} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Retailers */}
      {retailChains.length > 0 ? (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Local retailers
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  In-store, near you.
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                <Store className="mr-1 inline-block h-3 w-3 -mt-0.5" />
                {retailChains.length} retailer
                {retailChains.length === 1 ? "" : "s"} in {activeRegion?.name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {retailChains.map((r) => (
                <RetailerCard key={r.id} retailer={r} region={region} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        marketplaces.length === 0 && (
          <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
              <Store className="mx-auto h-10 w-10 text-slate-300" />
              <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                No matching retailers in {activeRegion?.name}.
              </h2>
              <p className="mt-3 text-base text-slate-500">
                We&apos;re expanding rapidly. Buy direct from{" "}
                <a
                  href="https://www.azdomevip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  azdomevip.com
                </a>{" "}
                — we ship to your region.
              </p>
            </div>
          </section>
        )
      )}

      {/* Unauthorized notice */}
      <section className="bg-amber-50/40 py-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-start gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-amber-100 md:px-8 md:py-6">
            <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-slate-900 md:text-base">
                Only listed channels are authorized.
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
                We can&apos;t verify warranty or firmware eligibility for AZDOME
                cameras purchased from gray-market resellers. If you&apos;re
                unsure whether a seller is authorized, email{" "}
                <a
                  href="mailto:support@azdome.com"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  support@azdome.com
                </a>{" "}
                with the listing URL before you buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-12 text-center text-white shadow-md md:flex-row md:gap-10 md:text-left">
          <Store className="h-12 w-12 flex-shrink-0 opacity-80" />
          <div className="mt-5 flex-1 md:mt-0">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              Want to stock AZDOME?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100 md:text-base">
              We&apos;re actively partnering with retailers, fleet integrators,
              and resellers across all regions. Volume pricing starts at 10 units.
            </p>
          </div>
          <Link
            href="/wholesale"
            className="mt-7 inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:mt-0"
          >
            Become a partner
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── Components ──────────────────────────────────────────────────────

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex-1 px-6 py-5 text-center md:px-8">
      <Icon className="mx-auto h-4 w-4 text-blue-600" />
      <div className="mt-2 text-2xl font-bold tracking-tight tabular-nums text-slate-900 md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
    </div>
  );
}

function RetailerCard({
  retailer,
  region,
}: {
  retailer: Retailer;
  region: RegionCode;
}) {
  const url = retailer.urls[region];
  if (!url) return null;
  const mono =
    retailer.monogram ??
    retailer.name
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 2)
      .toUpperCase();
  const color = retailer.brandColor ?? "bg-slate-700";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight text-white shadow-sm",
            color,
          ].join(" ")}
        >
          {mono}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
              {retailer.name}
            </h3>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
          </div>
          {retailer.perk && (
            <p className="mt-1 text-xs text-slate-500">{retailer.perk}</p>
          )}
        </div>
      </div>
      {retailer.models && retailer.models.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {retailer.models.slice(0, 4).map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 ring-1 ring-slate-100"
            >
              {m}
            </span>
          ))}
          {retailer.models.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              +{retailer.models.length - 4}
            </span>
          )}
        </div>
      )}
      <span className="mt-auto pt-5 text-xs font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700">
        Shop at {retailer.name} →
      </span>
    </a>
  );
}

function Pill({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 backdrop-blur-sm">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}
