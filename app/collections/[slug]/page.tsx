import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/Breadcrumbs";
import CollectionGrid from "@/components/CollectionGrid";
import { COLLECTIONS, getCollection } from "@/lib/products";
import { getProductsBySlug } from "@/lib/products-server";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug);
  if (!collection) return { title: "Collection not found — AZDOME" };
  return {
    title: `${collection.title} — AZDOME`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = getCollection(params.slug);
  if (!collection) notFound();

  const productsRaw = await getProductsBySlug(collection.productSlugs);
  const products = productsRaw.map((p) => ({ ...p, name: p.short }));

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:pt-32 lg:px-10">
        <Breadcrumbs items={[{ label: collection.title }]} />
        <header className="mb-10 max-w-3xl md:mb-14">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Collection
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            {collection.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
            {collection.description}
          </p>
        </header>
        {products.length > 0 ? (
          <CollectionGrid products={products} />
        ) : (
          <div className="rounded-2xl bg-slate-50 px-8 py-16 text-center">
            <p className="text-base font-semibold tracking-tight text-slate-900">
              Products coming soon.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              We&apos;re polishing this collection. Browse our dash cams in the
              meantime.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
