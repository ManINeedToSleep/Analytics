import { Building, Calendar, Users, UserCheck, Activity, Zap } from "lucide-react"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { PlatformGrowthChart } from "@/components/dashboard/platform/platform-growth-chart"
import { UserEngagementChart } from "@/components/dashboard/users/user-engagement-chart"
import { PlatformMetrics } from "@/components/dashboard/platform/platform-metrics"
import { AiInsights } from "@/components/dashboard/ai-insights/ai-insights"
import { EngagementChart } from "@/components/dashboard/platform/engagement-chart"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHeader } from "@/components/ui/page-header"
import { getDashboardMetrics } from "@/lib/analytics-service"

export default async function DashboardPage() {
  // Fetch real dashboard metrics from database
  const metrics = await getDashboardMetrics()

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-full overflow-hidden">
      {/* Header Section - Now using PageHeader component */}
      <PageHeader 
        title="Platform Overview"
        description="Internal analytics dashboard for RYLA platform monitoring"
      />

      {/* Core Platform Metrics - 6 key metrics in responsive grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard 
          title="Total Users" 
          value={metrics.totalUsers.value.toLocaleString()} 
          description="Registered platform users" 
          iconName="Users" 
          comparison={{ 
            value: metrics.totalUsers.weekAgo, 
            label: "week ago",
            isPositive: metrics.totalUsers.value > metrics.totalUsers.weekAgo
          }} 
          delay={100} 
          accentColor="purple" 
        />
        <OverviewCard 
          title="Active Communities" 
          value={metrics.activeCommunities.value.toLocaleString()} 
          description="Communities with recent activity" 
          iconName="Building" 
          comparison={{ 
            value: metrics.activeCommunities.weekAgo, 
            label: "week ago",
            isPositive: metrics.activeCommunities.value > metrics.activeCommunities.weekAgo
          }} 
          delay={150} 
          accentColor="blue" 
        />
        <OverviewCard 
          title="Profile Completions" 
          value={metrics.profileCompletions.value.toLocaleString()} 
          description="Users with completed profiles" 
          iconName="UserCheck" 
          comparison={{ 
            value: metrics.profileCompletions.weekAgo, 
            label: "week ago",
            isPositive: metrics.profileCompletions.value > metrics.profileCompletions.weekAgo
          }} 
          delay={200} 
          accentColor="green" 
        />
        <OverviewCard 
          title="Monthly Events" 
          value={metrics.monthlyEvents.value.toLocaleString()} 
          description="Events created this month" 
          iconName="Calendar" 
          comparison={{ 
            value: metrics.monthlyEvents.lastMonth, 
            label: "last month",
            isPositive: metrics.monthlyEvents.value > metrics.monthlyEvents.lastMonth
          }} 
          delay={250} 
          accentColor="amber" 
        />
        <OverviewCard 
          title="Daily Active Users" 
          value={metrics.dailyActiveUsers.value.toLocaleString()} 
          description="Users active in last 24h" 
          iconName="Activity" 
          comparison={{ 
            value: metrics.dailyActiveUsers.weekAgo, 
            label: "week ago",
            isPositive: metrics.dailyActiveUsers.value > metrics.dailyActiveUsers.weekAgo
          }} 
          delay={300} 
          accentColor="purple" 
        />
        <OverviewCard 
          title="Content Created" 
          value={metrics.contentCreated.value.toLocaleString()} 
          description="Events and communities this week" 
          iconName="Zap" 
          comparison={{ 
            value: metrics.contentCreated.weekAgo, 
            label: "last week",
            isPositive: metrics.contentCreated.value > metrics.contentCreated.weekAgo
          }} 
          delay={350} 
          accentColor="green" 
        />
      </div>

      {/* AI Insights - Prominent placement for internal stakeholders */}
      <FadeIn delay={400}>
        <AiInsights />
      </FadeIn>

      {/* Main Dashboard 2x2 Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <FadeIn delay={450}>
          <PlatformGrowthChart /> 
        </FadeIn>
        <FadeIn delay={500}>
          <UserEngagementChart /> { /* This is the bar chart */}
        </FadeIn>
        <FadeIn delay={550}>
          <PlatformMetrics /> { /* This is Platform Conversion Metrics */}
        </FadeIn>
        <FadeIn delay={600}>
          <EngagementChart /> { /* This is Member Engagement stacked area chart */}
        </FadeIn>
      </div>
    </div>
  )
}
