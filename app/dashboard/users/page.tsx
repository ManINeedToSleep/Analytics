"use client"

import { useState } from "react"
import { Search, Download, Mail, MoreHorizontal, UserCheck, UserX } from 'lucide-react'
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
import { UserProfileChart } from "@/components/dashboard/user-profile-chart"
import { UserEngagementMetrics } from "@/components/dashboard/user-engagement-metrics"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { Users, UserPlus, Activity } from 'lucide-react'

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
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [profileFilter, setProfileFilter] = useState("all")

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesProfile = profileFilter === "all" || user.profileType === profileFilter

    return matchesSearch && matchesStatus && matchesProfile
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "dormant":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getProfileTypeColor = (type: string) => {
    switch (type) {
      case "manual":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "scanned":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "incomplete":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
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

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Users & Profiles</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage and analyze user profiles and engagement</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Users"
            value="45,231"
            description="Registered users"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <OverviewCard
            title="New Users (30d)"
            value="3,247"
            description="New registrations"
            icon={<UserPlus className="h-4 w-4" />}
            trend={{ value: 8.3, isPositive: true }}
          />
          <OverviewCard
            title="Active Users"
            value="32,891"
            description="Active in last 30 days"
            icon={<Activity className="h-4 w-4" />}
            trend={{ value: 5.2, isPositive: true }}
          />
          <OverviewCard
            title="Profile Completion"
            value="72.7%"
            description="Completed profiles"
            icon={<UserCheck className="h-4 w-4" />}
            trend={{ value: 3.1, isPositive: true }}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <UserProfileChart />
              <UserEngagementMetrics />
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all platform users</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={exportToCSV} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Export CSV</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Send Report</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  <div className="relative flex-1 w-full sm:max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="dormant">Dormant</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={profileFilter} onValueChange={setProfileFilter}>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Profile Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="scanned">Scanned</SelectItem>
                        <SelectItem value="incomplete">Incomplete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Profile Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Communities</TableHead>
                        <TableHead className="hidden sm:table-cell">Events</TableHead>
                        <TableHead className="hidden md:table-cell">Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{user.name}</div>
                                <div className="text-xs text-muted-foreground hidden sm:block">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={getProfileTypeColor(user.profileType)} variant="outline">
                                {user.profileType}
                              </Badge>
                              {user.profileCompleted ? (
                                <UserCheck className="h-4 w-4 text-green-500" />
                              ) : (
                                <UserX className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{user.communitiesJoined}</TableCell>
                          <TableCell className="hidden sm:table-cell">{user.eventsAttended}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs">{user.lastActive}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)} variant="outline">
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Export Data</DropdownMenuItem>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
