import ImageLibrary from "@/components/admin/ImageLibrary";
import { GROUPS, SLOTS } from "@/lib/image-slots";

export const dynamic = "force-dynamic";

export default function ImagesAdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Asset Library
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            图片资源
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            点任意卡片选新文件上传, 写入 Vercel Blob,前台立即生效。
            每个 slot 可以"重置上传"回到代码里的种子图。
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

      <ImageLibrary groups={GROUPS} slots={SLOTS} />
    </main>
  );
}
