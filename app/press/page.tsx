import Link from "next/link";
import { ArrowUpRight, Download, FileText, Image as ImageIcon, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getContent } from "@/lib/content-server";
import { PRESS_PAGE } from "@/lib/content/press";

const ICONS: Record<string, LucideIcon> = {
  Palette,
  ImageIcon,
  FileText,
};

export const metadata = { title: "Press — AZDOME" };

export default async function PressPage() {
  const C = await getContent(PRESS_PAGE);
  const RELEASES = C.releases;
  const COVERAGE = C.coverage;
  const QUOTES = C.quotes;
  const KIT = C.kit;
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Press
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          News, releases & coverage.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
          For press inquiries, exclusive product previews, or executive
          interviews, contact our team. We reply within one business day.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Media contact:{" "}
          <a href="mailto:press@azdome.com" className="font-medium text-blue-600 hover:text-blue-700">
            press@azdome.com
          </a>{" "}
          · Hana Park, Head of Communications
        </p>

        {/* Brand kit */}
        <section className="mt-12 rounded-2xl bg-slate-50 p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Brand kit
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Logos, photography, executive headshots, fact sheet. Updated quarterly.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {KIT.map((k) => {
              const Icon = ICONS[k.iconName] ?? FileText;
              return (
              <li key={k.title}>
                <Link
                  href="#"
                  className="group flex h-full flex-col rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                    {k.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{k.detail}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Download
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
              );
            })}
          </ul>
        </section>

        {/* Releases */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Recent releases
          </h2>
          <ul className="mt-6 divide-y divide-slate-100">
            {RELEASES.map((r) => (
              <li key={r.title} className="py-8">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {r.date}
                </p>
                <Link
                  href="#"
                  className="mt-2 block text-xl font-semibold tracking-tight text-slate-900 hover:text-blue-600 md:text-2xl"
                >
                  {r.title}
                </Link>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700 md:text-base">
                  {r.excerpt}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  {r.body}
                </p>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Read full release
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Pull quotes */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            What the press is saying
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {QUOTES.map((q) => (
              <figure
                key={q.outlet}
                className="rounded-2xl bg-slate-50 p-7 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-slate-700">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                  {q.outlet}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Coverage
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {COVERAGE.map((c) => (
              <li key={c.title}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {c.outlet}
                  </p>
                  <p className="mt-3 flex-1 text-base font-semibold tracking-tight text-slate-900">
                    {c.title}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
