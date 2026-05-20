export type FAQ = {
  q: string;
  a: string;
  /** Set to true to skip rendering this question. */
  hidden?: boolean;
};

export const DEFAULT_FAQS: FAQ[] = [
  {
    q: "How do I install the M550 Pro?",
    a: "Most drivers finish install in under 20 minutes. Peel the 3M mount, position the camera behind your rearview mirror, route the Type-C cable along the trim using the included tool, and plug into your 12V port. For 24-hour parking mode, add the optional hardwire kit.",
  },
  {
    q: "Does it record while my car is parked?",
    a: "Yes — with the optional hardwire kit, buffered parking mode records the seconds before and after any motion or impact, preserving incidents while protecting your car battery via low-voltage cutoff.",
  },
  {
    q: "What microSD card should I use?",
    a: "We recommend a high-endurance Class 10 / U3 card, 64GB to 512GB. Cards rated for surveillance / dash-cam use last significantly longer than standard cards.",
  },
  {
    q: "Will it drain my car battery?",
    a: "No. The included cigarette-lighter cable only powers the camera while your car is running. The hardwire kit includes a smart low-voltage cutoff to protect your battery during parking mode.",
  },
  {
    q: "Can I view footage on my phone?",
    a: "Yes. Pair the M550 Pro over its built-in 5GHz Wi-Fi using the free AZDOME app. Browse, download, and share full 4K clips — no SD card removal required.",
  },
  {
    q: "What's covered by the warranty?",
    a: "All AZDOME cameras include a 12-month limited warranty against manufacturing defects, plus 30-day returns from the date of delivery, and 24×7 technical support. Register your product within 30 days for fast-track service.",
  },
  {
    q: "Can I control the camera with my voice?",
    a: "Yes — the M550 Pro and M550 Max support hands-free voice commands including \"Lock Video\", \"Take Photo\", and \"Turn on WiFi\". The microphone is always-on while the camera is recording.",
  },
];
