"use client";

import { motion } from "framer-motion";

type Logo = { name: string; node: React.ReactNode };

// All press marks use fill="currentColor" so the parent's text color (slate-400
// at rest, slate-700 on hover) controls the appearance — the classic eufy
// grayscale press strip.
const LOGOS: Logo[] = [
  {
    name: "The Verge",
    node: (
      <svg viewBox="0 0 140 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <polygon points="3,13 9,3 19,3 25,13 19,23 9,23" fill="currentColor" />
        <text
          x="33"
          y="20"
          fontFamily='-apple-system, "Helvetica Neue", Inter, sans-serif'
          fontWeight={800}
          fontSize={20}
          letterSpacing={-0.5}
          fill="currentColor"
        >
          VERGE
        </text>
      </svg>
    ),
  },
  {
    name: "WIRED",
    node: (
      <svg viewBox="0 0 105 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <text
          x="0"
          y="22"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight={900}
          fontSize={24}
          letterSpacing={1.2}
          fill="currentColor"
        >
          WIRED
        </text>
      </svg>
    ),
  },
  {
    name: "TechCrunch",
    node: (
      <svg viewBox="0 0 165 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <polygon points="2,4 20,4 25,13 20,22 2,22" fill="currentColor" />
        <text
          x="32"
          y="20"
          fontFamily='-apple-system, "Helvetica Neue", Inter, sans-serif'
          fontWeight={800}
          fontSize={19}
          letterSpacing={-0.5}
          fill="currentColor"
        >
          TechCrunch
        </text>
      </svg>
    ),
  },
  {
    name: "CNET",
    node: (
      <svg viewBox="0 0 92 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <text
          x="0"
          y="22"
          fontFamily='"Helvetica Neue", Arial, sans-serif'
          fontWeight={900}
          fontSize={24}
          letterSpacing={-1.3}
          fill="currentColor"
        >
          cnet
        </text>
        <rect x="58" y="6" width="5" height="5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Forbes",
    node: (
      <svg viewBox="0 0 110 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <text
          x="0"
          y="21"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight={800}
          fontSize={22}
          letterSpacing={-0.5}
          fill="currentColor"
        >
          Forbes
        </text>
      </svg>
    ),
  },
  {
    name: "Engadget",
    node: (
      <svg viewBox="0 0 130 26" className="h-5 md:h-6" aria-hidden focusable="false">
        <text
          x="0"
          y="21"
          fontFamily='-apple-system, "Helvetica Neue", Inter, sans-serif'
          fontWeight={800}
          fontSize={21}
          letterSpacing={-1}
          fill="currentColor"
        >
          engadget
        </text>
      </svg>
    ),
  },
];

export default function PressLogos() {
  // Duplicate the logo list so the marquee loops seamlessly.
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section className="border-y border-slate-100 bg-white py-14">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 px-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-400 lg:px-10"
        >
          As featured in
        </motion.p>

        {/* Marquee strip — pauses on hover, gracefully fades at the edges */}
        <div className="group relative overflow-hidden">
          {/* Edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <motion.ul
            className="flex w-max items-center gap-14 will-change-transform group-hover:[animation-play-state:paused] md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {loop.map((l, i) => (
              <li
                key={`${l.name}-${i}`}
                className="flex h-10 flex-shrink-0 items-center text-slate-400 transition-colors duration-300 hover:text-slate-700"
                title={l.name}
                aria-hidden={i >= LOGOS.length}
              >
                <span className="sr-only">{l.name}</span>
                {l.node}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
