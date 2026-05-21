"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

import { updateImage } from "@/app/admin/actions";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function GroupBulkUpload({
  emptySlotKeys,
  groupLabel,
}: {
  /** Slot keys in this group that have no override yet — files will fill
   * these in order until either runs out. */
  emptySlotKeys: string[];
  /** Human label (eg "Hero Carousel 大 Banner") for the confirm dialog. */
  groupLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
    failed: { slot: string; reason: string }[];
  } | null>(null);

  const onFilesPicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    e.target.value = ""; // allow re-select same files later

    // Match files → slots in order, capped at the smaller count.
    const pairs = files.slice(0, emptySlotKeys.length).map((file, i) => ({
      file,
      slot: emptySlotKeys[i],
    }));
    const skipped = files.length - pairs.length;
    if (skipped > 0) {
      const proceed = window.confirm(
        `「${groupLabel}」组只有 ${emptySlotKeys.length} 个空 slot,选了 ${files.length} 个文件。\n前 ${pairs.length} 张会上传,多出的 ${skipped} 张会被忽略。继续?`,
      );
      if (!proceed) return;
    }

    const failed: { slot: string; reason: string }[] = [];
    setProgress({ current: 0, total: pairs.length, failed: [] });
    for (let i = 0; i < pairs.length; i++) {
      const { file, slot } = pairs[i];
      if (!ALLOWED.includes(file.type)) {
        failed.push({ slot, reason: `不支持的类型 ${file.type || "unknown"}` });
        setProgress({ current: i + 1, total: pairs.length, failed: [...failed] });
        continue;
      }
      if (file.size > 8 * 1024 * 1024) {
        failed.push({ slot, reason: "文件超 8MB" });
        setProgress({ current: i + 1, total: pairs.length, failed: [...failed] });
        continue;
      }
      const fd = new FormData();
      fd.append("slot", slot);
      fd.append("file", file);
      const res = await updateImage(fd);
      if (!res.ok) {
        failed.push({ slot, reason: res.error });
      }
      setProgress({ current: i + 1, total: pairs.length, failed: [...failed] });
    }

    // Done — refresh layout so SlotCards reflect new KV state, then keep
    // the progress card visible briefly so admin sees the final tally.
    router.refresh();
    setTimeout(() => setProgress(null), failed.length > 0 ? 6000 : 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={onFilesPicked}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={emptySlotKeys.length === 0 || progress !== null}
        title={
          emptySlotKeys.length === 0
            ? "该组所有 slot 都已上传"
            : `按顺序填充 ${emptySlotKeys.length} 个空 slot`
        }
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-tight transition-colors",
          emptySlotKeys.length === 0
            ? "bg-slate-100 text-slate-400"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100",
          progress !== null ? "opacity-60" : "",
        ].join(" ")}
      >
        <UploadCloud className="h-3 w-3" />
        {progress
          ? `上传中 ${progress.current}/${progress.total}`
          : emptySlotKeys.length === 0
          ? "全部已上传"
          : `批量上传(${emptySlotKeys.length} 空位)`}
      </button>

      {progress && progress.failed.length > 0 && (
        <span
          title={progress.failed
            .map((f) => `${f.slot}: ${f.reason}`)
            .join("\n")}
          className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold tracking-tight text-red-700"
        >
          {progress.failed.length} 失败
        </span>
      )}
    </div>
  );
}
