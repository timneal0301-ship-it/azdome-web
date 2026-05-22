"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

import { useLocale } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import PaymentLogos from "./PaymentLogos";
import Logo from "./ui/Logo";
import EmailCapture from "./ui/EmailCapture";

export default function Footer() {
  const { t } = useLocale();

  const COLUMNS = [
    {
      title: t.footer.colShop,
      links: [
        { label: t.footer.allDashCams, href: "/collections/dash-cams" },
        { label: t.footer.m550Pro, href: "/products/m550-pro" },
        { label: t.footer.accessories, href: "/collections/accessories" },
        { label: t.nav.whereToBuy, href: "/where-to-buy" },
        { label: t.footer.refurbished, href: "/collections/refurbished" },
        { label: t.footer.giftCards, href: "/gift-cards" },
      ],
    },
    {
      title: t.footer.colSupport,
      links: [
        { label: t.footer.helpCenter, href: "/support" },
        { label: t.footer.install, href: "/support/install" },
        { label: t.footer.firmware, href: "/support/firmware" },
        { label: t.support.manuals, href: "/support/manuals" },
        { label: t.footer.contactUs, href: "/support/contact" },
        { label: t.footer.trackOrder, href: "/account/orders" },
      ],
    },
    {
      title: t.footer.colCompany,
      links: [
        { label: t.footer.aboutCo, href: "/about" },
        { label: t.footer.press, href: "/press" },
        { label: t.footer.affiliate, href: "/affiliate" },
        { label: t.footer.wholesale, href: "/wholesale" },
        { label: t.footer.careers, href: "/careers" },
      ],
    },
  ];

  const LEGAL = [
    { label: t.footer.privacy, href: "/legal/privacy" },
    { label: t.footer.terms, href: "/legal/terms" },
    { label: t.footer.warranty, href: "/legal/warranty" },
    { label: t.footer.accessibility, href: "/legal/accessibility" },
    { label: t.footer.cookies, href: "/legal/cookies" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center lg:px-10">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t.footer.headline}
            </h3>
            <p className="mt-2 text-sm text-slate-400">{t.footer.sub}</p>
          </div>
          <EmailCapture
            variant="dark"
            placeholder={t.footer.placeholder}
            submitLabel={t.footer.subscribe}
            successLabel={t.footer.thanks}
          />
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="AZDOME" className="inline-flex">
              <Logo size={30} inverse color="#ffffff" accent="#60a5fa" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {t.footer.brandLine}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-tight text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-6 md:flex-row md:items-center lg:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} AZDOME. {t.footer.copyright}
            </p>
            <LanguageSwitcher variant="light" align="left" />
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-slate-500 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <PaymentLogos />
        </div>
      </div>
    </footer>
  );
}
