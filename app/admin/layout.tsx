import Link from "next/link";
import { Download, ImageIcon, LogOut } from "lucide-react";

import { logoutAction } from "./actions";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "AZDOME Admin" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-6">
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
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              查看前台 ↗
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                退出
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
