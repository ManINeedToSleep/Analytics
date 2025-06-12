"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, Users } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "growth",
    title: "Community Growth Surge",
    summary:
      "Tech Innovators community grew by 23% this month, driven by increased event participation and word-of-mouth referrals.",
    impact: "high",
    confidence: 92,
    metrics: { newMembers: 287, growthRate: 23.4, referralRate: 34.2 },
    recommendations: [
      "Replicate successful event formats in other communities",
      "Implement referral rewards program",
      "Create community growth playbook",
    ],
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "engagement",
    title: "Feature Adoption Alert",
    summary:
      "Voice message feature adoption dropped 15% after initial launch spike. Users cite privacy concerns and interface complexity.",
    impact: "medium",
    confidence: 87,
    metrics: { adoptionRate: 28.4, dropRate: -15.2, feedbackScore: 3.2 },
    recommendations: [
      "Simplify voice message interface",
      "Add privacy controls and explanations",
      "Create tutorial content for new feature",
    ],
    icon: AlertTriangle,
    color: "text-amber-600",
  },
  {
    id: 3,
    type: "retention",
    title: "Retention Improvement Opportunity",
    summary: "Users who join communities within 48 hours of signup show 3x higher 30-day retention rates (78% vs 26%).",
    impact: "high",
    confidence: 95,
    metrics: { earlyJoiners: 78.2, lateJoiners: 26.1, timeWindow: 48 },
    recommendations: [
      "Optimize onboarding flow to encourage immediate community joining",
      "Send targeted community recommendations within first 24 hours",
      "A/B test different community suggestion strategies",
    ],
    icon: Users,
    color: "text-blue-600",
  },
]

export function AIInsightsPanels() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-blue-600"
    if (confidence >= 60) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
      {insights.map((insight) => {
        const Icon = insight.icon
        return (
          <Card
            key={insight.id}
            className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 ${insight.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <Badge className={getImpactColor(insight.impact)} variant="outline">
                      {insight.impact} impact
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Brain className="h-3 w-3 text-purple-500" />
                  <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}%
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm sm:text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {insight.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{insight.summary}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/10 dark:to-blue-950/10 border border-purple-200/30 dark:border-purple-800/30">
                {Object.entries(insight.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-xs sm:text-sm font-bold text-purple-600">
                      {typeof value === "number"
                        ? key.includes("Rate") || key.includes("Score")
                          ? `${value}%`
                          : value.toLocaleString()
                        : value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Top Recommendation */}
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 border border-border/50">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-amber-600 mb-1">Top Recommendation</div>
                    <div className="text-xs sm:text-sm">{insight.recommendations[0]}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs sm:text-sm group-hover:bg-purple-50 dark:group-hover:bg-purple-950/20 group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-all duration-300"
              >
                View Full Analysis
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
