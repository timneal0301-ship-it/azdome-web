"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

type AnimatedCounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Decimals to render (e.g., 1 → "4.8"). */
  decimals?: number;
  /** Optional thousands separator. */
  separator?: boolean;
  durationMs?: number;
  className?: string;
};

/**
 * Counts up from 0 to `to` when the element first scrolls into view.
 * Uses a spring for the "settle" feeling; numbers stay tabular so they
 * don't shift left/right as digits change.
 */
export default function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = false,
  durationMs = 1400,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: durationMs, bounce: 0 });
  const [display, setDisplay] = useState<string>("0");

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
      if (separator && decimals === 0) {
        setDisplay(Number(n).toLocaleString());
      } else {
        setDisplay(n);
      }
    });
    return () => unsub();
  }, [spring, decimals, separator]);

  return (
    <motion.span
      ref={ref}
      className={["inline-flex tabular-nums", className].join(" ")}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
