"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, UploadCloud, X } from "lucide-react";

import { updateImage } from "@/app/admin/actions";
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
  // Bumped after a successful upload to bust the <Image> cache.
  const [version, setVersion] = useState(0);

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
      setVersion((v) => v + 1);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    } else {
      setFeedback({ kind: "error", msg: res.error });
    }
  };

  const currentSrc = `/${slot.path}${version > 0 ? `?v=${version}` : ""}`;
  const displaySrc = preview ?? currentSrc;
  const isSquare = slot.width === slot.height;

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div
        className={[
          "relative overflow-hidden rounded-xl bg-slate-100",
          isSquare ? "aspect-square" : "aspect-[4/3]",
        ].join(" ")}
      >
        <Image
          key={`${slot.key}-${version}-${preview ? "preview" : "current"}`}
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
