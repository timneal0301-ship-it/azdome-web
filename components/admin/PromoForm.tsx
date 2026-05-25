"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Save, Trash2 } from "lucide-react";

import {
  createPromo,
  removePromo,
  updatePromo,
} from "@/app/admin/promos/actions";
import type { Promo, PromoType } from "@/lib/promo";

type Mode = "create" | "edit";

/**
 * Inline form for creating or editing a single promo code. Used by both
 * /admin/promos (create panel + every row's edit drawer).
 */
export default function PromoForm({
  mode,
  initial,
  onDone,
}: {
  mode: Mode;
  initial?: Partial<Promo>;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState(initial?.code ?? "");
  const [type, setType] = useState<PromoType>(initial?.type ?? "percent");
  const [value, setValue] = useState(
    initial?.value != null ? String(initial.value) : "",
  );
  const [minSubtotal, setMinSubtotal] = useState(
    initial?.minSubtotal != null ? String(initial.minSubtotal) : "",
  );
  const [expiresAt, setExpiresAt] = useState(
    initial?.expiresAt ? initial.expiresAt.slice(0, 10) : "",
  );
  const [active, setActive] = useState(initial?.active ?? true);
  const [note, setNote] = useState(initial?.note ?? "");

  const submit = () => {
    setError(null);
    const valueNum = Number(value);
    if (!Number.isFinite(valueNum) || valueNum <= 0) {
      setError("折扣值必须为正数");
      return;
    }
    const min = minSubtotal.trim() ? Number(minSubtotal) : null;
    if (min != null && (!Number.isFinite(min) || min < 0)) {
      setError("最低订单金额格式错误");
      return;
    }
    const payload = {
      code: code.trim(),
      type,
      value: valueNum,
      minSubtotal: min,
      // ISO end-of-day in UTC — operators pick a calendar date, we treat
      // it as "valid through end of that date" so a 2026-06-30 code still
      // works through midnight in the operator's last time zone.
      expiresAt: expiresAt
        ? new Date(`${expiresAt}T23:59:59Z`).toISOString()
        : null,
      active,
      note: note.trim() || null,
    };
    startTransition(async () => {
      const r =
        mode === "create"
          ? await createPromo(payload)
          : await updatePromo(payload);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      router.refresh();
      onDone?.();
    });
  };

  const onDelete = () => {
    if (!initial?.code) return;
    if (!confirm(`删除促销码 ${initial.code}? 此操作不可撤销。`)) return;
    setError(null);
    startTransition(async () => {
      const r = await removePromo(initial.code!);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      router.refresh();
      onDone?.();
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field label="促销码 (字母/数字, 大写)" required>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            disabled={mode === "edit"}
            maxLength={32}
            placeholder="WELCOME20"
            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono tabular-nums uppercase shadow-inner outline-none transition-colors focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-500"
          />
        </Field>
        <Field label="折扣类型">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PromoType)}
            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition-colors focus:border-blue-500"
          >
            <option value="percent">百分比 (% off)</option>
            <option value="amount">固定金额 ($ off)</option>
          </select>
        </Field>
        <Field
          label={type === "percent" ? "百分比 (1–100)" : "金额 (USD)"}
          required
        >
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min="0"
            step={type === "percent" ? "1" : "0.01"}
            placeholder={type === "percent" ? "20" : "15.00"}
            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm tabular-nums shadow-inner outline-none transition-colors focus:border-blue-500"
          />
        </Field>
        <Field label="最低订单金额 USD (留空 = 无门槛)">
          <input
            type="number"
            value={minSubtotal}
            onChange={(e) => setMinSubtotal(e.target.value)}
            min="0"
            step="0.01"
            placeholder="50"
            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm tabular-nums shadow-inner outline-none transition-colors focus:border-blue-500"
          />
        </Field>
        <Field label="过期日期 (留空 = 永久)">
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition-colors focus:border-blue-500"
          />
        </Field>
        <Field label="状态">
          <label className="mt-1 inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>启用 (active)</span>
          </label>
        </Field>
      </div>

      <Field label="内部备注 (不显示给用户)">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={200}
          placeholder="2026 夏季促销 · 邮件订阅者"
          className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner outline-none transition-colors focus:border-blue-500"
        />
      </Field>

      {error && (
        <p className="text-xs font-medium text-red-600">{error}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : mode === "create" ? (
            <Save className="h-3.5 w-3.5" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          {mode === "create" ? "创建" : "保存"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold tracking-tight text-red-700 transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            删除
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
