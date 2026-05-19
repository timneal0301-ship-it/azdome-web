type LogoProps = {
  className?: string;
  // Wordmark only? Or with the lens mark?
  variant?: "mark" | "wordmark" | "lockup";
  // Visual size in pixels (height).
  size?: number;
  // Override the color via currentColor; default = inherit.
  color?: string;
};

/**
 * AZDOME brand mark + wordmark. Renders as inline SVG so it inherits
 * text color (use parent text-* classes) and stays crisp at any size.
 */
export default function Logo({
  className = "",
  variant = "lockup",
  size = 24,
  color = "currentColor",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        className={className}
        aria-label="AZDOME"
        role="img"
      >
        <circle cx="16" cy="16" r="15" fill={color} />
        <circle cx="16" cy="16" r="9" fill="#ffffff" opacity="0.92" />
        <circle cx="16" cy="16" r="5" fill={color} />
      </svg>
    );
  }
  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 120 24"
        height={size}
        width={size * 5}
        className={className}
        aria-label="AZDOME"
        role="img"
      >
        <text
          x="0"
          y="19"
          fontFamily="var(--font-inter), -apple-system, sans-serif"
          fontWeight={800}
          fontSize={22}
          letterSpacing={-0.5}
          fill={color}
        >
          AZDOME
        </text>
      </svg>
    );
  }
  // lockup: small mark + wordmark
  return (
    <svg
      viewBox="0 0 148 24"
      height={size}
      width={size * 6.16}
      className={className}
      aria-label="AZDOME"
      role="img"
    >
      <circle cx="12" cy="12" r="11" fill={color} />
      <circle cx="12" cy="12" r="6.5" fill="#ffffff" opacity="0.92" />
      <circle cx="12" cy="12" r="3.5" fill={color} />
      <text
        x="30"
        y="18"
        fontFamily="var(--font-inter), -apple-system, sans-serif"
        fontWeight={800}
        fontSize={20}
        letterSpacing={-0.5}
        fill={color}
      >
        AZDOME
      </text>
    </svg>
  );
}
