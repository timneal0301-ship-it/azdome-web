"use client";

import Link from "@/components/ui/Link";
import { useFormState, useFormStatus } from "react-dom";
import { LogIn } from "lucide-react";

import { loginAction } from "../actions";
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

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(loginAction, { error: null });
  const { t } = useLocale();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 pt-24">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <LogIn className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          {t.account.signInTitle}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{t.account.signInSub}</p>

        <SocialAuthButtons callbackUrl={searchParams.next ?? "/account"} />

        <div className="space-y-3">
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
            placeholder={t.account.password}
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
          />
        </div>

        <input type="hidden" name="next" value={searchParams.next ?? "/account"} />

        {state?.error && (
          <p className="mt-3 text-sm text-red-600">{state.error}</p>
        )}

        <SubmitButton idle={t.account.signIn} loading={t.account.signingIn} />

        <p className="mt-6 text-center text-xs text-slate-500">
          {t.account.noAccount}{" "}
          <Link
            href={`/account/signup${
              searchParams.next ? `?next=${encodeURIComponent(searchParams.next)}` : ""
            }`}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {t.account.signUp}
          </Link>
        </p>
      </form>
    </main>
  );
}
