"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PlatformMetricsProps {
  className?: string
}

export function PlatformMetrics({ className }: PlatformMetricsProps) {
  const metrics = [
    {
      label: "Profile Completion Rate",
      value: 72.7,
      total: 45231,
      completed: 32891,
      color: "bg-green-500",
    },
    {
      label: "Account Activation Rate",
      value: 91.1,
      total: 45231,
      completed: 41205,
      color: "bg-blue-500",
    },
    {
      label: "Community Participation Rate",
      value: 64.0,
      total: 45231,
      completed: 28934,
      color: "bg-purple-500",
    },
    {
      label: "Event Participation Rate",
      value: 43.8,
      total: 45231,
      completed: 19823,
      color: "bg-amber-500",
    },
    {
      label: "Profile Scanning Adoption",
      value: 34.7,
      total: 45231,
      completed: 15672,
      color: "bg-teal-500",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Platform Conversion Metrics</CardTitle>
        <CardDescription>User conversion rates across key platform features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{metric.label}</span>
              <span className="text-muted-foreground">
                {metric.completed.toLocaleString()} / {metric.total.toLocaleString()}
              </span>
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
