import Link from "next/link";
import { ExternalLink, ImageIcon } from "lucide-react";

import AdminNav from "@/components/admin/AdminNav";
import HealthDot from "@/components/admin/HealthDot";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = { title: "AZDOME Admin" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white">
                <ImageIcon className="h-4 w-4" />
              </span>
              <span className="text-sm font-bold tracking-tight text-slate-900">
                AZDOME Admin
              </span>
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <HealthDot />
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">查看前台</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
