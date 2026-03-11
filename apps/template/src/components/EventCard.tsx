'use client'

import { Event } from '@/lib/api'

interface EventCardProps {
  event: Event
  onRegister?: (event: Event) => void
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = () => {
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
    const now = new Date()
    const registrationStart = new Date(event.registrationStart)
    const registrationEnd = new Date(event.registrationEnd)
    
    return now >= registrationStart && now <= registrationEnd
  }

  const isUpcoming = () => {
    return new Date(event.startDate) > new Date()
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Event Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {event.name}
            </h3>
            
            {/* Registration Type Badge */}
            <div className="mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                event.registrationType === 'team'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {event.registrationType === 'team' ? 'Team' : 'Individual'} Registration
              </span>
              {event.registrationType === 'team' && event.maxPlayersPerTeam && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Max {event.maxPlayersPerTeam} players
                </span>
              )}
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="ml-4">
            {isUpcoming() ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Upcoming
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Event Description */}
        {event.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.startDate)}
          </div>
          
          {event.location && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Registration Fee:</span>
            <span className="text-lg font-bold text-blue-600">{formatPrice()}</span>
          </div>
          {event.registrationType === 'team' && event.priceType === 'perParticipant' && (
            <p className="text-xs text-gray-500 mt-1">
              Total depends on number of players
            </p>
          )}
        </div>

        {/* Registration Button */}
        <button
          onClick={() => onRegister?.(event)}
          disabled={!isRegistrationOpen()}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
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
          <p className="text-xs text-gray-500 mt-2 text-center">
            Registration: {formatDate(event.registrationStart)} - {formatDate(event.registrationEnd)}
          </p>
        )}
      </div>
    </div>
  )
}
