"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-fetches the current route's RSC payload every `seconds` seconds.
 * Keeps the React tree mounted (no jank) while server data refreshes. */
export default function AutoRefresh({ seconds = 30 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const id = setInterval(() => router.refresh(), seconds * 1000);
    return () => clearInterval(id);
  }, [router, seconds]);
  return null;
}
