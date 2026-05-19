// Server-only helper: returns the latest URL for every admin-managed image
// slot. Used by the root layout to seed the client-side <AssetUrlsProvider>.

import "server-only";

import { db } from "./db";
import { SLOTS } from "./image-slots";

/**
 * Returns a map `{ "/images/...": "<blob url>" }` for every slot that has
 * been re-uploaded via admin. Unchanged slots are absent (consumers should
 * fall back to the static path).
 */
export async function getAssetUrlMap(): Promise<Record<string, string>> {
  const entries = await Promise.all(
    SLOTS.map(async (slot): Promise<[string, string] | null> => {
      const url = await db.get<string>(`image:${slot.key}`);
      if (!url) return null;
      return [`/${slot.path}`, url];
    }),
  );
  return Object.fromEntries(
    entries.filter((e): e is [string, string] => e !== null),
  );
}
