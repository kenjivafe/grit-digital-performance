import { NextRequest, NextResponse } from 'next/server'
import { getOrganizationByApiKey, createOrganization, eventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Force the correct DATABASE_URL
    process.env.DATABASE_URL = "postgres://71d12fdf9fd660836718242fde9035600092e02601a28e234967e4666d393233:sk_Ut9JqPKd30YWtMFM5b3PO@db.prisma.io:5432/postgres?sslmode=require"
    
    console.log('GET /api/organizations - fetching organizations')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length)
    console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 50) + '...')
    
    // Test basic connection first
    console.log('Testing database connection...')
    await eventsApiPrisma.$connect()
    console.log('Database connected successfully')
    
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

    console.log('Found organizations:', orgs.length)

    const result = NextResponse.json({
      success: true,
      data: orgs
    })
    
    // Add CORS headers
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organizations API error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
    
    const response = NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
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
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organizations API error:', error)
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


