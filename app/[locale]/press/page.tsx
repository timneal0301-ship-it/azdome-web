import { getContent } from "@/lib/content-server";
import { PRESS_PAGE } from "@/lib/content/press";
import PressPageClient from "@/components/PressPageClient";

export const metadata = { title: "Press — AZDOME" };

export default async function PressPage() {
  const content = await getContent(PRESS_PAGE);
  return <PressPageClient content={content} />;
}
