"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock heatmap data (24 hours x 7 days)
const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  
  const data = []
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Generate realistic activity patterns
      let intensity = 0
      
      // Weekend vs weekday patterns
      const isWeekend = day >= 5
      
      // Peak hours: 9-11 AM, 1-3 PM, 7-9 PM
      if ((hour >= 9 && hour <= 11) || (hour >= 13 && hour <= 15) || (hour >= 19 && hour <= 21)) {
        intensity = isWeekend ? 0.6 : 0.9
      }
      // Regular hours: 8 AM - 10 PM
      else if (hour >= 8 && hour <= 22) {
        intensity = isWeekend ? 0.4 : 0.7
      }
      // Late night/early morning: 11 PM - 7 AM
      else {
        intensity = isWeekend ? 0.3 : 0.2
      }
      
      // Add some randomness
      intensity += (Math.random() - 0.5) * 0.2
      intensity = Math.max(0, Math.min(1, intensity))
      
      data.push({
        day: days[day],
        hour,
        intensity,
        value: Math.round(intensity * 1000 + 100) // Convert to user count
      })
    }
  }
  
  return data
}

const heatmapData = generateHeatmapData()

const getIntensityColor = (intensity: number) => {
  if (intensity >= 0.8) return "bg-purple-500"
  if (intensity >= 0.6) return "bg-purple-400"
  if (intensity >= 0.4) return "bg-purple-300"
  if (intensity >= 0.2) return "bg-purple-200"
  return "bg-neutral-700"
}

export function UserActivityHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getTimeLabel = (hour: number) => {
    if (hour === 0) return "12 AM"
    if (hour === 12) return "12 PM"
    if (hour < 12) return `${hour} AM`
    return `${hour - 12} PM`
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="mr-2 h-5 w-5 text-purple-400" />
          User Activity Heatmap
        </CardTitle>
        <CardDescription className="text-neutral-400">Activity patterns by day of week and time of day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-400">Activity Level:</span>
              <span className="text-neutral-500">Low</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-neutral-700"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-200"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-300"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-400"></div>
                <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
              </div>
              <span className="text-white">High</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] space-y-1">
              {/* Hour labels */}
              <div className="flex items-center">
                <div className="w-12"></div> {/* Space for day labels */}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className={cn(
                      "flex-1 text-xs text-center text-neutral-400 min-w-[30px]",
                      hour % 6 === 0 ? "font-medium" : ""
                    )}
                  >
                    {hour % 6 === 0 ? getTimeLabel(hour) : ""}
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              {days.map((day) => (
                <div key={day} className="flex items-center gap-1">
                  <div className="w-12 text-sm font-medium text-neutral-300 text-right pr-2">
                    {day}
                  </div>
                  {hours.map((hour) => {
                    const cellData = heatmapData.find(
                      (d) => d.day === day && d.hour === hour
                    )
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className={cn(
                          "flex-1 h-6 rounded-sm border border-neutral-800 min-w-[30px] cursor-pointer transition-all hover:scale-110 hover:border-neutral-600",
                          getIntensityColor(cellData?.intensity || 0)
                        )}
                        title={`${day} ${getTimeLabel(hour)}: ${cellData?.value || 0} active users`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <h4 className="text-sm font-medium text-white mb-2">Peak Activity</h4>
              <div className="text-lg font-bold text-purple-400">2-3 PM</div>
              <p className="text-xs text-neutral-400">Highest engagement time</p>
            </div>
            <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <h4 className="text-sm font-medium text-white mb-2">Most Active Day</h4>
              <div className="text-lg font-bold text-blue-400">Wednesday</div>
              <p className="text-xs text-neutral-400">Mid-week engagement spike</p>
            </div>
            <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <h4 className="text-sm font-medium text-white mb-2">Weekend Pattern</h4>
              <div className="text-lg font-bold text-amber-400">60%</div>
              <p className="text-xs text-neutral-400">Of weekday activity level</p>
            </div>
          </div>

          {/* Activity Patterns */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-3">Key Activity Patterns</h4>
            <div className="grid gap-2 md:grid-cols-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Morning peak: 9-11 AM (work start)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Afternoon peak: 1-3 PM (lunch break)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Evening peak: 7-9 PM (personal time)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Weekend activity shifts later (10 AM-4 PM)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 