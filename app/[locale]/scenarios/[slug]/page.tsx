import { notFound } from "next/navigation";
import Image from "@/components/ui/HQImage";
import Link from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { SCENARIOS, getScenario } from "@/lib/products";
import { getProductsBySlug } from "@/lib/products-server";
import {
  buildPathAlternates,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/i18n/url";

export function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const s = getScenario(params.slug);
  if (!s) return { title: "Scenario not found — AZDOME" };
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return {
    title: `${s.title} — AZDOME`,
    description: s.intro,
    alternates: buildPathAlternates(locale, `/scenarios/${s.slug}`),
  };
}

export default async function ScenarioPage({ params }: { params: { slug: string } }) {
  const scenario = getScenario(params.slug);
  if (!scenario) notFound();

  const recommendedRaw = await getProductsBySlug(scenario.recommendedSlugs);
  const recommended = recommendedRaw.map((p) => ({ ...p, name: p.short }));

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <Image
          src={scenario.image}
          alt={scenario.title}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-40 md:pb-32 md:pt-48 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
            Scenario
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            {scenario.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            {scenario.intro}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            {scenario.body}
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Recommended for this drive
            </h2>
            <Link
              href="/collections/dash-cams"
              className="group hidden items-center gap-1 text-sm font-semibold text-blue-600 sm:inline-flex"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {recommended.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
