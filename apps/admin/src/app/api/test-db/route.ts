import { NextRequest, NextResponse } from 'next/server'
import { getEventsApiPrisma } from '@/lib/events-api'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length)
    
    const prisma = getEventsApiPrisma()
    
    // Test basic connection
    await prisma.$connect()
    console.log('Database connection successful')
    
    // Test simple query
    const count = await prisma.organization.count()
    console.log('Organization count:', count)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection working',
      organizationCount: count,
      databaseUrl: process.env.DATABASE_URL?.substring(0, 20) + '...' // Show first 20 chars for debugging
    })
    
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrlExists: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length
    }, { status: 500 })
  }
}
