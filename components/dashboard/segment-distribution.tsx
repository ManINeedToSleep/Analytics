"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"

const data = [
  { name: "Connectors", value: 15, color: "#8b5cf6" },
  { name: "Engaged", value: 25, color: "#3b82f6" },
  { name: "Contributors", value: 30, color: "#22c55e" },
  { name: "Browsers", value: 20, color: "#f59e0b" },
  { name: "Observers", value: 10, color: "#94a3b8" },
]

export function SegmentDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Segments</CardTitle>
        <CardDescription>Distribution of members by engagement level</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Percentage"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  padding: "0.5rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-sm text-muted-foreground">
                {segment.name}: {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
