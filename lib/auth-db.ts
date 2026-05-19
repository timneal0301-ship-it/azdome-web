// Node-only auth helpers: password hashing + user CRUD. Touches the JSON DB
// and is therefore unsafe for Edge runtime / middleware. Import only from
// Node server contexts (server actions, route handlers, server components).

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

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const got = (await scryptAsync(password, salt, expected.length)) as Buffer;
  return expected.length === got.length && timingSafeEqual(expected, got);
}

function userKey(email: string) {
  return `user:${email.toLowerCase().trim()}`;
}

export function findUser(email: string): UserRecord | undefined {
  return db.get<UserRecord>(userKey(email));
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
}): Promise<UserRecord> {
  const email = input.email.toLowerCase().trim();
  if (findUser(email)) throw new Error("email-exists");
  const record: UserRecord = {
    email,
    name: input.name.trim() || email.split("@")[0],
    pwHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  db.set(userKey(email), record);
  return record;
}

export async function authenticate(
  email: string,
  password: string,
): Promise<UserRecord | null> {
  const user = findUser(email);
  if (!user) return null;
  const ok = await verifyPassword(password, user.pwHash);
  return ok ? user : null;
}

export function toPublic(u: UserRecord): PublicUser {
  return { email: u.email, name: u.name };
}
