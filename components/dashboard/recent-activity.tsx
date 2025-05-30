"use client"

import type React from "react"

import { Activity, Calendar, Building, Users, UserPlus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ActivityItem {
  id: string
  type: "user_joined" | "community_created" | "event_created" | "profile_completed"
  description: string
  timestamp: string
  icon: React.ReactNode
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "community_created",
    description: "New community 'AI Enthusiasts' created",
    timestamp: "2 minutes ago",
    icon: <Building className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "2",
    type: "user_joined",
    description: "25 new users joined the platform",
    timestamp: "5 minutes ago",
    icon: <UserPlus className="h-4 w-4 text-green-500" />,
  },
  {
    id: "3",
    type: "event_created",
    description: "Event 'Tech Networking Mixer' scheduled",
    timestamp: "12 minutes ago",
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
  },
  {
    id: "4",
    type: "profile_completed",
    description: "150+ users completed their profiles today",
    timestamp: "1 hour ago",
    icon: <Users className="h-4 w-4 text-amber-500" />,
  },
  {
    id: "5",
    type: "community_created",
    description: "New community 'Digital Marketing' created",
    timestamp: "2 hours ago",
    icon: <Building className="h-4 w-4 text-blue-500" />,
  },
  {
    id: "6",
    type: "event_created",
    description: "Event 'Startup Pitch Night' scheduled",
    timestamp: "3 hours ago",
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Platform Activity
        </CardTitle>
        <CardDescription>Latest activities across the RYLA platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="mt-1">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
