import { getContent } from "@/lib/content-server";
import { ABOUT_PAGE } from "@/lib/content/about";
import AboutPageClient from "@/components/AboutPageClient";

export const metadata = {
  title: "About — AZDOME",
  description:
    "Premium dash cams engineered in California and built in Shenzhen. Trusted by 200,000+ drivers worldwide.",
};

export default async function AboutPage() {
  const content = await getContent(ABOUT_PAGE);
  return <AboutPageClient content={content} />;
}
