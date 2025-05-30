"use client"

import { useState } from "react"
import { Bot, Download, FileText, Lightbulb, Send, Loader2, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { AIInsightsEngine } from "@/components/ai-insights-engine"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface Report {
  id: string
  title: string
  type: "platform" | "community" | "custom"
  community?: string
  createdAt: Date
  status: "generating" | "ready" | "sent"
}

export default function AiInsightsPage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your RYLYTICS AI assistant. I can help you analyze platform data, generate reports, and provide insights. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCommunity, setSelectedCommunity] = useState("")
  const [reportType, setReportType] = useState("platform")
  const [customPrompt, setCustomPrompt] = useState("")
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      title: "Platform Overview Report",
      type: "platform",
      createdAt: new Date(Date.now() - 86400000),
      status: "ready",
    },
    {
      id: "2",
      title: "Tech Innovators Community Analysis",
      type: "community",
      community: "Tech Innovators",
      createdAt: new Date(Date.now() - 172800000),
      status: "ready",
    },
  ])
  const { toast } = useToast()

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(currentMessage),
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("user") || lowerMessage.includes("profile")) {
      return "Based on current data, you have 45,231 total users with a 72.7% profile completion rate. New user registrations are up 12.5% this month. The most common profile creation method is manual (40.8%), followed by scanned profiles (31.9%). Would you like me to generate a detailed user analysis report?"
    }

    if (lowerMessage.includes("community") || lowerMessage.includes("communities")) {
      return "You currently have 127 active communities. The top performing community is 'Tech Innovators' with 1,245 members and an 87% health score. Community growth is up 8.3% overall. Would you like me to analyze a specific community or generate a community performance report?"
    }

    if (lowerMessage.includes("event") || lowerMessage.includes("events")) {
      return "This month you've had 84 events with a 78.3% attendance rate. Workshops have the highest attendance rate at 82.3%, followed by networking events at 79.3%. Event creation is up 18.2% compared to last month. Would you like detailed event analytics?"
    }

    if (lowerMessage.includes("growth") || lowerMessage.includes("trend")) {
      return "Platform growth is strong across all metrics: 12.5% increase in users, 8.3% increase in communities, and 18.2% increase in events. Profile completion rates have improved by 3.1%. The biggest opportunity is in event participation - consider targeted campaigns to boost attendance."
    }

    return "I can help you analyze various aspects of your platform including user engagement, community health, event performance, and growth trends. You can also ask me to generate custom reports or export data. What specific area would you like to explore?"
  }

  const generateReport = async () => {
    setIsLoading(true)

    const newReport: Report = {
      id: Date.now().toString(),
      title:
        reportType === "platform"
          ? "Platform Overview Report"
          : reportType === "community"
            ? `${selectedCommunity} Community Analysis`
            : "Custom Analysis Report",
      type: reportType as "platform" | "community" | "custom",
      community: reportType === "community" ? selectedCommunity : undefined,
      createdAt: new Date(),
      status: "generating",
    }

    setReports((prev) => [newReport, ...prev])

    // Simulate report generation
    setTimeout(() => {
      setReports((prev) =>
        prev.map((report) => (report.id === newReport.id ? { ...report, status: "ready" as const } : report)),
      )
      setIsLoading(false)
      toast({
        title: "Report Generated",
        description: "Your report is ready for download or sharing.",
      })
    }, 3000)
  }

  const exportReport = (reportId: string) => {
    const report = reports.find((r) => r.id === reportId)
    if (!report) return

    // Generate CSV content based on report type
    let csvContent = ""
    if (report.type === "platform") {
      csvContent = `Platform Overview Report
Generated: ${report.createdAt.toLocaleDateString()}

Metric,Value,Change
Total Users,45231,+12.5%
Active Communities,127,+8.3%
Profile Completion Rate,72.7%,+3.1%
Monthly Events,84,+18.2%
Event Attendance Rate,78.3%,+3.2%`
    } else if (report.type === "community") {
      csvContent = `Community Analysis Report - ${report.community}
Generated: ${report.createdAt.toLocaleDateString()}

Metric,Value
Total Members,1245
Active Members,876
Health Score,87
Growth Rate,12.3%
Events This Month,24`
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${report.title.replace(/\s+/g, "_").toLowerCase()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const sendReportViaEmail = (reportId: string) => {
    toast({
      title: "Report Scheduled",
      description: "The report has been added to your email reports queue.",
    })
  }

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Local AI analysis engine for community health and engagement insights
          </p>
        </div>

        <AIInsightsEngine />
      </div>
    </div>
  )
}
