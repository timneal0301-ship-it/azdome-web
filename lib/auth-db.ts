// Node-only auth helpers: password hashing + user CRUD. Touches the async DB
// adapter (KV in production, JSON in dev). Edge runtime cannot import this
// file because it transitively pulls in `fs`.

import "server-only";

import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

import { db } from "./db";
import { type PublicUser } from "./auth";

const scryptAsync = promisify(scrypt);

export type UserRecord = {
  email: string;
  name: string;
  pwHash: string; // "salt:hash" hex
  createdAt: string;
};

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt.toString("hex")}:${buf.toString("hex")}`;
}

// 16-byte salt (32 hex chars) + ":" + 64-byte scrypt hash (128 hex chars).
const PW_HASH_RE = /^[0-9a-f]{32}:[0-9a-f]{128}$/;

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  if (!PW_HASH_RE.test(stored)) return false;
  const [saltHex, hashHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const got = (await scryptAsync(password, salt, expected.length)) as Buffer;
  return expected.length === got.length && timingSafeEqual(expected, got);
}

function userKey(email: string) {
  return `user:${email.toLowerCase().trim()}`;
}

export async function findUser(email: string): Promise<UserRecord | undefined> {
  return db.get<UserRecord>(userKey(email));
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
}): Promise<UserRecord> {
  const email = input.email.toLowerCase().trim();
  if (await findUser(email)) throw new Error("email-exists");
  const record: UserRecord = {
    email,
    name: input.name.trim() || email.split("@")[0],
    pwHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  await db.set(userKey(email), record);
  return record;
}

export async function authenticate(
  email: string,
  password: string,
): Promise<UserRecord | null> {
  const user = await findUser(email);
  if (!user) return null;
  const ok = await verifyPassword(password, user.pwHash);
  return ok ? user : null;
}

export function toPublic(u: UserRecord): PublicUser {
  return { email: u.email, name: u.name };
}
