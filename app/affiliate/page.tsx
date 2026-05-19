import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  DollarSign,
  LineChart,
  Megaphone,
  Users,
} from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";

const STATS = [
  { icon: DollarSign, value: "10–18%", label: "Tiered commission" },
  { icon: Users, value: "60 days", label: "Cookie window" },
  { icon: LineChart, value: "$190", label: "Average order value" },
  { icon: CalendarClock, value: "Net-30", label: "Payout schedule" },
];

const TIERS = [
  {
    name: "Starter",
    rate: "10%",
    threshold: "All approved creators",
    perks: [
      "10% commission on every approved sale",
      "60-day cookie window",
      "Monthly performance dashboard",
      "Standard creative assets (banners, product photos, video clips)",
    ],
  },
  {
    name: "Pro",
    rate: "14%",
    threshold: "$5,000 in attributed sales in a rolling 90 days",
    perks: [
      "Everything in Starter, plus:",
      "Dedicated affiliate manager",
      "Custom discount code (5% off for your audience)",
      "Early access to new product launches",
      "Free product seeding for review content",
    ],
  },
  {
    name: "Partner",
    rate: "18%",
    threshold: "By invitation only",
    perks: [
      "Everything in Pro, plus:",
      "Custom landing pages with your branding",
      "Co-branded content collaboration budget",
      "Early-access product samples and pre-launch firmware",
      "Quarterly business reviews and roadmap previews",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    n: 1,
    icon: BadgeCheck,
    title: "Apply",
    body: "Submit the short form below. We review every application personally — usually within 2 business days.",
  },
  {
    n: 2,
    icon: Megaphone,
    title: "Promote",
    body: "Use your unique link or discount code in YouTube videos, blog posts, newsletters, or rideshare community groups.",
  },
  {
    n: 3,
    icon: LineChart,
    title: "Track",
    body: "Watch clicks, conversions, and earnings in your real-time dashboard. We attribute on a 60-day cookie + last-click model.",
  },
  {
    n: 4,
    icon: DollarSign,
    title: "Get paid",
    body: "Net-30 payouts via PayPal, Wise, or ACH. Minimum payout threshold: $50.",
  },
];

const FAQ = [
  {
    q: "What can I promote?",
    a: "Anything sold on azdome.com — dash cameras, accessories, and gift cards. Promotions of refurbished units and current sales are all eligible.",
  },
  {
    q: "How is commission calculated?",
    a: "Commission is paid on the final order subtotal after any discounts and before shipping and tax. Returns within 30 days are deducted from the next payout.",
  },
  {
    q: "Can I run paid ads on AZDOME brand keywords?",
    a: "No — bidding on AZDOME brand terms or trademarked variants is prohibited and will result in disqualification. Non-brand keyword campaigns are welcomed and supported.",
  },
  {
    q: "Do I need a minimum audience size?",
    a: "There is no hard minimum. We accept creators with engaged audiences in automotive, rideshare, family travel, EV ownership, and adjacent verticals. The Partner tier is invitation-only based on track record, not audience size.",
  },
  {
    q: "Are there geographic restrictions?",
    a: "Commissions apply to orders shipping to the US, Canada, UK, and EU. Other regions are coming as we expand inventory.",
  },
  {
    q: "When do I get paid?",
    a: "Commissions earned in a calendar month are payable on the 1st of the following month, net 30 days to account for returns. PayPal, Wise, and ACH are all supported.",
  },
];

export const metadata = { title: "Affiliate Program — AZDOME" };

export default function AffiliatePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-center md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            Affiliate Program
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Earn while you recommend.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Creators, automotive writers, fleet consultants, and rideshare
            community leaders — earn commission on every order you refer. Apply
            in two minutes; most decisions in under 48 hours.
          </p>
          <Link
            href="#apply"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
          >
            Apply now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 px-6 md:grid-cols-4 lg:px-10">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-50 p-7 text-center shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              Commission tiers
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Earn more as you grow with us.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TIERS.map((t, i) => {
              const highlight = i === 1;
              return (
                <div
                  key={t.name}
                  className={[
                    "rounded-2xl p-8 shadow-sm transition-shadow duration-300",
                    highlight
                      ? "bg-slate-900 text-white shadow-md ring-2 ring-blue-600"
                      : "bg-white text-slate-900 hover:shadow-md",
                  ].join(" ")}
                >
                  <p className={["text-xs font-semibold uppercase tracking-[0.18em]", highlight ? "text-blue-400" : "text-blue-600"].join(" ")}>
                    {t.name}
                  </p>
                  <p className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{t.rate}</p>
                  <p className={["mt-1 text-xs", highlight ? "text-slate-400" : "text-slate-500"].join(" ")}>
                    {t.threshold}
                  </p>
                  <ul className={["mt-6 space-y-2 text-sm", highlight ? "text-slate-200" : "text-slate-600"].join(" ")}>
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className={["mt-1.5 h-1 w-1 flex-shrink-0 rounded-full", highlight ? "bg-blue-400" : "bg-blue-600"].join(" ")} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              How it works
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              From apply to paid in under 30 days.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.title} className="rounded-2xl bg-slate-50 p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Step {s.n}
                </p>
                <h3 className="mt-1 text-base font-semibold tracking-tight text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-28 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Apply
          </h2>
          <p className="mt-3 text-base text-slate-500">
            We review every application personally — typically within 2 business days.
          </p>
          <form className="mt-8 space-y-5">
            <Input placeholder="Your name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Audience / channel URL" />
            <Input placeholder="Estimated monthly traffic" />
            <textarea
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              placeholder="Tell us about your audience and how you'd promote AZDOME"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              Submit application
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion faqs={FAQ} title="Frequently asked." eyebrow="FAQ" />
    </main>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
    />
  );
}
