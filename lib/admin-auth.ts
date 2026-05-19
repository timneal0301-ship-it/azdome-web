// Universal auth helpers — pure Web Crypto so they work in both Node and
// Edge runtimes (middleware needs the latter). Cookies/redirects live in the
// places that import these helpers.

export const COOKIE = "azdome.admin.v1";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.ADMIN_PASSWORD || "admin";
}

async function hmac(value: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function makeToken(): Promise<string> {
  const ts = String(Date.now());
  const sig = await hmac(ts, getSecret());
  return `${ts}.${sig}`;
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const ts = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(ts) || !sig) return false;
  // Reject expired tokens (defense in depth — cookie's maxAge also handles this).
  const age = Date.now() - Number(ts);
  if (age < 0 || age > MAX_AGE_SECONDS * 1000) return false;
  const expected = await hmac(ts, getSecret());
  // Constant-time-ish comparison.
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  return input === getSecret();
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
