import FaqAccordion from "@/components/FaqAccordion";

const TROUBLESHOOT = [
  {
    q: "Camera won't power on",
    a: "Check that the cable is fully seated in both the camera and the 12V port. Try a different USB-C cable. If the issue persists with multiple cables, the fuse may have blown — check your fuse box.",
  },
  {
    q: "Recording stops mid-trip",
    a: "Usually an SD card issue. Format the card from inside the AZDOME app or camera settings. If the issue continues, try a different high-endurance SD card (we recommend our 128GB).",
  },
  {
    q: "App can't find the camera",
    a: "Make sure your phone is connected to the camera's 5GHz Wi-Fi network (not your home Wi-Fi). Toggle the camera's Wi-Fi off and on again from settings, then re-pair.",
  },
  {
    q: "Footage looks blurry at night",
    a: "Clean the lens with a microfiber cloth. Tinted or dirty windshields can also cut quality. Check that your firmware is up to date — recent updates significantly improve low-light performance.",
  },
  {
    q: "Parking mode draining battery",
    a: "The hardwire kit has a low-voltage cutoff. Verify it's wired to the constant-on fuse and not bypassed. Default cutoff is 11.8V — adjust in settings if your battery is older.",
  },
  {
    q: "Audio not recording",
    a: "Audio recording can be toggled in settings (it's off by default in some regions for legal reasons). Make sure it's enabled and that the camera firmware is up to date.",
  },
];

export const metadata = { title: "Troubleshooting — AZDOME Support" };

export default function TroubleshootPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Troubleshooting
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Quick fixes for common issues.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
          Try these first. If you&apos;re still stuck after 5 minutes, our
          support team will help — average reply under 2 hours.
        </p>
      </div>
      <FaqAccordion faqs={TROUBLESHOOT} title="Common issues" eyebrow="Step 1" />
    </main>
  );
}
