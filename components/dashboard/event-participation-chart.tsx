"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

const participationData = [
  { type: "Networking", rsvps: 1245, attended: 987, rate: 79.3 },
  { type: "Workshop", rsvps: 892, attended: 734, rate: 82.3 },
  { type: "Social", rsvps: 567, attended: 423, rate: 74.6 },
  { type: "Conference", rsvps: 2134, attended: 1678, rate: 78.6 },
]

export function EventParticipationChart() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
          Event Participation by Type
        </CardTitle>
        <CardDescription className="text-neutral-400">RSVP vs attendance rates by event type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={participationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
            <XAxis 
              dataKey="type" 
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
                value.toLocaleString(), 
                name === "rsvps" ? "RSVPs" : "Attended"
              ]}
            />
            <Bar dataKey="rsvps" fill="#64748b" radius={[4, 4, 0, 0]} name="rsvps" />
            <Bar dataKey="attended" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="attended" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          {participationData.map((item) => (
            <div key={item.type} className="space-y-1">
              <p className="text-sm font-medium text-white">{item.rate}%</p>
              <p className="text-xs text-neutral-400">{item.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
