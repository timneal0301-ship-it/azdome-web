import Link from "next/link";
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

const ROLES = [
  { title: "Senior Firmware Engineer", team: "Engineering", location: "San Francisco, CA · Hybrid", level: "Senior", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
  { title: "Performance Marketing Manager", team: "Growth", location: "Remote (US)", level: "Senior", type: "Full-time" },
  { title: "Customer Success Lead", team: "Operations", location: "Austin, TX · Hybrid", level: "Lead", type: "Full-time" },
  { title: "Image Sensor Engineer", team: "Hardware", location: "San Jose, CA · On-site", level: "Senior", type: "Full-time" },
  { title: "Mobile Engineer (iOS / Android)", team: "Engineering", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
  { title: "Mechanical Engineer (Optical Housings)", team: "Hardware", location: "Shenzhen, CN · On-site", level: "Senior", type: "Full-time" },
  { title: "Content & Brand Storyteller", team: "Marketing", location: "Remote (US)", level: "Mid", type: "Full-time" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Quiet engineering",
    body:
      "We obsess over the details users don't see. The team writes for clarity, ships small, and tests the corner cases first.",
  },
  {
    icon: Users,
    title: "Honest collaboration",
    body:
      "We critique work, not people. We disagree in the open, commit fully once a decision is made, and don't relitigate over Slack.",
  },
  {
    icon: BookOpen,
    title: "Bias toward writing",
    body:
      "Important decisions get a short doc. We default to async. Meetings exist when written communication has genuinely failed.",
  },
];

const BENEFITS = [
  { icon: HeartPulse, title: "Comprehensive health", body: "100% of medical, dental, vision premiums covered for you; 75% for dependents." },
  { icon: PiggyBank,  title: "401(k) with 4% match", body: "Vest immediately. We also contribute 2% regardless of your contribution." },
  { icon: Plane,      title: "Unlimited PTO (with a floor)", body: "Take what you need — minimum 18 days/year enforced by the team lead." },
  { icon: Wifi,       title: "Remote-first stipend", body: "$2,000 home office setup, $80/mo internet, co-working credits." },
  { icon: BookOpen,   title: "Learning budget", body: "$2,500/year for books, courses, and conferences. No approvals — book it." },
  { icon: Sparkles,   title: "Sabbatical at 4 years", body: "4 paid weeks off after every 4 years of service. Don't open Slack." },
];

const PROCESS = [
  { n: 1, title: "Apply", body: "We read every application. Most get a response within 5 business days." },
  { n: 2, title: "30-min intro", body: "A casual call with the hiring manager to learn about you and the role." },
  { n: 3, title: "Take-home or live exercise", body: "We respect your time — exercises are scoped to 2–3 hours and are paid for senior roles." },
  { n: 4, title: "Team conversations", body: "Two or three 45-minute conversations with future teammates and cross-functional partners." },
  { n: 5, title: "Decision within a week", body: "We don't ghost. You'll get a yes, a no, or a clear timeline." },
];

export const metadata = { title: "Careers — AZDOME" };

export default function CareersPage() {
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
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            ))}
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
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.body}</p>
              </div>
            ))}
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
