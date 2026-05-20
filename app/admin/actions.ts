"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  COOKIE,
  COOKIE_OPTIONS,
  checkPassword,
  makeToken,
  verifyToken,
} from "@/lib/admin-auth";
import { findSlot } from "@/lib/image-slots";
import { storage } from "@/lib/storage";
import { db } from "@/lib/db";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB

export async function loginAction(
  _prev: { error: string | null } | null,
  formData: FormData,
): Promise<{ error: string | null }> {
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!checkPassword(password)) {
    return { error: "密码错误,请重试" };
  }
  const token = await makeToken();
  cookies().set(COOKIE, token, COOKIE_OPTIONS);
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  cookies().delete(COOKIE);
  redirect("/admin/login");
}

async function requireAuth() {
  const token = cookies().get(COOKIE)?.value;
  if (!(await verifyToken(token))) throw new Error("unauthorized");
}

export type UpdateResult =
  | { ok: true; path: string; backupPath?: string; ts: number }
  | { ok: false; error: string };

export type ClearResult = { ok: true } | { ok: false; error: string };

export async function clearImage(slotKey: string): Promise<ClearResult> {
  await requireAuth();
  const slot = findSlot(slotKey);
  if (!slot) return { ok: false, error: "未知的图片槽位" };
  try {
    await db.delete(`image:${slot.key}`);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "清除失败" };
  }
}

export type BulkClearResult =
  | { ok: true; cleared: number }
  | { ok: false; error: string };

export async function clearImages(slotKeys: string[]): Promise<BulkClearResult> {
  await requireAuth();
  const valid = slotKeys.filter((k) => findSlot(k));
  if (valid.length === 0) {
    return { ok: false, error: "没有有效的槽位" };
  }
  try {
    await Promise.all(valid.map((k) => db.delete(`image:${k}`)));
    revalidatePath("/", "layout");
    return { ok: true, cleared: valid.length };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "批量清除失败" };
  }
}

export async function updateImage(formData: FormData): Promise<UpdateResult> {
  await requireAuth();

  const slotKey = String(formData.get("slot") || "");
  const file = formData.get("file");

  const slot = findSlot(slotKey);
  if (!slot) return { ok: false, error: "未知的图片槽位" };

  if (!(file instanceof File)) return { ok: false, error: "未提供文件" };
  if (file.size === 0) return { ok: false, error: "文件为空" };
  if (file.size > MAX_SIZE) {
    return { ok: false, error: `文件超过 ${MAX_SIZE / 1024 / 1024}MB 上限` };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: `不支持的文件类型: ${file.type || "unknown"}` };
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const { url, backupPath } = await storage.write(slot.path, buf);
    // Remember the resolved URL so admin previews + public consumers that
    // opt in (via lib/asset-urls.ts) can pick up the new file.
    await db.set(`image:${slot.key}`, url);
    revalidatePath("/", "layout");
    return { ok: true, path: url, backupPath, ts: Date.now() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "写入失败" };
  }
}
