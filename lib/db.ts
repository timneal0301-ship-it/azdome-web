// Tiny JSON-file key-value store. Synchronous reads/writes — fine for the
// scale of a single-tenant admin demo (firmware metadata, user accounts).
// For production: swap this adapter for Vercel KV / Redis / Postgres.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

const DB_PATH = join(process.cwd(), "data", "db.json");

type Store = Record<string, unknown>;

function readStore(): Store {
  try {
    if (!existsSync(DB_PATH)) return {};
    const raw = readFileSync(DB_PATH, "utf8");
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(store, null, 2));
}

export const db = {
  get<T = unknown>(key: string, fallback?: T): T | undefined {
    const store = readStore();
    return (store[key] as T) ?? fallback;
  },
  set<T = unknown>(key: string, value: T): void {
    const store = readStore();
    store[key] = value;
    writeStore(store);
  },
  delete(key: string): void {
    const store = readStore();
    delete store[key];
    writeStore(store);
  },
  keys(prefix?: string): string[] {
    const store = readStore();
    const all = Object.keys(store);
    return prefix ? all.filter((k) => k.startsWith(prefix)) : all;
  },
};
