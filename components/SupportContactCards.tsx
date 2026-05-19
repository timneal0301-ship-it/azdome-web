"use client";

import { useState } from "react";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import LiveChat from "./LiveChat";

export default function SupportContactCards() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
            Live chat
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Mon–Fri, 9:00 AM – 6:00 PM PT. Average response: under 2 minutes.
          </p>
          <button
            onClick={() => setChatOpen(true)}
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
          >
            Start chat
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
            Email support
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Reply within 1 business day, including weekends for urgent issues.
          </p>
          <a
            href="mailto:support@azdome.com"
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
          >
            support@azdome.com
          </a>
        </div>
      </div>
      <LiveChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
