"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

import { useLocale } from "./LocaleProvider";

type HeroProps = {
  videoSrc?: string;
  posterSrc?: string;
};

export default function Hero({
  videoSrc = "/videos/hero-night-drive.mp4",
  posterSrc = "/images/hero-poster.jpg",
}: HeroProps) {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  // Subtle parallax: background drifts up faster than foreground as you scroll
  // out of the section. Foreground content drifts slightly + fades.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      data-hero-dark
      className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white"
    >
      {/* Background video / fallback image — parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 h-[120%]"
        aria-hidden
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      {/* Layered overlays for legibility + cinematic feel */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.65)_100%)]"
      />

      {/* Content — gentle scroll-out animation */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-32 text-center lg:px-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {t.hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          {t.hero.titleA}
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            {t.hero.titleB}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            href="/products/m550-pro"
            className="group inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
          >
            {t.hero.shopCta}
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <a
            href="#watch-video"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-300 group-hover:scale-110">
              <Play className="h-2.5 w-2.5 fill-current" />
            </span>
            {t.hero.watchCta}
          </a>
        </motion.div>

        {/* Tech specs strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8 text-center"
        >
          {[
            { value: "4K", label: t.hero.spec1 },
            { value: "150°", label: t.hero.spec2 },
            { value: "24H", label: t.hero.spec3 },
          ].map((spec) => (
            <div key={spec.label}>
              <div className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {spec.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                {spec.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
