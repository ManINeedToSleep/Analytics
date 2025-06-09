"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  MoreHorizontal, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  BarChart3,
  Users,
  Crown,
  Filter,
  Tag,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { CommunityLeaderboardData } from "@/lib/analytics-service"

type SortField = 'name' | 'memberCount' | 'eventsCreated' | 'engagement'
type SortDirection = 'asc' | 'desc'

export function CommunityLeaderboard() {
  const [communities, setCommunities] = useState<CommunityLeaderboardData[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<CommunityLeaderboardData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('memberCount')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const itemsPerPage = 10
  const totalItems = filteredCommunities.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Fetch community leaderboard data
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/analytics/community-leaderboard')
        if (!response.ok) {
          throw new Error('Failed to fetch community leaderboard')
        }
        
        const data = await response.json()
        setCommunities(data)
      } catch (err) {
        console.error('Failed to fetch community leaderboard:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Fallback to mock data
        const mockCommunities: CommunityLeaderboardData[] = [
          {
            id: "1",
            name: "Tech Innovators Hub",
            avatar: "/api/placeholder/40/40",
            memberCount: 15420,
            eventsCreated: 89,
            engagement: 94.2,
            growth: 23.1,
            lastActive: "2 hours ago",
            category: "Technology",
            verified: true,
            rank: 1,
            tags: ["AI", "Machine Learning", "Web Development"],
            totalPosts: 2340,
            activeMembers: 12890
          },
          {
            id: "2", 
            name: "Creative Minds Collective",
            memberCount: 12890,
            eventsCreated: 67,
            engagement: 91.8,
            growth: 18.7,
            lastActive: "5 hours ago",
            category: "Arts & Design",
            verified: true,
            rank: 2,
            tags: ["Design", "UI/UX", "Creative"],
            totalPosts: 1890,
            activeMembers: 10234
          },
          {
            id: "3",
            name: "Startup Founders Network",
            memberCount: 11240,
            eventsCreated: 156,
            engagement: 89.3,
            growth: 31.4,
            lastActive: "1 hour ago", 
            category: "Business",
            verified: false,
            rank: 3,
            tags: ["Startup", "Entrepreneurship", "Business"],
            totalPosts: 3420,
            activeMembers: 8790
          }
        ]
        setCommunities(mockCommunities)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])
  
  // Filter and search logic
  useEffect(() => {
    let filtered = communities
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })
    
    setFilteredCommunities(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, sortField, sortDirection, communities])
  
  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = filteredCommunities.slice(startIndex, startIndex + itemsPerPage)
  
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }
  
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowUpDown className="ml-1 h-4 w-4" />
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-1 h-4 w-4" />
      : <ArrowDown className="ml-1 h-4 w-4" />
  }
  
  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return "text-green-400"
    if (engagement >= 80) return "text-yellow-400"
    return "text-red-400"
  }
  
  const getGrowthColor = (growth: number) => {
    if (growth >= 25) return "text-green-400"
    if (growth >= 15) return "text-yellow-400"
    return "text-red-400"
  }

  if (loading) {
    return (
      <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <Crown className="mr-2 h-6 w-6 text-yellow-400" />
            Community Leaderboard
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Loading community rankings...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-neutral-400">Loading community data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900 text-white border-neutral-700/50 shadow-xl rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <Crown className="mr-2 h-5 w-5 text-yellow-400" />
              Community Leaderboard
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Top {itemsPerPage} communities ranked by performance metrics
            </CardDescription>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-300 placeholder:text-neutral-500 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-lg border border-neutral-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-700/50 hover:bg-neutral-800/50">
                <TableHead className="text-neutral-300 font-semibold">Rank</TableHead>
                <TableHead className="text-neutral-300 font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="text-neutral-300 hover:text-white p-0 h-auto font-semibold"
                  >
                    Community
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead className="text-neutral-300 font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('memberCount')}
                    className="text-neutral-300 hover:text-white p-0 h-auto font-semibold"
                  >
                    Members
                    {getSortIcon('memberCount')}
                  </Button>
                </TableHead>
                <TableHead className="text-neutral-300 font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('eventsCreated')}
                    className="text-neutral-300 hover:text-white p-0 h-auto font-semibold"
                  >
                    Events
                    {getSortIcon('eventsCreated')}
                  </Button>
                </TableHead>
                <TableHead className="text-neutral-300 font-semibold">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('engagement')}
                    className="text-neutral-300 hover:text-white p-0 h-auto font-semibold"
                  >
                    Engagement
                    {getSortIcon('engagement')}
                  </Button>
                </TableHead>
                <TableHead className="text-neutral-300 font-semibold">Category</TableHead>
                <TableHead className="text-neutral-300 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((community) => (
                <TableRow key={community.id} className="border-neutral-700/50 hover:bg-neutral-800/30">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-purple-400">#{community.rank}</span>
                      {community.rank <= 3 && (
                        <Crown className="ml-2 h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {community.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-white">{community.name}</span>
                          {community.verified && (
                            <Badge variant="secondary" className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400">Active {community.lastActive}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-neutral-400" />
                      <span className="font-medium">{community.memberCount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{community.eventsCreated}</span>
                  </TableCell>
                  <TableCell>
                    <span className={cn("font-medium", getEngagementColor(community.engagement))}>
                      {community.engagement}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-neutral-600 text-neutral-300">
                      {community.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-neutral-700">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-neutral-800 border-neutral-700 text-neutral-300">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-neutral-700" />
                        <DropdownMenuItem className="hover:bg-neutral-700">
                          <Link href={`/dashboard/communities?id=${community.id}`} className="flex items-center w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-700">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-700">
                          <Users className="mr-2 h-4 w-4" />
                          Manage Members
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-neutral-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} communities
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 