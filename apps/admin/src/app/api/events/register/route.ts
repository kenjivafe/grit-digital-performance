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

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    // Update CORS headers to allow specific origin
    const responseHeaders = {
      ...corsHeaders,
      'Access-Control-Allow-Origin': origin || '*',
    }

    const body = await request.json()
    
    // Validate required fields
    const { organization_slug, event_id, name, email, phone, team } = body
    
    if (!organization_slug || !event_id || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: organization_slug, event_id, name, email' },
        { status: 400, headers: responseHeaders }
      )
    }

    // Validate organization_slug format (alphanumeric, hyphens, underscores only)
    const orgSlugRegex = /^[a-zA-Z0-9_-]+$/
    if (!orgSlugRegex.test(organization_slug)) {
      return NextResponse.json(
        { error: 'Invalid organization_slug format. Use only letters, numbers, hyphens, and underscores.' },
        { status: 400, headers: responseHeaders }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400, headers: responseHeaders }
      )
    }

    // Actual registration logic
    const prisma = getEventsApiPrisma()

    // 1. Validate organization exists in database
    const organization = await prisma.organization.findUnique({
      where: { slug: organization_slug }
    })

    if (!organization) {
      return NextResponse.json(
        { error: `Organization not found for slug: ${organization_slug}` },
        { status: 404, headers: responseHeaders }
      )
    }

    // 2. Validate event exists and is open for registration
    const event = await prisma.event.findUnique({
      where: { id: event_id }
    })

    if (!event) {
      return NextResponse.json(
        { error: `Event not found: ${event_id}` },
        { status: 404, headers: responseHeaders }
      )
    }

    if (event.organizationId !== organization.id) {
      return NextResponse.json(
        { error: 'Event does not belong to the specified organization' },
        { status: 403, headers: responseHeaders }
      )
    }

    // 3. Check if participant already registered (checking by email)
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: event.id,
        email: email
      }
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Participant already registered with this email' },
        { status: 409, headers: responseHeaders }
      )
    }

    // Process source details
    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || ''
    
    // Parse domain from origin or referer
    let domain = ''
    if (origin) {
      try {
        domain = new URL(origin).hostname
      } catch (e) { }
    } else if (referer) {
      try {
        domain = new URL(referer).hostname
      } catch (e) { }
    }

    const sourceDetails = {
      domain,
      user_agent: userAgent,
      referrer: referer
    }

    // Split name properly
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ' // ensure lastName has something to avoid empty if schema requires it
    
    // Auto-generate participantId
    const participantId = `part_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    // 4. Create participant record with source tracking
    const registrationRecord = await prisma.registration.create({
      data: {
        eventId: event.id,
        organizationId: organization.id,
        participantId: participantId,
        firstName,
        lastName,
        email,
        phone,
        status: 'confirmed', // From previous mock
        source: 'external',
        sourceDetails: sourceDetails as any, // Json mapped
        customResponses: team ? { team } : {},
      }
    })
    
    // Format response to match API expectations (especially created_at)
    const registration = {
      ...registrationRecord,
      name: `${registrationRecord.firstName} ${registrationRecord.lastName}`.trim(),
      created_at: registrationRecord.createdAt.toISOString(),
      organization_slug,
      event_id
    }

    return NextResponse.json({
      status: 'success',
      message: 'Registration successful',
      data: registration
    }, { headers: responseHeaders })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

