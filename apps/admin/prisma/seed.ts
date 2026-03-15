import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding for Event Registration API...')

  // Create a sample organization for testing
  console.log('Creating sample organization...')
  const organization = await prisma.organization.create({
    data: {
      name: 'Tuguegarao League',
      slug: 'tuguegaraoleague',
      email: 'admin@tuguegaraoleague.com',
      phone: '+1234567890',
      website: 'https://tuguegaraoleague.com',
      description: 'A sports league organization in Tuguegarao City',
      domain: 'tuguegaraoleague.gritdp.com',
      address: '123 Main Street',
      city: 'Tuguegarao City',
      state: 'Cagayan',
      zipCode: '3500',
      country: 'Philippines',
      billingEmail: 'billing@tuguegaraoleague.com',
      active: true,
      verified: false,
    }
  })

  console.log('Created organization:', organization.name)

  // Create a sample event
  console.log('Creating sample event...')
  const event = await prisma.event.create({
    data: {
      organizationId: organization.id,
      name: 'Summer Basketball Tournament 2024',
      slug: 'summer-basketball-2024',
      description: 'Annual summer basketball tournament for local teams',
      startDate: new Date('2024-06-01T09:00:00Z'),
      endDate: new Date('2024-06-15T18:00:00Z'),
      location: 'Tuguegarao City Sports Complex',
      address: '123 Sports Complex Road',
      city: 'Tuguegarao City',
      state: 'Cagayan',
      zipCode: '3500',
      country: 'Philippines',
      maxParticipants: 100,
      price: 250.00,
      currency: 'PHP',
      registrationStart: new Date('2024-04-01T00:00:00Z'),
      registrationEnd: new Date('2024-05-31T23:59:59Z'),
      waitlistEnabled: true,
      requiresApproval: false,
      status: 'published',
      publishedAt: new Date(),
    }
  })

  console.log('Created event:', event.name)

  // Create a sample registration
  console.log('Creating sample registration...')
  const registration = await prisma.registration.create({
    data: {
      eventId: event.id,
      organizationId: organization.id,
      participantId: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+639123456789',
      dateOfBirth: new Date('1990-01-15'),
      gender: 'Male',
      emergencyContact: JSON.stringify({
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+639987654321'
      }),
      amount: 250.00,
      currency: 'PHP',
      status: 'confirmed',
      source: 'internal',
    }
  })

  console.log('Created registration for:', registration.firstName, registration.lastName)

  // Create Tabuk MMA Club
  console.log('Creating Tabuk MMA Club organization...')
  const tabukMMA = await prisma.organization.create({
    data: {
      name: 'Tabuk MMA Club',
      slug: 'tabuk-mma-club',
      email: 'info@tabukmma.com',
      phone: '+639123456780',
      website: 'https://tabukmma.com',
      description: 'The premier Mixed Martial Arts club in Tabuk City',
      domain: 'tabukmma.gritdp.com',
      city: 'Tabuk City',
      state: 'Kalinga',
      zipCode: '3800',
      country: 'Philippines',
      billingEmail: 'billing@tabukmma.com',
      active: true,
      verified: true,
    }
  })

  console.log('Created organization:', tabukMMA.name)

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
