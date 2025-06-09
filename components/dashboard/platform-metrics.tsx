"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlatformMetricsData } from "@/lib/analytics-service"

interface PlatformMetricsProps {
  className?: string
}

export function PlatformMetrics({ className }: PlatformMetricsProps) {
  const [metrics, setMetrics] = useState<PlatformMetricsData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics/platform-metrics')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const platformMetricsData = await response.json()
        setMetrics(platformMetricsData)
      } catch (error) {
        console.error('Failed to fetch platform metrics data:', error)
        // Fallback to mock data if API call fails
        setMetrics([
          { metric: "Email Verification", value: 32891, total: 45231, percentage: 72.7 },
          { metric: "Account Activation", value: 41205, total: 45231, percentage: 91.1 },
          { metric: "Profile Completion", value: 28934, total: 45231, percentage: 64.0 },
          { metric: "Paid Conversion", value: 1982, total: 45231, percentage: 4.4 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className={cn("bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col", className)}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Target className="mr-2 h-5 w-5 text-green-400" />
            Platform Conversion Metrics
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">User conversion rates across key platform features</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="text-neutral-400">Loading metrics data...</div>
        </CardContent>
      </Card>
    )
  }

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
        {metrics.map((metricData) => (
          <div key={metricData.metric}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-neutral-200">{metricData.metric}</span>
              <span className="text-neutral-400">
                {metricData.value.toLocaleString()} / {metricData.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Progress 
                value={metricData.percentage} 
                className="flex-1 h-2.5 bg-neutral-700" 
              />
              <span className="text-sm font-semibold text-neutral-200 w-14 text-right">{metricData.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
