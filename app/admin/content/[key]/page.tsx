import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import ContentEditor from "@/components/admin/ContentEditor";
import {
  getContentDetailed,
  getHistory,
  getSection,
} from "@/lib/content-server";

export const dynamic = "force-dynamic";

export default async function ContentSectionEditPage({
  params,
}: {
  params: { key: string };
}) {
  const key = decodeURIComponent(params.key);
  const section = getSection(key);
  if (!section) notFound();
  const [{ value, isOverridden, hasPrev }, history] = await Promise.all([
    getContentDetailed(section),
    getHistory(section.key),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <Link
        href="/admin/content"
        className="inline-flex items-center gap-1 text-xs font-semibold tracking-tight text-slate-500 transition-colors duration-300 hover:text-slate-900"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to all content
      </Link>
      <div className="mt-6">
        <ContentEditor
          sectionKey={section.key}
          label={section.label}
          description={section.description}
          previewHref={section.previewHref}
          currentValue={value}
          defaultValue={section.defaults}
          isOverridden={isOverridden}
          hasPrev={hasPrev}
          history={history.map((h) => ({ ts: h.ts }))}
        />
      </div>
    </main>
  );
}
