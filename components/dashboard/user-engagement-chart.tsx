"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"

const engagementData = [
  { metric: "Profile Created", count: 32891, percentage: 72.7 },
  { metric: "Account Activated", count: 41205, percentage: 91.1 },
  { metric: "Community Joined", count: 28934, percentage: 64.0 },
  { metric: "Event Participated", count: 19823, percentage: 43.8 },
  { metric: "Profile Scanned", count: 15672, percentage: 34.7 },
]

const barChartColor = "#3b82f6"

export function UserEngagementChart() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-400" />
          User Engagement
        </CardTitle>
        <CardDescription className="text-neutral-400 text-sm">Key user engagement metrics across the platform</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagementData} margin={{ top: 5, right: 10, left: -20, bottom: 45 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
            <XAxis
              dataKey="metric"
              stroke="#a3a3a3"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
              dy={10}
            />
            <YAxis
              stroke="#a3a3a3"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
            />
            <RechartsTooltip
              cursor={{ fill: 'rgba(163, 163, 163, 0.1)' }}
              contentStyle={{
                backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground-accent, 0 0% 98%))",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground, 240 3.8% 46.1%))", marginBottom: '4px' }}
              itemStyle={{ color: barChartColor }}
              formatter={(value: number, name: string, props) => [`${value.toLocaleString()} users`, props.payload.metric]}
              labelFormatter={(label: string) => ``}
            />
            <Bar dataKey="count" fill={barChartColor} radius={[4, 4, 0, 0]} barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
