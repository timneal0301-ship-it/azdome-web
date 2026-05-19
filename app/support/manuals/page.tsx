import Link from "next/link";
import { BookOpen, Languages } from "lucide-react";

import ManualsList from "@/components/ManualsList";
import { LANGUAGES } from "@/lib/downloads";
import { getAllManuals } from "@/lib/downloads-server";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata = { title: "User Manuals — AZDOME Support" };

export default function ManualsPage() {
  const manuals = getAllManuals();
  const entries = manuals
    .map((manual) => {
      const product = PRODUCTS.find((p) => p.slug === manual.productSlug);
      return product ? { manual, product } : null;
    })
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            User Manuals
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Every camera. Every language we ship.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Branded PDF manuals for every current model, available in up to{" "}
            {LANGUAGES.length} languages. Includes installation, app pairing,
            voice control, parking-mode setup, and full specifications.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
            <Languages className="h-3.5 w-3.5 text-blue-600" />
            {LANGUAGES.length} languages available · all PDFs are
            accessibility-tagged
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ManualsList entries={entries} />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <BookOpen className="mx-auto h-8 w-8 text-blue-600" />
          <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Need a translation that isn&apos;t listed?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            Email{" "}
            <a href="mailto:support@azdome.com" className="font-semibold text-blue-600 hover:text-blue-700">
              support@azdome.com
            </a>{" "}
            with your model and language. We typically deliver within 5 business days.
          </p>
          <Link
            href="/support/firmware"
            className="mt-7 inline-flex items-center gap-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-slate-800"
          >
            Looking for firmware?
          </Link>
        </div>
      </section>
    </main>
  );
}
