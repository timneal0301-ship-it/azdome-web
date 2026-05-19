// Server-only runtime getters that overlay admin-edited data from the JSON
// DB on top of the static seeds exported from ./downloads.
//
// Convention in db.json:
//   "firmware:<slug>"  →  FirmwareEntry  (overrides seed for that slug)
//   "manual:<slug>"    →  Manual         (overrides seed for that slug)
//
// Must only be imported from server components / server actions / route
// handlers — never from "use client" modules, because it transitively imports
// `fs` via ./db.

import "server-only";

import { db } from "./db";
import {
  FIRMWARE,
  MANUALS,
  type FirmwareEntry,
  type FirmwareRelease,
  type Manual,
} from "./downloads";

export function getAllFirmware(): FirmwareEntry[] {
  return FIRMWARE.map((seed) => {
    const override = db.get<FirmwareEntry>(`firmware:${seed.productSlug}`);
    return override ?? seed;
  });
}

export function getFirmwareEntry(productSlug: string): FirmwareEntry | undefined {
  const override = db.get<FirmwareEntry>(`firmware:${productSlug}`);
  if (override) return override;
  return FIRMWARE.find((f) => f.productSlug === productSlug);
}

export function getLatestFirmware(productSlug: string): FirmwareRelease | undefined {
  const entry = getFirmwareEntry(productSlug);
  return entry?.releases.find((r) => r.current) ?? entry?.releases[0];
}

export function getAllManuals(): Manual[] {
  return MANUALS.map((seed) => {
    const override = db.get<Manual>(`manual:${seed.productSlug}`);
    return override ?? seed;
  });
}

export function getManualEntry(productSlug: string): Manual | undefined {
  const override = db.get<Manual>(`manual:${productSlug}`);
  if (override) return override;
  return MANUALS.find((m) => m.productSlug === productSlug);
}

// Admin write helpers — used by /admin/downloads server actions.
export function saveFirmwareEntry(entry: FirmwareEntry) {
  db.set(`firmware:${entry.productSlug}`, entry);
}

export function saveManualEntry(entry: Manual) {
  db.set(`manual:${entry.productSlug}`, entry);
}
