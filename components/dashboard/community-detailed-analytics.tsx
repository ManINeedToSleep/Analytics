"use client"

import { useState } from "react"
import { Building, TrendingUp, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommunityHealthScore } from "@/components/dashboard/community-health-score"
import { SegmentDistribution } from "@/components/dashboard/segment-distribution"
import { EngagementChart } from "@/components/dashboard/engagement-chart"
import { OverviewCard } from "@/components/dashboard/overview-card"

export function CommunityDetailedAnalytics() {
  const [selectedCommunity, setSelectedCommunity] = useState("tech-innovators")

  const communities = [
    { value: "tech-innovators", label: "Tech Innovators" },
    { value: "design-community", label: "Design Community" },
    { value: "marketing-pros", label: "Marketing Pros" },
    { value: "startup-founders", label: "Startup Founders" },
    { value: "data-scientists", label: "Data Scientists" },
  ]

  // Mock data based on selected community
  const getCommunityData = () => {
    switch (selectedCommunity) {
      case "tech-innovators":
        return {
          members: 1245,
          active: 876,
          events: 24,
          growth: 12.3,
          healthScore: 87,
        }
      case "design-community":
        return {
          members: 876,
          active: 654,
          events: 18,
          growth: 8.7,
          healthScore: 76,
        }
      default:
        return {
          members: 567,
          active: 432,
          events: 15,
          growth: 5.2,
          healthScore: 65,
        }
    }
  }

  const data = getCommunityData()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Analytics</CardTitle>
              <CardDescription>Detailed metrics for individual communities</CardDescription>
            </div>
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select community" />
              </SelectTrigger>
              <SelectContent>
                {communities.map((community) => (
                  <SelectItem key={community.value} value={community.value}>
                    {community.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Community-specific metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Members"
          value={data.members.toLocaleString()}
          description="In this community"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: data.growth, isPositive: true }}
        />
        <OverviewCard
          title="Active Members"
          value={data.active.toLocaleString()}
          description={`${Math.round((data.active / data.members) * 100)}% of total`}
          icon={<Zap className="h-4 w-4" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <OverviewCard
          title="Events This Month"
          value={data.events.toString()}
          description="Community events"
          icon={<Building className="h-4 w-4" />}
          trend={{ value: 15.8, isPositive: true }}
        />
        <OverviewCard
          title="Growth Rate"
          value={`${data.growth}%`}
          description="Month over month"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Community-specific detailed analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CommunityHealthScore score={data.healthScore} className="lg:col-span-1" />
        <SegmentDistribution />
        <Card>
          <CardHeader>
            <CardTitle>Community Insights</CardTitle>
            <CardDescription>AI-generated insights for this community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <h4 className="font-semibold text-sm mb-2">Engagement Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Event attendance has increased 23% this month. Consider hosting similar events.
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-semibold text-sm mb-2">Member Growth</h4>
                <p className="text-sm text-muted-foreground">
                  New member onboarding is performing well with 85% profile completion rate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EngagementChart />
    </div>
  )
}
