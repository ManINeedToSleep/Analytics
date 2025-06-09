"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tag, TrendingUp, Hash, BarChart3 } from 'lucide-react'
import { TagAnalyticsData } from "@/lib/analytics-service"

export function TagAnalytics() {
  const [data, setData] = useState<TagAnalyticsData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics/tag-analytics')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const tagData = await response.json()
        setData(tagData)
      } catch (error) {
        console.error('Failed to fetch tag analytics:', error)
        // Fallback to mock data if API call fails
        setData([
          { id: "1", name: "AI", eventCount: 145, communityCount: 23, trend: 23.4, category: "Technology", popularityScore: 191 },
          { id: "2", name: "Web Development", eventCount: 132, communityCount: 18, trend: 15.7, category: "Technology", popularityScore: 168 },
          { id: "3", name: "Design", eventCount: 98, communityCount: 15, trend: 12.1, category: "Arts & Design", popularityScore: 128 },
          { id: "4", name: "Startup", eventCount: 87, communityCount: 12, trend: 28.9, category: "Business", popularityScore: 111 },
          { id: "5", name: "Marketing", eventCount: 76, communityCount: 14, trend: 18.3, category: "Marketing", popularityScore: 104 }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Technology': 'bg-blue-500/10 text-blue-400',
      'Business': 'bg-green-500/10 text-green-400',
      'Arts & Design': 'bg-purple-500/10 text-purple-400',
      'Marketing': 'bg-orange-500/10 text-orange-400',
      'Networking': 'bg-pink-500/10 text-pink-400',
      'Education': 'bg-yellow-500/10 text-yellow-400',
      'General': 'bg-gray-500/10 text-gray-400'
    }
    return colors[category] || colors['General']
  }

  const maxScore = data.length > 0 ? Math.max(...data.map(tag => tag.popularityScore)) : 100

  if (loading) {
    return (
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Tag className="mr-2 h-5 w-5 text-purple-400" />
              Tag Analytics
            </CardTitle>
            <CardDescription className="text-neutral-400 text-sm">Analyze tag usage and trends across events and communities</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-neutral-400">Loading tag analytics...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Tag className="mr-2 h-5 w-5 text-purple-400" />
            Tag Analytics
          </CardTitle>
          <CardDescription className="text-neutral-400 text-sm">Analyze tag usage and trends across events and communities</CardDescription>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Hash className="h-4 w-4" />
          {data.length} Tags
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {data.reduce((sum, tag) => sum + tag.eventCount, 0)}
              </div>
              <div className="text-sm text-neutral-400">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {data.reduce((sum, tag) => sum + tag.communityCount, 0)}
              </div>
              <div className="text-sm text-neutral-400">Communities Using Tags</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {data.filter(tag => tag.trend > 0).length}
              </div>
              <div className="text-sm text-neutral-400">Trending Tags</div>
            </div>
          </div>

          {/* Tag Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-700 hover:bg-neutral-800/50">
                <TableHead className="text-neutral-300">Tag</TableHead>
                <TableHead className="text-neutral-300">Category</TableHead>
                <TableHead className="text-neutral-300">Events</TableHead>
                <TableHead className="text-neutral-300">Communities</TableHead>
                <TableHead className="text-neutral-300">Popularity</TableHead>
                <TableHead className="text-neutral-300">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((tag) => (
                <TableRow key={tag.id} className="border-neutral-700 hover:bg-neutral-800/30">
                  <TableCell className="font-medium text-white">{tag.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getCategoryColor(tag.category)}>
                      {tag.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-300">{tag.eventCount}</TableCell>
                  <TableCell className="text-neutral-300">{tag.communityCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={(tag.popularityScore / maxScore) * 100} 
                        className="w-16 h-2"
                      />
                      <span className="text-sm text-neutral-400">{tag.popularityScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {tag.trend > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">+{tag.trend.toFixed(1)}%</span>
                        </>
                      ) : tag.trend < 0 ? (
                        <>
                          <BarChart3 className="h-4 w-4 text-red-400" />
                          <span className="text-red-400">{tag.trend.toFixed(1)}%</span>
                        </>
                      ) : (
                        <span className="text-neutral-400">0%</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {data.length > 10 && (
            <div className="text-center text-sm text-neutral-400 pt-4">
              Showing top 10 of {data.length} tags
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 