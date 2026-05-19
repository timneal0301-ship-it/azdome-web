import { FileText, ImageIcon, Palette } from "lucide-react";
import type { ContentSection } from "./types";

export const RELEASES = [
  {
    date: "April 04, 2026",
    title: "AZDOME launches M550 Pro with Sony Starvis 2 sensor",
    excerpt:
      "True 4K with the new generation of low-light sensor — the most significant upgrade in our flagship line.",
    body:
      "AZDOME today announced the M550 Pro, a 4K dual-channel dash cam built around the Sony Starvis 2 IMX678 sensor and an f/1.55 aperture lens. Independent low-light testing puts it within 1.2 stops of the best automotive cameras on the market — at roughly half the price. The M550 Pro ships with dual-band 5 GHz Wi-Fi, GPS, and on-device ADAS, available today on azdome.com for $129.99 and at major US retailers in early May.",
  },
  {
    date: "February 18, 2026",
    title: "AZDOME crosses 200,000 protected drivers worldwide",
    excerpt:
      "Two hundred thousand dash cams installed, three years ahead of our internal projection.",
    body:
      "AZDOME today crossed 200,000 active units across 60+ countries — a milestone the company had originally projected for 2029. CEO Lily Chen attributes the acceleration to the M530 3-channel platform's adoption among rideshare drivers and to the company's free, 5-year firmware update policy.",
  },
  {
    date: "January 12, 2026",
    title: "M530 3-Channel begins shipping to rideshare partners",
    excerpt:
      "Our three-camera design is rolling out to fleet partners across North America.",
    body:
      "Effective today, AZDOME's M530 3-channel dash cam is the default safety-camera package for 12 of the top 25 US rideshare cooperatives. The wholesale program includes installer-network support, 3-year warranty, and JSON-webhook integrations with the major telematics platforms.",
  },
  {
    date: "October 28, 2025",
    title: "AZDOME extends free firmware updates to 5 years",
    excerpt:
      "Every camera, every model, every region — guaranteed in writing.",
    body:
      "AZDOME today committed to providing free firmware updates for at least five years from the launch date of every camera, retroactive to all products sold since 2022. The commitment is published as a binding policy on the company's warranty page.",
  },
];

export const COVERAGE = [
  { outlet: "The Verge", title: "AZDOME's M550 Pro is the dash cam to beat in 2026", href: "#" },
  { outlet: "Wired",      title: "How a small DTC brand is challenging the dash-cam category", href: "#" },
  { outlet: "TechCrunch", title: "AZDOME raises Series B for next-gen on-device AI", href: "#" },
  { outlet: "Engadget",   title: "Hands on: the M550 Pro feels almost overspecced for the price", href: "#" },
  { outlet: "CNET",       title: "The best dash cams for night driving in 2026", href: "#" },
];

export const QUOTES = [
  {
    quote:
      "AZDOME has quietly become the brand to beat at this price point. Night footage is genuinely class-leading.",
    outlet: "The Verge",
  },
  {
    quote:
      "If your only complaint is that you wish more brands cared about firmware support — AZDOME is the answer.",
    outlet: "Wired",
  },
  {
    quote:
      "A five-year firmware commitment, in writing, is unheard of in this category.",
    outlet: "CNET",
  },
];

export const KIT = [
  { icon: Palette,    title: "Brand kit (logos, colors, type)", detail: "AI/SVG/PNG · 12 MB" },
  { icon: ImageIcon,  title: "Product photography",            detail: "Full resolution, web + print · 240 MB" },
  { icon: FileText,   title: "Fact sheet & exec bios",          detail: "PDF · 1.2 MB" },
];

export type PressContent = {
  releases: typeof RELEASES;
  coverage: typeof COVERAGE;
  quotes: typeof QUOTES;
  kit: typeof KIT;
};

export const PRESS_PAGE: ContentSection<PressContent> = {
  key: "press.page",
  label: "Press 页 · Releases / Coverage / Quotes / Brand Kit",
  description: "媒体页:新闻稿、报道、引语、品牌资源下载条目。",
  page: "press",
  previewHref: "/press",
  defaults: { releases: RELEASES, coverage: COVERAGE, quotes: QUOTES, kit: KIT },
};
