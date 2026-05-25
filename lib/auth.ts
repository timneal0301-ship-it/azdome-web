// Edge-safe auth helpers (cookies, HMAC tokens). Used by middleware as well
// as Node-side actions. DB-touching helpers live in ./auth-db.

import { hmacHex, timingSafeEqualHex } from "./crypto-utils";

export const USER_COOKIE = "azdome.user.v1";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type PublicUser = {
  email: string;
  name: string;
};

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET is required in production. Generate one with: openssl rand -hex 32",
    );
  }
  return "azdome-dev-secret";
}

export async function makeSessionToken(email: string): Promise<string> {
  const payload = `${email}|${Date.now()}`;
  const sig = await hmacHex(payload, getSecret());
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
  const expected = await hmacHex(`${email}|${tsStr}`, getSecret());
  return timingSafeEqualHex(expected, sig) ? email : null;
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
