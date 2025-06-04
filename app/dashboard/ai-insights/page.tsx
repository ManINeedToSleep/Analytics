/**
 * @file page.tsx (AI Insights)
 * @description Comprehensive AI insights and analytics page.
 * Provides detailed AI analysis, chat interface, report generation, and real-time insights.
 * Connects to RYLA's private AI service for secure data analysis.
 */
"use client"

import { useState, useEffect } from "react"
import { 
  Brain, RefreshCw, Settings, Loader2,
  BarChart3, MessageSquare, FileText
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/ui/page-header"
import { aiService, type AIInsightResponse } from "@/lib/ai-service"

// Import our modular components
import { AIInsightsStats } from "@/components/ai-insights/ai-insights-stats"
import { AIInsightsOverview } from "@/components/ai-insights/ai-insights-overview"
import { AIInsightsList } from "@/components/ai-insights/ai-insights-list"
import { AIChat } from "@/components/ai-insights/ai-chat"
import { AIReports } from "@/components/ai-insights/ai-reports"

export default function AiInsightsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [insights, setInsights] = useState<AIInsightResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [aiServiceStatus, setAiServiceStatus] = useState(aiService.getStatus())
  const { toast } = useToast()

  useEffect(() => {
    loadAllInsights()
  }, [])

  const loadAllInsights = async () => {
    try {
      setLoading(true)
      const [healthInsights, engagementInsights, growthInsights] = await Promise.all([
        aiService.analyzeCommunityHealth([]),
        aiService.analyzeUserEngagement({}),
        aiService.analyzeGrowthOpportunities({})
      ])
      
      const allInsights = [...healthInsights, ...engagementInsights, ...growthInsights]
      // Remove duplicates based on ID
      const uniqueInsights = allInsights.filter((insight, index, self) => 
        index === self.findIndex(i => i.id === insight.id)
      )
      
      setInsights(uniqueInsights)
      setAiServiceStatus(aiService.getStatus())
    } catch (error) {
      console.error('Failed to load AI insights:', error)
      toast({
        title: "Analysis Error",
        description: "Failed to load AI insights. Using mock data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateReport = async (type: string, timeframe: string, community?: string) => {
    toast({
      title: "Report Generation Started",
      description: `Generating ${type} analysis report for ${timeframe.replace('_', ' ')}...`,
    })
    // Report generation is handled by the AIReports component
  }

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-full">
        <PageHeader 
          title="AI Insights & Analytics"
          description="Comprehensive AI analysis engine for community health and engagement insights"
          actions={
            <div className="flex items-center gap-2">
              <Button onClick={loadAllInsights} disabled={loading} variant="outline" size="sm">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Refresh
              </Button>
              {!aiServiceStatus.configured && (
                <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                  Using Mock Data
                </Badge>
              )}
            </div>
          }
        />

        {/* Stats Overview */}
        <AIInsightsStats insights={insights} loading={loading} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-neutral-700">
              <Brain className="h-4 w-4 mr-2" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-neutral-700">
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-neutral-700">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AIInsightsOverview aiServiceStatus={aiServiceStatus} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <AIInsightsList insights={insights} loading={loading} />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <AIChat onGenerateReport={generateReport} insights={insights} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <AIReports insights={insights} aiServiceStatus={aiServiceStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
