import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <Image
        src="/images/hero-poster.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.7)_75%)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center lg:px-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
          404 · Off-route
        </span>

        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          This page took a{" "}
          <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            wrong turn.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
          The page you were looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on the road — we even left the headlights on.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <LinkButton href="/" variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </LinkButton>
          <LinkButton href="/collections/dash-cams" variant="outlineLight" size="lg">
            Shop dash cams
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.18em] text-slate-500">
          Need a hand?{" "}
          <Link
            href="/support/contact"
            className="text-slate-300 underline-offset-4 hover:text-white hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </main>
  );
}
