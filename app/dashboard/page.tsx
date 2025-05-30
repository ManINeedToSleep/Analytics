import { Building, Calendar, Users, UserCheck, TrendingUp, Activity, Zap, BarChart3 } from "lucide-react"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { PlatformGrowthChart } from "@/components/dashboard/platform-growth-chart"
import { UserEngagementChart } from "@/components/dashboard/user-engagement-chart"
import { PlatformMetrics } from "@/components/dashboard/platform-metrics"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AiInsights } from "@/components/dashboard/ai-insights"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { FadeIn } from "@/components/ui/fade-in"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-full overflow-hidden">
      {/* Header Section */}
      <FadeIn>
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Platform Overview
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            Internal analytics dashboard for RYLA platform monitoring
          </p>
        </div>
      </FadeIn>

      {/* Core Platform Metrics - 4 cards focused on key metrics */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Users"
          value="45,231"
          description="Registered platform users"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12.5, isPositive: true }}
          delay={100}
          gradient="purple"
        />
        <OverviewCard
          title="Active Communities"
          value="127"
          description="Communities with recent activity"
          icon={<Building className="h-4 w-4" />}
          trend={{ value: 8.3, isPositive: true }}
          delay={150}
          gradient="blue"
        />
        <OverviewCard
          title="Profile Completions"
          value="32,891"
          description="Users with completed profiles"
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 15.2, isPositive: true }}
          delay={200}
          gradient="green"
        />
        <OverviewCard
          title="Monthly Events"
          value="842"
          description="Events created this month"
          icon={<Calendar className="h-4 w-4" />}
          trend={{ value: 6.7, isPositive: true }}
          delay={250}
          gradient="amber"
        />
      </div>

      {/* Key Engagement Insights */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Daily Active Users"
          value="8,234"
          description="Users active in last 24h"
          icon={<Activity className="h-4 w-4" />}
          trend={{ value: 5.2, isPositive: true }}
          delay={300}
          gradient="purple"
        />
        <OverviewCard
          title="Weekly Growth"
          value="18.7%"
          description="Platform growth this week"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 3.1, isPositive: true }}
          delay={350}
          gradient="blue"
        />
        <OverviewCard
          title="Content Created"
          value="2,847"
          description="Posts, events, and updates"
          icon={<Zap className="h-4 w-4" />}
          trend={{ value: 9.4, isPositive: true }}
          delay={400}
          gradient="green"
        />
        <OverviewCard
          title="Platform Health"
          value="98.2%"
          description="System uptime and performance"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ value: 0.8, isPositive: true }}
          delay={450}
          gradient="amber"
        />
      </div>

      {/* AI Insights - Prominent placement for internal stakeholders */}
      <FadeIn delay={500}>
        <AiInsights />
      </FadeIn>

      {/* Platform Analytics Charts */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 xl:grid-cols-2">
        <FadeIn delay={600}>
          <PlatformGrowthChart />
        </FadeIn>
        <FadeIn delay={700}>
          <UserEngagementChart />
        </FadeIn>
      </div>

      {/* Operational Metrics and Activity */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 xl:grid-cols-3">
        <FadeIn delay={800}>
          <PlatformMetrics className="xl:col-span-2" />
        </FadeIn>
        <FadeIn delay={900}>
          <RecentActivity />
        </FadeIn>
      </div>

      {/* Comprehensive Engagement Analysis */}
      <FadeIn delay={1000}>
        <EngagementChart />
      </FadeIn>
    </div>
  )
}
