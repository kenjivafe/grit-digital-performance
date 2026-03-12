import { NextRequest, NextResponse } from 'next/server'
import { getOrganizationByApiKey, createOrganization, eventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const orgs = await eventsApiPrisma.organization.findMany({
      include: {
        _count: {
          select: {
            events: true,
            registrations: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const result = NextResponse.json({
      success: true,
      data: orgs
    })
    
    // Add CORS headers
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organizations API error:', error)
    
    const response = NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create organization
    const orgResponse = await createOrganization(body)
    if (!orgResponse.success) {
      const response = NextResponse.json({ error: orgResponse.error }, { status: 400 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    const result = NextResponse.json({
      success: true,
      data: orgResponse.data
    })
    
    // Add CORS headers
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organizations API error:', error)
    const response = NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      const response = NextResponse.json({ error: 'Organization ID is required' }, { status: 400 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    // Update organization
    const organization = await eventsApiPrisma.organization.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: {
            events: true,
            registrations: true
          }
        }
      }
    })

    const result = NextResponse.json({
      success: true,
      data: organization
    })
    
    // Add CORS headers
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organization update error:', error)
    const response = NextResponse.json({ 
      error: 'Failed to update organization',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
  return response
}


