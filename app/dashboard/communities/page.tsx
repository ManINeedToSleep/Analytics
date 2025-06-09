import { PageHeader } from "@/components/ui/page-header"
import { CommunitiesOverview } from "@/components/dashboard/communities-overview"
import { CommunityDetails } from "@/components/dashboard/community-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CommunitiesPageProps {
  searchParams: Promise<{
    id?: string
    view?: string
  }>
}

export default async function CommunitiesPage({ searchParams }: CommunitiesPageProps) {
  const { id, view } = await searchParams
  
  // If ID is provided, show individual community details
  if (id) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <PageHeader 
          title="Community Analytics"
          description="In-depth analytics and insights for this specific community"
          actions={
            <Link href="/dashboard/communities">
              <Button variant="outline" className="bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
          }
        />
        <CommunityDetails communityId={id} />
      </div>
    )
  }
  
  // Default overview page
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <PageHeader 
        title="Communities Analytics"
        description="Comprehensive overview of all community data, growth, and engagement metrics"
      />
      <CommunitiesOverview />
    </div>
  )
}
