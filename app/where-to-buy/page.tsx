"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck, Store, Truck } from "lucide-react";

import {
  REGIONS,
  RETAILERS,
  retailersForRegion,
  type RegionCode,
  type Retailer,
} from "@/lib/retailers";

export default function WhereToBuyPage() {
  const [region, setRegion] = useState<RegionCode>("us");

  const list = useMemo(() => retailersForRegion(region), [region]);
  const official = list.find((r) => r.tier === "official");
  const marketplaces = list.filter((r) => r.tier === "marketplace");
  const retailChains = list.filter((r) => r.tier === "retailer");

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Where to Buy
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Find AZDOME at a retailer near you.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Ships to 60+ countries from azdomevip.com. Also available at major
            marketplaces and trusted local retailers.
          </p>
        </div>
      </section>

      {/* Region picker */}
      <section className="sticky top-[100px] z-20 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="mr-1 flex-shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Region
            </span>
            {REGIONS.map((r) => {
              const active = region === r.code;
              return (
                <button
                  key={r.code}
                  onClick={() => setRegion(r.code)}
                  className={[
                    "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 md:text-sm",
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                  ].join(" ")}
                >
                  <span aria-hidden>{r.flag}</span>
                  {r.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official (top tier) */}
      {official && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Buy direct from AZDOME
            </p>
            <a
              href={official.urls[region]}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-10"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.25),_transparent_60%)]"
              />
              <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {official.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {official.perk}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pill icon={Truck}>Free shipping over $99</Pill>
                    <Pill icon={ShieldCheck}>2-year warranty</Pill>
                    <Pill icon={Store}>30-day returns</Pill>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md md:self-center">
                  Visit store
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Marketplaces */}
      {marketplaces.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Online marketplaces
              </h2>
              <p className="text-xs text-slate-500">
                Same products · fast shipping · familiar checkout
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
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Local retailers
              </h2>
              <p className="text-xs text-slate-500">
                In-store pickup · regional warranty support
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
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
            <Store className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              No local retailers listed yet
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
              — we ship to your region. Looking to stock AZDOME?{" "}
              <Link href="/wholesale" className="font-semibold text-blue-600 hover:text-blue-700">
                Become a partner
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* Partner CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center lg:px-10">
          <Store className="h-10 w-10 text-blue-600" />
          <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Want to stock AZDOME?
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-500">
            We&apos;re actively partnering with retailers, fleet integrators,
            and resellers across all regions. Volume pricing starts at 10 units.
          </p>
          <Link
            href="/wholesale"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            Become a partner
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
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
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
          {retailer.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
      </div>
      {retailer.perk && (
        <p className="mt-1 text-xs text-slate-500">{retailer.perk}</p>
      )}
      {retailer.models && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {retailer.models.slice(0, 5).map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600"
            >
              {m}
            </span>
          ))}
          {retailer.models.length > 5 && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              +{retailer.models.length - 5}
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
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}
