import { PageHeader } from "@/components/ui/page-header"
import { CommunityLeaderboard } from "@/components/dashboard/communities/community-leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <PageHeader 
        title="Community Leaderboard"
        description="Communities ranked by member count and event activity • 15 per page • 3 pages preloaded for seamless navigation"
      />
      <CommunityLeaderboard />
    </div>
  )
} 