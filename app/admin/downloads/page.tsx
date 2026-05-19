import DownloadsManager from "@/components/admin/DownloadsManager";
import { getAllFirmware, getAllManuals } from "@/lib/downloads-server";

export const dynamic = "force-dynamic";

export default async function DownloadsAdminPage() {
  const firmware = await getAllFirmware();
  const manuals = await getAllManuals();

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 lg:px-10">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Downloads
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          固件 & 说明书
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          固件 .bin 文件上传后写入{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">public/downloads/firmware/</code>
          ,手册 PDF 写入{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">public/downloads/manuals/</code>
          。元信息(版本号、大小、SHA、发布说明)持久化到{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">data/db.json</code>
          。覆盖 seeds,前台 /support 即时刷新。
        </p>
      </header>

      <DownloadsManager firmware={firmware} manuals={manuals} />
    </main>
  );
}
