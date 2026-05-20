export type PressQuoteItem = {
  quote: string;
  outlet: string;
  hidden?: boolean;
};

export const DEFAULT_PRESS_QUOTES: PressQuoteItem[] = [
  {
    quote:
      "AZDOME has quietly become the brand to beat at this price point. Night footage is genuinely class-leading.",
    outlet: "The Verge",
  },
  {
    quote:
      "If your only complaint is that you wish more brands cared about firmware support — AZDOME is the answer.",
    outlet: "Wired",
  },
  {
    quote:
      "A five-year firmware commitment, in writing, is unheard of in this category.",
    outlet: "CNET",
  },
  {
    quote:
      "Hands on: the M550 Pro feels almost overspecced for the price.",
    outlet: "Engadget",
  },
];
