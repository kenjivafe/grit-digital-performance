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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const responseHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin || '*',
    }

    const { eventId } = await params

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400, headers: responseHeaders }
      )
    }

    const { searchParams } = new URL(request.url)
    const organization_slug = searchParams.get('organization_slug')

    const prisma = getEventsApiPrisma()

    // Find event by ID, include org and confirmed registrations count
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organization: true,
        _count: {
          select: {
            registrations: {
              where: { status: 'confirmed' },
            },
          },
        },
      },
    })

    if (!event) {
      return NextResponse.json(
        { error: `Event not found: ${eventId}` },
        { status: 404, headers: responseHeaders }
      )
    }

    // If organization_slug provided, verify the event belongs to that org
    if (organization_slug && event.organization.slug !== organization_slug) {
      return NextResponse.json(
        { error: 'Event does not belong to the specified organization' },
        { status: 403, headers: responseHeaders }
      )
    }

    const now = new Date()

    // Derive registration_status
    let registration_status = 'closed'
    if (event.status === 'published') {
      if (event.registrationStart <= now && event.registrationEnd >= now) {
        registration_status = 'open'
      } else if (event.registrationStart > now) {
        registration_status = 'upcoming'
      }
    }

    const publicEvent = {
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.startDate.toISOString(),
      end_date: event.endDate.toISOString(),
      location: event.location,
      address: event.address,
      max_participants: event.maxParticipants,
      current_participants: event._count.registrations,
      registration_status,
      registration_deadline: event.registrationEnd.toISOString(),
      entry_fee: Number(event.price),
      organization: {
        id: event.organization.id,
        name: event.organization.name,
        slug: event.organization.slug,
        domain: event.organization.domain,
      },
      created_at: event.createdAt.toISOString(),
      updated_at: event.updatedAt.toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        data: publicEvent,
      },
      { headers: responseHeaders }
    )
  } catch (error) {
    console.error('Public Event Details API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
