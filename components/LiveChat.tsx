"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";

import { useLocale } from "./LocaleProvider";

type Msg = { from: "agent" | "user"; text: string };

const SCRIPTED: string[] = [
  "Hey 👋 you're chatting with Eli from AZDOME support.",
  "Tell me a bit about the issue — installation, firmware, an order, or something else?",
];

export default function LiveChat({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      return;
    }
    // Stagger the scripted greeting.
    const t1 = setTimeout(
      () => setMessages([{ from: "agent", text: SCRIPTED[0] }]),
      400,
    );
    const t2 = setTimeout(
      () =>
        setMessages((m) => [...m, { from: "agent", text: SCRIPTED[1] }]),
      1400,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "agent",
          text: "Thanks — pulling up your record now. A specialist will jump in within 60 seconds.",
        },
      ]);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[60] w-[calc(100%-3rem)] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-100"
          role="dialog"
          aria-label="Live chat"
        >
          <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                E
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight">Eli · AZDOME</p>
                <p className="text-[11px] text-emerald-300">● Online</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={t.modals.close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex h-80 flex-col gap-2 overflow-y-auto bg-slate-50 px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={[
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-snug",
                  m.from === "agent"
                    ? "self-start bg-white text-slate-700 shadow-sm"
                    : "self-end bg-blue-600 text-white",
                ].join(" ")}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.modals.chatInput}
              className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15"
            />
            <button
              type="submit"
              aria-label={t.modals.chatSend}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
