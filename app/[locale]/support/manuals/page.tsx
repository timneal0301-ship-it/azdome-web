import { LANGUAGES } from "@/lib/downloads";
import { getAllManuals } from "@/lib/downloads-server";
import { PRODUCTS } from "@/lib/products";
import ManualsPageClient from "@/components/ManualsPageClient";

export const dynamic = "force-dynamic";

export const metadata = { title: "User Manuals — AZDOME Support" };

export default async function ManualsPage() {
  const manuals = await getAllManuals();
  const entries = manuals
    .map((manual) => {
      const product = PRODUCTS.find((p) => p.slug === manual.productSlug);
      return product ? { manual, product } : null;
    })
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return <ManualsPageClient entries={entries} languageCount={LANGUAGES.length} />;
}
