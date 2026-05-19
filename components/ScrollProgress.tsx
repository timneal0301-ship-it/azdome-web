"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 1-pixel scroll-progress bar pinned just below the navbar.
 * Drop into any long-form page (PDP, legal docs) to give a sense of position.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-[100px] z-40 h-0.5 origin-left bg-blue-600"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
