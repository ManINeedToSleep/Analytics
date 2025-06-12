/**
 * Database Connection - RYLYTICS Prisma Client
 * 
 * Manages database connection using Prisma ORM for the analytics dashboard.
 * Implements singleton pattern to prevent connection pooling issues in development.
 * 
 * Features:
 * - Singleton Prisma client instance
 * - Development hot-reload safe connection management
 * - Production-optimized connection pooling
 * 
 * Database Schema:
 * - Users and profiles management
 * - Community analytics data
 * - Event tracking and metrics
 * - Tag-based categorization system
 * 
 * Connected to:
 * - /prisma/schema.prisma (database schema definition)
 * - /lib/analytics-service.ts (data queries and calculations)
 * - Environment variables for DATABASE_URL configuration
 */

import { PrismaClient } from '@prisma/client'

// Global variable for singleton pattern in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma database client instance
 * 
 * Uses singleton pattern to ensure single connection in development mode.
 * In production, creates new instance for optimal connection pooling.
 * This prevents the "too many connections" error during development hot reloads.
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient()

// Store client instance globally in development to prevent multiple connections
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db 