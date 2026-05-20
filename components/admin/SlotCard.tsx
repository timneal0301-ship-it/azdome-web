"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, RotateCcw, UploadCloud, X } from "lucide-react";

import { clearImage, updateImage } from "@/app/admin/actions";
import { useAssetUrl } from "@/components/AssetUrlsProvider";
import type { ImageSlot } from "@/lib/image-slots";

export default function SlotCard({ slot }: { slot: ImageSlot }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<
    | { kind: "success"; msg: string }
    | { kind: "error"; msg: string }
    | null
  >(null);
  // Set to the URL returned by the upload action so the thumbnail flips to
  // the new image instantly, before router.refresh propagates new KV state.
  const [optimisticUrl, setOptimisticUrl] = useState<string | null>(null);

  // Live URL from the AssetUrlsProvider — Blob URL if uploaded, else the
  // static seed path. After router.refresh this re-reads the latest map.
  const liveUrl = useAssetUrl(`/${slot.path}`);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFeedback(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
    setFeedback(null);
  };

  const onUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    setPending(true);
    setFeedback(null);
    const fd = new FormData();
    fd.append("slot", slot.key);
    fd.append("file", file);
    const res = await updateImage(fd);
    setPending(false);
    if (res.ok) {
      setFeedback({ kind: "success", msg: "已更新,前台已刷新" });
      setOptimisticUrl(res.path);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } else {
      setFeedback({ kind: "error", msg: res.error });
    }
  };

  const onClear = async () => {
    if (!window.confirm(`确定要清除「${slot.label}」的上传记录吗?前台会回退到种子图。`)) {
      return;
    }
    setPending(true);
    setFeedback(null);
    const res = await clearImage(slot.key);
    setPending(false);
    if (res.ok) {
      setFeedback({ kind: "success", msg: "已清除,前台已回退" });
      setOptimisticUrl(`/${slot.path}`);
      router.refresh();
    } else {
      setFeedback({ kind: "error", msg: res.error });
    }
  };

  const currentSrc = optimisticUrl ?? liveUrl;
  const displaySrc = preview ?? currentSrc;
  const isSquare = slot.width === slot.height;
  // True when the live URL is the static seed (no override active).
  const hasOverride =
    currentSrc !== `/${slot.path}` && !currentSrc.endsWith(slot.path);

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div
        className={[
          "relative overflow-hidden rounded-xl bg-slate-100",
          isSquare ? "aspect-square" : "aspect-[4/3]",
        ].join(" ")}
      >
        <Image
          key={`${slot.key}-${displaySrc}`}
          src={displaySrc}
          alt={slot.label}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
          unoptimized={!!preview}
        />
        {preview && (
          <button
            type="button"
            onClick={reset}
            aria-label="清除预览"
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70 text-white backdrop-blur-md transition-colors hover:bg-slate-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="mt-3 min-h-[3.25rem]">
        <p className="text-sm font-semibold tracking-tight text-slate-900">
          {slot.label}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-slate-400" title={slot.path}>
          {slot.path} · 推荐 {slot.width}×{slot.height}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <label className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onPick}
            className="hidden"
          />
          <span className="block cursor-pointer rounded-full bg-slate-100 px-4 py-2 text-center text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200">
            选择文件
          </span>
        </label>
        <button
          type="button"
          disabled={!preview || pending}
          onClick={onUpload}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300"
        >
          <UploadCloud className="h-3.5 w-3.5" />
          {pending ? "上传中…" : "上传"}
        </button>
      </div>

      {hasOverride && !preview && (
        <button
          type="button"
          onClick={onClear}
          disabled={pending}
          className="mt-2 inline-flex items-center justify-center gap-1 self-start rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-tight text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          title="把这个槽位回退到代码里的种子图"
        >
          <RotateCcw className="h-3 w-3" />
          重置上传
        </button>
      )}

      {feedback && (
        <p
          className={[
            "mt-3 inline-flex items-center gap-1 text-xs",
            feedback.kind === "success" ? "text-emerald-600" : "text-red-600",
          ].join(" ")}
        >
          {feedback.kind === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
          {feedback.msg}
        </p>
      )}
    </div>
  );
}
