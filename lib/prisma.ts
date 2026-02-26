// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prismaSingleton: PrismaClient | null = null;

export function getPrisma() {
  if (prismaSingleton) return prismaSingleton;

  prismaSingleton = new PrismaClient({
    // If you later use Prisma Accelerate, set PRISMA_ACCELERATE_URL and uncomment:
    // datasourceUrl: process.env.PRISMA_ACCELERATE_URL,
  });

  return prismaSingleton;
}