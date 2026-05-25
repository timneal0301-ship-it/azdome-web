import { getContent } from "@/lib/content-server";
import { ABOUT_PAGE } from "@/lib/content/about";
import AboutPageClient from "@/components/AboutPageClient";
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
    title: "About — AZDOME",
    description:
      "Premium dash cams engineered in California and built in Shenzhen. Trusted by 200,000+ drivers worldwide.",
    alternates: buildPathAlternates(locale, "/about"),
  };
}

export default async function AboutPage() {
  const content = await getContent(ABOUT_PAGE);
  return <AboutPageClient content={content} />;
}
