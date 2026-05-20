import Link from "next/link";
import AutoRefresh from "@/components/admin/AutoRefresh";
import { ALL_SECTIONS, getContentDetailed } from "@/lib/content-server";
import { db } from "@/lib/db";
import { storage } from "@/lib/storage";
import { GROUPS, SLOTS } from "@/lib/image-slots";
import { getAssetUrlMap } from "@/lib/asset-urls";

export const dynamic = "force-dynamic";

export default async function DiagPage() {
  const [dbName, storageName, assetMap, contentEntries] = await Promise.all([
    db.adapterName().catch((e) => `ERROR: ${(e as Error).message}`),
    storage.adapterName().catch((e) => `ERROR: ${(e as Error).message}`),
    getAssetUrlMap().catch((e) => ({ __error: (e as Error).message })),
    Promise.all(
      ALL_SECTIONS.map(async (section) => ({
        section,
        ...(await getContentDetailed(section)),
      })),
    ),
  ]);

  const envChecks: Array<[string, boolean]> = [
    ["VERCEL", !!process.env.VERCEL],
    ["BLOB_READ_WRITE_TOKEN", !!process.env.BLOB_READ_WRITE_TOKEN],
    ["KV_REST_API_URL", !!process.env.KV_REST_API_URL],
    ["KV_REST_API_TOKEN", !!process.env.KV_REST_API_TOKEN],
    ["UPSTASH_REDIS_REST_URL", !!process.env.UPSTASH_REDIS_REST_URL],
    ["UPSTASH_REDIS_REST_TOKEN", !!process.env.UPSTASH_REDIS_REST_TOKEN],
    ["REDIS_URL", !!process.env.REDIS_URL],
  ];

  const isMapError = "__error" in assetMap;
  const overrides = isMapError ? {} : (assetMap as Record<string, string>);
  const overriddenCount = Object.keys(overrides).length;

  const slotRows = await Promise.all(
    SLOTS.map(async (slot) => {
      const kvKey = `image:${slot.key}`;
      const kvVal = await db.get<string>(kvKey).catch(() => undefined);
      const mapKey = `/${slot.path}`;
      const inMap = mapKey in overrides;
      return { slot, kvKey, kvVal, mapKey, inMap };
    }),
  );
  const overridden = slotRows.filter((r) => !!r.kvVal);

  const editedContent = contentEntries.filter((e) => e.isOverridden);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <AutoRefresh seconds={30} />

      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Diagnostics
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            上传链路诊断
          </h1>
          <p className="text-[11px] text-slate-400">
            自动刷新 · 每 30 秒 · 上次渲染{" "}
            {new Date().toLocaleTimeString("zh-CN", { hour12: false })}
          </p>
        </div>
        <p className="mt-2 text-sm text-slate-500">
          自上而下检查:存储适配器 → KV 数据 → AssetUrlMap → 前台渲染。
        </p>
      </header>

      <Section title="① Adapters · 当前生效的适配器">
        <Row
          label="Storage(图片实际落地的地方)"
          value={storageName}
          ok={storageName === "vercel-blob"}
          hint={
            storageName === "local-disk"
              ? "在 Vercel 上必须是 vercel-blob。请检查 BLOB_READ_WRITE_TOKEN。"
              : undefined
          }
        />
        <Row
          label="DB(URL 映射 + 内容覆盖)"
          value={dbName}
          ok={dbName === "vercel-kv"}
          hint={
            dbName === "local-json"
              ? "在 Vercel 上必须是 vercel-kv。请检查 KV_REST_API_URL/TOKEN 或 UPSTASH_REDIS_REST_URL/TOKEN。"
              : undefined
          }
        />
      </Section>

      <Section title="② Environment Variables · 关键环境变量是否注入">
        <ul className="grid grid-cols-1 gap-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 md:grid-cols-2">
          {envChecks.map(([name, present]) => (
            <li
              key={name}
              className="flex items-center justify-between border-b border-slate-100 px-5 py-3 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
            >
              <code className="text-xs font-mono text-slate-700">{name}</code>
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  present
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500",
                ].join(" ")}
              >
                {present ? "set" : "missing"}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={`③ AssetUrlMap · 当前覆盖 ${overriddenCount} 个 slot`}>
        {isMapError ? (
          <p className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-700">
            读取 AssetUrlMap 出错:{" "}
            <code>{(assetMap as { __error: string }).__error}</code>
          </p>
        ) : overriddenCount === 0 ? (
          <p className="rounded-xl bg-amber-50 px-5 py-4 text-sm text-amber-800">
            空 map —— admin 还没有上传任何图片,或 getAssetUrlMap 没读到。
            前台一定会显示静态种子图。
          </p>
        ) : (
          <details className="overflow-hidden rounded-xl bg-slate-900">
            <summary className="cursor-pointer px-5 py-3 text-xs font-semibold tracking-tight text-slate-200 hover:bg-slate-800">
              展开 JSON
            </summary>
            <pre className="overflow-x-auto px-5 pb-4 text-[11px] leading-relaxed text-slate-200">
{JSON.stringify(overrides, null, 2)}
            </pre>
          </details>
        )}
      </Section>

      <Section
        title={`④ Per-Slot · 已上传 ${overridden.length} / ${SLOTS.length}`}
      >
        <div className="space-y-3">
          {GROUPS.map((group) => {
            const groupRows = slotRows.filter((r) => r.slot.group === group.key);
            if (groupRows.length === 0) return null;
            const groupOverridden = groupRows.filter((r) => !!r.kvVal).length;
            return (
              <details
                key={group.key}
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
                open={groupOverridden > 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50">
                  <span className="text-sm font-semibold tracking-tight text-slate-900">
                    {group.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] tabular-nums">
                    {groupOverridden > 0 && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 font-semibold text-emerald-700">
                        {groupOverridden} 已上传
                      </span>
                    )}
                    <span className="text-slate-400">
                      {groupRows.length} 项
                    </span>
                  </span>
                </summary>
                <ul className="divide-y divide-slate-100 border-t border-slate-100">
                  {groupRows.map(({ slot, kvKey, kvVal, mapKey, inMap }) => {
                    const hasKv = !!kvVal;
                    const status =
                      hasKv && inMap ? "ok" : hasKv ? "kv-only" : "empty";
                    return (
                      <li key={slot.key} className="px-5 py-3 text-xs">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold tracking-tight text-slate-900">
                                {slot.label}
                              </span>
                              {status === "ok" && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
                                  OK
                                </span>
                              )}
                              {status === "kv-only" && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-800">
                                  KV 有但 map 没读到
                                </span>
                              )}
                              {status === "empty" && (
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                                  未上传
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 truncate font-mono text-[10px] text-slate-400">
                              kv:<code>{kvKey}</code> · map:<code>{mapKey}</code>
                            </p>
                            {kvVal && (
                              <p className="mt-1 truncate font-mono text-[10px] text-blue-700">
                                {kvVal}
                              </p>
                            )}
                          </div>
                          {kvVal && (
                            <a
                              href={kvVal}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex flex-shrink-0 items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-200"
                            >
                              打开图片 ↗
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </details>
            );
          })}
        </div>
      </Section>

      <Section
        title={`⑤ Content Overrides · 已编辑 ${editedContent.length} / ${contentEntries.length} 内容段`}
      >
        {editedContent.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-5 py-4 text-sm text-slate-500">
            还没有编辑过任何内容段。所有页面都使用代码里的默认值。
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
            {editedContent.map(({ section, hasPrev }) => (
              <li
                key={section.key}
                className="flex items-center justify-between gap-3 px-5 py-3 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-semibold tracking-tight text-slate-900">
                    {section.label}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-slate-400">
                    content:{section.key}
                    {hasPrev && (
                      <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 font-sans font-semibold text-amber-700">
                        可回滚
                      </span>
                    )}
                  </p>
                </div>
                <Link
                  href={`/admin/content/${encodeURIComponent(section.key)}`}
                  className="inline-flex flex-shrink-0 items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-200"
                >
                  编辑 ↗
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="⑥ 怎么读这页">
        <ul className="space-y-2 rounded-xl bg-blue-50 px-5 py-4 text-sm leading-relaxed text-blue-900">
          <li>
            <b>① Adapters</b> 必须都是 vercel-*。任何一个是 local-* → 缺环境变量。
          </li>
          <li>
            <b>③ AssetUrlMap 空</b> 而你确认上传过 → 看 ④ 对应 slot 的 KV 列。
          </li>
          <li>
            <b>KV 有 URL 但 map 没读到</b> → asset-urls.ts 拼装路径出错。
          </li>
          <li>
            <b>KV + map 都正常但前台还旧</b> → CDN 缓存。点"打开图片 ↗"验证 Blob 字节是否最新,然后硬刷新前台。
          </li>
        </ul>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-base font-bold tracking-tight text-slate-900 md:text-lg">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  label,
  value,
  ok,
  hint,
}: {
  label: string;
  value: string;
  ok: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-start justify-between gap-3 rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-100">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-tight text-slate-900">
          {label}
        </p>
        <p className="mt-0.5 font-mono text-xs text-slate-500">{value}</p>
        {hint && <p className="mt-1.5 text-xs text-amber-700">{hint}</p>}
      </div>
      <span
        className={[
          "mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
          ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700",
        ].join(" ")}
      >
        {ok ? "OK" : "Issue"}
      </span>
    </div>
  );
}
