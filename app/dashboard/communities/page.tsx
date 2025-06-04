import { CommunityTable } from "@/components/dashboard/community-table"
import { CommunityDetailedAnalytics } from "@/components/dashboard/community-detailed-analytics"
import { PageHeader } from "@/components/ui/page-header"

export default function CommunitiesPage() {
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <div className="space-y-6 p-6 max-w-full">
        <PageHeader 
          title="Communities"
          description="Detailed analytics and management for individual communities with creator transparency"
        />

        <CommunityTable />

        <CommunityDetailedAnalytics />
      </div>
    </div>
  )
}
