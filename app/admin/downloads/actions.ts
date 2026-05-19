"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { COOKIE, verifyToken } from "@/lib/admin-auth";
import { storage } from "@/lib/storage";
import { type FirmwareRelease, type Locale } from "@/lib/downloads";
import {
  getFirmwareEntry,
  getManualEntry,
  saveFirmwareEntry,
  saveManualEntry,
} from "@/lib/downloads-server";

async function requireAuth() {
  const token = cookies().get(COOKIE)?.value;
  if (!(await verifyToken(token))) throw new Error("unauthorized");
}

const MAX_BIN_SIZE = 64 * 1024 * 1024; // 64 MB
const MAX_PDF_SIZE = 16 * 1024 * 1024; // 16 MB

export type Result =
  | { ok: true; message: string }
  | { ok: false; error: string };

// ── FIRMWARE ─────────────────────────────────────────────────────────

export async function uploadFirmware(formData: FormData): Promise<Result> {
  await requireAuth();

  const productSlug = String(formData.get("productSlug") || "");
  const version = String(formData.get("version") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const makeCurrent = formData.get("makeCurrent") === "on";
  const file = formData.get("file");

  if (!productSlug) return { ok: false, error: "缺少 productSlug" };
  if (!/^v\d+\.\d+\.\d+$/.test(version)) {
    return { ok: false, error: '版本号格式应为 "v1.2.3"' };
  }
  if (!(file instanceof File)) return { ok: false, error: "未提供文件" };
  if (file.size === 0) return { ok: false, error: "文件为空" };
  if (file.size > MAX_BIN_SIZE)
    return { ok: false, error: `固件超过 ${MAX_BIN_SIZE / 1024 / 1024} MB 上限` };

  const entry = await getFirmwareEntry(productSlug);
  if (!entry) return { ok: false, error: "未知型号" };

  if (entry.releases.some((r) => r.version === version)) {
    return { ok: false, error: `${version} 已存在,请先删除再上传` };
  }

  const relativePath = `downloads/firmware/${productSlug}-${version}.bin`;
  let url: string;
  try {
    const result = await storage.write(
      relativePath,
      Buffer.from(await file.arrayBuffer()),
    );
    url = result.url;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "写入失败" };
  }

  const sizeMB = (file.size / 1024 / 1024).toFixed(1);
  const newRelease: FirmwareRelease = {
    version,
    date: new Date().toISOString().slice(0, 10),
    size: `${sizeMB} MB`,
    sha256: (await sha256Hex(file)).slice(0, 16),
    notes: notes || "(no release notes)",
    file: url,
    current: makeCurrent,
  };

  const next: typeof entry = {
    ...entry,
    releases: [
      newRelease,
      ...entry.releases.map((r) =>
        makeCurrent ? { ...r, current: false } : r,
      ),
    ],
  };
  await saveFirmwareEntry(next);

  revalidatePath("/support/firmware", "page");
  revalidatePath("/admin/downloads", "page");
  return { ok: true, message: `${entry.modelLabel} ${version} 已上传` };
}

export async function deleteFirmwareVersion(
  productSlug: string,
  version: string,
): Promise<Result> {
  await requireAuth();
  const entry = await getFirmwareEntry(productSlug);
  if (!entry) return { ok: false, error: "未知型号" };
  let next = {
    ...entry,
    releases: entry.releases.filter((r) => r.version !== version),
  };
  if (next.releases.length === 0) {
    return { ok: false, error: "至少保留一个版本" };
  }
  if (!next.releases.some((r) => r.current)) {
    next = {
      ...next,
      releases: next.releases.map((r, i) =>
        i === 0 ? { ...r, current: true } : r,
      ),
    };
  }
  await saveFirmwareEntry(next);
  revalidatePath("/support/firmware", "page");
  revalidatePath("/admin/downloads", "page");
  return { ok: true, message: `已删除 ${version}` };
}

export async function setCurrentFirmware(
  productSlug: string,
  version: string,
): Promise<Result> {
  await requireAuth();
  const entry = await getFirmwareEntry(productSlug);
  if (!entry) return { ok: false, error: "未知型号" };
  await saveFirmwareEntry({
    ...entry,
    releases: entry.releases.map((r) => ({
      ...r,
      current: r.version === version,
    })),
  });
  revalidatePath("/support/firmware", "page");
  revalidatePath("/admin/downloads", "page");
  return { ok: true, message: `已切换当前版本为 ${version}` };
}

// ── MANUALS ──────────────────────────────────────────────────────────

const VALID_LOCALES: Locale[] = ["en", "zh", "ja", "de", "fr", "es"];

export async function uploadManual(formData: FormData): Promise<Result> {
  await requireAuth();

  const productSlug = String(formData.get("productSlug") || "");
  const lang = String(formData.get("lang") || "") as Locale;
  const file = formData.get("file");

  if (!productSlug) return { ok: false, error: "缺少 productSlug" };
  if (!VALID_LOCALES.includes(lang)) return { ok: false, error: "未知语言" };
  if (!(file instanceof File)) return { ok: false, error: "未提供文件" };
  if (file.size === 0) return { ok: false, error: "文件为空" };
  if (file.size > MAX_PDF_SIZE)
    return { ok: false, error: `PDF 超过 ${MAX_PDF_SIZE / 1024 / 1024} MB 上限` };
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
    return { ok: false, error: "仅接受 PDF 文件" };
  }

  const entry = await getManualEntry(productSlug);
  if (!entry) return { ok: false, error: "未知型号" };

  const relativePath = `downloads/manuals/${productSlug}-${lang}.pdf`;
  let url: string;
  try {
    const result = await storage.write(
      relativePath,
      Buffer.from(await file.arrayBuffer()),
    );
    url = result.url;
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "写入失败" };
  }

  const sizeMB = (file.size / 1024 / 1024).toFixed(1);
  const next: typeof entry = {
    ...entry,
    files: {
      ...entry.files,
      [lang]: { file: url, size: `${sizeMB} MB` },
    },
  };
  await saveManualEntry(next);

  revalidatePath("/support/manuals", "page");
  revalidatePath("/admin/downloads", "page");
  return {
    ok: true,
    message: `${entry.modelLabel} ${lang.toUpperCase()} 手册已上传`,
  };
}

export async function deleteManualLang(
  productSlug: string,
  lang: Locale,
): Promise<Result> {
  await requireAuth();
  const entry = await getManualEntry(productSlug);
  if (!entry) return { ok: false, error: "未知型号" };
  const nextFiles = { ...entry.files };
  delete nextFiles[lang];
  if (Object.keys(nextFiles).length === 0) {
    return { ok: false, error: "至少保留一种语言" };
  }
  await saveManualEntry({ ...entry, files: nextFiles });
  revalidatePath("/support/manuals", "page");
  revalidatePath("/admin/downloads", "page");
  return { ok: true, message: `已删除 ${lang.toUpperCase()} 手册` };
}

async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
