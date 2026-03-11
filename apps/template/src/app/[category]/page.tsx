'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Layout, Container } from '@/components/Layout'
import { CategoryHero } from '@/components/CategoryHero'
import { EventCard } from '@/components/EventCard'
import { RegistrationModal } from '@/components/RegistrationModal'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useCategories, useEvents } from '@/lib/hooks'
import { Event, Category } from '@/lib/api'

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.category as string
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'price'>('date')
  
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useCategories()
  const { data: events, loading: eventsLoading, error: eventsError } = useEvents(categorySlug)

  // Derive current category from categories and params
  const currentCategory = categories ? categories.find(cat => cat.slug === categorySlug) : null

  useEffect(() => {
    if (categories && categorySlug && !currentCategory) {
      router.push('/')
    }
  }, [categories, categorySlug, currentCategory, router])

  const handleSortChange = (newSortBy: 'date' | 'name' | 'price') => {
    setSortBy(newSortBy)
  }

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleRegistrationSuccess = () => {
    setSelectedEvent(null)
    setIsModalOpen(false)
  }

  // Sort events based on selected criteria
  const sortedEvents = events ? [...events].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return parseFloat(a.price.toString()) - parseFloat(b.price.toString())
      default:
        return 0
    }
  }) : []

  if (categoriesLoading || eventsLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          {/* Category Hero Skeleton */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <Container>
              <div className="py-16">
                <div className="text-center">
                  <div className="h-8 bg-blue-500 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-4 bg-blue-400 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            </Container>
          </div>

          {/* Events Skeleton */}
          <Container>
            <div className="py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    )
  }

  if (categoriesError || eventsError) {
    return (
      <Layout>
        <Container>
          <div className="py-16">
            <ErrorMessage
              message={categoriesError || eventsError || 'Failed to load category content'}
              onRetry={() => window.location.reload()}
            />
          </div>
        </Container>
      </Layout>
    )
  }

  if (!currentCategory) {
    return (
      <Layout>
        <Container>
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
            <p className="text-gray-600 mb-6">
              The category "{categorySlug}" was not found.
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Category Hero */}
      <CategoryHero 
        category={currentCategory}
        eventCount={events?.length || 0}
      />

      {/* Events Section */}
      <Container>
        <div id="events" className="py-16">
          {events && events.length > 0 ? (
            <>
              {/* Section Header with Sorting */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentCategory.name} Events
                  </h2>
                  <p className="text-lg text-gray-600">
                    Browse and register for upcoming {currentCategory.name.toLowerCase()} events
                  </p>
                </div>
                
                {/* Sorting Controls */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as 'date' | 'name' | 'price')}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleRegister}
                  />
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No {currentCategory.name} Events Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no events scheduled in the {currentCategory.name.toLowerCase()} category. 
                Check back soon for upcoming events and tournaments.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse All Events
                </button>
                <div>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-4"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </Layout>
  )
}
