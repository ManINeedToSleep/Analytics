"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Users, MousePointer, MessageSquare, Calendar, Share2 } from "lucide-react"

const userFlowData = {
  signup: {
    name: "User Signup Flow",
    steps: [
      { name: "Landing Page", users: 10000, icon: MousePointer, dropoff: 0 },
      { name: "Sign Up Form", users: 7500, icon: Users, dropoff: 25 },
      { name: "Email Verification", users: 6800, icon: MessageSquare, dropoff: 9.3 },
      { name: "Profile Setup", users: 5950, icon: Users, dropoff: 12.5 },
      { name: "Community Join", users: 5200, icon: Calendar, dropoff: 12.6 },
      { name: "First Post", users: 3900, icon: Share2, dropoff: 25 },
    ],
  },
  engagement: {
    name: "Content Engagement Flow",
    steps: [
      { name: "View Feed", users: 8247, icon: MousePointer, dropoff: 0 },
      { name: "Click Post", users: 6580, icon: MessageSquare, dropoff: 20.2 },
      { name: "Read Content", users: 5890, icon: Users, dropoff: 10.5 },
      { name: "Like/React", users: 4720, icon: Share2, dropoff: 19.9 },
      { name: "Comment", users: 2360, icon: MessageSquare, dropoff: 50 },
      { name: "Share", users: 1180, icon: Share2, dropoff: 50 },
    ],
  },
  event: {
    name: "Event Participation Flow",
    steps: [
      { name: "Browse Events", users: 5420, icon: Calendar, dropoff: 0 },
      { name: "View Event Details", users: 4230, icon: MousePointer, dropoff: 22 },
      { name: "RSVP", users: 3180, icon: Users, dropoff: 24.8 },
      { name: "Add to Calendar", users: 2540, icon: Calendar, dropoff: 20.1 },
      { name: "Attend Event", users: 1980, icon: Share2, dropoff: 22 },
      { name: "Post About Event", users: 890, icon: MessageSquare, dropoff: 55 },
    ],
  },
}

export function UserFlowAnalytics() {
  const [selectedFlow, setSelectedFlow] = useState("signup")
  const currentFlow = userFlowData[selectedFlow as keyof typeof userFlowData]

  const getStepColor = (index: number) => {
    const colors = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1"]
    return colors[index % colors.length]
  }

  const getConversionRate = (current: number, total: number) => {
    return ((current / total) * 100).toFixed(1)
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">User Flow Analytics</CardTitle>
            <CardDescription>Track user journeys and identify optimization opportunities</CardDescription>
          </div>
          <Select value={selectedFlow} onValueChange={setSelectedFlow}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select flow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="signup">User Signup Flow</SelectItem>
              <SelectItem value="engagement">Content Engagement</SelectItem>
              <SelectItem value="event">Event Participation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50">
            <h3 className="font-semibold text-lg mb-2">{currentFlow.name}</h3>
            <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
              <span>
                Total Conversion:{" "}
                {getConversionRate(currentFlow.steps[currentFlow.steps.length - 1].users, currentFlow.steps[0].users)}%
              </span>
              <span>•</span>
              <span>Biggest Drop-off: {Math.max(...currentFlow.steps.map((s) => s.dropoff))}%</span>
            </div>
          </div>

          <div className="space-y-4">
            {currentFlow.steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === currentFlow.steps.length - 1
              const conversionFromPrevious =
                index > 0 ? getConversionRate(step.users, currentFlow.steps[index - 1].users) : "100.0"

              return (
                <div key={step.name} className="relative">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 hover:shadow-md transition-all duration-300">
                    <div
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white shadow-lg flex-shrink-0"
                      style={{ backgroundColor: getStepColor(index) }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm sm:text-base">{step.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {step.users.toLocaleString()} users
                          </Badge>
                          {index > 0 && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${step.dropoff > 30 ? "text-red-600 border-red-200" : step.dropoff > 15 ? "text-amber-600 border-amber-200" : "text-green-600 border-green-200"}`}
                            >
                              {conversionFromPrevious}% conversion
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress
                          value={getConversionRate(step.users, currentFlow.steps[0].users) as any}
                          className="h-2"
                          style={{
                            background: `linear-gradient(to right, ${getStepColor(index)}20, transparent)`,
                          }}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{getConversionRate(step.users, currentFlow.steps[0].users)}% of total</span>
                          {step.dropoff > 0 && <span className="text-red-500">-{step.dropoff}% drop-off</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-6">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {getConversionRate(currentFlow.steps[currentFlow.steps.length - 1].users, currentFlow.steps[0].users)}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Overall Conversion</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-amber-600">
                {Math.max(...currentFlow.steps.map((s) => s.dropoff))}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Highest Drop-off</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{currentFlow.steps.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Total Steps</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
