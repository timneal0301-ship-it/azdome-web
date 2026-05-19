import Link from "next/link";
import {
  Boxes,
  Building2,
  Briefcase,
  Headset,
  Package2,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { getContent } from "@/lib/content-server";
import { WHOLESALE_PAGE } from "@/lib/content/wholesale";

import { TIERS, BENEFITS, VERTICALS, FAQ } from "@/lib/content/wholesale";

export const metadata = { title: "Wholesale — AZDOME" };

export default async function WholesalePage() {
  const C = await getContent(WHOLESALE_PAGE);
  const TIERS = C.tiers;
  const BENEFITS = C.benefits;
  const VERTICALS = C.verticals;
  const FAQ = C.faq;
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:pt-40 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Wholesale & Fleet
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Outfit your fleet. Protect your drivers.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Whether you operate 10 vehicles or 10,000, we partner with you on
              pricing, installation, telematics integration, and ongoing
              support. A dedicated account manager from order one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#quote"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
              >
                Request a quote
              </Link>
              <a
                href="mailto:fleet@azdome.com"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                fleet@azdome.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Pricing
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Transparent tiers. No surprises at re-order.
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-white">
                <tr className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-6 py-4">Order size</th>
                  <th className="px-6 py-4">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white text-sm">
                {TIERS.map((t) => (
                  <tr key={t.range} className="text-slate-700">
                    <td className="px-6 py-5 font-semibold tracking-tight text-slate-900">
                      {t.range}
                    </td>
                    <td className="px-6 py-5 tabular-nums">{t.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Discounts apply across the full catalog, including accessories. Cumulative across same-PO line items.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              What you get
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Built for partners, not transactions.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Industries we serve
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Trusted across logistics, ride-hail, and dealer networks.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-28 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Get a quote
          </h2>
          <p className="mt-2 text-sm text-slate-500">A specialist will reply within 1 business day.</p>
          <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input placeholder="Company name" />
            <Input placeholder="Your name" />
            <Input placeholder="Work email" type="email" />
            <Input placeholder="Phone" />
            <Input placeholder="Estimated unit volume" className="md:col-span-2" />
            <textarea
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 md:col-span-2"
              placeholder="Tell us about your fleet, timeline, and any integrations you need"
            />
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 md:col-span-2">
              Request a quote
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion faqs={FAQ} title="Common questions." eyebrow="FAQ" />
    </main>
  );
}

function Input({
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={[
        "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15",
        className,
      ].join(" ")}
    />
  );
}
