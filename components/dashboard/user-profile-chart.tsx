"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Users } from "lucide-react"

const profileData = [
  { type: "Manual Profiles", count: 18450, percentage: 40.8 },
  { type: "Scanned Profiles", count: 14441, percentage: 31.9 },
  { type: "Incomplete Profiles", count: 12340, percentage: 27.3 },
]

export function UserProfileChart() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="mr-2 h-5 w-5 text-purple-400" />
          Profile Creation Methods
        </CardTitle>
        <CardDescription className="text-neutral-400">How users are creating their profiles</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profileData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
              <XAxis
                dataKey="type"
                stroke="#a3a3a3"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#a3a3a3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <ChartTooltip 
                formatter={(value, name) => [`${value.toLocaleString()} users`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "#262626",
                  borderColor: "#404040",
                  borderRadius: "0.5rem",
                  color: "#f5f5f5"
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          {profileData.map((item) => (
            <div key={item.type} className="space-y-1">
              <p className="text-sm font-medium text-white">{item.percentage}%</p>
              <p className="text-xs text-neutral-400">{item.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
