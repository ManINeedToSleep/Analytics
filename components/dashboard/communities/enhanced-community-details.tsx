"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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
  ResponsiveContainer
} from "recharts"
import { 
  Users, 
  Calendar, 
  TrendingUp,
  Activity,
  UserPlus,
  Target,
  Clock,
  ArrowUpRight,
  Loader2,
  Database,
  AlertCircle,
  UserCheck,
  UserX,
  Zap,
  Award
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface IndividualCommunityAnalytics {
  community: {
    id: string
    name: string
    avatar?: string
    memberCount: number
    about?: string
    createdAt: string
    creator: {
      profileName?: string
      avatar?: string
    }
  }
  analytics: {
    memberGrowth: Array<{
      date: string
      newMembers: number
    }>
    eventAnalytics: {
      totalEvents: number
      totalRSVPs: number
      totalAttending: number
      attendanceRate: number
      averageRSVPsPerEvent: number
    }
    memberSegments: {
      newMembers: { count: number; percentage: number }
      activeMembers: { count: number; percentage: number }
      eventParticipants: { count: number; percentage: number }
      dormantMembers: { count: number; percentage: number }
      totalMembers: number
    }
    retentionAnalysis: {
      day7Retention: number
      day30Retention: number
      churnRate: number
      cohortSizes: {
        day7: number
        day30: number
      }
    }
    referrals: {
      total: number
      successful: number
      successRate: number
    }
  }
  recentMembers: Array<{
    id: string
    name?: string
    avatar?: string
    joinDate: string
  }>
  dataSource: string
}

interface EnhancedCommunityDetailsProps {
  communityId: string
}

export function EnhancedCommunityDetails({ communityId }: EnhancedCommunityDetailsProps) {
  const [analytics, setAnalytics] = useState<IndividualCommunityAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/communities?communityId=${communityId}&timeRange=${timeRange}`)
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

    if (communityId) {
      fetchAnalytics()
    }
  }, [communityId, timeRange])

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

  const { community, analytics: communityAnalytics, recentMembers } = analytics

  // ✅ CONFIRMED VIABLE: Member segmentation data for pie chart
  const segmentData = [
    { name: 'New Members', value: communityAnalytics.memberSegments.newMembers.count, color: '#10b981', percentage: communityAnalytics.memberSegments.newMembers.percentage },
    { name: 'Active Members', value: communityAnalytics.memberSegments.activeMembers.count, color: '#3b82f6', percentage: communityAnalytics.memberSegments.activeMembers.percentage },
    { name: 'Event Participants', value: communityAnalytics.memberSegments.eventParticipants.count, color: '#8b5cf6', percentage: communityAnalytics.memberSegments.eventParticipants.percentage },
    { name: 'Dormant Members', value: communityAnalytics.memberSegments.dormantMembers.count, color: '#ef4444', percentage: communityAnalytics.memberSegments.dormantMembers.percentage }
  ]

  // ✅ CONFIRMED VIABLE: Retention data
  const retentionData = [
    { period: '7 Days', retention: communityAnalytics.retentionAnalysis.day7Retention, cohortSize: communityAnalytics.retentionAnalysis.cohortSizes.day7 },
    { period: '30 Days', retention: communityAnalytics.retentionAnalysis.day30Retention, cohortSize: communityAnalytics.retentionAnalysis.cohortSizes.day30 }
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

      {/* ✅ CONFIRMED VIABLE: Community Header */}
      <Card className="bg-gradient-to-r from-neutral-800 to-neutral-700 border-neutral-600/50 shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={community.avatar} alt={community.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl">
                {community.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{community.name}</h1>
              {community.about && (
                <p className="text-neutral-300 mb-4 max-w-2xl">{community.about}</p>
              )}
              <div className="flex items-center gap-6 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{community.memberCount.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Created {formatDistanceToNow(new Date(community.createdAt))} ago</span>
                </div>
                {community.creator.profileName && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Created by {community.creator.profileName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ✅ CONFIRMED VIABLE: Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Total Events</p>
                <p className="text-2xl font-bold text-white">{communityAnalytics.eventAnalytics.totalEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Attendance Rate</p>
                <p className="text-2xl font-bold text-white">{communityAnalytics.eventAnalytics.attendanceRate.toFixed(1)}%</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">30-Day Retention</p>
                <p className="text-2xl font-bold text-white">{communityAnalytics.retentionAnalysis.day30Retention.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 text-white border-neutral-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Referral Success</p>
                <p className="text-2xl font-bold text-white">{communityAnalytics.referrals.successRate.toFixed(1)}%</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ✅ CONFIRMED VIABLE: Member Growth Chart */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Member Growth
            </CardTitle>
            <CardDescription className="text-neutral-400">
              New members joining over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={communityAnalytics.memberGrowth}>
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
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ✅ CONFIRMED VIABLE: Member Segmentation */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-400" />
              Member Segmentation
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Breakdown of member types and activity levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 ml-6">
                <div className="space-y-3">
                  {segmentData.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                        <span className="text-sm text-neutral-300">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{segment.value}</div>
                        <div className="text-xs text-neutral-400">{segment.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ✅ CONFIRMED VIABLE: Retention Analysis */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Target className="mr-2 h-5 w-5 text-purple-400" />
              Retention Analysis
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Member retention rates over different time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {retentionData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-300">{data.period} Retention</span>
                    <span className="text-sm font-bold text-white">{data.retention.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={data.retention} 
                    className="h-2 bg-neutral-800"
                  />
                  <div className="text-xs text-neutral-400">
                    Cohort size: {data.cohortSize} members
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Churned Members</span>
                  <span className="text-sm font-medium text-red-400">
                    {communityAnalytics.retentionAnalysis.churnRate}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ✅ CONFIRMED VIABLE: Event Analytics */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-400" />
              Event Analytics
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Event participation and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-neutral-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{communityAnalytics.eventAnalytics.totalRSVPs}</div>
                  <div className="text-sm text-neutral-400">Total RSVPs</div>
                </div>
                <div className="text-center p-4 bg-neutral-800/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{communityAnalytics.eventAnalytics.totalAttending}</div>
                  <div className="text-sm text-neutral-400">Attending</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Attendance Rate</span>
                  <span className="text-sm font-bold text-white">{communityAnalytics.eventAnalytics.attendanceRate.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={communityAnalytics.eventAnalytics.attendanceRate} 
                  className="h-2 bg-neutral-800"
                />
              </div>
              <div className="p-3 bg-neutral-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300">Avg RSVPs per Event</span>
                  <span className="text-sm font-medium text-purple-400">
                    {communityAnalytics.eventAnalytics.averageRSVPsPerEvent.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ CONFIRMED VIABLE: Recent Members */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-green-400" />
            Recent Members
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Latest members who joined this community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMembers.length > 0 ? (
              recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/30 border border-neutral-700/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                        {member.name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{member.name || 'Anonymous'}</div>
                      <div className="text-sm text-neutral-400">
                        Joined {formatDistanceToNow(new Date(member.joinDate))} ago
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    New
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-400">
                No recent members found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/30 border-neutral-700/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Community Analytics Summary</h3>
              <p className="text-neutral-400 text-sm">
                All metrics are calculated from confirmed data sources using Prisma database queries.
                This represents the core analytics available for individual communities.
              </p>
            </div>
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              ✅ Individual Community Analytics
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 