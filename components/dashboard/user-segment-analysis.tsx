"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Target, TrendingUp, Zap } from "lucide-react"

const segmentData = [
  {
    segment: "Power Users",
    count: 4523,
    percentage: 10.0,
    description: "Highly engaged users with frequent activity",
    characteristics: ["High event attendance", "Active community participation", "Profile completed"],
    retention30: 95,
    retention90: 87,
    avgEngagement: 92,
    color: "bg-purple-500",
    textColor: "text-purple-400",
  },
  {
    segment: "Regular Users",
    count: 15678,
    percentage: 34.7,
    description: "Consistent platform usage with moderate engagement",
    characteristics: ["Regular check-ins", "Moderate event attendance", "Social interactions"],
    retention30: 78,
    retention90: 61,
    avgEngagement: 74,
    color: "bg-blue-500",
    textColor: "text-blue-400",
  },
  {
    segment: "Casual Users",
    count: 18102,
    percentage: 40.0,
    description: "Occasional users with basic platform interaction",
    characteristics: ["Sporadic usage", "Basic profile info", "Event browsing"],
    retention30: 52,
    retention90: 34,
    avgEngagement: 48,
    color: "bg-green-500",
    textColor: "text-green-400",
  },
  {
    segment: "At-Risk Users",
    count: 4938,
    percentage: 10.9,
    description: "Users showing declining engagement patterns",
    characteristics: ["Decreasing activity", "Low event participation", "Incomplete profile"],
    retention30: 28,
    retention90: 15,
    avgEngagement: 22,
    color: "bg-amber-500",
    textColor: "text-amber-400",
  },
  {
    segment: "Inactive Users",
    count: 1990,
    percentage: 4.4,
    description: "Users with minimal to no recent activity",
    characteristics: ["No recent logins", "Zero interactions", "Minimal profile"],
    retention30: 8,
    retention90: 3,
    avgEngagement: 5,
    color: "bg-red-500",
    textColor: "text-red-400",
  },
]

const behaviorMetrics = [
  { metric: "Event Attendance", powerUsers: 85, regular: 65, casual: 25, atRisk: 8, inactive: 0 },
  { metric: "Community Posts", powerUsers: 92, regular: 58, casual: 18, atRisk: 5, inactive: 0 },
  { metric: "Profile Completion", powerUsers: 98, regular: 87, casual: 62, atRisk: 45, inactive: 20 },
  { metric: "Message Activity", powerUsers: 88, regular: 52, casual: 22, atRisk: 7, inactive: 1 },
  { metric: "Feature Usage", powerUsers: 91, regular: 73, casual: 41, atRisk: 19, inactive: 3 },
  { metric: "Login Frequency", powerUsers: 95, regular: 78, casual: 35, atRisk: 12, inactive: 2 },
]

const engagementTrendData = [
  { month: "Jan", powerUsers: 89, regular: 71, casual: 45, atRisk: 25, inactive: 8 },
  { month: "Feb", powerUsers: 91, regular: 73, casual: 47, atRisk: 24, inactive: 7 },
  { month: "Mar", powerUsers: 93, regular: 75, casual: 48, atRisk: 23, inactive: 6 },
  { month: "Apr", powerUsers: 92, regular: 74, casual: 48, atRisk: 22, inactive: 5 },
  { month: "May", powerUsers: 94, regular: 76, casual: 49, atRisk: 21, inactive: 5 },
  { month: "Jun", powerUsers: 95, regular: 78, casual: 50, atRisk: 20, inactive: 4 },
]

export function UserSegmentAnalysis() {
  const radarData = behaviorMetrics.map((metric) => ({
    metric: metric.metric,
    powerUsers: metric.powerUsers,
    regular: metric.regular,
    casual: metric.casual,
  }))

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Target className="mr-2 h-5 w-5 text-purple-400" />
          User Segment Analysis
        </CardTitle>
        <CardDescription className="text-neutral-400">Behavioral segmentation and engagement patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Segment Overview */}
        <div className="grid gap-4 md:grid-cols-5">
          {segmentData.map((segment) => (
            <div key={segment.segment} className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">{segment.segment}</h3>
                <div className={`w-3 h-3 rounded-full ${segment.color}`} />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{segment.count.toLocaleString()}</div>
                <div className="text-xs text-neutral-400">{segment.percentage}% of users</div>
                <div className="text-xs text-neutral-500">{segment.description}</div>
                <div className="flex items-center gap-1 mt-2">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-neutral-400">Eng: {segment.avgEngagement}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Behavior Radar Chart */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-400" />
              Behavioral Patterns
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#404040" />
                <PolarAngleAxis dataKey="metric" className="text-xs" tick={{ fill: '#a3a3a3', fontSize: 10 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#a3a3a3', fontSize: 10 }}
                  className="text-xs"
                />
                <Radar
                  name="Power Users"
                  dataKey="powerUsers"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Regular Users"
                  dataKey="regular"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Casual Users"
                  dataKey="casual"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-neutral-400">Power Users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-neutral-400">Regular Users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-neutral-400">Casual Users</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Retention by Segment
            </h3>
            <div className="space-y-4">
              {segmentData.map((segment) => (
                <div key={segment.segment} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white font-medium">{segment.segment}</span>
                    <div className="flex gap-2 text-xs">
                      <span className="text-blue-400">30d: {segment.retention30}%</span>
                      <span className="text-purple-400">90d: {segment.retention90}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Progress value={segment.retention30} className="bg-neutral-700" />
                    <Progress value={segment.retention90} className="bg-neutral-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Trends */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Engagement Trends by Segment</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={engagementTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
              <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                formatter={(value: number, name: string) => [
                  `${value}%`,
                  name === "powerUsers" ? "Power Users" :
                  name === "regular" ? "Regular Users" :
                  name === "casual" ? "Casual Users" :
                  name === "atRisk" ? "At-Risk Users" : "Inactive Users"
                ]}
              />
              <Bar dataKey="powerUsers" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="regular" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="casual" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="atRisk" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Actionable Insights */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-purple-400 mb-3">Power User Growth Opportunities</h4>
            <ul className="text-xs text-neutral-400 space-y-1">
              <li>• Identify regular users with high engagement potential</li>
              <li>• Create exclusive features for power users</li>
              <li>• Implement referral programs leveraging power users</li>
              <li>• Develop community leadership roles</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-lg">
            <h4 className="text-sm font-medium text-amber-400 mb-3">At-Risk User Recovery</h4>
            <ul className="text-xs text-neutral-400 space-y-1">
              <li>• Trigger re-engagement campaigns for at-risk users</li>
              <li>• Personalized content recommendations</li>
              <li>• Limited-time feature access incentives</li>
              <li>• Direct outreach for dormant high-value users</li>
            </ul>
          </div>
        </div>

        {/* Segment Migration Tracking */}
        <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
          <h4 className="text-sm font-medium text-white mb-3">Segment Migration Insights</h4>
          <div className="grid gap-3 md:grid-cols-3 text-xs">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/20">
                ↗ 12.3%
              </Badge>
              <span className="text-neutral-400">Casual → Regular upgrade rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">
                ↗ 8.7%
              </Badge>
              <span className="text-neutral-400">Regular → Power upgrade rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/20">
                ↘ 5.2%
              </Badge>
              <span className="text-neutral-400">Regular → At-Risk decline rate</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 