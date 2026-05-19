"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import {
  USER_COOKIE,
  USER_COOKIE_OPTIONS,
  isValidEmail,
  makeSessionToken,
  readSessionEmail,
  type PublicUser,
} from "@/lib/auth";
import { authenticate, createUser, findUser, toPublic } from "@/lib/auth-db";

export type FormState = { error: string | null; success?: string };

export async function signupAction(
  _prev: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/account");

  if (!isValidEmail(email)) return { error: "请输入有效的邮箱地址" };
  if (password.length < 8) return { error: "密码至少 8 个字符" };
  if (!name) return { error: "请输入姓名" };

  try {
    const user = await createUser({ email, name, password });
    const token = await makeSessionToken(user.email);
    cookies().set(USER_COOKIE, token, USER_COOKIE_OPTIONS);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "registration failed";
    if (msg === "email-exists") {
      return { error: "该邮箱已注册,请直接登录" };
    }
    return { error: msg };
  }
  redirect(next.startsWith("/") ? next : "/account");
}

export async function loginAction(
  _prev: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/account");

  if (!email || !password) return { error: "请输入邮箱和密码" };

  const user = await authenticate(email, password);
  if (!user) return { error: "邮箱或密码错误" };

  const token = await makeSessionToken(user.email);
  cookies().set(USER_COOKIE, token, USER_COOKIE_OPTIONS);
  redirect(next.startsWith("/") ? next : "/account");
}

export async function logoutAction() {
  cookies().delete(USER_COOKIE);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const token = cookies().get(USER_COOKIE)?.value;
  const email = await readSessionEmail(token);
  if (!email) return null;
  const u = findUser(email);
  return u ? toPublic(u) : null;
}
