export const USE_CASE_ICONS = [
  "Users",
  "Car",
  "ShieldCheck",
  "Truck",
  "Heart",
  "Globe2",
] as const;

export type UseCaseTab = {
  id: string;
  /** Lucide icon name — see USE_CASE_ICONS for allowed values. */
  iconName: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
};

export const DEFAULT_USE_CASE_TABS: UseCaseTab[] = [
  {
    id: "family",
    iconName: "Users",
    label: "Family",
    title: "Memories worth keeping. Evidence when it matters.",
    body:
      "From the first turn out of the driveway to the last mile home, your dash cam captures the moments you'll want to relive — and the ones you'd rather have evidence of.",
    bullets: [
      "4K Ultra HD captures road signs and license plates",
      "150° wide angle covers both shoulders",
      "Time-lapse mode condenses long trips into shareable clips",
    ],
    image: "/images/pdp/use-family.jpg",
  },
  {
    id: "rideshare",
    iconName: "Car",
    label: "Rideshare",
    title: "Protect every passenger. Protect yourself.",
    body:
      "Multi-channel coverage gives you front road, cabin interior, and rear view simultaneously — the gold standard for rideshare and delivery drivers.",
    bullets: [
      "Cabin recording deters and documents disputes",
      "IR LEDs work in pitch-black interior at night",
      "Voice command keeps your hands on the wheel",
    ],
    image: "/images/pdp/use-rideshare.jpg",
  },
  {
    id: "parking",
    iconName: "ShieldCheck",
    label: "Parking",
    title: "Eyes on your car. Even when you're not.",
    body:
      "Buffered parking mode records the seconds before and after any motion or impact. Add the hardwire kit and your camera works 24 hours a day, with battery protection built in.",
    bullets: [
      "Motion + impact triggers auto-lock the clip",
      "Time-lapse mode runs up to 24 hours continuous",
      "Low-voltage cutoff protects your car battery",
    ],
    image: "/images/pdp/use-parking.jpg",
  },
];
