// Async key-value store.
//
// Adapter is picked at first call based on environment:
//   • Vercel KV  — when KV_REST_API_URL + KV_REST_API_TOKEN are present
//                  (legacy Vercel KV auto-injects these)
//                  OR when UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
//                  are present (new Vercel Marketplace Upstash integration)
//   • Local JSON — otherwise (writes to data/db.json, for `npm run dev`).
//                  On Vercel serverless this would hit a read-only fs, so
//                  we refuse to use it there and throw a clear error instead.

import "server-only";

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";

// Bridge new Marketplace var names → what @vercel/kv expects, before its
// first import. @vercel/kv reads env at module init, so map names early.
if (
  !process.env.KV_REST_API_URL &&
  process.env.UPSTASH_REDIS_REST_URL
) {
  process.env.KV_REST_API_URL = process.env.UPSTASH_REDIS_REST_URL;
}
if (
  !process.env.KV_REST_API_TOKEN &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  process.env.KV_REST_API_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
}

type Store = Record<string, unknown>;

interface DbAdapter {
  name: string;
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  keys(prefix?: string): Promise<string[]>;
}

// ── Local JSON-file adapter ──────────────────────────────────────────

const DB_PATH = join(process.cwd(), "data", "db.json");

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
  if (process.env.VERCEL) {
    throw new Error(
      "[db] Refusing to write to local JSON on Vercel — the serverless " +
        "filesystem is read-only. Connect a KV/Upstash store and ensure " +
        "KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL + " +
        "UPSTASH_REDIS_REST_TOKEN) are set in Project Settings → Environment Variables.",
    );
  }
  mkdirSync(dirname(DB_PATH), { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(store, null, 2));
}

const localAdapter: DbAdapter = {
  name: "local-json",
  async get<T>(key: string) {
    return readStore()[key] as T | undefined;
  },
  async set<T>(key: string, value: T) {
    const store = readStore();
    store[key] = value;
    writeStore(store);
  },
  async delete(key: string) {
    const store = readStore();
    delete store[key];
    writeStore(store);
  },
  async keys(prefix?: string) {
    const all = Object.keys(readStore());
    return prefix ? all.filter((k) => k.startsWith(prefix)) : all;
  },
};

// ── Vercel KV adapter (lazy-loaded so local dev doesn't import it) ───

async function createKvAdapter(): Promise<DbAdapter | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  try {
    const { kv } = await import("@vercel/kv");
    return {
      name: "vercel-kv",
      async get<T>(key: string) {
        const v = await kv.get<T>(key);
        return v ?? undefined;
      },
      async set<T>(key: string, value: T) {
        // @vercel/kv's set() narrows its value parameter to a complex union
        // that TS can't unify with arbitrary T; the client serializes anything
        // we hand it, so widen through the actual parameter type.
        await kv.set(key, value as Parameters<typeof kv.set>[1]);
      },
      async delete(key: string) {
        await kv.del(key);
      },
      async keys(prefix?: string) {
        // Scan with cursor — KV doesn't have a single "all keys" endpoint.
        const out: string[] = [];
        let cursor: string | number = 0;
        do {
          const [next, batch] = (await kv.scan(cursor, {
            match: prefix ? `${prefix}*` : "*",
            count: 200,
          })) as [string | number, string[]];
          out.push(...batch);
          cursor = next;
        } while (cursor !== 0 && cursor !== "0");
        return out;
      },
    };
  } catch (e) {
    console.warn("[db] Vercel KV unavailable, falling back to local JSON:", e);
    return null;
  }
}

let adapterPromise: Promise<DbAdapter> | null = null;

async function getAdapter(): Promise<DbAdapter> {
  if (!adapterPromise) {
    adapterPromise = createKvAdapter().then((a) => a ?? localAdapter);
  }
  return adapterPromise;
}

export const db = {
  async get<T = unknown>(key: string, fallback?: T): Promise<T | undefined> {
    const a = await getAdapter();
    const v = await a.get<T>(key);
    return v ?? fallback;
  },
  async set<T = unknown>(key: string, value: T): Promise<void> {
    const a = await getAdapter();
    await a.set(key, value);
  },
  async delete(key: string): Promise<void> {
    const a = await getAdapter();
    await a.delete(key);
  },
  async keys(prefix?: string): Promise<string[]> {
    const a = await getAdapter();
    return a.keys(prefix);
  },
  async adapterName(): Promise<string> {
    return (await getAdapter()).name;
  },
};
