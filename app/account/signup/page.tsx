"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { UserPlus } from "lucide-react";

import { signupAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700 disabled:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      {pending ? "Creating…" : "Create account"}
    </button>
  );
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(signupAction, { error: null });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 pt-24">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <UserPlus className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Free, 30 seconds. Get $20 off your first order.
        </p>

        <div className="mt-6 space-y-3">
          <input
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password (min 8 chars)"
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
        </div>

        <input type="hidden" name="next" value={searchParams.next ?? "/account"} />

        {state?.error && (
          <p className="mt-3 text-sm text-red-600">{state.error}</p>
        )}

        <SubmitButton />

        <p className="mt-4 text-center text-[11px] text-slate-400">
          By creating an account you agree to our{" "}
          <Link href="/legal/terms" className="underline hover:text-slate-700">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="underline hover:text-slate-700">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="mt-5 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            href={`/account/login${
              searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ""
            }`}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
