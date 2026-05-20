"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import type { FieldSpec, ItemSchema } from "@/lib/content/array-schemas";
import { buildBlankItem } from "@/lib/content/array-schemas";

type Item = Record<string, unknown>;

export default function ArrayEditor({
  items,
  schema,
  onChange,
}: {
  items: Item[];
  schema: ItemSchema;
  onChange: (next: Item[]) => void;
}) {
  // Start with all rows collapsed; toggle by index.
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const updateAt = (i: number, item: Item) => {
    const next = items.slice();
    next[i] = item;
    onChange(next);
  };
  const removeAt = (i: number) => {
    if (!window.confirm(`删除第 ${i + 1} 项?`)) return;
    onChange(items.filter((_, idx) => idx !== i));
  };
  const moveAt = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const toggleHidden = (i: number) => {
    const item = items[i];
    updateAt(i, { ...item, hidden: !item.hidden });
  };
  const addItem = () => {
    const blank = buildBlankItem(schema);
    onChange([...items, blank]);
    setExpanded((prev) => new Set(prev).add(items.length));
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="rounded-xl bg-slate-50 px-5 py-6 text-center text-sm text-slate-500 ring-1 ring-slate-100">
          还没有任何条目。点下方"新增一项"。
        </p>
      ) : (
        items.map((item, i) => (
          <ItemCard
            key={i}
            index={i}
            total={items.length}
            item={item}
            schema={schema}
            isExpanded={expanded.has(i)}
            onToggle={() => toggle(i)}
            onChange={(next) => updateAt(i, next)}
            onRemove={() => removeAt(i)}
            onMoveUp={() => moveAt(i, -1)}
            onMoveDown={() => moveAt(i, 1)}
            onToggleHidden={() => toggleHidden(i)}
          />
        ))
      )}

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold tracking-tight text-blue-700 transition-colors hover:bg-blue-100"
      >
        <Plus className="h-3.5 w-3.5" />
        新增一项
      </button>
    </div>
  );
}

function ItemCard({
  index,
  total,
  item,
  schema,
  isExpanded,
  onToggle,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  onToggleHidden,
}: {
  index: number;
  total: number;
  item: Item;
  schema: ItemSchema;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (next: Item) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleHidden: () => void;
}) {
  const hidden = item.hidden === true;
  const title =
    (schema.titleKey && firstString(item[schema.titleKey])) ||
    `第 ${index + 1} 项`;
  const subtitle =
    schema.subtitleKey && firstString(item[schema.subtitleKey]);

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl bg-white shadow-sm ring-1",
        hidden ? "ring-slate-200 opacity-60" : "ring-slate-100",
      ].join(" ")}
    >
      {/* Header (always visible) */}
      <div className="flex items-center gap-2 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isExpanded ? "收起" : "展开"}
          className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="min-w-0 flex-1 cursor-pointer text-left"
        >
          <p className="truncate text-sm font-semibold tracking-tight text-slate-900">
            {title}
            {hidden && (
              <span className="ml-2 inline-flex items-center rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                hidden
              </span>
            )}
          </p>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}
        </button>
        <div className="flex flex-shrink-0 items-center gap-0.5">
          <IconButton
            onClick={onMoveUp}
            disabled={index === 0}
            title="上移"
          >
            ↑
          </IconButton>
          <IconButton
            onClick={onMoveDown}
            disabled={index === total - 1}
            title="下移"
          >
            ↓
          </IconButton>
          <IconButton onClick={onToggleHidden} title={hidden ? "显示" : "隐藏"}>
            {hidden ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </IconButton>
          <IconButton onClick={onRemove} title="删除" tone="danger">
            <Trash2 className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>

      {/* Body */}
      {isExpanded && (
        <div className="border-t border-slate-100 p-4 sm:p-5">
          <FieldGrid item={item} schema={schema} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

function FieldGrid({
  item,
  schema,
  onChange,
}: {
  item: Item;
  schema: ItemSchema;
  onChange: (next: Item) => void;
}) {
  const ordered = orderFields(schema);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ordered.map(([key, spec]) => (
        <div
          key={key}
          className={[
            "min-w-0",
            spec.kind === "textarea" ||
            spec.kind === "object" ||
            spec.kind === "stringList"
              ? "sm:col-span-2"
              : "",
          ].join(" ")}
        >
          <FieldInput
            spec={spec}
            value={item[key]}
            onChange={(v) => onChange({ ...item, [key]: v })}
          />
        </div>
      ))}
    </div>
  );
}

function FieldInput({
  spec,
  value,
  onChange,
}: {
  spec: FieldSpec;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  const labelClass =
    "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500";
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15";

  if (spec.kind === "text" || spec.kind === "url") {
    return (
      <label>
        <span className={labelClass}>{spec.label}</span>
        <input
          type={spec.kind === "url" ? "url" : "text"}
          value={typeof value === "string" ? value : ""}
          placeholder={spec.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        {spec.hint && (
          <p className="mt-1 text-[11px] text-slate-400">{spec.hint}</p>
        )}
      </label>
    );
  }
  if (spec.kind === "textarea") {
    return (
      <label>
        <span className={labelClass}>{spec.label}</span>
        <textarea
          value={typeof value === "string" ? value : ""}
          placeholder={spec.placeholder}
          rows={spec.rows ?? 3}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass + " resize-y"}
        />
        {spec.hint && (
          <p className="mt-1 text-[11px] text-slate-400">{spec.hint}</p>
        )}
      </label>
    );
  }
  if (spec.kind === "number") {
    return (
      <label>
        <span className={labelClass}>{spec.label}</span>
        <input
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(e) => {
            const n = e.target.value === "" ? undefined : Number(e.target.value);
            onChange(n);
          }}
          className={inputClass + " tabular-nums"}
        />
      </label>
    );
  }
  if (spec.kind === "boolean") {
    return (
      <label className="inline-flex cursor-pointer items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={value === true}
          onClick={() => onChange(!value)}
          className={[
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
            value === true ? "bg-blue-600" : "bg-slate-300",
          ].join(" ")}
        >
          <span
            className={[
              "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
              value === true ? "translate-x-5" : "translate-x-0.5",
            ].join(" ")}
          />
        </button>
        <span className="text-sm tracking-tight text-slate-900">
          {spec.label}
        </span>
      </label>
    );
  }
  if (spec.kind === "select") {
    return (
      <label>
        <span className={labelClass}>{spec.label}</span>
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">—</option>
          {spec.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (spec.kind === "object") {
    const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
    return (
      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {spec.label}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(spec.fields).map(([key, sub]) => (
            <FieldInput
              key={key}
              spec={sub}
              value={obj[key]}
              onChange={(v) => onChange({ ...obj, [key]: v })}
            />
          ))}
        </div>
      </div>
    );
  }
  if (spec.kind === "stringList") {
    const arr = Array.isArray(value) ? (value as unknown[]).map(String) : [];
    return (
      <div>
        <p className={labelClass}>{spec.label}</p>
        <div className="space-y-2">
          {arr.length === 0 && (
            <p className="text-[11px] text-slate-400">空列表。点下面"新增"。</p>
          )}
          {arr.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={line}
                onChange={(e) => {
                  const next = arr.slice();
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={spec.itemLabel}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, idx) => idx !== i))}
                aria-label="删除"
                className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...arr, ""])}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-tight text-slate-700 hover:bg-slate-200"
        >
          <Plus className="h-3 w-3" />
          新增{spec.itemLabel ?? "项"}
        </button>
      </div>
    );
  }
  return null;
}

function IconButton({
  onClick,
  disabled,
  title,
  tone,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  tone?: "danger";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        "inline-flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-colors disabled:opacity-30",
        tone === "danger"
          ? "text-slate-400 hover:bg-red-50 hover:text-red-600"
          : "text-slate-400 hover:bg-slate-100 hover:text-slate-700",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function firstString(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

function orderFields(schema: ItemSchema): [string, FieldSpec][] {
  const all = Object.entries(schema.fields);
  if (!schema.order) return all;
  const orderMap = new Map(schema.order.map((k, i) => [k, i]));
  return all.sort(([a], [b]) => {
    const ai = orderMap.get(a) ?? 999;
    const bi = orderMap.get(b) ?? 999;
    return ai - bi;
  });
}
