import type { ContentSection } from "./types";

export const WHOLESALE_BENEFIT_ICONS = [
  "Package2",
  "Truck",
  "ShieldCheck",
  "Headset",
  "Wrench",
  "Building2",
] as const;

export const WHOLESALE_VERTICAL_ICONS = [
  "Briefcase",
  "Boxes",
  "Building2",
] as const;

export type WholesaleTier = { range: string; discount: string };

export const TIERS: WholesaleTier[] = [
  { range: "10 – 49 units", discount: "12% off MSRP" },
  { range: "50 – 199 units", discount: "18% off MSRP" },
  { range: "200 – 499 units", discount: "23% off MSRP" },
  { range: "500+ units", discount: "Custom quote" },
];

export type WholesaleBenefit = { iconName: string; title: string; body: string };

export const BENEFITS: WholesaleBenefit[] = [
  { iconName: "Package2", title: "Volume pricing", body: "Tiered discounts from MOQ 10 units, up to negotiated rates for orders of 500+." },
  { iconName: "Truck", title: "Bulk shipping", body: "Free freight on orders over $5,000 to the contiguous US. International quotes within 24h." },
  { iconName: "ShieldCheck", title: "Extended warranty", body: "3-year warranty on all wholesale units (vs. 2 years retail)." },
  { iconName: "Headset", title: "Dedicated account manager", body: "A single human contact who knows your account, your fleet, and your timeline." },
  { iconName: "Wrench", title: "Installation services", body: "Optional white-glove install network across major US metros via our certified-installer partners." },
  { iconName: "Building2", title: "Co-branded packaging", body: "Custom packaging available for fleet partners (MOQ 500). 4–6 week lead time." },
];

export type WholesaleVertical = { iconName: string; title: string; body: string };

export const VERTICALS: WholesaleVertical[] = [
  {
    iconName: "Briefcase",
    title: "Rideshare & delivery fleets",
    body:
      "M530 3-channel cameras are standard issue for 12 of the top 25 US rideshare cooperatives. Driver-portal integrations for incident review available on request.",
  },
  {
    iconName: "Boxes",
    title: "Logistics & last-mile",
    body:
      "Stealth-mounted M300S deployed in last-mile delivery vehicles across 4 of the largest North American 3PLs. Telematics-system handoffs supported via standard JSON webhooks.",
  },
  {
    iconName: "Building2",
    title: "Auto dealerships",
    body:
      "Dealer-installed M550 Pro and GS63H as an upsell package on new- and used-vehicle sales. Includes co-branded install certificates and end-customer onboarding emails.",
  },
];

export type WholesaleFAQ = { q: string; a: string };

export const FAQ: WholesaleFAQ[] = [
  {
    q: "What's the minimum order quantity?",
    a: "Our entry-level wholesale tier starts at 10 units across any combination of SKUs. Below that, our retail pricing on azdome.com is your best path.",
  },
  {
    q: "How long is lead time?",
    a: "In-stock SKUs ship within 3 business days. Co-branded packaging or custom firmware loads take 4–6 weeks. Large orders (500+) typically ship in 7–10 days from order confirmation.",
  },
  {
    q: "Do you support international wholesale?",
    a: "Yes. We ship wholesale to the US, Canada, UK, EU, Australia, and the UAE. Other regions are handled case by case — talk to a specialist about your destination.",
  },
  {
    q: "What payment terms are available?",
    a: "First orders are prepaid. After two paid orders, Net-30 terms are available with credit approval. Larger accounts (Fleet 500+) can request Net-45 or Net-60 with line-of-credit setup.",
  },
  {
    q: "Can I integrate AZDOME with my fleet telematics system?",
    a: "Yes. We provide a JSON webhook API for incident, GPS, and event data on M530 and M550 Pro. Reference integrations exist for Geotab, Samsara, and Verizon Connect. Our solutions team will help validate your stack.",
  },
  {
    q: "Do wholesale units come with the same warranty as retail?",
    a: "Wholesale units get a 3-year warranty (vs. 2 years retail). Out-of-warranty service is available at preferential rates for wholesale partners.",
  },
];

export type WholesaleContent = {
  tiers: WholesaleTier[];
  benefits: WholesaleBenefit[];
  verticals: WholesaleVertical[];
  faq: WholesaleFAQ[];
};

export const WHOLESALE_PAGE: ContentSection<WholesaleContent> = {
  key: "wholesale.page",
  label: "Wholesale 页 · Tiers / Benefits / Verticals / FAQ",
  description:
    "批发/团购页:价格阶梯、福利、行业案例、常见问题。" +
    `Benefits iconName: ${WHOLESALE_BENEFIT_ICONS.join(", ")} · ` +
    `Verticals iconName: ${WHOLESALE_VERTICAL_ICONS.join(", ")}`,
  page: "wholesale",
  previewHref: "/wholesale",
  defaults: { tiers: TIERS, benefits: BENEFITS, verticals: VERTICALS, faq: FAQ },
};
