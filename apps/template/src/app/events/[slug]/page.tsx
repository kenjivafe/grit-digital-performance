'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Layout, Container, PageHeader } from '@/components/Layout'
import { EventCard } from '@/components/EventCard'
import { RegistrationModal } from '@/components/RegistrationModal'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { useEventBySlug, useEvents } from '@/lib/hooks'
import { Event } from '@/lib/api'

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const eventSlug = params.slug as string
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { data: event, loading, error } = useEventBySlug(eventSlug)
  const { data: allEvents } = useEvents()

  // Find related events using useMemo to avoid setState in effect
  const relatedEvents = useMemo(() => {
    if (!event || !allEvents) return []
    
    // Find related events (same category or similar characteristics)
    return allEvents
      .filter(e => e.id !== event.id)
      .filter(e => {
        // Same category would be ideal, but we don't have category info in event
        // For now, use registration type as a simple relation
        return e.registrationType === event.registrationType
      })
      .slice(0, 3) // Limit to 3 related events
  }, [event, allEvents])

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleRegistrationSuccess = () => {
    setSelectedEvent(null)
    setIsModalOpen(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = () => {
    if (!event) return ''
    const price = parseFloat(event.price.toString())
    const currency = event.currency === 'USD' ? '$' : '₱'
    
    if (event.registrationType === 'individual') {
      return `${currency}${price.toFixed(2)} per participant`
    } else {
      if (event.priceType === 'perTeam') {
        return `${currency}${price.toFixed(2)} per team`
      } else {
        return `${currency}${price.toFixed(2)} per player`
      }
    }
  }

  const isRegistrationOpen = () => {
    if (!event) return false
    const now = new Date()
    const registrationStart = new Date(event.registrationStart)
    const registrationEnd = new Date(event.registrationEnd)
    
    return now >= registrationStart && now <= registrationEnd
  }

  const isUpcoming = () => {
    if (!event) return false
    return new Date(event.startDate) > new Date()
  }

  // Social sharing functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = event ? `${event.name} - Register Now!` : ''
  const shareDescription = event ? event.description?.substring(0, 160) || 'Join this exciting event!' : ''

  const handleShare = (platform: string) => {
    let url = ''
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`
        break
      default:
        return
    }
    
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <Layout>
        <div className="animate-pulse">
          {/* Event Header Skeleton */}
          <div className="bg-white border-b">
            <Container>
              <div className="py-8">
                <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Container>
          </div>

          {/* Event Details Skeleton */}
          <Container>
            <div className="py-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    )
  }

  if (error || !event) {
    return (
      <Layout>
        <Container>
          <div className="py-16">
            <ErrorMessage
              message={error || 'Event not found'}
              onRetry={() => router.push('/')}
            />
          </div>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Event Header */}
      <PageHeader
        title={event.name}
        description={
          <div className="flex items-center space-x-4 text-sm">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              event.registrationType === 'team'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {event.registrationType === 'team' ? 'Team' : 'Individual'} Registration
            </span>
            {isUpcoming() && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Upcoming
              </span>
            )}
          </div>
        }
      />

      {/* Event Details */}
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                {event.description ? (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    More information about this event will be available soon.
                  </p>
                )}
              </div>

              {/* Event Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Information</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                      <p className="text-gray-600">
                        {formatDate(event.startDate)}
                        {event.endDate && event.endDate !== event.startDate && (
                          <>
                            <br />
                            to {formatDate(event.endDate)}
                          </>
                        )}
                      </p>
                    </div>
                    
                    {event.location && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                        <p className="text-gray-600">{event.location}</p>
                        {event.address && (
                          <p className="text-gray-500 text-sm mt-1">{event.address}</p>
                        )}
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Registration Type</h3>
                      <p className="text-gray-600 capitalize">{event.registrationType}</p>
                      {event.registrationType === 'team' && event.maxPlayersPerTeam && (
                        <p className="text-gray-500 text-sm mt-1">
                          Max {event.maxPlayersPerTeam} players per team
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Registration Fee</h3>
                      <p className="text-gray-900 font-bold text-lg">{formatPrice()}</p>
                      {event.earlyBirdPrice && (
                        <p className="text-gray-500 text-sm mt-1">
                          Early bird: {event.currency === 'USD' ? '$' : '₱'}{event.earlyBirdPrice.toFixed(2)}
                          {event.earlyBirdDeadline && (
                            <> until {new Date(event.earlyBirdDeadline).toLocaleDateString()}</>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Information</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Registration Period</h3>
                      <p className="text-blue-800">
                        {new Date(event.registrationStart).toLocaleDateString()} - {new Date(event.registrationEnd).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Registration Status</h3>
                      <p className="text-blue-800">
                        {isRegistrationOpen() ? (
                          <span className="text-green-600 font-medium">Open</span>
                        ) : (
                          <span className="text-red-600 font-medium">Closed</span>
                        )}
                      </p>
                    </div>
                    
                    {event.maxParticipants && (
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Max Participants</h3>
                        <p className="text-blue-800">{event.maxParticipants}</p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Approval Required</h3>
                      <p className="text-blue-800">
                        {event.requiresApproval ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Register Now</h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {formatPrice()}
                    </div>
                    {event.registrationType === 'team' && event.priceType === 'perParticipant' && (
                      <p className="text-sm text-gray-500">
                        Total depends on number of players
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleRegister(event)}
                    disabled={!isRegistrationOpen()}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isRegistrationOpen()
                        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {!isRegistrationOpen()
                      ? 'Registration Closed'
                      : event.registrationType === 'team'
                        ? 'Register Team'
                        : 'Register Now'
                    }
                  </button>
                  
                  {!isRegistrationOpen() && (
                    <p className="text-xs text-gray-500 text-center">
                      Registration: {new Date(event.registrationStart).toLocaleDateString()} - {new Date(event.registrationEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(event.startDate)}
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {event.registrationType === 'team' ? 'Team Event' : 'Individual Event'}
                  </div>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Event</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center justify-center px-3 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </button>
                    
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center justify-center px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </button>
                    
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.646.134-.179.298-.298.496-.447.197-.149.374-.224.57-.374.197-.149.347-.074.496.074.149.149 1.012.374 1.363.496.351.149.598.099.746-.149.149-.247.746-.966 1.012-1.164.267-.197.537-.149.746.074.197.149 1.363.646 1.363.646.149.149.224.347.149.546 0 .297-.149 1.012-.746 1.912-.598.898-1.363 1.363-1.912.598-.547.149-.998.074-1.363-.149-.347-.149-1.363-.496-2.03-.746-.667-.249-1.263-.374-1.758-.374-.496 0-1.363.149-2.03.746-.667.598-1.363 1.363-1.363 2.059 0 .696.149 1.363.374 1.912.223.549.746 1.363 1.363 2.059.617.696 1.363 1.363 2.059 1.363.696 0 1.363-.149 1.912-.374.549-.223 1.363-.746 1.912-1.363.598-.696.746-1.363.746-1.912 0-.297-.149-.347-.374-.546z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                  
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <Container>
          <div className="py-16 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map((relatedEvent) => (
                <EventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          </div>
        </Container>
      )}

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
