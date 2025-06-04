"use client"

import { useState } from "react"
import { Calendar, Clock, Mail, Send, Star, Users, Building, ChevronDown, Filter, Download, Edit, Trash2, Eye, Plus, Settings, Crown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/ui/page-header"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Community {
  id: string
  name: string
  creator: string
  creatorEmail: string
  members: number
  description: string
  createdDate: string
  healthScore: number
  tier: "free" | "premium"
}

interface ScheduledReport {
  id: string
  communityId: string
  communityName: string
  creatorEmail: string
  frequency: "daily" | "weekly" | "monthly"
  day?: string
  time: string
  reportType: "free" | "premium" | "both"
  status: "active" | "paused"
  nextSend: string
  lastSent?: string
  totalSent: number
}

const communities: Community[] = [
  {
    id: "tech-innovators",
    name: "Tech Innovators",
    creator: "Sarah Chen",
    creatorEmail: "sarah.chen@example.com",
    members: 1245,
    description: "Hub for technology enthusiasts and innovators",
    createdDate: "2024-01-15",
    healthScore: 87,
    tier: "premium"
  },
  {
    id: "design-community",
    name: "Design Community", 
    creator: "Alex Rodriguez",
    creatorEmail: "alex.rodriguez@example.com",
    members: 876,
    description: "Creative professionals sharing design insights",
    createdDate: "2024-02-03",
    healthScore: 76,
    tier: "premium"
  },
  {
    id: "marketing-pros",
    name: "Marketing Pros",
    creator: "Emma Johnson", 
    creatorEmail: "emma.johnson@example.com",
    members: 567,
    description: "Marketing strategies and growth hacking",
    createdDate: "2024-03-10",
    healthScore: 65,
    tier: "free"
  },
  {
    id: "startup-founders",
    name: "Startup Founders",
    creator: "Michael Park",
    creatorEmail: "michael.park@example.com", 
    members: 432,
    description: "Entrepreneurship and startup journey",
    createdDate: "2024-01-28",
    healthScore: 82,
    tier: "premium"
  },
  {
    id: "data-scientists",
    name: "Data Scientists",
    creator: "Dr. Lisa Wang",
    creatorEmail: "lisa.wang@example.com",
    members: 321,
    description: "Data analysis and machine learning",
    createdDate: "2024-02-14", 
    healthScore: 79,
    tier: "free"
  },
  {
    id: "tech-innovators-local",
    name: "Tech Innovators",
    creator: "John Smith",
    creatorEmail: "john.smith@example.com",
    members: 89,
    description: "Local tech meetup group",
    createdDate: "2024-03-22",
    healthScore: 45,
    tier: "free"
  },
]

const mockScheduledReports: ScheduledReport[] = [
  {
    id: "1",
    communityId: "tech-innovators",
    communityName: "Tech Innovators",
    creatorEmail: "sarah.chen@example.com",
    frequency: "weekly",
    day: "monday",
    time: "09:00",
    reportType: "premium",
    status: "active",
    nextSend: "2024-06-17",
    lastSent: "2024-06-10",
    totalSent: 12
  },
  {
    id: "2", 
    communityId: "design-community",
    communityName: "Design Community",
    creatorEmail: "alex.rodriguez@example.com",
    frequency: "monthly",
    day: "1",
    time: "10:00",
    reportType: "both",
    status: "active",
    nextSend: "2024-07-01",
    lastSent: "2024-06-01",
    totalSent: 6
  },
  {
    id: "3",
    communityId: "marketing-pros", 
    communityName: "Marketing Pros",
    creatorEmail: "emma.johnson@example.com",
    frequency: "weekly",
    day: "friday",
    time: "14:00",
    reportType: "free",
    status: "paused",
    nextSend: "2024-06-21",
    lastSent: "2024-06-07",
    totalSent: 8
  },
]

const freeMetrics = [
  "Basic member count",
  "Member activity overview", 
  "Event attendance summary",
  "Profile completion rate",
  "Community health score",
  "Monthly growth rate"
]

const premiumMetrics = [
  "Advanced engagement analytics",
  "Member segment breakdown", 
  "Detailed event ROI analysis",
  "User retention patterns",
  "Behavioral insights",
  "Growth opportunity recommendations",
  "Comparative community analysis",
  "Predictive analytics",
  "Custom metric tracking",
  "Export capabilities"
]

export default function EmailReportsPage() {
  const [selectedCommunity, setSelectedCommunity] = useState("")
  const [reportType, setReportType] = useState<"free" | "premium" | "both">("free")
  const [frequency, setFrequency] = useState("weekly")
  const [day, setDay] = useState("")
  const [time, setTime] = useState("09:00")
  const [isLoading, setIsLoading] = useState(false)
  const [scheduledReports, setScheduledReports] = useState(mockScheduledReports)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleSendNow = () => {
    if (!selectedCommunity) {
      toast({
        title: "Missing information",
        description: "Please select a community",
        variant: "destructive",
      })
      return
    }

    const community = communities.find(c => c.id === selectedCommunity)
    if (!community) return

    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Report sent",
        description: `The ${reportType} report for ${community.name} has been sent to ${community.creatorEmail}.`,
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleSchedule = () => {
    if (!selectedCommunity || !frequency || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const community = communities.find(c => c.id === selectedCommunity)
    if (!community) return

    setIsLoading(true)
    
    const newReport: ScheduledReport = {
      id: (scheduledReports.length + 1).toString(),
      communityId: selectedCommunity,
      communityName: community.name,
      creatorEmail: community.creatorEmail,
      frequency,
      day: frequency === "weekly" ? day : frequency === "monthly" ? day : undefined,
      time,
      reportType,
      status: "active",
      nextSend: getNextSendDate(frequency, day, time),
      totalSent: 0
    }

    setTimeout(() => {
      setScheduledReports(prev => [newReport, ...prev])
      toast({
        title: "Report scheduled",
        description: `The ${frequency} ${reportType} report for ${community.name} has been scheduled.`,
      })
      setIsLoading(false)
      
      // Reset form
      setSelectedCommunity("")
      setDay("")
      setTime("09:00")
    }, 1500)
  }

  const getNextSendDate = (freq: string, selectedDay: string, selectedTime: string): string => {
    const now = new Date()
    let nextSend = new Date()

    if (freq === "daily") {
      nextSend.setDate(now.getDate() + 1)
    } else if (freq === "weekly") {
      const dayMapping: { [key: string]: number } = {
        sunday: 0, monday: 1, tuesday: 2, wednesday: 3, 
        thursday: 4, friday: 5, saturday: 6
      }
      const targetDay = dayMapping[selectedDay.toLowerCase()]
      const daysUntilTarget = (targetDay - now.getDay() + 7) % 7 || 7
      nextSend.setDate(now.getDate() + daysUntilTarget)
    } else {
      nextSend.setMonth(now.getMonth() + 1, parseInt(selectedDay))
    }

    return nextSend.toISOString().split('T')[0]
  }

  const toggleReportStatus = (reportId: string) => {
    setScheduledReports(prev => 
      prev.map(report => 
        report.id === reportId 
          ? { ...report, status: report.status === "active" ? "paused" : "active" }
          : report
      )
    )
  }

  const deleteReport = (reportId: string) => {
    setScheduledReports(prev => prev.filter(report => report.id !== reportId))
    toast({
      title: "Report deleted",
      description: "The scheduled report has been removed.",
    })
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const getTierBadge = (tier: string) => {
    return tier === "premium" 
      ? <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30"><Crown className="h-3 w-3 mr-1" />Premium</Badge>
      : <Badge className="bg-neutral-500/20 text-neutral-400 border-neutral-500/30">Free</Badge>
  }

  const filteredReports = scheduledReports.filter(report =>
    report.communityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.creatorEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <PageHeader 
          title="Email Reports"
          description="Configure and schedule automated email reports for community creators with free and premium analytics"
        />

        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-neutral-800/50 border border-neutral-700/50">
            <TabsTrigger value="send" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Send Now</TabsTrigger>
            <TabsTrigger value="schedule" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Schedule</TabsTrigger>
            <TabsTrigger value="manage" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Send className="mr-2 h-5 w-5 text-purple-400" />
                    Send Report Now
                  </CardTitle>
                  <CardDescription className="text-neutral-400">Generate and send a one-time report to the community creator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="community-select" className="text-neutral-300">Select Community</Label>
                    <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                      <SelectTrigger id="community-select" className="bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Select a community" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        {communities.map((community) => (
                          <SelectItem key={community.id} value={community.id} className="text-neutral-300 hover:bg-neutral-700">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="font-medium">{community.name}</div>
                                  <div className="text-xs text-neutral-400">{community.creator} • {community.creatorEmail}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {getTierBadge(community.tier)}
                                <span className={cn("text-xs font-medium", getHealthScoreColor(community.healthScore))}>
                                  {community.healthScore}%
                                </span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedCommunity && (
                      <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                        {(() => {
                          const community = communities.find(c => c.id === selectedCommunity)
                          if (!community) return null
                          return (
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-white">{community.name}</div>
                                <div className="text-xs text-neutral-400">
                                  Report will be sent to: {community.creatorEmail}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">
                                  {community.members.toLocaleString()} members • Health Score: {community.healthScore}%
                                </div>
                              </div>
                              {getTierBadge(community.tier)}
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-neutral-300">Report Type</Label>
                    <Select value={reportType} onValueChange={(value: "free" | "premium" | "both") => setReportType(value)}>
                      <SelectTrigger className="bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="free" className="text-neutral-300 hover:bg-neutral-700">Free Analytics Report</SelectItem>
                        <SelectItem value="premium" className="text-neutral-300 hover:bg-neutral-700">
                          <div className="flex items-center gap-2">
                            <Crown className="h-4 w-4 text-purple-400" />
                            Premium Analytics Report
                          </div>
                        </SelectItem>
                        <SelectItem value="both" className="text-neutral-300 hover:bg-neutral-700">Both Reports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button 
                    onClick={handleSendNow} 
                    disabled={isLoading || !selectedCommunity} 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isLoading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Report Now
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Report Types & Metrics</CardTitle>
                  <CardDescription className="text-neutral-400">Compare what's included in each report tier</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-300 mb-3">Free Analytics Report</h4>
                    <div className="space-y-1">
                      {freeMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-neutral-400">
                          <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-purple-400 mb-3 flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Premium Analytics Report
                    </h4>
                    <div className="space-y-1">
                      {premiumMetrics.slice(0, 6).map((metric, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-neutral-400">
                          <div className="w-1 h-1 bg-purple-400 rounded-full" />
                          {metric}
                        </div>
                      ))}
                      <div className="text-xs text-neutral-500 mt-2">+ {premiumMetrics.length - 6} more advanced features</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                  Schedule Recurring Reports
                </CardTitle>
                <CardDescription className="text-neutral-400">Configure automated reports to be sent to community creators on a regular schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="community-select-schedule" className="text-neutral-300">Select Community</Label>
                    <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                      <SelectTrigger id="community-select-schedule" className="bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Select a community" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        {communities.map((community) => (
                          <SelectItem key={community.id} value={community.id} className="text-neutral-300 hover:bg-neutral-700">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <div className="font-medium">{community.name}</div>
                                <div className="text-xs text-neutral-400">{community.creator}</div>
                              </div>
                              {getTierBadge(community.tier)}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="text-neutral-300">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency" className="bg-neutral-800 border-neutral-600 text-neutral-300">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600">
                        <SelectItem value="daily" className="text-neutral-300 hover:bg-neutral-700">Daily</SelectItem>
                        <SelectItem value="weekly" className="text-neutral-300 hover:bg-neutral-700">Weekly</SelectItem>
                        <SelectItem value="monthly" className="text-neutral-300 hover:bg-neutral-700">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {frequency !== "daily" && (
                    <div className="space-y-2">
                      <Label htmlFor="day" className="text-neutral-300">
                        {frequency === "weekly" ? "Day of Week" : "Day of Month"}
                      </Label>
                      <Select value={day} onValueChange={setDay}>
                        <SelectTrigger id="day" className="bg-neutral-800 border-neutral-600 text-neutral-300">
                          <SelectValue placeholder={frequency === "weekly" ? "Select day" : "Select date"} />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-600">
                          {frequency === "weekly" ? (
                            <>
                              <SelectItem value="monday" className="text-neutral-300 hover:bg-neutral-700">Monday</SelectItem>
                              <SelectItem value="tuesday" className="text-neutral-300 hover:bg-neutral-700">Tuesday</SelectItem>
                              <SelectItem value="wednesday" className="text-neutral-300 hover:bg-neutral-700">Wednesday</SelectItem>
                              <SelectItem value="thursday" className="text-neutral-300 hover:bg-neutral-700">Thursday</SelectItem>
                              <SelectItem value="friday" className="text-neutral-300 hover:bg-neutral-700">Friday</SelectItem>
                              <SelectItem value="saturday" className="text-neutral-300 hover:bg-neutral-700">Saturday</SelectItem>
                              <SelectItem value="sunday" className="text-neutral-300 hover:bg-neutral-700">Sunday</SelectItem>
                            </>
                          ) : (
                            Array.from({ length: 28 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()} className="text-neutral-300 hover:bg-neutral-700">
                                {i + 1}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-neutral-300">Time</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-neutral-400" />
                      <Input 
                        id="time" 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-neutral-800 border-neutral-600 text-neutral-300" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-neutral-300">Report Type</Label>
                  <Select value={reportType} onValueChange={(value: "free" | "premium" | "both") => setReportType(value)}>
                    <SelectTrigger className="bg-neutral-800 border-neutral-600 text-neutral-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="free" className="text-neutral-300 hover:bg-neutral-700">Free Analytics Report</SelectItem>
                      <SelectItem value="premium" className="text-neutral-300 hover:bg-neutral-700">
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-purple-400" />
                          Premium Analytics Report
                        </div>
                      </SelectItem>
                      <SelectItem value="both" className="text-neutral-300 hover:bg-neutral-700">Both Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedCommunity && (
                  <div className="p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    {(() => {
                      const community = communities.find(c => c.id === selectedCommunity)
                      if (!community) return null
                      return (
                        <div>
                          <div className="text-sm font-medium text-white mb-1">Report Destination</div>
                          <div className="text-xs text-neutral-400">
                            Reports will be sent to <span className="text-purple-400">{community.creatorEmail}</span>
                          </div>
                          <div className="text-xs text-neutral-500 mt-2">
                            Creator: {community.creator} • {community.members.toLocaleString()} members
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </CardContent>
              <div className="p-6 pt-0">
                <Button 
                  onClick={handleSchedule} 
                  disabled={isLoading || !selectedCommunity || (frequency !== "daily" && !day)} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isLoading ? (
                    <>Scheduling...</>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Reports
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            <Card className="bg-neutral-900 border-neutral-700/50 shadow-xl">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-purple-400" />
                      Scheduled Reports
                    </CardTitle>
                    <CardDescription className="text-neutral-400">View and manage your scheduled email reports</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 w-full sm:w-auto">
                      <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full sm:w-[250px] bg-neutral-800 border-neutral-600 text-neutral-300 placeholder:text-neutral-500"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-neutral-400 mb-4">
                  Showing {filteredReports.length} of {scheduledReports.length} scheduled reports
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-700 hover:bg-neutral-800/50">
                        <TableHead className="text-neutral-300">Community</TableHead>
                        <TableHead className="text-neutral-300">Creator</TableHead>
                        <TableHead className="text-neutral-300">Schedule</TableHead>
                        <TableHead className="text-neutral-300">Report Type</TableHead>
                        <TableHead className="text-neutral-300">Status</TableHead>
                        <TableHead className="text-neutral-300">Next Send</TableHead>
                        <TableHead className="text-neutral-300">Stats</TableHead>
                        <TableHead className="w-[50px] text-neutral-300"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id} className="border-neutral-700 hover:bg-neutral-800/30 text-neutral-300">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Building className="h-4 w-4 text-purple-400" />
                              <div>
                                <div className="font-medium text-sm text-white">{report.communityName}</div>
                                <div className="text-xs text-neutral-400">ID: {report.communityId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-neutral-700 text-neutral-300 text-xs">
                                  {report.creatorEmail.split('@')[0].slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm text-neutral-300">{report.creatorEmail}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm text-white capitalize">{report.frequency}</div>
                              <div className="text-xs text-neutral-400">
                                {report.day && `${report.day} • `}{report.time}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {report.reportType === "premium" && <Crown className="h-3 w-3 text-purple-400" />}
                              <span className="text-sm capitalize">{report.reportType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={report.status === "active" 
                                ? "bg-green-500/20 text-green-400 border-green-500/20" 
                                : "bg-amber-500/20 text-amber-400 border-amber-500/20"
                              }
                              variant="outline"
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm text-white">{report.nextSend}</div>
                              {report.lastSent && (
                                <div className="text-xs text-neutral-400">Last: {report.lastSent}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-neutral-300">
                              {report.totalSent} sent
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300">
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-600">
                                <DropdownMenuLabel className="text-neutral-300">Actions</DropdownMenuLabel>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-neutral-300 hover:bg-neutral-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-neutral-300 hover:bg-neutral-700"
                                  onClick={() => toggleReportStatus(report.id)}
                                >
                                  {report.status === "active" ? "Pause" : "Resume"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-neutral-600" />
                                <DropdownMenuItem 
                                  className="text-red-400 hover:bg-red-900/20"
                                  onClick={() => deleteReport(report.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredReports.length === 0 && (
                  <div className="text-center py-8">
                    <Mail className="mx-auto h-12 w-12 text-neutral-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No scheduled reports</h3>
                    <p className="text-neutral-400 mb-4">Create your first scheduled report to get started.</p>
                    <Button 
                      onClick={() => document.querySelector('[value="schedule"]')?.click()}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
