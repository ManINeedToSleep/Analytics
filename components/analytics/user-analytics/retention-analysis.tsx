"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const retentionData = [
  { day: "Day 0", cohort1: 100, cohort2: 100, cohort3: 100, cohort4: 100 },
  { day: "Day 1", cohort1: 78.5, cohort2: 82.1, cohort3: 75.8, cohort4: 80.2 },
  { day: "Day 3", cohort1: 65.2, cohort2: 68.9, cohort3: 62.1, cohort4: 67.3 },
  { day: "Day 7", cohort1: 52.8, cohort2: 56.4, cohort3: 49.7, cohort4: 54.1 },
  { day: "Day 14", cohort1: 41.3, cohort2: 44.8, cohort3: 38.9, cohort4: 42.6 },
  { day: "Day 30", cohort1: 28.7, cohort2: 32.1, cohort3: 26.4, cohort4: 30.8 },
  { day: "Day 60", cohort1: 19.4, cohort2: 22.6, cohort3: 17.8, cohort4: 21.2 },
  { day: "Day 90", cohort1: 14.2, cohort2: 16.8, cohort3: 12.9, cohort4: 15.7 },
]

const retentionMetrics = [
  { period: "1-Day Retention", rate: 78.5, benchmark: 75, status: "good" },
  { period: "7-Day Retention", rate: 52.8, benchmark: 50, status: "good" },
  { period: "30-Day Retention", rate: 28.7, benchmark: 25, status: "excellent" },
  { period: "90-Day Retention", rate: 14.2, benchmark: 15, status: "warning" },
]

const churnAnalysis = [
  { segment: "New Users (0-7 days)", users: 2450, churnRate: 21.5, risk: "medium" },
  { segment: "Active Users (8-30 days)", users: 8920, churnRate: 8.3, risk: "low" },
  { segment: "Established Users (31-90 days)", users: 12680, churnRate: 4.7, risk: "low" },
  { segment: "Long-term Users (90+ days)", users: 21180, churnRate: 2.1, risk: "low" },
]

export function RetentionAnalysis() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20"
      case "good": return "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20"
      case "warning": return "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20"
      case "critical": return "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20"
      default: return "text-gray-600 border-gray-200 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600"
      case "medium": return "text-amber-600"
      case "high": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Retention Curves */}
      <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <CardTitle>User Retention Curves</CardTitle>
          <CardDescription>Track how users return to the platform over time by cohort</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <Chart height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis 
                  dataKey="day" 
                  stroke="currentColor" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  opacity={0.7}
                />
                <ChartTooltip formatter={(value) => [`${value}%`, "Retention Rate"]} />
                <Line
                  type="monotone"
                  dataKey="cohort1"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  name="Jan 2024 Cohort"
                />
                <Line
                  type="monotone"
                  dataKey="cohort2"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Feb 2024 Cohort"
                />
                <Line
                  type="monotone"
                  dataKey="cohort3"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Mar 2024 Cohort"
                />
                <Line
                  type="monotone"
                  dataKey="cohort4"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                  name="Apr 2024 Cohort"
                />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
          
          <div className="mt-6 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm text-muted-foreground">Jan 2024 Cohort</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-muted-foreground">Feb 2024 Cohort</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Mar 2024 Cohort</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-muted-foreground">Apr 2024 Cohort</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Retention Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Retention Benchmarks</CardTitle>
            <CardDescription>Current retention rates vs. industry benchmarks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {retentionMetrics.map((metric) => (
              <div key={metric.period} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.period}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{metric.rate}%</span>
                    <Badge className={getStatusColor(metric.status)} variant="outline">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={metric.rate} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Benchmark: {metric.benchmark}%</span>
                    <span>{metric.rate > metric.benchmark ? '+' : ''}{(metric.rate - metric.benchmark).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Churn Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Churn Risk Analysis</CardTitle>
            <CardDescription>User segments and their churn probability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {churnAnalysis.map((segment) => (
              <div key={segment.segment} className="p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{segment.segment}</span>
                  <Badge className={getRiskColor(segment.risk)} variant="outline">
                    {segment.risk} risk
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{segment.users.toLocaleString()} users</span>
                  <span className="font-medium">{segment.churnRate}% churn rate</span>
                </div>
                <Progress value={100 - segment.churnRate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
