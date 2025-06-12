/**
 * Theme Provider Component - RYLYTICS Dark/Light Mode System
 * 
 * Manages application-wide theme state using next-themes library.
 * Provides seamless dark/light mode switching with system preference detection.
 * 
 * Features:
 * - System theme detection (respects OS preference)
 * - Manual theme switching (dark/light/system)
 * - CSS class-based theme implementation
 * - Hydration-safe theme loading
 * 
 * Theme Integration:
 * - Uses 'class' strategy for Tailwind dark mode
 * - Prevents flash of unstyled content (FOUC)
 * - Synchronizes with CSS custom properties
 * 
 * Connected to:
 * - /app/globals.css (theme-specific CSS variables)
 * - All components using dark: prefixed Tailwind classes
 * - Theme toggle components throughout the dashboard
 */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

/**
 * Application theme provider wrapper
 * 
 * Wraps the entire application to provide theme context.
 * Configures next-themes with class-based theme switching
 * for optimal integration with Tailwind CSS dark mode.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
