import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import ContentEditor from "@/components/admin/ContentEditor";
import {
  getContentDetailed,
  getHistory,
  getSection,
  resolveDefaults,
} from "@/lib/content-server";

export const dynamic = "force-dynamic";

/** True if any nested field is a function (eg Lucide icon component).
 * Such sections can't cross the RSC boundary into the client editor. */
function containsNonSerializable(value: unknown): boolean {
  if (typeof value === "function") return true;
  if (Array.isArray(value)) return value.some(containsNonSerializable);
  if (value !== null && typeof value === "object") {
    return Object.values(value as object).some(containsNonSerializable);
  }
  return false;
}

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

  const canonicalDefaults = resolveDefaults(section, "en");
  const codeOnly =
    containsNonSerializable(value) || containsNonSerializable(canonicalDefaults);

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
        {codeOnly ? (
          <CodeOnlyNotice section={section} />
        ) : (
          <ContentEditor
            sectionKey={section.key}
            label={section.label}
            description={section.description}
            previewHref={section.previewHref}
            currentValue={value}
            defaultValue={canonicalDefaults}
            isOverridden={isOverridden}
            hasPrev={hasPrev}
            history={history.map((h) => ({ ts: h.ts }))}
          />
        )}
      </div>
    </main>
  );
}

function CodeOnlyNotice({
  section,
}: {
  section: { key: string; label: string; description?: string; previewHref?: string };
}) {
  const sourceFile = section.key.split(".")[0];
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Code-only section
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {section.label}
        </h1>
        {section.description && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            {section.description}
          </p>
        )}
        <code className="mt-3 inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600">
          {section.key}
        </code>
      </header>

      <div className="flex items-start gap-3 rounded-2xl bg-amber-50 px-5 py-4 ring-1 ring-amber-100">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div className="text-sm leading-relaxed text-amber-900">
          <p className="font-semibold">这个 section 暂不支持后台图形编辑</p>
          <p className="mt-1.5">
            它的默认数据里含 Lucide 图标组件(函数),无法序列化到后台编辑器。
            如需修改,请编辑源码:
          </p>
          <code className="mt-2 inline-block rounded bg-white px-2 py-1 text-[11px] font-mono text-amber-900 ring-1 ring-amber-200">
            lib/content/{sourceFile}.ts
          </code>
          <p className="mt-2 text-xs text-amber-700">
            改完 commit + push, Vercel 重新部署后生效。后续如要让此 section 在后台可编辑,
            需要把图标改成字符串名(参考 FeatureSplit / WhatsInBox / UseCaseTabs 的做法)。
          </p>
        </div>
      </div>

      {section.previewHref && (
        <a
          href={section.previewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
        >
          查看前台页面 ↗
        </a>
      )}
    </div>
  );
}
