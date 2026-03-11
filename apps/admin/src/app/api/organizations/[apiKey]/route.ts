import { NextRequest, NextResponse } from 'next/server'
import { getOrganizationByApiKey, getRevenueReport } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ apiKey: string }> }
) {
  try {
    // Await params to get the apiKey
    const { apiKey } = await params

    // Get organization details
    const orgResponse = await getOrganizationByApiKey(apiKey)
    if (!orgResponse.success) {
      const response = NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
      return response
    }

    const { searchParams } = new URL(request.url)
    const includeRevenue = searchParams.get('includeRevenue') === 'true'
    
    let data = orgResponse.data

    if (includeRevenue) {
      const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
      const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined
      
      const revenueResponse = await getRevenueReport(orgResponse.data!.id, startDate, endDate)
      if (revenueResponse.success) {
        data = {
          ...orgResponse.data,
          revenue: revenueResponse.data
        } as typeof orgResponse.data & { revenue: typeof revenueResponse.data }
      }
    }

    const result = NextResponse.json({
      success: true,
      data
    })
    
    // Add CORS headers to the response
    result.headers.set('Access-Control-Allow-Origin', '*')
    result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    result.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-key')
    
    return result
  } catch (error) {
    console.error('Organization API error:', error)
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
