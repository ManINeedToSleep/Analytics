"use client"

import { useState } from "react"
import { Lightbulb, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Insight {
  id: number
  title: string
  description: string
  type: "growth" | "engagement" | "retention"
}

const mockInsights: Insight[] = [
  {
    id: 1,
    title: "Engagement Opportunity",
    description:
      "Event attendance has dropped 15% in the Tech Innovators community. Consider scheduling events at different times or surveying members for preferred topics.",
    type: "engagement",
  },
  {
    id: 2,
    title: "Growth Trend",
    description:
      "The Design Community has seen a 23% increase in new members this month. Capitalize on this growth by creating more onboarding resources.",
    type: "growth",
  },
  {
    id: 3,
    title: "Retention Risk",
    description:
      "Marketing Pros community has a 12% increase in dormant members. Consider a re-engagement campaign targeting these members.",
    type: "retention",
  },
]

export function AiInsights() {
  const [insights, setInsights] = useState<Insight[]>(mockInsights)
  const [loading, setLoading] = useState(false)

  const generateNewInsight = () => {
    setLoading(true)
    // Simulate API call for new AI-generated insight
    setTimeout(() => {
      const newInsight: Insight = {
        id: insights.length + 1,
        title: "New Member Conversion",
        description:
          "New members who complete their profile within 48 hours are 3x more likely to become active contributors. Consider adding profile completion incentives.",
        type: "engagement",
      }
      setInsights([newInsight, ...insights])
      setLoading(false)
    }, 1500)
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "growth":
        return "bg-green-100 text-green-800"
      case "engagement":
        return "bg-blue-100 text-blue-800"
      case "retention":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>AI-generated recommendations based on your community data</CardDescription>
        </div>
        <Button onClick={generateNewInsight} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Generate Insight
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getInsightColor(
                  insight.type,
                )}`}
              >
                {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
              </span>
              <h3 className="font-semibold">{insight.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{insight.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
