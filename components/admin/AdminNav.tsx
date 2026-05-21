"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Download,
  FileText,
  Home,
  ImageIcon,
  Menu,
  Package,
  X,
} from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "首页", icon: Home, match: (p: string) => p === "/admin" },
  {
    href: "/admin/products",
    label: "产品管理",
    icon: Package,
    match: (p: string) => p.startsWith("/admin/products"),
  },
  {
    href: "/admin/images",
    label: "图片资源",
    icon: ImageIcon,
    match: (p: string) => p.startsWith("/admin/images"),
  },
  {
    href: "/admin/downloads",
    label: "固件 & 手册",
    icon: Download,
    match: (p: string) => p.startsWith("/admin/downloads"),
  },
  {
    href: "/admin/content",
    label: "页面内容",
    icon: FileText,
    match: (p: string) => p.startsWith("/admin/content"),
  },
  {
    href: "/admin/diag",
    label: "诊断",
    icon: Activity,
    match: (p: string) => p.startsWith("/admin/diag"),
  },
];

export default function AdminNav() {
  const pathname = usePathname() || "";
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 sm:flex">
        {ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-tight transition-colors duration-300",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile trigger + sheet */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="打开菜单"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 sm:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm sm:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            className="absolute left-0 top-0 h-full w-72 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold tracking-tight text-slate-900">
                AZDOME Admin
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="关闭菜单"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-8 space-y-1">
              {ITEMS.map((item) => {
                const active = item.match(pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center gap-2.5 rounded-xl px-3 py-3 text-sm font-semibold tracking-tight transition-colors",
                        active
                          ? "bg-slate-900 text-white"
                          : "text-slate-700 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
