"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, TrendingUp, MessageSquare, Calendar, Users } from "lucide-react"

const topContributors = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    community: "Tech Innovators",
    posts: 156,
    comments: 423,
    events: 12,
    shares: 89,
    score: 2840,
    trend: 15.2,
    badge: "Super Contributor",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    community: "Design Community",
    posts: 134,
    comments: 387,
    events: 8,
    shares: 76,
    score: 2650,
    trend: 12.8,
    badge: "Community Leader",
  },
  {
    id: 3,
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    community: "Marketing Pros",
    posts: 142,
    comments: 356,
    events: 15,
    shares: 92,
    score: 2580,
    trend: 18.7,
    badge: "Event Master",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    community: "Startup Founders",
    posts: 98,
    comments: 298,
    events: 6,
    shares: 54,
    score: 1980,
    trend: 8.3,
    badge: "Rising Star",
  },
  {
    id: 5,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    community: "Data Scientists",
    posts: 87,
    comments: 267,
    events: 9,
    shares: 43,
    score: 1850,
    trend: 22.1,
    badge: "Knowledge Sharer",
  },
]

const communityStats = [
  {
    name: "Tech Innovators",
    members: 1245,
    posts: 2840,
    events: 24,
    engagement: 87.3,
    growth: 12.3,
    color: "#8b5cf6",
  },
  {
    name: "Design Community",
    members: 876,
    posts: 1950,
    events: 18,
    engagement: 82.1,
    growth: 8.7,
    color: "#3b82f6",
  },
  {
    name: "Marketing Pros",
    members: 567,
    posts: 1420,
    events: 15,
    engagement: 78.9,
    growth: 15.2,
    color: "#10b981",
  },
  {
    name: "Startup Founders",
    members: 432,
    posts: 980,
    events: 12,
    engagement: 75.4,
    growth: 6.8,
    color: "#f59e0b",
  },
  {
    name: "Data Scientists",
    members: 321,
    posts: 750,
    events: 9,
    engagement: 71.2,
    growth: 22.1,
    color: "#ef4444",
  },
]

export function CommunityLeaderboard() {
  const [sortBy, setSortBy] = useState("score")
  const [timeframe, setTimeframe] = useState("30d")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Super Contributor":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Community Leader":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Event Master":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Rising Star":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "Knowledge Sharer":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Contributors */}
      <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Contributors
              </CardTitle>
              <CardDescription>Most active community members by engagement score</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Total Score</SelectItem>
                  <SelectItem value="posts">Posts Created</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                </SelectContent>
              </Select>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] sm:w-[60px]">Rank</TableHead>
                  <TableHead>Contributor</TableHead>
                  <TableHead className="hidden lg:table-cell">Community</TableHead>
                  <TableHead className="text-center">
                    <MessageSquare className="h-4 w-4 mx-auto" />
                  </TableHead>
                  <TableHead className="text-center hidden md:table-cell">
                    <MessageSquare className="h-4 w-4 mx-auto" />
                  </TableHead>
                  <TableHead className="text-center hidden lg:table-cell">
                    <Calendar className="h-4 w-4 mx-auto" />
                  </TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topContributors.map((contributor, index) => (
                  <TableRow key={contributor.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="text-center">{getRankIcon(index + 1)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {contributor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{contributor.name}</div>
                          <Badge className={`${getBadgeColor(contributor.badge)} text-xs mt-1`} variant="outline">
                            {contributor.badge}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{contributor.community}</span>
                    </TableCell>
                    <TableCell className="text-center font-medium">{contributor.posts}</TableCell>
                    <TableCell className="text-center font-medium hidden md:table-cell">
                      {contributor.comments}
                    </TableCell>
                    <TableCell className="text-center font-medium hidden lg:table-cell">{contributor.events}</TableCell>
                    <TableCell className="text-center">
                      <span className="font-bold text-purple-600 text-sm">{contributor.score.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-600">+{contributor.trend}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Community Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Community Performance
          </CardTitle>
          <CardDescription>Compare engagement and growth across communities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityStats.map((community, index) => (
              <div
                key={community.name}
                className="p-3 sm:p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: community.color }}
                    />
                    <span className="font-medium text-sm sm:text-base">{community.name}</span>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${community.growth > 10 ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20" : community.growth > 5 ? "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20" : "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20"}`}
                  >
                    +{community.growth}% growth
                  </Badge>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-purple-600">
                      {community.members.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-blue-600">
                      {community.posts.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-green-600">{community.events}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-amber-600">{community.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
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
