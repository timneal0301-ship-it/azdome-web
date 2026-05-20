import Link from "next/link";

import { db } from "@/lib/db";
import { storage } from "@/lib/storage";

// Server-rendered status pill. Green if both Vercel KV + Blob are wired,
// amber if running on local fallback adapters, red on adapter errors.
// Click to jump to the full /admin/diag page.
export default async function HealthDot() {
  let dbName = "unknown";
  let storageName = "unknown";
  let errored = false;
  try {
    [dbName, storageName] = await Promise.all([
      db.adapterName(),
      storage.adapterName(),
    ]);
  } catch {
    errored = true;
  }

  const dbOk = dbName === "vercel-kv";
  const storageOk = storageName === "vercel-blob";
  const allOk = dbOk && storageOk && !errored;
  const status = errored
    ? { color: "bg-red-500", text: "异常", ring: "ring-red-200" }
    : allOk
    ? { color: "bg-emerald-500", text: "正常", ring: "ring-emerald-200" }
    : { color: "bg-amber-500", text: "本地回退", ring: "ring-amber-200" };

  return (
    <Link
      href="/admin/diag"
      title={`KV: ${dbName} · Storage: ${storageName}`}
      className="group inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-slate-700 ring-1 ring-slate-100 transition-colors hover:bg-slate-100"
    >
      <span
        className={[
          "inline-block h-2 w-2 flex-shrink-0 rounded-full ring-2",
          status.color,
          status.ring,
        ].join(" ")}
      />
      <span className="hidden sm:inline">{status.text}</span>
    </Link>
  );
}
