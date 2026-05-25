"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";

type Group = {
  label: string;
  links: { label: string; href: string }[];
};

const GROUPS: Group[] = [
  {
    label: "Dash Cams",
    links: [
      { label: "1-Channel", href: "/collections/single-channel" },
      { label: "2-Channel · Front + Rear", href: "/collections/dual-channel" },
      { label: "3-Channel · Rideshare", href: "/collections/three-channel" },
      { label: "4-Channel · 360°", href: "/collections/four-channel" },
      { label: "All Dash Cams", href: "/collections/dash-cams" },
      { label: "Buying Guide", href: "/buying-guide" },
    ],
  },
  {
    label: "By Feature",
    links: [
      { label: "With Touchscreen", href: "/collections/with-screen" },
      { label: "Stealth Mount", href: "/collections/stealth" },
    ],
  },
  {
    label: "Accessories",
    links: [
      { label: "SD Cards", href: "/collections/sd-cards" },
      { label: "Hardwire Kits", href: "/collections/hardwire" },
      { label: "Mounts", href: "/collections/mounts" },
    ],
  },
];

const FLAT_LINKS = [
  { label: "App", href: "/app" },
  { label: "Support", href: "/support" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(GROUPS[0].label);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-label="Mobile menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                AZDOME
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-8">
              <ul className="space-y-1">
                {GROUPS.map((group) => {
                  const open = openGroup === group.label;
                  return (
                    <li key={group.label} className="rounded-xl">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenGroup(open ? null : group.label)
                        }
                        aria-expanded={open}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-semibold tracking-tight text-slate-900 transition-colors duration-300 hover:bg-slate-50"
                      >
                        {group.label}
                        <ChevronDown
                          className={[
                            "h-4 w-4 text-slate-400 transition-transform duration-300",
                            open ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.ul
                            key="sub"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2 pl-4">
                              {group.links.map((l) => (
                                <Link
                                  key={l.label}
                                  href={l.href}
                                  onClick={onClose}
                                  className="block rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors duration-300 hover:bg-slate-50 hover:text-slate-900"
                                >
                                  {l.label}
                                </Link>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}

                {FLAT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="block rounded-xl px-4 py-3 text-base font-semibold tracking-tight text-slate-900 transition-colors duration-300 hover:bg-slate-50"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Language
                </span>
                <LanguageSwitcher align="right" />
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Need help?
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Chat with our team 9–6 PT, Mon–Fri.
                </p>
                <Link
                  href="/support/contact"
                  onClick={onClose}
                  className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Contact Support
                </Link>
              </div>
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
