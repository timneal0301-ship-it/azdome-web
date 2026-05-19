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

import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  label: string;
}[] = [
  { to: 200, suffix: "K+", label: "Drivers protected", separator: true },
  { to: 60, suffix: "+", label: "Countries shipped" },
  { to: 4.8, decimals: 1, label: "Average rating" },
  { to: 2014, label: "Founded" },
];

const VALUES = [
  {
    icon: Eye,
    title: "Clarity above all",
    body:
      "Every component — image sensor, lens, codec, capacitor — is selected with one question first: will footage hold up at 2 a.m. on a four-lane highway, or in court three months later? We build to that test, not to the spec sheet.",
  },
  {
    icon: Sparkles,
    title: "Quiet engineering",
    body:
      "We obsess over the details you won't see: cable routing, thermal behavior at 65 °C, capacitor longevity past 50,000 power cycles, firmware that recovers cleanly from a 3-microsecond power blip. The result is a camera that just keeps recording.",
  },
  {
    icon: Users,
    title: "Built with drivers",
    body:
      "Our beta program runs with rideshare drivers, fleet managers, parents on long road trips, and a handful of professional racers. Every product ships only after they've put it through what we can't simulate.",
  },
  {
    icon: Globe2,
    title: "Long-term ownership",
    body:
      "We commit to at least five years of free firmware updates on every product we sell. We publish release notes, source our SD cards from manufacturers we've audited, and back our work with a 2-year warranty plus optional accidental-damage cover.",
  },
];

const TIMELINE = [
  {
    year: "2014",
    title: "AZDOME founded in Shenzhen",
    body:
      "Our co-founders, both image-sensor engineers, started AZDOME after a frustrating insurance dispute revealed how few cameras of the era held up to scrutiny.",
  },
  {
    year: "2017",
    title: "First million-unit milestone",
    body:
      "The original M01 reaches one million units shipped. We invest the margin into a dedicated optics lab.",
  },
  {
    year: "2020",
    title: "5GHz Wi-Fi platform launch",
    body:
      "We become one of the first dash-cam manufacturers to ship dual-band Wi-Fi as standard, eliminating the 'pull-the-SD-card' workflow.",
  },
  {
    year: "2022",
    title: "AZDOME Care program",
    body:
      "We extend warranty options and pledge a 5-year firmware update commitment in writing.",
  },
  {
    year: "2024",
    title: "California HQ opens",
    body:
      "We open a Bay Area office to bring product and software work closer to our largest customer base, while keeping hardware in Shenzhen.",
  },
  {
    year: "2026",
    title: "M550 Pro flagship",
    body:
      "Our most advanced platform yet. Sony Starvis 2 sensor, on-device ADAS, and the smallest 4K dual-channel body we've ever made.",
  },
];

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Privacy on-device",
    body:
      "We never automatically upload footage. The camera and SD card are yours; what they record stays with you.",
  },
  {
    icon: Microscope,
    title: "Independent testing",
    body:
      "Every product is tested by TÜV Rheinland for EMC and an independent low-light lab for sensor performance before launch.",
  },
  {
    icon: Truck,
    title: "Responsible shipping",
    body:
      "Carbon-neutral shipping on every US order. Reduced-volume packaging cut shipping CO₂ per unit by 38% in 2025.",
  },
  {
    icon: Leaf,
    title: "Repair over replace",
    body:
      "Out-of-warranty repair is offered for every model. We restock and resell certified-refurbished units at a discount instead of recycling them.",
  },
];

export const metadata = {
  title: "About — AZDOME",
  description:
    "Premium dash cams engineered in California and built in Shenzhen. Trusted by 200,000+ drivers worldwide.",
};

export default function AboutPage() {
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
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                  {v.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {v.body}
                </p>
              </div>
            ))}
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
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {c.body}
                </p>
              </div>
            ))}
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
