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

type WithSlug = { productSlug: string };

async function overlayAll<T extends WithSlug>(
  seeds: readonly T[],
  prefix: string,
): Promise<T[]> {
  return Promise.all(
    seeds.map(async (seed) => {
      const override = await db.get<T>(`${prefix}:${seed.productSlug}`);
      return override ?? seed;
    }),
  );
}

async function overlayOne<T extends WithSlug>(
  seeds: readonly T[],
  prefix: string,
  productSlug: string,
): Promise<T | undefined> {
  const override = await db.get<T>(`${prefix}:${productSlug}`);
  return override ?? seeds.find((s) => s.productSlug === productSlug);
}

export async function getAllFirmware(): Promise<FirmwareEntry[]> {
  return overlayAll(FIRMWARE, "firmware");
}

export async function getFirmwareEntry(
  productSlug: string,
): Promise<FirmwareEntry | undefined> {
  return overlayOne(FIRMWARE, "firmware", productSlug);
}

export async function getLatestFirmware(
  productSlug: string,
): Promise<FirmwareRelease | undefined> {
  const entry = await getFirmwareEntry(productSlug);
  return entry?.releases.find((r) => r.current) ?? entry?.releases[0];
}

export async function getAllManuals(): Promise<Manual[]> {
  return overlayAll(MANUALS, "manual");
}

export async function getManualEntry(
  productSlug: string,
): Promise<Manual | undefined> {
  return overlayOne(MANUALS, "manual", productSlug);
}

export async function saveFirmwareEntry(entry: FirmwareEntry): Promise<void> {
  await db.set(`firmware:${entry.productSlug}`, entry);
}

export async function saveManualEntry(entry: Manual): Promise<void> {
  await db.set(`manual:${entry.productSlug}`, entry);
}
