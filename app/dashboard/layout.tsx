/**
 * Dashboard Layout Component - RYLYTICS Main Application Structure
 * 
 * Root layout for all dashboard pages providing consistent navigation and structure.
 * Implements a sidebar-based layout pattern optimized for analytics data visualization.
 * 
 * Layout Architecture:
 * - Left sidebar: Primary navigation and quick actions
 * - Top header: User controls, notifications, and contextual actions  
 * - Main content: Dynamic page content with proper overflow handling
 * - Responsive: Collapsible sidebar for mobile/tablet devices
 * 
 * Features:
 * - Flexible sidebar that adapts to screen size
 * - Proper scroll handling for content overflow
 * - Consistent header across all dashboard pages
 * - Optimized for analytics data visualization
 * 
 * Connected to:
 * - /components/dashboard-sidebar.tsx (navigation menu)
 * - /components/dashboard-header.tsx (top header controls)
 * - /components/ui/sidebar.tsx (base sidebar component)
 * - All dashboard page components (children)
 */

import type React from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Main navigation sidebar - collapsible for mobile responsiveness */}
      <DashboardSidebar />
      
      {/* Main content area with proper inset handling */}
      <SidebarInset className="flex flex-1 flex-col overflow-hidden">
        {/* Fixed header with user controls and contextual actions */}
        <DashboardHeader />
        
        {/* Scrollable main content area for dashboard pages */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}
