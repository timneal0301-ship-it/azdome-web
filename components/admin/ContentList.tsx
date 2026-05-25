"use client";

import { useMemo, useState } from "react";
import Link from "@/components/ui/Link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Search,
  X,
} from "lucide-react";

/** A serializable subset of ContentSection — leaves out `defaults`, which
 * can include non-serializable values (lucide icon components, etc) that
 * would crash the server → client boundary. */
export type SectionSummary = {
  key: string;
  label: string;
  description?: string;
  previewHref?: string;
  page: string;
};

type Entry = {
  section: SectionSummary;
  isOverridden: boolean;
  hasPrev: boolean;
};

type Filter = "all" | "edited" | "untouched";

export default function ContentList({
  entries,
  pageOrder,
  pageLabels,
}: {
  entries: Entry[];
  pageOrder: string[];
  pageLabels: Record<string, string>;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const lowered = q.trim().toLowerCase();

  const visible = useMemo(() => {
    return entries.filter((e) => {
      if (filter === "edited" && !e.isOverridden) return false;
      if (filter === "untouched" && e.isOverridden) return false;
      if (!lowered) return true;
      const hay = [
        e.section.label,
        e.section.key,
        e.section.description ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(lowered);
    });
  }, [entries, filter, lowered]);

  const groups = useMemo(() => {
    const map = new Map<string, Entry[]>();
    for (const e of visible) {
      const arr = map.get(e.section.page) ?? [];
      arr.push(e);
      map.set(e.section.page, arr);
    }
    return map;
  }, [visible]);

  const totalEdited = entries.filter((e) => e.isOverridden).length;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索 section 标题 / key / 描述…"
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="清除搜索"
              className="absolute right-2.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            全部 ({entries.length})
          </Chip>
          <Chip
            active={filter === "edited"}
            onClick={() => setFilter("edited")}
          >
            已编辑 ({totalEdited})
          </Chip>
          <Chip
            active={filter === "untouched"}
            onClick={() => setFilter("untouched")}
          >
            未编辑 ({entries.length - totalEdited})
          </Chip>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-slate-500 ring-1 ring-slate-100">
          没有匹配的内容段。试试清除搜索或切回"全部"。
        </p>
      ) : (
        <div className="space-y-12">
          {pageOrder.map((page) => {
            const items = groups.get(page);
            if (!items || items.length === 0) return null;
            const groupEdited = items.filter((i) => i.isOverridden).length;
            return (
              <section key={page}>
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                    {pageLabels[page] ?? page}
                  </h2>
                  <span className="text-xs tabular-nums text-slate-400">
                    {groupEdited > 0 && (
                      <span className="mr-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700">
                        {groupEdited} 已编辑
                      </span>
                    )}
                    {items.length} 项
                  </span>
                </div>
                <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                  {items.map(({ section, isOverridden, hasPrev }) => (
                    <li
                      key={section.key}
                      className="group flex items-center gap-3 transition-colors hover:bg-slate-50"
                    >
                      <Link
                        href={`/admin/content/${encodeURIComponent(section.key)}`}
                        className="flex min-w-0 flex-1 items-center justify-between gap-4 px-6 py-5"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
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
                                可回滚
                              </span>
                            )}
                          </div>
                          {section.description && (
                            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                              {section.description}
                            </p>
                          )}
                          <p className="mt-1 truncate font-mono text-[11px] text-slate-400">
                            {section.key}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-slate-700" />
                      </Link>
                      {section.previewHref && (
                        <a
                          href={section.previewHref}
                          target="_blank"
                          rel="noreferrer"
                          title="新标签页打开前台预览"
                          className="mr-4 hidden flex-shrink-0 items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 sm:inline-flex"
                        >
                          <ExternalLink className="h-3 w-3" />
                          预览
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-3 py-1 text-xs font-semibold tracking-tight transition-colors",
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
