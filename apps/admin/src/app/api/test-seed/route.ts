import { NextRequest, NextResponse } from 'next/server'
import { getEventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, eventId, orgSlug } = body
    const prisma = getEventsApiPrisma()

    if (action === 'seed') {
      const mockOrgSlug = orgSlug || 'test-registration-org'
      const mockEventId = eventId || 'evt_test_registration_flow'

      let org = await prisma.organization.findUnique({ where: { slug: mockOrgSlug } })
      if (!org) {
        org = await prisma.organization.create({
          data: {
            name: 'Test Registration Org',
            slug: mockOrgSlug,
            email: 'testorg@example.com',
            billingEmail: 'billing@example.com',
            apiKey: 'test_key_' + Date.now()
          }
        })
      }

      let evt = await prisma.event.findUnique({ where: { id: mockEventId } })
      if (!evt) {
        evt = await prisma.event.create({
          data: {
            id: mockEventId,
            name: 'Test Registration Flow Event',
            slug: 'test-registration-flow-event',
            organizationId: org.id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000),
            registrationStart: new Date(),
            registrationEnd: new Date(Date.now() + 86400000),
            price: 0,
            status: 'published'
          }
        })
      }

      return NextResponse.json({ success: true, org, event: evt })
    }

    if (action === 'teardown') {
      const mockOrgSlug = orgSlug || 'test-registration-org'
      const mockEventId = eventId || 'evt_test_registration_flow'

      await prisma.registration.deleteMany({
        where: { eventId: mockEventId }
      })
      await prisma.event.deleteMany({
        where: { id: mockEventId }
      })
      await prisma.organization.deleteMany({
        where: { slug: mockOrgSlug }
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
