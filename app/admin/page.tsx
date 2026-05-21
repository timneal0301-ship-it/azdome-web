import Link from "next/link";
import {
  Activity,
  Boxes,
  Download,
  ExternalLink,
  FileText,
  ImageIcon,
  Layers,
  LayoutDashboard,
  Package,
  Sparkles,
} from "lucide-react";

import { ALL_SECTIONS, getContentDetailed } from "@/lib/content-server";
import { db } from "@/lib/db";
import { storage } from "@/lib/storage";
import { SLOTS } from "@/lib/image-slots";

export const dynamic = "force-dynamic";

const QUICK_ACTIONS: Array<{
  href: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "blue" | "purple" | "amber" | "emerald" | "slate" | "pink";
}> = [
  {
    href: "/admin/images#banners",
    label: "改 Hero 大图",
    hint: "首页轮播 4 张大 Banner",
    icon: ImageIcon,
    tone: "blue",
  },
  {
    href: "/admin/images#brand",
    label: "改 Logo",
    hint: "导航 / 页脚品牌字标",
    icon: Sparkles,
    tone: "purple",
  },
  {
    href: "/admin/content/layout.home",
    label: "首页模块开关",
    hint: "整版面隐藏 / 显示",
    icon: LayoutDashboard,
    tone: "emerald",
  },
  {
    href: "/admin/products",
    label: "产品管理",
    hint: "10+ SKU · 主图 / 画廊 / A+ 详情 一站式",
    icon: Package,
    tone: "pink",
  },
  {
    href: "/admin/downloads",
    label: "改固件 / 手册",
    hint: "上传 .bin / .pdf",
    icon: Download,
    tone: "amber",
  },
  {
    href: "/admin/diag",
    label: "系统诊断",
    hint: "KV / Blob / 上传链路状态",
    icon: Activity,
    tone: "slate",
  },
];

const TONE_CLASSES: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  purple: "bg-purple-50 text-purple-600 ring-purple-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  pink: "bg-pink-50 text-pink-600 ring-pink-100",
};

export default async function AdminDashboardPage() {
  // System state — fast KV reads.
  const [dbName, storageName, sectionEntries] = await Promise.all([
    db.adapterName().catch(() => "error"),
    storage.adapterName().catch(() => "error"),
    Promise.all(
      ALL_SECTIONS.map(async (section) => ({
        section,
        ...(await getContentDetailed(section)),
      })),
    ),
  ]);

  const editedSections = sectionEntries
    .filter((e) => e.isOverridden)
    .sort((a, b) => a.section.label.localeCompare(b.section.label));

  const editedSlotKeys = await Promise.all(
    SLOTS.map((s) =>
      db.get<string>(`image:${s.key}`).then((v) => (v ? s : null)),
    ),
  );
  const editedSlots = editedSlotKeys.filter(
    (s): s is (typeof SLOTS)[number] => Boolean(s),
  );

  const stats = [
    { label: "已编辑内容段", value: editedSections.length, total: sectionEntries.length },
    { label: "已上传图片", value: editedSlots.length, total: SLOTS.length },
    { label: "Storage", value: storageName === "vercel-blob" ? "Vercel Blob" : storageName },
    { label: "DB", value: dbName === "vercel-kv" ? "Vercel KV" : dbName },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            后台首页
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            常用操作 + 最近改动一览。所有改动写入 Vercel KV / Blob,前台立即生效。
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-slate-800"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          查看前台首页
        </Link>
      </header>

      {/* Quick actions */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
          快速操作
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={[
                  "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ring-1",
                  TONE_CLASSES[action.tone],
                ].join(" ")}
              >
                <action.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold tracking-tight text-slate-900">
                  {action.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{action.hint}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
          系统状态
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums text-slate-900">
                {s.value}
                {typeof s.total === "number" && (
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    / {s.total}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityList
          title="已编辑内容段"
          icon={FileText}
          empty="还没有编辑过任何内容段。点上方「快速操作」开始。"
          items={editedSections.map((e) => ({
            href: `/admin/content/${encodeURIComponent(e.section.key)}`,
            label: e.section.label,
            sub: e.section.key,
          }))}
        />
        <ActivityList
          title="已上传图片"
          icon={Boxes}
          empty="还没有上传过图片。"
          items={editedSlots.map((s) => ({
            href: `/admin/images#${s.group}`,
            label: s.label,
            sub: s.path,
          }))}
        />
      </section>
    </main>
  );
}

function ActivityList({
  title,
  icon: Icon,
  items,
  empty,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { href: string; label: string; sub: string }[];
  empty: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-slate-400" />
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            {title}
          </p>
        </div>
        <span className="text-xs tabular-nums text-slate-400">
          {items.length} 项
        </span>
      </div>
      {items.length === 0 ? (
        <p className="px-5 py-6 text-xs text-slate-400">{empty}</p>
      ) : (
        <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
          {items.slice(0, 12).map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium tracking-tight text-slate-900">
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-slate-400">
                    {item.sub}
                  </p>
                </div>
                <Layers className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
