"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Languages,
  Plus,
  Star,
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react";

import {
  deleteFirmwareVersion,
  deleteManualLang,
  setCurrentFirmware,
  uploadFirmware,
  uploadManual,
  type Result,
} from "@/app/admin/downloads/actions";
import type { FirmwareEntry, Manual, Locale } from "@/lib/downloads";

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "简体中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function DownloadsManager({
  firmware,
  manuals,
}: {
  firmware: FirmwareEntry[];
  manuals: Manual[];
}) {
  const [tab, setTab] = useState<"firmware" | "manuals">("firmware");

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-slate-200">
        <TabBtn active={tab === "firmware"} onClick={() => setTab("firmware")}>
          固件 ({firmware.reduce((s, e) => s + e.releases.length, 0)})
        </TabBtn>
        <TabBtn active={tab === "manuals"} onClick={() => setTab("manuals")}>
          手册 ({manuals.reduce((s, e) => s + Object.keys(e.files).length, 0)})
        </TabBtn>
      </div>

      {tab === "firmware" ? (
        <div className="space-y-6">
          {firmware.map((entry) => (
            <FirmwareEntryCard key={entry.productSlug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {manuals.map((entry) => (
            <ManualEntryCard key={entry.productSlug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "border-b-2 px-4 py-3 text-sm font-semibold tracking-tight transition-colors duration-300",
        active
          ? "border-blue-600 text-slate-900"
          : "border-transparent text-slate-500 hover:text-slate-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Toast({ result }: { result: Result | null }) {
  if (!result) return null;
  return (
    <p
      className={[
        "inline-flex items-center gap-1.5 text-xs",
        result.ok ? "text-emerald-600" : "text-red-600",
      ].join(" ")}
    >
      {result.ok ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      {result.ok ? result.message : result.error}
    </p>
  );
}

// ── Firmware card ─────────────────────────────────────────────────

function FirmwareEntryCard({ entry }: { entry: FirmwareEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900">
            {entry.modelLabel}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {entry.releases.length} version{entry.releases.length !== 1 ? "s" : ""} ·{" "}
            <span className="font-mono">{entry.productSlug}</span>
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
        >
          <Plus
            className={[
              "h-3.5 w-3.5 transition-transform duration-300",
              open ? "rotate-45" : "",
            ].join(" ")}
          />
          上传新版本
        </button>
      </div>

      {open && <FirmwareUploadForm slug={entry.productSlug} onDone={() => setOpen(false)} />}

      <ul className="divide-y divide-slate-100 border-t border-slate-100">
        {entry.releases.map((r) => (
          <FirmwareRow key={r.version} slug={entry.productSlug} release={r} />
        ))}
      </ul>
    </div>
  );
}

function FirmwareUploadForm({
  slug,
  onDone,
}: {
  slug: string;
  onDone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        setPending(true);
        setResult(null);
        fd.append("productSlug", slug);
        const res = await uploadFirmware(fd);
        setPending(false);
        setResult(res);
        if (res.ok) {
          formRef.current?.reset();
          setTimeout(onDone, 800);
        }
      }}
      className="grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:grid-cols-2"
    >
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-slate-600">版本号</span>
        <input
          name="version"
          required
          placeholder="v2.4.2"
          pattern="v\d+\.\d+\.\d+"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-slate-600">
          固件文件 (.bin, ≤64MB)
        </span>
        <input
          name="file"
          type="file"
          required
          accept=".bin,application/octet-stream"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-3 file:py-1 file:text-xs file:font-semibold"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-xs font-semibold text-slate-600">
          Release Notes
        </span>
        <textarea
          name="notes"
          rows={2}
          placeholder="本次更新内容…"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
        />
      </label>
      <label className="flex items-center gap-2 text-xs text-slate-700 sm:col-span-2">
        <input
          name="makeCurrent"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 rounded text-blue-600 focus:ring-blue-600"
        />
        设为当前版本(用户下载默认的版本)
      </label>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300"
        >
          <UploadCloud className="h-3.5 w-3.5" />
          {pending ? "上传中…" : "上传"}
        </button>
        <Toast result={result} />
      </div>
    </form>
  );
}

function FirmwareRow({ slug, release }: { slug: string; release: FirmwareEntry["releases"][number] }) {
  const [pending, setPending] = useState<"setCurrent" | "delete" | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const doSetCurrent = async () => {
    setPending("setCurrent");
    setResult(await setCurrentFirmware(slug, release.version));
    setPending(null);
  };

  const doDelete = async () => {
    if (!confirm(`删除 ${release.version}?`)) return;
    setPending("delete");
    setResult(await deleteFirmwareVersion(slug, release.version));
    setPending(null);
  };

  return (
    <li className="flex flex-wrap items-center gap-3 px-6 py-4">
      <FileText className="h-4 w-4 text-slate-400" />
      <span className="text-sm font-semibold tracking-tight tabular-nums text-slate-900">
        {release.version}
      </span>
      {release.current && (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          <Star className="h-3 w-3" />
          Current
        </span>
      )}
      <span className="text-xs text-slate-400">{release.date}</span>
      <span className="text-xs text-slate-400">{release.size}</span>
      <span className="ml-auto flex items-center gap-2">
        <a
          href={release.file}
          download
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          title="下载"
        >
          <Download className="h-3.5 w-3.5" />
        </a>
        {!release.current && (
          <button
            onClick={doSetCurrent}
            disabled={pending !== null}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 disabled:opacity-50"
          >
            {pending === "setCurrent" ? "…" : "设为当前"}
          </button>
        )}
        <button
          onClick={doDelete}
          disabled={pending !== null}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          title="删除"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </span>
      <span className="basis-full">
        <Toast result={result} />
      </span>
    </li>
  );
}

// ── Manual card ───────────────────────────────────────────────────

function ManualEntryCard({ entry }: { entry: Manual }) {
  const [openLang, setOpenLang] = useState<Locale | null>(null);
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h3 className="text-base font-bold tracking-tight text-slate-900">
            {entry.modelLabel}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            <Languages className="mr-1 inline h-3 w-3" />
            {Object.keys(entry.files).length} / {LANGS.length} 语言版本 ·{" "}
            <span className="font-mono">{entry.productSlug}</span>
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 px-6 py-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {LANGS.map((lang) => {
            const f = entry.files[lang.code];
            return (
              <ManualLangSlot
                key={lang.code}
                entry={entry}
                lang={lang}
                file={f}
                open={openLang === lang.code}
                onToggle={() =>
                  setOpenLang((cur) => (cur === lang.code ? null : lang.code))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ManualLangSlot({
  entry,
  lang,
  file,
  open,
  onToggle,
}: {
  entry: Manual;
  lang: { code: Locale; label: string; flag: string };
  file?: { file: string; size: string };
  open: boolean;
  onToggle: () => void;
}) {
  const [pending, setPending] = useState<"upload" | "delete" | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onUpload = async (fd: FormData) => {
    setPending("upload");
    fd.append("productSlug", entry.productSlug);
    fd.append("lang", lang.code);
    const res = await uploadManual(fd);
    setPending(null);
    setResult(res);
    if (res.ok) {
      formRef.current?.reset();
      setTimeout(() => onToggle(), 800);
    }
  };

  const onDelete = async () => {
    if (!confirm(`删除 ${entry.modelLabel} 的 ${lang.label} 手册?`)) return;
    setPending("delete");
    setResult(await deleteManualLang(entry.productSlug, lang.code));
    setPending(null);
  };

  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span aria-hidden>{lang.flag}</span>
          <span className="text-sm font-semibold text-slate-900">{lang.label}</span>
        </div>
        {file ? (
          <button
            onClick={onToggle}
            className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700"
          >
            ✓ {file.size}
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          >
            未上传
          </button>
        )}
      </div>

      {open && (
        <form
          ref={formRef}
          action={onUpload}
          className="mt-3 space-y-2 border-t border-white pt-3"
        >
          <input
            name="file"
            type="file"
            required
            accept=".pdf,application/pdf"
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs file:mr-2 file:rounded-full file:border-0 file:bg-slate-100 file:px-2 file:py-0.5 file:text-[10px] file:font-semibold"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={pending !== null}
              className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-blue-700 disabled:bg-slate-300"
            >
              <UploadCloud className="h-3 w-3" />
              {pending === "upload" ? "上传中" : "上传"}
            </button>
            {file && (
              <button
                type="button"
                onClick={onDelete}
                disabled={pending !== null}
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-red-600 hover:underline disabled:opacity-50"
              >
                <Trash2 className="h-3 w-3" />
                删除
              </button>
            )}
          </div>
          <Toast result={result} />
        </form>
      )}
    </div>
  );
}
