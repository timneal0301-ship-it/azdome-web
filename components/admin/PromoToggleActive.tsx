"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { togglePromoActive } from "@/app/admin/promos/actions";

export default function PromoToggleActive({
  code,
  initialActive,
}: {
  code: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const r = await togglePromoActive(code);
      if (r.ok) setActive(!active);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={[
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all",
        active
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          : "bg-slate-200 text-slate-600 hover:bg-slate-300",
        pending ? "cursor-wait opacity-70" : "",
      ].join(" ")}
    >
      {pending && <Loader2 className="h-3 w-3 animate-spin" />}
      {active ? "Active" : "Off"}
    </button>
  );
}
