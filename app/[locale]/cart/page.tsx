"use client";

import { useState, useTransition } from "react";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { Minus, Plus, ShieldCheck, ShoppingBag, Tag, Trash2 } from "lucide-react";

import {
  promoErrorKey,
  useCart,
  type PromoErrorReason,
} from "@/components/CartProvider";
import { useLocale } from "@/components/LocaleProvider";

const formatUSD = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CartPage() {
  const {
    items,
    subtotal,
    promo,
    discount,
    promoError,
    applyPromo,
    removePromo,
    updateQty,
    remove,
  } = useCart();
  // Apply promo discount BEFORE shipping/tax, mirroring how the cart
  // drawer surfaces it. Tax remains on the subtotal-minus-discount so the
  // user sees the correct sales-tax estimate for what they'll be charged.
  const discountedSubtotal = Math.max(0, subtotal - discount);
  const shipping = discountedSubtotal >= 99 || discountedSubtotal === 0 ? 0 : 9.99;
  const tax = +(discountedSubtotal * 0.085).toFixed(2);
  const total = discountedSubtotal + shipping + tax;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Cart
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Your cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 rounded-2xl bg-slate-50 px-8 py-20 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
              <ShoppingBag className="h-6 w-6" />
            </span>
            <p className="mt-6 text-lg font-semibold tracking-tight text-slate-900">
              Your cart is empty.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Find a dash cam that fits your drive.
            </p>
            <Link
              href="/collections/dash-cams"
              className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
            >
              Shop dash cams
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:gap-6"
                >
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-contain p-2"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/products/${item.productSlug}`}
                          className="text-base font-semibold tracking-tight text-slate-900 hover:text-blue-600 md:text-lg"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="mt-0.5 text-sm text-slate-500">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <p className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                        {formatUSD(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="inline-flex items-center rounded-full bg-slate-50">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-all duration-300 hover:text-slate-900"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-all duration-300 hover:text-slate-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={() => remove(item.id)}
                        className="inline-flex items-center gap-1 text-sm text-slate-500 transition-colors duration-300 hover:text-slate-900"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl bg-slate-50 p-7 shadow-sm">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Order summary
              </h2>
              <div className="mt-5">
                <CartPromoEntry
                  promo={promo}
                  discount={discount}
                  error={promoError}
                  applyPromo={applyPromo}
                  removePromo={removePromo}
                />
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-slate-900">
                    {formatUSD(subtotal)}
                  </dd>
                </div>
                {promo && discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <dt className="inline-flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {promo.code}
                    </dt>
                    <dd className="tabular-nums">−{formatUSD(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <dt>Shipping</dt>
                  <dd className="tabular-nums text-slate-900">
                    {shipping === 0 ? "Free" : formatUSD(shipping)}
                  </dd>
                </div>
                <div className="flex justify-between text-slate-600">
                  <dt>Estimated tax</dt>
                  <dd className="tabular-nums text-slate-900">
                    {formatUSD(tax)}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 text-base">
                <span className="font-semibold tracking-tight text-slate-900">
                  Total
                </span>
                <span className="text-xl font-bold tracking-tight tabular-nums text-slate-900">
                  {formatUSD(total)}
                </span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                <ShieldCheck className="h-4 w-4" />
                Secure Checkout
              </Link>
              <Link
                href="/collections/dash-cams"
                className="mt-3 block text-center text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-900"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function CartPromoEntry({
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
  const { t } = useLocale();
  const promoT = t.cart.promo;

  const onApply = () => {
    if (!input.trim()) return;
    startTransition(async () => {
      const r = await applyPromo(input);
      if (r.ok) setInput("");
    });
  };

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
          {discount > 0 && (
            <span className="text-emerald-600">· −${discount.toFixed(2)}</span>
          )}
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
