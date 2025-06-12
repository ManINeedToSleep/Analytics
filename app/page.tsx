/**
 * Root Page Component - Entry Point for RYLYTICS
 * 
 * This is the landing page that handles initial routing for the analytics dashboard.
 * Implements security-first approach by redirecting unauthenticated users to login.
 * 
 * Flow:
 * 1. User navigates to root URL (/)
 * 2. Automatically redirects to /login for authentication
 * 3. After successful login, user proceeds to /dashboard
 * 
 * Security Note:
 * This ensures no unauthorized access to analytics data by forcing
 * authentication before accessing any dashboard functionality.
 * 
 * Connected to:
 * - /app/login/page.tsx (authentication interface)
 * - /app/dashboard/page.tsx (main analytics dashboard)
 */

import { redirect } from "next/navigation"

export default function Home() {
  // Redirect all traffic to login page for authentication
  // This ensures security-first approach for analytics access
  redirect("/login")
}
