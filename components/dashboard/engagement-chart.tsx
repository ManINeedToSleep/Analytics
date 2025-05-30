"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { date: "Jan", active: 400, engaged: 240, observers: 160 },
  { date: "Feb", active: 430, engaged: 250, observers: 180 },
  { date: "Mar", active: 448, engaged: 280, observers: 168 },
  { date: "Apr", active: 470, engaged: 310, observers: 160 },
  { date: "May", active: 540, engaged: 350, observers: 190 },
  { date: "Jun", active: 580, engaged: 390, observers: 190 },
  { date: "Jul", active: 610, engaged: 410, observers: 200 },
]

export function EngagementChart() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>Member Engagement</CardTitle>
          <CardDescription>Track active, engaged, and observer members over time</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Chart height={350}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEngaged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorObservers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="active"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorActive)"
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="engaged"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorEngaged)"
                stackId="2"
              />
              <Area
                type="monotone"
                dataKey="observers"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#colorObservers)"
                stackId="3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-4 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8884d8]" />
            <span className="text-sm text-muted-foreground">Active Members</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#82ca9d]" />
            <span className="text-sm text-muted-foreground">Engaged Members</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ffc658]" />
            <span className="text-sm text-muted-foreground">Observers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
