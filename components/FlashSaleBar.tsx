"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/Link";
import { ChevronRight, X } from "lucide-react";

import {
  DEFAULT_FLASH_SALE,
  type FlashSaleContent,
} from "./FlashSaleBar.data";

function diff(toISO: string): { d: number; h: number; m: number; s: number } | null {
  const end = Date.parse(toISO);
  if (Number.isNaN(end)) return null;
  const ms = end - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return { d, h, m, s };
}

const DISMISS_KEY = "azdome.flashSale.dismissed";

export default function FlashSaleBar({
  content = DEFAULT_FLASH_SALE,
}: {
  content?: FlashSaleContent;
}) {
  // Avoid SSR / first-paint mismatch — only show after mount once the
  // localStorage + countdown values are settled.
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (content.dismissible) {
      try {
        const v = localStorage.getItem(DISMISS_KEY);
        // Tie the dismissal to the endsAt timestamp so a new sale resurrects
        // the bar even for users who closed the previous one.
        if (v && v === (content.endsAt ?? "")) setDismissed(true);
      } catch {
        /* localStorage blocked — show anyway */
      }
    }
  }, [content.dismissible, content.endsAt]);

  useEffect(() => {
    if (!content.endsAt) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [content.endsAt]);

  if (!mounted) return null;
  if (!content.active) return null;
  if (dismissed) return null;

  const countdown = content.endsAt ? diff(content.endsAt) : null;
  // If endsAt was provided but is in the past, the sale is over.
  if (content.endsAt && !countdown) return null;

  const onDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, content.endsAt ?? "");
    } catch {
      /* ignored */
    }
  };

  return (
    <div className="relative z-30 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2.5 text-xs font-semibold tracking-tight sm:px-6 md:text-[13px]">
        {content.text && (
          <span className="tracking-tight">{content.text}</span>
        )}
        {countdown && (
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Unit n={countdown.d} l="D" />
            <Unit n={countdown.h} l="H" />
            <Unit n={countdown.m} l="M" />
            <Unit n={countdown.s} l="S" />
          </span>
        )}
        {content.cta && content.href && (
          <Link
            href={content.href}
            className="inline-flex items-center gap-0.5 rounded-full bg-white/15 px-3 py-0.5 font-semibold tracking-tight backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            {content.cta}
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      {content.dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function Unit({ n, l }: { n: number; l: string }) {
  return (
    <span className="inline-flex items-baseline gap-0.5 rounded bg-white/15 px-1.5 py-0.5">
      <span>{String(n).padStart(2, "0")}</span>
      <span className="text-[9px] uppercase opacity-70">{l}</span>
    </span>
  );
}
