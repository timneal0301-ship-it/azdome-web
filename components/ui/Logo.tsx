// AZDOME brand wordmark — inline SVG.
//
// Bold sans-serif "AZDOME" in brand blue with a small square accent
// after the wordmark. Renders crisp at every size; the parent controls
// dimensions via the `size` prop (height in px).

type LogoProps = {
  className?: string;
  /** Height in pixels. Width auto-scales by viewBox ratio. */
  size?: number;
  /** Wordmark color. Defaults to AZDOME brand blue. */
  color?: string;
  /** Accent square color. Defaults to brand blue. */
  accent?: string;
};

const BRAND_BLUE = "#0066CC";

export default function Logo({
  className = "",
  size = 22,
  color = BRAND_BLUE,
  accent = BRAND_BLUE,
}: LogoProps) {
  // viewBox is sized so the wordmark renders at the intended scale.
  // Width:height ≈ 6.4 — width scales automatically per `size` prop.
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
        fill={color}
      >
        AZDOME
      </text>
      <rect x="160" y="17" width="7" height="7" fill={accent} />
    </svg>
  );
}
