/**
 * @file ai-insights-stats.tsx
 * @description Statistics overview cards for AI insights page.
 * Shows key metrics like total insights, high priority items, growth opportunities, and confidence scores.
 */
"use client"

import { Brain, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import type { AIInsightResponse } from "@/lib/ai-service"

interface AIInsightsStatsProps {
  insights: AIInsightResponse[]
  loading?: boolean
}

export function AIInsightsStats({ insights, loading = false }: AIInsightsStatsProps) {
  const statsCards = [
    { 
      title: "Total Insights", 
      value: loading ? "..." : insights.length, 
      icon: Brain, 
      color: "text-purple-400" 
    },
    { 
      title: "High Priority", 
      value: loading ? "..." : insights.filter(i => i.priority === 'high' || i.priority === 'critical').length, 
      icon: AlertTriangle, 
      color: "text-red-400" 
    },
    { 
      title: "Growth Opportunities", 
      value: loading ? "..." : insights.filter(i => i.type === 'growth' || i.type === 'opportunity').length, 
      icon: TrendingUp, 
      color: "text-green-400" 
    },
    { 
      title: "Avg Confidence", 
      value: loading ? "..." : `${Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length * 100) || 0}%`, 
      icon: BarChart3, 
      color: "text-blue-400" 
    },
  ]

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => (
        <FadeIn key={stat.title} delay={index * 100}>
          <Card className="bg-neutral-900 text-white border-neutral-700/50 hover:border-neutral-600/80 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-400">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={cn("h-8 w-8", stat.color)} />
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      ))}
    </div>
  )
} 