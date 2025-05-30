"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function UserEngagementMetrics() {
  const metrics = [
    {
      label: "Account Activation Rate",
      value: 91.1,
      count: "41,205 / 45,231",
      color: "bg-green-500",
    },
    {
      label: "Profile Completion Rate",
      value: 72.7,
      count: "32,891 / 45,231",
      color: "bg-blue-500",
    },
    {
      label: "Community Join Rate",
      value: 64.0,
      count: "28,934 / 45,231",
      color: "bg-purple-500",
    },
    {
      label: "Event Participation Rate",
      value: 43.8,
      count: "19,823 / 45,231",
      color: "bg-amber-500",
    },
    {
      label: "Profile Scanning Adoption",
      value: 34.7,
      count: "15,672 / 45,231",
      color: "bg-teal-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Engagement Funnel</CardTitle>
        <CardDescription>User progression through key platform features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{metric.label}</span>
              <span className="text-muted-foreground">{metric.count}</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={metric.value} className="flex-1" />
              <span className="text-sm font-semibold w-12 text-right">{metric.value}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
