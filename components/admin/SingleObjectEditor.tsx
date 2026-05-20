"use client";

import { FieldGrid } from "@/components/admin/ArrayEditor";
import type { ItemSchema } from "@/lib/content/array-schemas";

/**
 * Editor for content sections whose value is a single object — mixed
 * scalar fields plus optional nested arrays (eg pdp.immersive, which has
 * eyebrow/title/etc. plus a stats[] array). Reuses the same typed inputs
 * that ArrayEditor uses for items.
 */
export default function SingleObjectEditor({
  value,
  schema,
  onChange,
}: {
  value: Record<string, unknown>;
  schema: ItemSchema;
  onChange: (next: Record<string, unknown>) => void;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
      <FieldGrid item={value} schema={schema} onChange={onChange} />
    </div>
  );
}
