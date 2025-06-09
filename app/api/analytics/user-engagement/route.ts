import { NextResponse } from 'next/server'
import { getUserEngagementData } from '@/lib/analytics-service'

export async function GET() {
  try {
    const data = await getUserEngagementData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch user engagement data:', error)
    return NextResponse.json({ error: 'Failed to fetch user engagement data' }, { status: 500 })
  }
} 