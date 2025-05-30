"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"

const engagementData = [
  { metric: "Profile Created", count: 32891, percentage: 72.7 },
  { metric: "Account Activated", count: 41205, percentage: 91.1 },
  { metric: "Community Joined", count: 28934, percentage: 64.0 },
  { metric: "Event Participated", count: 19823, percentage: 43.8 },
  { metric: "Profile Scanned", count: 15672, percentage: 34.7 },
]

export function UserEngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Engagement</CardTitle>
        <CardDescription>Key user engagement metrics across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="metric"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <ChartTooltip formatter={(value, name) => [`${value.toLocaleString()}`, "Users"]} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </CardContent>
    </Card>
  )
}
