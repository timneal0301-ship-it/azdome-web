"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

const TOPICS = ["Order issue", "Installation", "Firmware / App", "Warranty", "Press", "Other"];

export default function ContactPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Contact Support
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          We&apos;re here to help.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
          Most installation questions are answered in our{" "}
          <Link href="/support" className="text-blue-600 hover:text-blue-700">
            support center
          </Link>
          . For everything else, reach us below.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 p-10 text-emerald-900">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                Message received.
              </h2>
              <p className="mt-2 text-sm">
                A specialist will reply within 1 business day. Reference:{" "}
                <span className="font-mono">
                  AZ-SUP-{Math.floor(Math.random() * 90000 + 10000)}
                </span>
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
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  Topic
                </span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="Name"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <input
                placeholder="Order number (optional)"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              <textarea
                required
                rows={5}
                placeholder="Describe the issue. Photos can be attached after submission."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                Send message
              </button>
            </form>
          )}

          <aside className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                Live chat
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Mon–Fri, 9 AM – 6 PM PT
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                Email
              </p>
              <a
                href="mailto:support@azdome.com"
                className="mt-1 block text-xs text-blue-600 hover:text-blue-700"
              >
                support@azdome.com
              </a>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Phone className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                Phone
              </p>
              <p className="mt-1 text-xs text-slate-500">+1 (415) 555-0148</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
