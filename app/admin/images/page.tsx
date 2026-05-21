import ImageLibrary from "@/components/admin/ImageLibrary";
import { GROUPS, SLOTS } from "@/lib/image-slots";

export const dynamic = "force-dynamic";

export default function ImagesAdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Asset Library
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            图片资源
          </h1>
          <p className="text-xs text-slate-400">
            拖拽 / 点击上传 · 写入 Vercel Blob · 单文件 ≤ 8 MB · 前台立即刷新
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">
          每个 slot 一个图片入口。上传后会被前台引用对应路径的位置自动取代;若要回退到代码里的种子图,点卡片底部"重置上传"。
        </p>
      </header>

      <ImageLibrary groups={GROUPS} slots={SLOTS} />
    </main>
  );
}
