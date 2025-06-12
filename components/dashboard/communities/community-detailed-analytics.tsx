"use client"

import { useState } from "react"
import { Building, TrendingUp, Users, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CommunityHealthScore } from "@/components/dashboard/communities/community-health-score"
import { SegmentDistribution } from "@/components/dashboard/users/segment-distribution"
import { EngagementChart } from "@/components/dashboard/platform/engagement-chart"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"

export function CommunityDetailedAnalytics() {
  const [selectedCommunity, setSelectedCommunity] = useState("tech-innovators")

  const communities: ComboboxOption[] = [
    { 
      value: "tech-innovators", 
      label: "Tech Innovators", 
      creator: "Sarah Chen",
      createdDate: "Jan 15, 2024",
      members: 1245,
      description: "Hub for technology enthusiasts and innovators"
    },
    { 
      value: "design-community", 
      label: "Design Community", 
      creator: "Alex Rodriguez",
      createdDate: "Feb 3, 2024",
      members: 876,
      description: "Creative professionals sharing design insights"
    },
    { 
      value: "marketing-pros", 
      label: "Marketing Pros", 
      creator: "Emma Johnson",
      createdDate: "Mar 10, 2024",
      members: 567,
      description: "Marketing strategies and growth hacking"
    },
    { 
      value: "startup-founders", 
      label: "Startup Founders", 
      creator: "Michael Park",
      createdDate: "Jan 28, 2024",
      members: 432,
      description: "Entrepreneurship and startup journey"
    },
    { 
      value: "data-scientists", 
      label: "Data Scientists", 
      creator: "Dr. Lisa Wang",
      createdDate: "Feb 14, 2024",
      members: 321,
      description: "Data analysis and machine learning"
    },
    { 
      value: "tech-innovators-local", 
      label: "Tech Innovators", 
      creator: "John Smith",
      createdDate: "Mar 22, 2024",
      members: 89,
      description: "Local tech meetup group"
    },
  ]

  // Mock data based on selected community
  const getCommunityData = () => {
    const baseData = (() => {
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
        case "tech-innovators-local":
          return {
            members: 89,
            active: 45,
            events: 3,
            growth: 2.1,
            healthScore: 45,
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
    })()

    // Calculate historical data (yesterday vs 2 days ago) for each metric
    const getHistoricalTrend = (currentValue: number, variance: number = 0.05) => {
      const yesterdayValue = currentValue * (1 + (Math.random() * variance * 2 - variance))
      const twoDaysAgoValue = yesterdayValue * (1 + (Math.random() * variance * 2 - variance))
      const dailyChange = ((yesterdayValue - twoDaysAgoValue) / twoDaysAgoValue) * 100
      
      return {
        yesterday: Math.round(yesterdayValue),
        twoDaysAgo: Math.round(twoDaysAgoValue),
        trend: Number(dailyChange.toFixed(1)),
        isPositive: dailyChange > 0
      }
    }

    const membersHistorical = getHistoricalTrend(baseData.members, 0.02) // ±2% variance for members
    const activeHistorical = getHistoricalTrend(baseData.active, 0.05) // ±5% variance for active members
    const eventsHistorical = getHistoricalTrend(baseData.events, 0.15) // ±15% variance for events
    const growthHistorical = getHistoricalTrend(baseData.growth, 0.20) // ±20% variance for growth rate

    return {
      ...baseData,
      historical: {
        members: membersHistorical,
        active: activeHistorical,
        events: eventsHistorical,
        growth: growthHistorical,
      }
    }
  }

  const data = getCommunityData()
  const selectedCommunityInfo = communities.find(c => c.value === selectedCommunity)

  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
                Community Analytics
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Detailed metrics for individual communities
              </CardDescription>
            </div>
            <Combobox
              options={communities}
              value={selectedCommunity}
              onValueChange={setSelectedCommunity}
              placeholder="Select community..."
              searchPlaceholder="Search communities or creators..."
              className="w-[300px]"
              showCreator={true}
              showMemberCount={true}
            />
          </div>
        </CardHeader>
        
        {selectedCommunityInfo && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <div className="flex-1">
                <h3 className="font-semibold text-white">{selectedCommunityInfo.label}</h3>
                <p className="text-sm text-neutral-400 mt-1">{selectedCommunityInfo.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-400">Created by</p>
                <p className="font-medium text-purple-400">{selectedCommunityInfo.creator}</p>
                <p className="text-xs text-neutral-500 mt-1">{selectedCommunityInfo.createdDate}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Community-specific metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Members"
          value={data.members.toLocaleString()}
          description={`Yesterday: ${data.historical.members.yesterday.toLocaleString()}`}
          iconName="Users"
          trend={{ value: data.historical.members.trend, isPositive: data.historical.members.isPositive }}
          accentColor="purple"
        />
        <OverviewCard
          title="Active Members"
          value={data.active.toLocaleString()}
          description={`${Math.round((data.active / data.members) * 100)}% of total • Yesterday: ${data.historical.active.yesterday.toLocaleString()}`}
          iconName="Zap"
          trend={{ value: data.historical.active.trend, isPositive: data.historical.active.isPositive }}
          accentColor="blue"
        />
        <OverviewCard
          title="Events This Month"
          value={data.events.toString()}
          description={`Yesterday: ${data.historical.events.yesterday} events`}
          iconName="Building"
          trend={{ value: data.historical.events.trend, isPositive: data.historical.events.isPositive }}
          accentColor="green"
        />
        <OverviewCard
          title="Growth Rate"
          value={`${data.growth}%`}
          description={`Daily change • Yesterday: ${data.historical.growth.yesterday.toFixed(1)}%`}
          iconName="TrendingUp"
          trend={{ value: data.historical.growth.trend, isPositive: data.historical.growth.isPositive }}
          accentColor="amber"
        />
      </div>

      {/* Community-specific detailed analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <CommunityHealthScore 
          score={data.healthScore} 
          className="md:col-span-1" 
          communityName={selectedCommunityInfo?.label || "Selected Community"}
        />
        <SegmentDistribution />
      </div>

      <EngagementChart />
    </div>
  )
}
