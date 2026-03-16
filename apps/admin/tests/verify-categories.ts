import { listCategories, createCategory, updateCategory, deleteCategory, createEvent, listEvents, eventsApiPrisma } from '../src/lib/events-api'
import { PrismaClient } from '@prisma/client'

async function runVerification() {
  console.log('--- STARTING VERIFICATION ---')
  
  try {
    // 1. Get an existing organization
    const org = await eventsApiPrisma.organization.findFirst()
    if (!org) {
      console.log('No organization found, cannot verify.')
      return
    }
    console.log(`Verifying for organization: ${org.name} (${org.id})`)

    // 2. Create a category
    const catName = `Verification Category ${Date.now()}`
    const createResult = await createCategory(org.id, { 
      name: catName, 
      description: 'Test category for verification' 
    })
    
    if (!createResult.success || !createResult.data) {
      throw new Error(`Failed to create category: ${createResult.error}`)
    }
    const category = createResult.data
    console.log(`Created category: ${category.name} (${category.id})`)

    // 3. Update the category
    const updatedName = `${catName} Updated`
    const updateResult = await updateCategory(category.id, { name: updatedName })
    if (!updateResult.success) {
      throw new Error(`Failed to update category: ${updateResult.error}`)
    }
    console.log('Updated category name successfully')

    // 4. Create an event with this category
    const eventName = `Verification Event ${Date.now()}`
    const eventResult = await createEvent({
      organizationId: org.id,
      categoryId: category.id,
      name: eventName,
      startDate: new Date(),
      endDate: new Date(Date.now() + 3600000),
      registrationStart: new Date(),
      registrationEnd: new Date(Date.now() + 3600000),
      price: 0
    })

    if (!eventResult.success || !eventResult.data) {
       // Mock might be returned if id is org_test_123, but we used a real org id
       throw new Error(`Failed to create event: ${eventResult.error}`)
    }
    console.log(`Created event: ${eventResult.data.name} with categoryId: ${eventResult.data.categoryId}`)

    // 5. Clean up (optional but good for test)
    console.log('Cleaning up...')
    await eventsApiPrisma.event.delete({ where: { id: eventResult.data.id } })
    await deleteCategory(category.id)
    console.log('Cleanup successful')

    console.log('--- VERIFICATION SUCCESS ---')
  } catch (error) {
    console.error('--- VERIFICATION FAILED ---')
    console.error(error)
    process.exit(1)
  }
}

runVerification()
