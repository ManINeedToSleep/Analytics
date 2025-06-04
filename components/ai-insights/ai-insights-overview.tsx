/**
 * @file ai-insights-overview.tsx
 * @description Overview tab content for AI insights page.
 * Shows AI service status, configuration, and analysis coverage metrics.
 */
"use client"

import { Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AIServiceStatus {
  configured: boolean
  baseUrl: string
  hasApiKey: boolean
}

interface AIInsightsOverviewProps {
  aiServiceStatus: AIServiceStatus
}

export function AIInsightsOverview({ aiServiceStatus }: AIInsightsOverviewProps) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Service Status */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            AI Service Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Service Connection</span>
            <Badge className={aiServiceStatus.configured ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}>
              {aiServiceStatus.configured ? "Connected" : "Mock Mode"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>API Endpoint</span>
            <span className="text-sm text-neutral-400 max-w-[200px] truncate">{aiServiceStatus.baseUrl}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Authentication</span>
            <Badge className={aiServiceStatus.hasApiKey ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}>
              {aiServiceStatus.hasApiKey ? "API Key Set" : "No API Key"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Data Privacy</span>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Local Processing</Badge>
          </div>
          {!aiServiceStatus.configured && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-300">
                <strong>Note:</strong> AI service is not configured. Set <code>NEXT_PUBLIC_RYLA_AI_API_KEY</code> environment variable to connect to your AI server.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Coverage */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50">
        <CardHeader>
          <CardTitle>Analysis Coverage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Communities Analyzed</span>
              <span>3/3</span>
            </div>
            <Progress value={100} className="[&>div]:bg-purple-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>User Segments</span>
              <span>4/4</span>
            </div>
            <Progress value={100} className="[&>div]:bg-blue-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Data Points Processed</span>
              <span>45.2K</span>
            </div>
            <Progress value={85} className="[&>div]:bg-green-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Last Analysis</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
            <Progress value={95} className="[&>div]:bg-amber-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 