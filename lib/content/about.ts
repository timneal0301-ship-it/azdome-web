import { Eye, Globe2, Leaf, Microscope, ShieldCheck, Sparkles, Truck, Users } from "lucide-react";
import type { ContentSection } from "./types";

export const STATS: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  label: string;
}[] = [
  { to: 200, suffix: "K+", label: "Drivers protected", separator: true },
  { to: 60, suffix: "+", label: "Countries shipped" },
  { to: 4.8, decimals: 1, label: "Average rating" },
  { to: 2014, label: "Founded" },
];

export const VALUES = [
  {
    icon: Eye,
    title: "Clarity above all",
    body:
      "Every component — image sensor, lens, codec, capacitor — is selected with one question first: will footage hold up at 2 a.m. on a four-lane highway, or in court three months later? We build to that test, not to the spec sheet.",
  },
  {
    icon: Sparkles,
    title: "Quiet engineering",
    body:
      "We obsess over the details you won't see: cable routing, thermal behavior at 65 °C, capacitor longevity past 50,000 power cycles, firmware that recovers cleanly from a 3-microsecond power blip. The result is a camera that just keeps recording.",
  },
  {
    icon: Users,
    title: "Built with drivers",
    body:
      "Our beta program runs with rideshare drivers, fleet managers, parents on long road trips, and a handful of professional racers. Every product ships only after they've put it through what we can't simulate.",
  },
  {
    icon: Globe2,
    title: "Long-term ownership",
    body:
      "We commit to at least five years of free firmware updates on every product we sell. We publish release notes, source our SD cards from manufacturers we've audited, and back our work with a 2-year warranty plus optional accidental-damage cover.",
  },
];

export const TIMELINE = [
  {
    year: "2014",
    title: "AZDOME founded in Shenzhen",
    body:
      "Our co-founders, both image-sensor engineers, started AZDOME after a frustrating insurance dispute revealed how few cameras of the era held up to scrutiny.",
  },
  {
    year: "2017",
    title: "First million-unit milestone",
    body:
      "The original M01 reaches one million units shipped. We invest the margin into a dedicated optics lab.",
  },
  {
    year: "2020",
    title: "5GHz Wi-Fi platform launch",
    body:
      "We become one of the first dash-cam manufacturers to ship dual-band Wi-Fi as standard, eliminating the 'pull-the-SD-card' workflow.",
  },
  {
    year: "2022",
    title: "AZDOME Care program",
    body:
      "We extend warranty options and pledge a 5-year firmware update commitment in writing.",
  },
  {
    year: "2024",
    title: "California HQ opens",
    body:
      "We open a Bay Area office to bring product and software work closer to our largest customer base, while keeping hardware in Shenzhen.",
  },
  {
    year: "2026",
    title: "M550 Pro flagship",
    body:
      "Our most advanced platform yet. Sony Starvis 2 sensor, on-device ADAS, and the smallest 4K dual-channel body we've ever made.",
  },
];

export const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: "Privacy on-device",
    body:
      "We never automatically upload footage. The camera and SD card are yours; what they record stays with you.",
  },
  {
    icon: Microscope,
    title: "Independent testing",
    body:
      "Every product is tested by TÜV Rheinland for EMC and an independent low-light lab for sensor performance before launch.",
  },
  {
    icon: Truck,
    title: "Responsible shipping",
    body:
      "Carbon-neutral shipping on every US order. Reduced-volume packaging cut shipping CO₂ per unit by 38% in 2025.",
  },
  {
    icon: Leaf,
    title: "Repair over replace",
    body:
      "Out-of-warranty repair is offered for every model. We restock and resell certified-refurbished units at a discount instead of recycling them.",
  },
];

export type AboutContent = {
  stats: typeof STATS;
  values: typeof VALUES;
  timeline: typeof TIMELINE;
  commitments: typeof COMMITMENTS;
};

export const ABOUT_PAGE: ContentSection<AboutContent> = {
  key: "about.page",
  label: "About 页 · Stats / Values / Timeline / Commitments",
  description: "About 页所有可编辑卡片。Stats 是数字计数器(到达视野动画),Timeline 是大事记。",
  page: "about",
  previewHref: "/about",
  defaults: { stats: STATS, values: VALUES, timeline: TIMELINE, commitments: COMMITMENTS },
};
