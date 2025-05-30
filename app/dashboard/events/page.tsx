"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, TrendingUp, Download, Mail, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
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
import { OverviewCard } from "@/components/dashboard/overview-card"
import { EventsChart } from "@/components/dashboard/events-chart"
import { EventParticipationChart } from "@/components/dashboard/event-participation-chart"

interface Event {
  id: string
  title: string
  community: string
  date: string
  time: string
  type: "networking" | "workshop" | "social" | "conference"
  rsvps: number
  attended: number
  capacity: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit",
    community: "Tech Innovators",
    date: "2024-06-15",
    time: "14:00",
    type: "conference",
    rsvps: 245,
    attended: 198,
    capacity: 300,
    status: "completed",
  },
  {
    id: "2",
    title: "Design Thinking Workshop",
    community: "Design Community",
    date: "2024-06-20",
    time: "10:00",
    type: "workshop",
    rsvps: 89,
    attended: 0,
    capacity: 100,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    community: "Startup Founders",
    date: "2024-06-18",
    time: "18:00",
    type: "networking",
    rsvps: 156,
    attended: 142,
    capacity: 200,
    status: "completed",
  },
]

export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "networking":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "workshop":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "social":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      case "conference":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const exportToCSV = () => {
    const headers = ["Title", "Community", "Date", "Type", "RSVPs", "Attended", "Capacity", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredEvents.map((event) =>
        [
          event.title,
          event.community,
          event.date,
          event.type,
          event.rsvps,
          event.attended,
          event.capacity,
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

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Events & Activities</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Monitor and analyze event performance across all communities</p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Events"
            value="1,247"
            description="All-time events created"
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: 18.2, isPositive: true }}
          />
          <OverviewCard
            title="This Month"
            value="84"
            description="Events this month"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <OverviewCard
            title="Total Participants"
            value="23,456"
            description="Event participants"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 8.7, isPositive: true }}
          />
          <OverviewCard
            title="Attendance Rate"
            value="78.3%"
            description="RSVP to attendance"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 3.2, isPositive: true }}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Event Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
              <EventsChart />
              <EventParticipationChart />
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>View and manage all platform events</CardDescription>
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead className="hidden sm:table-cell">Community</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden sm:table-cell">RSVPs</TableHead>
                        <TableHead className="hidden sm:table-cell">Attended</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{event.title}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                Capacity: {event.capacity}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{event.community}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm">{event.date}</div>
                              <div className="text-xs text-muted-foreground">{event.time}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge className={getTypeColor(event.type)} variant="outline">
                              {event.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{event.rsvps}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div>
                              <div className="font-medium text-sm">{event.attended}</div>
                              {event.status === "completed" && (
                                <div className="text-xs text-muted-foreground">
                                  {Math.round((event.attended / event.rsvps) * 100)}% attendance
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(event.status)} variant="outline">
                              {event.status}
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
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>View Participants</DropdownMenuItem>
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
              <EventsChart />
              <EventParticipationChart />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
