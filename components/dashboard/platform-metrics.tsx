"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"
import { cn } from "@/lib/utils"

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
    },
    {
      label: "Account Activation Rate",
      value: 91.1,
      total: 45231,
      completed: 41205,
    },
    {
      label: "Community Participation Rate",
      value: 64.0,
      total: 45231,
      completed: 28934,
    },
    {
      label: "Event Participation Rate",
      value: 43.8,
      total: 45231,
      completed: 19823,
    },
    {
      label: "Profile Scanning Adoption",
      value: 34.7,
      total: 45231,
      completed: 15672,
    },
  ]

  return (
    <Card className={cn("bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Target className="mr-2 h-5 w-5 text-green-400" />
          Platform Conversion Metrics
        </CardTitle>
        <CardDescription className="text-neutral-400 text-sm">User conversion rates across key platform features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 flex-grow pt-2">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-neutral-200">{metric.label}</span>
              <span className="text-neutral-400">
                {metric.completed.toLocaleString()} / {metric.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress 
                value={metric.value} 
                className="flex-1 h-2.5 bg-neutral-700" 
                indicatorClassName="bg-neutral-300" 
              />
              <span className="text-sm font-semibold text-neutral-200 w-14 text-right">{metric.value.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
