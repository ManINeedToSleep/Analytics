import { Building, Calendar, Users, UserCheck, TrendingUp, Activity, Zap, BarChart3, UserPlus, Percent, DollarSign } from "lucide-react"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { PlatformGrowthChart } from "@/components/dashboard/platform-growth-chart"
import { UserEngagementChart } from "@/components/dashboard/user-engagement-chart"
import { PlatformMetrics } from "@/components/dashboard/platform-metrics"
import { AiInsights } from "@/components/dashboard/ai-insights"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHeader } from "@/components/ui/page-header"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-full overflow-hidden">
      {/* Header Section - Now using PageHeader component */}
      <PageHeader 
        title="Platform Overview"
        description="Internal analytics dashboard for RYLA platform monitoring"
      />

      {/* Core Platform Metrics - Split into two grids */}
      {/* First 8 cards in 4-column grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Row 1 of OverviewCards */}
        <OverviewCard title="Total Users" value="45,231" description="Registered platform users" iconName="Users" trend={{ value: 12.5, isPositive: true }} delay={100} accentColor="purple" />
        <OverviewCard title="Active Communities" value="127" description="Communities with recent activity" iconName="Building" trend={{ value: 8.3, isPositive: true }} delay={150} accentColor="blue" />
        <OverviewCard title="Profile Completions" value="32,891" description="Users with completed profiles" iconName="UserCheck" trend={{ value: 15.2, isPositive: true }} delay={200} accentColor="green" />
        <OverviewCard title="Monthly Events" value="842" description="Events created this month" iconName="Calendar" trend={{ value: 6.7, isPositive: true }} delay={250} accentColor="amber" />
        
        {/* Row 2 of OverviewCards */}
        <OverviewCard title="Daily Active Users" value="8,234" description="Users active in last 24h" iconName="Activity" trend={{ value: 5.2, isPositive: true }} delay={300} accentColor="purple" />
        <OverviewCard title="Weekly Growth" value="18.7%" description="Platform growth this week" iconName="TrendingUp" trend={{ value: 3.1, isPositive: true }} delay={350} accentColor="blue" />
        <OverviewCard title="Content Created" value="2,847" description="Posts, events, and updates" iconName="Zap" trend={{ value: 9.4, isPositive: true }} delay={400} accentColor="green" />
        <OverviewCard title="Platform Health" value="98.2%" description="System uptime and performance" iconName="BarChart3" trend={{ value: 0.8, isPositive: true }} delay={450} accentColor="amber" />
      </div>

      {/* Last 3 cards in 3-column grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard 
          title="Free Trial Users" 
          value="1,284" 
          description="Currently active free trials" 
          iconName="UserPlus" 
          trend={{ value: 22.1, isPositive: true }} 
          delay={500} 
          accentColor="teal" 
        />
        <OverviewCard 
          title="Trial Conversion" 
          value="18.5%" 
          description="Free trials converted to paid" 
          iconName="Percent" 
          trend={{ value: 2.3, isPositive: true }} 
          delay={550} 
          accentColor="green" 
        />
        <OverviewCard 
          title="MRR" 
          value="$12,450" 
          description="Monthly Recurring Revenue" 
          iconName="DollarSign" 
          trend={{ value: 7.8, isPositive: true }} 
          delay={600} 
          accentColor="blue"
        />
      </div>

      {/* AI Insights - Prominent placement for internal stakeholders */}
      <FadeIn delay={650}>
        <AiInsights />
      </FadeIn>

      {/* Main Dashboard 2x2 Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <FadeIn delay={700}>
          <PlatformGrowthChart /> 
        </FadeIn>
        <FadeIn delay={800}>
          <UserEngagementChart /> { /* This is the bar chart */}
        </FadeIn>
        <FadeIn delay={900}>
          <PlatformMetrics /> { /* This is Platform Conversion Metrics */}
        </FadeIn>
        <FadeIn delay={1000}>
          <EngagementChart /> { /* This is Member Engagement stacked area chart */}
        </FadeIn>
      </div>
    </div>
  )
}
