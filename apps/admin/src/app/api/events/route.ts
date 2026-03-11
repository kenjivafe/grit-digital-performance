import { NextRequest, NextResponse } from 'next/server'
import { getEventsApiPrisma, getOrganizationByApiKey, listEvents, createEvent } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check if this is an admin request (no API key needed for internal admin)
    const { searchParams } = new URL(request.url)
    const admin = searchParams.get('admin')
    
    if (admin === 'true') {
      // Admin access - get all events without API key
      const prisma = getEventsApiPrisma()
      
      const events = await prisma.event.findMany({
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json({
        success: true,
        data: events
      })
    }

    // Original API key logic for external API access
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    const status = searchParams.get('status') || undefined

    // Verify organization
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    // List events
    const eventsResponse = await listEvents(orgResponse.data!.id, status)
    if (!eventsResponse.success) {
      return NextResponse.json({ error: eventsResponse.error }, { status: 500 })
    }

    const result = NextResponse.json({
      success: true,
      data: eventsResponse.data
    })
    
    // Add CORS headers to the response
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      const response = NextResponse.json({ error: 'API key required' }, { status: 401 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined

    // Verify organization
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      const response = NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    const body = await request.json()
    
    // Create event
    const eventResponse = await createEvent({
      ...body,
      organizationId: orgResponse.data!.id
    })

    if (!eventResponse.success) {
      const response = NextResponse.json({ error: eventResponse.error }, { status: 400 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    const result = NextResponse.json({
      success: true,
      data: eventResponse.data
    })
    
    // Add CORS headers to the response
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Events API error:', error)
    const response = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function OPTIONS(request: NextRequest) {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
  return response
}
