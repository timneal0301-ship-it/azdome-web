"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLocale } from "./LocaleProvider";

export default function AnnouncementBar() {
  const { t } = useLocale();
  const messages = t.announcement;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [messages]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="fixed inset-x-0 top-0 z-30 flex h-9 items-center justify-center overflow-hidden bg-slate-950 text-white">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={`${index}-${messages[index]}`}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 text-center text-xs font-medium tracking-tight text-white/90 md:text-[13px]"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
