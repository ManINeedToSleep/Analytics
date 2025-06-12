"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Search, 
  MoreHorizontal, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Users,
  Crown,
  Activity,
  CheckCircle,
  Calendar,
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { CommunityLeaderboardData } from "@/lib/analytics-service"
import Image from "next/image"

type SortField = 'name' | 'memberCount' | 'eventsCreated' | 'totalScore'
type SortDirection = 'asc' | 'desc'

export function CommunityLeaderboard() {
  const [allCommunities, setAllCommunities] = useState<CommunityLeaderboardData[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<CommunityLeaderboardData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('totalScore')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Updated to 15 items per page with 3-page preloading (45 total)
  const itemsPerPage = 15
  const preloadPages = 3
  const preloadSize = itemsPerPage * preloadPages // 45 communities
  const totalItems = filteredCommunities.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Fetch community leaderboard data with preloading
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
        
        // Calculate total score based on members and events for ranking
        const enrichedData = data.map((community: CommunityLeaderboardData, index: number) => ({
          ...community,
          totalScore: (community.memberCount * 0.7) + (community.eventsCreated * 100), // Weight events more heavily
          rank: index + 1
        }))
        
        setAllCommunities(enrichedData)
      } catch (err) {
        console.error('Failed to fetch community leaderboard:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        
        // Fallback to expanded mock data with calculated scores (45+ communities for testing)
        const baseMockCommunities: (CommunityLeaderboardData & { totalScore: number })[] = [
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
            activeMembers: 12890,
            totalScore: (15420 * 0.7) + (89 * 100), // 10794 + 8900 = 19694
            creator: {
              id: "creator1",
              name: "Sarah Chen",
              avatar: "/api/placeholder/32/32"
            }
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
            activeMembers: 10234,
            totalScore: (12890 * 0.7) + (67 * 100), // 9023 + 6700 = 15723
            creator: {
              id: "creator2",
              name: "Marcus Rivera",
              avatar: "/api/placeholder/32/32"
            }
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
            activeMembers: 8790,
            totalScore: (11240 * 0.7) + (156 * 100), // 7868 + 15600 = 23468
            creator: {
              id: "creator3",
              name: "Alex Johnson",
              avatar: "/api/placeholder/32/32"
            }
          }
        ]
        
        // Generate additional mock communities to test pagination (45+ total)
        const additionalCommunities = Array.from({ length: 50 }, (_, i) => ({
          id: `${i + 4}`,
          name: `Community ${i + 4}`,
          memberCount: Math.floor(Math.random() * 10000) + 1000,
          eventsCreated: Math.floor(Math.random() * 50) + 5,
          engagement: Math.random() * 40 + 60,
          growth: Math.random() * 30 + 5,
          lastActive: `${Math.floor(Math.random() * 24) + 1} hours ago`,
          category: ["Technology", "Business", "Arts & Design", "Education", "Health"][Math.floor(Math.random() * 5)],
          verified: Math.random() > 0.7,
          rank: i + 4,
          tags: ["Tag1", "Tag2", "Tag3"],
          totalPosts: Math.floor(Math.random() * 1000) + 100,
          activeMembers: Math.floor(Math.random() * 8000) + 500,
          totalScore: 0, // Will be calculated below
          creator: {
            id: `creator${i + 4}`,
            name: `Creator ${i + 4}`,
            avatar: "/api/placeholder/32/32"
          }
        }))
        
        // Calculate total scores for additional communities
        additionalCommunities.forEach(community => {
          community.totalScore = (community.memberCount * 0.7) + (community.eventsCreated * 100)
        })
        
        const allMockCommunities = [...baseMockCommunities, ...additionalCommunities]
        
        // Sort by total score and assign proper ranks
        const sortedMockData = allMockCommunities
          .sort((a, b) => b.totalScore - a.totalScore)
          .map((community, index) => ({ ...community, rank: index + 1 }))
        
        setAllCommunities(sortedMockData)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])
  
  // Filter and search logic with preloading optimization
  useEffect(() => {
    let filtered = allCommunities
    
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
    
    // Re-rank after sorting/filtering
    filtered = filtered.map((community, index) => ({
      ...community,
      rank: index + 1
    }))
    
    setFilteredCommunities(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, sortField, sortDirection, allCommunities])
  
  // Get current page items with preloading buffer
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + preloadSize, filteredCommunities.length)
  const currentItems = filteredCommunities.slice(startIndex, startIndex + itemsPerPage)
  const preloadedItems = filteredCommunities.slice(startIndex, endIndex)
  
  // Handle page changes with smooth transitions
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return
    
    setPageLoading(true)
    
    // Simulate smooth transition (since data is preloaded)
    setTimeout(() => {
      setCurrentPage(newPage)
      setPageLoading(false)
    }, 150) // Short delay for smooth UX
  }
  
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
          <div className="flex items-center gap-2 text-neutral-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading community data...
          </div>
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
              Communities ranked by member count and event activity • {itemsPerPage} per page • {preloadPages} pages preloaded
            </CardDescription>
          </div>
        </div>
        
        {/* Search Controls */}
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
              <TableRow className="border-neutral-700 hover:bg-neutral-800/20">
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
                <TableHead className="text-neutral-300 font-semibold">Creator</TableHead>
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
                    onClick={() => handleSort('totalScore')}
                    className="text-neutral-300 hover:text-white p-0 h-auto font-semibold"
                  >
                    Total Score
                    {getSortIcon('totalScore')}
                  </Button>
                </TableHead>
                <TableHead className="text-neutral-300 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2 text-neutral-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading page...
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((community) => (
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
                      <div className="flex items-center gap-3">
                        {community.avatar ? (
                          <Image 
                            src={community.avatar} 
                            alt={community.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {community.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-white">{community.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">{community.lastActive}</span>
                            {community.verified && (
                              <CheckCircle className="h-3 w-3 text-blue-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {community.creator.avatar ? (
                          <Image 
                            src={community.creator.avatar} 
                            alt={community.creator.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {community.creator.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="text-sm text-neutral-300">{community.creator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-neutral-400" />
                        <span className="font-medium">{community.memberCount.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-neutral-400" />
                        <span className="font-medium">{community.eventsCreated}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Activity className="mr-2 h-4 w-4 text-neutral-400" />
                        <span className="font-medium text-purple-400">
                          {Math.round((community as any).totalScore || 0).toLocaleString()}
                        </span>
                      </div>
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Enhanced Pagination for 15 items per page with preloading */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-neutral-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} communities
              <span className="ml-2 text-xs text-neutral-500">
                ({Math.min(preloadedItems.length, preloadSize)} preloaded)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || pageLoading}
                className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 disabled:opacity-50"
              >
                {pageLoading && currentPage > 1 ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : null}
                Previous
              </Button>
              
              {/* Smart pagination - show first, current range, and last pages */}
              <div className="flex items-center space-x-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={pageLoading}
                      className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 disabled:opacity-50"
                    >
                      1
                    </Button>
                    {currentPage > 4 && (
                      <span className="text-neutral-400 px-2">...</span>
                    )}
                  </>
                )}
                
                {/* Current page range */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  if (page > totalPages) return null
                  
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      disabled={pageLoading}
                      className={cn(
                        page === currentPage 
                          ? "bg-purple-600 hover:bg-purple-700" 
                          : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700",
                        "disabled:opacity-50"
                      )}
                    >
                      {pageLoading && page === currentPage ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        page
                      )}
                    </Button>
                  )
                })}
                
                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="text-neutral-400 px-2">...</span>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={pageLoading}
                      className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 disabled:opacity-50"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || pageLoading}
                className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 disabled:opacity-50"
              >
                {pageLoading && currentPage < totalPages ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : null}
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 