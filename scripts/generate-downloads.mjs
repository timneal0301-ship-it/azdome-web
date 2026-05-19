// Generates real downloadable PDFs (manuals) and binary firmware files
// referenced by lib/downloads.ts. Run with `node scripts/generate-downloads.mjs`.
//
// PDFs use pdf-lib with a consistent AZDOME-branded template per model.
// Firmware files are tiny binary placeholders with an AZDOME header so they
// have realistic file sizes and look like real artifacts when downloaded.

import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { Buffer } from "node:buffer";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  PageSizes,
} from "pdf-lib";

const ROOT = join(process.cwd(), "public", "downloads");

// ─────────────────────────────────────────────────────────────────────
//  Catalog (mirrors lib/downloads.ts)
// ─────────────────────────────────────────────────────────────────────

const FIRMWARE = [
  {
    slug: "m550-pro", model: "M550 Pro 2CH 4K Dash Cam",
    releases: [
      { version: "v2.4.1", sizeKB: 14200 },
      { version: "v2.3.6", sizeKB: 13900 },
      { version: "v2.3.0", sizeKB: 13700 },
    ],
  },
  {
    slug: "m550-max", model: "M550 Max 3CH 4K Dash Cam",
    releases: [
      { version: "v1.8.2", sizeKB: 16100 },
      { version: "v1.7.4", sizeKB: 15700 },
    ],
  },
  {
    slug: "pg17-pro", model: "PG17 Pro 4K Mirror Dash Cam",
    releases: [
      { version: "v3.1.0", sizeKB: 22400 },
      { version: "v3.0.4", sizeKB: 22100 },
    ],
  },
  {
    slug: "s40", model: "S40 4-Channel 4K 360° Dash Cam",
    releases: [{ version: "v1.2.3", sizeKB: 26800 }],
  },
  {
    slug: "m17-pro", model: "M17 Pro 4K Stealth Dash Cam",
    releases: [
      { version: "v1.4.5", sizeKB: 10300 },
      { version: "v1.4.0", sizeKB: 10100 },
    ],
  },
  {
    slug: "m01-pro", model: "M01 Pro 3K Dual-Channel Dash Cam",
    releases: [{ version: "v1.2.0", sizeKB: 8600 }],
  },
];

const MANUALS = [
  { slug: "m550-pro", model: "M550 Pro", langs: ["en", "zh", "ja", "de", "fr", "es"], pages: 24 },
  { slug: "m550-max", model: "M550 Max", langs: ["en", "zh", "ja"], pages: 28 },
  { slug: "pg17-pro", model: "PG17 Pro Mirror", langs: ["en", "zh"], pages: 32 },
  { slug: "s40", model: "S40 360°", langs: ["en"], pages: 36 },
  { slug: "m17-pro", model: "M17 Pro", langs: ["en", "zh"], pages: 20 },
  { slug: "m01-pro", model: "M01 Pro", langs: ["en"], pages: 18 },
];

const LANG_LABEL = {
  en: "English", zh: "Chinese", ja: "Japanese",
  de: "German", fr: "French", es: "Spanish",
};

// ─────────────────────────────────────────────────────────────────────
//  Manual generator — branded, real PDF
// ─────────────────────────────────────────────────────────────────────

const BRAND = {
  navy: rgb(0.058, 0.09, 0.165),    // slate-900
  blue: rgb(0.149, 0.388, 0.922),   // blue-600
  light: rgb(0.973, 0.98, 0.988),   // slate-50
  slate500: rgb(0.392, 0.455, 0.545),
  slate700: rgb(0.2, 0.255, 0.333),
  white: rgb(1, 1, 1),
};

async function buildManual({ slug, model, lang, pages: pageTarget }) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`AZDOME ${model} — User Manual (${LANG_LABEL[lang]})`);
  pdf.setAuthor("AZDOME Inc.");
  pdf.setSubject("User Manual");
  pdf.setKeywords(["AZDOME", "dash cam", model, "manual"]);
  pdf.setCreator("AZDOME Documentation Pipeline");

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // ── Cover ────────────────────────────────────────────────────────
  const cover = pdf.addPage(PageSizes.A4);
  const { width, height } = cover.getSize();

  // Top half: navy block with brand
  cover.drawRectangle({ x: 0, y: height * 0.45, width, height: height * 0.55, color: BRAND.navy });

  // Logo mark (camera-aperture style)
  const cx = 60, cy = height - 80;
  cover.drawCircle({ x: cx, y: cy, size: 14, color: BRAND.white });
  cover.drawCircle({ x: cx, y: cy, size: 8, color: BRAND.navy });
  cover.drawCircle({ x: cx, y: cy, size: 4, color: BRAND.blue });
  cover.drawText("AZDOME", {
    x: cx + 26, y: cy - 6, size: 18, font: helvBold, color: BRAND.white,
  });

  // Hero text
  cover.drawText("USER MANUAL", {
    x: 60, y: height * 0.55, size: 14, font: helvBold,
    color: BRAND.blue, opacity: 1,
  });
  cover.drawText(model, {
    x: 60, y: height * 0.55 - 60, size: 44, font: helvBold, color: BRAND.white,
  });
  cover.drawText(`${LANG_LABEL[lang]} edition`, {
    x: 60, y: height * 0.55 - 90, size: 13, font: helv, color: BRAND.slate500,
  });

  // Decorative camera silhouette (rectangle + lens) bottom-left
  const camY = 140;
  cover.drawRectangle({ x: 60, y: camY, width: 220, height: 80, color: BRAND.navy });
  cover.drawCircle({ x: 110, y: camY + 40, size: 28, color: BRAND.light });
  cover.drawCircle({ x: 110, y: camY + 40, size: 18, color: BRAND.navy });
  cover.drawCircle({ x: 110, y: camY + 40, size: 10, color: BRAND.blue });
  cover.drawText("AZDOME", { x: 160, y: camY + 50, size: 12, font: helvBold, color: BRAND.white });
  cover.drawText(model.toUpperCase(), { x: 160, y: camY + 32, size: 8, font: helv, color: BRAND.slate500 });

  // Footer band
  cover.drawText("azdome.com  ·  support@azdome.com  ·  +1 (415) 555-0148".replace(/·/g, "-"), {
    x: 60, y: 50, size: 9, font: helv, color: BRAND.slate500,
  });
  cover.drawText(`Document ${slug.toUpperCase()}-MAN-${lang.toUpperCase()}-2026.04`, {
    x: 60, y: 35, size: 8, font: helv, color: BRAND.slate500,
  });

  // ── Content pages template ───────────────────────────────────────
  const sections = [
    {
      heading: "Welcome",
      body:
        `Thank you for choosing the AZDOME ${model}. This guide walks you through unpacking, mounting, pairing, and getting the most out of your camera. We've built this manual for skim-reading: every section is short, every step numbered.`,
    },
    {
      heading: "What's in the box",
      body:
        "1. Front camera unit\n2. Rear/cabin camera (where applicable)\n3. 3M adhesive mounts (×2)\n4. Type-C power cable (3.5m)\n5. Trim removal tool\n6. 64GB high-endurance microSD card (pre-formatted)\n7. Alcohol wipe for windshield prep\n8. Quick-Start guide (this document)",
    },
    {
      heading: "Mounting position",
      body:
        "Mount the front camera centered just below the rearview mirror — this gives you the widest, least-obstructed view. For rear cameras, mount near the top of the rear windshield, centered. Clean the glass with the included alcohol wipe before applying the 3M mount.",
    },
    {
      heading: "Installation",
      body:
        "1. Peel the 3M backing and press the mount firmly for 30 seconds.\n2. Let the adhesive cure for 5 minutes before attaching the camera.\n3. Route the Type-C cable along the headliner, down the A-pillar, and under the dashboard.\n4. Plug into your 12V port (or hardwire kit for 24h parking mode).\n5. Start your car — the camera boots in under 3 seconds.",
    },
    {
      heading: "Wi-Fi pairing",
      body:
        "1. Open the AZDOME app on your phone.\n2. Tap \"+ Add device\" → select your model.\n3. The app will prompt you to join the camera's Wi-Fi (5GHz, password printed on the camera body).\n4. Once paired, all settings live in the app and survive firmware updates.",
    },
    {
      heading: "Voice control",
      body:
        "While recording, the camera listens for three commands:\n· \"Lock Video\" — protects the current clip from being overwritten.\n· \"Take Photo\" — saves a still to the SD card.\n· \"Turn on WiFi\" — enables Wi-Fi for app pairing.\nDisable voice control any time in Settings → Audio.",
    },
    {
      heading: "Parking mode",
      body:
        "Parking mode requires the optional Hardwire Kit. Once installed:\n· Choose between Collision Detection (low-power) or 24h Time-Lapse (continuous).\n· The kit's low-voltage cutoff protects your battery (default 11.8V).\n· Adjust the cutoff in Settings → Power if your battery is older.",
    },
    {
      heading: "Firmware updates",
      body:
        "Firmware is updated wirelessly via the AZDOME app — we'll notify you when an update is available. Manual updates: download the .bin file from azdome.com/support/firmware, copy to the root of your SD card, reinsert into the camera, and power on. Update takes 2–4 minutes.",
    },
    {
      heading: "Specifications",
      body:
        `Resolution: 4K (3840×2160) front, 1080p rear (varies by model)\nSensors: Sony STARVIS-grade, Novatek processor\nDisplay: 3.19\" IPS (M550/M550 Max), 12\" touchscreen (PG17 Pro)\nStorage: microSD up to 256GB, 64GB included\nWi-Fi: Dual-band 5GHz / 2.4GHz\nGPS: Built-in (speed, route, lat/long)\nOperating temperature: −4°F to 158°F\nWarranty: 12 months + 24×7 support`,
    },
    {
      heading: "Troubleshooting",
      body:
        "Camera won't power on? Check the Type-C cable is fully seated. Try a different cable. If the issue persists, check your fuse box.\nApp can't find camera? Make sure your phone is on the camera's 5GHz Wi-Fi (not your home network).\nFootage looks blurry at night? Clean the lens; tinted/dirty windshields cut quality. Check firmware is current.",
    },
    {
      heading: "Warranty & support",
      body:
        "Every AZDOME camera includes a 12-month limited warranty against manufacturing defects, plus 30-day returns and 24×7 technical support.\nFile a claim: email warranty@azdome.com with your order number and a brief description of the issue.\nReach support: chat at azdome.com/support, email support@azdome.com, or call +1 (415) 555-0148, Mon–Fri 9–6 PT.",
    },
  ];

  // Render sections — keep adding pages until we hit pageTarget
  let pageIndex = 1;
  let sectionIndex = 0;
  while (pageIndex < pageTarget) {
    const page = pdf.addPage(PageSizes.A4);
    const { width: pw, height: ph } = page.getSize();
    const section = sections[sectionIndex % sections.length];
    sectionIndex++;

    // Header band
    page.drawRectangle({ x: 0, y: ph - 60, width: pw, height: 60, color: BRAND.light });
    page.drawText("AZDOME", { x: 60, y: ph - 38, size: 11, font: helvBold, color: BRAND.navy });
    page.drawText(`${model} -- User Manual`, {
      x: 130, y: ph - 38, size: 10, font: helv, color: BRAND.slate500,
    });
    page.drawText(`${pageIndex + 1} / ${pageTarget}`, {
      x: pw - 110, y: ph - 38, size: 10, font: helv, color: BRAND.slate500,
    });

    // Section number + title
    page.drawText(`${String(sectionIndex).padStart(2, "0")}`, {
      x: 60, y: ph - 130, size: 36, font: helvBold, color: BRAND.blue,
    });
    page.drawText(sanitize(section.heading), {
      x: 60, y: ph - 180, size: 24, font: helvBold, color: BRAND.navy,
    });

    // Accent rule
    page.drawRectangle({
      x: 60, y: ph - 200, width: 40, height: 2, color: BRAND.blue,
    });

    // Body text — wrap into ~70-char lines
    const lines = wrap(section.body, 78);
    lines.forEach((line, i) => {
      page.drawText(line, {
        x: 60, y: ph - 240 - i * 16, size: 11, font: helv, color: BRAND.slate700,
        lineHeight: 16,
      });
    });

    // Footer
    page.drawText("azdome.com/support", { x: 60, y: 40, size: 9, font: helv, color: BRAND.slate500 });
    page.drawText(`Document ${slug.toUpperCase()}-MAN-${lang.toUpperCase()}`, {
      x: pw - 200, y: 40, size: 9, font: helv, color: BRAND.slate500,
    });

    pageIndex++;
  }

  return pdf.save();
}

// Helvetica only supports WinAnsi — replace common Unicode glyphs with
// ASCII-safe equivalents so the PDF generator doesn't choke.
function sanitize(s) {
  return s
    .replace(/→/g, "->")
    .replace(/←/g, "<-")
    .replace(/—/g, "--")
    .replace(/–/g, "-")
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/…/g, "...")
    .replace(/×/g, "x");
}

function wrap(text, maxLen) {
  const out = [];
  for (const rawLine of sanitize(text).split("\n")) {
    if (rawLine.length <= maxLen) {
      out.push(rawLine);
      continue;
    }
    const words = rawLine.split(" ");
    let line = "";
    for (const w of words) {
      if ((line + " " + w).trim().length > maxLen) {
        out.push(line);
        line = w;
      } else {
        line = (line + " " + w).trim();
      }
    }
    if (line) out.push(line);
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────
//  Firmware generator — minimal binary blob with AZDOME header
// ─────────────────────────────────────────────────────────────────────

function buildFirmware({ slug, model, version, sizeKB }) {
  const target = sizeKB * 1024;
  // 80-byte ASCII header followed by repeating pseudo-random pattern to fill.
  const header = Buffer.from(
    `AZDOME-FIRMWARE\nmodel=${model}\nslug=${slug}\nversion=${version}\nbuild=2026\n`.padEnd(80, "\0"),
  );
  const body = Buffer.alloc(Math.max(target - header.length, 0));
  // Deterministic fill: xor-shift based on version/slug seed.
  let seed = Buffer.from(`${slug}${version}`).reduce((a, b) => (a * 31 + b) >>> 0, 1);
  for (let i = 0; i < body.length; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    body[i] = seed & 0xff;
  }
  // Append a magic trailer.
  const trailer = Buffer.from("\nAZDOME-EOF\n", "ascii");
  return Buffer.concat([header, body, trailer]);
}

// ─────────────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────────────

async function main() {
  await mkdir(join(ROOT, "firmware"), { recursive: true });
  await mkdir(join(ROOT, "manuals"), { recursive: true });

  let count = 0;

  // Firmware files
  for (const entry of FIRMWARE) {
    for (const r of entry.releases) {
      const buf = buildFirmware({
        slug: entry.slug,
        model: entry.model,
        version: r.version,
        sizeKB: Math.round(r.sizeKB / 100), // shrink to keep dev folder small
      });
      const out = join(ROOT, "firmware", `${entry.slug}-${r.version}.bin`);
      await writeFile(out, buf);
      console.log("✓ firmware", out, `(${buf.length} bytes)`);
      count++;
    }
  }

  // Manuals
  for (const m of MANUALS) {
    for (const lang of m.langs) {
      const pdfBytes = await buildManual({
        slug: m.slug,
        model: m.model,
        lang,
        pages: Math.min(m.pages, 8), // keep page count modest for dev
      });
      const out = join(ROOT, "manuals", `${m.slug}-${lang}.pdf`);
      await writeFile(out, pdfBytes);
      console.log("✓ manual  ", out, `(${pdfBytes.length} bytes)`);
      count++;
    }
  }

  console.log(`\nGenerated ${count} download artifacts under public/downloads/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
