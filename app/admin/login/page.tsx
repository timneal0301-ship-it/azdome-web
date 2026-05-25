"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Lock } from "lucide-react";

import { loginAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700 disabled:bg-slate-300"
    >
      {pending ? "验证中…" : "登录"}
    </button>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(loginAction, { error: null });

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          管理员登录
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          输入管理员密码以管理图片资源。
        </p>

        <input
          type="password"
          name="password"
          autoFocus
          required
          placeholder="密码"
          className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
        />
        <input type="hidden" name="next" value={searchParams.next ?? "/admin"} />
        {state?.error && (
          <p className="mt-3 text-sm text-red-600">{state.error}</p>
        )}

        <SubmitButton />

        {process.env.NODE_ENV !== "production" && (
          <p className="mt-6 text-xs text-slate-400">
            开发环境若未设置 <code className="rounded bg-slate-100 px-1.5 py-0.5">ADMIN_PASSWORD</code>，
            默认密码为 <code className="rounded bg-slate-100 px-1.5 py-0.5">admin</code>。
            生产环境必须设置该环境变量（至少 8 位），否则启动报错。
          </p>
        )}
      </form>
    </main>
  );
}
