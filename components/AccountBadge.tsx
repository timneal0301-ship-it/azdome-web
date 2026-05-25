"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/ui/Link";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, LogOut, Package, User, UserPlus } from "lucide-react";

type Session = { signedIn: boolean; name?: string; email?: string };

export default function AccountBadge({ light = false }: { light?: boolean }) {
  const [session, setSession] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/account/me", { cache: "no-store" })
      .then((r) => r.json())
      .then(setSession)
      .catch(() => setSession({ signedIn: false }));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!session) return null;

  // ── Signed-out: user icon + dropdown showing Sign In + Create account ─
  if (!session.signedIn) {
    return (
      <div ref={wrap} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Account"
          aria-haspopup="menu"
          aria-expanded={open}
          className={[
            "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
            light
              ? "text-white hover:bg-white/15"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
          ].join(" ")}
        >
          <User className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              role="menu"
              className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-100"
            >
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold tracking-tight text-slate-900">
                  Welcome to AZDOME
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Save addresses · track orders · $20 off your first order.
                </p>
              </div>
              <ul className="p-2">
                <li>
                  <Link
                    href="/account/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold tracking-tight text-white transition-colors duration-200 hover:bg-blue-700"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>
                </li>
                <li className="mt-1.5">
                  <Link
                    href="/account/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold tracking-tight text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <UserPlus className="h-4 w-4 text-slate-400" />
                    Create account
                  </Link>
                </li>
              </ul>
              <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[11px] text-slate-500">
                Already have orders?{" "}
                <Link
                  href="/account/login"
                  onClick={() => setOpen(false)}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign in to track them
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Signed-in: initials avatar + dropdown ──────────────────────────
  const initials =
    (session.name || session.email || "?")
      .split(/[\s@.]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div ref={wrap} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account"
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
          light
            ? "bg-white/15 text-white hover:bg-white/25"
            : "bg-slate-900 text-white hover:bg-slate-800",
        ].join(" ")}
      >
        {initials}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-100"
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                {session.name}
              </p>
              <p className="truncate text-xs text-slate-500">{session.email}</p>
            </div>
            <ul className="py-1">
              <Item href="/account" icon={User} label="Account" onClick={() => setOpen(false)} />
              <Item
                href="/account/orders"
                icon={Package}
                label="Orders"
                onClick={() => setOpen(false)}
              />
            </ul>
            <form action="/api/account/logout" method="post">
              <button
                type="submit"
                className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4 text-slate-400" />
                Sign out
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Item({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
      >
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </Link>
    </li>
  );
}
