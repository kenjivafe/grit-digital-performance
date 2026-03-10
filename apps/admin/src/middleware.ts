import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of allowed client site domains
const allowedOrigins = [
  'https://gritdp.com',
  'https://admin.gritdp.com',
  // Add client organization domains as they are created
  // 'https://tuguegaraoleague.gritdp.com',
  // 'https://spupathletics.gritdp.com',
  // 'https://cagayanbasketball.gritdp.com',
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return NextResponse.next()
    }
    
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
      const response = NextResponse.next()
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Vary', 'Origin')
      return response
    }
    
    // For development, allow localhost
    if (origin?.includes('localhost') || origin?.includes('127.0.0.1')) {
      const response = NextResponse.next()
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
