import { db } from "../index.js";
import { NewUser, users } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(user: NewUser) {
  const [result] = await db.insert(users).values(user).onConflictDoNothing().returning();
  return result;
}

export async function deleteUser(email: string) {
  const [result] = await db.delete(users).where(eq(users.email, email)).returning();
  return result;
}
