import { NextResponse } from 'next/server'
import { getTagAnalytics } from '@/lib/analytics-service'

export async function GET() {
  try {
    console.log('🏷️ Fetching tag analytics data...')
    
    const data = await getTagAnalytics()
    
    console.log(`🏷️ Tag Analytics: Returning ${data.length} tags`)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch tag analytics data:', error)
    
    return NextResponse.json({ 
      error: 'Failed to fetch tag analytics data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 