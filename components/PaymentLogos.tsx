// Inline-SVG payment badges. Rendered at 14× the natural ratio so they stay
// crisp on retina and scale via the `h-7` class. Colors approximate each
// brand's published guidelines.

const Visa = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Visa">
    <rect width="64" height="24" rx="4" fill="#FFFFFF" />
    <rect width="64" height="24" rx="4" fill="none" stroke="#E2E8F0" />
    <text
      x="32"
      y="17.5"
      textAnchor="middle"
      fontFamily='"Arial Black", Helvetica, sans-serif'
      fontStyle="italic"
      fontWeight={900}
      fontSize={13}
      letterSpacing={1}
      fill="#1A1F71"
    >
      VISA
    </text>
  </svg>
);

const Mastercard = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Mastercard">
    <rect width="64" height="24" rx="4" fill="#FFFFFF" />
    <rect width="64" height="24" rx="4" fill="none" stroke="#E2E8F0" />
    <circle cx="26" cy="12" r="7.5" fill="#EB001B" />
    <circle cx="38" cy="12" r="7.5" fill="#F79E1B" />
    <path
      d="M 32 6.6 a 7.5 7.5 0 0 1 0 10.8 a 7.5 7.5 0 0 1 0 -10.8 z"
      fill="#FF5F00"
    />
  </svg>
);

const Amex = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="American Express">
    <rect width="64" height="24" rx="4" fill="#006FCF" />
    <text
      x="32"
      y="11.5"
      textAnchor="middle"
      fontFamily='"Arial Black", Helvetica, sans-serif'
      fontWeight={900}
      fontSize={6}
      letterSpacing={0.5}
      fill="#FFFFFF"
    >
      AMERICAN
    </text>
    <text
      x="32"
      y="19"
      textAnchor="middle"
      fontFamily='"Arial Black", Helvetica, sans-serif'
      fontWeight={900}
      fontSize={6}
      letterSpacing={0.5}
      fill="#FFFFFF"
    >
      EXPRESS
    </text>
  </svg>
);

const Discover = () => (
  <svg viewBox="0 0 72 24" className="h-7 w-auto" role="img" aria-label="Discover">
    <rect width="72" height="24" rx="4" fill="#FFFFFF" />
    <rect width="72" height="24" rx="4" fill="none" stroke="#E2E8F0" />
    <text
      x="36"
      y="16.5"
      textAnchor="middle"
      fontFamily='-apple-system, "Helvetica Neue", sans-serif'
      fontWeight={900}
      fontSize={10}
      letterSpacing={0.3}
      fill="#231F20"
    >
      DISC
      <tspan fill="#FF6000">O</tspan>
      VER
    </text>
  </svg>
);

const PayPal = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="PayPal">
    <rect width="64" height="24" rx="4" fill="#FFFFFF" />
    <rect width="64" height="24" rx="4" fill="none" stroke="#E2E8F0" />
    <text
      x="32"
      y="17"
      textAnchor="middle"
      fontFamily='"Helvetica Neue", Arial, sans-serif'
      fontStyle="italic"
      fontWeight={900}
      fontSize={13}
      letterSpacing={-0.3}
    >
      <tspan fill="#003087">Pay</tspan>
      <tspan fill="#009CDE">Pal</tspan>
    </text>
  </svg>
);

const Klarna = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Klarna">
    <rect width="64" height="24" rx="12" fill="#FFA8CD" />
    <text
      x="32"
      y="17"
      textAnchor="middle"
      fontFamily='-apple-system, "Helvetica Neue", Inter, sans-serif'
      fontWeight={800}
      fontSize={12}
      letterSpacing={-0.3}
      fill="#0A0E1A"
    >
      Klarna.
    </text>
  </svg>
);

const ApplePay = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Apple Pay">
    <rect width="64" height="24" rx="4" fill="#000000" />
    {/* Apple silhouette (approximate) */}
    <g transform="translate(14 5) scale(0.6)" fill="#FFFFFF">
      <path d="M14.5 4c-.5 1.4-1.7 2.5-3 2.4-.2-1.3.5-2.7 1.3-3.5.8-.9 2-1.5 3-1.6.1 1.3-.4 2.6-1.3 2.7zM18.4 12.6c0-2.9 2.4-4.3 2.5-4.4-1.4-2-3.5-2.3-4.3-2.3-1.8-.2-3.5 1.1-4.5 1.1-1 0-2.4-1-3.9-1-2 0-3.9 1.2-4.9 3-2.1 3.7-.5 9.1 1.5 12 1 1.4 2.2 3 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.6-1.4 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1-.1-3.2-1.2-3.2-4.9z" />
    </g>
    <text
      x="40"
      y="16.5"
      textAnchor="middle"
      fontFamily='-apple-system, "SF Pro Display", Helvetica, sans-serif'
      fontWeight={600}
      fontSize={11}
      letterSpacing={-0.2}
      fill="#FFFFFF"
    >
      Pay
    </text>
  </svg>
);

const GooglePay = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Google Pay">
    <rect width="64" height="24" rx="4" fill="#FFFFFF" />
    <rect width="64" height="24" rx="4" fill="none" stroke="#E2E8F0" />
    <text
      x="32"
      y="17"
      textAnchor="middle"
      fontFamily='"Helvetica Neue", Arial, sans-serif'
      fontWeight={700}
      fontSize={12}
      letterSpacing={-0.5}
    >
      <tspan fill="#4285F4">G</tspan>
      <tspan dx={1} fill="#5F6368">
        Pay
      </tspan>
    </text>
  </svg>
);

const ShopPay = () => (
  <svg viewBox="0 0 64 24" className="h-7 w-auto" role="img" aria-label="Shop Pay">
    <rect width="64" height="24" rx="4" fill="#5A31F4" />
    <text
      x="32"
      y="16.5"
      textAnchor="middle"
      fontFamily='-apple-system, "Helvetica Neue", Inter, sans-serif'
      fontWeight={800}
      fontSize={11}
      letterSpacing={-0.2}
      fill="#FFFFFF"
    >
      shop
      <tspan dx={1} fontWeight={500}>
        Pay
      </tspan>
    </text>
  </svg>
);

const ALL = [Visa, Mastercard, Amex, Discover, PayPal, ApplePay, GooglePay, ShopPay, Klarna];

export default function PaymentLogos() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {ALL.map((Brand, i) => (
        <li key={i} className="opacity-90 transition-opacity duration-300 hover:opacity-100">
          <Brand />
        </li>
      ))}
    </ul>
  );
}
