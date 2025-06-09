"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Target,
  Globe,
  Crown,
  Activity,
  UserPlus
} from "lucide-react"

// Mock data for community analytics
const communityStats = [
  { name: "Total Communities", value: 127, change: 8.2, icon: "Globe" },
  { name: "Active Communities", value: 98, change: 12.5, icon: "Activity" },
  { name: "Total Members", value: 45231, change: 23.1, icon: "Users" },
  { name: "New Members (30d)", value: 2847, change: 15.7, icon: "UserPlus" }
]

const communityGrowthData = [
  { month: "Jan", communities: 89, members: 28450, events: 234 },
  { month: "Feb", communities: 95, members: 31200, events: 267 },
  { month: "Mar", communities: 102, members: 34800, events: 289 },
  { month: "Apr", communities: 108, members: 38100, events: 312 },
  { month: "May", communities: 115, members: 41650, events: 356 },
  { month: "Jun", communities: 127, members: 45231, events: 384 }
]

const categoryDistribution = [
  { name: "Technology", value: 32, color: "#8b5cf6" },
  { name: "Business", value: 28, color: "#06d6a0" },
  { name: "Arts & Design", value: 24, color: "#ffd23f" },
  { name: "Marketing", value: 18, color: "#f72585" },
  { name: "Education", value: 15, color: "#4cc9f0" },
  { name: "Others", value: 10, color: "#7209b7" }
]

const membershipTiers = [
  { tier: "Free", communities: 87, percentage: 68.5 },
  { tier: "Premium", communities: 32, percentage: 25.2 },
  { tier: "Enterprise", communities: 8, percentage: 6.3 }
]

const activityMetrics = [
  { period: "Last 7 days", events: 89, newMembers: 234, posts: 1456 },
  { period: "Last 30 days", events: 356, newMembers: 2847, posts: 12340 },
  { period: "Last 90 days", events: 1024, newMembers: 8234, posts: 34567 }
]

export function CommunitiesOverview() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {communityStats.map((stat) => (
          <OverviewCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            change={stat.change}
            iconName={stat.icon}
          />
        ))}
      </div>

      {/* Community Growth Chart */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            Community Growth Trends
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Monthly growth across communities, members, and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={communityGrowthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
              <XAxis 
                dataKey="month" 
                stroke="#a3a3a3"
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis
                stroke="#a3a3a3"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value.toString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                  borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                  borderRadius: "0.5rem",
                  color: "hsl(var(--foreground-accent, 0 0% 98%))",
                }}
              />
              <Line
                type="monotone"
                dataKey="communities"
                name="Communities"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#8b5cf6" }}
              />
              <Line
                type="monotone"
                dataKey="members"
                name="Members"
                stroke="#06d6a0"
                strokeWidth={3}
                dot={{ r: 4, fill: "#06d6a0" }}
              />
              <Line
                type="monotone"
                dataKey="events"
                name="Events"
                stroke="#ffd23f"
                strokeWidth={3}
                dot={{ r: 4, fill: "#ffd23f" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Distribution */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-400" />
              Category Distribution
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Communities by category type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background-accent, 240 5.9% 10%))",
                    borderColor: "hsl(var(--border-accent, 240 3.7% 15.9%))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--foreground-accent, 0 0% 98%))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Membership Tiers */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Crown className="mr-2 h-5 w-5 text-yellow-400" />
              Membership Tiers
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Distribution of community subscription levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {membershipTiers.map((tier) => (
              <div key={tier.tier} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-200">{tier.tier}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-400">{tier.communities} communities</span>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        tier.tier === 'Enterprise' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        tier.tier === 'Premium' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                        'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
                      }`}
                    >
                      {tier.percentage}%
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-neutral-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      tier.tier === 'Enterprise' ? 'bg-yellow-500' :
                      tier.tier === 'Premium' ? 'bg-purple-500' :
                      'bg-neutral-500'
                    }`}
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Metrics */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Activity className="mr-2 h-5 w-5 text-green-400" />
            Community Activity Overview
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Recent activity across all communities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {activityMetrics.map((metric) => (
              <div key={metric.period} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
                <h4 className="font-medium text-white mb-3">{metric.period}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Events Created</span>
                    <span className="font-semibold text-purple-400">{metric.events}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">New Members</span>
                    <span className="font-semibold text-green-400">{metric.newMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Posts & Comments</span>
                    <span className="font-semibold text-blue-400">{metric.posts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 