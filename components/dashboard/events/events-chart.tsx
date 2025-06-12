"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

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
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-purple-400" />
          Event Creation & Completion
        </CardTitle>
        <CardDescription className="text-neutral-400">Monthly event creation and completion trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eventsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            />
            <RechartsTooltip
              contentStyle={{ 
                backgroundColor: "#262626",
                borderColor: "#404040",
                borderRadius: "0.5rem",
                color: "#f5f5f5"
              }}
              formatter={(value: number, name: string) => [
                value,
                name === "created" ? "Created" : name === "completed" ? "Completed" : "Cancelled"
              ]}
              labelFormatter={(label: string) => `Month: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="created"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#dbeafe" }}
              name="created"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "#dcfce7" }}
              name="completed"
            />
            <Line
              type="monotone"
              dataKey="cancelled"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2, fill: "#fee2e2" }}
              name="cancelled"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <div className="text-center p-4 border-t border-neutral-700/50 mt-auto bg-neutral-800/30 rounded-b-xl">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-400 font-semibold">84</span>
            <p className="text-neutral-400 text-xs">Created</p>
          </div>
          <div>
            <span className="text-green-400 font-semibold">80</span>
            <p className="text-neutral-400 text-xs">Completed</p>
          </div>
          <div>
            <span className="text-red-400 font-semibold">4</span>
            <p className="text-neutral-400 text-xs">Cancelled</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
