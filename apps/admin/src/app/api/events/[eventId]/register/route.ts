import { NextRequest, NextResponse } from 'next/server'
import { getEvent } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('apiKey')
    
    // Await params to get the eventId
    const { eventId } = await params

    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    // Get event details
    const eventResponse = await getEvent(eventId)
    if (!eventResponse.success) {
      return NextResponse.json({ error: eventResponse.error }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: eventResponse.data
    })
  } catch (error) {
    console.error('Event registration API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
