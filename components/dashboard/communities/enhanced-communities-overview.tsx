"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"
import { 
  Users, 
  Calendar, 
  TrendingUp,
  Activity,
  UserPlus,
  Target,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Database,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CommunityAnalytics {
  overview: {
    totalCommunities: { current: number; previous: number; change: number; isPositive: boolean }
    totalMembers: { current: number; previous: number; change: number; isPositive: boolean }
    totalEvents: { current: number; previous: number; change: number; isPositive: boolean }
    activeCommunities: { current: number; percentage: number }
    referralSuccessRate: { rate: number; total: number; successful: number }
  }
  topGrowingCommunities: Array<{
    id: string
    name: string
    avatar?: string
    memberCount: number
    newMembers: number
    newEvents: number
    growthScore: number
  }>
  growthData: Array<{
    date: string
    newMembers: number
    activeCommunities: number
  }>
  dataSource: string
}

interface TimeRangeOption {
  value: string
  label: string
}

const timeRangeOptions: TimeRangeOption[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' }
]

export function EnhancedCommunitiesOverview() {
  const [analytics, setAnalytics] = useState<CommunityAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/communities?timeRange=${timeRange}`)
        if (!response.ok) {
          throw new Error('Failed to fetch community analytics')
        }
        
        const data = await response.json()
        setAnalytics(data)
      } catch (err) {
        console.error('Failed to fetch community analytics:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2 text-neutral-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading community analytics...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="space-y-6">
        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 mb-2">Error loading analytics</div>
              <div className="text-neutral-400 text-sm">{error}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { overview, topGrowingCommunities, growthData } = analytics

  // Helper function to get time period label
  const getTimePeriodLabel = (timeRange: string) => {
    switch (timeRange) {
      case '7d': return 'previous 7 days'
      case '90d': return 'previous 90 days'
      default: return 'previous 30 days'
    }
  }

  // ✅ CONFIRMED VIABLE: Overview metrics from Prisma
  const overviewStats = [
    {
      name: "Total Communities",
      value: overview.totalCommunities.current,
      trend: { 
        value: Math.abs(overview.totalCommunities.change), 
        isPositive: overview.totalCommunities.isPositive,
        label: `from ${getTimePeriodLabel(timeRange)}`
      },
      icon: "Users"
    },
    {
      name: "Total Members",
      value: overview.totalMembers.current,
      trend: { 
        value: Math.abs(overview.totalMembers.change), 
        isPositive: overview.totalMembers.isPositive,
        label: `from ${getTimePeriodLabel(timeRange)}`
      },
      icon: "UserPlus"
    },
    {
      name: "Total Events",
      value: overview.totalEvents.current,
      trend: { 
        value: Math.abs(overview.totalEvents.change), 
        isPositive: overview.totalEvents.isPositive,
        label: `from ${getTimePeriodLabel(timeRange)}`
      },
      icon: "Calendar"
    },
    {
      name: "Active Communities",
      value: `${overview.activeCommunities.percentage.toFixed(1)}%`,
      trend: { 
        value: overview.activeCommunities.current, 
        isPositive: true,
        label: `${overview.activeCommunities.current} communities`
      },
      icon: "Activity"
    }
  ]

  // ✅ CONFIRMED VIABLE: Referral success data
  const referralData = [
    { name: 'Successful', value: overview.referralSuccessRate.successful, color: '#10b981' },
    { name: 'Failed', value: overview.referralSuccessRate.total - overview.referralSuccessRate.successful, color: '#ef4444' }
  ]

  return (
    <div className="space-y-6">
      {/* Data Source Indicator */}
      <Card className="bg-blue-500/10 border-blue-500/30 text-blue-400">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="text-sm font-medium">
              Data Source: {analytics.dataSource.toUpperCase()} Database
            </span>
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              ✅ Confirmed Viable
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Communities Analytics</h2>
          <p className="text-neutral-400">Comprehensive overview of all community data and metrics</p>
        </div>
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option.value)}
              className={timeRange === option.value 
                ? "bg-purple-600 hover:bg-purple-700" 
                : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* ✅ CONFIRMED VIABLE: Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <OverviewCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            trend={{
              value: stat.trend.value,
              isPositive: stat.trend.isPositive,
              label: stat.trend.label,
              showAsPercentage: false
            }}
            iconName={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ✅ CONFIRMED VIABLE: Community Growth Chart */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Community Growth
            </CardTitle>
            <CardDescription className="text-neutral-400">
              New members joining communities over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis 
                  dataKey="date" 
                  stroke="#a3a3a3" 
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#a3a3a3" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#262626",
                    border: "1px solid #404040",
                    borderRadius: "8px",
                    color: "#ffffff"
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="newMembers" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="New Members"
                />
                <Area 
                  type="monotone" 
                  dataKey="activeCommunities" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3}
                  name="Active Communities"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ✅ CONFIRMED VIABLE: Referral Success Rate */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Target className="mr-2 h-5 w-5 text-purple-400" />
              Referral Success Rate
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Success rate of community referrals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-white">
                  {overview.referralSuccessRate.rate.toFixed(1)}%
                </div>
                <div className="text-sm text-neutral-400">
                  {overview.referralSuccessRate.successful} of {overview.referralSuccessRate.total} referrals
                </div>
              </div>
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={referralData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {referralData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-neutral-300">Successful</span>
                </div>
                <span className="text-white font-medium">{overview.referralSuccessRate.successful}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-neutral-300">Failed</span>
                </div>
                <span className="text-white font-medium">
                  {overview.referralSuccessRate.total - overview.referralSuccessRate.successful}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ CONFIRMED VIABLE: Top Growing Communities */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Crown className="mr-2 h-5 w-5 text-yellow-400" />
            Top Growing Communities
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Communities with the highest growth scores based on new members and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGrowingCommunities.slice(0, 5).map((community, index) => (
              <div key={community.id} className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/30 border border-neutral-700/30 hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-purple-400">#{index + 1}</span>
                    {index < 3 && <Crown className="h-4 w-4 text-yellow-400" />}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={community.avatar} alt={community.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                      {community.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{community.name}</div>
                    <div className="text-sm text-neutral-400">
                      {community.memberCount.toLocaleString()} total members
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-neutral-400">New Members</div>
                    <div className="font-semibold text-green-400">+{community.newMembers}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-400">New Events</div>
                    <div className="font-semibold text-blue-400">+{community.newEvents}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-neutral-400">Growth Score</div>
                    <div className="font-bold text-purple-400">
                      {Math.round(community.growthScore).toLocaleString()}
                    </div>
                  </div>
                  <Link href={`/dashboard/communities?id=${community.id}`}>
                    <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {topGrowingCommunities.length > 5 && (
            <div className="mt-6 text-center">
              <Link href="/dashboard/leaderboard">
                <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700">
                  View Full Leaderboard
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/30 border-neutral-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics Summary</h3>
              <p className="text-neutral-400 text-sm">
                All metrics are calculated from confirmed data sources using Prisma database queries.
                Growth percentages compare current period to previous period of same duration.
              </p>
            </div>
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              ✅ 40% Coverage Implemented
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 