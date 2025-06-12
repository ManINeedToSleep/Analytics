"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Clock, Users } from "lucide-react"

export function EventPopularityMetrics() {
  const popularEventTypes = [
    { type: "Conference", count: 156, percentage: 35.2, growth: 12.4 },
    { type: "Workshop", count: 134, percentage: 30.2, growth: 8.7 },
    { type: "Networking", count: 89, percentage: 20.1, growth: 15.3 },
    { type: "Social", count: 64, percentage: 14.5, growth: -2.1 },
  ]

  const popularLocations = [
    { location: "San Francisco", count: 67, percentage: 42.3, avgRating: 4.6 },
    { location: "New York", count: 45, percentage: 28.5, avgRating: 4.4 },
    { location: "Austin", count: 28, percentage: 17.7, avgRating: 4.2 },
    { location: "Seattle", count: 18, percentage: 11.4, avgRating: 4.5 },
  ]

  const timeSlotPopularity = [
    { timeSlot: "Morning (9-12)", count: 89, percentage: 34.2, avgAttendance: 82.3 },
    { timeSlot: "Afternoon (12-17)", count: 112, percentage: 43.1, avgAttendance: 78.9 },
    { timeSlot: "Evening (17-21)", count: 59, percentage: 22.7, avgAttendance: 85.4 },
  ]

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
          Event Popularity Analysis
        </CardTitle>
        <CardDescription className="text-neutral-400">Popular event types, locations, and time slots</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Event Types */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-400" />
              Event Types
            </h3>
            <div className="space-y-3">
              {popularEventTypes.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{item.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">{item.count}</span>
                      <Badge 
                        className={
                          item.growth > 0 
                            ? "bg-green-500/20 text-green-400 border-green-500/20" 
                            : "bg-red-500/20 text-red-400 border-red-500/20"
                        }
                        variant="outline"
                      >
                        {item.growth > 0 ? "+" : ""}{item.growth}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="bg-neutral-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-400" />
              Locations
            </h3>
            <div className="space-y-3">
              {popularLocations.map((item) => (
                <div key={item.location} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{item.location}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">{item.count}</span>
                      <span className="text-amber-400">★{item.avgRating}</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="bg-neutral-700"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Time Slot Popularity */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-400" />
              Time Slots
            </h3>
            <div className="space-y-3">
              {timeSlotPopularity.map((item) => (
                <div key={item.timeSlot} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-white">{item.timeSlot}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">{item.count}</span>
                      <span className="text-green-400">{item.avgAttendance}%</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="bg-neutral-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-purple-400 mb-2">Trending Event Types</h4>
            <ul className="text-xs text-neutral-400 space-y-1">
              <li>• Networking events show highest growth (+15.3%)</li>
              <li>• Conference attendance remains strong (35.2% of events)</li>
              <li>• Social events declining slightly (-2.1%)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-green-400 mb-2">Location & Timing Insights</h4>
            <ul className="text-xs text-neutral-400 space-y-1">
              <li>• San Francisco leads with highest event count & rating</li>
              <li>• Evening slots have best attendance (85.4%)</li>
              <li>• Afternoon slots most popular (43.1% of events)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 