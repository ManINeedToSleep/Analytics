import { NextRequest, NextResponse } from 'next/server'
import { getCommunityDetails } from '@/lib/analytics-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const communityId = searchParams.get('id')
    
    if (!communityId) {
      return NextResponse.json({ 
        error: 'Community ID is required',
        details: 'Please provide a community ID via ?id= query parameter'
      }, { status: 400 })
    }
    
    console.log(`🔍 Fetching community details for ID: ${communityId}`)
    
    const data = await getCommunityDetails(communityId)
    
    if (!data) {
      return NextResponse.json({ 
        error: 'Community not found',
        details: `No community found with ID: ${communityId}`
      }, { status: 404 })
    }
    
    console.log(`🔍 Community Details: ${data.name} - ${data.memberCount} members, ${data.tags.length} tags`)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch community details:', error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch community details',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 