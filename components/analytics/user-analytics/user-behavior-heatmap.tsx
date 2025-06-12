"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Activity } from 'lucide-react'

const heatmapData = [
  { hour: "00", mon: 12, tue: 8, wed: 10, thu: 15, fri: 18, sat: 25, sun: 22 },
  { hour: "01", mon: 8, tue: 6, wed: 7, thu: 9, fri: 12, sat: 20, sun: 18 },
  { hour: "02", mon: 5, tue: 4, wed: 6, thu: 7, fri: 8, sat: 15, sun: 12 },
  { hour: "03", mon: 3, tue: 2, wed: 4, thu: 5, fri: 6, sat: 12, sun: 10 },
  { hour: "04", mon: 2, tue: 1, wed: 3, thu: 4, fri: 5, sat: 10, sun: 8 },
  { hour: "05", mon: 4, tue: 3, wed: 5, thu: 6, fri: 8, sat: 12, sun: 10 },
  { hour: "06", mon: 15, tue: 12, wed: 18, thu: 20, fri: 25, sat: 15, sun: 12 },
  { hour: "07", mon: 35, tue: 32, wed: 38, thu: 42, fri: 45, sat: 20, sun: 18 },
  { hour: "08", mon: 65, tue: 62, wed: 68, thu: 72, fri: 75, sat: 25, sun: 22 },
  { hour: "09", mon: 85, tue: 82, wed: 88, thu: 92, fri: 95, sat: 35, sun: 30 },
  { hour: "10", mon: 92, tue: 89, wed: 95, thu: 98, fri: 100, sat: 45, sun: 40 },
  { hour: "11", mon: 88, tue: 85, wed: 92, thu: 95, fri: 98, sat: 55, sun: 50 },
  { hour: "12", mon: 75, tue: 72, wed: 78, thu: 82, fri: 85, sat: 65, sun: 60 },
  { hour: "13", mon: 82, tue: 79, wed: 85, thu: 88, fri: 92, sat: 70, sun: 65 },
  { hour: "14", mon: 78, tue: 75, wed: 82, thu: 85, fri: 88, sat: 75, sun: 70 },
  { hour: "15", mon: 72, tue: 69, wed: 75, thu: 78, fri: 82, sat: 80, sun: 75 },
  { hour: "16", mon: 68, tue: 65, wed: 72, thu: 75, fri: 78, sat: 85, sun: 80 },
  { hour: "17", mon: 65, tue: 62, wed: 68, thu: 72, fri: 75, sat: 88, sun: 85 },
  { hour: "18", mon: 58, tue: 55, wed: 62, thu: 65, fri: 68, sat: 92, sun: 88 },
  { hour: "19", mon: 52, tue: 49, wed: 55, thu: 58, fri: 62, sat: 95, sun: 92 },
  { hour: "20", mon: 45, tue: 42, wed: 48, thu: 52, fri: 55, sat: 98, sun: 95 },
  { hour: "21", mon: 38, tue: 35, wed: 42, thu: 45, fri: 48, sat: 100, sun: 98 },
  { hour: "22", mon: 32, tue: 29, wed: 35, thu: 38, fri: 42, sat: 95, sun: 92 },
  { hour: "23", mon: 25, tue: 22, wed: 28, thu: 32, fri: 35, sat: 85, sun: 80 },
]

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const activityInsights = [
  { time: "Peak Hours", value: "9-11 AM", description: "Highest user activity" },
  { time: "Weekend Peak", value: "8-10 PM", description: "Saturday evening surge" },
  { time: "Low Activity", value: "2-5 AM", description: "Minimal user presence" },
  { time: "Workday Pattern", value: "Mon-Fri", description: "Morning and afternoon peaks" },
]

export function UserBehaviorHeatmap() {
  const getIntensityColor = (value: number) => {
    if (value >= 90) return "bg-purple-600"
    if (value >= 70) return "bg-purple-500"
    if (value >= 50) return "bg-purple-400"
    if (value >= 30) return "bg-purple-300"
    if (value >= 15) return "bg-purple-200"
    if (value >= 5) return "bg-purple-100"
    return "bg-gray-100 dark:bg-gray-800"
  }

  const getTextColor = (value: number) => {
    return value >= 50 ? "text-white" : "text-gray-700 dark:text-gray-300"
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          User Activity Heatmap
        </CardTitle>
        <CardDescription>Hourly user activity patterns throughout the week</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          {/* Heatmap */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Day labels */}
              <div className="flex mb-2">
                <div className="w-12"></div>
                {dayLabels.map((day) => (
                  <div key={day} className="flex-1 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Heatmap grid */}
              <div className="space-y-1">
                {heatmapData.map((row) => (
                  <div key={row.hour} className="flex items-center gap-1">
                    <div className="w-10 text-xs text-muted-foreground text-right">
                      {row.hour}:00
                    </div>
                    {days.map((day) => {
                      const value = row[day as keyof typeof row] as number
                      return (
                        <div
                          key={day}
                          className={`flex-1 h-8 flex items-center justify-center text-xs font-medium rounded transition-all duration-200 hover:scale-110 cursor-pointer ${getIntensityColor(value)} ${getTextColor(value)}`}
                          title={`${dayLabels[days.indexOf(day)]} ${row.hour}:00 - ${value}% activity`}
                        >
                          {value}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-xs text-muted-foreground">Less</span>
                {[0, 15, 30, 50, 70, 90].map((value) => (
                  <div
                    key={value}
                    className={`w-4 h-4 rounded ${getIntensityColor(value)}`}
                  />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>

          {/* Activity Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityInsights.map((insight) => (
              <div key={insight.time} className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600">{insight.time}</span>
                </div>
                <div className="text-lg font-bold text-foreground">{insight.value}</div>
                <div className="text-xs text-muted-foreground">{insight.description}</div>
              </div>
            ))}
          </div>

          {/* Key Findings */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              Key Behavioral Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Peak Performance
                  </Badge>
                  <span>Weekday mornings (9-11 AM) show highest engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Weekend Pattern
                  </Badge>
                  <span>Saturday evenings drive weekend activity</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Opportunity
                  </Badge>
                  <span>Low engagement during early morning hours (2-5 AM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Consistency
                  </Badge>
                  <span>Stable weekday patterns across Mon-Fri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
