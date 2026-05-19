"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type EmailCaptureProps = {
  placeholder?: string;
  submitLabel?: string;
  successLabel?: string;
  variant?: "light" | "dark";
  className?: string;
  onSubmit?: (email: string) => void;
};

export default function EmailCapture({
  placeholder = "Enter your email",
  submitLabel = "Subscribe",
  successLabel = "Thanks!",
  variant = "dark",
  className = "",
  onSubmit,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const v = email.trim();
        if (!v) return;
        setDone(true);
        onSubmit?.(v);
      }}
      className={[
        "flex w-full max-w-md items-center gap-2 rounded-full p-1.5",
        isDark
          ? "bg-white/5 ring-1 ring-white/10"
          : "bg-slate-50 ring-1 ring-slate-200",
        className,
      ].join(" ")}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        disabled={done}
        className={[
          "flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none",
          isDark
            ? "text-white placeholder:text-slate-500"
            : "text-slate-900 placeholder:text-slate-400",
        ].join(" ")}
      />
      <button
        type="submit"
        disabled={done}
        className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:bg-emerald-600 disabled:opacity-100"
      >
        {done ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            {successLabel}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
