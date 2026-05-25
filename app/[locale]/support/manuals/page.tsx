import { LANGUAGES } from "@/lib/downloads";
import { getAllManuals } from "@/lib/downloads-server";
import { PRODUCTS } from "@/lib/products";
import ManualsPageClient from "@/components/ManualsPageClient";
import {
  buildPathAlternates,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/i18n/url";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return {
    title: "User Manuals — AZDOME Support",
    alternates: buildPathAlternates(locale, "/support/manuals"),
  };
}

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
