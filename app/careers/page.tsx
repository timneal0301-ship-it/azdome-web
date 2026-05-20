import Link from "next/link";
import { getContent } from "@/lib/content-server";
import { CAREERS_PAGE } from "@/lib/content/careers";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  MapPin,
  PiggyBank,
  Plane,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Users,
  BookOpen,
  HeartPulse,
  PiggyBank,
  Plane,
  Wifi,
};

export const metadata = { title: "Careers — AZDOME" };

export default async function CareersPage() {
  const C = await getContent(CAREERS_PAGE);
  const ROLES = C.roles;
  const VALUES = C.values;
  const BENEFITS = C.benefits;
  const PROCESS = C.process;
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Careers
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Help us build cameras drivers can trust.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            We&apos;re a small, intentional team — 84 people across San
            Francisco, Shenzhen, and Dublin. Engineers, designers, and
            operators who care deeply about a product that matters in the
            moments it&apos;s used.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              How we work
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Three things we actually mean.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {VALUES.map((v) => {
              const Icon = ICONS[v.iconName] ?? Sparkles;
              return (
              <div
                key={v.title}
                className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Benefits
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              The basics, done well.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => {
              const Icon = ICONS[b.iconName] ?? HeartPulse;
              return (
              <div key={b.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.body}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Hiring process
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Five steps. About three weeks, end to end.
            </h2>
          </div>
          <ol className="space-y-6">
            {PROCESS.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-2xl bg-slate-50 p-6 shadow-sm md:p-8">
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-base">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
                Open roles
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                We&apos;re hiring across {new Set(ROLES.map((r) => r.team)).size} teams.
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Don&apos;t see your role?{" "}
              <a href="mailto:careers@azdome.com" className="font-medium text-blue-600 hover:text-blue-700">
                careers@azdome.com
              </a>
            </p>
          </div>

          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
            {ROLES.map((r) => (
              <li key={r.title}>
                <Link
                  href="#"
                  className="group flex flex-col gap-3 px-6 py-6 transition-colors duration-300 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-6 md:px-8"
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                      {r.team} · {r.level}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                      {r.title}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {r.location}
                      </span>
                      <span>·</span>
                      <span>{r.type}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-1">
                    View role
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
