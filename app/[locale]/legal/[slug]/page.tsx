import { notFound } from "next/navigation";

import { getContent } from "@/lib/content-server";
import { LEGAL_DOCS } from "@/lib/content/legal";
import { DOCS, type Doc } from "@/lib/content/legal";
import {
  buildPathAlternates,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/i18n/url";

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const doc = DOCS.find((d) => d.slug === params.slug);
  if (!doc) return { title: "Not found — AZDOME" };
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return {
    title: `${doc.title} — AZDOME`,
    description: doc.intro.slice(0, 160),
    alternates: buildPathAlternates(locale, `/legal/${doc.slug}`),
  };
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const docs = await getContent(LEGAL_DOCS);
  const doc = docs.find((d) => d.slug === params.slug);
  if (!doc) notFound();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Legal
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {doc.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-400">
          <span>{doc.updated}</span>
          <span>{doc.effective}</span>
        </div>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          {doc.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-slate-500 transition-colors duration-300 hover:text-blue-600"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div className="max-w-3xl space-y-12">
            {doc.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  {s.heading}
                </h2>
                {s.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-slate-600"
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <dl className="mt-5 space-y-4 rounded-2xl bg-slate-50 p-6">
                    {s.list.map((row) => (
                      <div key={row.term}>
                        <dt className="text-sm font-semibold tracking-tight text-slate-900">
                          {row.term}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                          {row.def}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
