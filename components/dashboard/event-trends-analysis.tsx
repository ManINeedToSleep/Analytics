"use client"

import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Calendar, BarChart3, Activity } from "lucide-react"

const monthlyTrends = [
  { month: "Jan", events: 45, participants: 1820, avgRating: 4.2, revenue: 34500 },
  { month: "Feb", events: 52, participants: 2134, avgRating: 4.3, revenue: 41200 },
  { month: "Mar", events: 61, participants: 2567, avgRating: 4.4, revenue: 48900 },
  { month: "Apr", events: 68, participants: 2891, avgRating: 4.5, revenue: 55600 },
  { month: "May", events: 74, participants: 3245, avgRating: 4.6, revenue: 62300 },
  { month: "Jun", events: 84, participants: 3678, avgRating: 4.7, revenue: 71200 },
]

const seasonalData = [
  { season: "Spring", events: 203, avgAttendance: 78.4, topType: "Workshop" },
  { season: "Summer", events: 189, avgAttendance: 82.1, topType: "Social" },
  { season: "Fall", events: 267, avgAttendance: 79.8, topType: "Conference" },
  { season: "Winter", events: 156, avgAttendance: 75.2, topType: "Networking" },
]

const growthMetrics = [
  { metric: "Event Creation", currentMonth: 84, previousMonth: 74, growth: 13.5 },
  { metric: "Total Participants", currentMonth: 3678, previousMonth: 3245, growth: 13.3 },
  { metric: "Average Rating", currentMonth: 4.7, previousMonth: 4.6, growth: 2.2 },
  { metric: "Revenue", currentMonth: 71200, previousMonth: 62300, growth: 14.3 },
]

const eventTypeGrowth = [
  { type: "Conference", q1: 45, q2: 67, growth: 48.9 },
  { type: "Workshop", q1: 38, q2: 52, growth: 36.8 },
  { type: "Networking", q1: 29, q2: 41, growth: 41.4 },
  { type: "Social", q1: 22, q2: 28, growth: 27.3 },
]

export function EventTrendsAnalysis() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
          Event Trends Analysis
        </CardTitle>
        <CardDescription className="text-neutral-400">Comprehensive analysis of event trends, growth patterns, and seasonal data</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800/50 border border-neutral-700/50">
            <TabsTrigger value="monthly" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Monthly Trends</TabsTrigger>
            <TabsTrigger value="seasonal" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Seasonal</TabsTrigger>
            <TabsTrigger value="growth" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Growth Metrics</TabsTrigger>
            <TabsTrigger value="types" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Type Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                Monthly Performance Trends
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                  <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                    formatter={(value: number, name: string) => [
                      name === "revenue" ? `$${value.toLocaleString()}` : value.toLocaleString(),
                      name === "events" ? "Events" : 
                      name === "participants" ? "Participants" : 
                      name === "avgRating" ? "Avg Rating" : "Revenue"
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#8b5cf6", strokeWidth: 2, fill: "#e9d5ff" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#3b82f6", strokeWidth: 2, fill: "#dbeafe" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="grid gap-4 md:grid-cols-4 mt-6">
                {monthlyTrends[monthlyTrends.length - 1] && (
                  <>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <h4 className="text-sm font-medium text-white mb-2">Current Month Events</h4>
                      <div className="text-2xl font-bold text-purple-400">{monthlyTrends[monthlyTrends.length - 1].events}</div>
                      <p className="text-xs text-neutral-400">+13.5% vs previous month</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <h4 className="text-sm font-medium text-white mb-2">Participants</h4>
                      <div className="text-2xl font-bold text-blue-400">{monthlyTrends[monthlyTrends.length - 1].participants.toLocaleString()}</div>
                      <p className="text-xs text-neutral-400">+13.3% vs previous month</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <h4 className="text-sm font-medium text-white mb-2">Average Rating</h4>
                      <div className="text-2xl font-bold text-green-400">{monthlyTrends[monthlyTrends.length - 1].avgRating}</div>
                      <p className="text-xs text-neutral-400">+2.2% vs previous month</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <h4 className="text-sm font-medium text-white mb-2">Revenue</h4>
                      <div className="text-2xl font-bold text-amber-400">${monthlyTrends[monthlyTrends.length - 1].revenue.toLocaleString()}</div>
                      <p className="text-xs text-neutral-400">+14.3% vs previous month</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Seasonal Performance Patterns</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                    <XAxis dataKey="season" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                      formatter={(value: number, name: string) => [value, name === "events" ? "Events" : "Avg Attendance %"]}
                    />
                    <Bar dataKey="events" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-white">Seasonal Insights</h4>
                  {seasonalData.map((season) => (
                    <div key={season.season} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div>
                        <span className="text-neutral-300 font-medium">{season.season}</span>
                        <div className="text-xs text-neutral-400">Most popular: {season.topType}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{season.events} events</div>
                        <div className="text-xs text-neutral-400">{season.avgAttendance}% attendance</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-green-400" />
                Growth Metrics Overview
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {growthMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-white">{metric.metric}</h4>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        metric.growth > 0 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {metric.growth > 0 ? "+" : ""}{metric.growth}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-neutral-400">Current: </span>
                        <span className="text-white font-medium">
                          {metric.metric === "Revenue" ? `$${metric.currentMonth.toLocaleString()}` : metric.currentMonth.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400">Previous: </span>
                        <span className="text-neutral-300">
                          {metric.metric === "Revenue" ? `$${metric.previousMonth.toLocaleString()}` : metric.previousMonth.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-green-400 mb-2">Growth Highlights</h4>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>• Revenue growth outpacing event creation (+14.3% vs +13.5%)</li>
                  <li>• Consistent participant growth maintaining quality (13.3% more participants)</li>
                  <li>• Event quality improving with higher average ratings (+2.2%)</li>
                  <li>• Strong month-over-month momentum across all metrics</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="types" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-amber-400" />
                Event Type Growth Trends
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eventTypeGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                  <XAxis dataKey="type" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                    formatter={(value: number, name: string) => [value, name === "q1" ? "Q1 Events" : "Q2 Events"]}
                  />
                  <Bar dataKey="q1" fill="#64748b" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="q2" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid gap-3 md:grid-cols-2 mt-6">
                {eventTypeGrowth.map((type) => (
                  <div key={type.type} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <div>
                      <span className="text-neutral-300 font-medium">{type.type}</span>
                      <div className="text-xs text-neutral-400">Q1: {type.q1} → Q2: {type.q2}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      type.growth > 40 
                        ? "bg-green-500/20 text-green-400" 
                        : type.growth > 30 
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}>
                      +{type.growth}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 