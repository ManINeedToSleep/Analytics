"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Search } from "lucide-react"
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
}

const communities: Community[] = [
  {
    id: "1",
    name: "Tech Innovators",
    members: 1245,
    active: 876,
    healthScore: 87,
    growth: 12.3,
  },
  {
    id: "2",
    name: "Design Community",
    members: 876,
    active: 654,
    healthScore: 76,
    growth: 8.7,
  },
  {
    id: "3",
    name: "Marketing Pros",
    members: 567,
    active: 432,
    healthScore: 65,
    growth: 5.2,
  },
  {
    id: "4",
    name: "Startup Founders",
    members: 432,
    active: 321,
    healthScore: 82,
    growth: 15.6,
  },
  {
    id: "5",
    name: "Data Scientists",
    members: 321,
    active: 234,
    healthScore: 79,
    growth: 9.8,
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
    community.name.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Communities</CardTitle>
            <CardDescription>Manage and monitor your communities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search communities..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
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
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("members")}>
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
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("active")}>
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
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("healthScore")}>
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
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("growth")}>
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
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCommunities.map((community) => (
              <TableRow key={community.id}>
                <TableCell className="font-medium">{community.name}</TableCell>
                <TableCell className="text-right">{community.members.toLocaleString()}</TableCell>
                <TableCell className="text-right">{community.active.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="flex h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`${getHealthScoreColor(community.healthScore)}`}
                        style={{ width: `${community.healthScore}%` }}
                      />
                    </div>
                    <span>{community.healthScore}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      community.growth > 10
                        ? "border-green-500 text-green-500"
                        : community.growth > 5
                          ? "border-blue-500 text-blue-500"
                          : "border-yellow-500 text-yellow-500"
                    }
                  >
                    +{community.growth}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Send report</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Export data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
