export type SpecGroup = {
  title: string;
  rows: [string, string][];
};

export const DEFAULT_SPECS: SpecGroup[] = [
  {
    title: "Imaging",
    rows: [
      ["Front resolution", "3840×2160 (True 4K)"],
      ["Cabin resolution", "1920×1080 (Full HD)"],
      ["Processor", "Novatek NT8629G"],
      ["Front sensor", "SC401AI + GC2053"],
      ["Cabin sensor", "SC223A with Sony STARVIS technology"],
      ["Night vision", "6-layer IR + 6 hidden IR LEDs"],
    ],
  },
  {
    title: "Display & Interface",
    rows: [
      ["Screen", "3.19-inch IPS"],
      ["Voice control", "Lock Video / Take Photo / Turn on WiFi"],
      ["Mobile app", "AZDOME (iOS 14+ / Android 8+)"],
      ["Languages", "11 languages, follows your phone"],
    ],
  },
  {
    title: "Storage & Connectivity",
    rows: [
      ["microSD support", "Up to 256GB (64GB included)"],
      ["Wi-Fi", "Dual-band 5GHz / 2.4GHz"],
      ["GPS", "Built-in — speed, route, latitude, longitude"],
      ["Loop recording", "Automatic, oldest clip overwritten"],
    ],
  },
  {
    title: "Power & Parking",
    rows: [
      ["Battery", "Super capacitor (heat-resistant)"],
      ["Operating temp", "−4°F to 158°F (−20°C to 70°C)"],
      ["Parking modes", "Collision detection · or · 24h time-lapse"],
      ["G-sensor", "3-axis, auto event lock on impact"],
      ["Power input", "12V / 24V (Type-C)"],
    ],
  },
  {
    title: "In the Box & Support",
    rows: [
      ["Included", "M550 Pro · Rear cam · 3M mounts ×2 · Type-C cable (3.5m) · Trim tool · 64GB SD · Quick-start guide"],
      ["Optional add-on", "Hardwire kit (3-lead) for 24h parking mode"],
      ["Warranty", "12 months + 24×7 technical support"],
    ],
  },
];
