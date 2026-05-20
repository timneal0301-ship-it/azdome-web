"use client";

// AZDOME brand wordmark — admin-uploadable.
//
//   • If admin has uploaded a custom logo image at /admin (under the
//     "logo-primary" or "logo-inverse" slot), render that.
//   • Otherwise fall back to a clean inline-SVG wordmark in brand blue.

import { useAssetUrl } from "@/components/AssetUrlsProvider";

type LogoProps = {
  className?: string;
  /** Height in pixels. Width auto-scales. */
  size?: number;
  /** Wordmark color for the SVG fallback. */
  color?: string;
  /** Accent square color for the SVG fallback. */
  accent?: string;
  /**
   * If true, look up the "logo-inverse" slot (white-for-dark-bg variant).
   * Otherwise use the primary blue slot. Also flips fallback SVG colors.
   */
  inverse?: boolean;
};

const BRAND_BLUE = "#0066CC";
const PRIMARY_PATH = "/images/brand/logo-primary.png";
const INVERSE_PATH = "/images/brand/logo-inverse.png";

export default function Logo({
  className = "",
  size = 22,
  color,
  accent,
  inverse = false,
}: LogoProps) {
  const primaryResolved = useAssetUrl(PRIMARY_PATH);
  const inverseResolved = useAssetUrl(INVERSE_PATH);
  const primaryUploaded = primaryResolved !== PRIMARY_PATH;
  const inverseUploaded = inverseResolved !== INVERSE_PATH;

  // Render order of preference:
  //   1. inverse context + dedicated inverse upload — perfect.
  //   2. inverse context + only primary upload — reuse primary, tint white
  //      via a brightness/invert CSS filter so it reads on dark backgrounds.
  //   3. light-bg context + primary upload — as-is.
  //   4. nothing uploaded — fall through to the inline SVG wordmark.
  if (inverse && inverseUploaded) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={inverseResolved}
        alt="AZDOME"
        height={size}
        style={{ height: size, width: "auto", display: "inline-block" }}
        className={className}
      />
    );
  }
  if (inverse && primaryUploaded) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={primaryResolved}
        alt="AZDOME"
        height={size}
        style={{
          height: size,
          width: "auto",
          display: "inline-block",
          filter: "brightness(0) invert(1)",
        }}
        className={className}
      />
    );
  }
  if (!inverse && primaryUploaded) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={primaryResolved}
        alt="AZDOME"
        height={size}
        style={{ height: size, width: "auto", display: "inline-block" }}
        className={className}
      />
    );
  }

  // No upload — render the SVG wordmark.
  const fillColor = color ?? (inverse ? "#ffffff" : BRAND_BLUE);
  const accentColor = accent ?? (inverse ? "#60a5fa" : BRAND_BLUE);

  return (
    <svg
      viewBox="0 0 192 30"
      height={size}
      width={size * 6.4}
      className={className}
      role="img"
      aria-label="AZDOME"
    >
      <text
        x="0"
        y="24"
        fontFamily='-apple-system, "Helvetica Neue", "Inter", "Arial Black", sans-serif'
        fontWeight={900}
        fontSize={30}
        letterSpacing={-1.2}
        fill={fillColor}
      >
        AZDOME
      </text>
      <rect x="160" y="17" width="7" height="7" fill={accentColor} />
    </svg>
  );
}
