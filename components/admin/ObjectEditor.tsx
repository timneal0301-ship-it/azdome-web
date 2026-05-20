"use client";

import ArrayEditor from "@/components/admin/ArrayEditor";
import type { ObjectPropEntry } from "@/lib/content/array-schemas";

type ObjectValue = Record<string, unknown>;

/**
 * Editor for content sections whose value is a plain object containing
 * one or more sub-arrays (eg about.page = { stats, values, timeline,
 * commitments }). Each registered sub-array gets its own labeled card
 * with the standard ArrayEditor inside. Unregistered keys fall back to
 * a small read-only JSON block with a note.
 */
export default function ObjectEditor({
  value,
  schema,
  onChange,
}: {
  value: ObjectValue;
  /** propKey → label + sub-array schema */
  schema: Record<string, ObjectPropEntry>;
  onChange: (next: ObjectValue) => void;
}) {
  const registeredKeys = Object.keys(schema);
  const unregisteredKeys = Object.keys(value).filter(
    (k) => !(k in schema),
  );

  const updateProp = (propKey: string, nextProp: unknown[]) => {
    onChange({ ...value, [propKey]: nextProp });
  };

  return (
    <div className="space-y-6">
      {registeredKeys.map((propKey) => {
        const entry = schema[propKey];
        const items = Array.isArray(value[propKey])
          ? (value[propKey] as Record<string, unknown>[])
          : [];
        return (
          <section
            key={propKey}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3">
              <div>
                <h3 className="text-sm font-bold tracking-tight text-slate-900">
                  {entry.label}
                </h3>
                {entry.hint && (
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {entry.hint}
                  </p>
                )}
              </div>
              <span className="flex items-center gap-2 text-[10px] tabular-nums">
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-500 ring-1 ring-slate-100">
                  .{propKey}
                </code>
                <span className="text-slate-400">{items.length} 项</span>
              </span>
            </header>
            <div className="p-4 sm:p-5">
              <ArrayEditor
                items={items}
                schema={entry.schema}
                onChange={(next) => updateProp(propKey, next)}
              />
            </div>
          </section>
        );
      })}

      {unregisteredKeys.length > 0 && (
        <section className="overflow-hidden rounded-2xl bg-amber-50 ring-1 ring-amber-100">
          <header className="border-b border-amber-100 px-5 py-3">
            <h3 className="text-sm font-bold tracking-tight text-amber-900">
              其它字段(未注册表单)
            </h3>
            <p className="mt-0.5 text-[11px] text-amber-700">
              这些键没有注册的子表单 schema,显示为只读 JSON。如需编辑,切到上方
              "JSON" 模式。
            </p>
          </header>
          <ul className="divide-y divide-amber-100">
            {unregisteredKeys.map((k) => (
              <li key={k} className="px-5 py-3">
                <code className="text-[11px] font-mono text-amber-800">
                  .{k}
                </code>
                <pre className="mt-1 overflow-x-auto rounded bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-700 ring-1 ring-amber-100">
{JSON.stringify(value[k], null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
