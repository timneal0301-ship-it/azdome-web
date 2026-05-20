import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Globe2,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { getContent } from "@/lib/content-server";
import { ABOUT_PAGE } from "@/lib/content/about";

const ICONS: Record<string, LucideIcon> = {
  Eye,
  Sparkles,
  Users,
  Globe2,
  ShieldCheck,
  Microscope,
  Truck,
  Leaf,
};

export const metadata = {
  title: "About — AZDOME",
  description:
    "Premium dash cams engineered in California and built in Shenzhen. Trusted by 200,000+ drivers worldwide.",
};

export default async function AboutPage() {
  const C = await getContent(ABOUT_PAGE);
  const STATS = C.stats;
  const VALUES = C.values;
  const TIMELINE = C.timeline;
  const COMMITMENTS = C.commitments;
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
                About AZDOME
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Cameras for the moments you can&apos;t replay.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                Since 2014, we&apos;ve built dash cams that quietly do their job
                — until the moment you need them. Today, more than 200,000
                drivers across 60+ countries rely on AZDOME on every drive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/collections/dash-cams"
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Shop dash cams
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  Join the team
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
              <Image
                src="/images/about-hero.jpg"
                alt="AZDOME team"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                separator={s.separator}
                className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
              />
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Our story
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            We started because a camera failed when it mattered most.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 md:text-lg">
            <p>
              In 2013, one of our co-founders was rear-ended at a stoplight in
              Shenzhen. The dash cam in his car — a name brand at the time —
              recorded only a smear of light and a blurred license plate. The
              insurance dispute that followed took eleven months.
            </p>
            <p>
              He went back to work the next Monday convinced that the entire
              category was building cameras for spec sheets, not for the
              one-in-ten-thousand drive where the recording would actually be
              needed. AZDOME was founded eight months later by a team of three
              image-sensor engineers and one optics specialist, with a single
              constraint: every product had to perform under conditions a
              spec sheet doesn&apos;t test for — heat, vibration, voltage
              drops, low light, and the long-tail of edge cases that real
              drivers actually encounter.
            </p>
            <p>
              Twelve years later, we&apos;re a team of 84 people across
              Shenzhen, San Francisco, and Dublin, shipping cameras to 60+
              countries. The constraint hasn&apos;t changed.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Timeline
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Twelve years, one constraint.
          </h2>
          <ol className="mt-12 space-y-8">
            {TIMELINE.map((t) => (
              <li key={t.year} className="grid grid-cols-[80px_1fr] gap-6 md:grid-cols-[100px_1fr]">
                <div className="text-2xl font-bold tracking-tight text-blue-600 md:text-3xl">
                  {t.year}
                </div>
                <div className="border-l border-slate-200 pl-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              How we build
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Four principles, every product.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
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
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                  {v.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {v.body}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Our commitments
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Things we won&apos;t cut corners on.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {COMMITMENTS.map((c) => {
              const Icon = ICONS[c.iconName] ?? ShieldCheck;
              return (
              <div key={c.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {c.body}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Questions, press inquiries, or want to partner?
          </h2>
          <p className="mt-4 text-base text-slate-500 md:text-lg">
            We read every message. Average reply time is under one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/support/contact"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              Contact us
            </Link>
            <Link
              href="/press"
              className="inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-200"
            >
              Press inquiries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
