import Link from "@/components/ui/Link";
import { redirect } from "next/navigation";
import { LogOut, Package, ShieldCheck, User } from "lucide-react";

import { getCurrentUser, logoutAction } from "./actions";

export const dynamic = "force-dynamic";

const CARDS = [
  {
    icon: Package,
    title: "Orders & tracking",
    detail: "View past orders, track shipments, and start returns.",
    href: "/account/orders",
  },
  {
    icon: ShieldCheck,
    title: "Warranty registration",
    detail: "Register your camera for fast-track support.",
    href: "/support/contact",
  },
  {
    icon: User,
    title: "Profile & preferences",
    detail: "Update your name, email, and marketing preferences.",
    href: "/account",
  },
];

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login?next=/account");

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <header className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Your account
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 text-sm text-slate-500">
              Signed in as <span className="font-medium text-slate-700">{user.email}</span>
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold tracking-tight text-slate-700 transition-colors duration-300 hover:bg-slate-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group rounded-2xl bg-slate-50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <c.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                {c.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{c.detail}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
