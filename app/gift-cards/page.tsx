"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Gift, Mail, ShieldCheck, Sparkles } from "lucide-react";

const PRESET = [25, 50, 100, 200];

const HOW = [
  { icon: Mail, title: "Delivered instantly", body: "Sent via email the moment your order is placed (or scheduled to a future date)." },
  { icon: Sparkles, title: "Apply at checkout", body: "Recipients enter their code on the checkout page. Partial use is supported." },
  { icon: Clock, title: "Never expires", body: "AZDOME gift cards have no expiration date and no inactivity fees." },
  { icon: ShieldCheck, title: "Refundable to the buyer", body: "Unused gift cards are refundable to the original purchaser within 30 days of issue." },
];

const TERMS = [
  "Gift cards are denominated in US dollars and redeemable on azdome.com.",
  "Codes are delivered via email to the recipient address you provide. They can be forwarded; treat them like cash.",
  "Cards never expire and carry no inactivity fees. Partial balances remain on the card until depleted.",
  "Gift cards cannot be combined with promotional discount codes that exclude them. The site will tell you if there's a conflict at checkout.",
  "Gift cards cannot be used to purchase other gift cards.",
  "Lost or stolen cards: we can re-issue if you have the original purchase receipt and the unused balance.",
];

const FAQ = [
  { q: "Can the recipient use the card on accessories or only dash cams?", a: "Anything on azdome.com — dash cameras, accessories, shipping costs, and even applicable taxes." },
  { q: "Can I schedule delivery for a future date?", a: "Yes. Choose a delivery date during checkout and we'll email the recipient on that morning." },
  { q: "Can I include a personal message?", a: "Absolutely. Up to 500 characters. We render it in a clean, brand-consistent design — no clipart or cheesy fonts." },
  { q: "What if the gift recipient doesn't want to use it?", a: "Unused gift cards are refundable to the original purchaser within 30 days. Email gifts@azdome.com." },
  { q: "Does the gift card work internationally?", a: "Yes — anywhere AZDOME ships. Local taxes and shipping for the recipient's country apply at checkout." },
];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Gift Cards
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          The gift that&apos;s always in focus.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
          Digital AZDOME gift cards are delivered instantly via email. Redeem
          at checkout — they never expire.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative flex aspect-[8/5] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-700 to-blue-500 p-8 text-white shadow-lg">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Gift className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                AZDOME Gift Card
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight">
                ${amount}
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-start justify-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                Gift sent.
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                The recipient will get a beautifully formatted email with a
                redemption code.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <p className="mb-2 text-xs font-semibold tracking-tight text-slate-600">
                  Choose amount
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p)}
                      className={[
                        "rounded-full px-5 py-2 text-sm font-semibold tracking-tight transition-all duration-300",
                        amount === p
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                      ].join(" ")}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  Recipient email
                </span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="them@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  Personal message (optional)
                </span>
                <textarea
                  rows={3}
                  placeholder="Hope this gets you on the road safely."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                Send gift · ${amount}
              </button>
            </form>
          )}
        </div>

        {/* How it works */}
        <section className="mt-24">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            How it works.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((h) => (
              <div key={h.title} className="rounded-2xl bg-slate-50 p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                  <h.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{h.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Common questions.
          </h2>
          <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
            {FAQ.map((f) => (
              <div key={f.q} className="px-6 py-6 md:px-8">
                <dt className="text-base font-semibold tracking-tight text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Terms */}
        <section className="mt-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Terms.
          </h2>
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {TERMS.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
