"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Calculator, Target } from "lucide-react"

const roiByEventType = [
  { type: "Conference", cost: 15000, revenue: 45000, profit: 30000, roi: 200, events: 12 },
  { type: "Workshop", cost: 8000, revenue: 18000, profit: 10000, roi: 125, events: 18 },
  { type: "Networking", cost: 5000, revenue: 12000, profit: 7000, roi: 140, events: 15 },
  { type: "Social", cost: 3000, revenue: 4500, profit: 1500, roi: 50, events: 8 },
]

const monthlyFinancials = [
  { month: "Jan", totalCost: 31000, totalRevenue: 79500, profit: 48500, avgROI: 156 },
  { month: "Feb", totalCost: 35000, totalRevenue: 89000, profit: 54000, avgROI: 154 },
  { month: "Mar", totalCost: 42000, totalRevenue: 105000, profit: 63000, avgROI: 150 },
  { month: "Apr", totalCost: 48000, totalRevenue: 124000, profit: 76000, avgROI: 158 },
  { month: "May", totalCost: 52000, totalRevenue: 138000, profit: 86000, avgROI: 165 },
  { month: "Jun", totalCost: 58000, totalRevenue: 156000, profit: 98000, avgROI: 169 },
]

const costBreakdown = [
  { category: "Venue", amount: 22500, percentage: 38.8 },
  { category: "Marketing", amount: 12000, percentage: 20.7 },
  { category: "Speakers", amount: 8500, percentage: 14.7 },
  { category: "Catering", amount: 7200, percentage: 12.4 },
  { category: "Technology", amount: 4800, percentage: 8.3 },
  { category: "Staff", amount: 3000, percentage: 5.2 },
]

const profitabilityMetrics = [
  { metric: "Average Event ROI", value: 169, unit: "%" },
  { metric: "Profit Margin", value: 62.8, unit: "%" },
  { metric: "Cost Per Participant", value: 15.8, unit: "$" },
  { metric: "Revenue Per Event", value: 1857, unit: "$" },
]

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280']

export function EventROIAnalysis() {
  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-purple-400" />
          Event ROI & Financial Analysis
        </CardTitle>
        <CardDescription className="text-neutral-400">Comprehensive financial performance and return on investment analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roi" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-800/50 border border-neutral-700/50">
            <TabsTrigger value="roi" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">ROI Analysis</TabsTrigger>
            <TabsTrigger value="financials" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Monthly Financials</TabsTrigger>
            <TabsTrigger value="costs" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Cost Breakdown</TabsTrigger>
            <TabsTrigger value="metrics" className="text-neutral-300 data-[state=active]:text-white data-[state=active]:bg-purple-600/50">Key Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="roi" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Target className="mr-2 h-5 w-5 text-green-400" />
                ROI by Event Type
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiByEventType}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                    <XAxis dataKey="type" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                      formatter={(value: number, name: string) => [
                        name === "roi" ? `${value}%` : `$${value.toLocaleString()}`,
                        name === "cost" ? "Cost" : name === "revenue" ? "Revenue" : "ROI"
                      ]}
                    />
                    <Bar dataKey="roi" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-white">Performance Summary</h4>
                  {roiByEventType
                    .sort((a, b) => b.roi - a.roi)
                    .map((event, index) => (
                      <div key={event.type} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                            index === 1 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                            index === 2 ? "bg-gradient-to-r from-purple-500 to-violet-500" :
                            "bg-gradient-to-r from-amber-500 to-orange-500"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <span className="text-neutral-300 font-medium">{event.type}</span>
                            <div className="text-xs text-neutral-400">{event.events} events</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{event.roi}% ROI</div>
                          <div className="text-xs text-neutral-400">${event.profit.toLocaleString()} profit</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-400" />
                Monthly Financial Trends
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyFinancials}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#404040" />
                  <XAxis dataKey="month" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                    formatter={(value: number, name: string) => [
                      name === "avgROI" ? `${value}%` : `$${value.toLocaleString()}`,
                      name === "totalCost" ? "Total Cost" : 
                      name === "totalRevenue" ? "Total Revenue" : 
                      name === "profit" ? "Profit" : "Avg ROI"
                    ]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalRevenue" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#22c55e", strokeWidth: 2, fill: "#dcfce7" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalCost" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#ef4444", strokeWidth: 2, fill: "#fee2e2" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#8b5cf6", strokeWidth: 2, fill: "#e9d5ff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                  <h4 className="text-sm font-medium text-white mb-2">June Revenue</h4>
                  <div className="text-2xl font-bold text-green-400">$156,000</div>
                  <p className="text-xs text-neutral-400">+13.0% vs May</p>
                </div>
                <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                  <h4 className="text-sm font-medium text-white mb-2">June Profit</h4>
                  <div className="text-2xl font-bold text-purple-400">$98,000</div>
                  <p className="text-xs text-neutral-400">+14.0% vs May</p>
                </div>
                <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                  <h4 className="text-sm font-medium text-white mb-2">Average ROI</h4>
                  <div className="text-2xl font-bold text-blue-400">169%</div>
                  <p className="text-xs text-neutral-400">+2.4% vs May</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-amber-400" />
                Cost Structure Analysis
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="amount"
                      label={({ percentage }) => `${percentage}%`}
                      labelLine={false}
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#262626", borderColor: "#404040", borderRadius: "0.5rem", color: "#f5f5f5" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-white">Cost Breakdown</h4>
                  {costBreakdown.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="text-neutral-300">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">${item.amount.toLocaleString()}</div>
                        <div className="text-xs text-neutral-400">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg">
                    <h5 className="text-sm font-medium text-amber-400 mb-2">Cost Optimization</h5>
                    <p className="text-xs text-neutral-400">Venue costs are largest expense (38.8%). Consider negotiating bulk rates or alternative venues for better margins.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Key Financial Metrics</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {profitabilityMetrics.map((metric) => (
                  <div key={metric.metric} className="p-6 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    <h4 className="text-sm font-medium text-neutral-400 mb-2">{metric.metric}</h4>
                    <div className="text-3xl font-bold text-white mb-1">
                      {metric.unit === "$" ? "$" : ""}{metric.value}{metric.unit === "%" ? "%" : metric.unit === "$" ? "" : metric.unit}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {metric.metric === "Average Event ROI" ? "Above industry average (120%)" :
                       metric.metric === "Profit Margin" ? "Healthy margin indicating efficiency" :
                       metric.metric === "Cost Per Participant" ? "Competitive with market rates" :
                       "Strong revenue generation per event"}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-green-400 mb-3">Financial Strengths</h4>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    <li>• Consistent ROI improvement (169% average)</li>
                    <li>• Conference events show highest profitability (200% ROI)</li>
                    <li>• Strong participant value at $15.8 cost per person</li>
                    <li>• Healthy profit margin growth trend</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-400 mb-3">Optimization Opportunities</h4>
                  <ul className="text-xs text-neutral-400 space-y-1">
                    <li>• Social events have lower ROI (50%) - review pricing</li>
                    <li>• Venue costs dominate expenses - explore alternatives</li>
                    <li>• Marketing efficiency could be improved</li>
                    <li>• Consider premium pricing for high-demand events</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 