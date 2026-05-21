"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckSquare,
  CircleDashed,
  ImageIcon,
  ImagePlus,
  Layers,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { clearImages } from "@/app/admin/actions";
import SlotCard from "@/components/admin/SlotCard";
import { useAssetUrls } from "@/components/AssetUrlsProvider";
import type { ImageGroup, ImageSlot } from "@/lib/image-slots";

type Filter = "all" | "edited" | "untouched";

export default function ImageLibrary({
  groups,
  slots,
}: {
  groups: { key: ImageGroup; label: string }[];
  slots: ImageSlot[];
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkPending, setBulkPending] = useState(false);

  const lowered = q.trim().toLowerCase();

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelected(new Set());
  };
  const toggleSelect = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const onBulkClear = async () => {
    const count = selected.size;
    if (count === 0) return;
    if (
      !window.confirm(
        `确定要清除选中的 ${count} 个槽位的上传记录吗?前台会回退到种子图。`,
      )
    )
      return;
    setBulkPending(true);
    const res = await clearImages(Array.from(selected));
    setBulkPending(false);
    if (res.ok) {
      exitSelectMode();
      router.refresh();
    } else {
      window.alert(`清除失败: ${res.error}`);
    }
  };

  const decorated = useDecorated(slots);

  const totalCount = decorated.length;
  const uploadedCount = decorated.filter((d) => d.edited).length;
  const pendingCount = totalCount - uploadedCount;

  const visibleSlots = useMemo(() => {
    return decorated.filter((d) => {
      if (filter === "edited" && !d.edited) return false;
      if (filter === "untouched" && d.edited) return false;
      if (!lowered) return true;
      const hay =
        `${d.slot.label} ${d.slot.path} ${d.slot.key}`.toLowerCase();
      return hay.includes(lowered);
    });
  }, [decorated, filter, lowered]);

  const visibleByGroup = useMemo(() => {
    const map = new Map<string, typeof decorated>();
    for (const d of visibleSlots) {
      const arr = map.get(d.slot.group) ?? [];
      arr.push(d);
      map.set(d.slot.group, arr);
    }
    return map;
  }, [visibleSlots]);

  // Group-level stats: total, uploaded, visible-under-filter.
  const groupStats = useMemo(() => {
    return groups.map((g) => {
      const all = decorated.filter((d) => d.slot.group === g.key);
      const edited = all.filter((d) => d.edited).length;
      const visible = visibleByGroup.get(g.key)?.length ?? 0;
      const percent = all.length === 0 ? 0 : Math.round((edited / all.length) * 100);
      return { ...g, total: all.length, edited, visible, percent };
    });
  }, [groups, decorated, visibleByGroup]);

  const filterActive = filter !== "all" || lowered !== "";

  return (
    <>
      {/* Stats strip */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total slots" value={totalCount} icon={Layers} />
        <StatTile
          label="Uploaded"
          value={uploadedCount}
          icon={ImagePlus}
          tone="emerald"
        />
        <StatTile
          label="Pending"
          value={pendingCount}
          icon={CircleDashed}
          tone="slate"
        />
        <StatTile
          label="Groups"
          value={groups.filter((g) => groupStats.find((s) => s.key === g.key && s.total > 0)).length}
          icon={ImageIcon}
        />
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Side nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-20">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              分组 · 上传进度
            </p>
            <ul className="space-y-2">
              {groupStats.map((g) => {
                if (g.total === 0) return null;
                const dim = g.visible === 0 && filterActive;
                return (
                  <li key={g.key}>
                    <a
                      href={`#${g.key}`}
                      className={[
                        "group block rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100",
                        dim ? "opacity-40" : "",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[13px] font-medium tracking-tight text-slate-700">
                          {g.label}
                        </span>
                        <span className="flex flex-shrink-0 items-center gap-1 text-[10px] tabular-nums">
                          <span className="font-semibold text-slate-900">
                            {g.edited}
                          </span>
                          <span className="text-slate-400">/ {g.total}</span>
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={[
                            "h-full rounded-full transition-all duration-500",
                            g.percent === 100
                              ? "bg-emerald-500"
                              : g.percent > 0
                              ? "bg-blue-500"
                              : "bg-slate-200",
                          ].join(" ")}
                          style={{ width: `${g.percent}%` }}
                        />
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索 slot label / 路径 / key…"
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
              <FilterChip
                active={filter === "all"}
                onClick={() => setFilter("all")}
              >
                全部 {totalCount}
              </FilterChip>
              <FilterChip
                active={filter === "edited"}
                onClick={() => setFilter("edited")}
              >
                已上传 {uploadedCount}
              </FilterChip>
              <FilterChip
                active={filter === "untouched"}
                onClick={() => setFilter("untouched")}
              >
                未上传 {pendingCount}
              </FilterChip>
            </div>
            <button
              type="button"
              onClick={() => (selectMode ? exitSelectMode() : setSelectMode(true))}
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight transition-colors",
                selectMode
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              ].join(" ")}
            >
              <CheckSquare className="h-3.5 w-3.5" />
              {selectMode ? "退出选择" : "多选"}
            </button>
          </div>

          {/* Filter-active hint */}
          {filterActive && (
            <p className="mb-4 text-xs text-slate-500">
              筛选中 · 显示 {visibleSlots.length} / {totalCount} 个槽位
              <button
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQ("");
                }}
                className="ml-2 inline-flex items-center gap-0.5 text-blue-600 hover:text-blue-700"
              >
                清除筛选
              </button>
            </p>
          )}

          {/* Bulk-action bar */}
          {selectMode && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900 px-5 py-3 text-sm text-white">
              <p className="font-semibold tracking-tight">
                已选 {selected.size} 项
                {selected.size === 0 && (
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    点卡片选中,然后批量重置
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={onBulkClear}
                disabled={selected.size === 0 || bulkPending}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-red-600 disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {bulkPending ? "清除中…" : `批量重置 (${selected.size})`}
              </button>
            </div>
          )}

          {/* Groups */}
          {visibleSlots.length === 0 ? (
            <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-slate-500 ring-1 ring-slate-100">
              没有匹配的图片槽位。试试清除搜索或切回"全部"。
            </p>
          ) : (
            <div className="space-y-10">
              {groups.map((group) => {
                const groupSlots = visibleByGroup.get(group.key);
                if (!groupSlots || groupSlots.length === 0) return null;
                const stat = groupStats.find((g) => g.key === group.key)!;
                return (
                  <section
                    key={group.key}
                    id={group.key}
                    className="scroll-mt-20"
                  >
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
                          {group.label}
                        </h2>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={[
                                "h-full rounded-full transition-all duration-500",
                                stat.percent === 100
                                  ? "bg-emerald-500"
                                  : stat.percent > 0
                                  ? "bg-blue-500"
                                  : "bg-slate-200",
                              ].join(" ")}
                              style={{ width: `${stat.percent}%` }}
                            />
                          </div>
                          <span className="text-[11px] tabular-nums text-slate-500">
                            <span className="font-semibold text-slate-900">
                              {stat.edited}
                            </span>{" "}
                            / {stat.total} 已上传 · {stat.percent}%
                          </span>
                        </div>
                      </div>
                      {filterActive && groupSlots.length !== stat.total && (
                        <span className="text-[11px] tabular-nums text-slate-400">
                          (筛选中 {groupSlots.length} 项可见)
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {groupSlots.map(({ slot, edited }) => (
                        <SlotCard
                          key={slot.key}
                          slot={slot}
                          edited={edited}
                          selectMode={selectMode}
                          selected={selected.has(slot.key)}
                          onToggleSelect={() => toggleSelect(slot.key)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatTile({
  label,
  value,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "blue" | "emerald" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "slate"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-50 text-blue-600";
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
      <span
        className={[
          "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
          toneClass,
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight tabular-nums text-slate-900 md:text-3xl">
          {value}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

function FilterChip({
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

function useDecorated(slots: ImageSlot[]) {
  const paths = slots.map((s) => `/${s.path}`);
  const resolved = useAssetUrls(paths);
  return slots.map((slot, i) => ({
    slot,
    edited: resolved[i] !== paths[i],
  }));
}
