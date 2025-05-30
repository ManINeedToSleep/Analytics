"use client"

import { useState, useEffect } from "react"
import { Brain, TrendingUp, Users, AlertTriangle, BarChart3, Download, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  aiAnalyzer, 
  generateMockCommunityMetrics, 
  generateMockUserSegmentation,
  type AIInsight,
  type CommunityMetrics 
} from "@/lib/ai-analysis"
import { useToast } from "@/hooks/use-toast"
import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

export function AIInsightsEngine() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)
  const { toast } = useToast()

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const communityMetrics = generateMockCommunityMetrics()
      const userSegmentation = generateMockUserSegmentation()
      
      const healthInsights = aiAnalyzer.analyzeCommunityHealth(communityMetrics)
      const segmentationInsight = aiAnalyzer.analyzeUserSegmentation(userSegmentation)
      const monthlySummary = aiAnalyzer.generateMonthlySummary(communityMetrics)
      
      const newInsights = [monthlySummary, segmentationInsight, ...healthInsights]
      setInsights(newInsights)
      setLastAnalysis(new Date())
      
      toast({
        title: "Analysis Complete",
        description: `Generated ${newInsights.length} new insights`,
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to complete AI analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const exportInsights = () => {
    const csvContent = [
      "Type,Title,Summary,Confidence,Timestamp,Recommendations",
      ...insights.map(insight => [
        insight.type,
        insight.title,
        insight.summary,
        insight.confidence,
        insight.timestamp.toISOString(),
        insight.actionableRecommendations.join("; ")
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai_insights_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getInsightIcon = (type: AIInsight["type"]) => {
    switch (type) {
      case "health_summary":
        return <BarChart3 className="h-5 w-5 text-blue-500" />
      case "segmentation":
        return <Users className="h-5 w-5 text-purple-500" />
      case "engagement_alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "growth_opportunity":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      default:
        return <Brain className="h-5 w-5 text-gray-500" />
    }
  }

  const getInsightColor = (type: AIInsight["type"]) => {
    switch (type) {
      case "health_summary":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
      case "segmentation":
        return "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20"
      case "engagement_alert":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
      case "growth_opportunity":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20"
    }
  }

  useEffect(() => {
    runAnalysis()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      runAnalysis()
    }, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      <FadeIn>
        <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Brain className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                  AI Analysis Engine
                </CardTitle>
                <CardDescription className="text-sm">
                  Local AI analysis of engagement patterns and community health (no PII processed)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={exportInsights} variant="outline" disabled={insights.length === 0} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
                <Button onClick={runAnalysis} disabled={isAnalyzing} size="sm">
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Run Analysis</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">{insights.length}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Insights</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {insights.filter(i => i.type === "growth_opportunity").length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Growth Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-600">
                  {insights.filter(i => i.type === "engagement_alert").length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Alerts</div>
              </div>
            </div>
            {lastAnalysis && (
              <div className="mt-4 text-xs sm:text-sm text-muted-foreground text-center">
                Last analysis: {lastAnalysis.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      <Tabs defaultValue="insights" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights" className="text-xs sm:text-sm">Insights</TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm">Actions</TabsTrigger>
          <TabsTrigger value="metrics" className="text-xs sm:text-sm">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          {insights.length === 0 ? (
            <Card className="bg-card dark:bg-card">
              <CardContent className="flex items-center justify-center h-32">
                <div className="text-center">
                  <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">No insights available. Run analysis to generate insights.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[400px] sm:h-[600px]">
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <FadeIn key={insight.id} delay={index * 100}>
                    <Card className={cn(
                      "transition-all duration-300 hover:shadow-lg",
                      getInsightColor(insight.type)
                    )}>
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {getInsightIcon(insight.type)}
                            <CardTitle className="text-base sm:text-lg">{insight.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {(insight.confidence * 100).toFixed(0)}% confidence
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {insight.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{insight.summary}</p>
                        
                        {insight.metrics && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Key Metrics:</h4>
                            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                              {Object.entries(insight.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                  </span>
                                  <span className="font-medium">
                                    {typeof value === 'number' ? value.toFixed(1) : value}
                                    {key.includes('Percentage') || key.includes('Rate') ? '%' : ''}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {insight.affectedCommunities && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Affected Communities:</h4>
                            <div className="flex flex-wrap gap-1">
                              {insight.affectedCommunities.map((communityId) => (
                                <Badge key={communityId} variant="secondary" className="text-xs">
                                  {communityId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                          <ul className="text-sm space-y-1">
                            {insight.actionableRecommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-muted-foreground">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="bg-card dark:bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Prioritized Recommendations</CardTitle>
              <CardDescription>Action items ranked by impact and urgency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights
                  .filter(i => i.type === "engagement_alert")
                  .map((insight, index) => (
                    <FadeIn key={insight.id} delay={index * 100}>
                      <div className="border rounded-lg p-4 bg-background dark:bg-background">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <Badge variant="destructive" className="w-fit">High Priority</Badge>
                          <span className="font-medium text-sm sm:text-base">{insight.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                        <div className="text-sm">
                          <strong>Immediate Action:</strong> {insight.actionableRecommendations[0]}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                
                {insights
                  .filter(i => i.type === "growth_opportunity")
                  .map((insight, index) => (
                    <FadeIn key={insight.id} delay={index * 100 + 200}>
                      <div className="border rounded-lg p-4 bg-background dark:bg-background">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                            Growth Opportunity
                          </Badge>
                          <span className="font-medium text-sm sm:text-base">{insight.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                        <div className="text-sm">
                          <strong>Next Step:</strong> {insight.actionableRecommendations[0]}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FadeIn>
              <Card className="bg-card dark:bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communities Analyzed</span>
                      <span>3/3</span>
                    </div>
                    <Progress value={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Segments Identified</span>
                      <span>4/4</span>
                    </div>
                    <Progress value={100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Engagement Patterns</span>
                      <span>Analyzed</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <Card className="bg-card dark:bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">AI Model Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Confidence</span>
                      <span>{insights.length > 0 ? (insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length * 100).toFixed(1) : 0}%</span>
                    </div>
                    <Progress value={insights.length > 0 ? (insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length * 100) : 0} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing Speed</span>
                      <span>2.1s</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Privacy</span>
                      <span>100% Local</span>
                    </div>
                    <Progress value={100} className="[&>div]:bg-green-500" />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
