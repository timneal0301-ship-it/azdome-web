import { Award, ShieldCheck, Recycle, BatteryCharging, FileCheck2 } from "lucide-react";

// Compliance + independent-test marks AZDOME ships under. Each entry is a
// text-only badge — the placeholder icons can be swapped for real cert logos
// (PNGs in /public/images/certifications/) once design provides them.
const CERTS: { label: string; sub: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "CE", sub: "EU conformity", Icon: ShieldCheck },
  { label: "FCC", sub: "US RF compliance", Icon: FileCheck2 },
  { label: "RoHS", sub: "Restricted substances", Icon: Recycle },
  { label: "WEEE", sub: "End-of-life recycling", Icon: BatteryCharging },
  { label: "TÜV Rheinland", sub: "Independent EMC lab", Icon: Award },
];

export default function CertBadges({
  variant = "default",
  eyebrow,
  heading,
}: {
  variant?: "default" | "compact";
  eyebrow?: string;
  heading?: string;
}) {
  const compact = variant === "compact";
  return (
    <section
      className={
        compact
          ? "bg-slate-50 py-12"
          : "bg-white py-20 md:py-24"
      }
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!compact && (
          <div className="mb-10 max-w-2xl text-center md:mb-14 md:mx-auto">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {eyebrow ?? "Certified & Tested"}
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {heading ?? "Independently verified. Globally compliant."}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 md:text-base">
              Every AZDOME ships under the same five marks — covering EU and
              US regulatory compliance, restricted-substance limits, recycling
              obligations, and independent EMC testing.
            </p>
          </div>
        )}
        <ul
          className={[
            "grid gap-3",
            compact
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
          ].join(" ")}
        >
          {CERTS.map(({ label, sub, Icon }) => (
            <li
              key={label}
              className={[
                "flex flex-col items-center justify-center rounded-2xl text-center transition-all duration-300",
                compact
                  ? "bg-white px-4 py-5 ring-1 ring-slate-100"
                  : "bg-slate-50 px-5 py-7 hover:bg-slate-100",
              ].join(" ")}
            >
              <Icon className="h-7 w-7 text-blue-600" />
              <p className="mt-3 text-sm font-bold tracking-tight text-slate-900">
                {label}
              </p>
              <p className="mt-1 text-xs text-slate-500">{sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
