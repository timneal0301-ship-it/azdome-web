"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { CheckCircle2, Lock, ShieldCheck } from "lucide-react";

import { useCart } from "@/components/CartProvider";
import PaymentLogos from "@/components/PaymentLogos";

const formatUSD = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 9.99;
  const tax = +(subtotal * 0.085).toFixed(2);
  const total = subtotal + shipping + tax;

  if (submitted) {
    return (
      <main className="bg-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 pt-32 text-center lg:px-10">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Thanks — order placed.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500 md:text-lg">
            You&apos;ll get a confirmation email shortly with tracking info.
            Your order #AZ-{Math.floor(Math.random() * 90000 + 10000)} ships within 1
            business day.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/account/orders"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
            >
              Track my order
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 transition-all duration-300 hover:bg-slate-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          <Lock className="h-3.5 w-3.5" />
          Secure checkout
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Almost there.
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-slate-50 px-8 py-16 text-center">
            <p className="text-base font-semibold tracking-tight text-slate-900">
              Your cart is empty.
            </p>
            <Link
              href="/collections/dash-cams"
              className="mt-5 inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              Shop dash cams
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(() => clear(), 800);
            }}
            className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:gap-14"
          >
            <div className="space-y-10">
              <Section title="Contact">
                <Field name="email" type="email" label="Email" placeholder="you@example.com" required />
              </Section>

              <Section title="Shipping address">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field name="firstName" label="First name" required />
                  <Field name="lastName" label="Last name" required />
                </div>
                <Field name="address" label="Address" required />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field name="city" label="City" required />
                  <Field name="state" label="State / Province" required />
                  <Field name="zip" label="ZIP / Postal" required />
                </div>
              </Section>

              <Section title="Payment">
                <div className="mb-2">
                  <PaymentLogos />
                </div>
                <Field name="card" label="Card number" placeholder="•••• •••• •••• ••••" required />
                <div className="grid grid-cols-2 gap-4">
                  <Field name="expiry" label="Expiry (MM / YY)" placeholder="12 / 28" required />
                  <Field name="cvc" label="CVC" placeholder="123" required />
                </div>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  256-bit SSL · No card details stored on our servers.
                </p>
              </Section>
            </div>

            <aside className="h-fit rounded-2xl bg-slate-50 p-7 shadow-sm">
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Order summary
              </h2>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1.5"
                      />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold tracking-tight text-slate-900">
                        {item.name}
                      </p>
                      {item.variant && (
                        <p className="truncate text-xs text-slate-500">
                          {item.variant}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-slate-900">
                      {formatUSD(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 border-t border-slate-200 pt-5 text-sm">
                <Row label="Subtotal" value={formatUSD(subtotal)} />
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatUSD(shipping)} />
                <Row label="Tax" value={formatUSD(tax)} />
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-slate-200 pt-4">
                <span className="font-semibold tracking-tight text-slate-900">Total</span>
                <span className="text-2xl font-bold tabular-nums text-slate-900">
                  {formatUSD(total)}
                </span>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                Pay {formatUSD(total)}
              </button>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-600">
      <dt>{label}</dt>
      <dd className="tabular-nums text-slate-900">{value}</dd>
    </div>
  );
}
