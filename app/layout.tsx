import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CartProvider from "@/components/CartProvider";
import LocaleProvider from "@/components/LocaleProvider";
import PublicChrome from "@/components/PublicChrome";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { AssetUrlsProvider } from "@/components/AssetUrlsProvider";
import { getAssetUrlMap } from "@/lib/asset-urls";
import "./globals.css";

// Layout reads admin-uploaded image overrides from KV on every request.
// Without this, the layout — and every page nested under it — gets
// statically prerendered with whatever was in KV at build time (empty),
// so later admin uploads don't appear on the public frontend.
export const dynamic = "force-dynamic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azdome.com"),
  title: {
    default: "AZDOME — Capture Every Detail, Day or Night",
    template: "%s — AZDOME",
  },
  description:
    "Premium dash cams engineered for clarity, reliability, and peace of mind on every drive. True 4K · Starvis 2 sensor · 5GHz WiFi · 24h parking mode.",
  applicationName: "AZDOME",
  keywords: [
    "dash cam",
    "dashcam",
    "4K dash cam",
    "car camera",
    "parking mode",
    "AZDOME",
    "M550 Pro",
  ],
  authors: [{ name: "AZDOME" }],
  openGraph: {
    type: "website",
    siteName: "AZDOME",
    title: "AZDOME — Capture Every Detail, Day or Night",
    description:
      "Premium dash cams engineered for clarity, reliability, and peace of mind on every drive.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AZDOME — Capture Every Detail, Day or Night",
    description:
      "Premium dash cams. True 4K. Day or night. Designed for every drive.",
  },
  robots: { index: true, follow: true },
};

// Organization-level JSON-LD. Renders once on every page (via root layout)
// so Google's Knowledge Graph picks up brand identity even on deep pages.
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://azdome.com/#organization",
  name: "AZDOME",
  url: "https://azdome.com",
  logo: "https://azdome.com/images/brand/logo.png",
  sameAs: [
    "https://www.amazon.com/stores/AZDOME",
    "https://www.facebook.com/azdomeofficial",
    "https://www.instagram.com/azdome_official",
    "https://www.youtube.com/@azdomeofficial",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@azdome.com",
      availableLanguage: ["English", "Chinese"],
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetUrls = await getAssetUrlMap();
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white font-sans text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <AuthSessionProvider>
          <AssetUrlsProvider map={assetUrls}>
            <LocaleProvider>
              <CartProvider>
                <PublicChrome>{children}</PublicChrome>
              </CartProvider>
            </LocaleProvider>
          </AssetUrlsProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
