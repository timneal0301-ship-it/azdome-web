"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  RotateCcw,
  Save,
  Undo2,
  XCircle,
} from "lucide-react";

import {
  resetContentAction,
  revertContentAction,
  saveContentAction,
  type Result,
} from "@/app/admin/content/actions";

type Props = {
  sectionKey: string;
  label: string;
  description?: string;
  previewHref?: string;
  currentValue: unknown;
  defaultValue: unknown;
  isOverridden: boolean;
  hasPrev: boolean;
};

export default function ContentEditor({
  sectionKey,
  label,
  description,
  previewHref,
  currentValue,
  defaultValue,
  isOverridden,
  hasPrev,
}: Props) {
  const currentJson = useMemo(
    () => JSON.stringify(currentValue, null, 2),
    [currentValue],
  );
  const defaultJson = useMemo(
    () => JSON.stringify(defaultValue, null, 2),
    [defaultValue],
  );

  const [text, setText] = useState(currentJson);
  const [pending, setPending] = useState<"save" | "reset" | "revert" | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Validate on every keystroke (cheap; JSON.parse on ~10KB strings is fine).
  useEffect(() => {
    try {
      JSON.parse(text);
      setParseError(null);
    } catch (e) {
      setParseError(e instanceof Error ? e.message : "parse error");
    }
  }, [text]);

  const isDirty = text !== currentJson;
  const lineCount = text.split("\n").length;

  const onSave = async () => {
    if (parseError) return;
    setPending("save");
    setResult(null);
    setResult(await saveContentAction(sectionKey, text));
    setPending(null);
  };

  const onReset = async () => {
    if (!confirm("恢复为代码里的默认值,并清掉所有 admin 改动 + 历史?")) return;
    setPending("reset");
    setResult(null);
    const r = await resetContentAction(sectionKey);
    setPending(null);
    setResult(r);
    if (r.ok) setText(defaultJson);
  };

  const onRevert = async () => {
    setPending("revert");
    setResult(null);
    setResult(await revertContentAction(sectionKey));
    setPending(null);
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Edit content
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {label}
            </h1>
            {description && (
              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                {description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <code className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-mono text-slate-600">
                {sectionKey}
              </code>
              {isOverridden && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Has override
                </span>
              )}
              {hasPrev && (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                  Previous version available
                </span>
              )}
            </div>
          </div>
          {previewHref && (
            <a
              href={previewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 transition-colors duration-300 hover:bg-slate-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              查看页面
            </a>
          )}
        </div>
      </header>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>
            JSON · <span className="tabular-nums">{lineCount}</span> lines ·{" "}
            <span className="tabular-nums">{text.length}</span> chars
          </span>
          {parseError ? (
            <span className="inline-flex items-center gap-1 text-red-600">
              <XCircle className="h-3.5 w-3.5" />
              {parseError}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Valid JSON
            </span>
          )}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className={[
            "w-full rounded-2xl border bg-slate-950 p-5 font-mono text-[13px] leading-relaxed text-slate-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600/30",
            parseError ? "border-red-400/40" : "border-slate-200",
          ].join(" ")}
          style={{ minHeight: "60vh" }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onSave}
            disabled={!isDirty || !!parseError || pending !== null}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-blue-700 disabled:bg-slate-300"
          >
            <Save className="h-3.5 w-3.5" />
            {pending === "save" ? "保存中…" : isDirty ? "保存改动" : "无改动"}
          </button>
          {isOverridden && (
            <button
              onClick={onReset}
              disabled={pending !== null}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 transition-colors duration-300 hover:bg-slate-300 disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {pending === "reset" ? "重置中…" : "恢复默认值"}
            </button>
          )}
          {hasPrev && (
            <button
              onClick={onRevert}
              disabled={pending !== null}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold tracking-tight text-amber-800 transition-colors duration-300 hover:bg-amber-200 disabled:opacity-50"
            >
              <Undo2 className="h-3.5 w-3.5" />
              {pending === "revert" ? "回滚中…" : "回到上一版本"}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([text], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${sectionKey.replace(/\./g, "-")}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 ring-1 ring-slate-200 transition-colors duration-300 hover:bg-slate-100"
        >
          <Download className="h-3.5 w-3.5" />
          下载 JSON 备份
        </button>
      </div>

      {result && (
        <p
          className={[
            "inline-flex items-center gap-1.5 text-sm",
            result.ok ? "text-emerald-700" : "text-red-700",
          ].join(" ")}
        >
          {result.ok ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          {result.ok ? result.message : result.error}
        </p>
      )}
    </div>
  );
}
