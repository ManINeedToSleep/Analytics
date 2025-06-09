/**
 * @file database.ts
 * @description Database connection and Prisma client setup
 */
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: [], // Disabled query logging for cleaner console
  })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// Database utility functions
export const db = prisma 