import { getContent } from "@/lib/content-server";
import { WHOLESALE_PAGE } from "@/lib/content/wholesale";
import WholesalePageClient from "@/components/WholesalePageClient";

export const metadata = { title: "Wholesale — AZDOME" };

export default async function WholesalePage() {
  const content = await getContent(WHOLESALE_PAGE);
  return <WholesalePageClient content={content} />;
}
