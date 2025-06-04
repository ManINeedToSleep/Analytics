"use client"

import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, TrendingDown, TrendingUp, Users } from "lucide-react"

const retentionData = [
  { cohort: "Jan 2024", day1: 85, day7: 72, day30: 58, day90: 42 },
  { cohort: "Feb 2024", day1: 88, day7: 75, day30: 61, day90: 45 },
  { cohort: "Mar 2024", day1: 91, day7: 78, day30: 64, day90: 48 },
  { cohort: "Apr 2024", day1: 89, day7: 76, day30: 62, day90: 46 },
  { cohort: "May 2024", day1: 92, day7: 80, day30: 66, day90: 0 }, // Current month, no 90-day data yet
  { cohort: "Jun 2024", day1: 94, day7: 82, day30: 0, day90: 0 }, // Current month, limited data
]

const weeklyRetentionTrend = [
  { week: "Week 1", retention: 82 },
  { week: "Week 2", retention: 78 },
  { week: "Week 3", retention: 75 },
  { week: "Week 4", retention: 73 },
  { week: "Week 5", retention: 71 },
  { week: "Week 6", retention: 69 },
  { week: "Week 7", retention: 68 },
  { week: "Week 8", retention: 66 },
]

const userLifecycleData = [
  { stage: "New Users", count: 3247, percentage: 7.2 },
  { stage: "Active Users", count: 28934, percentage: 64.0 },
  { stage: "At-Risk Users", count: 8342, percentage: 18.5 },
  { stage: "Dormant Users", count: 4708, percentage: 10.4 },
]

const retentionByFeature = [
  { feature: "Community Joined", retention30: 78, retention90: 54 },
  { feature: "Profile Completed", retention30: 72, retention90: 49 },
  { feature: "Event Attended", retention30: 85, retention90: 67 },
  { feature: "Profile Scanned", retention30: 81, retention90: 58 },
  { feature: "Message Sent", retention30: 89, retention90: 71 },
]

export function UserRetentionMetrics() {
  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="mr-2 h-5 w-5 text-purple-400" />
            User Retention Analysis
          </CardTitle>
          <CardDescription className="text-neutral-400">Comprehensive retention metrics and cohort analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cohorts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-neutral-800/50 border border-neutral-700/50">
              <TabsTrigger value="cohorts" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Cohort Analysis</TabsTrigger>
              <TabsTrigger value="trends" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Retention Trends</TabsTrigger>
              <TabsTrigger value="lifecycle" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">User Lifecycle</TabsTrigger>
              <TabsTrigger value="features" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Feature Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="cohorts" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  Cohort Retention Analysis
                </h3>
                
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-700">
                        <th className="text-left p-3 text-neutral-300">Cohort</th>
                        <th className="text-center p-3 text-neutral-300">Day 1</th>
                        <th className="text-center p-3 text-neutral-300">Day 7</th>
                        <th className="text-center p-3 text-neutral-300">Day 30</th>
                        <th className="text-center p-3 text-neutral-300">Day 90</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retentionData.map((cohort) => (
                        <tr key={cohort.cohort} className="border-b border-neutral-800 hover:bg-neutral-800/30">
                          <td className="p-3 text-white font-medium">{cohort.cohort}</td>
                          <td className="text-center p-3">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                              {cohort.day1}%
                            </span>
                          </td>
                          <td className="text-center p-3">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                              {cohort.day7}%
                            </span>
                          </td>
                          <td className="text-center p-3">
                            {cohort.day30 > 0 ? (
                              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">
                                {cohort.day30}%
                              </span>
                            ) : (
                              <span className="text-neutral-500">-</span>
                            )}
                          </td>
                          <td className="text-center p-3">
                            {cohort.day90 > 0 ? (
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                                {cohort.day90}%
                              </span>
                            ) : (
                              <span className="text-neutral-500">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Average 30-Day Retention</h4>
                    <div className="text-2xl font-bold text-amber-400">62%</div>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400">+3.2% vs last quarter</span>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Day 1 Retention</h4>
                    <div className="text-2xl font-bold text-green-400">90%</div>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400">+1.8% vs last month</span>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Day 90 Retention</h4>
                    <div className="text-2xl font-bold text-purple-400">46%</div>
                    <div className="flex items-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400">+2.1% vs last quarter</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Weekly Retention Trends</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={weeklyRetentionTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                    <XAxis dataKey="week" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} domain={[60, 85]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                      formatter={(value: number) => [`${value}%`, "Retention Rate"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="retention" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: "#8b5cf6", strokeWidth: 2, fill: "#e9d5ff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="lifecycle" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">User Lifecycle Distribution</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userLifecycleData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                      <XAxis dataKey="stage" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                        formatter={(value: number) => [`${value.toLocaleString()} users`, "Count"]}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-white">Lifecycle Breakdown</h4>
                    {userLifecycleData.map((item, index) => {
                      const colors = ["bg-green-500", "bg-blue-500", "bg-amber-500", "bg-red-500"]
                      return (
                        <div key={item.stage} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                            <span className="text-neutral-300">{item.stage}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{item.count.toLocaleString()}</div>
                            <div className="text-xs text-neutral-400">{item.percentage}%</div>
                          </div>
                        </div>
                      )
                    })}
                    
                    <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <h5 className="text-sm font-medium text-amber-400 mb-2">Lifecycle Insights</h5>
                      <ul className="text-xs text-neutral-400 space-y-1">
                        <li>• 18.5% users at-risk - implement re-engagement campaigns</li>
                        <li>• Strong new user influx (7.2%) indicates healthy growth</li>
                        <li>• Focus on converting at-risk users to active status</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Feature Impact on Retention</h3>
                <div className="space-y-3">
                  {retentionByFeature.map((feature) => (
                    <div key={feature.feature} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-white">{feature.feature}</h4>
                        <div className="flex gap-4 text-xs">
                          <span className="text-blue-400">30-day: {feature.retention30}%</span>
                          <span className="text-purple-400">90-day: {feature.retention90}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-400 rounded-full transition-all duration-500"
                            style={{ width: `${feature.retention30}%` }}
                          />
                        </div>
                        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-400 rounded-full transition-all duration-500"
                            style={{ width: `${feature.retention90}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h5 className="text-sm font-medium text-green-400 mb-2">Key Retention Drivers</h5>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    <li>• <strong>Message Sent</strong> has highest retention impact (89% at 30 days)</li>
                    <li>• <strong>Event Attended</strong> users show excellent long-term retention (67% at 90 days)</li>
                    <li>• <strong>Profile Scanning</strong> significantly improves engagement</li>
                    <li>• Focus on encouraging event participation for long-term retention</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 