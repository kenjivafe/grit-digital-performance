import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getEventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

export async function GET(request: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const responseHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin || '*',
    }

    const { searchParams } = new URL(request.url)
    const organization_slug = searchParams.get('organization_slug')
    const status = searchParams.get('status') || undefined

    if (!organization_slug) {
      return NextResponse.json(
        { error: 'organization_slug parameter is required' },
        { status: 400, headers: responseHeaders }
      )
    }

    // Validate organization_slug format
    const orgSlugRegex = /^[a-zA-Z0-9_-]+$/
    if (!orgSlugRegex.test(organization_slug)) {
      return NextResponse.json(
        { error: 'Invalid organization_slug format' },
        { status: 400, headers: responseHeaders }
      )
    }

    const prisma = getEventsApiPrisma()

    // Find organization by slug
    const organization = await prisma.organization.findUnique({
      where: { slug: organization_slug },
    })

    if (!organization) {
      return NextResponse.json(
        { error: `Organization not found: ${organization_slug}` },
        { status: 404, headers: responseHeaders }
      )
    }

    // Query events for this organization
    const events = await prisma.event.findMany({
      where: {
        organizationId: organization.id,
        ...(status && { status }),
      },
      include: {
        _count: {
          select: {
            registrations: {
              where: { status: 'confirmed' },
            },
          },
        },
        organization: true,
      },
      orderBy: { startDate: 'asc' },
    })

    const now = new Date()

    const publicEvents = events.map((event) => {
      // Derive registration_status
      let registration_status = 'closed'
      if (event.status === 'published') {
        if (event.registrationStart <= now && event.registrationEnd >= now) {
          registration_status = 'open'
        } else if (event.registrationStart > now) {
          registration_status = 'upcoming'
        }
      }

      return {
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.startDate.toISOString(),
        end_date: event.endDate.toISOString(),
        location: event.location,
        max_participants: event.maxParticipants,
        current_participants: event._count.registrations,
        registration_status,
        registration_deadline: event.registrationEnd.toISOString(),
        entry_fee: Number(event.price),
        organization: {
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
        },
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          events: publicEvents,
          total: publicEvents.length,
          organization: {
            slug: organization.slug,
            name: organization.name,
          },
        },
      },
      { headers: responseHeaders }
    )
  } catch (error) {
    console.error('Public Events API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
