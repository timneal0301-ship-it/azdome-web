"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = "google" | "facebook" | "apple";

const META: Record<
  Provider,
  { label: string; bg: string; text: string; ring: string; icon: React.ReactNode }
> = {
  google: {
    label: "Continue with Google",
    bg: "bg-white",
    text: "text-slate-900",
    ring: "ring-1 ring-slate-200 hover:bg-slate-50",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.7-5.5 3.7-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.8 0 9.6-4 9.6-9.7 0-.7-.1-1.2-.2-1.7H12z"
        />
        <path fill="#4285F4" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.7-5.5 3.7v3.7c2.9 0 5.3-1 7-2.6 1.7-1.7 2.6-4.1 2.6-7 0-.7-.1-1.2-.2-1.7H12z"/>
        <path fill="#FBBC05" d="M6 14.1l-3 2.3C4.3 19.5 7.8 22 12 22v-3.7c-2 0-3.7-.7-5-1.8L6 14.1z"/>
        <path fill="#34A853" d="M12 18.3v-3.7c-1.6 0-3.1-.5-4-1.3l-1.9 2.9c1.4 1 3.5 2.1 5.9 2.1z"/>
      </svg>
    ),
  },
  facebook: {
    label: "Continue with Facebook",
    bg: "bg-[#1877F2]",
    text: "text-white",
    ring: "hover:bg-[#166fde]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
        <path
          fill="currentColor"
          d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.34V22c4.78-.78 8.44-4.93 8.44-9.94z"
        />
      </svg>
    ),
  },
  apple: {
    label: "Continue with Apple",
    bg: "bg-black",
    text: "text-white",
    ring: "hover:bg-slate-800",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
        <path
          fill="currentColor"
          d="M17.6 12.5c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.3-2.3-1.8-.2-3.5 1.1-4.4 1.1-.9 0-2.4-1.1-3.9-1-2 0-3.8 1.2-4.9 3-2.1 3.6-.5 9 1.5 11.9 1 1.4 2.2 3 3.8 3 1.5-.1 2.1-1 3.9-1s2.4 1 3.9 1c1.6 0 2.6-1.4 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1-.1-3.3-1.2-3.3-5z M14.6 4.2c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.8.9-1.4 2.3-1.2 3.6 1.3.1 2.6-.7 3.4-1.6z"
        />
      </svg>
    ),
  },
};

export default function SocialAuthButtons({
  callbackUrl = "/account",
}: {
  callbackUrl?: string;
}) {
  const [enabled, setEnabled] = useState<Provider[] | null>(null);

  useEffect(() => {
    getProviders()
      .then((p) => {
        if (!p) return setEnabled([]);
        const valid: Provider[] = ["google", "facebook", "apple"];
        setEnabled(Object.keys(p).filter((k): k is Provider =>
          valid.includes(k as Provider),
        ));
      })
      .catch(() => setEnabled([]));
  }, []);

  if (enabled === null) {
    return (
      <div className="mt-6 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-10 animate-pulse rounded-full bg-slate-100" />
        ))}
        <div className="my-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          Or use email
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </div>
    );
  }

  if (enabled.length === 0) {
    return (
      <>
        <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs leading-relaxed text-slate-500">
          Continue with Google / Facebook / Apple will appear here once provider
          credentials are configured (AUTH_GOOGLE_ID etc. in Vercel env).
        </div>
        <div className="my-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          Or use email
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-6 space-y-2">
        {enabled.map((p) => {
          const m = META[p];
          return (
            <button
              key={p}
              type="button"
              onClick={() => signIn(p, { callbackUrl })}
              className={[
                "flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                m.bg,
                m.text,
                m.ring,
              ].join(" ")}
            >
              {m.icon}
              {m.label}
            </button>
          );
        })}
      </div>
      <div className="my-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        Or use email
        <span className="h-px flex-1 bg-slate-200" />
      </div>
    </>
  );
}
