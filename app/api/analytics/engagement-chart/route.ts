import { NextResponse } from 'next/server'
import { getEngagementChartData } from '@/lib/analytics-service'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') as '7d' | '30d' | '90d' | '1y' || '30d'
    
    console.log(`📊 Engagement Chart API: timeRange=${timeRange}`)
    
    const data = await getEngagementChartData(timeRange)
    
    console.log(`📊 Engagement Chart API: Returning ${data.length} data points`)
    console.log(`📊 Sample data point:`, data[0])
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch engagement chart data:', error)
    
    // Return more detailed error information
    return NextResponse.json({ 
      error: 'Failed to fetch engagement chart data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 