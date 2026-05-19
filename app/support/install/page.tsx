import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Choose mounting position",
    body:
      "Mount the front camera centered just below the rearview mirror — this gives you the widest, least-obstructed view. For rear cameras, mount near the top of the rear windshield, centered.",
  },
  {
    n: 2,
    title: "Apply 3M adhesive mount",
    body:
      "Clean the glass with the included alcohol wipe, peel the backing off the 3M mount, and press firmly for 30 seconds. Let it cure for 5 minutes before attaching the camera.",
  },
  {
    n: 3,
    title: "Route the power cable",
    body:
      "Use the included trim removal tool to tuck the Type-C cable along the headliner, down the A-pillar, and under the dashboard. For rear cameras, route along the side trim and under floor mats.",
  },
  {
    n: 4,
    title: "Connect & test",
    body:
      "Plug the cable into your 12V port (or hardwire kit). Start your car — the camera should boot in under 3 seconds. Format the SD card from the app on first use.",
  },
];

export const metadata = { title: "Installation Guides — AZDOME Support" };

export default function InstallPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Installation Guide
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Install in under 20 minutes.
        </h1>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          Average install time · 18 minutes
        </p>

        <ol className="mt-14 space-y-10">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-5">
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                {s.n}
              </span>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  {s.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-2xl bg-slate-50 p-7">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Done!
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Need help with parking mode? You&apos;ll want the hardwire kit and a
            slightly longer install. Read the parking mode guide next.
          </p>
          <Link
            href="/support/firmware"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Update firmware before first use
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
