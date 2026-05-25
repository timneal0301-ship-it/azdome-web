"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { COOKIE, verifyToken } from "@/lib/admin-auth";
import {
  deletePromo,
  getPromo,
  isValidCodeFormat,
  normalizeCode,
  savePromo,
  type Promo,
  type PromoType,
} from "@/lib/promo";

async function requireAuth() {
  const token = cookies().get(COOKIE)?.value;
  if (!(await verifyToken(token))) throw new Error("unauthorized");
}

export type Result =
  | { ok: true; message: string; code?: string }
  | { ok: false; error: string };

const NOTE_MAX = 200;
const PERCENT_MAX = 100;
const AMOUNT_MAX = 100_000;

function validatePromoInput(input: {
  code: string;
  type: PromoType;
  value: number;
  minSubtotal?: number | null;
  expiresAt?: string | null;
  note?: string | null;
}): string | null {
  if (!isValidCodeFormat(input.code)) {
    return "促销码格式: 2–32 位, 字母/数字/下划线/横线, 首字符为字母数字";
  }
  if (input.type !== "percent" && input.type !== "amount") {
    return "未知的折扣类型";
  }
  if (!Number.isFinite(input.value) || input.value <= 0) {
    return "折扣值必须为正数";
  }
  if (input.type === "percent" && input.value > PERCENT_MAX) {
    return "百分比上限 100";
  }
  if (input.type === "amount" && input.value > AMOUNT_MAX) {
    return "固定金额上限 $100000";
  }
  if (input.minSubtotal != null) {
    if (!Number.isFinite(input.minSubtotal) || input.minSubtotal < 0) {
      return "最低订单金额需 ≥ 0";
    }
  }
  if (input.expiresAt) {
    const t = Date.parse(input.expiresAt);
    if (!Number.isFinite(t)) return "过期时间格式无效";
  }
  if (input.note != null && input.note.length > NOTE_MAX) {
    return `备注最长 ${NOTE_MAX} 字符`;
  }
  return null;
}

export async function createPromo(input: {
  code: string;
  type: PromoType;
  value: number;
  minSubtotal?: number | null;
  expiresAt?: string | null;
  active: boolean;
  note?: string | null;
}): Promise<Result> {
  await requireAuth();
  const code = normalizeCode(input.code);
  const err = validatePromoInput({ ...input, code });
  if (err) return { ok: false, error: err };

  if (await getPromo(code)) {
    return { ok: false, error: `促销码 ${code} 已存在` };
  }

  const promo: Promo = {
    code,
    type: input.type,
    value: input.value,
    active: input.active,
    createdAt: new Date().toISOString(),
    ...(input.minSubtotal != null ? { minSubtotal: input.minSubtotal } : {}),
    ...(input.expiresAt ? { expiresAt: input.expiresAt } : {}),
    ...(input.note ? { note: input.note } : {}),
  };
  await savePromo(promo);
  revalidatePath("/admin/promos");
  return { ok: true, message: `${code} 已创建`, code };
}

export async function updatePromo(input: {
  code: string;
  type: PromoType;
  value: number;
  minSubtotal?: number | null;
  expiresAt?: string | null;
  active: boolean;
  note?: string | null;
}): Promise<Result> {
  await requireAuth();
  const code = normalizeCode(input.code);
  const err = validatePromoInput({ ...input, code });
  if (err) return { ok: false, error: err };

  const existing = await getPromo(code);
  if (!existing) return { ok: false, error: `促销码 ${code} 不存在` };

  const promo: Promo = {
    ...existing,
    type: input.type,
    value: input.value,
    active: input.active,
    ...(input.minSubtotal != null ? { minSubtotal: input.minSubtotal } : { minSubtotal: undefined }),
    ...(input.expiresAt ? { expiresAt: input.expiresAt } : { expiresAt: undefined }),
    ...(input.note ? { note: input.note } : { note: undefined }),
  };
  // Strip explicit undefineds before persisting.
  for (const k of Object.keys(promo) as (keyof Promo)[]) {
    if (promo[k] === undefined) delete promo[k];
  }
  await savePromo(promo);
  revalidatePath("/admin/promos");
  return { ok: true, message: `${code} 已更新`, code };
}

export async function togglePromoActive(code: string): Promise<Result> {
  await requireAuth();
  const normalized = normalizeCode(code);
  const existing = await getPromo(normalized);
  if (!existing) return { ok: false, error: `促销码 ${normalized} 不存在` };
  const next: Promo = { ...existing, active: !existing.active };
  await savePromo(next);
  revalidatePath("/admin/promos");
  return {
    ok: true,
    message: next.active ? `${normalized} 已启用` : `${normalized} 已停用`,
    code: normalized,
  };
}

export async function removePromo(code: string): Promise<Result> {
  await requireAuth();
  const normalized = normalizeCode(code);
  await deletePromo(normalized);
  revalidatePath("/admin/promos");
  return { ok: true, message: `${normalized} 已删除`, code: normalized };
}
