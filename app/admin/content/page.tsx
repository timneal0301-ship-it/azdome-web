import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ALL_SECTIONS, getContentDetailed } from "@/lib/content-server";

export const dynamic = "force-dynamic";

const PAGE_LABELS: Record<string, string> = {
  home: "Home · 首页 Hero 轮播 + Bento Banner",
  pdp: "PDP · 产品详情页(规格 / 评价 / FAQ / 沉浸式)",
  legal: "Legal · 隐私 / 条款 / 保修 / 无障碍 / Cookie",
  about: "About 公司页",
  careers: "Careers 招聘页",
  press: "Press 媒体页",
  affiliate: "Affiliate 联盟计划",
  wholesale: "Wholesale 批发",
  app: "App 推广页",
};

const PAGE_ORDER = [
  "home",
  "pdp",
  "about",
  "legal",
  "careers",
  "press",
  "affiliate",
  "wholesale",
  "app",
];

export default async function ContentAdminPage() {
  // Fetch status for each section to show "Overridden" badge.
  const entries = await Promise.all(
    ALL_SECTIONS.map(async (section) => {
      const { isOverridden, hasPrev } = await getContentDetailed(section);
      return { section, isOverridden, hasPrev };
    }),
  );

  // Group by page.
  const groups = entries.reduce<Record<string, typeof entries>>((acc, e) => {
    (acc[e.section.page] ??= []).push(e);
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 lg:px-10">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Page Content
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          页面内容编辑
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          每个 section 是一个 JSON 文档。改了保存后会写入{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">
            data/db.json
          </code>{" "}
          (本地) 或 Vercel KV (生产),覆盖代码里的默认值。前台立即重新生成。
          上次的版本会自动备份,可以一键回滚。
        </p>
      </header>

      <div className="space-y-12">
        {Object.entries(groups)
          .sort(([a], [b]) => PAGE_ORDER.indexOf(a) - PAGE_ORDER.indexOf(b))
          .map(([page, items]) => (
          <section key={page}>
            <h2 className="mb-4 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
              {PAGE_LABELS[page] ?? page}
            </h2>
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              {items.map(({ section, isOverridden, hasPrev }) => (
                <li key={section.key}>
                  <Link
                    href={`/admin/content/${encodeURIComponent(section.key)}`}
                    className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-300 hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-semibold tracking-tight text-slate-900">
                          {section.label}
                        </p>
                        {isOverridden && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Edited
                          </span>
                        )}
                        {hasPrev && (
                          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                            Has history
                          </span>
                        )}
                      </div>
                      {section.description && (
                        <p className="mt-1 text-sm text-slate-500">{section.description}</p>
                      )}
                      <p className="mt-1 text-[11px] font-mono text-slate-400">
                        {section.key}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
