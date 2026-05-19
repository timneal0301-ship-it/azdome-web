import Link from "next/link";
import { AlertCircle } from "lucide-react";

import FirmwareList from "@/components/FirmwareList";
import { getAllFirmware } from "@/lib/downloads-server";

export const dynamic = "force-dynamic";

export const metadata = { title: "Firmware Downloads — AZDOME Support" };

export default async function FirmwarePage() {
  const data = await getAllFirmware();
  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Firmware Downloads
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Always running the latest.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Firmware updates are free for the lifetime of every AZDOME camera.
            The easiest way to install is via the AZDOME app over 5GHz Wi-Fi —
            we&apos;ll notify you when a new release is available.
          </p>

          <div className="mt-8 flex flex-wrap items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-sm text-blue-900 md:items-center">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <div>
              <p className="font-semibold tracking-tight">
                Recommended: update via app (zero-touch)
              </p>
              <p className="mt-1 text-blue-800/85">
                Manual updates: download the{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">.bin</code>{" "}
                below, copy to the root of your SD card, reinsert into the
                camera, and power on. Update takes 2–4 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FirmwareList data={data} />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="text-base text-slate-600">
            Looking for the user manual instead?{" "}
            <Link href="/support/manuals" className="font-semibold text-blue-600 hover:text-blue-700">
              Browse manuals →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
