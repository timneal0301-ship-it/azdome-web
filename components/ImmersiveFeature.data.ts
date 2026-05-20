export type ImmersiveStat = { value: string; label: string };

export type ImmersiveContent = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  image: string;
  stats: ImmersiveStat[];
};

export const DEFAULT_IMMERSIVE: ImmersiveContent = {
  eyebrow: "Engineered for night",
  titleA: "See clearer at 2 a.m. than",
  titleB: "the human eye.",
  subtitle:
    "Sony STARVIS-grade sensor + f/1.55 aperture + 6-layer IR. Captures license plates, road signs, and pedestrians in conditions where your eyes see only blur.",
  image: "/images/pdp/immersive-night.jpg",
  stats: [
    { value: "0.001 lux", label: "Min illumination" },
    { value: "f/1.55", label: "Aperture" },
    { value: "150°", label: "Field of view" },
    { value: "−4°F → 158°F", label: "Operating range" },
  ],
};
