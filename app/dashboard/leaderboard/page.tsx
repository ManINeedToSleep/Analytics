import { PageHeader } from "@/components/ui/page-header"
import { CommunityLeaderboard } from "@/components/dashboard/communities/community-leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <PageHeader 
        title="Community Leaderboard"
        description="Top performing communities ranked by engagement, growth, and activity"
      />
      <CommunityLeaderboard />
    </div>
  )
} 