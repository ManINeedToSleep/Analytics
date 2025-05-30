"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"

const profileData = [
  { type: "Manual Profiles", count: 18450, percentage: 40.8 },
  { type: "Scanned Profiles", count: 14441, percentage: 31.9 },
  { type: "Incomplete Profiles", count: 12340, percentage: 27.3 },
]

export function UserProfileChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Creation Methods</CardTitle>
        <CardDescription>How users are creating their profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profileData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="type"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <ChartTooltip formatter={(value, name) => [`${value.toLocaleString()} users`, "Count"]} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {profileData.map((item) => (
            <div key={item.type} className="space-y-1">
              <p className="text-sm font-medium">{item.percentage}%</p>
              <p className="text-xs text-muted-foreground">{item.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
