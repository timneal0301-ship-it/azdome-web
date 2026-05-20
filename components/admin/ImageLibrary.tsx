"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

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
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const lowered = q.trim().toLowerCase();

  // Decorate every slot with whether it currently has an admin override —
  // we read the live URL from the AssetUrlsProvider context (already
  // populated server-side by the root layout). A slot is "edited" when
  // its resolved URL differs from the static seed path.
  const decorated = useDecorated(slots);

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

  // Sidebar counts include both edited count and visible-under-filter count.
  const groupStats = useMemo(() => {
    return groups.map((g) => {
      const all = decorated.filter((d) => d.slot.group === g.key);
      const edited = all.filter((d) => d.edited).length;
      const visible = visibleByGroup.get(g.key)?.length ?? 0;
      return { ...g, total: all.length, edited, visible };
    });
  }, [groups, decorated, visibleByGroup]);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Side nav */}
      <aside className="hidden lg:block">
        <nav className="sticky top-20">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            分组
          </p>
          <ul className="space-y-1">
            {groupStats.map((g) => {
              if (g.total === 0) return null;
              const dim = g.visible === 0 && (lowered || filter !== "all");
              return (
                <li key={g.key}>
                  <a
                    href={`#${g.key}`}
                    className={[
                      "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900",
                      dim ? "text-slate-300" : "text-slate-600",
                    ].join(" ")}
                  >
                    <span className="truncate">{g.label}</span>
                    <span className="ml-2 flex flex-shrink-0 items-center gap-1 text-[10px] tabular-nums">
                      {g.edited > 0 && (
                        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700">
                          {g.edited}
                        </span>
                      )}
                      <span className="text-slate-400">{g.total}</span>
                    </span>
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
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
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
              全部
            </FilterChip>
            <FilterChip
              active={filter === "edited"}
              onClick={() => setFilter("edited")}
            >
              已上传
            </FilterChip>
            <FilterChip
              active={filter === "untouched"}
              onClick={() => setFilter("untouched")}
            >
              未上传
            </FilterChip>
          </div>
        </div>

        {/* Groups */}
        {visibleSlots.length === 0 ? (
          <p className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-slate-500 ring-1 ring-slate-100">
            没有匹配的图片槽位。试试清除搜索或切回"全部"。
          </p>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => {
              const groupSlots = visibleByGroup.get(group.key);
              if (!groupSlots || groupSlots.length === 0) return null;
              return (
                <section
                  key={group.key}
                  id={group.key}
                  className="scroll-mt-20"
                >
                  <div className="mb-5 flex items-baseline justify-between">
                    <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                      {group.label}
                    </h2>
                    <span className="text-xs tabular-nums text-slate-400">
                      {groupSlots.length} 项
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {groupSlots.map(({ slot }) => (
                      <SlotCard key={slot.key} slot={slot} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
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

/** Resolve every slot's live URL in one context read, then tag whether
 * each was overridden vs its static seed path. */
function useDecorated(slots: ImageSlot[]) {
  const paths = slots.map((s) => `/${s.path}`);
  const resolved = useAssetUrls(paths);
  return slots.map((slot, i) => ({
    slot,
    edited: resolved[i] !== paths[i],
  }));
}
