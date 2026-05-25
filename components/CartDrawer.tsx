"use client";

import { useEffect } from "react";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { useState, useTransition } from "react";

import { promoErrorKey, useCart, type PromoErrorReason } from "./CartProvider";
import { useLocale } from "./LocaleProvider";
import { PRODUCTS } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 99;

const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    updateQty,
    remove,
    subtotal,
    promo,
    discount,
    total,
    promoError,
    applyPromo,
    removePromo,
  } = useCart();
  const { t } = useLocale();

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualifies = remaining === 0 && subtotal > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                {t.cart.title}
                <span className="ml-2 text-sm font-medium text-slate-400">
                  ({items.length})
                </span>
              </h2>
              <button
                onClick={close}
                aria-label="Close cart"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pb-5">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm tracking-tight text-slate-700">
                  {qualifies ? (
                    <>🎉 {t.cart.unlocked}</>
                  ) : (
                    t.cart.awayFromFree.replace("{amount}", formatUSD(remaining))
                  )}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col">
                  <div className="flex flex-col items-center pb-6 pt-4 text-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                      <ShoppingBag className="h-6 w-6" />
                    </span>
                    <p className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                      {t.cart.empty}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {t.cart.emptyHint}
                    </p>
                    <Link
                      href="/collections/dash-cams"
                      onClick={close}
                      className="mt-5 inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                    >
                      {t.cart.shopCta}
                    </Link>
                  </div>
                  <div className="mt-2 border-t border-slate-100 pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {t.featured.eyebrow}
                    </p>
                    <ul className="space-y-2">
                      {PRODUCTS.filter((p) => p.category === "dash-cam")
                        .slice(0, 3)
                        .map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/products/${p.slug}`}
                              onClick={close}
                              className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-slate-50"
                            >
                              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50">
                                <Image
                                  src={p.image}
                                  alt={p.short}
                                  fill
                                  sizes="48px"
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold tracking-tight text-slate-900">
                                  {p.short}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                  {p.tagline}
                                </p>
                              </div>
                              <span className="text-sm font-semibold tabular-nums text-slate-900">
                                {formatUSD(p.price)}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-5">
                      <Link
                        href={`/products/${item.productSlug}`}
                        onClick={close}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/products/${item.productSlug}`}
                              onClick={close}
                              className="text-sm font-semibold tracking-tight text-slate-900 hover:text-blue-600"
                            >
                              {item.name}
                            </Link>
                            {item.variant && (
                              <p className="mt-0.5 text-xs text-slate-500">
                                {item.variant}
                              </p>
                            )}
                          </div>
                          <p className="text-sm font-semibold tracking-tight text-slate-900">
                            {formatUSD(item.price * item.quantity)}
                          </p>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center rounded-full bg-slate-50">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-all duration-300 hover:text-slate-900"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium tabular-nums text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition-all duration-300 hover:text-slate-900"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            aria-label={`${t.cart.remove} ${item.name}`}
                            onClick={() => remove(item.id)}
                            className="inline-flex items-center gap-1 text-xs text-slate-400 transition-all duration-300 hover:text-slate-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-slate-100 px-6 py-5">
                <PromoEntry
                  promo={promo}
                  discount={discount}
                  error={promoError}
                  applyPromo={applyPromo}
                  removePromo={removePromo}
                />

                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{t.cart.subtotal}</span>
                  <span className="tabular-nums text-slate-700">
                    {formatUSD(subtotal)}
                  </span>
                </div>
                {promo && discount > 0 && (
                  <div className="mt-1 flex items-center justify-between text-sm text-emerald-700">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {promo.code}
                    </span>
                    <span className="tabular-nums">−{formatUSD(discount)}</span>
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-sm">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold tabular-nums tracking-tight text-slate-900">
                    {formatUSD(total)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{t.cart.taxNote}</p>

                <Link
                  href="/checkout"
                  onClick={close}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
                >
                  <ShieldCheck className="h-4 w-4" />
                  {t.cart.checkout}
                </Link>

                <Link
                  href="/cart"
                  onClick={close}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 transition-all duration-300 hover:bg-slate-200"
                >
                  {t.cart.viewFull}
                </Link>

                <button
                  onClick={close}
                  className="mt-3 w-full text-center text-xs font-medium text-slate-500 transition-all duration-300 hover:text-slate-900"
                >
                  {t.cart.continue}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function PromoEntry({
  promo,
  discount,
  error,
  applyPromo,
  removePromo,
}: {
  promo: { code: string; type: "percent" | "amount"; value: number } | null;
  discount: number;
  error: PromoErrorReason | null;
  applyPromo: (
    code: string,
  ) => Promise<{ ok: true } | { ok: false; reason: PromoErrorReason }>;
  removePromo: () => void;
}) {
  const [input, setInput] = useState("");
  const [pending, startTransition] = useTransition();

  const onApply = () => {
    if (!input.trim()) return;
    startTransition(async () => {
      const r = await applyPromo(input);
      if (r.ok) setInput("");
    });
  };

  // Applied state — show the code + remove button.
  const { t } = useLocale();
  const promoT = t.cart.promo;

  if (promo) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800 ring-1 ring-emerald-200">
        <span className="inline-flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5" />
          <span className="font-mono font-bold">{promo.code}</span>
          <span className="text-emerald-600">
            ·{" "}
            {promo.type === "percent"
              ? `${promo.value}% off`
              : `$${promo.value.toFixed(2)} off`}
          </span>
        </span>
        <button
          type="button"
          onClick={removePromo}
          className="text-emerald-700 underline-offset-2 transition-colors hover:text-emerald-900 hover:underline"
        >
          {t.cart.remove}
        </button>
      </div>
    );
  }

  // Entry state — input + apply button.
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") onApply();
          }}
          placeholder={promoT.placeholder}
          aria-label={promoT.placeholder}
          maxLength={32}
          className="block w-full rounded-full border border-slate-200 bg-white px-4 py-2 font-mono text-xs uppercase tabular-nums shadow-inner outline-none transition-colors focus:border-blue-500"
        />
        <button
          type="button"
          onClick={onApply}
          disabled={pending || !input.trim()}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold tracking-tight text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "…" : promoT.apply}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{promoT[promoErrorKey(error)]}</p>
      )}
    </div>
  );
}
