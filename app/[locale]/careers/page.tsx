import { getContent } from "@/lib/content-server";
import { CAREERS_PAGE } from "@/lib/content/careers";
import CareersPageClient from "@/components/CareersPageClient";

export const metadata = { title: "Careers — AZDOME" };

export default async function CareersPage() {
  const content = await getContent(CAREERS_PAGE);
  return <CareersPageClient content={content} />;
}
