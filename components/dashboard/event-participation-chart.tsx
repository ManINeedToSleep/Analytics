"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"

const participationData = [
  { type: "Networking", rsvps: 1245, attended: 987, rate: 79.3 },
  { type: "Workshop", rsvps: 892, attended: 734, rate: 82.3 },
  { type: "Social", rsvps: 567, attended: 423, rate: 74.6 },
  { type: "Conference", rsvps: 2134, attended: 1678, rate: 78.6 },
]

export function EventParticipationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Participation by Type</CardTitle>
        <CardDescription>RSVP vs attendance rates by event type</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={participationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="type" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip
                formatter={(value, name) => [value.toLocaleString(), name === "rsvps" ? "RSVPs" : "Attended"]}
              />
              <Bar dataKey="rsvps" fill="#94a3b8" radius={[4, 4, 0, 0]} name="rsvps" />
              <Bar dataKey="attended" fill="#3b82f6" radius={[4, 4, 0, 0]} name="attended" />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          {participationData.map((item) => (
            <div key={item.type} className="space-y-1">
              <p className="text-sm font-medium">{item.rate}%</p>
              <p className="text-xs text-muted-foreground">{item.type}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
