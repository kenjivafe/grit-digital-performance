import { NextRequest, NextResponse } from 'next/server'
import { eventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const organization = await eventsApiPrisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            events: true,
            registrations: true
          }
        }
      }
    })

    if (!organization) {
      const response = NextResponse.json({ 
        error: 'Organization not found' 
      }, { status: 404 })
      
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      
      return response
    }

    const result = NextResponse.json({
      success: true,
      data: organization
    })
    
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organization GET error:', error)
    
    const response = NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const organization = await eventsApiPrisma.organization.update({
      where: { id },
      data: body,
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
    
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organization update error:', error)
    
    const response = NextResponse.json({ 
      error: 'Failed to update organization',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await eventsApiPrisma.organization.delete({
      where: { id }
    })

    const result = NextResponse.json({
      success: true,
      message: 'Organization deleted successfully'
    })
    
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organization delete error:', error)
    
    const response = NextResponse.json({ 
      error: 'Failed to delete organization',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
    
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    return response
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
  return response
}
