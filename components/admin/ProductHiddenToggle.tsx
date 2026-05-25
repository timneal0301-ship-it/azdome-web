"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { toggleProductHidden } from "@/app/admin/products/actions";

/**
 * Per-SKU visibility toggle for the admin product grid. Wraps a server
 * action; uses useTransition so the row stays responsive while the
 * catalog overlay is rewritten in KV.
 */
export default function ProductHiddenToggle({
  slug,
  initialHidden,
  label,
}: {
  slug: string;
  initialHidden: boolean;
  label: string;
}) {
  const [hidden, setHidden] = useState(initialHidden);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onClick = (e: React.MouseEvent) => {
    // Card-level Link wraps this toggle — stop the click from navigating
    // into the per-product editor when the operator just wants to hide.
    e.preventDefault();
    e.stopPropagation();
    setError(null);
    startTransition(async () => {
      const r = await toggleProductHidden(slug);
      if (r.ok) setHidden(r.hidden);
      else setError(r.error);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title={hidden ? `显示 ${label}` : `隐藏 ${label}`}
      aria-label={hidden ? `显示 ${label}` : `隐藏 ${label}`}
      className={[
        "absolute right-2 top-2 inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-200",
        hidden
          ? "bg-slate-900/85 text-white hover:bg-slate-900"
          : "bg-white/85 text-slate-700 opacity-0 ring-1 ring-slate-200 hover:bg-white group-hover:opacity-100",
        pending ? "cursor-wait opacity-70" : "",
      ].join(" ")}
    >
      {pending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : hidden ? (
        <EyeOff className="h-3 w-3" />
      ) : (
        <Eye className="h-3 w-3" />
      )}
      <span>{error ?? (hidden ? "Hidden" : "Hide")}</span>
    </button>
  );
}
