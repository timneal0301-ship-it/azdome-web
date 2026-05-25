"use client";

import Link from "@/components/ui/Link";
import Image from "next/image";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/components/CartProvider";

const formatUSD = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CartPage() {
  const { items, subtotal, updateQty, remove } = useCart();
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 9.99;
  const tax = +(subtotal * 0.085).toFixed(2);
  const total = subtotal + shipping + tax;

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
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-slate-900">
                    {formatUSD(subtotal)}
                  </dd>
                </div>
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
