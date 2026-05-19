import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/account/actions";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  // 1. Check our email+password session first.
  const customUser = await getCurrentUser();
  if (customUser) {
    return NextResponse.json({
      signedIn: true,
      name: customUser.name,
      email: customUser.email,
    });
  }
  // 2. Then check NextAuth OAuth session.
  const session = await auth();
  if (session?.user?.email) {
    return NextResponse.json({
      signedIn: true,
      name: session.user.name ?? session.user.email.split("@")[0],
      email: session.user.email,
    });
  }
  return NextResponse.json({ signedIn: false });
}
