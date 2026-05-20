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

function historyKey(key: string) {
  return `content:${key}:history`;
}

/** Max snapshots kept per section. Older entries fall off the buffer. */
const HISTORY_LIMIT = 10;

export type HistoryEntry<T = unknown> = { ts: number; value: T };

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
    // Also push it onto a ring-buffer history, newest first.
    const prevHistory =
      (await db.get<HistoryEntry[]>(historyKey(section.key))) ?? [];
    const next: HistoryEntry[] = [
      { ts: Date.now(), value: current },
      ...prevHistory,
    ].slice(0, HISTORY_LIMIT);
    await db.set(historyKey(section.key), next);
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

/** Read up-to-HISTORY_LIMIT snapshots, newest first. */
export async function getHistory<T = unknown>(
  key: string,
): Promise<HistoryEntry<T>[]> {
  return (await db.get<HistoryEntry<T>[]>(historyKey(key))) ?? [];
}

/** Restore a specific snapshot. The current value gets pushed onto
 * history before overwrite, so this restore is itself reversible. */
export async function restoreFromHistory(
  key: string,
  index: number,
): Promise<boolean> {
  const history = await db.get<HistoryEntry[]>(historyKey(key));
  if (!history || index < 0 || index >= history.length) return false;
  const target = history[index];
  // Push the current value onto history so this is reversible.
  const current = await db.get(dbKey(key));
  if (current !== undefined) {
    const next: HistoryEntry[] = [
      { ts: Date.now(), value: current },
      ...history,
    ].slice(0, HISTORY_LIMIT);
    await db.set(historyKey(key), next);
  }
  await db.set(dbKey(key), target.value);
  return true;
}

/** Discard the override entirely; the in-code seed wins again. */
export async function resetContent(key: string): Promise<void> {
  await db.delete(dbKey(key));
  await db.delete(prevKey(key));
  await db.delete(historyKey(key));
}

// ─── Section registry ───────────────────────────────────────────────

import * as HOME from "./content/home";
import * as PDP from "./content/pdp";
import * as PRODUCTS_C from "./content/products";
import * as LAYOUT from "./content/layout";
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
  ...Object.values(PRODUCTS_C),
  ...Object.values(LAYOUT),
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
