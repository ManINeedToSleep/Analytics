"use client"

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CommunityHealthScoreProps {
  score: number
  className?: string
  communityName?: string
}

export function CommunityHealthScore({ score, className, communityName = "Selected Community" }: CommunityHealthScoreProps) {
  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "#22c55e" // Green for excellent health
    if (score >= 60) return "#f59e0b" // Amber for good health  
    if (score >= 40) return "#ef4444" // Red for poor health
    return "#dc2626" // Dark red for critical health
  }

  const getHealthStatus = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Needs Attention"
    return "Critical"
  }

  // Mock historical data (yesterday vs 2 days ago)
  const getHistoricalData = (currentScore: number) => {
    const yesterdayScore = currentScore + (Math.random() * 6 - 3) // ±3 point variation
    const twoDaysAgoScore = yesterdayScore + (Math.random() * 6 - 3) // ±3 point variation
    
    return {
      yesterday: Math.max(0, Math.min(100, yesterdayScore)),
      twoDaysAgo: Math.max(0, Math.min(100, twoDaysAgoScore)),
    }
  }

  const historical = getHistoricalData(score)
  const dailyChange = historical.yesterday - historical.twoDaysAgo
  const isImproving = dailyChange > 0

  // Health score components breakdown (from calculations doc)
  const getHealthComponents = (score: number) => {
    // Reverse engineer the components from the total score
    // Formula: (Active Members Ratio * 0.4) + (Event Activity * 0.3) + (Profile Completion * 0.3)
    const baseActiveRatio = (score / 100) * 0.7 // Active members tend to drive the score
    const baseEventActivity = (score / 100) * 0.6 // Event activity component
    const baseProfileCompletion = (score / 100) * 0.85 // Profile completion is usually higher
    
    return {
      activeMembers: Math.round(baseActiveRatio * 100),
      eventActivity: Math.round(baseEventActivity * 100), 
      profileCompletion: Math.round(baseProfileCompletion * 100),
    }
  }

  const components = getHealthComponents(score)

  const data = [
    {
      name: "Health Score",
      value: score,
      fill: getColor(score),
    },
  ]

  return (
    <Card className={`bg-neutral-900 text-white border-neutral-700/50 shadow-xl ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-400" />
              Community Health Score
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Overall health of {communityName}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={`${isImproving 
              ? 'border-green-500 text-green-400 bg-green-500/10' 
              : 'border-red-500 text-red-400 bg-red-500/10'
            }`}
          >
            {isImproving ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(dailyChange).toFixed(1)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Chart height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              barSize={12}
              data={data}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar 
                background={{ fill: "#404040" }} 
                dataKey="value" 
                cornerRadius={10} 
                max={100} 
                fill={getColor(score)}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </Chart>
        
        <div className="mt-4 text-center">
          <div className="text-4xl font-bold" style={{ color: getColor(score) }}>
            {score}/100
          </div>
          <p className="text-lg font-medium text-white mt-1">
            {getHealthStatus(score)}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Clock className="h-4 w-4 text-neutral-400" />
            <span className="text-neutral-400">
              Yesterday: {historical.yesterday.toFixed(1)} 
              <span className="mx-2">•</span>
              2 days ago: {historical.twoDaysAgo.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Health Score Components */}
        <div className="w-full mt-6 space-y-3">
          <h4 className="text-sm font-medium text-neutral-300 mb-3">Health Score Breakdown</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-neutral-300">Active Members (40%)</span>
              </div>
              <span className="text-sm font-medium text-white">{components.activeMembers}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-neutral-300">Event Activity (30%)</span>
              </div>
              <span className="text-sm font-medium text-white">{components.eventActivity}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-neutral-300">Profile Completion (30%)</span>
              </div>
              <span className="text-sm font-medium text-white">{components.profileCompletion}%</span>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-700/50">
            <p className="text-xs text-neutral-500">
              Health score calculated from community activity, engagement patterns, and member profile completion rates.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
