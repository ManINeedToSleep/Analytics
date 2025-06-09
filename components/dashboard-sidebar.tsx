"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Building, ChevronDown, Database, LayoutDashboard, LogOut, Mail, Settings, Users, Zap, Calendar, Sparkles, Trophy, Globe, ChevronRight } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FadeIn } from "@/components/ui/fade-in"

export function DashboardSidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Platform Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Communities",
      icon: Building,
      items: [
        {
          title: "Leaderboard",
          href: "/dashboard/leaderboard",
          icon: Trophy,
        },
        {
          title: "Analytics",
          href: "/dashboard/communities", 
          icon: BarChart3,
        },
      ]
    },
    {
      title: "Users & Profiles",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Events & Activities",
      href: "/dashboard/events",
      icon: Calendar,
    },
    {
      title: "AI Insights",
      href: "/dashboard/ai-insights",
      icon: Zap,
    },
  ]

  const utilityNavItems = [
    {
      title: "Email Reports",
      href: "/dashboard/email-reports",
      icon: Mail,
    },
    {
      title: "Database",
      href: "/dashboard/database",
      icon: Database,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar 
      collapsible="offcanvas" 
      className="border-r border-border/50 bg-sidebar/95 backdrop-blur-md"
    >
      <SidebarHeader className="border-b border-border/50 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <FadeIn delay={100}>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                RYLYTICS
              </span>
              <span className="text-xs text-muted-foreground">Analytics 2.0</span>
            </div>
          </div>
        </FadeIn>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item, index) => (
                <FadeIn key={item.title} delay={200 + index * 50}>
                  <SidebarMenuItem>
                    {item.items ? (
                      <Collapsible className="group/collapsible">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="group transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                          >
                            <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                              {item.title}
                            </span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.href}>
                                <SidebarMenuSubButton 
                                  asChild 
                                  isActive={pathname === subItem.href}
                                  className="group transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-blue-500/20"
                                >
                                  <Link href={subItem.href} className="flex items-center gap-3">
                                    <subItem.icon className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === item.href} 
                        tooltip={item.title}
                        className="group transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-blue-500/20 data-[active=true]:border-r-2 data-[active=true]:border-purple-500"
                      >
                        <Link href={item.href!} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                </FadeIn>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="my-4 bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
            Utilities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityNavItems.map((item, index) => (
                <FadeIn key={item.href} delay={400 + index * 50}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href} 
                      tooltip={item.title}
                      className="group transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-blue-500/20 data-[active=true]:border-r-2 data-[active=true]:border-purple-500"
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </FadeIn>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-4 bg-gradient-to-r from-purple-500/5 to-blue-500/5">
        <FadeIn delay={600}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-purple-500/20 transition-all duration-300 hover:ring-purple-500/40">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Meredith" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                  M
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Meredith</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-300"
                >
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border border-border/50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </FadeIn>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
