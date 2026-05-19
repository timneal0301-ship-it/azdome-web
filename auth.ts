// NextAuth v5 — OAuth for Google / Facebook / Apple.
//
// Each provider is wired only if its CLIENT_ID + CLIENT_SECRET env vars
// are present. Without those, the button on /account/login + /signup will
// render but clicking gives a friendly "provider not configured" message.
//
// Session strategy: JWT (no DB adapter required). For OAuth users, the
// signed-in state is read by /api/account/me alongside our existing
// scrypt/cookie email+password sessions, so AccountBadge sees both.

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Apple from "next-auth/providers/apple";

const providers: NextAuthConfig["providers"] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
}

if (process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  );
}

if (process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET) {
  providers.push(
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/account/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  // NextAuth needs a JWT signing secret. Re-use AUTH_SECRET / ADMIN_PASSWORD
  // so a single env var covers both auth systems.
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "azdome-dev-secret-change-me",
});

/** Names of providers currently configured (used to render the right buttons). */
export function enabledOAuthProviders(): Array<"google" | "facebook" | "apple"> {
  const out: Array<"google" | "facebook" | "apple"> = [];
  if (process.env.AUTH_GOOGLE_ID) out.push("google");
  if (process.env.AUTH_FACEBOOK_ID) out.push("facebook");
  if (process.env.AUTH_APPLE_ID) out.push("apple");
  return out;
}
