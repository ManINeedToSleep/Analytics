"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { OverviewCard } from "@/components/dashboard/overview-card"
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
  Tag
} from "lucide-react"
import { CommunityDetailsData } from "@/lib/analytics-service"

interface CommunityDetailsProps {
  communityId: string
}

export function CommunityDetails({ communityId }: CommunityDetailsProps) {
  const [community, setCommunity] = useState<CommunityDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
            { id: "5", name: "David Kim", avatar: "/api/placeholder/32/32", role: "Community Helper", contributions: 128 }
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
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <CardContent className="p-6 -mt-16 relative">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            <Avatar className="w-24 h-24 border-4 border-neutral-900">
              <AvatarImage src={community.avatar} alt={community.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
                {community.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="mt-4 md:mt-0 flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{community.name}</h1>
                {community.verified && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Shield className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {community.category}
                </Badge>
              </div>
              {community.description && (
                <p className="text-neutral-400 mb-4 max-w-2xl">{community.description}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-neutral-300">
                  <Users className="mr-2 h-4 w-4 text-purple-400" />
                  {community.memberCount.toLocaleString()} members
                </div>
                <div className="flex items-center text-neutral-300">
                  <Calendar className="mr-2 h-4 w-4 text-green-400" />
                  {community.eventsCreated} events
                </div>
                <div className="flex items-center text-neutral-300">
                  <Activity className="mr-2 h-4 w-4 text-blue-400" />
                  {community.engagement.toFixed(1)}% engagement
                </div>
              </div>

              {/* Tags */}
              {community.tags.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {community.tags.slice(0, 6).map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-neutral-800 border-neutral-600 text-neutral-300">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                    {community.tags.length > 6 && (
                      <Badge variant="outline" className="bg-neutral-800 border-neutral-600 text-neutral-400">
                        +{community.tags.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Button>
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
            {community.topMembers.map((member, index) => (
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
        </CardContent>
      </Card>
    </div>
  )
} 