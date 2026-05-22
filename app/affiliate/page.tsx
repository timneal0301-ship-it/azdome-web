import { getContent } from "@/lib/content-server";
import { AFFILIATE_PAGE } from "@/lib/content/affiliate";
import AffiliatePageClient from "@/components/AffiliatePageClient";

export const metadata = { title: "Affiliate Program — AZDOME" };

export default async function AffiliatePage() {
  const content = await getContent(AFFILIATE_PAGE);
  return <AffiliatePageClient content={content} />;
}
