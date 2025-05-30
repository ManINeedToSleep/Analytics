"use client"

import { useState } from "react"
import { Calendar, Clock, Mail, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function EmailReportsPage() {
  const [selectedCommunity, setSelectedCommunity] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [recipients, setRecipients] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Report sent",
        description: `The report for ${selectedCommunity} has been sent successfully.`,
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleSchedule = () => {
    if (!selectedCommunity || !frequency || !recipients) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Report scheduled",
        description: `The ${frequency} report for ${selectedCommunity} has been scheduled.`,
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Email Reports</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Configure and schedule automated email reports for your communities</p>
        </div>

        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="send">Send Now</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="send" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Send Report Now</CardTitle>
                <CardDescription>Generate and send a one-time report to specified recipients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="community-select">Select Community</Label>
                  <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                    <SelectTrigger id="community-select">
                      <SelectValue placeholder="Select a community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech-innovators">Tech Innovators</SelectItem>
                      <SelectItem value="design-community">Design Community</SelectItem>
                      <SelectItem value="marketing-pros">Marketing Pros</SelectItem>
                      <SelectItem value="startup-founders">Startup Founders</SelectItem>
                      <SelectItem value="data-scientists">Data Scientists</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Input
                    id="recipients"
                    placeholder="email@example.com, email2@example.com"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple email addresses with commas</p>
                </div>
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-metrics" defaultChecked />
                      <label
                        htmlFor="free-metrics"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Free Metrics
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-metrics" />
                      <label
                        htmlFor="premium-metrics"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Premium Metrics
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSendNow} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Recurring Reports</CardTitle>
                <CardDescription>Configure automated reports to be sent on a regular schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="community-select-schedule">Select Community</Label>
                    <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                      <SelectTrigger id="community-select-schedule">
                        <SelectValue placeholder="Select a community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech-innovators">Tech Innovators</SelectItem>
                        <SelectItem value="design-community">Design Community</SelectItem>
                        <SelectItem value="marketing-pros">Marketing Pros</SelectItem>
                        <SelectItem value="startup-founders">Startup Founders</SelectItem>
                        <SelectItem value="data-scientists">Data Scientists</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day of Week/Month</Label>
                    <Select>
                      <SelectTrigger id="day">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input id="time" type="time" defaultValue="09:00" className="w-full" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipients-schedule">Recipients</Label>
                  <Input
                    id="recipients-schedule"
                    placeholder="email@example.com, email2@example.com"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple email addresses with commas</p>
                </div>
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-metrics-schedule" defaultChecked />
                      <label
                        htmlFor="free-metrics-schedule"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Free Metrics
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-metrics-schedule" />
                      <label
                        htmlFor="premium-metrics-schedule"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Premium Metrics
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSchedule} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                  {isLoading ? (
                    <>Scheduling...</>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Reports
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>View and manage your scheduled email reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium">Tech Innovators Weekly Report</p>
                    <p className="text-sm text-muted-foreground">Sent every Monday at 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t p-4 gap-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium">Design Community Monthly Report</p>
                    <p className="text-sm text-muted-foreground">Sent on the 1st of every month at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
