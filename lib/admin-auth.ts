// Universal auth helpers — pure Web Crypto so they work in both Node and
// Edge runtimes (middleware needs the latter). Cookies/redirects live in the
// places that import these helpers.

import { hmacHex, timingSafeEqualHex } from "./crypto-utils";

export const COOKIE = "azdome.admin.v1";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (secret && secret.length >= 8) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_PASSWORD is required in production and must be at least 8 characters.",
    );
  }
  return "admin";
}

export async function makeToken(): Promise<string> {
  const ts = String(Date.now());
  const sig = await hmacHex(ts, getSecret());
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
  const expected = await hmacHex(ts, getSecret());
  return timingSafeEqualHex(expected, sig);
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
