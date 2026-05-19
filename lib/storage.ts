import { copyFile, mkdir, stat, writeFile } from "fs/promises";
import { dirname, join, normalize, sep } from "path";

const PUBLIC_ROOT = join(process.cwd(), "public");

export interface StorageAdapter {
  /** Write file bytes to a path relative to public/. Creates parent dirs as needed. */
  write(relativePath: string, data: Buffer): Promise<{ backupPath?: string }>;
}

/** Local-disk storage. Works in dev and on any host with persistent FS. */
export const localStorage: StorageAdapter = {
  async write(relativePath, data) {
    // Path safety: must stay within public/{images,downloads}/
    const safe = normalize(relativePath);
    if (safe.startsWith("..") || safe.startsWith(sep)) {
      throw new Error(`unsafe path: ${relativePath}`);
    }
    const allowed =
      safe.startsWith(`images${sep}`) || safe.startsWith(`downloads${sep}`);
    if (!allowed) {
      throw new Error(`path not allowed: ${relativePath}`);
    }
    const target = join(PUBLIC_ROOT, safe);
    await mkdir(dirname(target), { recursive: true });

    let backupPath: string | undefined;
    try {
      await stat(target);
      backupPath = `${target}.bak.${Date.now()}`;
      await copyFile(target, backupPath);
    } catch {
      /* no existing file; nothing to back up */
    }

    await writeFile(target, data);
    return { backupPath };
  },
};

export const storage: StorageAdapter = localStorage;
