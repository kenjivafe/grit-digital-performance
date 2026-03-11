import { NextRequest, NextResponse } from 'next/server'
import { getEventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Check if this is an admin request (no API key needed for internal admin)
    const { searchParams } = new URL(request.url)
    const admin = searchParams.get('admin')
    
    if (admin === 'true') {
      // Admin access - get all registrations without API key
      const prisma = getEventsApiPrisma()
      
      const registrations = await prisma.registration.findMany({
        include: {
          event: {
            select: {
              id: true,
              name: true,
              startDate: true,
              endDate: true,
              price: true,
              currency: true
            }
          },
          organization: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json({
        success: true,
        data: registrations
      })
    }

    // Original API key logic for external API access
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    const eventId = searchParams.get('eventId')
    const status = searchParams.get('status') || undefined

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
    }

    // Verify organization
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    // List registrations
    const registrationsResponse = await listRegistrations(eventId, orgResponse.data!.id, status)
    if (!registrationsResponse.success) {
      return NextResponse.json({ error: registrationsResponse.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: registrationsResponse.data
    })
  } catch (error) {
    console.error('Registrations API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 401 })
    }

    // Verify organization
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const body = await request.json()
    
    // Create registration
    const registrationResponse = await createRegistration({
      ...body,
      organizationId: orgResponse.data!.id
    })

    if (!registrationResponse.success) {
      return NextResponse.json({ error: registrationResponse.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: registrationResponse.data
    })
  } catch (error) {
    console.error('Registrations API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


