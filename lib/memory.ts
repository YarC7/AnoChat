import { db } from "@/db";
import { userMemory } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function getMemory(userId: string, namespace = "default") {
  const rows = await db
    .select({
      id: userMemory.id,
      key: userMemory.key,
      value: userMemory.value,
      createdAt: userMemory.createdAt,
      updatedAt: userMemory.updatedAt,
    })
    .from(userMemory)
    .where(
      and(eq(userMemory.userId, userId), eq(userMemory.namespace, namespace))
    );

  return rows.map((r) => ({
    id: r.id,
    key: r.key,
    value: r.value,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }));
}

export async function getMemoryKey(
  userId: string,
  key: string,
  namespace = "default"
) {
  const rows = await db
    .select({
      id: userMemory.id,
      key: userMemory.key,
      value: userMemory.value,
      createdAt: userMemory.createdAt,
      updatedAt: userMemory.updatedAt,
    })
    .from(userMemory)
    .where(
      and(
        eq(userMemory.userId, userId),
        eq(userMemory.namespace, namespace),
        eq(userMemory.key, key)
      )
    )
    .limit(1);
  return rows[0] || null;
}

export async function setMemoryKey(
  userId: string,
  key: string,
  value: unknown,
  namespace = "default"
) {
  if (!key || key.length > 256)
    throw new Error("Invalid key: must be 1-256 characters");
  // Ensure value can be serialized
  let serialized: string;
  try {
    serialized = JSON.stringify(value);
  } catch {
    throw new Error("Value must be JSON serializable");
  }

  if (serialized.length > 10000) {
    throw new Error("Value too large");
  }

  const existing = await db
    .select({ id: userMemory.id })
    .from(userMemory)
    .where(
      and(
        eq(userMemory.userId, userId),
        eq(userMemory.namespace, namespace),
        eq(userMemory.key, key)
      )
    )
    .limit(1);

  if (existing[0]) {
    await db
      .update(userMemory)
      .set({ value: serialized, updatedAt: new Date() })
      .where(eq(userMemory.id, existing[0].id));
    return { id: existing[0].id, key, value };
  }
  const id = randomUUID();
  await db
    .insert(userMemory)
    .values({ id, userId, namespace, key, value: serialized });
  return { id, key, value };
}

export async function deleteMemoryKey(
  userId: string,
  key: string,
  namespace = "default"
) {
  await db
    .delete(userMemory)
    .where(
      and(
        eq(userMemory.userId, userId),
        eq(userMemory.key, key),
        eq(userMemory.namespace, namespace)
      )
    );
  return { success: true };
}
