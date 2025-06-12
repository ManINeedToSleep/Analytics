"use client"

import { useState, useMemo, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users2 } from "lucide-react" // Icon for Member Engagement
import { cn } from "@/lib/utils"
import { EngagementChartData } from "@/lib/analytics-service"

// Enhanced mock data for different time ranges - used as fallback
const generateEngagementData = (timeRange: string) => {
  const data: { date: string; logins: number; profiles: number; events: number; }[] = []
  
  if (timeRange === '7d') {
    // Daily data for 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const factor = (7 - i) / 7
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        logins: Math.floor(50 + factor * 100 + Math.random() * 20),
        profiles: Math.floor(20 + factor * 40 + Math.random() * 10),
        events: Math.floor(10 + factor * 30 + Math.random() * 15),
      })
    }
  } else if (timeRange === '30d') {
    // Weekly aggregates for 30 days (5 weeks)
    for (let i = 4; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - (i * 7))
      const factor = (5 - i) / 5
      
      data.push({
        date: `Week ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        logins: Math.floor(200 + factor * 400 + Math.random() * 100),
        profiles: Math.floor(80 + factor * 160 + Math.random() * 40),
        events: Math.floor(40 + factor * 120 + Math.random() * 60),
      })
    }
  } else if (timeRange === '90d') {
    // Bi-weekly aggregates for 90 days (6 periods)
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - ((i + 1) * 15))
      const factor = (6 - i) / 6
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        logins: Math.floor(400 + factor * 800 + Math.random() * 200),
        profiles: Math.floor(160 + factor * 320 + Math.random() * 80),
        events: Math.floor(80 + factor * 240 + Math.random() * 120),
      })
    }
  } else { // '1y'
    // Monthly aggregates for 1 year (12 months)
    for (let i = 11; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const factor = (12 - i) / 12
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        logins: Math.floor(800 + factor * 1600 + Math.random() * 400),
        profiles: Math.floor(320 + factor * 640 + Math.random() * 160),
        events: Math.floor(160 + factor * 480 + Math.random() * 240),
      })
    }
  }
  
  return data
};

// Define colors based on the image
const loginsColor = "#a78bfa"; // Tailwind violet-400
const profilesColor = "#5eead4"; // Tailwind teal-300
const eventsColor = "#fde047"; // Tailwind yellow-300

export function EngagementChart() {
  const [timeRange, setTimeRange] = useState("30d")
  const [data, setData] = useState<EngagementChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/analytics/engagement-chart?timeRange=${timeRange}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const engagementData = await response.json()
        setData(engagementData)
      } catch (error) {
        console.error('Failed to fetch engagement chart data:', error)
        // Fallback to mock data if API call fails
        setData(generateEngagementData(timeRange))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeRange])

  // Custom Legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center items-center space-x-4 mt-3">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center space-x-1.5">
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: entry.color }} />
            <span className="text-xs text-neutral-400">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col col-span-full">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Users2 className="mr-2 h-5 w-5 text-purple-400" />
              Member Engagement
            </CardTitle>
            <CardDescription className="text-neutral-400 text-sm">Track active, engaged, and observer members over time</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="text-neutral-400">Loading engagement data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col col-span-full">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Users2 className="mr-2 h-5 w-5 text-purple-400" />
            Member Engagement
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">Track user activity over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger 
            className="w-[140px] bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700/60 focus:ring-purple-500 focus:ring-offset-neutral-900"
            aria-label="Select time range for member engagement chart"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
            <SelectItem value="7d" className="hover:bg-neutral-700 focus:bg-purple-600/50">Last 7 days</SelectItem>
            <SelectItem value="30d" className="hover:bg-neutral-700 focus:bg-purple-600/50">Last 30 days</SelectItem>
            <SelectItem value="90d" className="hover:bg-neutral-700 focus:bg-purple-600/50">Last 90 days</SelectItem>
            <SelectItem value="1y" className="hover:bg-neutral-700 focus:bg-purple-600/50">Last year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center pt-0 pb-3">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            stackOffset="none"
          >
            <defs>
              <linearGradient id="gradientLogins" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={loginsColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={loginsColor} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientProfiles" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={profilesColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={profilesColor} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={eventsColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={eventsColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
            <XAxis 
              dataKey="date" 
              stroke="#a3a3a3"
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={5}
            />
            <YAxis 
              stroke="#a3a3a3"
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
            />
            <RechartsTooltip
              cursor={{ stroke: '#a3a3a3', strokeWidth: 1, strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground-accent, 0 0% 98%))",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground, 240 3.8% 46.1%))", marginBottom: '4px' }}
            />
            <Legend content={renderLegend} verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
            <Area
              type="monotone"
              dataKey="logins"
              name="User Activity"
              stroke={loginsColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientLogins)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="profiles"
              name="Profile Creation"
              stroke={profilesColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientProfiles)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="events"
              name="Event Creation"
              stroke={eventsColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientEvents)"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
