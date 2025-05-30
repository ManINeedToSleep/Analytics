"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationSystem } from "@/components/notification-system"
import { FadeIn } from "@/components/ui/fade-in"

export function DashboardHeader() {
  return (
    <FadeIn direction="down">
      <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b bg-background/80 backdrop-blur-md px-3 sm:px-6 transition-all duration-300">
        <SidebarTrigger className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors" />
        <div className="flex flex-1 items-center gap-2 sm:gap-4 md:gap-8">
          <form className="flex-1 md:flex md:max-w-sm">
            <div className="relative w-full group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-purple-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background/50 pl-8 h-9 sm:h-10 text-sm border-muted-foreground/20 focus:border-purple-500 transition-all duration-300 hover:bg-background/80"
              />
            </div>
          </form>
          <div className="ml-auto">
            <NotificationSystem />
          </div>
        </div>
      </header>
    </FadeIn>
  )
}
