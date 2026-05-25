import { getContent } from "@/lib/content-server";
import { WHOLESALE_PAGE } from "@/lib/content/wholesale";
import WholesalePageClient from "@/components/WholesalePageClient";
import {
  buildPathAlternates,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/i18n/url";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isValidLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  return {
    title: "Wholesale — AZDOME",
    alternates: buildPathAlternates(locale, "/wholesale"),
  };
}

export default async function WholesalePage() {
  const content = await getContent(WHOLESALE_PAGE);
  return <WholesalePageClient content={content} />;
}
