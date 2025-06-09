import { db } from './database'

export async function inspectDatabase() {
  try {
    // Count all major tables
    const [
      totalUsers,
      totalProfiles,
      totalCommunities,
      totalEvents,
      totalLogs,
      totalTrials,
      totalSubscriptions,
      totalPlans
    ] = await Promise.all([
      db.users.count(),
      db.userProfiles.count(),
      db.communities.count(),
      db.events.count(),
      db.logs.count(),
      db.planTrials.count(),
      db.subscriptions.count(),
      db.plans.count()
    ])

    // Get trial/subscription summary
    const activeTrials = await db.planTrials.count({
      where: { trialEnd: { gt: new Date() } }
    })
    const activeSubscriptions = await db.subscriptions.count({
      where: { isSubscriptionCancelled: false }
    })

    console.log(`🗂️ DB: Users(${totalUsers}) | Profiles(${totalProfiles}) | Communities(${totalCommunities}) | Events(${totalEvents}) | Logs(${totalLogs}) | Trials(${totalTrials}→${activeTrials} active) | Subs(${totalSubscriptions}→${activeSubscriptions} active) | Plans(${totalPlans})`)
    
  } catch (error) {
    console.error('❌ DB inspection failed:', error)
  }
} 