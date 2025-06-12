/**
 * Root Layout Component - RYLYTICS Analytics Dashboard
 * 
 * This is the top-level layout that wraps all pages in the application.
 * Provides global styling, theme management, and UI providers.
 * 
 * Features:
 * - Inter font integration for consistent typography
 * - Theme provider for dark/light mode switching
 * - Sidebar provider for dashboard navigation
 * - Toast notifications system
 * - Global CSS and Tailwind styles
 * 
 * Connected to:
 * - /components/theme-provider.tsx (theme management)
 * - /components/ui/sidebar.tsx (navigation structure) 
 * - /components/ui/toaster.tsx (notification system)
 * - ./globals.css (global styles and Tailwind directives)
 */

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"

// Configure Inter font with Latin subset for optimal loading
const inter = Inter({ subsets: ["latin"] })

// SEO metadata for the analytics dashboard
export const metadata: Metadata = {
  title: "RYLYTICS - Analytics Dashboard",
  description: "Internal analytics platform for RYLA - Real-time data visualization and insights",
  generator: 'Next.js 15.2.4'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Theme provider enables system/dark/light mode switching */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {/* Sidebar provider manages dashboard navigation state */}
          <SidebarProvider>
            {children}
          </SidebarProvider>
          {/* Global toast notification system */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
