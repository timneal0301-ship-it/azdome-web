"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, Menu, Search, ShoppingBag } from "lucide-react";

import { useCart } from "./CartProvider";
import { useLocale } from "./LocaleProvider";
import AccountBadge from "./AccountBadge";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import Logo from "./ui/Logo";

type NavKey = "dashCams" | "accessories" | "app" | "support" | "about" | "whereToBuy";
type NavLink = {
  key: NavKey;
  href: string;
  hasMega?: boolean;
  /** Override for keys that aren't in the translation dictionary. */
  label?: string;
};

const NAV_LINKS: NavLink[] = [
  { key: "dashCams", href: "/collections/dash-cams", hasMega: true },
  { key: "accessories", href: "/collections/accessories" },
  { key: "whereToBuy", href: "/where-to-buy" },
  { key: "app", href: "/app" },
  { key: "support", href: "/support" },
  { key: "about", href: "/about" },
];

// Primary product taxonomy: by camera channel count. Each card maps to an
// auto-derived collection (see COLLECTIONS in lib/products.ts). Mega-menu
// labels are intentionally hard-coded in EN here — i18n keys are still in
// place for the legacy "dual / stealth / screen" trio used by the secondary
// links row below, but the channel-first card grid is the brand structure
// going forward and gets translated as part of the channel rollout.
type ChannelKey = "single" | "dual" | "triple" | "quad";
const CHANNEL_HREFS: Record<ChannelKey, string> = {
  single: "/collections/single-channel",
  dual: "/collections/dual-channel",
  triple: "/collections/three-channel",
  quad: "/collections/four-channel",
};
const CHANNEL_IMAGES: Record<ChannelKey, string> = {
  // Reuse representative product covers until brand sources channel-specific
  // mega imagery. M550 Max stands in for triple-channel; S40 for quad.
  single: "/images/mega/dual-channel.jpg",
  dual: "/images/products/m550-pro/1.jpg",
  triple: "/images/products/m550-max/1.jpg",
  quad: "/images/products/s40/1.jpg",
};
const CHANNEL_LABELS: Record<ChannelKey, { title: string; sub: string }> = {
  single: { title: "1-Channel", sub: "Front-only · entry tier" },
  dual: { title: "2-Channel", sub: "Front + rear · most popular" },
  triple: { title: "3-Channel", sub: "Front + cabin + rear · rideshare" },
  quad: { title: "4-Channel & 360°", sub: "Full surround · fleet" },
};
const CHANNEL_KEYS: ChannelKey[] = ["single", "dual", "triple", "quad"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { count: cartCount, open: openCart } = useCart();
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      // Light theme is active while a [data-hero-dark] element still covers
      // the nav strip at the top of the viewport.
      const hero = document.querySelector<HTMLElement>("[data-hero-dark]");
      // Navbar bottom = announcement (36px) + nav height (64px) = 100px.
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-run when path changes — client-side route transitions don't fire
    // scroll/resize, so we'd otherwise stay stuck on the previous page's theme.
  }, [pathname]);

  // White text on transparent nav only while we're sitting on a dark hero.
  const useLightTheme = overHero && !scrolled;

  // Drop body scroll lock cleanup left from search modal — handled in SearchModal.

  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-9 z-40">
        {/* Animated backdrop layer — opacity tweens smoothly, blur never re-mounts */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-white/80 shadow-sm backdrop-blur-xl"
        />
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 h-px bg-slate-200/70"
        />
        <nav
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10"
          onMouseLeave={scheduleClose}
        >
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-1">
            <IconButton
              aria-label={t.nav.menuLabel}
              light={useLightTheme}
              onClick={() => setMobileOpen(true)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </IconButton>
            <Link
              href="/"
              aria-label="AZDOME"
              className="inline-flex transition-opacity duration-300 hover:opacity-80"
            >
              <Logo
                size={28}
                inverse={useLightTheme}
                color={useLightTheme ? "#ffffff" : "#0066CC"}
                accent={useLightTheme ? "#60a5fa" : "#0066CC"}
              />
            </Link>
          </div>

          {/* Center links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const label =
                link.label ?? (t.nav as Record<string, string>)[link.key] ?? link.key;
              const isActive = activeMega === link.key;
              return (
                <li
                  key={link.key}
                  onMouseEnter={() =>
                    link.hasMega ? openMega(link.key) : scheduleClose()
                  }
                >
                  <Link
                    href={link.href}
                    className={[
                      "group flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300",
                      useLightTheme
                        ? "text-white/85 hover:text-white"
                        : "text-slate-700 hover:text-blue-600",
                    ].join(" ")}
                  >
                    {label}
                    {link.hasMega && (
                      <ChevronDown
                        className={[
                          "h-3.5 w-3.5 transition-transform duration-300",
                          isActive ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right utilities */}
          <div className="flex items-center gap-1">
            <div className="hidden md:block">
              <LanguageSwitcher variant={useLightTheme ? "light" : "dark"} />
            </div>
            <IconButton
              aria-label={t.nav.searchLabel}
              light={useLightTheme}
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </IconButton>
            <Link
              href="/support"
              aria-label={t.nav.supportLabel}
              className={[
                "hidden h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:inline-flex",
                useLightTheme
                  ? "text-white hover:bg-white/15"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              <HelpCircle className="h-5 w-5" />
            </Link>
            <AccountBadge light={useLightTheme} />
            <IconButton
              aria-label={t.nav.cartLabel}
              onClick={openCart}
              light={useLightTheme}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold leading-none text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </IconButton>
          </div>

          {/* Mega menu panel */}
          <AnimatePresence>
            {activeMega === "dashCams" && (
              <motion.div
                key="mega-dashcams"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-full"
                onMouseEnter={() => openMega("dashCams")}
                onMouseLeave={scheduleClose}
              >
                <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
                  <div className="rounded-2xl bg-white/95 p-8 shadow-md ring-1 ring-slate-100 backdrop-blur-xl">
                    <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Shop by Channel
                    </p>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                      {CHANNEL_KEYS.map((key) => {
                        const meta = CHANNEL_LABELS[key];
                        return (
                          <Link
                            key={key}
                            href={CHANNEL_HREFS[key]}
                            className="group block rounded-xl p-3 transition-all duration-300 hover:bg-slate-50"
                          >
                            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                              <Image
                                src={CHANNEL_IMAGES[key]}
                                alt={meta.title}
                                fill
                                sizes="(min-width: 768px) 22vw, 45vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="text-base font-semibold tracking-tight text-slate-900">
                              {meta.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {meta.sub}
                            </p>
                            <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                              {t.megaMenu.explore}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-sm">
                      <Link
                        href="/collections/dash-cams"
                        className="font-medium text-slate-900 hover:text-blue-600"
                      >
                        All Dash Cams
                      </Link>
                      <Link
                        href="/collections/accessories"
                        className="font-medium text-slate-900 hover:text-blue-600"
                      >
                        Accessories
                      </Link>
                      <span className="text-slate-300">·</span>
                      <Link
                        href="/collections/with-screen"
                        className="text-slate-500 hover:text-blue-600"
                      >
                        {t.megaMenu.screenTitle}
                      </Link>
                      <Link
                        href="/collections/stealth"
                        className="text-slate-500 hover:text-blue-600"
                      >
                        {t.megaMenu.stealthTitle}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function IconButton({
  children,
  className = "",
  light = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { light?: boolean }) {
  return (
    <button
      {...props}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
        light
          ? "text-white hover:bg-white/15"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
