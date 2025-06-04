/**
 * @file ai-insights.tsx
 * @description Simplified AI insights overview for the main dashboard.
 * Shows top 3 insights and provides quick access to the full AI analytics page.
 * Connects to RYLA's private AI service for data privacy.
 */
"use client"

import { useState, useEffect } from "react"
import { Brain, ArrowRight, Loader2, AlertCircle, TrendingUp, Users, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { aiService, type AIInsightResponse } from "@/lib/ai-service"
import Link from "next/link"

export function AiInsights() {
  const [insights, setInsights] = useState<AIInsightResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [aiServiceStatus, setAiServiceStatus] = useState(aiService.getStatus())

  useEffect(() => {
    loadQuickInsights()
  }, [])

  const loadQuickInsights = async () => {
    try {
      setLoading(true)
      const quickInsights = await aiService.getQuickInsights()
      setInsights(quickInsights)
      setAiServiceStatus(aiService.getStatus())
    } catch (error) {
      console.error('Failed to load AI insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInsightIcon = (type: AIInsightResponse["type"]) => {
    switch (type) {
      case "growth":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "engagement":
        return <Users className="h-4 w-4 text-blue-400" />
      case "retention":
        return <Target className="h-4 w-4 text-purple-400" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-amber-400" />
      default:
        return <Brain className="h-4 w-4 text-neutral-400" />
    }
  }

  const getPriorityBadge = (priority: AIInsightResponse["priority"]) => {
    const variants = {
      critical: "bg-red-500/20 text-red-300 border-red-500/30",
      high: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      low: "bg-neutral-500/20 text-neutral-300 border-neutral-500/30",
    }
    
    return (
      <Badge className={cn("text-xs border", variants[priority])}>
        {priority}
      </Badge>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-400" />
            AI Insights
            {!aiServiceStatus.configured && (
              <Badge className="ml-2 bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                Mock Data
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">
            Latest insights from RYLA AI analysis engine
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={loadQuickInsights} disabled={loading} variant="ghost" size="sm" className="text-neutral-300 hover:text-white">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Brain className="h-4 w-4" />
            )}
          </Button>
          <Link href="/dashboard/ai-insights">
            <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2 text-neutral-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Analyzing platform data...</span>
            </div>
          </div>
        ) : insights.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center text-neutral-400">
              <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No insights available</p>
              <p className="text-xs mt-1">Check AI service configuration</p>
            </div>
          </div>
        ) : (
          insights.map((insight) => (
            <div 
              key={insight.id} 
              className="rounded-lg border border-neutral-700/50 p-3 transition-all hover:bg-neutral-800/60 hover:border-neutral-600/80"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <h3 className="font-medium text-white text-sm">{insight.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(insight.priority)}
                  <span className="text-xs text-neutral-400">
                    {Math.round(insight.confidence * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-2">
                {insight.summary}
              </p>
              <div className="text-xs text-neutral-500">
                <span className="font-medium">Action:</span> {insight.actionableRecommendations[0]}
              </div>
            </div>
          ))
        )}
        
        {!loading && insights.length > 0 && (
          <div className="pt-2 border-t border-neutral-700/50">
            <Link href="/dashboard/ai-insights">
              <Button variant="ghost" className="w-full text-neutral-300 hover:text-white hover:bg-neutral-800/60">
                View detailed analysis and more insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
