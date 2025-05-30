"use client"

import { useState, useEffect } from "react"
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingDown, TrendingUp, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"

export interface Notification {
  id: string
  type: "health_alert" | "engagement_drop" | "growth_opportunity" | "system" | "ai_insight"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  communityId?: string
  communityName?: string
  actionable?: boolean
  data?: any
}

interface NotificationSystemProps {
  className?: string
}

export function NotificationSystem({ className }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "engagement_drop",
      title: "Engagement Drop Alert",
      message: "Community 'Tech Innovators' dropped from 70 to 21 weekly interactions",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      priority: "high",
      communityId: "tech-innovators",
      communityName: "Tech Innovators",
      actionable: true,
      data: { previousValue: 70, currentValue: 21, metric: "weekly_interactions" },
    },
    {
      id: "2",
      type: "ai_insight",
      title: "AI Insight: User Segmentation",
      message: "New user segments identified: Super Actives (15%), Regular Contributors (35%), Drifting Users (50%)",
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      priority: "medium",
      actionable: true,
      data: { segments: { super_active: 15, regular: 35, drifting: 50 } },
    },
    {
      id: "3",
      type: "growth_opportunity",
      title: "Growth Opportunity",
      message: "Design Community shows 40% growth potential based on engagement patterns",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
      priority: "medium",
      communityId: "design-community",
      communityName: "Design Community",
      actionable: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "engagement_drop":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "growth_opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "health_alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "ai_insight":
        return <Sparkles className="h-4 w-4 text-purple-500" />
      case "system":
        return <CheckCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-950/20"
      case "medium":
        return "border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
      case "low":
        return "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
      default:
        return "border-l-gray-300 bg-gray-50/50 dark:bg-gray-950/20"
    }
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "ai_insight",
          title: "New AI Insight Available",
          message: "Weekly community health analysis completed",
          timestamp: new Date(),
          read: false,
          priority: "low",
          actionable: true,
        }
        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative overflow-hidden hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-300 group",
            className
          )}
        >
          <Bell className="h-4 w-4 group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] text-white font-bold animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-background/95 backdrop-blur-md border border-border/50">
        <div className="flex items-center justify-between border-b border-border/50 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification, index) => (
                <FadeIn key={notification.id} delay={index * 50}>
                  <div
                    className={cn(
                      "rounded-lg border-l-4 p-3 transition-all duration-300 hover:bg-muted/50 cursor-pointer group",
                      getPriorityColor(notification.priority),
                      !notification.read && "ring-1 ring-purple-500/20"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div className="group-hover:scale-110 transition-transform">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-none group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                            {notification.communityName && (
                              <Badge variant="outline" className="text-xs">
                                {notification.communityName}
                              </Badge>
                            )}
                            {notification.actionable && (
                              <Badge className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                                Actionable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
