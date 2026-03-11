'use client'

import { useState, useEffect } from 'react'
import { Layout, Container } from '@/components/Layout'
import { useOrganization, useEvents } from '@/lib/hooks'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'
import { EventCard } from '@/components/EventCard'
import { RegistrationModal } from '@/components/RegistrationModal'
import { Event, Organization } from '@/lib/api'

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { data: organization, loading: orgLoading, error: orgError } = useOrganization()
  const { data: events, loading: eventsLoading, error: eventsError } = useEvents()

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleRegistrationSuccess = () => {
    // Refresh events or show success message
    setSelectedEvent(null)
    setIsModalOpen(false)
  }

  const featuredEvents = events?.data?.slice(0, 6) || []

  if (orgLoading || eventsLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          {/* Hero Section Skeleton */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <Container>
              <div className="py-24">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-6"></div>
                  <div className="h-12 bg-blue-500 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-6 bg-blue-400 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            </Container>
          </div>

          {/* Content Skeleton */}
          <Container>
            <div className="py-16 space-y-12">
              <div className="text-center">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
              
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

  if (orgError || eventsError) {
    return (
      <Layout>
        <Container>
          <div className="py-16">
            <ErrorMessage
              message={orgError || eventsError || 'Failed to load homepage content'}
              onRetry={() => window.location.reload()}
            />
          </div>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Container>
          <div className="py-24">
            <div className="text-center">
              {/* Organization Logo/Name */}
              <div className="flex justify-center items-center mb-6">
                {organization?.logo ? (
                  <img
                    src={organization.logo}
                    alt={organization.name}
                    className="w-20 h-20 rounded-full object-contain bg-white p-2"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {organization?.name?.charAt(0) || 'G'}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {organization?.name || 'Welcome to Grit Hub'}
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {organization?.description || 
                 'Your premier destination for sports events, tournaments, and community activities. Join us in building stronger communities through sports.'}
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#events"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 transition-colors"
                >
                  Browse Events
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold">{events?.data?.length || 0}</div>
                  <div className="text-blue-200">Active Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {events?.data?.filter(e => e.registrationType === 'team').length || 0}
                  </div>
                  <div className="text-blue-200">Team Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {events?.data?.filter(e => e.registrationType === 'individual').length || 0}
                  </div>
                  <div className="text-blue-200">Individual Events</div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-20"></div>
      </div>

      {/* About Section */}
      <Container>
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About {organization?.name || 'Our Organization'}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {organization?.description || 
               'We are dedicated to promoting sports and community engagement through well-organized events and tournaments. Our platform brings together athletes, coaches, and sports enthusiasts to create memorable experiences.'}
            </p>
          </div>

          {/* Organization Details */}
          {organization && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {organization.city && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">{organization.city}</p>
                </div>
              )}

              {organization.sportCategory && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Sport Category</h3>
                  <p className="text-gray-600">{organization.sportCategory}</p>
                </div>
              )}

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Community</h3>
                <p className="text-gray-600">Growing Strong</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Status</h3>
                <p className="text-gray-600">{organization.active ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Featured Events Section */}
      <Container>
        <div id="events" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-lg text-gray-600">
              Don't miss out on these upcoming events and tournaments
            </p>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Events Available</h3>
              <p className="text-gray-600 mb-6">
                Check back soon for upcoming events and tournaments.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Us for Information
              </a>
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
