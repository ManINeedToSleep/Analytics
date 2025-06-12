"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

const timeSlotData = [
  { timeSlot: "6-8 AM", events: 12, avgAttendance: 68.4, avgRating: 4.1 },
  { timeSlot: "8-10 AM", events: 28, avgAttendance: 75.2, avgRating: 4.3 },
  { timeSlot: "10-12 PM", events: 45, avgAttendance: 82.1, avgRating: 4.5 },
  { timeSlot: "12-2 PM", events: 67, avgAttendance: 79.8, avgRating: 4.4 },
  { timeSlot: "2-4 PM", events: 89, avgAttendance: 78.3, avgRating: 4.2 },
  { timeSlot: "4-6 PM", events: 72, avgAttendance: 81.7, avgRating: 4.6 },
  { timeSlot: "6-8 PM", events: 134, avgAttendance: 85.4, avgRating: 4.7 },
  { timeSlot: "8-10 PM", events: 43, avgAttendance: 83.2, avgRating: 4.5 },
]

const dayOfWeekData = [
  { day: "Monday", events: 89, avgAttendance: 76.2, popular: false },
  { day: "Tuesday", events: 124, avgAttendance: 78.9, popular: true },
  { day: "Wednesday", events: 156, avgAttendance: 81.4, popular: true },
  { day: "Thursday", events: 142, avgAttendance: 79.7, popular: true },
  { day: "Friday", events: 98, avgAttendance: 74.3, popular: false },
  { day: "Saturday", events: 67, avgAttendance: 82.8, popular: false },
  { day: "Sunday", events: 34, avgAttendance: 85.1, popular: false },
]

const getBarColor = (attendance: number) => {
  if (attendance >= 85) return "#22c55e" // Green for high attendance
  if (attendance >= 80) return "#8b5cf6" // Purple for good attendance  
  if (attendance >= 75) return "#3b82f6" // Blue for moderate attendance
  return "#64748b" // Gray for low attendance
}

export function EventTimeSlotAnalysis() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Clock className="mr-2 h-5 w-5 text-purple-400" />
          Event Time Slot Performance
        </CardTitle>
        <CardDescription className="text-neutral-400">Event distribution and attendance rates by time slots and days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Time Slot Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Time Slot Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSlotData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                <XAxis 
                  dataKey="timeSlot" 
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
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#262626",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5"
                  }}
                  formatter={(value: number, name: string) => [
                    name === "events" ? value : `${value}%`,
                    name === "events" ? "Events" : name === "avgAttendance" ? "Avg Attendance" : "Avg Rating"
                  ]}
                />
                <Bar dataKey="events" radius={[4, 4, 0, 0]}>
                  {timeSlotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.avgAttendance)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Day of Week Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Day of Week Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayOfWeekData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                <XAxis 
                  dataKey="day" 
                  stroke="#a3a3a3" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#a3a3a3" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#262626",
                    borderColor: "#404040",
                    borderRadius: "0.5rem",
                    color: "#f5f5f5"
                  }}
                  formatter={(value: number, name: string) => [
                    name === "events" ? value : `${value}%`,
                    name === "events" ? "Events" : "Avg Attendance"
                  ]}
                />
                <Bar dataKey="events" radius={[4, 4, 0, 0]}>
                  {dayOfWeekData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.popular ? "#8b5cf6" : "#64748b"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Slot Performance Table */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Performance Summary</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-md font-medium text-purple-400">Best Performing Time Slots</h4>
              {timeSlotData
                .sort((a, b) => b.avgAttendance - a.avgAttendance)
                .slice(0, 3)
                .map((slot, index) => (
                  <div key={slot.timeSlot} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-neutral-300">{slot.timeSlot}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{slot.avgAttendance}%</div>
                      <div className="text-xs text-neutral-400">{slot.events} events</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-md font-medium text-green-400">Popular Days</h4>
              {dayOfWeekData
                .sort((a, b) => b.events - a.events)
                .slice(0, 3)
                .map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-neutral-300">{day.day}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{day.events}</div>
                      <div className="text-xs text-neutral-400">{day.avgAttendance}% attendance</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg">
          <h4 className="text-sm font-medium text-amber-400 mb-3">Optimal Scheduling Insights</h4>
          <div className="grid gap-2 md:grid-cols-2 text-xs text-neutral-400">
            <div className="space-y-1">
              <p>• <strong>Peak Time:</strong> 6-8 PM shows highest attendance (85.4%)</p>
              <p>• <strong>Best Day:</strong> Wednesday has most events (156)</p>
              <p>• <strong>Weekend Pattern:</strong> Sunday has highest attendance rate (85.1%)</p>
            </div>
            <div className="space-y-1">
              <p>• <strong>Avoid:</strong> Early morning slots (6-8 AM) have lower attendance</p>
              <p>• <strong>Lunch Time:</strong> 12-2 PM performs well (79.8% attendance)</p>
              <p>• <strong>Mid-Week:</strong> Tuesday-Thursday are most popular</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 