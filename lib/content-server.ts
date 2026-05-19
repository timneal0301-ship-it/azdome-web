// Server-only content store. Reads admin overrides from the DB on top
// of the in-code seeds; writes save the prior value to a "previous"
// slot so admins can revert one step.

import "server-only";

import { db } from "./db";
import type { AnyContentSection, ContentSection } from "./content/types";

function dbKey(key: string) {
  return `content:${key}`;
}

function prevKey(key: string) {
  return `content:${key}:prev`;
}

export async function getContent<T>(section: ContentSection<T>): Promise<T> {
  const override = await db.get<T>(dbKey(section.key));
  return (override ?? section.defaults) as T;
}

/** Same as getContent but tells you whether the value is an override. */
export async function getContentDetailed<T>(section: ContentSection<T>): Promise<{
  value: T;
  isOverridden: boolean;
  hasPrev: boolean;
}> {
  const [override, prev] = await Promise.all([
    db.get<T>(dbKey(section.key)),
    db.get<T>(prevKey(section.key)),
  ]);
  return {
    value: (override ?? section.defaults) as T,
    isOverridden: override !== undefined,
    hasPrev: prev !== undefined,
  };
}

export async function saveContent<T>(
  section: ContentSection<T>,
  value: T,
): Promise<void> {
  // Save the current override (if any) as the previous version so we can revert.
  const current = await db.get(dbKey(section.key));
  if (current !== undefined) {
    await db.set(prevKey(section.key), current);
  }
  await db.set(dbKey(section.key), value);
}

/** Restore the previous override (one step back). */
export async function revertContent(key: string): Promise<boolean> {
  const prev = await db.get(prevKey(key));
  if (prev === undefined) return false;
  await db.set(dbKey(key), prev);
  await db.delete(prevKey(key));
  return true;
}

/** Discard the override entirely; the in-code seed wins again. */
export async function resetContent(key: string): Promise<void> {
  await db.delete(dbKey(key));
  await db.delete(prevKey(key));
}

// ─── Section registry ───────────────────────────────────────────────

import * as HOME from "./content/home";
import * as PDP from "./content/pdp";
import * as LEGAL from "./content/legal";
import * as ABOUT from "./content/about";
import * as CAREERS from "./content/careers";
import * as PRESS from "./content/press";
import * as AFFILIATE from "./content/affiliate";
import * as WHOLESALE from "./content/wholesale";
import * as APP from "./content/app-page";

// Each module exports both data arrays (STATS, DOCS, ...) and one
// ContentSection per page. We filter the union down to just the sections.
const ALL_RAW: unknown[] = [
  ...Object.values(HOME),
  ...Object.values(PDP),
  ...Object.values(LEGAL),
  ...Object.values(ABOUT),
  ...Object.values(CAREERS),
  ...Object.values(PRESS),
  ...Object.values(AFFILIATE),
  ...Object.values(WHOLESALE),
  ...Object.values(APP),
];
const ALL: AnyContentSection[] = ALL_RAW.filter(
  (v): v is AnyContentSection =>
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    "key" in (v as Record<string, unknown>) &&
    "defaults" in (v as Record<string, unknown>),
);

export const ALL_SECTIONS: AnyContentSection[] = ALL;

export function getSection(key: string): AnyContentSection | undefined {
  return ALL.find((s) => s.key === key);
}

/** Group sections by page for the admin index view. */
export function groupedSections(): Record<string, AnyContentSection[]> {
  const out: Record<string, AnyContentSection[]> = {};
  for (const s of ALL) {
    (out[s.page] ??= []).push(s);
  }
  return out;
}
