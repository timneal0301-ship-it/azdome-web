"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, FileText, ImageIcon } from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "图片资源", icon: ImageIcon, match: (p: string) => p === "/admin" },
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
];

export default function AdminNav() {
  const pathname = usePathname() || "";
  return (
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
  );
}
