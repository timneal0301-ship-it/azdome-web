export const PROMISE_ICONS = [
  "RotateCcw",
  "ShieldCheck",
  "Truck",
  "HeartHandshake",
  "Headphones",
  "Wrench",
  "CheckCircle2",
  "Package",
] as const;

export type Promise = {
  iconName: string;
  title: string;
  body: string;
  hidden?: boolean;
};

export const DEFAULT_PROMISES: Promise[] = [
  {
    iconName: "RotateCcw",
    title: "30-day free returns",
    body: "Try any AZDOME camera for 30 days. If it isn't the right fit, return it for a full refund — no restocking fees.",
  },
  {
    iconName: "ShieldCheck",
    title: "2-year warranty included",
    body: "Every product is covered for two years against manufacturing defects. Wholesale orders extend to three years.",
  },
  {
    iconName: "Truck",
    title: "Free US shipping over $99",
    body: "Orders over $99 ship free to the contiguous US. Most orders arrive in 2–4 business days.",
  },
];
