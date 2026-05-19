import Link from "next/link";
import { ArrowUpRight, Download, FileText, Image as ImageIcon, Palette } from "lucide-react";

const RELEASES = [
  {
    date: "April 04, 2026",
    title: "AZDOME launches M550 Pro with Sony Starvis 2 sensor",
    excerpt:
      "True 4K with the new generation of low-light sensor — the most significant upgrade in our flagship line.",
    body:
      "AZDOME today announced the M550 Pro, a 4K dual-channel dash cam built around the Sony Starvis 2 IMX678 sensor and an f/1.55 aperture lens. Independent low-light testing puts it within 1.2 stops of the best automotive cameras on the market — at roughly half the price. The M550 Pro ships with dual-band 5 GHz Wi-Fi, GPS, and on-device ADAS, available today on azdome.com for $129.99 and at major US retailers in early May.",
  },
  {
    date: "February 18, 2026",
    title: "AZDOME crosses 200,000 protected drivers worldwide",
    excerpt:
      "Two hundred thousand dash cams installed, three years ahead of our internal projection.",
    body:
      "AZDOME today crossed 200,000 active units across 60+ countries — a milestone the company had originally projected for 2029. CEO Lily Chen attributes the acceleration to the M530 3-channel platform's adoption among rideshare drivers and to the company's free, 5-year firmware update policy.",
  },
  {
    date: "January 12, 2026",
    title: "M530 3-Channel begins shipping to rideshare partners",
    excerpt:
      "Our three-camera design is rolling out to fleet partners across North America.",
    body:
      "Effective today, AZDOME's M530 3-channel dash cam is the default safety-camera package for 12 of the top 25 US rideshare cooperatives. The wholesale program includes installer-network support, 3-year warranty, and JSON-webhook integrations with the major telematics platforms.",
  },
  {
    date: "October 28, 2025",
    title: "AZDOME extends free firmware updates to 5 years",
    excerpt:
      "Every camera, every model, every region — guaranteed in writing.",
    body:
      "AZDOME today committed to providing free firmware updates for at least five years from the launch date of every camera, retroactive to all products sold since 2022. The commitment is published as a binding policy on the company's warranty page.",
  },
];

const COVERAGE = [
  { outlet: "The Verge", title: "AZDOME's M550 Pro is the dash cam to beat in 2026", href: "#" },
  { outlet: "Wired",      title: "How a small DTC brand is challenging the dash-cam category", href: "#" },
  { outlet: "TechCrunch", title: "AZDOME raises Series B for next-gen on-device AI", href: "#" },
  { outlet: "Engadget",   title: "Hands on: the M550 Pro feels almost overspecced for the price", href: "#" },
  { outlet: "CNET",       title: "The best dash cams for night driving in 2026", href: "#" },
];

const QUOTES = [
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
];

const KIT = [
  { icon: Palette,    title: "Brand kit (logos, colors, type)", detail: "AI/SVG/PNG · 12 MB" },
  { icon: ImageIcon,  title: "Product photography",            detail: "Full resolution, web + print · 240 MB" },
  { icon: FileText,   title: "Fact sheet & exec bios",          detail: "PDF · 1.2 MB" },
];

export const metadata = { title: "Press — AZDOME" };

export default function PressPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          Press
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          News, releases & coverage.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
          For press inquiries, exclusive product previews, or executive
          interviews, contact our team. We reply within one business day.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Media contact:{" "}
          <a href="mailto:press@azdome.com" className="font-medium text-blue-600 hover:text-blue-700">
            press@azdome.com
          </a>{" "}
          · Hana Park, Head of Communications
        </p>

        {/* Brand kit */}
        <section className="mt-12 rounded-2xl bg-slate-50 p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Brand kit
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Logos, photography, executive headshots, fact sheet. Updated quarterly.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {KIT.map((k) => (
              <li key={k.title}>
                <Link
                  href="#"
                  className="group flex h-full flex-col rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <k.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                    {k.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{k.detail}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Download
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Releases */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Recent releases
          </h2>
          <ul className="mt-6 divide-y divide-slate-100">
            {RELEASES.map((r) => (
              <li key={r.title} className="py-8">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {r.date}
                </p>
                <Link
                  href="#"
                  className="mt-2 block text-xl font-semibold tracking-tight text-slate-900 hover:text-blue-600 md:text-2xl"
                >
                  {r.title}
                </Link>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700 md:text-base">
                  {r.excerpt}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  {r.body}
                </p>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                  Read full release
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Pull quotes */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            What the press is saying
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {QUOTES.map((q) => (
              <figure
                key={q.outlet}
                className="rounded-2xl bg-slate-50 p-7 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-slate-700">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                  {q.outlet}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Coverage
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {COVERAGE.map((c) => (
              <li key={c.title}>
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {c.outlet}
                  </p>
                  <p className="mt-3 flex-1 text-base font-semibold tracking-tight text-slate-900">
                    {c.title}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-900">
                    Read article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
