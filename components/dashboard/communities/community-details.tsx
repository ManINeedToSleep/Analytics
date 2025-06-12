"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  MapPin,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Shield,
  Crown,
  Activity,
  Tag,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { CommunityDetailsData } from "@/lib/analytics-service"

interface CommunityDetailsProps {
  communityId: string
}

export function CommunityDetails({ communityId }: CommunityDetailsProps) {
  const [community, setCommunity] = useState<CommunityDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [membersCurrentPage, setMembersCurrentPage] = useState(1)
  const membersPerPage = 5

  useEffect(() => {
    async function fetchCommunityDetails() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/analytics/community-details?id=${communityId}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Community not found')
          }
          throw new Error('Failed to fetch community details')
        }
        
        const data = await response.json()
        setCommunity(data)
      } catch (err) {
        console.error('Failed to fetch community details:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Fallback to mock data
        setCommunity({
          id: communityId,
          name: "Tech Innovators Hub",
          description: "A vibrant community of technology enthusiasts, entrepreneurs, and innovators sharing knowledge, building connections, and shaping the future of technology.",
          avatar: "/api/placeholder/100/100",
          memberCount: 15420,
          eventsCreated: 89,
          engagement: 94.2,
          growth: 23.1,
          category: "Technology",
          verified: true,
          tags: ["AI", "Machine Learning", "Web Development", "Startup", "Innovation"],
          creator: {
            id: "creator1",
            name: "Sarah Chen",
            avatar: "/api/placeholder/32/32"
          },
          recentActivity: [
            { date: "Dec 15", members: 12, events: 3, posts: 45 },
            { date: "Dec 16", members: 18, events: 2, posts: 67 },
            { date: "Dec 17", members: 23, events: 4, posts: 89 },
            { date: "Dec 18", members: 15, events: 1, posts: 34 },
            { date: "Dec 19", members: 28, events: 5, posts: 123 },
            { date: "Dec 20", members: 19, events: 2, posts: 78 },
            { date: "Dec 21", members: 31, events: 3, posts: 156 }
          ],
          topMembers: [
            { id: "1", name: "Alex Rodriguez", avatar: "/api/placeholder/32/32", role: "Moderator", contributions: 234 },
            { id: "2", name: "Sarah Chen", avatar: "/api/placeholder/32/32", role: "Active Member", contributions: 189 },
            { id: "3", name: "Michael Johnson", avatar: "/api/placeholder/32/32", role: "Event Organizer", contributions: 156 },
            { id: "4", name: "Emma Davis", avatar: "/api/placeholder/32/32", role: "Content Creator", contributions: 143 },
            { id: "5", name: "David Kim", avatar: "/api/placeholder/32/32", role: "Community Helper", contributions: 128 },
            { id: "6", name: "Lisa Wang", avatar: "/api/placeholder/32/32", role: "Tech Lead", contributions: 115 },
            { id: "7", name: "James Wilson", avatar: "/api/placeholder/32/32", role: "Mentor", contributions: 98 },
            { id: "8", name: "Maria Garcia", avatar: "/api/placeholder/32/32", role: "Designer", contributions: 87 },
            { id: "9", name: "Robert Brown", avatar: "/api/placeholder/32/32", role: "Developer", contributions: 76 },
            { id: "10", name: "Jennifer Lee", avatar: "/api/placeholder/32/32", role: "Product Manager", contributions: 65 },
            { id: "11", name: "Kevin Zhang", avatar: "/api/placeholder/32/32", role: "Data Scientist", contributions: 54 },
            { id: "12", name: "Amanda Taylor", avatar: "/api/placeholder/32/32", role: "Marketing Lead", contributions: 43 }
          ],
          popularTags: [
            { name: "AI", count: 45, trend: 12.3 },
            { name: "Machine Learning", count: 38, trend: 8.7 },
            { name: "Web Development", count: 32, trend: 15.2 },
            { name: "Startup", count: 28, trend: 22.1 },
            { name: "Innovation", count: 24, trend: 5.8 }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityDetails()
  }, [communityId])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <div className="text-neutral-400">Loading community details...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error && !community) {
    return (
      <div className="space-y-6">
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <div className="text-red-400 mb-2">Error loading community</div>
              <div className="text-neutral-400">{error}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="space-y-6">
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardContent className="p-6">
            <div className="text-center py-12">
              <div className="text-neutral-400">Community not found</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const communityStats = [
    { 
      name: "Total Members", 
      value: community.memberCount, 
      trend: { value: Math.abs(community.growth), isPositive: community.growth > 0 }, 
      icon: "Users" 
    },
    { 
      name: "Events Created", 
      value: community.eventsCreated, 
      trend: { value: 15.2, isPositive: true }, 
      icon: "Calendar" 
    },
    { 
      name: "Popular Tags", 
      value: community.popularTags.length, 
      trend: { value: 8.7, isPositive: true }, 
      icon: "Tag" 
    },
    { 
      name: "Engagement", 
      value: `${community.engagement.toFixed(1)}%`, 
      trend: { value: 12.3, isPositive: true }, 
      icon: "Activity" 
    }
  ]

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {error && (
        <Card className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Using fallback data - {error}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Header */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl overflow-hidden">
        {/* Enhanced Header Background */}
        <div className="h-40 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/20"></div>
            <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-white/10"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border border-white/15"></div>
          </div>
        </div>
        
        <CardContent className="p-8 -mt-20 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
            {/* Enhanced Avatar Section */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <Avatar className="w-32 h-32 border-4 border-neutral-900 shadow-2xl">
                <AvatarImage src={community.avatar} alt={community.name} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-3xl font-bold">
                  {community.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Enhanced Content Section */}
            <div className="flex-1 min-w-0">
              {/* Title and Badges Row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center flex-wrap gap-3 mb-3 sm:mb-0">
                  <h1 className="text-3xl font-bold text-white truncate">{community.name}</h1>
                  {community.verified && (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                      <Shield className="mr-1 h-4 w-4" />
                      Verified
                    </Badge>
                  )}
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1 w-fit">
                  {community.category}
                </Badge>
              </div>

              {/* Description */}
              {community.description && (
                <p className="text-neutral-300 mb-6 max-w-4xl leading-relaxed text-base">
                  {community.description}
                </p>
              )}
              
              {/* Enhanced Creator Information */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-neutral-800/50 to-neutral-700/30 border border-neutral-700/50">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 border-2 border-neutral-600">
                    <AvatarImage src={community.creator.avatar} alt={community.creator.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                      {community.creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-neutral-400 font-medium">Created by</div>
                    <div className="text-lg font-semibold text-white">{community.creator.name}</div>
                  </div>
                  <div className="ml-auto">
                    <Crown className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400">Members</div>
                    <div className="text-xl font-bold text-white">{community.memberCount.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Calendar className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400">Events</div>
                    <div className="text-xl font-bold text-white">{community.eventsCreated}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400">Engagement</div>
                    <div className="text-xl font-bold text-white">{community.engagement.toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Tags Section */}
              {community.tags.length > 0 && (
                <div className="border-t border-neutral-700/50 pt-6">
                  <div className="flex items-center mb-3">
                    <Tag className="h-4 w-4 text-neutral-400 mr-2" />
                    <span className="text-sm font-medium text-neutral-400">Popular Topics</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.slice(0, 8).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-neutral-800/60 border-neutral-600/50 text-neutral-300 hover:bg-neutral-700/60 transition-colors px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {community.tags.length > 8 && (
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 px-3 py-1"
                      >
                        +{community.tags.length - 8} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {communityStats.map((stat) => (
          <OverviewCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            trend={stat.trend}
            iconName={stat.icon}
          />
        ))}
      </div>

      {/* Community Growth Chart */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
            Community Growth
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Member growth over the last week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[
              { date: "Dec 15", members: community.memberCount - 150 },
              { date: "Dec 16", members: community.memberCount - 120 },
              { date: "Dec 17", members: community.memberCount - 95 },
              { date: "Dec 18", members: community.memberCount - 70 },
              { date: "Dec 19", members: community.memberCount - 40 },
              { date: "Dec 20", members: community.memberCount - 15 },
              { date: "Dec 21", members: community.memberCount }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis dataKey="date" stroke="#a3a3a3" fontSize={12} />
              <YAxis stroke="#a3a3a3" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#262626",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                  color: "#ffffff"
                }}
              />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#8b5cf6",
                  stroke: "#8b5cf6", 
                  strokeWidth: 2,
                }}
                activeDot={{ 
                  r: 6, 
                  stroke: "#8b5cf6", 
                  strokeWidth: 2, 
                  fill: "#e9d5ff"
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Weekly activity breakdown for the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={community.recentActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis dataKey="date" stroke="#a3a3a3" fontSize={12} />
                <YAxis stroke="#a3a3a3" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#262626",
                    border: "1px solid #404040",
                    borderRadius: "8px",
                    color: "#ffffff"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="members" 
                  stackId="1"
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="events" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="posts" 
                  stackId="1"
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Tags */}
        <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Tag className="mr-2 h-5 w-5 text-purple-400" />
              Popular Tags
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Most used tags in this community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {community.popularTags.slice(0, 5).map((tag, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-neutral-300">{tag.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-neutral-400">{tag.count} uses</span>
                    {tag.trend > 0 && (
                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                        +{tag.trend.toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Members */}
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-400" />
            Top Contributing Members
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Most active and influential community members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {community.topMembers.slice((membersCurrentPage - 1) * membersPerPage, membersCurrentPage * membersPerPage).map((member, index) => (
              <div key={`${member.id}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-sm text-neutral-400">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-400">{member.contributions} contributions</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {community.topMembers.length > membersPerPage && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-neutral-400">
                Showing {((membersCurrentPage - 1) * membersPerPage) + 1} to {Math.min(membersCurrentPage * membersPerPage, community.topMembers.length)} of {community.topMembers.length} members
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={membersCurrentPage === 1}
                  onClick={() => setMembersCurrentPage(membersCurrentPage - 1)}
                  className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={membersCurrentPage * membersPerPage >= community.topMembers.length}
                  onClick={() => setMembersCurrentPage(membersCurrentPage + 1)}
                  className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 