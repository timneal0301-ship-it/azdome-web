"use client";

import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";

export default function LogoutButton() {
  return (
    <form
      action={logoutAction}
      onSubmit={(e) => {
        if (!window.confirm("确定要退出后台吗?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-tight text-slate-700 transition-colors hover:bg-slate-200"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">退出</span>
      </button>
    </form>
  );
}
