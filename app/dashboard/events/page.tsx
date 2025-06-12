"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, TrendingUp, Download, Mail, MoreHorizontal, Search, Filter, Eye, MessageSquare, Ban, Edit3, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OverviewCard } from "@/components/dashboard/platform/overview-card"
import { EventsChart } from "@/components/dashboard/events/events-chart"
import { EventParticipationChart } from "@/components/dashboard/events/event-participation-chart"
import { EventTrendsAnalysis } from "@/components/dashboard/events/event-trends-analysis"
import { EventPopularityMetrics } from "@/components/dashboard/events/event-popularity-metrics"
import { EventTimeSlotAnalysis } from "@/components/dashboard/events/event-timeslot-analysis"
import { EventROIAnalysis } from "@/components/dashboard/events/event-roi-analysis"
import { PageHeader } from "@/components/ui/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  community: string
  organizer: string
  date: string
  time: string
  type: "networking" | "workshop" | "social" | "conference"
  rsvps: number
  attended: number
  capacity: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  location: string
  description: string
  rating?: number
  cost?: number
  revenue?: number
  sponsoredBy?: string[]
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    community: "Tech Innovators",
    organizer: "Sarah Chen",
    date: "2024-06-15",
    time: "14:00",
    type: "conference",
    rsvps: 245,
    attended: 198,
    capacity: 300,
    status: "completed",
    location: "San Francisco Convention Center",
    description: "Annual tech summit featuring latest innovations",
    rating: 4.8,
    cost: 5000,
    revenue: 12000,
    sponsoredBy: ["TechCorp", "InnovateLabs"]
  },
  {
    id: "2",
    title: "Design Thinking Workshop",
    community: "Design Community",
    organizer: "Mike Rodriguez",
    date: "2024-06-20",
    time: "10:00",
    type: "workshop",
    rsvps: 89,
    attended: 0,
    capacity: 100,
    status: "upcoming",
    location: "Creative Hub Downtown",
    description: "Interactive workshop on design thinking methodologies",
    cost: 800,
    revenue: 0
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    community: "Startup Founders",
    organizer: "Emily Davis",
    date: "2024-06-18",
    time: "18:00",
    type: "networking",
    rsvps: 156,
    attended: 142,
    capacity: 200,
    status: "completed",
    location: "Innovation District",
    description: "Network with fellow entrepreneurs and investors",
    rating: 4.2,
    cost: 1200,
    revenue: 3400
  },
  {
    id: "4",
    title: "AI & Machine Learning Conference",
    community: "AI Researchers",
    organizer: "David Kim",
    date: "2024-06-25",
    time: "09:00",
    type: "conference",
    rsvps: 312,
    attended: 0,
    capacity: 400,
    status: "upcoming",
    location: "Tech University Auditorium",
    description: "Latest advances in AI and machine learning",
    cost: 6500,
    revenue: 0,
    sponsoredBy: ["AI Solutions", "DataTech"]
  },
  {
    id: "5",
    title: "Community Social Gathering",
    community: "General Community",
    organizer: "Alex Johnson",
    date: "2024-06-22",
    time: "16:00",
    type: "social",
    rsvps: 78,
    attended: 72,
    capacity: 120,
    status: "completed",
    location: "Central Park Pavilion",
    description: "Casual social gathering for community members",
    rating: 4.5,
    cost: 300,
    revenue: 0
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.community.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case "date":
        aValue = new Date(a.date + " " + a.time)
        bValue = new Date(b.date + " " + b.time)
        break
      case "rsvps":
        aValue = a.rsvps
        bValue = b.rsvps
        break
      case "attendance":
        aValue = a.attended / a.rsvps
        bValue = b.attended / b.rsvps
        break
      case "title":
        aValue = a.title
        bValue = b.title
        break
      case "capacity":
        aValue = a.capacity
        bValue = b.capacity
        break
      default:
        aValue = a.title
        bValue = b.title
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/20"
      case "ongoing":
        return "bg-green-500/20 text-green-400 border-green-500/20"
      case "completed":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/20"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "networking":
        return "bg-purple-500/20 text-purple-400 border-purple-500/20"
      case "workshop":
        return "bg-amber-500/20 text-amber-400 border-amber-500/20"
      case "social":
        return "bg-pink-500/20 text-pink-400 border-pink-500/20"
      case "conference":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/20"
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/20"
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Title", "Community", "Organizer", "Date", "Time", "Type", "Location", 
      "RSVPs", "Attended", "Capacity", "Attendance Rate", "Rating", "Status"
    ]
    const csvContent = [
      headers.join(","),
      ...filteredEvents.map((event) =>
        [
          event.title,
          event.community,
          event.organizer,
          event.date,
          event.time,
          event.type,
          event.location,
          event.rsvps,
          event.attended,
          event.capacity,
          event.status === "completed" ? `${Math.round((event.attended / event.rsvps) * 100)}%` : "N/A",
          event.rating || "N/A",
          event.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "events_export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate metrics
  const totalEvents = 1247
  const thisMonthEvents = 84
  const totalParticipants = 23456
  const avgAttendanceRate = 78.3

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <PageHeader 
          title="Events & Activities"
          description="Comprehensive event management and analytics dashboard"
        />

        {/* Enhanced Overview Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Events"
            value={totalEvents.toLocaleString()}
            description="All-time events created"
            iconName="Calendar"
            trend={{ value: 18.2, isPositive: true }}
            accentColor="purple"
          />
          <OverviewCard
            title="This Month"
            value={thisMonthEvents.toString()}
            description="Events this month"
            iconName="Clock"
            trend={{ value: 12.5, isPositive: true }}
            accentColor="blue"
          />
          <OverviewCard
            title="Total Participants"
            value={totalParticipants.toLocaleString()}
            description="Event participants"
            iconName="Users"
            trend={{ value: 8.7, isPositive: true }}
            accentColor="green"
          />
          <OverviewCard
            title="Attendance Rate"
            value={`${avgAttendanceRate}%`}
            description="RSVP to attendance"
            iconName="TrendingUp"
            trend={{ value: 3.2, isPositive: true }}
            accentColor="teal"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-neutral-800/50 border border-neutral-700/50">
            <TabsTrigger value="overview" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Overview</TabsTrigger>
            <TabsTrigger value="events" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Event Management</TabsTrigger>
            <TabsTrigger value="analytics" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Analytics</TabsTrigger>
            <TabsTrigger value="trends" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Trends</TabsTrigger>
            <TabsTrigger value="roi" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">ROI Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <EventsChart />
              <EventParticipationChart />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <EventPopularityMetrics />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4 sm:space-y-6">
            <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Filter className="mr-2 h-5 w-5 text-purple-400" />
                      Event Management
                    </CardTitle>
                    <CardDescription className="text-neutral-400">View and manage all platform events with advanced filtering</CardDescription>
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
                        placeholder="Search events, communities, organizers..."
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
                          <SelectItem value="date" className="text-neutral-300 hover:bg-neutral-700">Date</SelectItem>
                          <SelectItem value="title" className="text-neutral-300 hover:bg-neutral-700">Title</SelectItem>
                          <SelectItem value="rsvps" className="text-neutral-300 hover:bg-neutral-700">RSVPs</SelectItem>
                          <SelectItem value="attendance" className="text-neutral-300 hover:bg-neutral-700">Attendance Rate</SelectItem>
                          <SelectItem value="capacity" className="text-neutral-300 hover:bg-neutral-700">Capacity</SelectItem>
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
                        <SelectItem value="upcoming" className="text-neutral-300 hover:bg-neutral-700">Upcoming</SelectItem>
                        <SelectItem value="ongoing" className="text-neutral-300 hover:bg-neutral-700">Ongoing</SelectItem>
                        <SelectItem value="completed" className="text-neutral-300 hover:bg-neutral-700">Completed</SelectItem>
                        <SelectItem value="cancelled" className="text-neutral-300 hover:bg-neutral-700">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[130px] bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="all" className="text-neutral-300 hover:bg-neutral-700">All Types</SelectItem>
                        <SelectItem value="networking" className="text-neutral-300 hover:bg-neutral-700">Networking</SelectItem>
                        <SelectItem value="workshop" className="text-neutral-300 hover:bg-neutral-700">Workshop</SelectItem>
                        <SelectItem value="social" className="text-neutral-300 hover:bg-neutral-700">Social</SelectItem>
                        <SelectItem value="conference" className="text-neutral-300 hover:bg-neutral-700">Conference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="text-sm text-neutral-400 mb-4">
                  Showing {filteredEvents.length} of {mockEvents.length} events
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-700 hover:bg-neutral-800/50">
                        <TableHead className="text-neutral-300">Event</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">Organizer</TableHead>
                        <TableHead className="text-neutral-300">Date & Time</TableHead>
                        <TableHead className="hidden md:table-cell text-neutral-300">Type</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">RSVPs</TableHead>
                        <TableHead className="hidden sm:table-cell text-neutral-300">Attended</TableHead>
                        <TableHead className="hidden md:table-cell text-neutral-300">Rating</TableHead>
                        <TableHead className="text-neutral-300">Status</TableHead>
                        <TableHead className="w-[50px] text-neutral-300"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id} className="border-neutral-700 hover:bg-neutral-800/30 text-neutral-300">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium text-sm text-white">{event.title}</div>
                                <div className="text-xs text-neutral-400">{event.community}</div>
                                <div className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                                <AvatarFallback className="bg-neutral-700 text-neutral-300 text-xs">
                                  {event.organizer.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-neutral-300">{event.organizer}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm text-white">{event.date}</div>
                              <div className="text-xs text-neutral-400">{event.time}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={getTypeColor(event.type)} variant="outline">
                              {event.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="text-sm font-medium text-neutral-300">
                              {event.rsvps}
                            </div>
                            <div className="text-xs text-neutral-500">
                              /{event.capacity}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div>
                              <div className="font-medium text-sm text-neutral-300">{event.attended}</div>
                              {event.status === "completed" && (
                                <div className="text-xs text-neutral-400">
                                  {Math.round((event.attended / event.rsvps) * 100)}% rate
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {event.rating ? (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-400 fill-current" />
                                <span className="text-sm text-neutral-300">{event.rating}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-neutral-500">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(event.status)} variant="outline">
                              {event.status}
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
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Users className="mr-2 h-4 w-4" />
                                  View Participants
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-600" />
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Edit Event
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Export Data
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-600" />
                                <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                  <Ban className="mr-2 h-4 w-4" />
                                  Cancel Event
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
              <EventsChart />
              <EventParticipationChart />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <EventTimeSlotAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <EventTrendsAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1">
              <EventROIAnalysis />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
