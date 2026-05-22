"use client";

import Link from "next/link";
import {
  ArrowRight,
  Book,
  BookOpen,
  CircleCheck,
  Download,
  HelpCircle,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import SupportContactCards from "@/components/SupportContactCards";
import { useLocale } from "@/components/LocaleProvider";

// Service status table — `service` is a brand label (not translated);
// `state` keys map to t.support.operational so they translate.
const STATUS_ROWS = [
  { service: "azdome.com" },
  { service: "AZDOME App backend" },
  { service: "Order processing" },
  { service: "Firmware delivery (OTA)" },
];

export default function SupportPage() {
  const { t } = useLocale();

  const CATEGORIES = [
    {
      icon: Book,
      title: t.support.install,
      detail: "Step-by-step setup for every model, including parking-mode hardwire.",
      href: "/support/install",
    },
    {
      icon: Download,
      title: t.support.firmware,
      detail: "Latest .bin releases for every model — manual + OTA.",
      href: "/support/firmware",
    },
    {
      icon: BookOpen,
      title: t.support.manuals,
      detail: "Branded PDF manuals in up to 6 languages per model.",
      href: "/support/manuals",
    },
    {
      icon: HelpCircle,
      title: t.support.troubleshoot,
      detail: "Common issues and 5-minute fixes for cameras and the app.",
      href: "/support/troubleshoot",
    },
    {
      icon: Truck,
      title: "Order & Shipping",
      detail: "Track an order, returns, exchanges, lost packages.",
      href: "/account/orders",
    },
    {
      icon: ShieldCheck,
      title: t.support.contact,
      detail: "File a claim in under 5 minutes. RMA + prepaid return label.",
      href: "/support/contact",
    },
  ];

  const POPULAR = [
    { title: "How do I set up parking mode?", href: "/support/install" },
    { title: "Why is my SD card showing as full after one trip?", href: "/support/troubleshoot" },
    { title: "How do I share clips with my insurance company?", href: "/support/contact" },
    { title: "When will my order ship?", href: "/account/orders" },
    { title: "How do I update firmware over Wi-Fi?", href: "/support/firmware" },
    { title: "Camera not recognized by the app — what now?", href: "/support/troubleshoot" },
  ];
  return (
    <main className="bg-white">
      {/* Hero + search */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-32 text-center md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            {t.support.pageTitle}
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            {t.support.pageTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
            {t.support.pageSub}
          </p>
          <div className="mx-auto mt-10 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-sm ring-1 ring-slate-100">
            <Search className="ml-3 h-5 w-5 flex-shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder={t.support.searchPlaceholder}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700">
              {t.nav.searchLabel}
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {CATEGORIES.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group flex flex-col rounded-2xl bg-slate-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                  {c.title}
                </h3>
                <p className="mt-1 flex-1 text-sm text-slate-500">{c.detail}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  {t.megaMenu.explore.replace(" →", "")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular questions */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Most read this week
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Quick answers.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {POPULAR.map((q) => (
              <li key={q.title}>
                <Link
                  href={q.href}
                  className="group flex items-center justify-between gap-4 rounded-xl bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-sm font-medium text-slate-700 transition-colors duration-300 group-hover:text-slate-900">
                    {q.title}
                  </span>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-colors duration-300 group-hover:text-blue-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Status */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-emerald-50 px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                <CircleCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-emerald-900">
                  {t.support.systemStatus} — {t.support.operational}
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            {STATUS_ROWS.map((s) => (
              <li key={s.service} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold tracking-tight text-slate-900">
                    {s.service}
                  </p>
                  <p className="text-[11px] text-slate-500">{t.support.operational}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

      {/* Contact */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SupportContactCards />
        </div>
      </section>
    </main>
  );
}
