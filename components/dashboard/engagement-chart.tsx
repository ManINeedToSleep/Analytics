"use client"

import { useState, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users2 } from "lucide-react" // Icon for Member Engagement
import { cn } from "@/lib/utils"

// Enhanced mock data for different time ranges
const generateEngagementData = (range: string) => {
  const numPoints = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 12;
  const pointMultiplier = range === "7d" ? 1 : range === "30d" ? 4.2 : range === "90d" ? 12.8 : 1;
  const baseDate = new Date();
  
  return Array.from({ length: numPoints }).map((_, i) => {
    const date = new Date(baseDate);
    if (range === "1y") {
      date.setMonth(baseDate.getMonth() - (numPoints - 1 - i));
    } else {
      date.setDate(baseDate.getDate() - (numPoints - 1 - i));
    }

    const factor = (i + 1) / numPoints;
    return {
      date: range === "1y" ? date.toLocaleString('default', { month: 'short' }) : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      active: Math.floor( (300 + factor * 200 + Math.random() * 50) * (range === "1y" ? pointMultiplier*1.5 : 1)),
      engaged: Math.floor( (150 + factor * 150 + Math.random() * 40) * (range === "1y" ? pointMultiplier*1.2 : 1) ),
      observers: Math.floor( (100 + factor * 100 + Math.random() * 30) * (range === "1y" ? pointMultiplier : 1) ),
    };
  }).slice(-numPoints); // Ensure correct number of points for yearly data etc.
};

// Define colors based on the image
const activeColor = "#a78bfa"; // Tailwind violet-400
const engagedColor = "#5eead4"; // Tailwind teal-300
const observersColor = "#fde047"; // Tailwind yellow-300

export function EngagementChart() {
  const [timeRange, setTimeRange] = useState("7d");

  const chartData = useMemo(() => generateEngagementData(timeRange), [timeRange]);

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

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl h-full flex flex-col col-span-full">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Users2 className="mr-2 h-5 w-5 text-purple-400" /> {/* Consistent with Platform Growth icon color */}
            Member Engagement
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">Track active, engaged, and observer members over time</CardDescription>
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
      <CardContent className="flex-grow flex flex-col justify-center pt-0 pb-3"> {/* Adjusted padding */}
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            stackOffset="none" // Ensures areas stack normally without pushing each other
          >
            <defs>
              <linearGradient id="gradientActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={activeColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={activeColor} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientEngaged" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={engagedColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={engagedColor} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradientObservers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={observersColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={observersColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" /> {/* Neutral-700 */}
            <XAxis 
              dataKey="date" 
              stroke="#a3a3a3" /* Neutral-400 */ 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={5}
            />
            <YAxis 
              stroke="#a3a3a3" /* Neutral-400 */ 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
            />
            <RechartsTooltip
              cursor={{ stroke: '#a3a3a3', strokeWidth: 1, strokeDasharray: "3 3" }} // Neutral-400 for cursor
              contentStyle={{
                backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                borderRadius: "0.5rem",
                color: "hsl(var(--foreground-accent, 0 0% 98%))",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground, 240 3.8% 46.1%))", marginBottom: '4px' }}
              // itemStyle={{ color: "hsl(var(--foreground-accent, 0 0% 98%))" }} // Handled by legend
            />
            <Legend content={renderLegend} verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
            <Area
              type="monotone"
              dataKey="active"
              name="Active Members"
              stroke={activeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientActive)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="engaged"
              name="Engaged Members"
              stroke={engagedColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientEngaged)"
              stackId="1" // Same stackId to stack them
            />
            <Area
              type="monotone"
              dataKey="observers"
              name="Observers"
              stroke={observersColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientObservers)"
              stackId="1" // Same stackId to stack them
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
