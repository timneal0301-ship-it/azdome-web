export type Review = {
  id: string;
  title: string;
  body: string;
  rating: number;
  name: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  photo?: string;
  /** Set to true to skip rendering this review. */
  hidden?: boolean;
};

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: "r1",
    title: "Saved me $4,200 in a fault dispute",
    body: "A driver ran a red and clipped my bumper. Insurance initially blamed me. Pulled the 4K footage off the SD card, sent it in, and got a fault reversal within 72 hours. The plate readability at night is the real deal.",
    rating: 5,
    name: "Sarah W.",
    date: "Verified buyer · Mar 12, 2026",
    verified: true,
    helpful: 124,
    photo: "/images/reviews/r1.jpg",
  },
  {
    id: "r2",
    title: "Install was easier than I expected",
    body: "I was nervous about routing the rear cable, but the trim tool and 3.5m cable were perfect for my SUV. Total install: 22 minutes. App pairing was instant on 5GHz.",
    rating: 5,
    name: "Hugo M.",
    date: "Verified buyer · Feb 28, 2026",
    verified: true,
    helpful: 87,
  },
  {
    id: "r3",
    title: "Night vision is genuinely impressive",
    body: "Compared three other dash cams in my driveway at midnight. The Starvis 2 sensor on the M550 picked up details the others completely missed. 5 stars.",
    rating: 5,
    name: "Lena R.",
    date: "Verified buyer · Feb 14, 2026",
    verified: true,
    helpful: 56,
    photo: "/images/reviews/r3.jpg",
  },
  {
    id: "r4",
    title: "Great camera, parking mode needs the hardwire kit",
    body: "Camera quality is excellent. Wish parking mode was clearer in the listing — you do need to add the hardwire kit to get 24h surveillance. Once installed, works flawlessly.",
    rating: 4,
    name: "Devon P.",
    date: "Verified buyer · Feb 02, 2026",
    verified: true,
    helpful: 41,
  },
];
