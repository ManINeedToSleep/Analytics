import { NextResponse } from 'next/server'
import { getPlatformGrowthData } from '@/lib/analytics-service'

export async function GET() {
  try {
    const data = await getPlatformGrowthData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch platform growth data:', error)
    return NextResponse.json({ error: 'Failed to fetch platform growth data' }, { status: 500 })
  }
} 