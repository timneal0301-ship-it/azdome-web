// Edge-safe auth helpers (cookies, HMAC tokens). Used by middleware as well
// as Node-side actions. DB-touching helpers live in ./auth-db.

export const USER_COOKIE = "azdome.user.v1";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type PublicUser = {
  email: string;
  name: string;
};

function getSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "azdome-dev-secret"
  );
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

export async function makeSessionToken(email: string): Promise<string> {
  const payload = `${email}|${Date.now()}`;
  const sig = await hmac(payload, getSecret());
  return `${payload}|${sig}`;
}

export async function readSessionEmail(
  token: string | undefined,
): Promise<string | null> {
  if (!token) return null;
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [email, tsStr, sig] = parts;
  const age = Date.now() - Number(tsStr);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000)
    return null;
  const expected = await hmac(`${email}|${tsStr}`, getSecret());
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0 ? email : null;
}

export const USER_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
