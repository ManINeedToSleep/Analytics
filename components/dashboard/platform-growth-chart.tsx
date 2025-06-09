"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp } from 'lucide-react'
import { cn } from "@/lib/utils"
import { PlatformGrowthData } from "@/lib/analytics-service"

export function PlatformGrowthChart() {
  const [metric, setMetric] = useState("users")
  const [data, setData] = useState<PlatformGrowthData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics/platform-growth')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const platformData = await response.json()
        setData(platformData)
      } catch (error) {
        console.error('Failed to fetch platform growth data:', error)
        // Fallback to mock data if API call fails
        setData([
          { month: "Jan", users: 28450, communities: 89, events: 234 },
          { month: "Feb", users: 31200, communities: 95, events: 267 },
          { month: "Mar", users: 34800, communities: 102, events: 289 },
          { month: "Apr", users: 38100, communities: 108, events: 312 },
          { month: "May", users: 41650, communities: 115, events: 356 },
          { month: "Jun", users: 45231, communities: 127, events: 384 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const currentMetricData = data.map(item => ({
    month: item.month,
    value: metric === "users" ? item.users : metric === "communities" ? item.communities : item.events,
  }))

  const getMetricLabel = () => {
    if (metric === "communities") return "Communities";
    if (metric === "events") return "Events";
    return "Users";
  };

  // Define a consistent purple for the line chart as per the image
  const lineChartColor = "#8b5cf6"; // Purple color from Tailwind (purple-500)

  if (loading) {
    return (
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
              Platform Growth
            </CardTitle>
            <CardDescription className="text-neutral-400 text-sm">Track overall platform growth metrics</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="text-neutral-400">Loading platform data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
            Platform Growth
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">Track overall platform growth metrics</CardDescription>
        </div>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger 
            className="w-[130px] bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700/60 focus:ring-purple-500 focus:ring-offset-neutral-900"
            aria-label="Select metric for platform growth chart"
          >
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
            <SelectItem value="users" className="hover:bg-neutral-700 focus:bg-purple-600/50">Users</SelectItem>
            <SelectItem value="communities" className="hover:bg-neutral-700 focus:bg-purple-600/50">Communities</SelectItem>
            <SelectItem value="events" className="hover:bg-neutral-700 focus:bg-purple-600/50">Events</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={currentMetricData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineChartColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={lineChartColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
            <XAxis 
              dataKey="month" 
              stroke="#a3a3a3"
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis
              stroke="#a3a3a3"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
              domain={['auto', 'auto']}
            />
            <RechartsTooltip
              cursor={{ stroke: lineChartColor, strokeWidth: 1, strokeDasharray: "3 3" }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground-accent, 0 0% 98%))",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground, 240 3.8% 46.1%))", marginBottom: '4px' }}
              itemStyle={{ color: "hsl(var(--foreground-accent, 0 0% 98%))" }}
              formatter={(value: number, name: string) => [`${value.toLocaleString()} ${getMetricLabel().slice(0,-1)}`, null]}
              labelFormatter={(label: string) => `Month: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineChartColor}
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: lineChartColor,
                stroke: lineChartColor, 
                strokeWidth: 2,
              }}
              activeDot={{ 
                r: 6, 
                stroke: lineChartColor, 
                strokeWidth: 2, 
                fill: "#e9d5ff"
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="text-center p-4 border-t border-neutral-700/50 mt-auto bg-neutral-800/30 rounded-b-xl">
        <span className="text-sm text-neutral-400">Total {getMetricLabel()}: </span>
        <span className="text-2xl font-bold text-purple-400">
          { (metric === "users" ? data[data.length - 1]?.users : 
             metric === "communities" ? data[data.length - 1]?.communities : 
             data[data.length - 1]?.events)?.toLocaleString() || 0 }
        </span>
      </div>
    </Card>
  )
}
