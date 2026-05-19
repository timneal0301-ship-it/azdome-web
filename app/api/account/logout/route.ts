import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { USER_COOKIE } from "@/lib/auth";

export async function POST() {
  cookies().delete(USER_COOKIE);
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
}
