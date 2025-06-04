/**
 * @file ai-insights-list.tsx
 * @description Filterable list of AI insights with detailed view.
 * Includes type and priority filtering, plus expandable insight cards.
 */
"use client"

import { useState, useEffect } from "react"
import { 
  TrendingUp, Users, AlertTriangle, Target, Zap, Brain, 
  Filter, Loader2 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"
import type { AIInsightResponse } from "@/lib/ai-service"

interface AIInsightsListProps {
  insights: AIInsightResponse[]
  loading?: boolean
}

export function AIInsightsList({ insights, loading = false }: AIInsightsListProps) {
  const [filteredInsights, setFilteredInsights] = useState<AIInsightResponse[]>([])
  const [analysisFilter, setAnalysisFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  useEffect(() => {
    filterInsights()
  }, [insights, analysisFilter, priorityFilter])

  const filterInsights = () => {
    let filtered = insights

    if (analysisFilter !== "all") {
      filtered = filtered.filter(insight => insight.type === analysisFilter)
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(insight => insight.priority === priorityFilter)
    }

    // Sort by priority and confidence
    filtered.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const aPriority = priorityOrder[a.priority] || 0
      const bPriority = priorityOrder[b.priority] || 0
      
      if (aPriority !== bPriority) return bPriority - aPriority
      return b.confidence - a.confidence
    })

    setFilteredInsights(filtered)
  }

  const getInsightIcon = (type: AIInsightResponse["type"]) => {
    const icons = {
      growth: <TrendingUp className="h-5 w-5 text-green-400" />,
      engagement: <Users className="h-5 w-5 text-blue-400" />,
      retention: <Target className="h-5 w-5 text-purple-400" />,
      alert: <AlertTriangle className="h-5 w-5 text-red-400" />,
      opportunity: <Zap className="h-5 w-5 text-amber-400" />,
    }
    return icons[type] || <Brain className="h-5 w-5 text-neutral-400" />
  }

  const getPriorityColor = (priority: AIInsightResponse["priority"]) => {
    const colors = {
      critical: "bg-red-500/20 text-red-300 border-red-500/30",
      high: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      medium: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      low: "bg-neutral-500/20 text-neutral-300 border-neutral-500/30",
    }
    return colors[priority] || colors.low
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={analysisFilter} onValueChange={setAnalysisFilter}>
          <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-700 text-neutral-300">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="retention">Retention</SelectItem>
            <SelectItem value="alert">Alerts</SelectItem>
            <SelectItem value="opportunity">Opportunities</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-700 text-neutral-300">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-300">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Insights List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-400" />
            <p className="text-neutral-400">Analyzing platform data...</p>
          </div>
        </div>
      ) : filteredInsights.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-neutral-400">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No insights found</p>
            <p className="text-sm">Try adjusting your filters or refresh the analysis.</p>
          </div>
        </div>
      ) : (
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {filteredInsights.map((insight, index) => (
              <FadeIn key={insight.id} delay={index * 50}>
                <Card className="bg-neutral-900 text-white border-neutral-700/50 hover:border-neutral-600/80 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={cn("text-xs border", getPriorityColor(insight.priority))}>
                              {insight.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-neutral-600 text-neutral-300">
                              {Math.round(insight.confidence * 100)}% confidence
                            </Badge>
                            {insight.affectedCommunities && insight.affectedCommunities.length > 0 && (
                              <Badge variant="outline" className="text-xs border-neutral-600 text-neutral-300">
                                {insight.affectedCommunities.length} communities
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-400">
                        {new Date(insight.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-300 mb-4 leading-relaxed">{insight.summary}</p>
                    
                    {insight.metrics && Object.keys(insight.metrics).length > 0 && (
                      <div className="mb-4 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
                        <h4 className="text-sm font-medium mb-3 text-neutral-200">Key Metrics:</h4>
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                          {Object.entries(insight.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-neutral-400">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span className="font-medium text-white">
                                {typeof value === 'number' ? value.toFixed(1) : value}
                                {key.includes('Percentage') || key.includes('Rate') ? '%' : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium mb-2 text-neutral-200">Recommended Actions:</h4>
                      <ul className="text-sm space-y-1">
                        {insight.actionableRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-neutral-400 mt-1">•</span>
                            <span className="text-neutral-300">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {insight.affectedCommunities && insight.affectedCommunities.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-neutral-700/50">
                        <span className="text-xs text-neutral-400">
                          Affected Communities: {insight.affectedCommunities.join(', ')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
} 