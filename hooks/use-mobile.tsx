/**
 * Mobile Detection Hook - RYLYTICS Responsive Utilities
 * 
 * Custom React hook for detecting mobile/tablet screen sizes.
 * Enables responsive dashboard behavior and mobile-optimized layouts.
 * 
 * Breakpoint Logic:
 * - Mobile: < 768px (Tailwind 'md' breakpoint)
 * - Tablet/Desktop: ≥ 768px
 * 
 * Features:
 * - Real-time screen size monitoring
 * - Debounced resize handling for performance
 * - SSR-safe with proper hydration
 * - Tailwind CSS breakpoint alignment
 * 
 * Use Cases:
 * - Conditional component rendering
 * - Mobile-specific navigation behavior
 * - Responsive sidebar collapsing
 * - Touch-optimized interactions
 * 
 * Connected to:
 * - Dashboard sidebar responsive behavior
 * - Mobile navigation components
 * - Chart responsive sizing logic
 */

"use client"

import * as React from "react"

// Tailwind CSS 'md' breakpoint for mobile detection
const MOBILE_BREAKPOINT = 768

/**
 * Detects if current viewport is mobile-sized
 * 
 * Uses window.matchMedia for efficient media query monitoring.
 * Updates state when screen size crosses the mobile breakpoint.
 * 
 * @returns boolean - true if viewport width < 768px
 */
export function useMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Create media query for mobile detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Update state based on current screen size
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for screen size changes
    mql.addEventListener('change', onChange)
    
    // Set initial state
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup listener on component unmount
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
