"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { useAssetUrl } from "./AssetUrlsProvider";

export type Slide = {
  id: string;
  eyebrow?: string;
  titleA: string;
  titleB?: string;
  subtitle?: string;
  image: string; // /images/banners/<slide>.jpg
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Optional gradient overlay tweak — defaults to dark cinematic. */
  tone?: "dark" | "light";
  /** Set to true to skip rendering this slide. */
  hidden?: boolean;
};

type Props = {
  slides: Slide[];
  /** Auto-advance interval (ms). 0 = off. */
  intervalMs?: number;
};

export default function HeroCarousel({ slides: rawSlides, intervalMs = 6500 }: Props) {
  const slides = rawSlides.filter((s) => !s.hidden);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  if (slides.length === 0) return null;

  useEffect(() => {
    if (paused || intervalMs === 0 || slides.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, intervalMs, slides.length]);

  const go = (next: number) => {
    setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    setPaused(false);
    if (!start || slides.length <= 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Need a clearly horizontal swipe of at least 40px to count.
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  const slide = slides[index];
  const tone = slide.tone ?? "dark";
  const isDark = tone === "dark";

  return (
    <section
      data-hero-dark={isDark || undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={[
        "relative min-h-[88vh] w-full touch-pan-y overflow-hidden",
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900",
      ].join(" ")}
    >
      {/* Slides */}
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <SlideLayer
          key={slide.id}
          slide={slide}
          direction={direction}
          isDark={isDark}
        />
      </AnimatePresence>

      {/* Controls overlay */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto flex h-full max-w-7xl items-end justify-between px-6 pb-12 lg:px-10 lg:pb-16">
          {/* Dot indicators */}
          <div className="pointer-events-auto flex items-center gap-2">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={[
                    "h-1 rounded-full transition-all duration-500",
                    isDark ? "bg-white/30 hover:bg-white/60" : "bg-slate-300 hover:bg-slate-500",
                    active ? "w-12 !bg-white" : "w-6",
                  ].join(" ")}
                />
              );
            })}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play" : "Pause"}
              className={[
                "ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              {paused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3 fill-current" />}
            </button>
          </div>

          {/* Prev / next */}
          <div className="pointer-events-auto hidden items-center gap-2 md:flex">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideLayer({
  slide,
  direction,
  isDark,
}: {
  slide: Slide;
  direction: 1 | -1;
  isDark: boolean;
}) {
  const src = useAssetUrl(slide.image);
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      {isDark && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/90"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.6)_100%)]"
          />
        </>
      )}

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 pt-32 text-center lg:px-10">
        {slide.eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-sm",
              isDark ? "bg-white/10 text-white/85" : "bg-slate-900/5 text-slate-700",
            ].join(" ")}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            {slide.eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {slide.titleA}
          {slide.titleB && (
            <>
              <br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                {slide.titleB}
              </span>
            </>
          )}
        </motion.h1>

        {slide.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={[
              "mt-6 max-w-2xl text-base leading-relaxed md:text-lg",
              isDark ? "text-slate-300" : "text-slate-600",
            ].join(" ")}
          >
            {slide.subtitle}
          </motion.p>
        )}

        {(slide.primary || slide.secondary) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            {slide.primary && (
              <Link
                href={slide.primary.href}
                className="group inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                {slide.primary.label}
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            )}
            {slide.secondary && (
              <Link
                href={slide.secondary.href}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight backdrop-blur-sm transition-all duration-300",
                  isDark
                    ? "border border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
                    : "border border-slate-300 bg-white/60 text-slate-900 hover:bg-white",
                ].join(" ")}
              >
                {slide.secondary.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
