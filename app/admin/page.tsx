import SlotCard from "@/components/admin/SlotCard";
import { GROUPS, SLOTS } from "@/lib/image-slots";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Asset Library
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            资源管理
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            点击任意卡片选择新文件,确认后会覆盖到{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">
              public/{`<path>`}
            </code>{" "}
            并自动刷新前台。原文件以{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">
              .bak.&lt;ts&gt;
            </code>{" "}
            备份在同目录。
          </p>
        </div>
        <div className="flex gap-6 text-right text-xs uppercase tracking-[0.14em] text-slate-400">
          <div>
            <div className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
              {SLOTS.length}
            </div>
            <div className="mt-1">Slots</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
              {GROUPS.length}
            </div>
            <div className="mt-1">Groups</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
              8MB
            </div>
            <div className="mt-1">Max size</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr] lg:gap-12">
        {/* Side nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-20">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              On this page
            </p>
            <ul className="space-y-1">
              {GROUPS.map((g) => {
                const count = SLOTS.filter((s) => s.group === g.key).length;
                if (!count) return null;
                return (
                  <li key={g.key}>
                    <a
                      href={`#${g.key}`}
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <span>{g.label}</span>
                      <span className="text-xs tabular-nums text-slate-400 group-hover:text-slate-600">
                        {count}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 rounded-xl bg-slate-100 p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-900">⚠ 部署提醒</p>
              <p className="mt-1.5 leading-relaxed">
                Vercel / Netlify serverless 文件系统只读。生产环境需把{" "}
                <code className="rounded bg-white px-1">lib/storage.ts</code>{" "}
                的存储适配器换成 Vercel Blob 或 S3。
              </p>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-14">
          {GROUPS.map((group) => {
            const groupSlots = SLOTS.filter((s) => s.group === group.key);
            if (groupSlots.length === 0) return null;
            return (
              <section key={group.key} id={group.key} className="scroll-mt-20">
                <div className="mb-5 flex items-baseline justify-between">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                    {group.label}
                  </h2>
                  <span className="text-xs tabular-nums text-slate-400">
                    {groupSlots.length} 项
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {groupSlots.map((slot) => (
                    <SlotCard key={slot.key} slot={slot} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
