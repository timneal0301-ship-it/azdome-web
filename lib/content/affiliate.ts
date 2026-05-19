import { BadgeCheck, CalendarClock, DollarSign, LineChart, Megaphone, Users } from "lucide-react";
import type { ContentSection } from "./types";

export const STATS = [
  { icon: DollarSign, value: "10–18%", label: "Tiered commission" },
  { icon: Users, value: "60 days", label: "Cookie window" },
  { icon: LineChart, value: "$190", label: "Average order value" },
  { icon: CalendarClock, value: "Net-30", label: "Payout schedule" },
];

export const TIERS = [
  {
    name: "Starter",
    rate: "10%",
    threshold: "All approved creators",
    perks: [
      "10% commission on every approved sale",
      "60-day cookie window",
      "Monthly performance dashboard",
      "Standard creative assets (banners, product photos, video clips)",
    ],
  },
  {
    name: "Pro",
    rate: "14%",
    threshold: "$5,000 in attributed sales in a rolling 90 days",
    perks: [
      "Everything in Starter, plus:",
      "Dedicated affiliate manager",
      "Custom discount code (5% off for your audience)",
      "Early access to new product launches",
      "Free product seeding for review content",
    ],
  },
  {
    name: "Partner",
    rate: "18%",
    threshold: "By invitation only",
    perks: [
      "Everything in Pro, plus:",
      "Custom landing pages with your branding",
      "Co-branded content collaboration budget",
      "Early-access product samples and pre-launch firmware",
      "Quarterly business reviews and roadmap previews",
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    n: 1,
    icon: BadgeCheck,
    title: "Apply",
    body: "Submit the short form below. We review every application personally — usually within 2 business days.",
  },
  {
    n: 2,
    icon: Megaphone,
    title: "Promote",
    body: "Use your unique link or discount code in YouTube videos, blog posts, newsletters, or rideshare community groups.",
  },
  {
    n: 3,
    icon: LineChart,
    title: "Track",
    body: "Watch clicks, conversions, and earnings in your real-time dashboard. We attribute on a 60-day cookie + last-click model.",
  },
  {
    n: 4,
    icon: DollarSign,
    title: "Get paid",
    body: "Net-30 payouts via PayPal, Wise, or ACH. Minimum payout threshold: $50.",
  },
];

export const FAQ = [
  {
    q: "What can I promote?",
    a: "Anything sold on azdome.com — dash cameras, accessories, and gift cards. Promotions of refurbished units and current sales are all eligible.",
  },
  {
    q: "How is commission calculated?",
    a: "Commission is paid on the final order subtotal after any discounts and before shipping and tax. Returns within 30 days are deducted from the next payout.",
  },
  {
    q: "Can I run paid ads on AZDOME brand keywords?",
    a: "No — bidding on AZDOME brand terms or trademarked variants is prohibited and will result in disqualification. Non-brand keyword campaigns are welcomed and supported.",
  },
  {
    q: "Do I need a minimum audience size?",
    a: "There is no hard minimum. We accept creators with engaged audiences in automotive, rideshare, family travel, EV ownership, and adjacent verticals. The Partner tier is invitation-only based on track record, not audience size.",
  },
  {
    q: "Are there geographic restrictions?",
    a: "Commissions apply to orders shipping to the US, Canada, UK, and EU. Other regions are coming as we expand inventory.",
  },
  {
    q: "When do I get paid?",
    a: "Commissions earned in a calendar month are payable on the 1st of the following month, net 30 days to account for returns. PayPal, Wise, and ACH are all supported.",
  },
];

export type AffiliateContent = {
  stats: typeof STATS;
  tiers: typeof TIERS;
  howItWorks: typeof HOW_IT_WORKS;
  faq: typeof FAQ;
};

export const AFFILIATE_PAGE: ContentSection<AffiliateContent> = {
  key: "affiliate.page",
  label: "Affiliate 页 · Stats / Tiers / How it works / FAQ",
  description: "联盟计划页:统计、佣金等级、流程、常见问题。",
  page: "affiliate",
  previewHref: "/affiliate",
  defaults: { stats: STATS, tiers: TIERS, howItWorks: HOW_IT_WORKS, faq: FAQ },
};
