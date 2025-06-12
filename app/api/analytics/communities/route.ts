import { NextResponse } from 'next/server'
import { db as prisma } from '@/lib/database'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    const communityId = searchParams.get('communityId')
    
    console.log('🏢 Fetching community analytics data...', { timeRange, communityId })

    // Calculate date ranges
    const now = new Date()
    const daysBack = timeRange === '7d' ? 7 : timeRange === '90d' ? 90 : 30
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000))
    const previousPeriodStart = new Date(startDate.getTime() - (daysBack * 24 * 60 * 60 * 1000))

    if (communityId) {
      // Individual community analytics
      const communityAnalytics = await getIndividualCommunityAnalytics(communityId, startDate, previousPeriodStart)
      return NextResponse.json(communityAnalytics)
    } else {
      // All communities overview analytics
      const overviewAnalytics = await getAllCommunitiesAnalytics(startDate, previousPeriodStart)
      return NextResponse.json(overviewAnalytics)
    }

  } catch (error) {
    console.error('Failed to fetch community analytics:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch community analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

async function getAllCommunitiesAnalytics(startDate: Date, previousPeriodStart: Date) {
  try {
    // ✅ CONFIRMED VIABLE: Total Communities & Growth
    const [totalCommunities, totalCommunitiesPrevious] = await Promise.all([
      prisma.communities.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      prisma.communities.count({
        where: {
          createdAt: { 
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      })
    ])

    // ✅ CONFIRMED VIABLE: Total Members Across All Communities
    const [totalMembers, totalMembersPrevious] = await Promise.all([
      prisma.communityConnections.count({
        where: {
          status: 'ACCEPTED',
          joinDate: { gte: startDate }
        }
      }),
      prisma.communityConnections.count({
        where: {
          status: 'ACCEPTED',
          joinDate: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      })
    ])

    // ✅ CONFIRMED VIABLE: Total Events Created
    const [totalEvents, totalEventsPrevious] = await Promise.all([
      prisma.events.count({
        where: {
          createdAt: { gte: startDate },
          isDeleted: false
        }
      }),
      prisma.events.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          },
          isDeleted: false
        }
      })
    ])

    // ✅ CONFIRMED VIABLE: Active Communities (with recent member activity)
    const activeCommunities = await prisma.communities.count({
      where: {
        CommunityConnections: {
          some: {
            updatedAt: { gte: startDate }
          }
        }
      }
    })

    // ✅ CONFIRMED VIABLE: Top Growing Communities
    const topGrowingCommunities = await prisma.communities.findMany({
      select: {
        id: true,
        cardName: true,
        avatar: true,
        memberCount: true,
        createdAt: true,
        CommunityConnections: {
          where: {
            joinDate: { gte: startDate },
            status: 'ACCEPTED'
          },
          select: { id: true }
        },
        communityEvents: {
          where: {
            event: {
              createdAt: { gte: startDate },
              isDeleted: false
            }
          },
          select: { id: true }
        }
      },
      orderBy: {
        memberCount: 'desc'
      },
      take: 10
    })

    // ✅ CONFIRMED VIABLE: Community Growth Over Time
    const growthData = await getCommunityGrowthData(startDate)

    // ✅ CONFIRMED VIABLE: Referral Analytics
    const referralStats = await prisma.communityReferrals.groupBy({
      by: ['status'],
      where: {
        createdAt: { gte: startDate }
      },
      _count: {
        id: true
      }
    })

    const successfulReferrals = referralStats.find(r => r.status === true)?._count.id || 0
    const totalReferrals = referralStats.reduce((sum, r) => sum + r._count.id, 0)
    const referralSuccessRate = totalReferrals > 0 ? (successfulReferrals / totalReferrals) * 100 : 0

    return {
      overview: {
        totalCommunities: {
          current: totalCommunities,
          previous: totalCommunitiesPrevious,
          change: totalCommunities - totalCommunitiesPrevious,
          isPositive: totalCommunities >= totalCommunitiesPrevious
        },
        totalMembers: {
          current: totalMembers,
          previous: totalMembersPrevious,
          change: totalMembers - totalMembersPrevious,
          isPositive: totalMembers >= totalMembersPrevious
        },
        totalEvents: {
          current: totalEvents,
          previous: totalEventsPrevious,
          change: totalEvents - totalEventsPrevious,
          isPositive: totalEvents >= totalEventsPrevious
        },
        activeCommunities: {
          current: activeCommunities,
          percentage: totalCommunities > 0 ? (activeCommunities / totalCommunities) * 100 : 0
        },
        referralSuccessRate: {
          rate: referralSuccessRate,
          total: totalReferrals,
          successful: successfulReferrals
        }
      },
      topGrowingCommunities: topGrowingCommunities.map(community => ({
        id: community.id,
        name: community.cardName,
        avatar: community.avatar,
        memberCount: community.memberCount,
        newMembers: community.CommunityConnections.length,
        newEvents: community.communityEvents.length,
        growthScore: (community.CommunityConnections.length * 0.7) + (community.communityEvents.length * 100)
      })),
      growthData,
      dataSource: 'prisma' // ✅ Confirmed data source
    }

  } catch (error) {
    console.error('Error in getAllCommunitiesAnalytics:', error)
    throw error
  }
}

async function getIndividualCommunityAnalytics(communityId: string, startDate: Date, previousPeriodStart: Date) {
  try {
    // ✅ CONFIRMED VIABLE: Individual Community Data
    const community = await prisma.communities.findUnique({
      where: { id: communityId },
      include: {
        profileCommunities: {
          select: {
            profileName: true,
            avatar: true
          }
        },
        CommunityConnections: {
          include: {
            profile: {
              select: {
                id: true,
                profileName: true,
                avatar: true
              }
            }
          },
          orderBy: {
            joinDate: 'desc'
          }
        },
        communityEvents: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                startDate: true,
                createdAt: true,
                eventParticipants: {
                  select: { id: true, status: true }
                }
              }
            }
          },
          where: {
            event: {
              isDeleted: false
            }
          }
        },
        communityReferrals: {
          where: {
            createdAt: { gte: startDate }
          }
        }
      }
    })

    if (!community) {
      throw new Error('Community not found')
    }

    // ✅ CONFIRMED VIABLE: Member Growth Analysis
    const memberGrowthData = await getMemberGrowthData(communityId, startDate)

    // ✅ CONFIRMED VIABLE: Event Analytics
    const eventAnalytics = await getEventAnalytics(communityId, startDate)

    // ✅ CONFIRMED VIABLE: Member Segmentation (Basic)
    const memberSegments = await getMemberSegmentation(communityId, startDate)

    // ✅ CONFIRMED VIABLE: Retention Analysis
    const retentionAnalysis = await getRetentionAnalysis(communityId, startDate, previousPeriodStart)

    return {
      community: {
        id: community.id,
        name: community.cardName,
        avatar: community.avatar,
        memberCount: community.memberCount,
        about: community.about,
        createdAt: community.createdAt,
        creator: community.profileCommunities
      },
      analytics: {
        memberGrowth: memberGrowthData,
        eventAnalytics,
        memberSegments,
        retentionAnalysis,
        referrals: {
          total: community.communityReferrals.length,
          successful: community.communityReferrals.filter(r => r.status).length,
          successRate: community.communityReferrals.length > 0 
            ? (community.communityReferrals.filter(r => r.status).length / community.communityReferrals.length) * 100 
            : 0
        }
      },
      recentMembers: community.CommunityConnections
        .filter(conn => conn.status === 'ACCEPTED')
        .slice(0, 10)
        .map(conn => ({
          id: conn.profile.id,
          name: conn.profile.profileName,
          avatar: conn.profile.avatar,
          joinDate: conn.joinDate
        })),
      dataSource: 'prisma' // ✅ Confirmed data source
    }

  } catch (error) {
    console.error('Error in getIndividualCommunityAnalytics:', error)
    throw error
  }
}

async function getCommunityGrowthData(startDate: Date) {
  // ✅ CONFIRMED VIABLE: Community growth over time using join dates
  const growthData = await prisma.$queryRaw`
    SELECT 
      DATE("joinDate") as date,
      COUNT(*) as new_members,
      COUNT(DISTINCT "communityId") as active_communities
    FROM "CommunityConnections"
    WHERE "joinDate" >= ${startDate}
      AND status = 'ACCEPTED'
    GROUP BY DATE("joinDate")
    ORDER BY date ASC
  ` as Array<{ date: Date; new_members: bigint; active_communities: bigint }>

  return growthData.map(item => ({
    date: item.date.toISOString().split('T')[0],
    newMembers: Number(item.new_members),
    activeCommunities: Number(item.active_communities)
  }))
}

async function getMemberGrowthData(communityId: string, startDate: Date) {
  // ✅ CONFIRMED VIABLE: Member growth for specific community
  const growthData = await prisma.$queryRaw`
    SELECT 
      DATE("joinDate") as date,
      COUNT(*) as new_members
    FROM "CommunityConnections"
    WHERE "communityId" = ${communityId}
      AND "joinDate" >= ${startDate}
      AND status = 'ACCEPTED'
    GROUP BY DATE("joinDate")
    ORDER BY date ASC
  ` as Array<{ date: Date; new_members: bigint }>

  return growthData.map(item => ({
    date: item.date.toISOString().split('T')[0],
    newMembers: Number(item.new_members)
  }))
}

async function getEventAnalytics(communityId: string, startDate: Date) {
  // ✅ CONFIRMED VIABLE: Event analytics using EventLink and EventParticipants
  const events = await prisma.eventLink.findMany({
    where: {
      communityId,
      event: {
        createdAt: { gte: startDate },
        isDeleted: false
      }
    },
    include: {
      event: {
        include: {
          eventParticipants: true
        }
      }
    }
  })

  const totalEvents = events.length
  const totalRSVPs = events.reduce((sum, eventLink) => 
    sum + eventLink.event.eventParticipants.length, 0)
  const totalAttending = events.reduce((sum, eventLink) => 
    sum + eventLink.event.eventParticipants.filter(p => p.status === 'ATTENDING').length, 0)

  return {
    totalEvents,
    totalRSVPs,
    totalAttending,
    attendanceRate: totalRSVPs > 0 ? (totalAttending / totalRSVPs) * 100 : 0,
    averageRSVPsPerEvent: totalEvents > 0 ? totalRSVPs / totalEvents : 0
  }
}

async function getMemberSegmentation(communityId: string, startDate: Date) {
  // ✅ CONFIRMED VIABLE: Basic member segmentation using available data
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
  const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000))

  const [
    newMembers,
    activeMembers,
    eventParticipants,
    dormantMembers
  ] = await Promise.all([
    // New members (joined in last 30 days)
    prisma.communityConnections.count({
      where: {
        communityId,
        joinDate: { gte: thirtyDaysAgo },
        status: 'ACCEPTED'
      }
    }),
    // Active members (updated in last 7 days)
    prisma.communityConnections.count({
      where: {
        communityId,
        updatedAt: { gte: sevenDaysAgo },
        status: 'ACCEPTED'
      }
    }),
    // Event participants
    prisma.communityConnections.count({
      where: {
        communityId,
        status: 'ACCEPTED',
        profile: {
          pventParticipantProfile: {
            some: {
              events: {
                eventLinks: {
                  some: {
                    communityId
                  }
                }
              }
            }
          }
        }
      }
    }),
    // Dormant members (no activity in 30+ days)
    prisma.communityConnections.count({
      where: {
        communityId,
        updatedAt: { lt: thirtyDaysAgo },
        status: 'ACCEPTED'
      }
    })
  ])

  const totalMembers = await prisma.communityConnections.count({
    where: {
      communityId,
      status: 'ACCEPTED'
    }
  })

  return {
    newMembers: { count: newMembers, percentage: totalMembers > 0 ? (newMembers / totalMembers) * 100 : 0 },
    activeMembers: { count: activeMembers, percentage: totalMembers > 0 ? (activeMembers / totalMembers) * 100 : 0 },
    eventParticipants: { count: eventParticipants, percentage: totalMembers > 0 ? (eventParticipants / totalMembers) * 100 : 0 },
    dormantMembers: { count: dormantMembers, percentage: totalMembers > 0 ? (dormantMembers / totalMembers) * 100 : 0 },
    totalMembers
  }
}

async function getRetentionAnalysis(communityId: string, startDate: Date, previousPeriodStart: Date) {
  // ✅ CONFIRMED VIABLE: Basic retention analysis using join dates and activity
  const [
    day7Cohort,
    day7Retained,
    day30Cohort,
    day30Retained,
    churnedMembers
  ] = await Promise.all([
    // Members who joined 7+ days ago
    prisma.communityConnections.count({
      where: {
        communityId,
        joinDate: { 
          gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
          lt: startDate
        },
        status: 'ACCEPTED'
      }
    }),
    // Of those, how many are still active
    prisma.communityConnections.count({
      where: {
        communityId,
        joinDate: { 
          gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)),
          lt: startDate
        },
        updatedAt: { gte: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)) },
        status: 'ACCEPTED'
      }
    }),
    // Members who joined 30+ days ago
    prisma.communityConnections.count({
      where: {
        communityId,
        joinDate: { 
          gte: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)),
          lt: startDate
        },
        status: 'ACCEPTED'
      }
    }),
    // Of those, how many are still active
    prisma.communityConnections.count({
      where: {
        communityId,
        joinDate: { 
          gte: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)),
          lt: startDate
        },
        updatedAt: { gte: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) },
        status: 'ACCEPTED'
      }
    }),
    // Churned members (inactive for 30+ days)
    prisma.communityConnections.count({
      where: {
        communityId,
        updatedAt: { lt: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) },
        status: 'ACCEPTED'
      }
    })
  ])

  return {
    day7Retention: day7Cohort > 0 ? (day7Retained / day7Cohort) * 100 : 0,
    day30Retention: day30Cohort > 0 ? (day30Retained / day30Cohort) * 100 : 0,
    churnRate: churnedMembers,
    cohortSizes: {
      day7: day7Cohort,
      day30: day30Cohort
    }
  }
} 