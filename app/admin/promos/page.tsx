import { Plus, Tag } from "lucide-react";

import { listPromos } from "@/lib/promo";
import PromoForm from "@/components/admin/PromoForm";
import PromoToggleActive from "@/components/admin/PromoToggleActive";

export const dynamic = "force-dynamic";

export default async function PromosAdminPage() {
  const promos = await listPromos();
  const now = Date.now();
  const stats = {
    total: promos.length,
    active: promos.filter((p) => p.active).length,
    expired: promos.filter(
      (p) => p.expiresAt && new Date(p.expiresAt).getTime() < now,
    ).length,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Promo Codes
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          促销码管理
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          创建可在购物车输入的促销码。支持百分比或固定金额折扣 · 可设置最低订单金额 ·
          可设置过期日期 · 可一键停用而不删除。前台不展示促销码列表(用户必须知道码)。
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Tile label="总数" value={stats.total} />
          <Tile label="启用中" value={stats.active} tone="emerald" />
          <Tile label="已过期" value={stats.expired} tone="slate" />
        </div>
      </header>

      {/* Create */}
      <section className="mb-12 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
        <div className="mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4 text-blue-600" />
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            新建促销码
          </h2>
        </div>
        <PromoForm mode="create" />
      </section>

      {/* List */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-700" />
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            已有促销码 ({promos.length})
          </h2>
        </div>

        {promos.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
            还没有创建任何促销码 — 在上方表单新建一个。
          </div>
        ) : (
          <ul className="space-y-3">
            {promos.map((p) => {
              const expired = p.expiresAt
                ? new Date(p.expiresAt).getTime() < now
                : false;
              return (
                <li
                  key={p.code}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                >
                  <details>
                    <summary className="flex flex-wrap items-center gap-3 outline-none">
                      <span className="rounded-lg bg-slate-900 px-3 py-1 font-mono text-xs font-bold tabular-nums text-white">
                        {p.code}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {p.type === "percent"
                          ? `${p.value}% off`
                          : `$${p.value.toFixed(2)} off`}
                      </span>
                      {p.minSubtotal != null && (
                        <span className="text-xs text-slate-500">
                          min ${p.minSubtotal.toFixed(2)}
                        </span>
                      )}
                      {p.expiresAt && (
                        <span
                          className={[
                            "text-xs",
                            expired ? "text-red-600" : "text-slate-500",
                          ].join(" ")}
                        >
                          {expired ? "已过期 · " : "过期: "}
                          {new Date(p.expiresAt).toLocaleDateString("zh-CN")}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-2">
                        <PromoToggleActive code={p.code} initialActive={p.active} />
                        <span className="text-xs text-slate-400">点击展开</span>
                      </span>
                    </summary>
                    {p.note && (
                      <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        备注 · {p.note}
                      </p>
                    )}
                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <PromoForm mode="edit" initial={p} />
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

function Tile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "emerald" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "slate"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-50 text-blue-600";
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p
        className={[
          "mt-2 inline-flex rounded-lg px-2.5 py-1 text-2xl font-bold tabular-nums",
          toneClass,
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
