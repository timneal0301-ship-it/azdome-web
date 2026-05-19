// Generates brand-consistent JPG illustrations for the AZDOME site
// by rendering inline SVG via sharp.
//
//   node scripts/generate-images.mjs
//
// Output paths mirror what the components reference under public/images/...

import sharp from "sharp";
import { mkdirSync } from "fs";
import { dirname } from "path";

const P = {
  slate950: "#020617",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  slate50:  "#f8fafc",
  blue700:  "#1d4ed8",
  blue600:  "#2563eb",
  blue500:  "#3b82f6",
  blue400:  "#60a5fa",
  blue300:  "#93c5fd",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  red500:   "#ef4444",
  emerald500: "#10b981",
};

const FONT = '-apple-system, "Helvetica Neue", "Inter", "Segoe UI", sans-serif';

async function writeJpg(svg, outPath) {
  mkdirSync(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg), { density: 144 })
    .jpeg({ quality: 90, progressive: true, chromaSubsampling: "4:4:4" })
    .toFile(outPath);
  console.log("✓", outPath);
}

// ============================================================
// Shared SVG primitives
// ============================================================

const sharedDefs = `
  <linearGradient id="lightBg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${P.slate50}"/>
    <stop offset="100%" stop-color="${P.slate200}"/>
  </linearGradient>
  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${P.slate800}"/>
    <stop offset="55%" stop-color="${P.slate900}"/>
    <stop offset="100%" stop-color="${P.slate950}"/>
  </linearGradient>
  <linearGradient id="bodyHighlight" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="lensGrad" cx="38%" cy="32%" r="80%">
    <stop offset="0%" stop-color="${P.slate700}"/>
    <stop offset="38%" stop-color="${P.slate900}"/>
    <stop offset="100%" stop-color="#000"/>
  </radialGradient>
  <radialGradient id="lensRing" cx="50%" cy="50%" r="50%">
    <stop offset="80%" stop-color="${P.blue500}" stop-opacity="0"/>
    <stop offset="95%" stop-color="${P.blue500}" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="${P.blue500}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="blueGlow" cx="50%" cy="50%" r="60%">
    <stop offset="0%" stop-color="${P.blue500}" stop-opacity="0.35"/>
    <stop offset="100%" stop-color="${P.blue500}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1e293b"/>
    <stop offset="55%" stop-color="${P.slate900}"/>
    <stop offset="100%" stop-color="${P.slate950}"/>
  </linearGradient>
`;

function brandWordmark(x, y, fontSize = 26, color = "white", subColor = P.slate400, subLabel = "") {
  return `
    <text x="${x}" y="${y}" fill="${color}" font-family='${FONT}' font-weight="800" font-size="${fontSize}" letter-spacing="${fontSize * 0.1}">AZDOME</text>
    ${subLabel ? `<text x="${x}" y="${y + fontSize * 1.25}" fill="${subColor}" font-family='${FONT}' font-weight="500" font-size="${fontSize * 0.5}" letter-spacing="${fontSize * 0.08}">${subLabel}</text>` : ""}
  `;
}

// ============================================================
// Product mockups
// ============================================================

function productFront({ subLabel, accent = P.blue500, lenses = 1, withScreen = false, compact = false }) {
  const W = 1000, H = 1000;
  const cx = W / 2, cy = H / 2;
  const bodyW = compact ? 460 : 560;
  const bodyH = compact ? 240 : 260;
  const bx = cx - bodyW / 2;
  const by = cy - bodyH / 2;

  // Lens positions
  const lensPositions = lenses === 3
    ? [bx + 90, bx + bodyW / 2, bx + bodyW - 90]
    : [bx + 130];
  const lensY = by + bodyH / 2;
  const lensR = lenses === 3 ? 50 : 78;

  // Brand label position (right side)
  const labelX = lenses === 3 ? bx + bodyW / 2 - 60 : bx + 250;
  const labelY = lensY + 8;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>${sharedDefs}</defs>
  <rect width="${W}" height="${H}" fill="url(#lightBg)"/>
  <!-- Subtle ambient glow -->
  <ellipse cx="${cx}" cy="${cy - 60}" rx="380" ry="280" fill="${accent}" opacity="0.06"/>
  <!-- Shadow under product -->
  <ellipse cx="${cx}" cy="${by + bodyH + 70}" rx="${bodyW * 0.55}" ry="22" fill="#000" opacity="0.10"/>
  <!-- Mount tab -->
  <rect x="${cx - 32}" y="${by - 46}" width="64" height="50" rx="8" fill="${P.slate800}"/>
  <rect x="${cx - 22}" y="${by - 50}" width="44" height="8" rx="4" fill="${P.slate700}"/>
  <!-- Body -->
  <rect x="${bx}" y="${by}" width="${bodyW}" height="${bodyH}" rx="26" fill="url(#bodyGrad)"/>
  <!-- Body specular highlight -->
  <rect x="${bx + 8}" y="${by + 6}" width="${bodyW - 16}" height="${bodyH / 2.4}" rx="22" fill="url(#bodyHighlight)"/>
  ${lensPositions.map((lx) => `
    <!-- Lens housing -->
    <circle cx="${lx}" cy="${lensY}" r="${lensR + 8}" fill="${P.slate800}"/>
    <circle cx="${lx}" cy="${lensY}" r="${lensR - 2}" fill="${P.slate950}"/>
    <circle cx="${lx}" cy="${lensY}" r="${lensR - 10}" fill="url(#lensGrad)"/>
    <circle cx="${lx}" cy="${lensY}" r="${lensR + 8}" fill="url(#lensRing)"/>
    <!-- Highlight -->
    <ellipse cx="${lx - lensR * 0.3}" cy="${lensY - lensR * 0.35}" rx="${lensR * 0.32}" ry="${lensR * 0.16}" fill="white" opacity="0.22"/>
    <!-- Aperture ring -->
    <circle cx="${lx}" cy="${lensY}" r="${lensR - 20}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.45"/>
  `).join("")}
  ${withScreen ? `
    <!-- Screen on right side -->
    <rect x="${bx + bodyW - 150}" y="${by + 50}" width="120" height="${bodyH - 100}" rx="6" fill="${P.slate950}"/>
    <rect x="${bx + bodyW - 144}" y="${by + 56}" width="108" height="${bodyH - 112}" rx="3" fill="${P.slate800}" opacity="0.85"/>
    <circle cx="${bx + bodyW - 90}" cy="${by + bodyH / 2}" r="14" fill="${P.blue600}" opacity="0.5"/>
  ` : ""}
  ${!withScreen ? `
    <!-- LED indicators -->
    <circle cx="${bx + bodyW - 60}" cy="${by + 38}" r="5" fill="${P.blue500}"/>
    <circle cx="${bx + bodyW - 42}" cy="${by + 38}" r="5" fill="${P.emerald500}"/>
    <!-- Brand wordmark -->
    ${brandWordmark(labelX, labelY, 28, "white", P.slate400, subLabel)}
    <!-- Microphone grille -->
    <g fill="${P.slate600}" opacity="0.55">
      <circle cx="${bx + bodyW - 80}" cy="${by + bodyH - 30}" r="2"/>
      <circle cx="${bx + bodyW - 68}" cy="${by + bodyH - 30}" r="2"/>
      <circle cx="${bx + bodyW - 56}" cy="${by + bodyH - 30}" r="2"/>
    </g>
  ` : `
    <!-- Brand label for screen variant -->
    ${brandWordmark(bx + 30, by + 38, 18, "white", P.slate400, subLabel)}
  `}
</svg>`;
}

function productSide({ subLabel }) {
  const W = 1000, H = 1000;
  const cx = W / 2, cy = H / 2;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>${sharedDefs}</defs>
  <rect width="${W}" height="${H}" fill="url(#lightBg)"/>
  <ellipse cx="${cx}" cy="${cy + 140}" rx="280" ry="20" fill="#000" opacity="0.10"/>
  <!-- Side profile -->
  <g transform="translate(${cx} ${cy})">
    <path d="M -200 -70 L 180 -70 L 220 -50 L 220 50 L 180 70 L -200 70 Z"
          fill="url(#bodyGrad)" stroke="${P.slate800}" stroke-width="1"/>
    <!-- Lens cylinder -->
    <ellipse cx="-180" cy="0" rx="32" ry="62" fill="${P.slate950}"/>
    <ellipse cx="-180" cy="0" rx="26" ry="52" fill="url(#lensGrad)"/>
    <ellipse cx="-186" cy="-10" rx="6" ry="14" fill="white" opacity="0.22"/>
    <!-- Mount slot -->
    <rect x="-30" y="-95" width="60" height="28" rx="6" fill="${P.slate800}"/>
    <rect x="-20" y="-100" width="40" height="8" rx="4" fill="${P.slate700}"/>
    <!-- Type-C port -->
    <rect x="195" y="-12" width="22" height="10" rx="3" fill="${P.slate950}"/>
    <!-- SD slot -->
    <rect x="120" y="55" width="40" height="6" rx="2" fill="${P.slate950}"/>
    <!-- Brand on side -->
    ${brandWordmark(-90, 8, 22, "white", P.slate400, subLabel)}
  </g>
</svg>`;
}

function productMounted() {
  const W = 1000, H = 1000;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    ${sharedDefs}
    <linearGradient id="windshield" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#cbd5e1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="roadView" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="${P.slate400}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${P.slate300}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#lightBg)"/>
  <!-- Cabin interior frame -->
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" rx="40" fill="${P.slate900}"/>
  <!-- Windshield view (sky to road) -->
  <rect x="100" y="100" width="${W - 200}" height="${H - 240}" rx="20" fill="url(#roadView)"/>
  <!-- Distant road perspective -->
  <path d="M 100 ${H - 140} L 400 350 L 600 350 L ${W - 100} ${H - 140} Z" fill="${P.slate600}" opacity="0.45"/>
  <line x1="500" y1="350" x2="500" y2="${H - 140}" stroke="white" stroke-width="3" stroke-dasharray="14 22" opacity="0.6"/>
  <!-- Sun -->
  <circle cx="700" cy="280" r="40" fill="${P.amber400}" opacity="0.6"/>
  <!-- Rearview mirror -->
  <rect x="430" y="100" width="140" height="40" rx="6" fill="${P.slate800}"/>
  <!-- Camera mounted to windshield -->
  <g transform="translate(500 168)">
    <rect x="-90" y="-12" width="180" height="60" rx="14" fill="url(#bodyGrad)"/>
    <circle cx="-50" cy="18" r="26" fill="${P.slate950}"/>
    <circle cx="-50" cy="18" r="20" fill="url(#lensGrad)"/>
    <ellipse cx="-55" cy="12" rx="5" ry="3" fill="white" opacity="0.3"/>
    <circle cx="-50" cy="18" r="14" fill="none" stroke="${P.blue500}" stroke-width="1" opacity="0.5"/>
    <text x="0" y="22" fill="white" font-family='${FONT}' font-weight="800" font-size="14" letter-spacing="1.5">AZDOME</text>
    <circle cx="60" cy="0" r="3" fill="${P.blue500}"/>
    <circle cx="72" cy="0" r="3" fill="${P.emerald500}"/>
  </g>
  <!-- Dashboard hint at bottom -->
  <rect x="60" y="${H - 130}" width="${W - 120}" height="70" rx="0 0 40 40" fill="${P.slate950}"/>
</svg>`;
}

function productAppView() {
  const W = 1000, H = 1000;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    ${sharedDefs}
    <linearGradient id="phoneScreen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.slate100}"/>
      <stop offset="100%" stop-color="${P.slate50}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#lightBg)"/>
  <ellipse cx="500" cy="860" rx="200" ry="14" fill="#000" opacity="0.10"/>
  <!-- Phone body -->
  <g transform="translate(500 500)">
    <rect x="-160" y="-340" width="320" height="660" rx="48" fill="${P.slate900}"/>
    <rect x="-148" y="-328" width="296" height="636" rx="38" fill="url(#phoneScreen)"/>
    <!-- Notch -->
    <rect x="-50" y="-325" width="100" height="22" rx="11" fill="${P.slate900}"/>
    <!-- App header -->
    <rect x="-148" y="-280" width="296" height="84" fill="${P.slate900}"/>
    <text x="-128" y="-238" fill="white" font-family='${FONT}' font-weight="800" font-size="18" letter-spacing="0.5">AZDOME</text>
    <circle cx="120" cy="-244" r="14" fill="${P.blue600}"/>
    <!-- Live preview tile (dashcam-feed style) -->
    <rect x="-130" y="-180" width="260" height="160" rx="14" fill="${P.slate800}"/>
    <path d="M -130 -40 L 0 -120 L 130 -40 Z" fill="${P.slate700}" opacity="0.6" transform="translate(0,-60)"/>
    <text x="0" y="-130" fill="white" font-family='${FONT}' font-size="11" font-weight="600" text-anchor="middle">LIVE · 4K</text>
    <circle cx="-110" cy="-160" r="5" fill="${P.red500}"/>
    <!-- Recent clips -->
    <text x="-128" y="20" fill="${P.slate500}" font-family='${FONT}' font-weight="600" font-size="11" letter-spacing="1">RECENT CLIPS</text>
    ${[0, 1, 2].map((i) => `
      <rect x="-130" y="${40 + i * 70}" width="260" height="56" rx="10" fill="${P.slate100}"/>
      <rect x="-118" y="${50 + i * 70}" width="36" height="36" rx="6" fill="${P.slate300}"/>
      <text x="-72" y="${64 + i * 70}" fill="${P.slate900}" font-family='${FONT}' font-weight="600" font-size="12">Clip · ${["Apr 28", "Apr 27", "Apr 26"][i]}</text>
      <text x="-72" y="${80 + i * 70}" fill="${P.slate500}" font-family='${FONT}' font-size="10">12:0${i + 4} · 4K · 38MB</text>
    `).join("")}
    <!-- Bottom nav -->
    <rect x="-148" y="240" width="296" height="68" fill="${P.slate900}"/>
    ${["Live", "Library", "Settings"].map((label, i) => `
      <text x="${-90 + i * 90}" y="280" fill="${i === 0 ? "white" : P.slate500}" font-family='${FONT}' font-size="10" font-weight="600" text-anchor="middle">${label}</text>
    `).join("")}
  </g>
</svg>`;
}

function productNightSample() {
  const W = 1000, H = 1000;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    ${sharedDefs}
    <radialGradient id="headlights" cx="50%" cy="78%" r="55%">
      <stop offset="0%" stop-color="${P.amber400}" stop-opacity="0.45"/>
      <stop offset="60%" stop-color="${P.amber500}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#nightSky)"/>
  <!-- Road perspective -->
  <path d="M 0 ${H} L 400 ${H * 0.5} L 600 ${H * 0.5} L ${W} ${H} Z" fill="${P.slate950}"/>
  <!-- Lane markers -->
  <g stroke="${P.amber400}" stroke-width="6" opacity="0.55">
    <line x1="500" y1="${H * 0.55}" x2="500" y2="${H * 0.6}"/>
    <line x1="500" y1="${H * 0.68}" x2="500" y2="${H * 0.76}"/>
    <line x1="500" y1="${H * 0.84}" x2="500" y2="${H * 0.95}"/>
  </g>
  <!-- Distant car taillights -->
  <circle cx="460" cy="${H * 0.52}" r="5" fill="${P.red500}"/>
  <circle cx="540" cy="${H * 0.52}" r="5" fill="${P.red500}"/>
  <!-- Streetlight glow -->
  <circle cx="180" cy="380" r="80" fill="${P.amber400}" opacity="0.18"/>
  <circle cx="820" cy="380" r="80" fill="${P.amber400}" opacity="0.18"/>
  <!-- Stars -->
  <g fill="white" opacity="0.6">
    <circle cx="120" cy="120" r="1.2"/>
    <circle cx="320" cy="80" r="1"/>
    <circle cx="540" cy="60" r="1.5"/>
    <circle cx="780" cy="100" r="1"/>
    <circle cx="900" cy="180" r="1.2"/>
    <circle cx="700" cy="220" r="0.8"/>
  </g>
  <!-- Headlight wash -->
  <rect width="${W}" height="${H}" fill="url(#headlights)"/>
  <!-- HUD overlay -->
  <g opacity="0.85">
    <rect x="40" y="40" width="180" height="46" rx="8" fill="${P.slate950}" opacity="0.65"/>
    <text x="60" y="69" fill="white" font-family='${FONT}' font-weight="700" font-size="14" letter-spacing="1">4K · NIGHT</text>
    <circle cx="55" cy="63" r="5" fill="${P.red500}"/>
  </g>
</svg>`;
}

function megaCategory({ title, subtitle, type }) {
  const W = 800, H = 600;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>${sharedDefs}</defs>
  <rect width="${W}" height="${H}" fill="url(#lightBg)"/>
  <ellipse cx="400" cy="430" rx="200" ry="14" fill="#000" opacity="0.08"/>
  <g transform="translate(400 320)">
    ${type === "dual" ? `
      <!-- Front cam -->
      <rect x="-220" y="-30" width="200" height="80" rx="14" fill="url(#bodyGrad)"/>
      <circle cx="-180" cy="10" r="26" fill="${P.slate950}"/>
      <circle cx="-180" cy="10" r="20" fill="url(#lensGrad)"/>
      <text x="-130" y="14" fill="white" font-family='${FONT}' font-weight="700" font-size="12" letter-spacing="1">AZDOME</text>
      <!-- Rear cam -->
      <rect x="20" y="-15" width="140" height="50" rx="10" fill="url(#bodyGrad)"/>
      <circle cx="50" cy="10" r="16" fill="${P.slate950}"/>
      <circle cx="50" cy="10" r="12" fill="url(#lensGrad)"/>
      <text x="78" y="14" fill="white" font-family='${FONT}' font-weight="700" font-size="9" letter-spacing="0.5">REAR</text>
      <line x1="-25" y1="10" x2="15" y2="10" stroke="${P.slate400}" stroke-width="2" stroke-dasharray="4 4"/>
    ` : type === "stealth" ? `
      <!-- Stealth slim profile -->
      <ellipse cx="0" cy="20" rx="170" ry="32" fill="url(#bodyGrad)"/>
      <circle cx="-110" cy="20" r="18" fill="${P.slate950}"/>
      <circle cx="-110" cy="20" r="13" fill="url(#lensGrad)"/>
      <text x="-50" y="24" fill="white" font-family='${FONT}' font-weight="700" font-size="11" letter-spacing="1">AZDOME · STEALTH</text>
    ` : `
      <!-- Cam with screen -->
      <rect x="-180" y="-50" width="360" height="110" rx="14" fill="url(#bodyGrad)"/>
      <circle cx="-130" cy="6" r="34" fill="${P.slate950}"/>
      <circle cx="-130" cy="6" r="26" fill="url(#lensGrad)"/>
      <rect x="-40" y="-30" width="190" height="70" rx="6" fill="${P.slate950}"/>
      <rect x="-32" y="-22" width="174" height="54" rx="3" fill="${P.slate800}"/>
      <circle cx="55" cy="6" r="14" fill="${P.blue600}" opacity="0.45"/>
      <text x="-32" y="55" fill="white" font-family='${FONT}' font-weight="700" font-size="11" letter-spacing="1">AZDOME</text>
    `}
  </g>
  <!-- Caption -->
  <text x="40" y="80" fill="${P.slate400}" font-family='${FONT}' font-weight="600" font-size="13" letter-spacing="2">${subtitle.toUpperCase()}</text>
  <text x="40" y="120" fill="${P.slate900}" font-family='${FONT}' font-weight="800" font-size="34" letter-spacing="-0.5">${title}</text>
</svg>`;
}

// ============================================================
// Lifestyle / scenario illustrations
// ============================================================

function nightDrive({ w = 1920, h = 1080, withHud = false }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <radialGradient id="hl" cx="50%" cy="${(h * 0.78) / h * 100}%" r="55%">
      <stop offset="0%" stop-color="${P.amber400}" stop-opacity="0.4"/>
      <stop offset="55%" stop-color="${P.amber500}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#nightSky)"/>
  <!-- City skyline -->
  <g fill="${P.slate950}" opacity="0.95">
    ${Array.from({ length: 14 }, (_, i) => {
      const x = i * (w / 14);
      const buildingH = 90 + ((i * 53) % 130);
      return `<rect x="${x}" y="${h * 0.5 - buildingH}" width="${w / 14 + 2}" height="${buildingH + 20}"/>`;
    }).join("")}
  </g>
  <!-- Building windows -->
  <g fill="${P.amber400}" opacity="0.45">
    ${Array.from({ length: 60 }, () => {
      const x = Math.random() * w;
      const y = h * 0.45 - Math.random() * 130;
      return `<rect x="${x}" y="${y}" width="3" height="4"/>`;
    }).join("")}
  </g>
  <!-- Road -->
  <path d="M 0 ${h} L ${w * 0.42} ${h * 0.55} L ${w * 0.58} ${h * 0.55} L ${w} ${h} Z" fill="${P.slate950}"/>
  <!-- Lane markers -->
  <g stroke="${P.amber400}" stroke-width="8" opacity="0.6">
    <line x1="${w / 2}" y1="${h * 0.6}" x2="${w / 2}" y2="${h * 0.65}"/>
    <line x1="${w / 2}" y1="${h * 0.72}" x2="${w / 2}" y2="${h * 0.8}"/>
    <line x1="${w / 2}" y1="${h * 0.88}" x2="${w / 2}" y2="${h}"/>
  </g>
  <!-- Tail lights -->
  <circle cx="${w * 0.46}" cy="${h * 0.57}" r="5" fill="${P.red500}"/>
  <circle cx="${w * 0.54}" cy="${h * 0.57}" r="5" fill="${P.red500}"/>
  <!-- Streetlights -->
  <circle cx="${w * 0.2}" cy="${h * 0.42}" r="90" fill="${P.amber400}" opacity="0.22"/>
  <circle cx="${w * 0.8}" cy="${h * 0.42}" r="90" fill="${P.amber400}" opacity="0.22"/>
  <!-- Stars -->
  <g fill="white" opacity="0.55">
    ${Array.from({ length: 35 }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h * 0.4;
      const r = Math.random() * 1.3 + 0.3;
      return `<circle cx="${x}" cy="${y}" r="${r}"/>`;
    }).join("")}
  </g>
  <rect width="${w}" height="${h}" fill="url(#hl)"/>
  ${withHud ? `
    <g>
      <rect x="40" y="40" width="240" height="56" rx="10" fill="${P.slate950}" opacity="0.75"/>
      <circle cx="68" cy="68" r="7" fill="${P.red500}"/>
      <text x="90" y="74" fill="white" font-family='${FONT}' font-weight="700" font-size="16" letter-spacing="1.5">REC · 4K · 30FPS</text>
    </g>
  ` : ""}
</svg>`;
}

function familyTrip({ w = 1400, h = 1200 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.blue300}"/>
      <stop offset="60%" stop-color="${P.blue400}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${P.blue500}" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.emerald500}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#065f46" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h * 0.62}" fill="url(#sky)"/>
  <rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="url(#ground)"/>
  <!-- Sun -->
  <circle cx="${w * 0.78}" cy="${h * 0.18}" r="80" fill="${P.amber400}" opacity="0.85"/>
  <!-- Clouds -->
  <g fill="white" opacity="0.85">
    <ellipse cx="${w * 0.2}" cy="${h * 0.18}" rx="100" ry="22"/>
    <ellipse cx="${w * 0.32}" cy="${h * 0.22}" rx="80" ry="18"/>
    <ellipse cx="${w * 0.55}" cy="${h * 0.12}" rx="120" ry="26"/>
  </g>
  <!-- Mountains -->
  <path d="M 0 ${h * 0.62} L ${w * 0.25} ${h * 0.32} L ${w * 0.5} ${h * 0.5} L ${w * 0.72} ${h * 0.28} L ${w} ${h * 0.55} L ${w} ${h * 0.62} Z" fill="${P.slate600}" opacity="0.65"/>
  <path d="M 0 ${h * 0.62} L ${w * 0.18} ${h * 0.46} L ${w * 0.35} ${h * 0.55} L ${w * 0.58} ${h * 0.4} L ${w * 0.8} ${h * 0.5} L ${w} ${h * 0.6} L ${w} ${h * 0.62} Z" fill="${P.slate700}" opacity="0.8"/>
  <!-- Road -->
  <path d="M ${w * 0.3} ${h * 0.62} L ${w * 0.45} ${h * 0.62} L ${w * 0.58} ${h} L 0 ${h} Z" fill="${P.slate800}"/>
  <line x1="${w * 0.35}" y1="${h * 0.7}" x2="${w * 0.14}" y2="${h}" stroke="white" stroke-width="6" stroke-dasharray="20 30" opacity="0.7"/>
  <!-- Car (SUV silhouette) -->
  <g transform="translate(${w * 0.28} ${h * 0.84})">
    <rect x="-110" y="-50" width="220" height="60" rx="14" fill="${P.slate900}"/>
    <path d="M -90 -50 L -60 -90 L 60 -90 L 90 -50 Z" fill="${P.slate800}"/>
    <rect x="-80" y="-82" width="60" height="34" rx="4" fill="${P.slate950}" opacity="0.7"/>
    <rect x="20" y="-82" width="60" height="34" rx="4" fill="${P.slate950}" opacity="0.7"/>
    <circle cx="-70" cy="20" r="22" fill="${P.slate950}"/>
    <circle cx="-70" cy="20" r="10" fill="${P.slate700}"/>
    <circle cx="70" cy="20" r="22" fill="${P.slate950}"/>
    <circle cx="70" cy="20" r="10" fill="${P.slate700}"/>
    <!-- Dash cam glint on windshield -->
    <rect x="-10" y="-78" width="20" height="6" rx="2" fill="${P.blue500}"/>
  </g>
</svg>`;
}

function rideshareScene({ w = 900, h = 700 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <linearGradient id="city" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="${P.blue600}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${P.slate900}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#city)"/>
  <!-- Skyline -->
  <g fill="${P.slate950}">
    ${Array.from({ length: 8 }, (_, i) => {
      const x = i * (w / 8);
      const buildingH = 120 + ((i * 71) % 160);
      return `<rect x="${x}" y="${h * 0.55 - buildingH}" width="${w / 8 + 2}" height="${buildingH + 40}"/>`;
    }).join("")}
  </g>
  <!-- Windows -->
  <g fill="${P.amber400}" opacity="0.6">
    ${Array.from({ length: 50 }, () => {
      const x = Math.random() * w;
      const y = h * 0.5 - Math.random() * 200;
      return `<rect x="${x}" y="${y}" width="3" height="4"/>`;
    }).join("")}
  </g>
  <!-- Street -->
  <rect y="${h * 0.65}" width="${w}" height="${h * 0.35}" fill="${P.slate800}"/>
  <line x1="0" y1="${h * 0.82}" x2="${w}" y2="${h * 0.82}" stroke="${P.amber400}" stroke-width="4" stroke-dasharray="30 20" opacity="0.7"/>
  <!-- Rideshare car -->
  <g transform="translate(${w * 0.5} ${h * 0.85})">
    <rect x="-120" y="-46" width="240" height="60" rx="16" fill="${P.amber400}"/>
    <path d="M -100 -46 L -70 -86 L 70 -86 L 100 -46 Z" fill="${P.amber500}"/>
    <rect x="-90" y="-78" width="60" height="32" rx="4" fill="${P.slate800}" opacity="0.85"/>
    <rect x="30" y="-78" width="60" height="32" rx="4" fill="${P.slate800}" opacity="0.85"/>
    <circle cx="-78" cy="22" r="22" fill="${P.slate950}"/>
    <circle cx="78" cy="22" r="22" fill="${P.slate950}"/>
    <!-- Roof sign -->
    <rect x="-30" y="-110" width="60" height="24" rx="3" fill="${P.slate900}"/>
    <text x="0" y="-94" fill="white" font-family='${FONT}' font-weight="800" font-size="11" letter-spacing="1" text-anchor="middle">RIDE</text>
    <!-- Dash cam -->
    <rect x="-10" y="-74" width="20" height="6" rx="2" fill="${P.blue500}"/>
  </g>
</svg>`;
}

function parkingScene({ w = 900, h = 700 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>${sharedDefs}</defs>
  <rect width="${w}" height="${h}" fill="${P.slate950}"/>
  <!-- Garage perspective -->
  <path d="M ${w * 0.15} ${h * 0.2} L ${w * 0.85} ${h * 0.2} L ${w} ${h * 0.95} L 0 ${h * 0.95} Z" fill="${P.slate800}"/>
  <path d="M ${w * 0.25} ${h * 0.3} L ${w * 0.75} ${h * 0.3} L ${w * 0.88} ${h * 0.85} L ${w * 0.12} ${h * 0.85} Z" fill="${P.slate900}"/>
  <!-- Parking lines -->
  <g stroke="${P.amber400}" stroke-width="3" opacity="0.6">
    <line x1="${w * 0.3}" y1="${h * 0.85}" x2="${w * 0.38}" y2="${h * 0.4}"/>
    <line x1="${w * 0.7}" y1="${h * 0.85}" x2="${w * 0.62}" y2="${h * 0.4}"/>
  </g>
  <!-- Parked car -->
  <g transform="translate(${w * 0.5} ${h * 0.68})">
    <rect x="-130" y="-30" width="260" height="50" rx="14" fill="${P.slate700}"/>
    <path d="M -110 -30 L -80 -68 L 80 -68 L 110 -30 Z" fill="${P.slate600}"/>
    <rect x="-100" y="-62" width="60" height="30" rx="4" fill="${P.slate950}" opacity="0.7"/>
    <rect x="40" y="-62" width="60" height="30" rx="4" fill="${P.slate950}" opacity="0.7"/>
    <circle cx="-80" cy="26" r="22" fill="${P.slate950}"/>
    <circle cx="80" cy="26" r="22" fill="${P.slate950}"/>
    <!-- Dash cam recording (red dot) -->
    <rect x="-12" y="-60" width="24" height="6" rx="2" fill="${P.slate900}"/>
    <circle cx="0" cy="-57" r="2.5" fill="${P.red500}"/>
  </g>
  <!-- Surveillance indicator -->
  <g transform="translate(60 60)">
    <circle r="12" fill="${P.red500}"/>
    <text x="24" y="6" fill="white" font-family='${FONT}' font-weight="700" font-size="14" letter-spacing="1.5">24H · REC</text>
  </g>
  <!-- Camera signal lines -->
  <g stroke="${P.blue400}" stroke-width="1" opacity="0.4" fill="none">
    <path d="M ${w * 0.5} ${h * 0.6} Q ${w * 0.5} ${h * 0.5} ${w * 0.3} ${h * 0.45}"/>
    <path d="M ${w * 0.5} ${h * 0.6} Q ${w * 0.5} ${h * 0.5} ${w * 0.7} ${h * 0.45}"/>
  </g>
</svg>`;
}

function featureCard({ w = 1200, h = 1400, theme }) {
  if (theme === "night") return nightDrive({ w, h, withHud: true });
  if (theme === "wifi") {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <linearGradient id="wifiBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.blue600}"/>
      <stop offset="100%" stop-color="${P.blue700}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wifiBg)"/>
  <!-- WiFi rings -->
  <g transform="translate(${w / 2} ${h / 2})" fill="none" stroke="white" stroke-linecap="round">
    <circle r="60" stroke-width="3" opacity="0.95"/>
    <path d="M -130 -20 A 130 130 0 0 1 130 -20" stroke-width="3" opacity="0.7"/>
    <path d="M -200 -50 A 200 200 0 0 1 200 -50" stroke-width="3" opacity="0.5"/>
    <path d="M -270 -80 A 270 270 0 0 1 270 -80" stroke-width="3" opacity="0.3"/>
  </g>
  <!-- Phone -->
  <g transform="translate(${w / 2 - 220} ${h / 2 + 240})">
    <rect width="120" height="220" rx="22" fill="${P.slate950}"/>
    <rect x="6" y="6" width="108" height="208" rx="18" fill="${P.slate900}"/>
    <rect x="20" y="60" width="80" height="6" rx="2" fill="${P.blue400}"/>
    <rect x="20" y="76" width="60" height="4" rx="2" fill="${P.slate600}"/>
  </g>
  <!-- Dashcam -->
  <g transform="translate(${w / 2 + 100} ${h / 2 + 240})">
    <rect x="0" y="60" width="200" height="80" rx="14" fill="${P.slate950}"/>
    <circle cx="40" cy="100" r="22" fill="${P.slate800}"/>
    <circle cx="40" cy="100" r="14" fill="${P.slate950}"/>
    <text x="100" y="106" fill="white" font-family='${FONT}' font-size="12" font-weight="700" letter-spacing="1">AZDOME</text>
  </g>
  <text x="${w / 2}" y="${h - 110}" fill="white" font-family='${FONT}' font-weight="800" font-size="44" letter-spacing="-0.5" text-anchor="middle">5GHz WiFi</text>
  <text x="${w / 2}" y="${h - 60}" fill="white" opacity="0.7" font-family='${FONT}' font-weight="500" font-size="18" letter-spacing="0.5" text-anchor="middle">Stream 4K in real time</text>
</svg>`;
  }
  // ADAS
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>${sharedDefs}</defs>
  <rect width="${w}" height="${h}" fill="${P.slate900}"/>
  <!-- Road perspective with detection boxes -->
  <path d="M 0 ${h} L ${w * 0.4} ${h * 0.4} L ${w * 0.6} ${h * 0.4} L ${w} ${h} Z" fill="${P.slate800}"/>
  <line x1="${w / 2}" y1="${h * 0.5}" x2="${w / 2}" y2="${h}" stroke="${P.amber400}" stroke-width="6" stroke-dasharray="30 30" opacity="0.6"/>
  <!-- Detection boxes -->
  <g fill="none" stroke="${P.blue400}" stroke-width="3">
    <rect x="${w * 0.3}" y="${h * 0.5}" width="180" height="120" rx="4"/>
    <rect x="${w * 0.7 - 80}" y="${h * 0.6}" width="120" height="100" rx="4"/>
  </g>
  <text x="${w * 0.3}" y="${h * 0.5 - 10}" fill="${P.blue400}" font-family='${FONT}' font-size="14" font-weight="700">VEHICLE · 18m</text>
  <text x="${w * 0.7 - 80}" y="${h * 0.6 - 10}" fill="${P.blue400}" font-family='${FONT}' font-size="14" font-weight="700">CYCLIST · 9m</text>
  <!-- Front car silhouette -->
  <g transform="translate(${w * 0.4} ${h * 0.62})">
    <rect width="180" height="80" rx="14" fill="${P.slate950}"/>
    <circle cx="40" cy="76" r="14" fill="${P.slate950}"/>
    <circle cx="140" cy="76" r="14" fill="${P.slate950}"/>
    <circle cx="40" cy="40" r="6" fill="${P.red500}"/>
    <circle cx="140" cy="40" r="6" fill="${P.red500}"/>
  </g>
  <!-- HUD warning -->
  <g transform="translate(${w / 2} 200)">
    <rect x="-140" y="-30" width="280" height="60" rx="14" fill="${P.red500}" opacity="0.95"/>
    <text x="0" y="8" fill="white" font-family='${FONT}' font-weight="800" font-size="20" letter-spacing="1.2" text-anchor="middle">FCW · BRAKE</text>
  </g>
  <text x="${w / 2}" y="${h - 80}" fill="white" font-family='${FONT}' font-weight="800" font-size="44" letter-spacing="-0.5" text-anchor="middle">AI ADAS</text>
</svg>`;
}

function aplusContent({ w = 1400, h = 1100, type }) {
  if (type === "4k") {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>${sharedDefs}</defs>
  <rect width="${w}" height="${h}" fill="${P.slate950}"/>
  <!-- Road -->
  <path d="M 0 ${h} L ${w * 0.4} ${h * 0.4} L ${w * 0.6} ${h * 0.4} L ${w} ${h} Z" fill="${P.slate900}"/>
  <line x1="${w / 2}" y1="${h * 0.5}" x2="${w / 2}" y2="${h}" stroke="${P.amber400}" stroke-width="6" stroke-dasharray="30 30" opacity="0.5"/>
  <!-- Distant car with visible license plate -->
  <g transform="translate(${w / 2} ${h * 0.5})">
    <rect x="-50" y="-30" width="100" height="40" rx="6" fill="${P.slate800}"/>
    <rect x="-30" y="-12" width="60" height="20" rx="2" fill="${P.slate100}"/>
    <text x="0" y="4" fill="${P.slate900}" font-family='${FONT}' font-size="14" font-weight="800" text-anchor="middle">7AZD 550</text>
  </g>
  <!-- Magnifier -->
  <g transform="translate(${w * 0.78} ${h * 0.4})">
    <circle r="170" fill="none" stroke="${P.blue500}" stroke-width="3"/>
    <circle r="160" fill="${P.slate900}"/>
    <rect x="-90" y="-30" width="180" height="60" rx="6" fill="${P.slate100}"/>
    <text x="0" y="14" fill="${P.slate900}" font-family='${FONT}' font-size="36" font-weight="800" text-anchor="middle">7AZD 550</text>
    <line x1="120" y1="120" x2="200" y2="200" stroke="${P.blue500}" stroke-width="6" stroke-linecap="round"/>
  </g>
  <!-- 4K badge -->
  <g transform="translate(60 60)">
    <rect width="120" height="46" rx="10" fill="${P.blue600}"/>
    <text x="60" y="32" fill="white" font-family='${FONT}' font-weight="900" font-size="22" letter-spacing="2" text-anchor="middle">4K UHD</text>
  </g>
</svg>`;
  }
  if (type === "parking") return parkingScene({ w, h });
  // app
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <linearGradient id="appBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.blue500}"/>
      <stop offset="100%" stop-color="${P.blue700}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#appBg)"/>
  <!-- Phone center -->
  <g transform="translate(${w / 2} ${h / 2})">
    <rect x="-160" y="-340" width="320" height="660" rx="48" fill="${P.slate950}"/>
    <rect x="-148" y="-328" width="296" height="636" rx="38" fill="${P.slate900}"/>
    <rect x="-50" y="-325" width="100" height="22" rx="11" fill="${P.slate950}"/>
    <rect x="-128" y="-260" width="60" height="6" rx="3" fill="white" opacity="0.8"/>
    <rect x="-128" y="-244" width="120" height="4" rx="2" fill="white" opacity="0.4"/>
    <!-- Video preview -->
    <rect x="-130" y="-220" width="260" height="160" rx="14" fill="${P.slate800}"/>
    <circle cx="0" cy="-140" r="22" fill="white" opacity="0.85"/>
    <path d="M -8 -148 L 12 -140 L -8 -132 Z" fill="${P.slate900}"/>
    <!-- Buttons -->
    <rect x="-130" y="-30" width="120" height="44" rx="22" fill="${P.blue500}"/>
    <text x="-70" y="-1" fill="white" font-family='${FONT}' font-weight="700" font-size="14" text-anchor="middle">Download</text>
    <rect x="10" y="-30" width="120" height="44" rx="22" fill="${P.slate800}"/>
    <text x="70" y="-1" fill="white" font-family='${FONT}' font-weight="700" font-size="14" text-anchor="middle">Share</text>
    <!-- List items -->
    ${[0, 1, 2].map((i) => `
      <rect x="-130" y="${40 + i * 60}" width="260" height="48" rx="10" fill="${P.slate800}"/>
      <circle cx="-100" cy="${64 + i * 60}" r="14" fill="${P.blue500}"/>
      <rect x="-76" y="${56 + i * 60}" width="120" height="6" rx="3" fill="white"/>
      <rect x="-76" y="${68 + i * 60}" width="80" height="4" rx="2" fill="white" opacity="0.5"/>
    `).join("")}
  </g>
</svg>`;
}

function whatsInBox({ w = 1400, h = 1100 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>${sharedDefs}</defs>
  <rect width="${w}" height="${h}" fill="${P.slate100}"/>
  <!-- Box outline -->
  <rect x="60" y="60" width="${w - 120}" height="${h - 120}" rx="32" fill="white" stroke="${P.slate200}" stroke-width="2"/>
  <!-- Hero camera -->
  <g transform="translate(${w * 0.32} ${h * 0.42})">
    <rect x="-180" y="-70" width="360" height="140" rx="22" fill="url(#bodyGrad)"/>
    <circle cx="-100" cy="0" r="55" fill="${P.slate950}"/>
    <circle cx="-100" cy="0" r="42" fill="url(#lensGrad)"/>
    <circle cx="-100" cy="0" r="30" fill="none" stroke="${P.blue500}" stroke-width="1.5" opacity="0.5"/>
    <text x="40" y="6" fill="white" font-family='${FONT}' font-weight="800" font-size="22" letter-spacing="2">AZDOME</text>
    <text x="40" y="32" fill="${P.slate400}" font-family='${FONT}' font-weight="500" font-size="12" letter-spacing="1.5">M550 PRO · 4K</text>
  </g>
  <!-- Rear cam (smaller) -->
  <g transform="translate(${w * 0.7} ${h * 0.3})">
    <rect x="-80" y="-30" width="160" height="60" rx="10" fill="url(#bodyGrad)"/>
    <circle cx="-50" cy="0" r="22" fill="${P.slate950}"/>
    <circle cx="-50" cy="0" r="14" fill="url(#lensGrad)"/>
    <text x="20" y="6" fill="white" font-family='${FONT}' font-weight="700" font-size="11" letter-spacing="1">REAR · 1080p</text>
  </g>
  <!-- Cable -->
  <path d="M ${w * 0.55} ${h * 0.65} Q ${w * 0.7} ${h * 0.55} ${w * 0.85} ${h * 0.62} T ${w * 0.95} ${h * 0.78}" stroke="${P.slate900}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="${w * 0.93}" y="${h * 0.76}" width="40" height="14" rx="3" fill="${P.slate900}"/>
  <!-- Mounts -->
  <g transform="translate(${w * 0.2} ${h * 0.75})">
    <rect x="-40" y="-12" width="80" height="24" rx="6" fill="${P.slate200}"/>
    <rect x="-32" y="-6" width="64" height="12" rx="3" fill="${P.slate100}"/>
    <text y="36" fill="${P.slate500}" font-family='${FONT}' font-size="11" font-weight="600" text-anchor="middle">3M MOUNT ×2</text>
  </g>
  <!-- Trim tool -->
  <g transform="translate(${w * 0.4} ${h * 0.78})">
    <path d="M -50 -6 L 50 -6 L 50 6 L 25 12 L -50 6 Z" fill="${P.slate300}"/>
    <text y="32" fill="${P.slate500}" font-family='${FONT}' font-size="11" font-weight="600" text-anchor="middle">TRIM TOOL</text>
  </g>
  <!-- Guide -->
  <g transform="translate(${w * 0.6} ${h * 0.82})">
    <rect x="-30" y="-30" width="60" height="50" rx="3" fill="white" stroke="${P.slate300}" stroke-width="1.5"/>
    <line x1="-22" y1="-18" x2="22" y2="-18" stroke="${P.slate400}" stroke-width="1"/>
    <line x1="-22" y1="-10" x2="22" y2="-10" stroke="${P.slate400}" stroke-width="1"/>
    <line x1="-22" y1="-2" x2="14" y2="-2" stroke="${P.slate400}" stroke-width="1"/>
    <text y="40" fill="${P.slate500}" font-family='${FONT}' font-size="11" font-weight="600" text-anchor="middle">QUICK-START</text>
  </g>
</svg>`;
}

function avatarSvg({ initials, hue }) {
  const W = 200, H = 200;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 80%, 55%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 35}, 70%, 35%)"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#avatarBg)"/>
  <text x="${W / 2}" y="${H / 2 + 28}" fill="white" font-family='${FONT}' font-weight="700" font-size="80" letter-spacing="-2" text-anchor="middle">${initials}</text>
</svg>`;
}

function reviewPhoto({ theme }) {
  const W = 400, H = 400;
  if (theme === "interior") {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>${sharedDefs}</defs>
  <rect width="${W}" height="${H}" fill="${P.slate900}"/>
  <!-- Dashboard -->
  <rect y="240" width="${W}" height="160" fill="${P.slate950}"/>
  <!-- Steering wheel -->
  <circle cx="200" cy="320" r="56" fill="none" stroke="${P.slate800}" stroke-width="14"/>
  <line x1="160" y1="320" x2="240" y2="320" stroke="${P.slate800}" stroke-width="10"/>
  <line x1="200" y1="290" x2="200" y2="340" stroke="${P.slate800}" stroke-width="6"/>
  <!-- Cluster -->
  <circle cx="120" cy="240" r="32" fill="${P.slate800}"/>
  <circle cx="280" cy="240" r="32" fill="${P.slate800}"/>
  <!-- Dash cam on windshield -->
  <g transform="translate(200 80)">
    <rect x="-50" y="-10" width="100" height="30" rx="6" fill="${P.slate950}"/>
    <circle cx="-25" cy="5" r="10" fill="url(#lensGrad)"/>
    <circle cx="20" cy="0" r="3" fill="${P.red500}"/>
  </g>
  <!-- Windshield view -->
  <rect x="40" y="40" width="320" height="140" rx="20" fill="${P.blue400}" opacity="0.3"/>
  <path d="M 40 180 L 200 100 L 360 180 Z" fill="${P.slate950}" opacity="0.6"/>
</svg>`;
  }
  // exterior dent
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>${sharedDefs}</defs>
  <rect width="${W}" height="${H}" fill="${P.slate200}"/>
  <!-- Car back -->
  <rect x="60" y="120" width="280" height="160" rx="20" fill="${P.slate700}"/>
  <rect x="80" y="140" width="240" height="80" rx="8" fill="${P.slate950}" opacity="0.4"/>
  <!-- Dent -->
  <ellipse cx="280" cy="220" rx="28" ry="14" fill="${P.slate800}" opacity="0.7"/>
  <path d="M 256 215 Q 280 200 304 215" stroke="${P.slate900}" stroke-width="2" fill="none"/>
  <!-- License plate -->
  <rect x="170" y="240" width="60" height="22" rx="2" fill="white"/>
  <text x="200" y="256" fill="${P.slate900}" font-family='${FONT}' font-size="11" font-weight="800" text-anchor="middle">7AZD 550</text>
  <!-- Wheels -->
  <circle cx="110" cy="290" r="20" fill="${P.slate950}"/>
  <circle cx="290" cy="290" r="20" fill="${P.slate950}"/>
  <!-- Annotation -->
  <circle cx="280" cy="220" r="32" fill="none" stroke="${P.red500}" stroke-width="3"/>
  <text x="320" y="180" fill="${P.red500}" font-family='${FONT}' font-size="12" font-weight="800">CAPTURED 02:14 AM</text>
</svg>`;
}

function aboutHero({ w = 1400, h = 1100 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    ${sharedDefs}
    <linearGradient id="studio" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${P.slate800}"/>
      <stop offset="100%" stop-color="${P.slate950}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#studio)"/>
  <!-- Floor -->
  <rect y="${h * 0.7}" width="${w}" height="${h * 0.3}" fill="${P.slate950}"/>
  <!-- Spotlights -->
  <ellipse cx="${w * 0.3}" cy="${h * 0.85}" rx="${w * 0.3}" ry="80" fill="${P.blue400}" opacity="0.1"/>
  <ellipse cx="${w * 0.7}" cy="${h * 0.85}" rx="${w * 0.3}" ry="80" fill="${P.amber400}" opacity="0.08"/>
  <!-- Centered hero camera -->
  <g transform="translate(${w / 2} ${h * 0.55})">
    <ellipse cy="${h * 0.18}" rx="200" ry="22" fill="#000" opacity="0.5"/>
    <rect x="-220" y="-60" width="440" height="160" rx="26" fill="url(#bodyGrad)"/>
    <rect x="-200" y="-44" width="400" height="40" rx="20" fill="url(#bodyHighlight)"/>
    <circle cx="-120" cy="20" r="68" fill="${P.slate950}"/>
    <circle cx="-120" cy="20" r="52" fill="url(#lensGrad)"/>
    <circle cx="-120" cy="20" r="40" fill="none" stroke="${P.blue500}" stroke-width="2" opacity="0.5"/>
    <ellipse cx="-138" cy="2" rx="14" ry="6" fill="white" opacity="0.25"/>
    <text x="40" y="14" fill="white" font-family='${FONT}' font-weight="900" font-size="34" letter-spacing="3">AZDOME</text>
    <text x="40" y="46" fill="${P.slate400}" font-family='${FONT}' font-weight="500" font-size="14" letter-spacing="2">DESIGNED IN CALIFORNIA</text>
    <circle cx="170" cy="-32" r="5" fill="${P.blue500}"/>
    <circle cx="184" cy="-32" r="5" fill="${P.emerald500}"/>
  </g>
  <!-- Grid lines -->
  <g stroke="${P.slate800}" stroke-width="1" opacity="0.5">
    ${Array.from({ length: 8 }, (_, i) => `<line x1="${i * (w / 8)}" y1="${h * 0.7}" x2="${i * (w / 8) + 60}" y2="${h}"/>`).join("")}
  </g>
</svg>`;
}

function hardwireKit({ w = 400, h = 400 }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>${sharedDefs}</defs>
  <rect width="${w}" height="${h}" fill="url(#lightBg)"/>
  <g transform="translate(${w / 2} ${h / 2})">
    <!-- Junction box -->
    <rect x="-50" y="-40" width="100" height="80" rx="8" fill="url(#bodyGrad)"/>
    <text x="0" y="6" fill="white" font-family='${FONT}' font-size="11" font-weight="700" text-anchor="middle" letter-spacing="0.5">HARDWIRE</text>
    <text x="0" y="22" fill="${P.slate400}" font-family='${FONT}' font-size="8" font-weight="500" text-anchor="middle" letter-spacing="1">3-LEAD KIT</text>
    <!-- Wires -->
    <path d="M -50 -20 Q -90 -10 -120 30" stroke="${P.red500}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -50 0 Q -100 30 -130 60" stroke="${P.amber400}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -50 20 Q -100 70 -120 90" stroke="${P.slate900}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- USB-C end -->
    <rect x="50" y="-6" width="80" height="12" rx="2" fill="${P.slate900}"/>
    <rect x="124" y="-3" width="14" height="6" rx="1" fill="${P.slate700}"/>
  </g>
</svg>`;
}

// ============================================================
// Main
// ============================================================

async function main() {
  const root = "public/images";

  const jobs = [
    // Product main gallery (m550-*)
    [productFront({ subLabel: "M550 PRO · 4K" }), `${root}/product/m550-front.jpg`],
    [productSide({ subLabel: "M550 PRO" }),       `${root}/product/m550-side.jpg`],
    [productMounted(),                            `${root}/product/m550-mounted.jpg`],
    [productAppView(),                            `${root}/product/m550-app.jpg`],
    [productNightSample(),                        `${root}/product/m550-night.jpg`],

    // Other SKUs
    [productFront({ subLabel: "M27 · QHD", compact: true }),                       `${root}/products/m27.jpg`],
    [productFront({ subLabel: "M530 · 3-CH", lenses: 3 }),                         `${root}/products/m530.jpg`],
    [productFront({ subLabel: "GS63H · WIFI · 4K", withScreen: true }),            `${root}/products/gs63h.jpg`],
    [productFront({ subLabel: "M17 · FHD", compact: true, accent: P.emerald500 }), `${root}/products/m17.jpg`],

    // Cart
    [productFront({ subLabel: "M550 PRO · 4K" }), `${root}/cart/m550.jpg`],
    [hardwireKit({}),                             `${root}/cart/hardwire.jpg`],

    // Mega menu
    [megaCategory({ title: "Front + Rear",  subtitle: "Dual Channel",  type: "dual"   }), `${root}/mega/dual-channel.jpg`],
    [megaCategory({ title: "Stealth Mount", subtitle: "Hidden Design", type: "stealth"}), `${root}/mega/stealth.jpg`],
    [megaCategory({ title: "With Screen",   subtitle: "Instant Replay",type: "screen" }), `${root}/mega/with-screen.jpg`],

    // Hero / Video poster
    [nightDrive({ w: 1920, h: 1080, withHud: false }), `${root}/hero-poster.jpg`],
    [nightDrive({ w: 1920, h: 1080, withHud: true }),  `${root}/aplus/video-poster.jpg`],

    // Hero Carousel banners
    [nightDrive({ w: 1920, h: 1080, withHud: false }),                          `${root}/banners/hero-1.jpg`],
    [aboutHero({ w: 1920, h: 1080 }),                                           `${root}/banners/hero-2.jpg`],
    [rideshareScene({ w: 1920, h: 1080 }),                                      `${root}/banners/hero-3.jpg`],
    [featureCard({ w: 1920, h: 1080, theme: "wifi" }),                          `${root}/banners/hero-4.jpg`],

    // Mini bento banners
    [productFront({ subLabel: "M550 PRO · 4K" }),                               `${root}/banners/mini-m550-pro.jpg`],
    [productFront({ subLabel: "M550 MAX · 3-CH", lenses: 3 }),                  `${root}/banners/mini-m550-max.jpg`],
    [productFront({ subLabel: "PG17 PRO · MIRROR", withScreen: true }),         `${root}/banners/mini-pg17.jpg`],
    [whatsInBox({ w: 900, h: 600 }),                                            `${root}/banners/mini-accessories.jpg`],
    [familyTrip({ w: 1800, h: 600 }),                                           `${root}/banners/mini-scenarios.jpg`],

    // PDP immersive + use-case tabs
    [nightDrive({ w: 1920, h: 1080, withHud: true }),                           `${root}/pdp/immersive-night.jpg`],
    [familyTrip({ w: 1400, h: 1100 }),                                          `${root}/pdp/use-family.jpg`],
    [rideshareScene({ w: 1400, h: 1100 }),                                      `${root}/pdp/use-rideshare.jpg`],
    [parkingScene({ w: 1400, h: 1100 }),                                        `${root}/pdp/use-parking.jpg`],

    // Scenarios
    [familyTrip({}),    `${root}/scenarios/family.jpg`],
    [rideshareScene({}),`${root}/scenarios/rideshare.jpg`],
    [parkingScene({}),  `${root}/scenarios/parking.jpg`],

    // Tech features
    [featureCard({ theme: "night" }), `${root}/features/night-vision.jpg`],
    [featureCard({ theme: "wifi"  }), `${root}/features/wifi.jpg`],
    [featureCard({ theme: "adas"  }), `${root}/features/adas.jpg`],

    // A+ content
    [aplusContent({ type: "4k"      }), `${root}/aplus/4k-detail.jpg`],
    [aplusContent({ type: "parking" }), `${root}/aplus/parking.jpg`],
    [aplusContent({ type: "app"     }), `${root}/aplus/app.jpg`],

    // Avatars
    [avatarSvg({ initials: "MT", hue: 215 }), `${root}/avatars/marcus.jpg`],
    [avatarSvg({ initials: "PK", hue: 280 }), `${root}/avatars/priya.jpg`],
    [avatarSvg({ initials: "DR", hue: 160 }), `${root}/avatars/daniel.jpg`],

    // Reviews
    [reviewPhoto({ theme: "exterior" }), `${root}/reviews/r1.jpg`],
    [reviewPhoto({ theme: "interior" }), `${root}/reviews/r3.jpg`],

    // About / Box
    [aboutHero({}),  `${root}/about-hero.jpg`],
    [whatsInBox({}), `${root}/whatsinbox.jpg`],
  ];

  await Promise.all(jobs.map(([svg, out]) => writeJpg(svg, out)));
  console.log(`\nGenerated ${jobs.length} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
