"use client"

import { useState } from "react"
import { Calendar, Download, Filter, TrendingUp, Users, Activity, Target, BarChart3, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { UserFlowAnalytics } from "@/components/analytics/user-flow-analytics"
import { EngagementMetrics } from "@/components/analytics/engagement-metrics"
import { FeatureAdoption } from "@/components/analytics/feature-adoption"
import { CommunityLeaderboard } from "@/components/analytics/community-leaderboard"
import { EngagementFunnel } from "@/components/analytics/engagement-funnel"
import { AIInsightsPanels } from "@/components/analytics/ai-insights-panels"
import { FadeIn } from "@/components/ui/fade-in"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedCommunity, setSelectedCommunity] = useState("all")
  const [userSegment, setUserSegment] = useState("all")
  const { toast } = useToast()

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download.",
    })
  }

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced Analytics
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Deep insights into user behavior, engagement patterns, and platform performance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={exportData} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Export Data</span>
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Advanced Filters</span>
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={100}>
          <Card className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Communities</SelectItem>
                      <SelectItem value="tech-innovators">Tech Innovators</SelectItem>
                      <SelectItem value="design-community">Design Community</SelectItem>
                      <SelectItem value="marketing-pros">Marketing Pros</SelectItem>
                      <SelectItem value="startup-founders">Startup Founders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <Select value={userSegment} onValueChange={setUserSegment}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="User Segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new">New Users</SelectItem>
                      <SelectItem value="active">Active Users</SelectItem>
                      <SelectItem value="power">Power Users</SelectItem>
                      <SelectItem value="at-risk">At-Risk Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Key Metrics Overview */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Daily Active Users"
            value="8,247"
            description="Users active today"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12.3, isPositive: true }}
            delay={200}
            gradient="purple"
          />
          <OverviewCard
            title="7-Day Retention"
            value="73.2%"
            description="Users returning after 7 days"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 5.8, isPositive: true }}
            delay={250}
            gradient="blue"
          />
          <OverviewCard
            title="Feature Adoption"
            value="84.6%"
            description="Users using core features"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 8.2, isPositive: true }}
            delay={300}
            gradient="green"
          />
          <OverviewCard
            title="Churn Rate"
            value="4.1%"
            description="Users not returning (30d)"
            icon={<Target className="h-4 w-4" />}
            trend={{ value: -2.3, isPositive: true }}
            delay={350}
            gradient="amber"
          />
        </div>

        {/* AI Insights Panels */}
        <FadeIn delay={400}>
          <AIInsightsPanels />
        </FadeIn>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="engagement" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="engagement" className="text-xs sm:text-sm">
              <Activity className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Engagement</span>
            </TabsTrigger>
            <TabsTrigger value="userflow" className="text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">User Flow</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="text-xs sm:text-sm">
              <PieChart className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Features</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-xs sm:text-sm">
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Leaders</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
              <FadeIn delay={500}>
                <EngagementMetrics />
              </FadeIn>
              <FadeIn delay={600}>
                <EngagementFunnel />
              </FadeIn>
            </div>
          </TabsContent>

          <TabsContent value="userflow" className="space-y-4 sm:space-y-6">
            <FadeIn delay={500}>
              <UserFlowAnalytics />
            </FadeIn>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 sm:space-y-6">
            <FadeIn delay={500}>
              <FeatureAdoption />
            </FadeIn>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4 sm:space-y-6">
            <FadeIn delay={500}>
              <CommunityLeaderboard />
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
