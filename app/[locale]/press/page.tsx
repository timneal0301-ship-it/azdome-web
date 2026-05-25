import { getContent } from "@/lib/content-server";
import { PRESS_PAGE } from "@/lib/content/press";
import PressPageClient from "@/components/PressPageClient";
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
    title: "Press — AZDOME",
    alternates: buildPathAlternates(locale, "/press"),
  };
}

export default async function PressPage() {
  const content = await getContent(PRESS_PAGE);
  return <PressPageClient content={content} />;
}
