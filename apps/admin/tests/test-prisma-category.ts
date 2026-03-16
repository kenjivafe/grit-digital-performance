import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()
  try {
    console.log('Testing Prisma Category model...')
    console.log('Category delegate exists:', typeof prisma.category)
    
    // Check Event model for categoryId
    console.log('Event delegate exists:', typeof prisma.event)
    
    // List all methods on prisma.category if it exists
    if (prisma.category) {
      console.log('Category methods:', Object.keys(prisma.category))
    }
  } catch (error) {
    console.error('Error during verification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
