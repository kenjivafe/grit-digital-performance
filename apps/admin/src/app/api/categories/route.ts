import { NextRequest, NextResponse } from 'next/server'
import { getOrganizationByApiKey } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey) {
      const response = NextResponse.json({ error: 'API key required' }, { status: 401 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    // Verify organization
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      const response = NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    // For now, return mock categories since there's no categories table in the database
    // In a real implementation, you'd have a categories table and query it
    const mockCategories = [
      {
        id: 'cat_1',
        name: 'Basketball',
        slug: 'basketball',
        description: 'Basketball events and tournaments',
        navigationOrder: 1,
        showInNavigation: true,
        organizationId: orgResponse.data!.id
      },
      {
        id: 'cat_2',
        name: 'Training',
        slug: 'training',
        description: 'Training camps and clinics',
        navigationOrder: 2,
        showInNavigation: true,
        organizationId: orgResponse.data!.id
      },
      {
        id: 'cat_3',
        name: 'Tournaments',
        slug: 'tournaments',
        description: 'Competitive tournaments and leagues',
        navigationOrder: 3,
        showInNavigation: true,
        organizationId: orgResponse.data!.id
      }
    ]

    const result = NextResponse.json({
      success: true,
      data: mockCategories
    })
    
    // Add CORS headers to the response
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Categories API error:', error)
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
