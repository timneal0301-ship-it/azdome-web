"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  ImagePlus,
  RotateCcw,
  Search,
  UploadCloud,
  X,
} from "lucide-react";

import { clearImage, updateImage } from "@/app/admin/actions";
import { useAssetUrl } from "@/components/AssetUrlsProvider";
import ImageLightbox from "@/components/admin/ImageLightbox";

/**
 * Slim inline upload card for /admin/products/[slug] — one of the 6
 * main-image slots in the 2×3 grid. Same upload + clear plumbing as
 * the asset-library SlotCard, but tighter visual (no path / dimension
 * label, since the product page already shows that context).
 *
 * Three display states:
 *   1. Uploaded (override exists in KV) → show Blob URL + reset button
 *   2. Seed file exists in public/      → show seed image, no badge
 *   3. Neither                          → empty placeholder, "点这里上传"
 */
export default function ProductSlotUpload({
  slotKey,
  slotPath,
  slotNumber,
  totalSlots,
  productLabel,
  isUploaded,
  hasSeed,
}: {
  /** e.g. "product-m550-pro-1" */
  slotKey: string;
  /** Path with leading slash: "/images/products/m550-pro/1.jpg" */
  slotPath: string;
  /** 1-indexed slot number */
  slotNumber: number;
  totalSlots: number;
  /** Short product name, used in alt text. */
  productLabel: string;
  /** True iff KV has an override for this slot. */
  isUploaded: boolean;
  /** True iff a seed file exists in public/ at slotPath. */
  hasSeed: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<
    | { kind: "success"; msg: string }
    | { kind: "error"; msg: string }
    | null
  >(null);
  // Flip to the URL returned by upload action so thumbnail switches
  // instantly, before router.refresh propagates new KV state.
  const [optimisticUrl, setOptimisticUrl] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Live URL from AssetUrlsProvider: Blob URL if uploaded, else slotPath.
  const liveUrl = useAssetUrl(slotPath);
  const currentSrc = optimisticUrl ?? liveUrl;
  const displaySrc = preview ?? currentSrc;
  const hasImage = isUploaded || hasSeed || preview !== null;
  // After an upload optimistic update, "currentSrc" diverges from slotPath.
  // After a clear, currentSrc === slotPath again. Reflects KV state +
  // optimistic state, used to render the "已上传" pill and reset button.
  const overrideActive =
    optimisticUrl !== null
      ? optimisticUrl !== slotPath
      : isUploaded;

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const acceptFile = (f: File) => {
    if (!/^image\/(jpeg|png|webp)$/.test(f.type)) {
      setFeedback({
        kind: "error",
        msg: `不支持的文件类型: ${f.type || "unknown"}`,
      });
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(f);
      inputRef.current.files = dt.files;
    }
    setPreview(URL.createObjectURL(f));
    setFeedback(null);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) acceptFile(f);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFeedback(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    setPending(true);
    setFeedback(null);
    const fd = new FormData();
    fd.append("slot", slotKey);
    fd.append("file", file);
    const res = await updateImage(fd);
    setPending(false);
    if (res.ok) {
      setFeedback({ kind: "success", msg: "已更新" });
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
    if (
      !window.confirm(
        `确定要清除主图 ${slotNumber}/${totalSlots} 的上传吗?会回退到 seed(若有)或空。`,
      )
    ) {
      return;
    }
    setPending(true);
    setFeedback(null);
    const res = await clearImage(slotKey);
    setPending(false);
    if (res.ok) {
      setFeedback({ kind: "success", msg: "已回退" });
      setOptimisticUrl(slotPath);
      router.refresh();
    } else {
      setFeedback({ kind: "error", msg: res.error });
    }
  };

  return (
    <div
      className={[
        "group/card relative flex flex-col rounded-2xl bg-white shadow-sm ring-1 transition-all",
        overrideActive ? "ring-emerald-100" : "ring-slate-100",
        isDragging ? "ring-2 ring-blue-400 bg-blue-50/40" : "",
      ].join(" ")}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="group/preview relative aspect-square w-full overflow-hidden rounded-t-2xl bg-slate-50">
        {hasImage ? (
          <Image
            key={`${slotKey}-${displaySrc}`}
            src={displaySrc}
            alt={`${productLabel} · 主图 ${slotNumber}`}
            fill
            sizes="(min-width: 1024px) 25vw, 45vw"
            className="object-contain p-3"
            unoptimized={!!preview}
          />
        ) : (
          <label
            htmlFor={`pslot-${slotKey}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-slate-400 transition-colors hover:bg-slate-100"
          >
            <ImagePlus className="h-8 w-8" />
            <span className="text-[11px] font-semibold tracking-tight">
              点这里上传 / 拖入
            </span>
          </label>
        )}

        {/* Slot number badge (top-left) */}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {slotNumber} / {totalSlots}
          {slotNumber === 1 && (
            <span className="ml-1 text-amber-300">封面</span>
          )}
        </span>

        {/* Status pill (top-right) */}
        {!preview && (
          <span
            className={[
              "absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
              overrideActive
                ? "bg-emerald-500/90 text-white"
                : hasSeed
                ? "bg-blue-100/95 text-blue-700"
                : "bg-white/85 text-slate-500 ring-1 ring-slate-200",
            ].join(" ")}
          >
            {overrideActive ? (
              <>
                <Check className="h-3 w-3" strokeWidth={3} />
                已上传
              </>
            ) : hasSeed ? (
              "种子图"
            ) : (
              "未上传"
            )}
          </span>
        )}

        {/* Lightbox trigger on hover (only when an image is showing) */}
        {hasImage && !preview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label="查看大图"
            title="查看大图"
            className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover/preview:bg-slate-900/30 group-hover/preview:opacity-100"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur-md">
              <Search className="h-4 w-4" />
            </span>
          </button>
        )}

        {/* Preview-only clear button (cancel before upload) */}
        {preview && (
          <button
            type="button"
            onClick={reset}
            aria-label="取消"
            className="absolute right-2 bottom-2 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70 text-white backdrop-blur-md transition-colors hover:bg-slate-900"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <input
          ref={inputRef}
          id={`pslot-${slotKey}`}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onPick}
          className="hidden"
        />
        {preview ? (
          <button
            type="button"
            onClick={onUpload}
            disabled={pending}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300"
          >
            <UploadCloud className="h-3 w-3" />
            {pending ? "上传中…" : "确认上传"}
          </button>
        ) : (
          <label
            htmlFor={`pslot-${slotKey}`}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
          >
            <ImagePlus className="h-3 w-3" />
            {overrideActive || hasSeed ? "替换" : "选择文件"}
          </label>
        )}
        {overrideActive && !preview && (
          <button
            type="button"
            onClick={onClear}
            disabled={pending}
            title="回退到种子图"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>

      {feedback && (
        <p
          className={[
            "flex items-center gap-1 px-3 pb-2.5 text-[10px]",
            feedback.kind === "success"
              ? "text-emerald-600"
              : "text-red-600",
          ].join(" ")}
        >
          {feedback.kind === "success" && (
            <CheckCircle2 className="h-3 w-3" />
          )}
          {feedback.msg}
        </p>
      )}

      <ImageLightbox
        src={displaySrc}
        alt={`${productLabel} · 主图 ${slotNumber}`}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
