import NextImage, { type ImageProps } from "next/image";

/**
 * Thin wrapper around next/image that defaults quality to 100 (visually
 * lossless) instead of Next's default 75. Use this in place of
 * `next/image` for any admin-managed / hero / product image where the
 * user expects high fidelity. The `quality` prop can still be overridden
 * per call site to trade fidelity for bandwidth on a specific image.
 *
 * Server-component compatible — no "use client" directive — so server
 * pages can import this without introducing a client boundary.
 */
export default function HQImage(props: ImageProps) {
  return <NextImage quality={100} {...props} />;
}
