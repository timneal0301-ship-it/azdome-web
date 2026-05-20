"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  getSection,
  resetContent,
  restoreFromHistory,
  revertContent,
  saveContent,
} from "@/lib/content-server";

async function requireAuth() {
  const token = cookies().get(COOKIE)?.value;
  if (!(await verifyToken(token))) throw new Error("unauthorized");
}

export type Result =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function saveContentAction(
  key: string,
  rawJson: string,
): Promise<Result> {
  await requireAuth();
  const section = getSection(key);
  if (!section) return { ok: false, error: "未知 section" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "JSON parse 失败" };
  }
  try {
    await saveContent(section, parsed);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "保存失败" };
  }
  if (section.previewHref) {
    revalidatePath(section.previewHref);
  }
  revalidatePath("/admin/content", "layout");
  return { ok: true, message: "已保存,前台将立即生效" };
}

export async function resetContentAction(key: string): Promise<Result> {
  await requireAuth();
  const section = getSection(key);
  if (!section) return { ok: false, error: "未知 section" };
  await resetContent(key);
  if (section.previewHref) revalidatePath(section.previewHref);
  revalidatePath("/admin/content", "layout");
  return { ok: true, message: "已恢复默认值" };
}

export async function revertContentAction(key: string): Promise<Result> {
  await requireAuth();
  const section = getSection(key);
  if (!section) return { ok: false, error: "未知 section" };
  const ok = await revertContent(key);
  if (section.previewHref) revalidatePath(section.previewHref);
  revalidatePath("/admin/content", "layout");
  return ok
    ? { ok: true, message: "已回滚到上一版本" }
    : { ok: false, error: "没有可回滚的历史版本" };
}

export async function restoreVersionAction(
  key: string,
  index: number,
): Promise<Result> {
  await requireAuth();
  const section = getSection(key);
  if (!section) return { ok: false, error: "未知 section" };
  const ok = await restoreFromHistory(key, index);
  if (section.previewHref) revalidatePath(section.previewHref);
  revalidatePath("/admin/content", "layout");
  return ok
    ? { ok: true, message: "已恢复至历史版本" }
    : { ok: false, error: "没有这个历史版本" };
}
