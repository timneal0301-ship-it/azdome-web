"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, PenLine, X } from "lucide-react";

import { updateProductFields } from "@/app/admin/products/actions";

type Props = {
  slug: string;
  initial: {
    price: number;
    comparePrice?: number;
    badge?: string;
    tagline?: string;
  };
  hidden?: boolean;
  rating?: number;
  reviewCount?: number;
};

/**
 * Inline editor for the merchandising fields on /admin/products/[slug].
 * Mirrors the read-only header layout when closed; flips to a form when
 * the operator clicks Edit. Writes go through updateProductFields, which
 * rewrites the catalog overlay in KV — same pattern as the hide toggle.
 */
export default function ProductFieldsEditor({
  slug,
  initial,
  hidden,
  rating,
  reviewCount,
}: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Local form state — only used while editing.
  const [price, setPrice] = useState(String(initial.price));
  const [comparePrice, setComparePrice] = useState(
    initial.comparePrice != null ? String(initial.comparePrice) : "",
  );
  const [badge, setBadge] = useState(initial.badge ?? "");
  const [tagline, setTagline] = useState(initial.tagline ?? "");

  const reset = () => {
    setPrice(String(initial.price));
    setComparePrice(initial.comparePrice != null ? String(initial.comparePrice) : "");
    setBadge(initial.badge ?? "");
    setTagline(initial.tagline ?? "");
    setError(null);
  };

  const onSave = () => {
    setError(null);
    const priceNum = Number(price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError("价格必须是大于 0 的数字");
      return;
    }
    let cmpNum: number | null = null;
    if (comparePrice.trim()) {
      const n = Number(comparePrice);
      if (!Number.isFinite(n) || n <= 0) {
        setError("对比价必须是大于 0 的数字");
        return;
      }
      cmpNum = n;
    }
    startTransition(async () => {
      const r = await updateProductFields(slug, {
        price: priceNum,
        comparePrice: comparePrice.trim() ? cmpNum : null,
        badge: badge.trim() ? badge : null,
        tagline: tagline.trim() ? tagline : null,
      });
      if (!r.ok) {
        setError(r.error);
        return;
      }
      setEditing(false);
      // Pull fresh server state so the read-only view reflects the save
      // (header reads product from getProductWithOverlay, which goes
      // through KV — the action already revalidates, refresh re-fetches).
      router.refresh();
    });
  };

  if (!editing) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl font-bold tracking-tight tabular-nums text-slate-900">
          ${initial.price.toFixed(2)}
        </span>
        {initial.comparePrice != null && initial.comparePrice > initial.price && (
          <span className="text-sm tabular-nums text-slate-400 line-through">
            ${initial.comparePrice.toFixed(2)}
          </span>
        )}
        {initial.badge && (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
            {initial.badge}
          </span>
        )}
        {hidden && (
          <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Hidden
          </span>
        )}
        {rating !== undefined && (
          <span className="text-xs text-slate-500">
            ★ {rating} · {reviewCount ?? 0} reviews
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            reset();
            setEditing(true);
          }}
          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
        >
          <PenLine className="h-3 w-3" />
          编辑
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field
          label="价格 (USD)"
          required
          value={price}
          onChange={setPrice}
          type="number"
          step="0.01"
          min="0"
        />
        <Field
          label="对比价 (留空 = 无)"
          value={comparePrice}
          onChange={setComparePrice}
          type="number"
          step="0.01"
          min="0"
        />
        <Field
          label="Badge (徽章文本, 留空 = 无)"
          value={badge}
          onChange={setBadge}
          maxLength={32}
        />
        <Field
          label="Tagline (副标题, 留空 = 无)"
          value={tagline}
          onChange={setTagline}
          maxLength={140}
        />
      </div>
      {error && (
        <p className="mt-3 text-xs font-medium text-red-600">{error}</p>
      )}
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          保存
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            reset();
          }}
          disabled={pending}
          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
        >
          <X className="h-3.5 w-3.5" />
          取消
        </button>
        <p className="ml-2 text-[11px] text-slate-400">
          保存后写入 KV 覆盖层 · 前台立刻生效
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  step,
  min,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        min={min}
        maxLength={maxLength}
        required={required}
        className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm tabular-nums shadow-inner outline-none transition-colors focus:border-blue-500"
      />
    </label>
  );
}
