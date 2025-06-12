"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

export function UserEngagementMetrics() {
  const metrics = [
    {
      label: "Account Activation Rate",
      value: 91.1,
      count: "41,205 / 45,231",
      color: "bg-green-500",
      trend: { value: 2.3, isPositive: true },
    },
    {
      label: "Profile Completion Rate",
      value: 72.7,
      count: "32,891 / 45,231",
      color: "bg-blue-500",
      trend: { value: 3.1, isPositive: true },
    },
    {
      label: "Community Join Rate",
      value: 64.0,
      count: "28,934 / 45,231",
      color: "bg-purple-500",
      trend: { value: 1.8, isPositive: true },
    },
    {
      label: "Event Participation Rate",
      value: 43.8,
      count: "19,823 / 45,231",
      color: "bg-amber-500",
      trend: { value: -0.4, isPositive: false },
    },
    {
      label: "Profile Scanning Adoption",
      value: 34.7,
      count: "15,672 / 45,231",
      color: "bg-teal-500",
      trend: { value: 5.2, isPositive: true },
    },
  ]

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
          User Engagement Funnel
        </CardTitle>
        <CardDescription className="text-neutral-400">User progression through key platform features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">{metric.count}</span>
                <div className="flex items-center text-xs">
                  <span
                    className={
                      metric.trend.isPositive
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {metric.trend.isPositive ? "+" : ""}
                    {metric.trend.value}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress 
                value={metric.value} 
                className="flex-1 bg-neutral-700"
                style={{ 
                  ['--progress-foreground' as any]: metric.color.replace('bg-', '').replace('-500', '') === 'green' ? '#10b981' :
                    metric.color.replace('bg-', '').replace('-500', '') === 'blue' ? '#3b82f6' :
                    metric.color.replace('bg-', '').replace('-500', '') === 'purple' ? '#8b5cf6' :
                    metric.color.replace('bg-', '').replace('-500', '') === 'amber' ? '#f59e0b' :
                    '#14b8a6'
                }}
              />
              <span className="text-sm font-semibold w-12 text-right text-white">{metric.value}%</span>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
          <h4 className="text-sm font-medium text-white mb-2">Engagement Insights</h4>
          <ul className="text-xs text-neutral-400 space-y-1">
            <li>• Profile scanning adoption is growing fastest (+5.2%)</li>
            <li>• Event participation needs attention (-0.4%)</li>
            <li>• Strong activation rate indicates good onboarding</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
