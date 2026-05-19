import Link from "next/link";
import { Box, LogIn, Package } from "lucide-react";

const SAMPLE_ORDERS = [
  {
    id: "AZ-48217",
    status: "Delivered",
    statusColor: "text-emerald-600",
    date: "Apr 02, 2026",
    items: "1× M550 Pro · 64GB bundle",
    total: "$149.98",
    tracking: "1Z999AA1012345678",
  },
  {
    id: "AZ-47012",
    status: "In transit",
    statusColor: "text-blue-600",
    date: "Mar 28, 2026",
    items: "1× Hardwire Kit",
    total: "$19.99",
    tracking: "1Z999AA1098765432",
  },
];

export const metadata = {
  title: "Track Order — AZDOME",
};

export default function OrdersPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Your account
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Order history
        </h1>

        <div className="mt-12 rounded-2xl bg-slate-50 p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
              <LogIn className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Sign in to see all your orders
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Showing demo orders. Sign in or sign up below.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <Link
                href="#"
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
              >
                Sign in
              </Link>
              <Link
                href="#"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          {SAMPLE_ORDERS.map((o) => (
            <li
              key={o.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Order #{o.id}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{o.date}</p>
                </div>
                <p className={`text-sm font-semibold tracking-tight ${o.statusColor}`}>
                  {o.status}
                </p>
              </div>
              <div className="mt-4 flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                  <Package className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-base font-semibold tracking-tight text-slate-900">
                    {o.items}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Tracking:{" "}
                    <span className="font-mono text-slate-700">{o.tracking}</span>
                  </p>
                </div>
                <p className="text-base font-semibold tabular-nums text-slate-900">
                  {o.total}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="#"
                  className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-200"
                >
                  View details
                </Link>
                <Link
                  href="/support/contact"
                  className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-200"
                >
                  Get help with this order
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
