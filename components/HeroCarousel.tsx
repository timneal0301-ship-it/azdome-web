"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Pause,
  Play,
} from "lucide-react";

import { useAssetUrl, useAssetUrls } from "./AssetUrlsProvider";

/** Given a desktop image path like "/images/banners/hero-1.jpg", returns
 * the conventional mobile-variant path "/images/banners/hero-1-mobile.jpg"
 * so we can auto-pick up admin uploads to the *-mobile slot without
 * forcing the admin to also set slide.mobileImage. Pure path
 * transformation — does not check existence. */
function deriveMobilePath(desktopPath: string): string {
  if (!desktopPath || !desktopPath.startsWith("/")) return "";
  return desktopPath.replace(/\.(jpg|jpeg|png|webp)$/i, "-mobile.$1");
}

export type SlideLayout = "centered" | "split-left" | "split-right" | "video";

export type SlidePricing = {
  price?: string;
  strike?: string;
  note?: string;
};

export type Slide = {
  id: string;
  /** Layout variant — defaults to "centered". */
  layout?: SlideLayout;
  eyebrow?: string;
  titleA: string;
  titleB?: string;
  subtitle?: string;
  /** Background image — used for all layouts except "video". */
  image: string;
  /** Mobile-only override. When present, swapped in below the md
   * breakpoint so portrait phones don't crop the landscape desktop
   * image awkwardly. Leave empty to reuse `image`. */
  mobileImage?: string;
  /** Background video — used only when layout === "video". MP4 / WebM. */
  videoSrc?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Tone controls text colors & whether a dark gradient overlay is shown. */
  tone?: "dark" | "light";
  /** Eyebrow dot color (any CSS color). Defaults to blue-400. */
  accentColor?: string;
  /** Dark gradient overlay opacity 0–100. Higher = more readable text on
   * complex hero images. Default 70. */
  gradientStrength?: number;
  /** Direction of the dark overlay (only applied when tone === "dark"). */
  gradientDirection?: "bottom" | "left" | "radial";
  /** Small chips shown below the subtitle (eg "★ 12K+ reviews"). */
  badges?: string[];
  /** Optional price tag rendered next to the primary CTA. */
  pricing?: SlidePricing;
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
  const [swipeHintSeen, setSwipeHintSeen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (paused || intervalMs === 0 || slides.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, intervalMs, slides.length]);

  if (slides.length === 0) return null;

  const go = (next: number) => {
    setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
    setSwipeHintSeen(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    setPaused(false);
    if (!start || slides.length <= 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  const slide = slides[index];
  const tone = slide.tone || "dark";
  const isDark = tone === "dark";
  const layout: SlideLayout = slide.layout || "centered";

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
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <SlideLayer
          key={slide.id}
          slide={slide}
          direction={direction}
          isDark={isDark}
          layout={layout}
        />
      </AnimatePresence>

      {/* Controls overlay */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto flex h-full max-w-7xl items-end justify-between px-6 pb-14 lg:px-10 lg:pb-20">
          {/* Dot indicators + play/pause */}
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
                    isDark
                      ? "bg-white/30 hover:bg-white/60"
                      : "bg-slate-400/40 hover:bg-slate-600",
                    active ? "w-12 !bg-white" : "w-6",
                    !isDark && active ? "!bg-slate-900" : "",
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
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              {paused ? (
                <Play className="h-3 w-3 fill-current" />
              ) : (
                <Pause className="h-3 w-3 fill-current" />
              )}
            </button>
          </div>

          {/* Prev / next */}
          <div className="pointer-events-auto hidden items-center gap-2 md:flex">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300",
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-slate-900/10 text-slate-900 hover:bg-slate-900/20",
              ].join(" ")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint (desktop) + swipe hint (mobile, first visit only) */}
      <ScrollHint isDark={isDark} />
      {!swipeHintSeen && slides.length > 1 && (
        <SwipeHint isDark={isDark} />
      )}

      {/* Auto-advance progress bar */}
      {intervalMs > 0 && slides.length > 1 && (
        <ProgressBar
          key={`${index}-${paused ? "pause" : "play"}`}
          durationMs={intervalMs}
          paused={paused}
          isDark={isDark}
        />
      )}
    </section>
  );
}

// ─── Slide rendering ────────────────────────────────────────────────

function SlideLayer({
  slide,
  direction,
  isDark,
  layout,
}: {
  slide: Slide;
  direction: 1 | -1;
  isDark: boolean;
  layout: SlideLayout;
}) {
  // Resolve all candidate image URLs in one provider read.
  const derivedMobilePath = deriveMobilePath(slide.image);
  const [imageSrc, derivedMobileResolved, explicitMobileResolved, videoSrc] =
    useAssetUrls([
      slide.image,
      derivedMobilePath,
      slide.mobileImage || "",
      slide.videoSrc || "",
    ]);
  // Three-step fallback for the mobile crop:
  //   1. slide.mobileImage explicitly set in /admin/content → use it.
  //   2. admin uploaded to the conventional *-mobile slot (eg
  //      banner-1-mobile) → derivedMobileResolved differs from the path,
  //      meaning the AssetUrlMap has an override for it.
  //   3. nothing uploaded → reuse the desktop image so there's no broken
  //      image on mobile.
  const mobileImageSrc = slide.mobileImage
    ? explicitMobileResolved
    : derivedMobilePath && derivedMobileResolved !== derivedMobilePath
    ? derivedMobileResolved
    : imageSrc;

  // Common framer-motion enter/exit.
  const animProps = {
    initial: { opacity: 0, x: direction * 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction * -40 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    className: "absolute inset-0",
  };

  if (layout === "split-left" || layout === "split-right") {
    const imageOnLeft = layout === "split-left";
    return (
      <motion.div {...animProps}>
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          {/* Image half (top on mobile, side on desktop) */}
          <div
            className={[
              "relative h-[40vh] lg:h-auto",
              imageOnLeft ? "lg:order-1" : "lg:order-2",
            ].join(" ")}
          >
            <ResponsiveHeroImage
              desktopSrc={imageSrc}
              mobileSrc={mobileImageSrc}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <GradientOverlay slide={slide} isDark={isDark} containerized />
          </div>
          {/* Text half */}
          <div
            className={[
              "relative flex items-center bg-inherit",
              imageOnLeft ? "lg:order-2" : "lg:order-1",
            ].join(" ")}
          >
            <SlideCopy slide={slide} isDark={isDark} variant="split" />
          </div>
        </div>
      </motion.div>
    );
  }

  // centered + video share the same overlay structure.
  return (
    <motion.div {...animProps}>
      {layout === "video" && slide.videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster={imageSrc}
        />
      ) : (
        <ResponsiveHeroImage
          desktopSrc={imageSrc}
          mobileSrc={mobileImageSrc}
          sizes="100vw"
        />
      )}
      <GradientOverlay slide={slide} isDark={isDark} />
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-5xl items-center justify-center px-6 pt-32 lg:px-10">
        <SlideCopy slide={slide} isDark={isDark} variant="centered" />
      </div>
    </motion.div>
  );
}

/** Renders two stacked Next/Image elements — one optimized for mobile,
 * one for desktop — toggled via CSS at the md breakpoint. Both URLs go
 * through useAssetUrl so admin uploads override the static seeds. */
function ResponsiveHeroImage({
  desktopSrc,
  mobileSrc,
  sizes,
}: {
  desktopSrc: string;
  mobileSrc: string;
  sizes: string;
}) {
  // When the two URLs are identical (no mobile override) just render one
  // image so the browser doesn't double-fetch.
  if (mobileSrc === desktopSrc) {
    return (
      <Image
        src={desktopSrc}
        alt=""
        fill
        sizes={sizes}
        priority
        className="object-cover"
      />
    );
  }
  return (
    <>
      <Image
        src={mobileSrc}
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover md:hidden"
      />
      <Image
        src={desktopSrc}
        alt=""
        fill
        sizes={sizes}
        priority
        className="hidden object-cover md:block"
      />
    </>
  );
}

// Gradient overlay (only for dark tone). Direction + strength configurable.
function GradientOverlay({
  slide,
  isDark,
  containerized,
}: {
  slide: Slide;
  isDark: boolean;
  /** When true, the radial vignette is scoped to the image half (split layouts). */
  containerized?: boolean;
}) {
  if (!isDark) return null;
  const strength = Math.min(100, Math.max(0, slide.gradientStrength ?? 70)) / 100;
  const dir = slide.gradientDirection || "bottom";
  // Map direction to a CSS gradient.
  let bg: string;
  if (dir === "left") {
    bg = `linear-gradient(to right, rgba(2,6,23,${strength + 0.1}) 0%, rgba(2,6,23,${strength * 0.4}) 60%, transparent 100%)`;
  } else if (dir === "radial") {
    bg = `radial-gradient(ellipse at center, transparent 0%, rgba(2,6,23,${strength}) 100%)`;
  } else {
    bg = `linear-gradient(to bottom, rgba(2,6,23,${strength * 0.85}) 0%, rgba(2,6,23,${strength * 0.4}) 45%, rgba(2,6,23,${strength + 0.1}) 100%)`;
  }
  return (
    <>
      <div aria-hidden className="absolute inset-0" style={{ background: bg }} />
      {!containerized && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.5)_100%)]"
        />
      )}
    </>
  );
}

function SlideCopy({
  slide,
  isDark,
  variant,
}: {
  slide: Slide;
  isDark: boolean;
  variant: "centered" | "split";
}) {
  const accent = slide.accentColor || "#60a5fa"; // blue-400
  const isCentered = variant === "centered";

  return (
    <div
      className={[
        "max-w-3xl",
        isCentered ? "text-center" : "px-6 py-16 sm:py-20 lg:px-12 lg:py-0",
      ].join(" ")}
    >
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
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
          {slide.eyebrow}
        </motion.span>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "text-balance font-bold leading-[1.05] tracking-tight",
          isCentered
            ? "text-5xl md:text-6xl lg:text-7xl"
            : "text-4xl md:text-5xl lg:text-6xl",
        ].join(" ")}
      >
        {slide.titleA}
        {slide.titleB && (
          <>
            <br className="hidden sm:block" />{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${
                  isDark ? "#ffffff" : "#0f172a"
                }, ${accent})`,
                WebkitBackgroundClip: "text",
              }}
            >
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
            "mt-6 text-base leading-relaxed md:text-lg",
            isCentered ? "max-w-2xl mx-auto" : "max-w-xl",
            isDark ? "text-slate-300" : "text-slate-600",
          ].join(" ")}
        >
          {slide.subtitle}
        </motion.p>
      )}

      {slide.badges && slide.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "mt-6 flex flex-wrap gap-2",
            isCentered ? "justify-center" : "",
          ].join(" ")}
        >
          {slide.badges.map((b, i) => (
            <span
              key={i}
              className={[
                "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-tight backdrop-blur-sm",
                isDark
                  ? "bg-white/10 text-white/90 ring-1 ring-white/15"
                  : "bg-slate-900/5 text-slate-700 ring-1 ring-slate-900/10",
              ].join(" ")}
            >
              {b}
            </span>
          ))}
        </motion.div>
      )}

      {(slide.primary || slide.secondary || slide.pricing) && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={[
            "mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5",
            isCentered ? "items-center justify-center" : "items-start",
          ].join(" ")}
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
          {slide.pricing && (slide.pricing.price || slide.pricing.note) && (
            <div
              className={[
                "rounded-2xl px-4 py-2 backdrop-blur-sm",
                isDark
                  ? "bg-white/10 text-white"
                  : "bg-slate-900/5 text-slate-900",
              ].join(" ")}
            >
              {slide.pricing.price && (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight tabular-nums">
                    {slide.pricing.price}
                  </span>
                  {slide.pricing.strike && (
                    <span
                      className={[
                        "text-xs line-through tabular-nums",
                        isDark ? "text-white/50" : "text-slate-400",
                      ].join(" ")}
                    >
                      {slide.pricing.strike}
                    </span>
                  )}
                </div>
              )}
              {slide.pricing.note && (
                <p
                  className={[
                    "text-[10px] font-semibold uppercase tracking-[0.14em]",
                    isDark ? "text-white/60" : "text-slate-500",
                  ].join(" ")}
                >
                  {slide.pricing.note}
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── Indicators ─────────────────────────────────────────────────────

function ProgressBar({
  durationMs,
  paused,
  isDark,
}: {
  durationMs: number;
  paused: boolean;
  isDark: boolean;
}) {
  return (
    <div
      className={[
        "pointer-events-none absolute inset-x-0 bottom-0 h-1",
        isDark ? "bg-white/5" : "bg-slate-900/5",
      ].join(" ")}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: paused ? undefined : "100%" }}
        transition={{ duration: durationMs / 1000, ease: "linear" }}
        className={[
          "h-full",
          isDark ? "bg-white/60" : "bg-slate-900/60",
        ].join(" ")}
      />
    </div>
  );
}

function ScrollHint({ isDark }: { isDark: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center md:flex">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm",
          isDark ? "bg-white/10 text-white/70" : "bg-slate-900/5 text-slate-500",
        ].join(" ")}
      >
        Scroll
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3 w-3" />
        </motion.span>
      </motion.div>
    </div>
  );
}

function SwipeHint({ isDark }: { isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center md:hidden"
    >
      <motion.div
        animate={{ x: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm",
          isDark ? "bg-white/10 text-white/80" : "bg-slate-900/10 text-slate-700",
        ].join(" ")}
      >
        <MoveHorizontal className="h-3.5 w-3.5" />
        左右滑动
      </motion.div>
    </motion.div>
  );
}
