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
    const event_id = searchParams.get('event_id')
    const source = searchParams.get('source') // 'external', 'internal', 'all'

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

    // Build query filters
    const where: Record<string, unknown> = {
      organizationId: organization.id,
      ...(event_id && { eventId: event_id }),
      ...(source && source !== 'all' && { source }),
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Map to public participant shape
    const participants = registrations.map((reg) => ({
      id: reg.id,
      event_id: reg.eventId,
      event: reg.event,
      name: `${reg.firstName} ${reg.lastName}`.trim(),
      email: reg.email,
      phone: reg.phone,
      status: reg.status,
      registration_date: reg.createdAt.toISOString(),
      source: reg.source,
      sourceDetails: reg.sourceDetails,
      source_details: reg.sourceDetails, // alias for compatibility
      organization: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
      },
    }))

    // Compute statistics
    const stats = {
      total: participants.length,
      by_status: {
        confirmed: participants.filter((p) => p.status === 'confirmed').length,
        waitlisted: participants.filter((p) => p.status === 'waitlisted').length,
        cancelled: participants.filter((p) => p.status === 'cancelled').length,
        pending: participants.filter((p) => p.status === 'pending').length,
      },
      by_source: {
        external: participants.filter((p) => p.source === 'external').length,
        internal: participants.filter((p) => p.source === 'internal').length,
      },
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          participants,
          stats,
          filters: {
            organization_slug,
            event_id,
            source,
          },
        },
      },
      { headers: responseHeaders }
    )
  } catch (error) {
    console.error('Participants API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}
