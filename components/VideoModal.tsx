"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

type VideoModalProps = {
  videoId?: string;
  posterSrc?: string;
  caption?: string;
};

export default function VideoModal({
  videoId = "dQw4w9WgXcQ",
  posterSrc = "/images/aplus/video-poster.jpg",
  caption = "See the M550 Pro in action — a 90-second tour.",
}: VideoModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="watch-video" className="scroll-mt-28 bg-white pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Banner trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play product video"
          className="group relative block w-full overflow-hidden rounded-2xl bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="relative aspect-video w-full">
            <Image
              src={posterSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-slate-950/30" />
          </div>

          {/* Glassy play button */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-white/25 md:h-28 md:w-28">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-white/15"
              />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-20 md:w-20">
                <Play className="h-5 w-5 translate-x-0.5 fill-current md:h-7 md:w-7" />
              </span>
            </span>
          </span>

          {/* Caption */}
          {caption && (
            <span className="absolute bottom-6 left-6 right-6 block max-w-2xl text-balance text-left text-xl font-semibold tracking-tight text-white md:bottom-10 md:left-10 md:text-3xl">
              {caption}
            </span>
          )}
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Product video"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Product video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
