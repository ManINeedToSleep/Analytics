"use client"

import { useState } from "react"
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const engagementData = [
  { date: "Jan 1", dau: 6420, wau: 28450, posts: 1240, comments: 3680, shares: 890, likes: 5420 },
  { date: "Jan 8", dau: 6890, wau: 29200, posts: 1380, comments: 3920, shares: 950, likes: 5780 },
  { date: "Jan 15", dau: 7120, wau: 30100, posts: 1450, comments: 4100, shares: 1020, likes: 6100 },
  { date: "Jan 22", dau: 7450, wau: 31200, posts: 1520, comments: 4350, shares: 1080, likes: 6450 },
  { date: "Jan 29", dau: 7680, wau: 32100, posts: 1590, comments: 4580, shares: 1150, likes: 6720 },
  { date: "Feb 5", dau: 7920, wau: 33200, posts: 1680, comments: 4820, shares: 1220, likes: 7100 },
  { date: "Feb 12", dau: 8150, wau: 34100, posts: 1750, comments: 5020, shares: 1290, likes: 7380 },
  { date: "Feb 19", dau: 8380, wau: 35200, posts: 1820, comments: 5280, shares: 1360, likes: 7650 },
  { date: "Feb 26", dau: 8247, wau: 34890, posts: 1780, comments: 5150, shares: 1320, likes: 7520 },
]

const activityMetrics = [
  { name: "Posts Created", value: 15420, change: 12.3, color: "#8b5cf6" },
  { name: "Comments Added", value: 42680, change: 8.7, color: "#3b82f6" },
  { name: "Content Shared", value: 10890, change: 15.2, color: "#10b981" },
  { name: "Reactions Given", value: 68420, change: 6.8, color: "#f59e0b" },
]

export function EngagementMetrics() {
  const [metric, setMetric] = useState("dau")

  const getMetricLabel = () => {
    switch (metric) {
      case "wau":
        return "Weekly Active Users"
      case "posts":
        return "Posts Created"
      case "comments":
        return "Comments Added"
      case "shares":
        return "Content Shared"
      case "likes":
        return "Reactions Given"
      default:
        return "Daily Active Users"
    }
  }

  const getMetricColor = () => {
    switch (metric) {
      case "wau":
        return "#3b82f6"
      case "posts":
        return "#8b5cf6"
      case "comments":
        return "#10b981"
      case "shares":
        return "#f59e0b"
      case "likes":
        return "#ef4444"
      default:
        return "#8b5cf6"
    }
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-8 relative z-10">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">User Engagement Trends</CardTitle>
          <CardDescription>Track user activity and engagement patterns over time</CardDescription>
        </div>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dau">Daily Active Users</SelectItem>
            <SelectItem value="wau">Weekly Active Users</SelectItem>
            <SelectItem value="posts">Posts Created</SelectItem>
            <SelectItem value="comments">Comments Added</SelectItem>
            <SelectItem value="shares">Content Shared</SelectItem>
            <SelectItem value="likes">Reactions Given</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="relative z-10">
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
              <XAxis
                dataKey="date"
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
                tickFormatter={(value) => `${value.toLocaleString()}`}
                opacity={0.7}
              />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey={metric}
                stroke={getMetricColor()}
                strokeWidth={3}
                fill="url(#engagementGradient)"
                dot={{ fill: getMetricColor(), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getMetricColor(), strokeWidth: 2, fill: "white" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {activityMetrics.map((item, index) => (
            <div
              key={item.name}
              className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 border border-border/50 hover:shadow-md transition-all duration-300"
            >
              <div className="text-lg sm:text-xl font-bold mb-1" style={{ color: item.color }}>
                {item.value.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-2">{item.name}</div>
              <Badge
                variant="outline"
                className={`text-xs ${item.change > 0 ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20" : "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20"}`}
              >
                {item.change > 0 ? "+" : ""}
                {item.change}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
