"use client"

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"

interface CommunityHealthScoreProps {
  score: number
  className?: string
}

export function CommunityHealthScore({ score, className }: CommunityHealthScoreProps) {
  // Determine color based on score
  const getColor = (score: number) => {
    if (score >= 75) return "#22c55e" // Green for high scores
    if (score >= 50) return "#f59e0b" // Amber for medium scores
    return "#ef4444" // Red for low scores
  }

  const data = [
    {
      name: "Score",
      value: score,
      fill: getColor(score),
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Community Health Score</CardTitle>
        <CardDescription>Overall health of your community</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Chart height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              barSize={10}
              data={data}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar background={{ fill: "#f3f4f6" }} dataKey="value" cornerRadius={10} max={100} />
            </RadialBarChart>
          </ResponsiveContainer>
        </Chart>
        <div className="mt-2 text-center">
          <div className="text-3xl font-bold" style={{ color: getColor(score) }}>
            {score}/100
          </div>
          <p className="text-sm text-muted-foreground">
            {score >= 75 ? "Excellent" : score >= 50 ? "Good" : "Needs Improvement"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
