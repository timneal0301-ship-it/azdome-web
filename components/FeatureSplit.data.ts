export const FEATURE_SPLIT_ICONS = [
  "Eye",
  "ShieldCheck",
  "Smartphone",
  "Wifi",
  "Zap",
  "Moon",
  "Camera",
  "Cloud",
] as const;

export type FeatureBlock = {
  /** Lucide icon name — see FEATURE_SPLIT_ICONS for allowed values. */
  iconName: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export const DEFAULT_FEATURES: FeatureBlock[] = [
  {
    iconName: "Eye",
    eyebrow: "4K Resolution",
    title: "Read license plates four lanes away.",
    description:
      "True 3840×2160 capture preserves the details that matter when it counts. Frame-perfect evidence — every drive, every angle.",
    image: "/images/aplus/4k-detail.jpg",
  },
  {
    iconName: "ShieldCheck",
    eyebrow: "24H Parking Mode",
    title: "Your car never sleeps. Neither does the camera.",
    description:
      "Buffered parking mode records the moments before an impact. Motion and collision detection wake the camera only when something happens.",
    image: "/images/aplus/parking.jpg",
  },
  {
    iconName: "Smartphone",
    eyebrow: "AZDOME App",
    title: "Footage in your pocket, instantly.",
    description:
      "Pair via 5GHz Wi-Fi for one-tap clip downloads. Share to insurance, family, or socials without ever removing the SD card.",
    image: "/images/aplus/app.jpg",
  },
];
