// Async storage adapter.
//
//   • Vercel Blob  — when BLOB_READ_WRITE_TOKEN is present
//                    (auto-injected by Vercel when you connect a Blob store)
//   • Local disk   — otherwise (writes under public/)
//
// `write()` always returns `{ url }`. For Blob this is a public CDN URL;
// for local disk it's the same-origin path `/images/...` or `/downloads/...`.

import "server-only";

import { copyFile, mkdir, stat, writeFile } from "fs/promises";
import { dirname, join, normalize, sep } from "path";

const PUBLIC_ROOT = join(process.cwd(), "public");

export type WriteResult = {
  /** Either an absolute https URL (Blob) or a same-origin path (local disk). */
  url: string;
  /** Path of the .bak.<ts> file if one was created (local adapter only). */
  backupPath?: string;
};

interface StorageAdapter {
  name: string;
  write(relativePath: string, data: Buffer): Promise<WriteResult>;
}

// ── Local-disk adapter ───────────────────────────────────────────────

const localAdapter: StorageAdapter = {
  name: "local-disk",
  async write(relativePath, data) {
    const safe = normalize(relativePath);
    if (safe.startsWith("..") || safe.startsWith(sep)) {
      throw new Error(`unsafe path: ${relativePath}`);
    }
    const allowed =
      safe.startsWith(`images${sep}`) || safe.startsWith(`downloads${sep}`);
    if (!allowed) throw new Error(`path not allowed: ${relativePath}`);

    const target = join(PUBLIC_ROOT, safe);
    await mkdir(dirname(target), { recursive: true });

    let backupPath: string | undefined;
    try {
      await stat(target);
      backupPath = `${target}.bak.${Date.now()}`;
      await copyFile(target, backupPath);
    } catch {
      /* no existing file */
    }
    await writeFile(target, data);
    return { url: `/${safe.split(sep).join("/")}`, backupPath };
  },
};

// ── Vercel Blob adapter ──────────────────────────────────────────────

async function createBlobAdapter(): Promise<StorageAdapter | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { put } = await import("@vercel/blob");
    return {
      name: "vercel-blob",
      async write(relativePath, data) {
        const safe = relativePath.replace(/^\/+/, "");
        // Always overwrite at the same logical path — no random suffix —
        // so stored URLs in KV remain stable across re-uploads.
        const result = await put(safe, data, {
          access: "public",
          addRandomSuffix: false,
          contentType: inferContentType(safe),
          allowOverwrite: true,
        });
        return { url: result.url };
      },
    };
  } catch (e) {
    console.warn("[storage] Vercel Blob unavailable, falling back to local disk:", e);
    return null;
  }
}

function inferContentType(p: string): string {
  const lower = p.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".bin")) return "application/octet-stream";
  return "application/octet-stream";
}

// ── Resolution ───────────────────────────────────────────────────────

let adapterPromise: Promise<StorageAdapter> | null = null;

async function getAdapter(): Promise<StorageAdapter> {
  if (!adapterPromise) {
    adapterPromise = createBlobAdapter().then((a) => a ?? localAdapter);
  }
  return adapterPromise;
}

export const storage = {
  async write(relativePath: string, data: Buffer): Promise<WriteResult> {
    const a = await getAdapter();
    return a.write(relativePath, data);
  },
  async adapterName(): Promise<string> {
    return (await getAdapter()).name;
  },
};
