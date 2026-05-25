import { getContent } from "@/lib/content-server";
import { AFFILIATE_PAGE } from "@/lib/content/affiliate";
import AffiliatePageClient from "@/components/AffiliatePageClient";
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
    title: "Affiliate Program — AZDOME",
    alternates: buildPathAlternates(locale, "/affiliate"),
  };
}

export default async function AffiliatePage() {
  const content = await getContent(AFFILIATE_PAGE);
  return <AffiliatePageClient content={content} />;
}
