import { CommunityTable } from "@/components/dashboard/community-table"
import { CommunityDetailedAnalytics } from "@/components/dashboard/community-detailed-analytics"

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 max-w-full">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Communities</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Detailed analytics for individual communities</p>
        </div>

        <CommunityTable />

        <CommunityDetailedAnalytics />
      </div>
    </div>
  )
}
