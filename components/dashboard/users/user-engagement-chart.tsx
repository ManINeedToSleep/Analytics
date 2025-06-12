"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserEngagementData } from "@/lib/analytics-service"

const barChartColor = "#3b82f6"

export function UserEngagementChart() {
  const [data, setData] = useState<UserEngagementData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics/user-engagement')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const engagementData = await response.json()
        setData(engagementData)
      } catch (error) {
        console.error('Failed to fetch user engagement data:', error)
        // Fallback to mock data if API call fails
        setData([
          { name: "New Users", value: 2234 },
          { name: "Active Users", value: 4105 },
          { name: "Profiles Created", value: 1893 },
          { name: "Communities Joined", value: 982 },
          { name: "Events Created", value: 567 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-400" />
            User Engagement
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">Key user engagement metrics across the platform</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="text-neutral-400">Loading engagement data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Users className="mr-2 h-5 w-5 text-blue-400" />
          User Engagement
        </CardTitle>
        <CardDescription className="text-neutral-400 text-sm">Key user engagement metrics across the platform (Last 30 Days)</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 45 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
            <XAxis
              dataKey="name"
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
              formatter={(value: number, name: string, props) => [`${value.toLocaleString()}`, props.payload.name]}
              labelFormatter={(label: string) => ``}
            />
            <Bar dataKey="value" fill={barChartColor} radius={[4, 4, 0, 0]} barSize={35} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
