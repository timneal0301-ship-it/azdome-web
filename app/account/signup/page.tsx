"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { UserPlus } from "lucide-react";

import { signupAction } from "../actions";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { useLocale } from "@/components/LocaleProvider";

function SubmitButton({ idle, loading }: { idle: string; loading: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700 disabled:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      {pending ? loading : idle}
    </button>
  );
}

export default function SignupPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(signupAction, { error: null });
  const { t } = useLocale();

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
          {t.account.signUpTitle}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{t.account.signUpSub}</p>

        <SocialAuthButtons callbackUrl={searchParams.next ?? "/account"} />

        <div className="space-y-3">
          <input
            name="name"
            required
            placeholder={t.modals.reviewName}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
          <input
            name="email"
            type="email"
            required
            placeholder={t.account.email}
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder={t.account.password}
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
        </div>

        <input type="hidden" name="next" value={searchParams.next ?? "/account"} />

        {state?.error && (
          <p className="mt-3 text-sm text-red-600">{state.error}</p>
        )}

        <SubmitButton idle={t.account.signUp} loading={t.account.signingUp} />

        <p className="mt-5 text-center text-xs text-slate-500">
          {t.account.haveAccount}{" "}
          <Link
            href={`/account/login${
              searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ""
            }`}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {t.account.signIn}
          </Link>
        </p>
      </form>
    </main>
  );
}
