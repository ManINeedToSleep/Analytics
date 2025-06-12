"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartTooltip } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Calendar, Users, Share2, Heart, Camera, Video } from "lucide-react"

const featureAdoptionData = [
  { feature: "Posts", adopted: 84.6, total: 45231, icon: MessageSquare, color: "#8b5cf6", trend: 12.3 },
  { feature: "Comments", adopted: 76.2, total: 45231, icon: MessageSquare, color: "#3b82f6", trend: 8.7 },
  { feature: "Events", adopted: 68.9, total: 45231, icon: Calendar, color: "#10b981", trend: 15.2 },
  { feature: "Communities", adopted: 64.0, total: 45231, icon: Users, color: "#f59e0b", trend: 6.8 },
  { feature: "Sharing", adopted: 52.3, total: 45231, icon: Share2, color: "#ef4444", trend: -2.1 },
  { feature: "Reactions", adopted: 89.1, total: 45231, icon: Heart, color: "#06b6d4", trend: 4.5 },
  { feature: "Photos", adopted: 43.7, total: 45231, icon: Camera, color: "#8b5cf6", trend: 18.9 },
  { feature: "Videos", adopted: 28.4, total: 45231, icon: Video, color: "#3b82f6", trend: 22.1 },
]

const featureUsageData = [
  { name: "Daily Active", value: 68.2, color: "#8b5cf6" },
  { name: "Weekly Active", value: 23.4, color: "#3b82f6" },
  { name: "Monthly Active", value: 5.8, color: "#10b981" },
  { name: "Inactive", value: 2.6, color: "#94a3b8" },
]

const newFeatureAdoption = [
  { feature: "AI Recommendations", week: "Week 1", adoption: 12.3 },
  { feature: "AI Recommendations", week: "Week 2", adoption: 28.7 },
  { feature: "AI Recommendations", week: "Week 3", adoption: 45.2 },
  { feature: "AI Recommendations", week: "Week 4", adoption: 58.9 },
  { feature: "Voice Messages", week: "Week 1", adoption: 8.1 },
  { feature: "Voice Messages", week: "Week 2", adoption: 19.4 },
  { feature: "Voice Messages", week: "Week 3", adoption: 32.6 },
  { feature: "Voice Messages", week: "Week 4", adoption: 41.8 },
]

export function FeatureAdoption() {
  const getAdoptionStatus = (rate: number) => {
    if (rate >= 80)
      return { status: "excellent", color: "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20" }
    if (rate >= 60) return { status: "good", color: "text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/20" }
    if (rate >= 40)
      return { status: "moderate", color: "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20" }
    return { status: "low", color: "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20" }
  }

  return (
    <div className="space-y-6">
      {/* Feature Adoption Overview */}
      <Card className="relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="relative z-10">
          <CardTitle>Feature Adoption Rates</CardTitle>
          <CardDescription>Percentage of users who have used each feature at least once</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <Chart height={350}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureAdoptionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" opacity={0.1} />
                <XAxis
                  type="number"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  opacity={0.7}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                  width={80}
                />
                <ChartTooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                <Bar dataKey="adopted" radius={[0, 4, 4, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Feature Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Usage Distribution</CardTitle>
            <CardDescription>How frequently users engage with features</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={featureUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {featureUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(value) => [`${value}%`, "Users"]} />
                </PieChart>
              </ResponsiveContainer>
            </Chart>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {featureUsageData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Details */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Performance</CardTitle>
            <CardDescription>Detailed adoption metrics and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureAdoptionData.slice(0, 6).map((feature) => {
              const Icon = feature.icon
              const status = getAdoptionStatus(feature.adopted)
              const adoptedUsers = Math.round((feature.adopted / 100) * feature.total)

              return (
                <div
                  key={feature.feature}
                  className="p-3 sm:p-4 rounded-lg border border-border/50 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 flex-shrink-0" style={{ color: feature.color }} />
                      <span className="font-medium text-sm sm:text-base">{feature.feature}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={status.color} variant="outline">
                        {feature.adopted}%
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${feature.trend > 0 ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20" : "text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20"}`}
                      >
                        {feature.trend > 0 ? "+" : ""}
                        {feature.trend}%
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={feature.adopted} className="h-2 sm:h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{adoptedUsers.toLocaleString()} users</span>
                      <span>{(feature.total - adoptedUsers).toLocaleString()} not adopted</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* New Feature Adoption Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>New Feature Adoption Timeline</CardTitle>
          <CardDescription>Track how quickly users adopt newly released features</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newFeatureAdoption}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis
                  dataKey="week"
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  opacity={0.7}
                />
                <YAxis
                  stroke="currentColor"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                  opacity={0.7}
                />
                <ChartTooltip formatter={(value) => [`${value}%`, "Adoption Rate"]} />
                <Bar dataKey="adoption" radius={[4, 4, 0, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Chart>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">58.9%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">AI Recommendations (4 weeks)</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">41.8%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Voice Messages (4 weeks)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
