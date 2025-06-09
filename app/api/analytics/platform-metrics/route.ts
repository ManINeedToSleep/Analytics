import { NextResponse } from 'next/server'
import { getPlatformMetricsData } from '@/lib/analytics-service'

export async function GET() {
  try {
    const data = await getPlatformMetricsData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch platform metrics data:', error)
    return NextResponse.json({ error: 'Failed to fetch platform metrics data' }, { status: 500 })
  }
} 