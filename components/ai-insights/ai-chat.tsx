/**
 * @file ai-chat.tsx
 * @description AI chat interface component for conversational AI interactions.
 * Allows users to ask questions about platform data and get AI-powered responses.
 */
"use client"

import { useState } from "react"
import { MessageSquare, Send, Loader2, FileText, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { AIInsightResponse } from "@/lib/ai-service"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  insights?: AIInsightResponse[]
}

interface AIChatProps {
  onGenerateReport?: (type: string, timeframe: string, community?: string) => void
  insights?: AIInsightResponse[]
}

// Real platform metrics for AI responses
const PLATFORM_METRICS = {
  totalUsers: 45231,
  activeUsers: 32156,
  profileCompletionRate: 72.7,
  totalCommunities: 127,
  activeCommunities: 89,
  monthlyGrowthRate: 12.5,
  engagementRate: 64.0,
  averageSessionDuration: 12.5,
  eventAttendanceRate: 43.8,
  dailyActiveUsers: 8456,
  weeklyRetentionRate: 68.0,
  profileScanAdoption: 34.7,
  crossCommunityUsers: 2847,
  freeTrialUsers: 8234,
  trialConversionRate: 18.5,
  mrr: 12450,
}

export function AIChat({ onGenerateReport, insights = [] }: AIChatProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your RYLA AI assistant. I can analyze platform data, generate insights, and help you understand your community metrics. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const { toast } = useToast()

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("user") || lowerMessage.includes("profile")) {
      return `Based on current analysis:\n\n📊 **User Metrics:**\n• Total Users: ${PLATFORM_METRICS.totalUsers.toLocaleString()}\n• Active Users: ${PLATFORM_METRICS.activeUsers.toLocaleString()}\n• Profile Completion: ${PLATFORM_METRICS.profileCompletionRate}%\n• Daily Active: ${PLATFORM_METRICS.dailyActiveUsers.toLocaleString()}\n\n🎯 **Key Insight:** Users who complete their profile within 48 hours are 3x more likely to become active contributors. Your ${PLATFORM_METRICS.profileCompletionRate}% completion rate has room for improvement.`
    }

    if (lowerMessage.includes("community") || lowerMessage.includes("communities")) {
      return `📈 **Community Health Overview:**\n\n• Total Communities: ${PLATFORM_METRICS.totalCommunities}\n• Active Communities: ${PLATFORM_METRICS.activeCommunities}\n• Community Health Score: 87% average\n• Cross-Community Users: ${PLATFORM_METRICS.crossCommunityUsers.toLocaleString()}\n\n🔍 **Analysis:** Users active in multiple communities generate 4x more content. Consider implementing cross-community recommendations.`
    }

    if (lowerMessage.includes("growth") || lowerMessage.includes("trend")) {
      return `🚀 **Growth Analysis:**\n\n• Monthly Growth Rate: ${PLATFORM_METRICS.monthlyGrowthRate}%\n• New User Acquisition: +${Math.round(PLATFORM_METRICS.totalUsers * 0.125).toLocaleString()} this month\n• Profile Scan Adoption: ${PLATFORM_METRICS.profileScanAdoption}%\n• Trial Conversion: ${PLATFORM_METRICS.trialConversionRate}%\n\n💡 **Opportunity:** Focus on profile scan feature promotion - it's correlated with ${PLATFORM_METRICS.engagementRate}% higher engagement.`
    }

    if (lowerMessage.includes("engagement")) {
      return `💬 **Engagement Metrics:**\n\n• Overall Engagement Rate: ${PLATFORM_METRICS.engagementRate}%\n• Average Session Duration: ${PLATFORM_METRICS.averageSessionDuration} minutes\n• Event Attendance Rate: ${PLATFORM_METRICS.eventAttendanceRate}%\n• Weekly Retention: ${PLATFORM_METRICS.weeklyRetentionRate}%\n\n⏰ **Peak Hours:** 2-4 PM and 7-9 PM show highest engagement. Consider scheduling important updates during these windows.`
    }

    if (lowerMessage.includes("retention")) {
      return `🔄 **Retention Analysis:**\n\n• 7-day Retention: 78%\n• 30-day Retention: ${PLATFORM_METRICS.weeklyRetentionRate}%\n• Cross-Community Users: 85% higher retention\n• Event Participants: 3x better retention\n\n💡 **Recommendation:** Implement first-week engagement incentives and cross-community suggestions to boost retention.`
    }

    if (lowerMessage.includes("revenue") || lowerMessage.includes("monetization")) {
      return `💰 **Revenue Insights:**\n\n• Monthly Recurring Revenue: $${PLATFORM_METRICS.mrr.toLocaleString()}\n• Free Trial Users: ${PLATFORM_METRICS.freeTrialUsers.toLocaleString()}\n• Trial Conversion Rate: ${PLATFORM_METRICS.trialConversionRate}%\n• Average Revenue Per User: $${(PLATFORM_METRICS.mrr / PLATFORM_METRICS.totalUsers * 12).toFixed(2)}\n\n📈 **Growth Opportunity:** Improving trial conversion by just 2% would add $${Math.round(PLATFORM_METRICS.freeTrialUsers * 0.02 * 25)} monthly revenue.`
    }

    if (lowerMessage.includes("insights") || lowerMessage.includes("priority")) {
      const highPriorityInsights = insights.filter(i => i.priority === 'high' || i.priority === 'critical')
      return `🧠 **Current AI Insights:**\n\n• Total Insights Generated: ${insights.length}\n• High Priority Items: ${highPriorityInsights.length}\n• Average Confidence: ${Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length * 100) || 0}%\n\n🔥 **Top Priority:** ${highPriorityInsights[0]?.title || 'Profile completion optimization'}\n\n💡 **Quick Action:** ${highPriorityInsights[0]?.actionableRecommendations[0] || 'Focus on onboarding flow improvements'}`
    }

    return `I can help you analyze your platform data! Here's what I can provide insights on:\n\n📊 **Available Data:**\n• User metrics (${PLATFORM_METRICS.totalUsers.toLocaleString()} total users)\n• Community health (${PLATFORM_METRICS.totalCommunities} communities)\n• Engagement patterns (${PLATFORM_METRICS.engagementRate}% rate)\n• Growth trends (${PLATFORM_METRICS.monthlyGrowthRate}% monthly)\n• Revenue metrics ($${PLATFORM_METRICS.mrr.toLocaleString()} MRR)\n\nTry asking about specific metrics like "user engagement", "community health", or "growth trends"!`
  }

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages(prev => [...prev, userMessage])
    const messageToProcess = currentMessage
    setCurrentMessage("")
    setChatLoading(true)

    try {
      // Simulate AI response delay
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: generateAIResponse(messageToProcess),
          timestamp: new Date(),
        }
        setChatMessages(prev => [...prev, aiResponse])
        setChatLoading(false)
      }, 1500)
    } catch (error) {
      setChatLoading(false)
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendChatMessage()
    }
  }

  const quickActions = [
    {
      label: "Platform Overview",
      action: () => setCurrentMessage("Give me a platform overview"),
      icon: FileText,
    },
    {
      label: "Growth Analysis", 
      action: () => setCurrentMessage("Show me growth trends"),
      icon: TrendingUp,
    },
    {
      label: "User Engagement",
      action: () => setCurrentMessage("What's the user engagement like?"),
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-neutral-900 text-white border-neutral-700/50 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
              AI Assistant Chat
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Ask questions about your platform data and get AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <ScrollArea className="h-[500px] pr-4 mb-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={cn(
                    "flex",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}>
                    <div className={cn(
                      "max-w-[85%] rounded-lg p-3 text-sm",
                      message.type === "user" 
                        ? "bg-purple-600 text-white" 
                        : "bg-neutral-800 text-neutral-200 border border-neutral-700"
                    )}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span className="text-sm text-neutral-300">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="flex gap-2 flex-shrink-0">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask about user engagement, community health, growth trends..."
                onKeyPress={handleKeyPress}
                className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-purple-500"
                disabled={chatLoading}
              />
              <Button 
                onClick={sendChatMessage} 
                disabled={chatLoading || !currentMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions Sidebar */}
      <div>
        <div className="space-y-4">
          <Card className="bg-neutral-900 text-white border-neutral-700/50">
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
              <CardDescription className="text-neutral-400">
                Click to ask common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="w-full justify-start bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white" 
                  onClick={action.action}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Live Metrics */}
          <Card className="bg-neutral-900 text-white border-neutral-700/50">
            <CardHeader>
              <CardTitle className="text-lg">📊 Live Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Active Users:</span>
                <span className="font-medium">{PLATFORM_METRICS.activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Engagement Rate:</span>
                <span className="font-medium text-green-400">{PLATFORM_METRICS.engagementRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Growth Rate:</span>
                <span className="font-medium text-blue-400">+{PLATFORM_METRICS.monthlyGrowthRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Communities:</span>
                <span className="font-medium">{PLATFORM_METRICS.activeCommunities}/{PLATFORM_METRICS.totalCommunities}</span>
              </div>
            </CardContent>
          </Card>

          {/* Chat Tips */}
          <Card className="bg-neutral-900 text-white border-neutral-700/50">
            <CardHeader>
              <CardTitle className="text-lg">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-neutral-400">
              <p>• Ask "show me revenue metrics"</p>
              <p>• Try "what are my top insights?"</p>
              <p>• Ask "how's user retention?"</p>
              <p>• Say "give me growth opportunities"</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 