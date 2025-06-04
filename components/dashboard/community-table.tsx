"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Users, Calendar, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Community {
  id: string
  name: string
  members: number
  active: number
  healthScore: number
  growth: number
  creator: string
  createdDate: string
  description?: string
}

const communities: Community[] = [
  {
    id: "1",
    name: "Tech Innovators",
    members: 1245,
    active: 876,
    healthScore: 87,
    growth: 12.3,
    creator: "Sarah Chen",
    createdDate: "2024-01-15",
    description: "Hub for technology enthusiasts and innovators",
  },
  {
    id: "2",
    name: "Design Community",
    members: 876,
    active: 654,
    healthScore: 76,
    growth: 8.7,
    creator: "Alex Rodriguez",
    createdDate: "2024-02-03",
    description: "Creative professionals sharing design insights",
  },
  {
    id: "3",
    name: "Marketing Pros",
    members: 567,
    active: 432,
    healthScore: 65,
    growth: 5.2,
    creator: "Emma Johnson",
    createdDate: "2024-03-10",
    description: "Marketing strategies and growth hacking",
  },
  {
    id: "4",
    name: "Startup Founders",
    members: 432,
    active: 321,
    healthScore: 82,
    growth: 15.6,
    creator: "Michael Park",
    createdDate: "2024-01-28",
    description: "Entrepreneurship and startup journey",
  },
  {
    id: "5",
    name: "Data Scientists",
    members: 321,
    active: 234,
    healthScore: 79,
    growth: 9.8,
    creator: "Dr. Lisa Wang",
    createdDate: "2024-02-14",
    description: "Data analysis and machine learning",
  },
  {
    id: "6",
    name: "Tech Innovators",
    members: 89,
    active: 45,
    healthScore: 45,
    growth: 2.1,
    creator: "John Smith",
    createdDate: "2024-03-22",
    description: "Local tech meetup group",
  },
]

export function CommunityTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Community>("healthScore")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Community) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (community.description && community.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const sortedCommunities = [...filteredCommunities].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="col-span-full bg-neutral-900 text-white border-neutral-700/50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-400" />
              Communities Overview
            </CardTitle>
            <CardDescription className="text-neutral-400">
              Manage and monitor your communities with creator information
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                type="search"
                placeholder="Search communities or creators..."
                className="w-[250px] pl-8 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white"
            >
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-700/50 hover:bg-neutral-800/50">
                <TableHead className="cursor-pointer text-neutral-300" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">
                    Community Name
                    {sortField === "name" && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-neutral-300">Creator</TableHead>
                <TableHead className="cursor-pointer text-right text-neutral-300" onClick={() => handleSort("members")}>
                  <div className="flex items-center justify-end gap-1">
                    Members
                    {sortField === "members" && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right text-neutral-300" onClick={() => handleSort("active")}>
                  <div className="flex items-center justify-end gap-1">
                    Active
                    {sortField === "active" && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right text-neutral-300" onClick={() => handleSort("healthScore")}>
                  <div className="flex items-center justify-end gap-1">
                    Health Score
                    {sortField === "healthScore" && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer text-right text-neutral-300" onClick={() => handleSort("growth")}>
                  <div className="flex items-center justify-end gap-1">
                    Growth
                    {sortField === "growth" && (
                      <span>
                        {sortDirection === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-[50px] text-neutral-300"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCommunities.map((community) => (
                <TableRow key={community.id} className="border-neutral-700/50 hover:bg-neutral-800/30">
                  <TableCell className="text-white">
                    <div className="flex flex-col">
                      <span className="font-medium">{community.name}</span>
                      {community.description && (
                        <span className="text-xs text-neutral-400 mt-1">
                          {community.description}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-300">
                    <div className="flex flex-col">
                      <span className="font-medium">{community.creator}</span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(community.createdDate)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-neutral-200">
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{community.members.toLocaleString()}</span>
                      <span className="text-xs text-neutral-500">total</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-neutral-200">
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{community.active.toLocaleString()}</span>
                      <span className="text-xs text-neutral-500">
                        {Math.round((community.active / community.members) * 100)}% active
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="flex h-2 w-16 overflow-hidden rounded-full bg-neutral-700">
                        <div
                          className={`${getHealthScoreColor(community.healthScore)}`}
                          style={{ width: `${community.healthScore}%` }}
                        />
                      </div>
                      <span className="text-white font-medium">{community.healthScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        community.growth > 10
                          ? "border-green-500 text-green-400 bg-green-500/10"
                          : community.growth > 5
                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                            : "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                      }
                    >
                      +{community.growth}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="end" 
                        className="bg-neutral-800 border-neutral-700 text-neutral-200"
                      >
                        <DropdownMenuLabel className="text-neutral-300">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">
                          Send report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-neutral-700" />
                        <DropdownMenuItem className="hover:bg-neutral-700 focus:bg-neutral-700">
                          Export data
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedCommunities.length === 0 && (
          <div className="text-center py-8 text-neutral-400">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No communities found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
