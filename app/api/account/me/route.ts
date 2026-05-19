import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/account/actions";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ signedIn: false });
  return NextResponse.json({ signedIn: true, name: user.name, email: user.email });
}
