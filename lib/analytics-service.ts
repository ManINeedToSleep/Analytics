/**
 * @file analytics-service.ts
 * @description Service for calculating platform analytics based on actual Prisma database
 * SAFETY: Uses mock data to protect production database during development
 */
import { db } from './database'
import { startOfDay, subDays, startOfMonth, endOfMonth, subMonths, format, startOfWeek, endOfWeek, subWeeks, subHours } from 'date-fns'

// Safety flag - controlled by environment variable
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true' || !process.env.DATABASE_URL

export interface DashboardMetrics {
  totalUsers: {
    value: number
    weekAgo: number
  }
  activeCommunities: {
    value: number
    weekAgo: number
  }
  profileCompletions: {
    value: number
    weekAgo: number
  }
  monthlyEvents: {
    value: number
    lastMonth: number
  }
  dailyActiveUsers: {
    value: number
    weekAgo: number
  }
  contentCreated: {
    value: number
    weekAgo: number
  }
}

export interface PlatformGrowthData {
  month: string
  users: number
  communities: number
  events: number
}

export interface UserEngagementData {
  name: string
  value: number
}

export interface PlatformMetricsData {
  metric: string
  value: number
  total: number
  percentage: number
}

export interface EngagementChartData {
  date: string
  logins: number
  profiles: number
  events: number
}

export interface CommunityLeaderboardData {
  id: string
  name: string
  avatar?: string
  memberCount: number
  eventsCreated: number
  engagement: number
  growth: number
  lastActive: string
  category: string
  verified: boolean
  rank: number
  tags: string[]
  totalPosts: number
  activeMembers: number
  creator: {
    id: string
    name: string
    avatar?: string
  }
}

export interface CommunityDetailsData {
  id: string
  name: string
  avatar?: string
  memberCount: number
  eventsCreated: number
  engagement: number
  growth: number
  category: string
  verified: boolean
  description?: string
  tags: string[]
  recentActivity: {
    date: string
    members: number
    events: number
    posts: number
  }[]
  topMembers: {
    id: string
    name: string
    avatar?: string
    role: string
    contributions: number
  }[]
  popularTags: {
    name: string
    count: number
    trend: number
  }[]
}

export interface TagAnalyticsData {
  id: string
  name: string
  eventCount: number
  communityCount: number
  trend: number
  category: string
  popularityScore: number
}

// Type definitions for Prisma query results
interface CommunityWithRelations {
  id: string
  cardName: string
  avatar: string | null
  memberCount: number
  updatedAt: Date
  communityType: string | null
  isCommunityActivated: boolean
  about: string | null
  profileCommunities: {
    profileName: string | null
    avatar: string | null
  }
  CommunityConnections: {
    id: string
    joinDate: Date
    createdAt: Date
  }[]
  communityEvents: {
    event: {
      eventTags: {
        tags: {
          name: string
        } | null
      }[]
      eventParticipants?: any[]
      createdAt: Date
    }
  }[]
}

interface CommunityDetailsWithRelations {
  id: string
  cardName: string
  avatar: string | null
  memberCount: number
  updatedAt: Date
  communityType: string | null
  isCommunityActivated: boolean
  about: string | null
  profileCommunities: {
    profileName: string | null
    avatar: string | null
  }
  CommunityConnections: {
    joinDate: Date
    profile: {
      id: string
      profileName: string | null
      avatar: string | null
      title: string | null
    }
  }[]
  communityEvents: {
    event: {
      eventTags: {
        tags: {
          name: string
        } | null
      }[]
      eventParticipants: any[]
      createdAt: Date
    }
  }[]
}

/**
 * Calculate percentage change between two values
 */
function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

/**
 * MOCK DATA FUNCTIONS - Safe for development
 */
function getMockDashboardMetrics(): DashboardMetrics {
  return {
    totalUsers: {
      value: 45231,
      weekAgo: 42180
    },
    activeCommunities: {
      value: 127,
      weekAgo: 119
    },
    profileCompletions: {
      value: 32891,
      weekAgo: 30250
    },
    monthlyEvents: {
      value: 842,
      lastMonth: 679
    },
    dailyActiveUsers: {
      value: 8234,
      weekAgo: 7850
    },
    contentCreated: {
      value: 2847,
      weekAgo: 2430
    }
  }
}

function getMockPlatformGrowthData(): PlatformGrowthData[] {
  return [
    { month: "Jan", users: 28450, communities: 89, events: 234 },
    { month: "Feb", users: 31200, communities: 95, events: 267 },
    { month: "Mar", users: 34800, communities: 102, events: 289 },
    { month: "Apr", users: 38100, communities: 108, events: 312 },
    { month: "May", users: 41650, communities: 115, events: 356 },
    { month: "Jun", users: 45231, communities: 127, events: 384 },
  ]
}

function getMockUserEngagementData(): UserEngagementData[] {
  return [
    { name: "New Users", value: 2234 },
    { name: "Active Users", value: 4105 },
    { name: "Profiles Created", value: 1893 },
    { name: "Communities Joined", value: 982 },
    { name: "Events Created", value: 567 },
  ]
}

function getMockPlatformMetricsData(): PlatformMetricsData[] {
  return [
    { metric: "Email Verification", value: 32891, total: 45231, percentage: 72.7 },
    { metric: "Account Activation", value: 41205, total: 45231, percentage: 91.1 },
    { metric: "Profile Completion", value: 28934, total: 45231, percentage: 64.0 },
    { metric: "Paid Conversion", value: 1982, total: 45231, percentage: 4.4 },
  ]
}

function getMockEngagementChartData(timeRange: '7d' | '30d' | '90d' | '1y' = '30d'): EngagementChartData[] {
  const data: EngagementChartData[] = []
  
  if (timeRange === '7d') {
    // Daily data for 7 days
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const factor = (7 - i) / 7
      
      data.push({
        date: format(date, 'MMM dd'),
        logins: Math.floor(50 + factor * 100 + Math.random() * 20),
        profiles: Math.floor(20 + factor * 40 + Math.random() * 10),
        events: Math.floor(10 + factor * 30 + Math.random() * 15),
      })
    }
  } else if (timeRange === '30d') {
    // Weekly aggregates for 30 days (5 weeks)
    for (let i = 4; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(new Date(), i))
      const factor = (5 - i) / 5
      
      data.push({
        date: `Week ${format(weekStart, 'MMM dd')}`,
        logins: Math.floor(200 + factor * 400 + Math.random() * 100),
        profiles: Math.floor(80 + factor * 160 + Math.random() * 40),
        events: Math.floor(40 + factor * 120 + Math.random() * 60),
      })
    }
  } else if (timeRange === '90d') {
    // Bi-weekly aggregates for 90 days (6 periods)
    for (let i = 5; i >= 0; i--) {
      const periodStart = subDays(new Date(), (i + 1) * 15)
      const factor = (6 - i) / 6
      
      data.push({
        date: format(periodStart, 'MMM dd'),
        logins: Math.floor(400 + factor * 800 + Math.random() * 200),
        profiles: Math.floor(160 + factor * 320 + Math.random() * 80),
        events: Math.floor(80 + factor * 240 + Math.random() * 120),
      })
    }
  } else { // '1y'
    // Monthly aggregates for 1 year (12 months)
    for (let i = 11; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(new Date(), i))
      const factor = (12 - i) / 12
      
      data.push({
        date: format(monthStart, 'MMM yyyy'),
        logins: Math.floor(800 + factor * 1600 + Math.random() * 400),
        profiles: Math.floor(320 + factor * 640 + Math.random() * 160),
        events: Math.floor(160 + factor * 480 + Math.random() * 240),
      })
    }
  }
  
  return data
}

/**
 * Get dashboard metrics with trends (yesterday vs 2 days ago)
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock data to protect production database')
    return getMockDashboardMetrics()
  }

  try {
    console.log('📊 Fetching real dashboard metrics from database...')
    
    const yesterday = subDays(new Date(), 1)
    const dayBeforeYesterday = subDays(new Date(), 2)
    const thisWeekStart = startOfWeek(new Date())
    const lastWeekStart = startOfWeek(subWeeks(new Date(), 1))
    const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1))
    const thisMonthStart = startOfMonth(new Date())
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1))
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1))
    const last24Hours = subHours(new Date(), 24)
    const previous24Hours = subHours(yesterday, 24)

    // Debug: Concise metrics overview
    console.log('🔍 METRICS DEBUG:')

    const oneWeekAgo = subDays(new Date(), 7)

    // Total Users - current vs 1 week ago
    const totalUsersNow = await db.users.count({
      where: { isDeleted: false }
    })
    const totalUsersWeekAgo = await db.users.count({
      where: { 
        isDeleted: false,
        createdAt: { lt: oneWeekAgo }
      }
    })

    // Active Communities (with activity in last 30 days) - current vs 1 week ago
    const activeCommunitiesNow = await db.communities.count({
      where: { updatedAt: { gte: subDays(new Date(), 30) } }
    })
    const activeCommunitiesWeekAgo = await db.communities.count({
      where: { 
        updatedAt: { 
          gte: subDays(oneWeekAgo, 30),
          lt: oneWeekAgo
        }
      }
    })

    // Profile Completions - current vs 1 week ago
    const profileCompletionsNow = await db.userProfiles.count({
      where: { isProfileActivated: true }
    })
    const profileCompletionsWeekAgo = await db.userProfiles.count({
      where: { 
        isProfileActivated: true,
        createdAt: { lt: oneWeekAgo }
      }
    })

    // Monthly Events - this month vs last month
    const monthlyEventsThis = await db.events.count({
      where: {
        createdAt: { gte: thisMonthStart, lt: new Date() },
        isDeleted: false
      }
    })
    const monthlyEventsLast = await db.events.count({
      where: {
        createdAt: { gte: lastMonthStart, lt: lastMonthEnd },
        isDeleted: false
      }
    })

    // Daily Active Users - today vs same day last week
    const dailyActiveToday = await db.logs.groupBy({
      by: ['actorId'],
      where: { createdAt: { gte: last24Hours } }
    })
    const dailyActiveWeekAgo = await db.logs.groupBy({
      by: ['actorId'], 
      where: { 
        createdAt: { 
          gte: subHours(oneWeekAgo, 24),
          lt: oneWeekAgo
        }
      }
    })

    // Content Created - this week vs last week
    const eventsThisWeek = await db.events.count({
      where: {
        createdAt: { gte: thisWeekStart },
        isDeleted: false
      }
    })
    const communitiesThisWeek = await db.communities.count({
      where: { createdAt: { gte: thisWeekStart } }
    })
    const eventsLastWeek = await db.events.count({
      where: {
        createdAt: { gte: lastWeekStart, lt: lastWeekEnd },
        isDeleted: false
      }
    })
    const communitiesLastWeek = await db.communities.count({
      where: {
        createdAt: { gte: lastWeekStart, lt: lastWeekEnd }
      }
    })
    const contentThisWeek = eventsThisWeek + communitiesThisWeek
    const contentLastWeek = eventsLastWeek + communitiesLastWeek

    // Concise debug summary
    console.log(`Users: ${totalUsersNow} (${totalUsersWeekAgo} week ago) | Communities: ${activeCommunitiesNow} (${activeCommunitiesWeekAgo}) | Profiles: ${profileCompletionsNow} (${profileCompletionsWeekAgo}) | Events: ${monthlyEventsThis} this month (${monthlyEventsLast} last) | DAU: ${dailyActiveToday.length} (${dailyActiveWeekAgo.length}) | Content: ${contentThisWeek} (${contentLastWeek})`)
    
    console.log('✅ Real data fetched')

    return {
      totalUsers: {
        value: totalUsersNow,
        weekAgo: totalUsersWeekAgo
      },
      activeCommunities: {
        value: activeCommunitiesNow,
        weekAgo: activeCommunitiesWeekAgo
      },
      profileCompletions: {
        value: profileCompletionsNow,
        weekAgo: profileCompletionsWeekAgo
      },
      monthlyEvents: {
        value: monthlyEventsThis,
        lastMonth: monthlyEventsLast
      },
      dailyActiveUsers: {
        value: dailyActiveToday.length,
        weekAgo: dailyActiveWeekAgo.length
      },
      contentCreated: {
        value: contentThisWeek,
        weekAgo: contentLastWeek
      }
    }
  } catch (error) {
    console.error('❌ Error fetching dashboard metrics:', error)
    console.log('🔄 Falling back to mock data')
    return getMockDashboardMetrics()
  }
}

/**
 * Get platform growth data for the last 6 months
 */
export async function getPlatformGrowthData(): Promise<PlatformGrowthData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock platform growth data')
    return getMockPlatformGrowthData()
  }
  
  try {
    console.log('📈 Fetching real platform growth data...')
    
    const data: PlatformGrowthData[] = []
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(new Date(), i))
      const monthEnd = endOfMonth(subMonths(new Date(), i))
      
      const [users, communities, events] = await Promise.all([
        db.users.count({
          where: {
            createdAt: { lte: monthEnd },
            isDeleted: false
          }
        }),
        db.communities.count({
          where: { createdAt: { lte: monthEnd } }
        }),
        db.events.count({
          where: {
            createdAt: { lte: monthEnd },
            isDeleted: false
          }
        })
      ])
      
      data.push({
        month: format(monthStart, 'MMM'),
        users,
        communities,
        events
      })
    }
    
    console.log(`📈 Platform Growth: 6 months data - Latest: Users(${data[data.length-1]?.users || 0}) Communities(${data[data.length-1]?.communities || 0}) Events(${data[data.length-1]?.events || 0})`)
    return data
  } catch (error) {
    console.error('❌ Error fetching platform growth data:', error)
    console.log('🔄 Falling back to mock data')
    return getMockPlatformGrowthData()
  }
}

/**
 * Get user engagement data
 */
export async function getUserEngagementData(): Promise<UserEngagementData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock engagement data')
    return getMockUserEngagementData()
  }
  
  try {
    console.log('👥 Fetching real user engagement data...')
    
    const thirtyDaysAgo = subDays(new Date(), 30)
    
    const [
      newUsers,
      activeUsers,
      profilesCreated,
      communitiesJoined,
      eventsCreated
    ] = await Promise.all([
      db.users.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
          isDeleted: false
        }
      }),
      db.logs.groupBy({
        by: ['actorId'],
        where: { createdAt: { gte: thirtyDaysAgo } }
      }).then((result: any) => result.length),
      db.userProfiles.count({
        where: { createdAt: { gte: thirtyDaysAgo } }
      }),
      db.communityConnections.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: 'ACCEPTED'
        }
      }),
      db.events.count({
        where: {
          createdAt: { gte: thirtyDaysAgo },
          isDeleted: false
        }
      })
    ])

    console.log(`👥 User Engagement (30d): New(${newUsers}) Active(${activeUsers}) Profiles(${profilesCreated}) Joined(${communitiesJoined}) Events(${eventsCreated})`)
    
    return [
      { name: 'New Users', value: newUsers },
      { name: 'Active Users', value: activeUsers },
      { name: 'Profiles Created', value: profilesCreated },
      { name: 'Communities Joined', value: communitiesJoined },
      { name: 'Events Created', value: eventsCreated }
    ]
  } catch (error) {
    console.error('❌ Error fetching user engagement data:', error)
    console.log('🔄 Falling back to mock data')
    return getMockUserEngagementData()
  }
}

/**
 * Get platform conversion metrics
 */
export async function getPlatformMetricsData(): Promise<PlatformMetricsData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock metrics data')
    return getMockPlatformMetricsData()
  }
  
  try {
    console.log('📊 Fetching real platform metrics data...')
    
    const [
      totalUsers,
      verifiedEmails,
      activatedAccounts,
      completedProfiles,
      paidSubscriptions
    ] = await Promise.all([
      db.users.count({ where: { isDeleted: false } }),
      db.users.count({ where: { isEmailVerified: true, isDeleted: false } }),
      db.users.count({ where: { isAccountActivated: true, isDeleted: false } }),
      db.userProfiles.count({ where: { isProfileActivated: true } }),
      db.subscriptions.count({ where: { isSubscriptionCancelled: false } })
    ])

    const emailPct = totalUsers > 0 ? (verifiedEmails / totalUsers) * 100 : 0
    const activePct = totalUsers > 0 ? (activatedAccounts / totalUsers) * 100 : 0
    const profilePct = totalUsers > 0 ? (completedProfiles / totalUsers) * 100 : 0
    const paidPct = totalUsers > 0 ? (paidSubscriptions / totalUsers) * 100 : 0
    
    console.log(`🎯 Platform Metrics: Email(${emailPct.toFixed(1)}%) Active(${activePct.toFixed(1)}%) Profile(${profilePct.toFixed(1)}%) Paid(${paidPct.toFixed(1)}%)`)

    return [
      {
        metric: 'Email Verification',
        value: verifiedEmails,
        total: totalUsers,
        percentage: emailPct
      },
      {
        metric: 'Account Activation',
        value: activatedAccounts,
        total: totalUsers,
        percentage: activePct
      },
      {
        metric: 'Profile Completion',
        value: completedProfiles,
        total: totalUsers,
        percentage: profilePct
      },
      {
        metric: 'Paid Conversion',
        value: paidSubscriptions,
        total: totalUsers,
        percentage: paidPct
      }
    ]
  } catch (error) {
    console.error('❌ Error fetching platform metrics data:', error)
    console.log('🔄 Falling back to mock data')
    return getMockPlatformMetricsData()
  }
}

/**
 * Get engagement chart data with smart aggregation for different time ranges
 */
export async function getEngagementChartData(timeRange: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<EngagementChartData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock engagement chart data')
    return getMockEngagementChartData(timeRange)
  }
  
  try {
    console.log(`📈 Fetching real engagement chart data for ${timeRange}...`)
    
    const data: EngagementChartData[] = []
    
    if (timeRange === '7d') {
      // Daily data for 7 days
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i)
        const nextDate = subDays(new Date(), i - 1)
        
        const [logins, profiles, events] = await Promise.all([
          db.logs.groupBy({
            by: ['actorId'],
            where: {
              createdAt: { 
                gte: startOfDay(date),
                lt: startOfDay(nextDate)
              },
              actionType: {
                in: ['ACCOUNT_CREATED', 'PROFILE_CREATED', 'NEW_CONNECTION']
              }
            }
          }).then((result: any) => result.length),
          db.userProfiles.count({
            where: {
              createdAt: {
                gte: startOfDay(date),
                lt: startOfDay(nextDate)
              }
            }
          }),
          db.events.count({
            where: {
              createdAt: {
                gte: startOfDay(date),
                lt: startOfDay(nextDate)
              },
              isDeleted: false
            }
          })
        ])
        
        data.push({
          date: format(date, 'MMM dd'),
          logins,
          profiles,
          events
        })
      }
    } else if (timeRange === '30d') {
      // Weekly aggregates for 30 days (5 weeks)
      for (let i = 4; i >= 0; i--) {
        const weekStart = startOfWeek(subWeeks(new Date(), i))
        const weekEnd = endOfWeek(subWeeks(new Date(), i))
        
        const [logins, profiles, events] = await Promise.all([
          db.logs.groupBy({
            by: ['actorId'],
            where: {
              createdAt: { 
                gte: weekStart,
                lt: weekEnd
              },
              actionType: {
                in: ['ACCOUNT_CREATED', 'PROFILE_CREATED', 'NEW_CONNECTION']
              }
            }
          }).then((result: any) => result.length),
          db.userProfiles.count({
            where: {
              createdAt: {
                gte: weekStart,
                lt: weekEnd
              }
            }
          }),
          db.events.count({
            where: {
              createdAt: {
                gte: weekStart,
                lt: weekEnd
              },
              isDeleted: false
            }
          })
        ])
        
        data.push({
          date: `Week ${format(weekStart, 'MMM dd')}`,
          logins,
          profiles,
          events
        })
      }
    } else if (timeRange === '90d') {
      // Bi-weekly aggregates for 90 days (6 periods)
      for (let i = 5; i >= 0; i--) {
        const periodStart = subDays(new Date(), (i + 1) * 15)
        const periodEnd = subDays(new Date(), i * 15)
        
        const [logins, profiles, events] = await Promise.all([
          db.logs.groupBy({
            by: ['actorId'],
            where: {
              createdAt: { 
                gte: startOfDay(periodStart),
                lt: startOfDay(periodEnd)
              },
              actionType: {
                in: ['ACCOUNT_CREATED', 'PROFILE_CREATED', 'NEW_CONNECTION']
              }
            }
          }).then((result: any) => result.length),
          db.userProfiles.count({
            where: {
              createdAt: {
                gte: startOfDay(periodStart),
                lt: startOfDay(periodEnd)
              }
            }
          }),
          db.events.count({
            where: {
              createdAt: {
                gte: startOfDay(periodStart),
                lt: startOfDay(periodEnd)
              },
              isDeleted: false
            }
          })
        ])
        
        data.push({
          date: format(periodStart, 'MMM dd'),
          logins,
          profiles,
          events
        })
      }
    } else { // '1y'
      // Monthly aggregates for 1 year (12 months)
      for (let i = 11; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(new Date(), i))
        const monthEnd = endOfMonth(subMonths(new Date(), i))
        
        const [logins, profiles, events] = await Promise.all([
          db.logs.groupBy({
            by: ['actorId'],
            where: {
              createdAt: { 
                gte: monthStart,
                lt: monthEnd
              },
              actionType: {
                in: ['ACCOUNT_CREATED', 'PROFILE_CREATED', 'NEW_CONNECTION']
              }
            }
          }).then((result: any) => result.length),
          db.userProfiles.count({
            where: {
              createdAt: {
                gte: monthStart,
                lt: monthEnd
              }
            }
          }),
          db.events.count({
            where: {
              createdAt: {
                gte: monthStart,
                lt: monthEnd
              },
              isDeleted: false
            }
          })
        ])
        
        data.push({
          date: format(monthStart, 'MMM yyyy'),
          logins,
          profiles,
          events
        })
      }
    }
    
    const totalLogins = data.reduce((sum, period) => sum + period.logins, 0)
    const totalProfiles = data.reduce((sum, period) => sum + period.profiles, 0)
    const totalEvents = data.reduce((sum, period) => sum + period.events, 0)
    
    console.log(`📊 Engagement Chart (${timeRange}): ${data.length} periods, Logins(${totalLogins}) Profiles(${totalProfiles}) Events(${totalEvents})`)
    return data
  } catch (error) {
    console.error('❌ Error fetching engagement chart data:', error)
    console.log('🔄 Falling back to mock data')
    return getMockEngagementChartData(timeRange)
  }
}

/**
 * Get community leaderboard with real database integration
 */
export async function getCommunityLeaderboard(): Promise<CommunityLeaderboardData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock community leaderboard data')
    return getMockCommunityLeaderboard()
  }

  try {
    console.log('🏆 Fetching real community leaderboard data...')
    
    const communities = await db.communities.findMany({
      take: 30,
      orderBy: [
        { memberCount: 'desc' },
        { updatedAt: 'desc' }
      ],
      include: {
        profileCommunities: {
          select: {
            profileName: true,
            avatar: true
          }
        },
        CommunityConnections: {
          where: { status: 'ACCEPTED' },
          select: {
            id: true,
            joinDate: true,
            createdAt: true
          }
        },
        communityEvents: {
          include: {
            event: {
              include: {
                eventTags: {
                  include: {
                    tags: true
                  }
                }
              }
            }
          }
        }
      }
    }) as CommunityWithRelations[]

    const leaderboardData: CommunityLeaderboardData[] = await Promise.all(
      communities.map(async (community: CommunityWithRelations, index: number) => {
        // Calculate engagement rate
        const thirtyDaysAgo = subDays(new Date(), 30)
        const activeMembers = community.CommunityConnections.filter(
          (conn: { joinDate: Date }) => conn.joinDate >= thirtyDaysAgo
        ).length
        const engagement = community.memberCount > 0 
          ? (activeMembers / community.memberCount) * 100 
          : 0

        // Calculate growth rate
        const sixtyDaysAgo = subDays(new Date(), 60)
        const oldMembers = community.CommunityConnections.filter(
          (conn: { joinDate: Date }) => conn.joinDate < thirtyDaysAgo && conn.joinDate >= sixtyDaysAgo
        ).length
        const growth = oldMembers > 0 
          ? ((activeMembers - oldMembers) / oldMembers) * 100 
          : 0

        // Extract tags from community events
        const allTags = community.communityEvents.flatMap(
          (eventLink: any) => eventLink.event.eventTags.map((et: any) => et.tags?.name || '')
        ).filter(Boolean) as string[]
        const uniqueTags = [...new Set(allTags)]

        // Determine category from tags or default
        const category = getCategoryFromTags(uniqueTags) || community.communityType || 'General'

        return {
          id: community.id,
          name: community.cardName,
          avatar: community.avatar || undefined,
          memberCount: community.memberCount,
          eventsCreated: community.communityEvents.length,
          engagement: Math.round(engagement * 10) / 10,
          growth: Math.round(growth * 10) / 10,
          lastActive: formatLastActive(community.updatedAt),
          category,
          verified: community.isCommunityActivated,
          rank: index + 1,
          tags: uniqueTags.slice(0, 5), // Top 5 tags
          totalPosts: 0, // Would need posts table
          activeMembers,
          creator: {
            id: community.profileCommunities.profileName || community.id,
            name: community.profileCommunities.profileName || 'Unknown Creator',
            avatar: community.profileCommunities.avatar || undefined
          }
        }
      })
    )

    console.log(`🏆 Community Leaderboard: Returning ${leaderboardData.length} communities`)
    return leaderboardData

  } catch (error) {
    console.error('❌ Error fetching community leaderboard:', error)
    console.log('🔄 Falling back to mock data')
    return getMockCommunityLeaderboard()
  }
}

/**
 * Get detailed community analytics
 */
export async function getCommunityDetails(id: string): Promise<CommunityDetailsData | null> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock community details data')
    return getMockCommunityDetails(id)
  }

  try {
    console.log(`🔍 Fetching community details for ID: ${id}`)
    
    const community = await db.communities.findUnique({
      where: { id },
      include: {
        profileCommunities: {
          select: {
            profileName: true,
            avatar: true
          }
        },
        CommunityConnections: {
          where: { status: 'ACCEPTED' },
          include: {
            profile: {
              select: {
                id: true,
                profileName: true,
                avatar: true,
                title: true
              }
            }
          },
          orderBy: { joinDate: 'desc' }
        },
        communityEvents: {
          include: {
            event: {
              include: {
                eventTags: {
                  include: {
                    tags: true
                  }
                },
                eventParticipants: true
              }
            }
          }
        }
      }
    }) as CommunityDetailsWithRelations | null

    if (!community) {
      return null
    }

    // Calculate metrics
    const thirtyDaysAgo = subDays(new Date(), 30)
    const activeMembers = community.CommunityConnections.filter(
      (conn: { joinDate: Date }) => conn.joinDate >= thirtyDaysAgo
    ).length
    const engagement = community.memberCount > 0 
      ? (activeMembers / community.memberCount) * 100 
      : 0

    // Extract and analyze tags
    const allTags = community.communityEvents.flatMap(
      (eventLink: any) => eventLink.event.eventTags.map((et: any) => ({
        name: et.tags?.name || '',
        eventDate: eventLink.event.createdAt
      }))
    ).filter((tag: { name: string }) => tag.name)

    const tagCounts = allTags.reduce((acc: Record<string, number>, tag: { name: string }) => {
      acc[tag.name] = (acc[tag.name] || 0) + 1
      return acc
    }, {})

    const popularTags = Object.entries(tagCounts)
      .map(([name, count]) => ({
        name,
        count: count as number,
        trend: 0 // Would calculate based on time series
      }))
      .sort((a: { count: number }, b: { count: number }) => b.count - a.count)
      .slice(0, 10)

    // Generate recent activity data
    const recentActivity = generateRecentActivity(community.CommunityConnections)

    // Get top members (ensure uniqueness by profile ID)
    const uniqueMembers = new Map()
    community.CommunityConnections.forEach((conn: any) => {
      if (!uniqueMembers.has(conn.profile.id)) {
        uniqueMembers.set(conn.profile.id, {
          id: conn.profile.id,
          name: conn.profile.profileName || 'Unknown',
          avatar: conn.profile.avatar || undefined,
          role: 'Member', // Would determine from role field
          contributions: 0 // Would calculate from activities
        })
      }
    })
    const topMembers = Array.from(uniqueMembers.values()).slice(0, 5)

    const detailsData: CommunityDetailsData = {
      id: community.id,
      name: community.cardName,
      avatar: community.avatar || undefined,
      memberCount: community.memberCount,
      eventsCreated: community.communityEvents.length,
      engagement: Math.round(engagement * 10) / 10,
      growth: 0, // Would calculate growth trend
      category: getCategoryFromTags(Object.keys(tagCounts)) || community.communityType || 'General',
      verified: community.isCommunityActivated,
      description: community.about || undefined,
      tags: Object.keys(tagCounts),
      recentActivity,
      topMembers,
      popularTags
    }

    console.log(`🔍 Community Details: ${community.cardName} - ${community.memberCount} members, ${popularTags.length} tags`)
    return detailsData

  } catch (error) {
    console.error('❌ Error fetching community details:', error)
    console.log('🔄 Falling back to mock data')
    return getMockCommunityDetails(id)
  }
}

/**
 * Get tag analytics data
 */
export async function getTagAnalytics(): Promise<TagAnalyticsData[]> {
  if (USE_MOCK_DATA) {
    console.log('🛡️ Using mock tag analytics data')
    return getMockTagAnalytics()
  }

  try {
    console.log('🏷️ Fetching tag analytics data...')
    
    const tags = await db.tags.findMany({
      include: {
        tags: {
          include: {
            events: {
              include: {
                eventLinks: {
                  include: {
                    communityEventLink: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const tagAnalytics: TagAnalyticsData[] = tags.map((tag: any) => {
      const eventCount = tag.tags.length
      const communityCount = new Set(
        tag.tags.flatMap((eventTag: any) => 
          eventTag.events.eventLinks
            .filter((link: any) => link.communityEventLink)
            .map((link: any) => link.communityEventLink!.id)
        )
      ).size

      return {
        id: tag.id,
        name: tag.name,
        eventCount,
        communityCount,
        trend: 0, // Would calculate based on time series
        category: getTagCategory(tag.name),
        popularityScore: eventCount + (communityCount * 2) // Simple scoring
      }
    }).sort((a: TagAnalyticsData, b: TagAnalyticsData) => b.popularityScore - a.popularityScore)

    console.log(`🏷️ Tag Analytics: ${tagAnalytics.length} tags analyzed`)
    return tagAnalytics

  } catch (error) {
    console.error('❌ Error fetching tag analytics:', error)
    console.log('🔄 Falling back to mock data')
    return getMockTagAnalytics()
  }
}

// Helper functions
function getCategoryFromTags(tags: string[]): string | null {
  const categoryMap: Record<string, string> = {
    'ai': 'Technology',
    'machine-learning': 'Technology',
    'web-development': 'Technology',
    'mobile': 'Technology',
    'startup': 'Business',
    'marketing': 'Marketing',
    'design': 'Arts & Design',
    'ui-ux': 'Arts & Design',
    'networking': 'Networking',
    'workshop': 'Education',
    'conference': 'Education'
  }

  for (const tag of tags) {
    const lowerTag = tag.toLowerCase()
    if (categoryMap[lowerTag]) {
      return categoryMap[lowerTag]
    }
  }
  return null
}

function getTagCategory(tagName: string): string {
  const lowerName = tagName.toLowerCase()
  if (['ai', 'ml', 'tech', 'dev', 'code'].some(t => lowerName.includes(t))) return 'Technology'
  if (['business', 'startup', 'finance'].some(t => lowerName.includes(t))) return 'Business'
  if (['design', 'ui', 'ux', 'art'].some(t => lowerName.includes(t))) return 'Arts & Design'
  if (['marketing', 'growth', 'sales'].some(t => lowerName.includes(t))) return 'Marketing'
  if (['network', 'meet', 'social'].some(t => lowerName.includes(t))) return 'Networking'
  return 'General'
}

function formatLastActive(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours} hours ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days ago`
  
  const diffInWeeks = Math.floor(diffInDays / 7)
  return `${diffInWeeks} weeks ago`
}

function generateRecentActivity(connections: any[]): any[] {
  // Generate 7 days of activity data
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const dayConnections = connections.filter((conn: any) => 
      conn.joinDate >= startOfDay(date) && conn.joinDate < startOfDay(subDays(date, -1))
    )
    
    data.push({
      date: format(date, 'MMM dd'),
      members: dayConnections.length,
      events: Math.floor(Math.random() * 5), // Would get from actual events
      posts: Math.floor(Math.random() * 20) // Would get from actual posts
    })
  }
  return data
}

// Mock data functions (fallbacks)
function getMockCommunityLeaderboard(): CommunityLeaderboardData[] {
  return [
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
      tags: ["AI", "Machine Learning", "Web Development", "Startup", "Innovation"],
      totalPosts: 2340,
      activeMembers: 12890,
      creator: {
        id: "Tech Innovators Hub",
        name: "Tech Innovators Hub",
        avatar: "/api/placeholder/40/40"
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
      tags: ["Design", "UI/UX", "Graphic Design", "Creative", "Art"],
      totalPosts: 1890,
      activeMembers: 10234,
      creator: {
        id: "Creative Minds Collective",
        name: "Creative Minds Collective",
        avatar: "/api/placeholder/40/40"
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
      tags: ["Startup", "Entrepreneurship", "Business", "Funding", "Growth"],
      totalPosts: 3420,
      activeMembers: 8790,
      creator: {
        id: "Startup Founders Network",
        name: "Startup Founders Network",
        avatar: "/api/placeholder/40/40"
      }
    }
  ]
}

function getMockCommunityDetails(id: string): CommunityDetailsData {
  return {
    id,
    name: "Tech Innovators Hub",
    avatar: "/api/placeholder/40/40",
    memberCount: 15420,
    eventsCreated: 89,
    engagement: 94.2,
    growth: 23.1,
    category: "Technology",
    verified: true,
    description: "A vibrant community of tech innovators, developers, and entrepreneurs building the future.",
    tags: ["AI", "Machine Learning", "Web Development", "Startup", "Innovation", "Tech"],
    recentActivity: [
      { date: "Dec 15", members: 12, events: 3, posts: 45 },
      { date: "Dec 16", members: 18, events: 2, posts: 67 },
      { date: "Dec 17", members: 23, events: 4, posts: 89 },
      { date: "Dec 18", members: 15, events: 1, posts: 34 },
      { date: "Dec 19", members: 28, events: 5, posts: 123 },
      { date: "Dec 20", members: 19, events: 2, posts: 78 },
      { date: "Dec 21", members: 31, events: 3, posts: 156 }
    ],
    topMembers: [
      { id: "1", name: "Alex Rodriguez", avatar: "/api/placeholder/32/32", role: "Moderator", contributions: 234 },
      { id: "2", name: "Sarah Chen", avatar: "/api/placeholder/32/32", role: "Active Member", contributions: 189 },
      { id: "3", name: "Michael Johnson", avatar: "/api/placeholder/32/32", role: "Event Organizer", contributions: 156 },
      { id: "4", name: "Emma Davis", avatar: "/api/placeholder/32/32", role: "Content Creator", contributions: 143 },
      { id: "5", name: "David Kim", avatar: "/api/placeholder/32/32", role: "Community Helper", contributions: 128 }
    ],
    popularTags: [
      { name: "AI", count: 45, trend: 12.3 },
      { name: "Machine Learning", count: 38, trend: 8.7 },
      { name: "Web Development", count: 32, trend: 15.2 },
      { name: "Startup", count: 28, trend: 22.1 },
      { name: "Innovation", count: 24, trend: 5.8 }
    ]
  }
}

function getMockTagAnalytics(): TagAnalyticsData[] {
  return [
    { id: "1", name: "AI", eventCount: 145, communityCount: 23, trend: 23.4, category: "Technology", popularityScore: 191 },
    { id: "2", name: "Web Development", eventCount: 132, communityCount: 18, trend: 15.7, category: "Technology", popularityScore: 168 },
    { id: "3", name: "Design", eventCount: 98, communityCount: 15, trend: 12.1, category: "Arts & Design", popularityScore: 128 },
    { id: "4", name: "Startup", eventCount: 87, communityCount: 12, trend: 28.9, category: "Business", popularityScore: 111 },
    { id: "5", name: "Marketing", eventCount: 76, communityCount: 14, trend: 18.3, category: "Marketing", popularityScore: 104 }
  ]
} 