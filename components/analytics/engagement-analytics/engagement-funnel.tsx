"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Users, Eye, MousePointer, MessageSquare, Share2, Heart } from "lucide-react"

const funnelSteps = [
  {
    name: "Platform Visitors",
    users: 45231,
    percentage: 100,
    icon: Users,
    color: "#8b5cf6",
    description: "Total unique users",
  },
  {
    name: "Content Viewers",
    users: 38947,
    percentage: 86.1,
    icon: Eye,
    color: "#3b82f6",
    description: "Viewed at least one post",
  },
  {
    name: "Active Browsers",
    users: 31258,
    percentage: 69.1,
    icon: MousePointer,
    color: "#10b981",
    description: "Clicked on content",
  },
  {
    name: "Engaged Users",
    users: 22184,
    percentage: 49.0,
    icon: MessageSquare,
    color: "#f59e0b",
    description: "Liked, commented, or shared",
  },
  {
    name: "Content Creators",
    users: 15462,
    percentage: 34.2,
    icon: Share2,
    color: "#ef4444",
    description: "Created original content",
  },
  {
    name: "Super Engaged",
    users: 8247,
    percentage: 18.2,
    icon: Heart,
    color: "#8b5cf6",
    description: "Daily active contributors",
  },
]

const conversionMetrics = [
  { from: "Visitors", to: "Viewers", rate: 86.1, benchmark: 80, status: "good" },
  { from: "Viewers", to: "Browsers", rate: 80.2, benchmark: 75, status: "excellent" },
  { from: "Browsers", to: "Engaged", rate: 70.9, benchmark: 65, status: "excellent" },
  { from: "Engaged", to: "Creators", rate: 69.7, benchmark: 60, status: "excellent" },
  { from: "Creators", to: "Super Engaged", rate: 53.3, benchmark: 45, status: "excellent" },
]

export function EngagementFunnel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20"
      case "good":
        return "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20"
      case "warning":
        return "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20"
      default:
        return "text-gray-600 border-gray-200 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getStepColor = (index: number) => {
    return funnelSteps[index].color
  }

  const getConversionRate = (users: number, totalUsers: number) => {
    return ((users / totalUsers) * 100).toFixed(1)
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <CardTitle>User Engagement Funnel</CardTitle>
        <CardDescription>Track user progression through engagement levels</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          {/* Funnel Visualization */}
          <div className="space-y-3">
            {funnelSteps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === funnelSteps.length - 1
              const dropoffRate =
                index > 0
                  ? (((funnelSteps[index - 1].users - step.users) / funnelSteps[index - 1].users) * 100).toFixed(1)
                  : 0

              const conversionFromPrevious =
                index > 0 ? ((step.users / funnelSteps[index - 1].users) * 100).toFixed(1) : 100

              step.dropoff = Number.parseFloat((100 - Number.parseFloat(conversionFromPrevious)).toFixed(1))

              return (
                <div key={step.name} className="relative">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 hover:shadow-md transition-all duration-300">
                    <div
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white shadow-lg flex-shrink-0"
                      style={{ backgroundColor: getStepColor(index) }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm sm:text-base">{step.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {step.users.toLocaleString()} users
                          </Badge>
                          {index > 0 && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${step.dropoff > 30 ? "text-red-600 border-red-200" : step.dropoff > 15 ? "text-amber-600 border-amber-200" : "text-green-600 border-green-200"}`}
                            >
                              {conversionFromPrevious}% conversion
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress
                          value={getConversionRate(step.users, funnelSteps[0].users) as any}
                          className="h-2 sm:h-3"
                          style={{
                            background: `linear-gradient(to right, ${getStepColor(index)}20, transparent)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{getConversionRate(step.users, funnelSteps[0].users)}% of total</span>
                          {step.dropoff > 0 && <span className="text-red-500">-{step.dropoff}% drop-off</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center my-2">
                      <ArrowDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Conversion Rates */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Conversion Rates</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {conversionMetrics.map((metric) => (
                <div
                  key={`${metric.from}-${metric.to}`}
                  className="p-3 sm:p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium">
                      {metric.from} → {metric.to}
                    </span>
                    <Badge className={getStatusColor(metric.status)} variant="outline">
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">{metric.rate}%</div>
                    <Progress value={metric.rate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Benchmark: {metric.benchmark}%</span>
                      <span className={metric.rate > metric.benchmark ? "text-green-600" : "text-red-600"}>
                        {metric.rate > metric.benchmark ? "+" : ""}
                        {(metric.rate - metric.benchmark).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">18.2%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Overall Conversion</div>
              <div className="text-xs text-muted-foreground mt-1">Visitors to Super Engaged</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-green-600">69.7%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Creator Conversion</div>
              <div className="text-xs text-muted-foreground mt-1">Engaged to Creators</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">86.1%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Initial Engagement</div>
              <div className="text-xs text-muted-foreground mt-1">Visitors to Viewers</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
