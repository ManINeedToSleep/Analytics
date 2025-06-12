"use client"

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Smartphone, Calendar, Users } from "lucide-react"

const ageGroupData = [
  { ageGroup: "18-24", count: 8234, percentage: 18.2 },
  { ageGroup: "25-34", count: 15678, percentage: 34.7 },
  { ageGroup: "35-44", count: 12456, percentage: 27.5 },
  { ageGroup: "45-54", count: 6754, percentage: 14.9 },
  { ageGroup: "55+", count: 2109, percentage: 4.7 },
]

const locationData = [
  { location: "California", count: 9234, percentage: 20.4 },
  { location: "New York", count: 7654, percentage: 16.9 },
  { location: "Texas", count: 5432, percentage: 12.0 },
  { location: "Florida", count: 4321, percentage: 9.6 },
  { location: "Washington", count: 3876, percentage: 8.6 },
  { location: "Other", count: 14714, percentage: 32.5 },
]

const deviceData = [
  { device: "Mobile", count: 27139, percentage: 60.0 },
  { device: "Desktop", count: 13616, percentage: 30.1 },
  { device: "Tablet", count: 4476, percentage: 9.9 },
]

const joinTrendData = [
  { month: "Jan", newUsers: 2134, totalUsers: 31450 },
  { month: "Feb", newUsers: 2456, totalUsers: 33906 },
  { month: "Mar", newUsers: 2891, totalUsers: 36797 },
  { month: "Apr", newUsers: 3123, totalUsers: 39920 },
  { month: "May", newUsers: 2987, totalUsers: 42907 },
  { month: "Jun", newUsers: 3247, totalUsers: 45231 },
]

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']

export function UserDemographics() {
  return (
    <div className="space-y-6">
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-400" />
            User Demographics Overview
          </CardTitle>
          <CardDescription className="text-neutral-400">Comprehensive demographic analysis of your user base</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="age" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-neutral-800/50 border border-neutral-700/50">
              <TabsTrigger value="age" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Age Groups</TabsTrigger>
              <TabsTrigger value="location" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Locations</TabsTrigger>
              <TabsTrigger value="devices" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Devices</TabsTrigger>
              <TabsTrigger value="trends" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Join Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="age" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                    Age Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageGroupData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                      <XAxis dataKey="ageGroup" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value.toLocaleString()}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                        formatter={(value: number) => [`${value.toLocaleString()} users`, "Count"]}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-white">Age Group Breakdown</h4>
                  {ageGroupData.map((item, index) => (
                    <div key={item.ageGroup} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-neutral-300">{item.ageGroup}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{item.count.toLocaleString()}</div>
                        <div className="text-xs text-neutral-400">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-green-400" />
                    Geographic Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={locationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="count"
                        label={({ percentage }) => `${percentage}%`}
                        labelLine={false}
                      >
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                        formatter={(value: number) => [`${value.toLocaleString()} users`, "Users"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-white">Top Locations</h4>
                  {locationData.map((item, index) => (
                    <div key={item.location} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-neutral-300">{item.location}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{item.count.toLocaleString()}</div>
                        <div className="text-xs text-neutral-400">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Smartphone className="mr-2 h-5 w-5 text-amber-400" />
                    Device Usage
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="count"
                        label={({ percentage }) => `${percentage}%`}
                        labelLine={false}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                        formatter={(value: number) => [`${value.toLocaleString()} users`, "Users"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-white">Device Breakdown</h4>
                  {deviceData.map((item, index) => (
                    <div key={item.device} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-neutral-300">{item.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{item.count.toLocaleString()}</div>
                        <div className="text-xs text-neutral-400">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-400 mb-2">Mobile-First Insights</h5>
                    <p className="text-xs text-neutral-400">60% of users access the platform via mobile devices. Consider prioritizing mobile experience and responsive design.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                  User Growth Trends
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={joinTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                    <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value.toLocaleString()}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()}`,
                        name === "newUsers" ? "New Users" : "Total Users"
                      ]}
                    />
                    <Bar dataKey="newUsers" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="newUsers" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Average Monthly Growth</h4>
                    <div className="text-2xl font-bold text-purple-400">+2,806</div>
                    <p className="text-xs text-neutral-400">New users per month</p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Growth Rate</h4>
                    <div className="text-2xl font-bold text-green-400">+6.2%</div>
                    <p className="text-xs text-neutral-400">Month over month</p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-white mb-2">Peak Month</h4>
                    <div className="text-2xl font-bold text-amber-400">June</div>
                    <p className="text-xs text-neutral-400">3,247 new registrations</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 