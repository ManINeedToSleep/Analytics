"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"

const eventsData = [
  { month: "Jan", created: 45, completed: 42, cancelled: 3 },
  { month: "Feb", created: 52, completed: 48, cancelled: 4 },
  { month: "Mar", created: 61, completed: 58, cancelled: 3 },
  { month: "Apr", created: 68, completed: 65, cancelled: 3 },
  { month: "May", created: 74, completed: 71, cancelled: 3 },
  { month: "Jun", created: 84, completed: 80, cancelled: 4 },
]

export function EventsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Creation & Completion</CardTitle>
        <CardDescription>Monthly event creation and completion trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={eventsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="Created"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="cancelled"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                name="Cancelled"
              />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
      </CardContent>
    </Card>
  )
}
