import { NextResponse } from 'next/server'
import { getCommunityLeaderboard } from '@/lib/analytics-service'

export async function GET() {
  try {
    console.log('🏆 Fetching community leaderboard data...')
    
    const data = await getCommunityLeaderboard()
    
    console.log(`🏆 Community Leaderboard: Returning ${data.length} communities`)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch community leaderboard data:', error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch community leaderboard data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 