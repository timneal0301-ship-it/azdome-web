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
  const path = inverse ? INVERSE_PATH : PRIMARY_PATH;
  const resolved = useAssetUrl(path);

  // Admin has uploaded a custom logo when the resolver returns a URL that
  // differs from the static seed path (i.e., a Vercel Blob URL or any
  // override). Render it as an image and let it scale to height = size.
  if (resolved !== path) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
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
