// Server-only runtime getters that overlay admin-edited data from the async
// DB on top of the static seeds exported from ./downloads.
//
// Must only be imported from server components / server actions / route
// handlers — never from "use client" modules.

import "server-only";

import { db } from "./db";
import {
  FIRMWARE,
  MANUALS,
  type FirmwareEntry,
  type FirmwareRelease,
  type Manual,
} from "./downloads";

export async function getAllFirmware(): Promise<FirmwareEntry[]> {
  return Promise.all(
    FIRMWARE.map(async (seed) => {
      const override = await db.get<FirmwareEntry>(`firmware:${seed.productSlug}`);
      return override ?? seed;
    }),
  );
}

export async function getFirmwareEntry(
  productSlug: string,
): Promise<FirmwareEntry | undefined> {
  const override = await db.get<FirmwareEntry>(`firmware:${productSlug}`);
  if (override) return override;
  return FIRMWARE.find((f) => f.productSlug === productSlug);
}

export async function getLatestFirmware(
  productSlug: string,
): Promise<FirmwareRelease | undefined> {
  const entry = await getFirmwareEntry(productSlug);
  return entry?.releases.find((r) => r.current) ?? entry?.releases[0];
}

export async function getAllManuals(): Promise<Manual[]> {
  return Promise.all(
    MANUALS.map(async (seed) => {
      const override = await db.get<Manual>(`manual:${seed.productSlug}`);
      return override ?? seed;
    }),
  );
}

export async function getManualEntry(
  productSlug: string,
): Promise<Manual | undefined> {
  const override = await db.get<Manual>(`manual:${productSlug}`);
  if (override) return override;
  return MANUALS.find((m) => m.productSlug === productSlug);
}

export async function saveFirmwareEntry(entry: FirmwareEntry): Promise<void> {
  await db.set(`firmware:${entry.productSlug}`, entry);
}

export async function saveManualEntry(entry: Manual): Promise<void> {
  await db.set(`manual:${entry.productSlug}`, entry);
}
