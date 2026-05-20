"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  FolderOpen,
  ImageOff,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { useAssetUrl } from "@/components/AssetUrlsProvider";
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

export function FieldGrid({
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

function FieldLabel({
  spec,
  value,
  onClear,
}: {
  spec: { label: string; optional?: boolean; kind: string };
  value: unknown;
  onClear: () => void;
}) {
  const hasValue =
    spec.kind === "number"
      ? typeof value === "number"
      : typeof value === "string" && value.length > 0;
  return (
    <div className="mb-1 flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
        {spec.label}
        {spec.optional && (
          <span className="ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-slate-500">
            可选
          </span>
        )}
      </span>
      {spec.optional && hasValue && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
          title="清除此字段(前台不再渲染)"
        >
          <X className="h-3 w-3" />
          清除
        </button>
      )}
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

  if (spec.kind === "text") {
    return (
      <div>
        <FieldLabel spec={spec} value={value} onClear={() => onChange("")} />
        <input
          type="text"
          value={typeof value === "string" ? value : ""}
          placeholder={spec.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        {spec.hint && (
          <p className="mt-1 text-[11px] text-slate-400">{spec.hint}</p>
        )}
      </div>
    );
  }
  if (spec.kind === "url") {
    const url = typeof value === "string" ? value : "";
    return (
      <div>
        <FieldLabel spec={spec} value={value} onClear={() => onChange("")} />
        <div className="flex items-center gap-1.5">
          <input
            type="url"
            value={url}
            placeholder={spec.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
          {url && (
            <a
              href={url.startsWith("/") || url.startsWith("http") ? url : `/${url}`}
              target="_blank"
              rel="noreferrer"
              title="新标签页打开"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        {spec.hint && (
          <p className="mt-1 text-[11px] text-slate-400">{spec.hint}</p>
        )}
      </div>
    );
  }
  if (spec.kind === "image") {
    const src = typeof value === "string" ? value : "";
    return (
      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {spec.label}
            {spec.optional && (
              <span className="ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-slate-500">
                可选
              </span>
            )}
          </span>
          <a
            href="/admin/images"
            target="_blank"
            rel="noreferrer"
            title="新标签页打开图片库,上传新图后复制路径回来"
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <FolderOpen className="h-3 w-3" />
            图片库
          </a>
        </div>
        <div className="flex items-start gap-2">
          <ImageThumb src={src} />
          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={src}
              placeholder={spec.placeholder ?? "/images/..."}
              onChange={(e) => onChange(e.target.value)}
              className={inputClass + " font-mono text-[12px]"}
            />
            {spec.optional && src && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="mt-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3 w-3" />
                清除
              </button>
            )}
            {spec.hint && (
              <p className="mt-1 text-[11px] text-slate-400">{spec.hint}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (spec.kind === "textarea") {
    return (
      <div>
        <FieldLabel spec={spec} value={value} onClear={() => onChange("")} />
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
      </div>
    );
  }
  if (spec.kind === "number") {
    return (
      <div>
        <FieldLabel spec={spec} value={value} onClear={() => onChange(undefined)} />
        <input
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(e) => {
            const n = e.target.value === "" ? undefined : Number(e.target.value);
            onChange(n);
          }}
          className={inputClass + " tabular-nums"}
        />
      </div>
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
      <div>
        <FieldLabel spec={spec} value={value} onClear={() => onChange("")} />
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          {/* Only show the "—" empty option for fields that are explicitly
              optional. Required selects (eg `tone` on a Slide) MUST hold a
              valid value so the consumer can branch without `||` games. */}
          {spec.optional && <option value="">—</option>}
          {spec.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (spec.kind === "object") {
    const isDefined = value !== null && value !== undefined && typeof value === "object";
    if (spec.optional && !isDefined) {
      // Render an "add" placeholder when the optional object is undefined.
      return (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              {spec.label}
              <span className="ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-slate-500">
                可选
              </span>
            </p>
            <button
              type="button"
              onClick={() =>
                onChange(
                  Object.fromEntries(
                    Object.entries(spec.fields).map(([k, sub]) => [
                      k,
                      sub.kind === "boolean"
                        ? false
                        : sub.kind === "number"
                        ? 0
                        : sub.kind === "stringList" ||
                          sub.kind === "objectList" ||
                          sub.kind === "tupleList"
                        ? []
                        : "",
                    ]),
                  ),
                )
              }
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-tight text-blue-700 hover:bg-blue-100"
            >
              <Plus className="h-3 w-3" />
              添加
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            未添加 — 前台不会渲染此区块。
          </p>
        </div>
      );
    }
    const obj = (isDefined ? (value as Record<string, unknown>) : {}) as Record<
      string,
      unknown
    >;
    return (
      <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {spec.label}
            {spec.optional && (
              <span className="ml-2 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold normal-case tracking-normal text-slate-500">
                可选
              </span>
            )}
          </p>
          {spec.optional && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              title="移除此区块(前台不再渲染)"
              className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-3 w-3" />
              移除
            </button>
          )}
        </div>
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
  if (spec.kind === "objectList") {
    const arr: Item[] = Array.isArray(value) ? (value as Item[]) : [];
    return (
      <InlineObjectList
        label={spec.label}
        itemLabel={spec.itemLabel ?? "项"}
        hint={spec.hint}
        items={arr}
        item={spec.item}
        onChange={onChange}
      />
    );
  }
  if (spec.kind === "tupleList") {
    const arr: [string, string][] = Array.isArray(value)
      ? (value as unknown[]).map((row) => {
          if (Array.isArray(row)) {
            return [String(row[0] ?? ""), String(row[1] ?? "")];
          }
          return ["", ""] as [string, string];
        })
      : [];
    return (
      <div>
        <p className={labelClass}>{spec.label}</p>
        {spec.hint && (
          <p className="mb-2 text-[11px] text-slate-400">{spec.hint}</p>
        )}
        {arr.length > 0 && (
          <div className="mb-1.5 grid grid-cols-[1fr_1fr_36px] gap-2 px-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
            <span>{spec.columns[0]}</span>
            <span>{spec.columns[1]}</span>
            <span></span>
          </div>
        )}
        <div className="space-y-1.5">
          {arr.length === 0 && (
            <p className="text-[11px] text-slate-400">
              空表。点下面"新增一行"。
            </p>
          )}
          {arr.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_36px] gap-2">
              <input
                type="text"
                value={row[0]}
                onChange={(e) => {
                  const next = arr.slice();
                  next[i] = [e.target.value, row[1]];
                  onChange(next);
                }}
                placeholder={spec.columns[0]}
                className={inputClass}
              />
              <input
                type="text"
                value={row[1]}
                onChange={(e) => {
                  const next = arr.slice();
                  next[i] = [row[0], e.target.value];
                  onChange(next);
                }}
                placeholder={spec.columns[1]}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(arr.filter((_, idx) => idx !== i))}
                aria-label="删除"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...arr, ["", ""]])}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-tight text-slate-700 hover:bg-slate-200"
        >
          <Plus className="h-3 w-3" />
          新增一行
        </button>
      </div>
    );
  }
  return null;
}

function InlineObjectList({
  label,
  itemLabel,
  hint,
  items,
  item,
  onChange,
}: {
  label: string;
  itemLabel: string;
  hint?: string;
  items: Item[];
  item: {
    titleKey?: string;
    subtitleKey?: string;
    order?: string[];
    fields: Record<string, FieldSpec>;
  };
  onChange: (next: unknown) => void;
}) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const update = (i: number, next: Item) => {
    const arr = items.slice();
    arr[i] = next;
    onChange(arr);
  };
  const remove = (i: number) => {
    if (!window.confirm(`删除「${itemLabel}」第 ${i + 1} 项?`)) return;
    onChange(items.filter((_, idx) => idx !== i));
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = items.slice();
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };
  const add = () => {
    onChange([...items, buildBlankItem({ fields: item.fields })]);
    setExpanded((prev) => new Set(prev).add(items.length));
  };

  return (
    <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <p className="mb-2 flex items-baseline justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
        <span>{label}</span>
        <span className="font-mono tabular-nums normal-case tracking-normal text-slate-400">
          {items.length} 项
        </span>
      </p>
      {hint && (
        <p className="mb-2 text-[11px] text-slate-400">{hint}</p>
      )}
      <div className="space-y-2">
        {items.length === 0 && (
          <p className="text-[11px] text-slate-400">
            空列表。点下面"新增{itemLabel}"。
          </p>
        )}
        {items.map((it, i) => {
          const isOpen = expanded.has(i);
          const title =
            (item.titleKey && firstString(it[item.titleKey])) ||
            `${itemLabel} ${i + 1}`;
          const subtitle =
            item.subtitleKey && firstString(it[item.subtitleKey]);
          return (
            <div
              key={i}
              className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-100"
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                  {isOpen ? (
                    <ChevronUp className="h-3 w-3 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  )}
                  <span className="truncate text-xs font-semibold tracking-tight text-slate-900">
                    {title}
                  </span>
                  {subtitle && (
                    <span className="ml-1 truncate text-[11px] text-slate-400">
                      · {subtitle}
                    </span>
                  )}
                </button>
                <div className="flex flex-shrink-0 items-center gap-0.5">
                  <IconButton
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    title="上移"
                  >
                    ↑
                  </IconButton>
                  <IconButton
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    title="下移"
                  >
                    ↓
                  </IconButton>
                  <IconButton onClick={() => remove(i)} title="删除" tone="danger">
                    <Trash2 className="h-3 w-3" />
                  </IconButton>
                </div>
              </div>
              {isOpen && (
                <div className="border-t border-slate-100 p-3">
                  <FieldGrid
                    item={it}
                    schema={{
                      titleKey: item.titleKey,
                      subtitleKey: item.subtitleKey,
                      order: item.order,
                      fields: item.fields,
                    }}
                    onChange={(next) => update(i, next)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-tight text-blue-700 hover:bg-blue-100"
      >
        <Plus className="h-3 w-3" />
        新增{itemLabel}
      </button>
    </div>
  );
}

/** Small image preview for image-path fields. Goes through useAssetUrl
 * so admin-uploaded overrides take effect immediately. */
function ImageThumb({ src }: { src: string }) {
  const resolved = useAssetUrl(src || "/");
  if (!src) {
    return (
      <span className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-300">
        <ImageOff className="h-4 w-4" />
      </span>
    );
  }
  return (
    <a
      href={resolved}
      target="_blank"
      rel="noreferrer"
      title="新标签页打开原图"
      className="relative inline-block h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200 hover:ring-blue-300"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolved}
        alt=""
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </a>
  );
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
