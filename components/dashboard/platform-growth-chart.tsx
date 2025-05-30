"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp } from 'lucide-react'

const platformData = [
  { month: "Jan", users: 28450, communities: 89, events: 234 },
  { month: "Feb", users: 31200, communities: 95, events: 267 },
  { month: "Mar", users: 34800, communities: 102, events: 289 },
  { month: "Apr", users: 38100, communities: 108, events: 312 },
  { month: "May", users: 41650, communities: 115, events: 356 },
  { month: "Jun", users: 45231, communities: 127, events: 384 },
]

export function PlatformGrowthChart() {
  const [metric, setMetric] = useState("users")

  const getMetricValue = (item: any) => {
    switch (metric) {
      case "communities":
        return item.communities
      case "events":
        return item.events
      default:
        return item.users
    }
  }

  const getMetricLabel = () => {
    switch (metric) {
      case "communities":
        return "Communities"
      case "events":
        return "Events"
      default:
        return "Users"
    }
  }

  const getGradientColor = () => {
    switch (metric) {
      case "communities":
        return "#3b82f6"
      case "events":
        return "#10b981"
      default:
        return "#8b5cf6"
    }
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-8 relative z-10">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            <TrendingUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Platform Growth
          </CardTitle>
          <CardDescription>Track overall platform growth metrics</CardDescription>
        </div>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[120px] border-muted-foreground/20 hover:border-purple-500 transition-colors">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="communities">Communities</SelectItem>
            <SelectItem value="events">Events</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="relative z-10">
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={platformData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getGradientColor()} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getGradientColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
              <XAxis 
                dataKey="month" 
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
              <Line
                type="monotone"
                dataKey={metric}
                stroke={getGradientColor()}
                strokeWidth={3}
                dot={{ fill: getGradientColor(), strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: getGradientColor(), strokeWidth: 2, fill: "white" }}
                fill="url(#chartGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-6 text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
          <span className="text-sm text-muted-foreground">Total {getMetricLabel()}: </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {getMetricValue(platformData[platformData.length - 1]).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
