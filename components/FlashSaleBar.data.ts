export type FlashSaleContent = {
  /** Master switch — turn off without deleting the rest of the data. */
  active?: boolean;
  /** Headline shown before the countdown. eg "🎉 SPRING SALE — 20% OFF DASH CAMS". */
  text?: string;
  /** CTA label. */
  cta?: string;
  /** CTA link. */
  href?: string;
  /** ISO date string the sale ends. If past, the bar self-hides. */
  endsAt?: string;
  /** When true, admins can dismiss the bar (state stored in localStorage). */
  dismissible?: boolean;
};

export const DEFAULT_FLASH_SALE: FlashSaleContent = {
  active: false,
  text: "🎉 SPRING SALE — 20% OFF DASH CAMS",
  cta: "Shop Sale",
  href: "/collections/dash-cams",
  endsAt: "",
  dismissible: true,
};
