"use client"

import { useState } from "react"
import { Search, Download, Mail, MoreHorizontal, UserCheck, UserX, Filter, Eye, MessageSquare, Ban, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserProfileChart } from "@/components/dashboard/users/user-profile-chart"
import { UserEngagementMetrics } from "@/components/dashboard/users/user-engagement-metrics"
import { UserDemographics } from "@/components/dashboard/users/user-demographics"
import { UserActivityHeatmap } from "@/components/dashboard/users/user-activity-heatmap"
import { UserRetentionMetrics } from "@/components/dashboard/users/user-retention-metrics"
import { UserSegmentAnalysis } from "@/components/dashboard/users/user-segment-analysis"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { PageHeader } from "@/components/ui/page-header"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  profileCompleted: boolean
  accountActivated: boolean
  communitiesJoined: number
  eventsAttended: number
  lastActive: string
  joinDate: string
  profileType: "manual" | "scanned" | "incomplete"
  status: "active" | "inactive" | "dormant"
  location?: string
  ageGroup?: string
  accountTier?: "free" | "premium" | "enterprise"
  totalEngagementScore?: number
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    profileCompleted: true,
    accountActivated: true,
    communitiesJoined: 3,
    eventsAttended: 12,
    lastActive: "2 hours ago",
    joinDate: "2024-01-15",
    profileType: "manual",
    status: "active",
    location: "San Francisco, CA",
    ageGroup: "25-34",
    accountTier: "premium",
    totalEngagementScore: 89,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    profileCompleted: true,
    accountActivated: true,
    communitiesJoined: 5,
    eventsAttended: 8,
    lastActive: "1 day ago",
    joinDate: "2024-02-03",
    profileType: "scanned",
    status: "active",
    location: "New York, NY",
    ageGroup: "35-44",
    accountTier: "enterprise",
    totalEngagementScore: 92,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    email: "mike@example.com",
    profileCompleted: false,
    accountActivated: true,
    communitiesJoined: 1,
    eventsAttended: 2,
    lastActive: "5 days ago",
    joinDate: "2024-03-10",
    profileType: "incomplete",
    status: "inactive",
    location: "Austin, TX",
    ageGroup: "18-24",
    accountTier: "free",
    totalEngagementScore: 34,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    profileCompleted: true,
    accountActivated: true,
    communitiesJoined: 7,
    eventsAttended: 25,
    lastActive: "30 minutes ago",
    joinDate: "2023-11-20",
    profileType: "manual",
    status: "active",
    location: "Seattle, WA",
    ageGroup: "25-34",
    accountTier: "premium",
    totalEngagementScore: 95,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    profileCompleted: true,
    accountActivated: false,
    communitiesJoined: 0,
    eventsAttended: 0,
    lastActive: "2 weeks ago",
    joinDate: "2024-03-20",
    profileType: "scanned",
    status: "dormant",
    location: "Los Angeles, CA",
    ageGroup: "45-54",
    accountTier: "free",
    totalEngagementScore: 12,
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [profileFilter, setProfileFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesProfile = profileFilter === "all" || user.profileType === profileFilter
    const matchesTier = tierFilter === "all" || user.accountTier === tierFilter

    return matchesSearch && matchesStatus && matchesProfile && matchesTier
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case "name":
        aValue = a.name
        bValue = b.name
        break
      case "joinDate":
        aValue = new Date(a.joinDate)
        bValue = new Date(b.joinDate)
        break
      case "lastActive":
        // Simple text comparison for demo - in real app would parse dates
        aValue = a.lastActive
        bValue = b.lastActive
        break
      case "engagement":
        aValue = a.totalEngagementScore || 0
        bValue = b.totalEngagementScore || 0
        break
      case "communities":
        aValue = a.communitiesJoined
        bValue = b.communitiesJoined
        break
      default:
        aValue = a.name
        bValue = b.name
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/20"
      case "inactive":
        return "bg-amber-500/20 text-amber-400 border-amber-500/20"
      case "dormant":
        return "bg-red-500/20 text-red-400 border-red-500/20"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
    }
  }

  const getProfileTypeColor = (type: string) => {
    switch (type) {
      case "manual":
        return "bg-blue-500/20 text-blue-400 border-blue-500/20"
      case "scanned":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20"
      case "incomplete":
        return "bg-orange-500/20 text-orange-400 border-orange-500/20"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
      case "premium":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20"
      case "enterprise":
        return "bg-amber-500/20 text-amber-400 border-amber-500/20"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Profile Completed",
      "Account Activated",
      "Communities",
      "Events",
      "Status",
      "Account Tier",
      "Location",
      "Age Group",
      "Engagement Score",
      "Join Date",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map((user) =>
        [
          user.name,
          user.email,
          user.profileCompleted ? "Yes" : "No",
          user.accountActivated ? "Yes" : "No",
          user.communitiesJoined,
          user.eventsAttended,
          user.status,
          user.accountTier || "free",
          user.location || "",
          user.ageGroup || "",
          user.totalEngagementScore || 0,
          user.joinDate,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users_export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate real-time statistics
  const totalUsers = 45231
  const activeUsers = 32891
  const newUsersLast30Days = 3247
  const profileCompletionRate = 72.7

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <PageHeader 
          title="Users & Profiles"
          description="Comprehensive user management and analytics dashboard"
        />

        {/* Enhanced Overview Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            description="All registered platform users"
            iconName="Users"
            trend={{ value: 12.5, isPositive: true }}
            accentColor="purple"
          />
          <OverviewCard
            title="New Users (30d)"
            value={newUsersLast30Days.toLocaleString()}
            description="Recent registrations this month"
            iconName="UserPlus"
            trend={{ value: 8.3, isPositive: true }}
            accentColor="blue"
          />
          <OverviewCard
            title="Active Users"
            value={activeUsers.toLocaleString()}
            description="Active in last 30 days"
            iconName="Activity"
            trend={{ value: 5.2, isPositive: true }}
            accentColor="green"
          />
          <OverviewCard
            title="Profile Completion"
            value={`${profileCompletionRate}%`}
            description="Users with completed profiles"
            iconName="UserCheck"
            trend={{ value: 3.1, isPositive: true }}
            accentColor="teal"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-neutral-800/50 border border-neutral-700/50">
            <TabsTrigger value="overview" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Overview</TabsTrigger>
            <TabsTrigger value="users" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">User Management</TabsTrigger>
            <TabsTrigger value="analytics" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Analytics</TabsTrigger>
            <TabsTrigger value="demographics" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Demographics</TabsTrigger>
            <TabsTrigger value="retention" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <UserProfileChart />
              <UserEngagementMetrics />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <UserActivityHeatmap />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4 sm:space-y-6">
            <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Filter className="mr-2 h-5 w-5 text-purple-400" />
                      User Management
                    </CardTitle>
                    <CardDescription className="text-neutral-400">View and manage all platform users with advanced filtering</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={exportToCSV} variant="outline" size="sm" className="bg-neutral-800 border-neutral-600 text-neutral-300 hover:bg-neutral-700">
                      <Download className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Export CSV</span>
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-800 border-neutral-600 text-neutral-300 hover:bg-neutral-700">
                      <Mail className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Send Report</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Enhanced Search and Filters */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full sm:max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search users, emails, or locations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-neutral-800 border-neutral-600 text-neutral-300 placeholder:text-neutral-500"
                      />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-[140px] bg-neutral-800 border-neutral-600 text-neutral-300">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-600">
                          <SelectItem value="name" className="text-neutral-300 hover:bg-neutral-700">Name</SelectItem>
                          <SelectItem value="joinDate" className="text-neutral-300 hover:bg-neutral-700">Join Date</SelectItem>
                          <SelectItem value="lastActive" className="text-neutral-300 hover:bg-neutral-700">Last Active</SelectItem>
                          <SelectItem value="engagement" className="text-neutral-300 hover:bg-neutral-700">Engagement</SelectItem>
                          <SelectItem value="communities" className="text-neutral-300 hover:bg-neutral-700">Communities</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="bg-neutral-800 border-neutral-600 text-neutral-300 hover:bg-neutral-700"
                      >
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px] bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="all" className="text-neutral-300 hover:bg-neutral-700">All Status</SelectItem>
                        <SelectItem value="active" className="text-neutral-300 hover:bg-neutral-700">Active</SelectItem>
                        <SelectItem value="inactive" className="text-neutral-300 hover:bg-neutral-700">Inactive</SelectItem>
                        <SelectItem value="dormant" className="text-neutral-300 hover:bg-neutral-700">Dormant</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={profileFilter} onValueChange={setProfileFilter}>
                      <SelectTrigger className="w-[140px] bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Profile Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="all" className="text-neutral-300 hover:bg-neutral-700">All Types</SelectItem>
                        <SelectItem value="manual" className="text-neutral-300 hover:bg-neutral-700">Manual</SelectItem>
                        <SelectItem value="scanned" className="text-neutral-300 hover:bg-neutral-700">Scanned</SelectItem>
                        <SelectItem value="incomplete" className="text-neutral-300 hover:bg-neutral-700">Incomplete</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={tierFilter} onValueChange={setTierFilter}>
                      <SelectTrigger className="w-[130px] bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Account Tier" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="all" className="text-neutral-300 hover:bg-neutral-700">All Tiers</SelectItem>
                        <SelectItem value="free" className="text-neutral-300 hover:bg-neutral-700">Free</SelectItem>
                        <SelectItem value="premium" className="text-neutral-300 hover:bg-neutral-700">Premium</SelectItem>
                        <SelectItem value="enterprise" className="text-neutral-300 hover:bg-neutral-700">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-sm text-neutral-400 mb-4">
                  Showing {filteredUsers.length} of {mockUsers.length} users
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-700 hover:bg-neutral-800/50">
                        <TableHead className="text-neutral-300">User</TableHead>
                        <TableHead className="text-neutral-300">Profile Status</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">Account Tier</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">Communities</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">Events</TableHead>
                        <TableHead className="hidden md:table-cell text-neutral-300">Engagement</TableHead>
                        <TableHead className="hidden md:table-cell text-neutral-300">Last Active</TableHead>
                        <TableHead className="text-neutral-300">Status</TableHead>
                        <TableHead className="w-[50px] text-neutral-300"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-neutral-700 hover:bg-neutral-800/30 text-neutral-300">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback className="bg-neutral-700 text-neutral-300">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm text-white">{user.name}</div>
                                <div className="text-xs text-neutral-400 hidden sm:block">{user.email}</div>
                                {user.location && (
                                  <div className="text-xs text-neutral-500 hidden lg:block">{user.location}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={getProfileTypeColor(user.profileType)} variant="outline">
                                {user.profileType}
                              </Badge>
                              {user.profileCompleted ? (
                                <UserCheck className="h-4 w-4 text-green-400" />
                              ) : (
                                <UserX className="h-4 w-4 text-red-400" />
                              )}
                            </div>
                            {user.ageGroup && (
                              <div className="text-xs text-neutral-500 mt-1">{user.ageGroup}</div>
                            )}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className={getTierColor(user.accountTier || "free")} variant="outline">
                              {user.accountTier || "free"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-neutral-300">{user.communitiesJoined}</TableCell>
                          <TableCell className="hidden sm:table-cell text-neutral-300">{user.eventsAttended}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium text-neutral-300">
                                {user.totalEngagementScore || 0}
                              </div>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                (user.totalEngagementScore || 0) >= 80 ? "bg-green-400" :
                                (user.totalEngagementScore || 0) >= 60 ? "bg-amber-400" :
                                "bg-red-400"
                              )} />
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-neutral-400">{user.lastActive}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)} variant="outline">
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-600">
                                <DropdownMenuLabel className="text-neutral-300">Actions</DropdownMenuLabel>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-600" />
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Export Data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Shield className="mr-2 h-4 w-4" />
                                  Moderate User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-600" />
                                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend Account
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <UserProfileChart />
              <UserEngagementMetrics />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <UserSegmentAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <UserDemographics />
            </div>
          </TabsContent>

          <TabsContent value="retention" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <UserRetentionMetrics />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
