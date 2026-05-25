import { getContent } from "@/lib/content-server";
import { CAREERS_PAGE } from "@/lib/content/careers";
import CareersPageClient from "@/components/CareersPageClient";
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
    title: "Careers — AZDOME",
    alternates: buildPathAlternates(locale, "/careers"),
  };
}

export default async function CareersPage() {
  const content = await getContent(CAREERS_PAGE);
  return <CareersPageClient content={content} />;
}
