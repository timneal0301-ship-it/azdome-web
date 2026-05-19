"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
  /** Whether to animate on scroll-into-view (default true). */
  animate?: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  className = "",
  animate = true,
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "text-center" : "";
  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "-80px" },
        variants: stagger,
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as object)}
      className={[
        "flex flex-col gap-6",
        action ? "md:flex-row md:items-end md:justify-between" : "",
        className,
      ].join(" ")}
    >
      <div className={["max-w-3xl", alignCls, align === "center" ? "mx-auto" : ""].join(" ")}>
        {eyebrow && (
          <motion.p
            variants={animate ? fadeUp : undefined}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          variants={animate ? fadeUp : undefined}
          className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={animate ? fadeUp : undefined}
            className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {action && (
        <motion.div variants={animate ? fadeUp : undefined}>{action}</motion.div>
      )}
    </Wrapper>
  );
}
