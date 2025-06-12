"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const cohortData = [
  {
    cohort: "Jan 2024",
    size: 1250,
    week0: 100,
    week1: 78.4,
    week2: 65.2,
    week3: 58.7,
    week4: 52.3,
    week8: 41.2,
    week12: 32.8,
    week16: 28.5,
    week20: 25.1,
    week24: 22.7
  },
  {
    cohort: "Feb 2024",
    size: 1420,
    week0: 100,
    week1: 82.1,
    week2: 68.9,
    week3: 61.4,
    week4: 55.8,
    week8: 44.6,
    week12: 36.2,
    week16: 31.8,
    week20: 28.4,
    week24: 25.9
  },
  {
    cohort: "Mar 2024",
    size: 1680,
    week0: 100,
    week1: 75.8,
    week2: 62.1,
    week3: 55.9,
    week4: 49.7,
    week8: 38.9,
    week12: 30.5,
    week16: 26.8,
    week20: 23.2,
    week24: null
  },
  {
    cohort: "Apr 2024",
    size: 1890,
    week0: 100,
    week1: 80.2,
    week2: 67.3,
    week3: 59.8,
    week4: 54.1,
    week8: 42.6,
    week12: 34.1,
    week16: 30.8,
    week20: null,
    week24: null
  },
  {
    cohort: "May 2024",
    size: 2150,
    week0: 100,
    week1: 83.7,
    week2: 71.2,
    week3: 64.5,
    week4: 58.9,
    week8: 47.3,
    week12: 38.7,
    week16: null,
    week20: null,
    week24: null
  },
  {
    cohort: "Jun 2024",
    size: 2340,
    week0: 100,
    week1: 85.3,
    week2: 73.8,
    week3: 67.1,
    week4: 61.4,
    week8: 49.8,
    week12: null,
    week16: null,
    week20: null,
    week24: null
  }
]

const weeks = ['week0', 'week1', 'week2', 'week3', 'week4', 'week8', 'week12', 'week16', 'week20', 'week24']
const weekLabels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20', 'Week 24']

export function CohortAnalysis() {
  const [metric, setMetric] = useState("retention")

  const getRetentionColor = (value: number | null) => {
    if (value === null) return "bg-gray-100 dark:bg-gray-800"
    if (value >= 80) return "bg-green-600"
    if (value >= 60) return "bg-green-500"
    if (value >= 40) return "bg-yellow-500"
    if (value >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTextColor = (value: number | null) => {
    if (value === null) return "text-gray-500"
    return value >= 40 ? "text-white" : "text-gray-900"
  }

  const calculateAverage = (weekKey: string) => {
    const values = cohortData
      .map(cohort => cohort[weekKey as keyof typeof cohort])
      .filter(val => val !== null && typeof val === 'number') as number[]
    
    if (values.length === 0) return null
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1)
  }

  return (
    <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Cohort Retention Analysis</CardTitle>
            <CardDescription>Track user retention by signup cohort over time</CardDescription>
          </div>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retention">Retention Rate</SelectItem>
              <SelectItem value="absolute">Absolute Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          {/* Cohort Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="flex mb-2">
                <div className="w-24 text-sm font-medium text-muted-foreground">Cohort</div>
                <div className="w-16 text-sm font-medium text-muted-foreground text-center">Size</div>
                {weekLabels.map((week) => (
                  <div key={week} className="w-20 text-xs font-medium text-muted-foreground text-center">
                    {week}
                  </div>
                ))}
              </div>
              
              {/* Cohort rows */}
              <div className="space-y-1">
                {cohortData.map((cohort) => (
                  <div key={cohort.cohort} className="flex items-center">
                    <div className="w-24 text-sm font-medium">{cohort.cohort}</div>
                    <div className="w-16 text-sm text-center text-muted-foreground">
                      {cohort.size.toLocaleString()}
                    </div>
                    {weeks.map((week) => {
                      const value = cohort[week as keyof typeof cohort] as number | null
                      const displayValue = metric === "retention" 
                        ? value 
                        : value !== null ? Math.round((value / 100) * cohort.size) : null
                      
                      return (
                        <div
                          key={week}
                          className={`w-20 h-10 flex items-center justify-center text-xs font-medium rounded mx-0.5 transition-all duration-200 hover:scale-105 cursor-pointer ${getRetentionColor(value)} ${getTextColor(value)}`}
                          title={value !== null ? `${cohort.cohort} ${weekLabels[weeks.indexOf(week)]}: ${value}%` : 'No data'}
                        >
                          {displayValue !== null ? (
                            metric === "retention" ? `${displayValue.toFixed(1)}%` : displayValue.toLocaleString()
                          ) : '-'}
                        </div>
                      )
                    })}
                  </div>
                ))}
                
                {/* Average row */}
                <div className="flex items-center border-t pt-2 mt-2">
                  <div className="w-24 text-sm font-bold text-purple-600">Average</div>
                  <div className="w-16 text-sm text-center font-bold text-purple-600">
                    {Math.round(cohortData.reduce((sum, c) => sum + c.size, 0) / cohortData.length).toLocaleString()}
                  </div>
                  {weeks.map((week) => {
                    const avg = calculateAverage(week)
                    return (
                      <div
                        key={week}
                        className="w-20 h-10 flex items-center justify-center text-xs font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/20 rounded mx-0.5"
                      >
                        {avg !== null ? `${avg}%` : '-'}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Retention Rate:</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-xs">0-20%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-orange-500"></div>
              <span className="text-xs">20-40%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span className="text-xs">40-60%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-xs">60-80%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded bg-green-600"></div>
              <span className="text-xs">80%+</span>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/50">
              <div className="text-2xl font-bold text-green-600">85.3%</div>
              <div className="text-sm text-muted-foreground">Best Week 1 Retention</div>
              <Badge variant="outline" className="mt-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Jun 2024 Cohort
              </Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50">
              <div className="text-2xl font-bold text-blue-600">25.9%</div>
              <div className="text-sm text-muted-foreground">6-Month Retention</div>
              <Badge variant="outline" className="mt-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Feb 2024 Cohort
              </Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200/50 dark:border-purple-800/50">
              <div className="text-2xl font-bold text-purple-600">+12.8%</div>
              <div className="text-sm text-muted-foreground">Retention Improvement</div>
              <Badge variant="outline" className="mt-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Recent Cohorts
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
