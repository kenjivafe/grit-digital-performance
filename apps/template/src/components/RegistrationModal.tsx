'use client'

import { useState, useEffect } from 'react'
import { Event, RegistrationPayload } from '@/lib/api'
import { apiClient } from '@/lib/api'

interface RegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface IndividualFormData {
  name: string
  email: string
  phone: string
  notes: string
}

interface TeamFormData {
  teamName: string
  coachName: string
  contactEmail: string
  phone: string
  players: string[]
}

export function RegistrationModal({ event, isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Individual registration form data
  const [individualData, setIndividualData] = useState<IndividualFormData>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  // Team registration form data
  const [teamData, setTeamData] = useState<TeamFormData>({
    teamName: '',
    coachName: '',
    contactEmail: '',
    phone: '',
    players: ['']
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setSuccess(false)
      setIndividualData({
        name: '',
        email: '',
        phone: '',
        notes: ''
      })
      setTeamData({
        teamName: '',
        coachName: '',
        contactEmail: '',
        phone: '',
        players: ['']
      })
    }
  }, [isOpen])

  const addPlayer = () => {
    const maxPlayers = event.maxPlayersPerTeam || 5
    if (teamData.players.length < maxPlayers) {
      setTeamData(prev => ({
        ...prev,
        players: [...prev.players, '']
      }))
    }
  }

  const removePlayer = (index: number) => {
    if (teamData.players.length > 1) {
      setTeamData(prev => ({
        ...prev,
        players: prev.players.filter((_, i) => i !== index)
      }))
    }
  }

  const updatePlayer = (index: number, value: string) => {
    setTeamData(prev => ({
      ...prev,
      players: prev.players.map((player, i) => i === index ? value : player)
    }))
  }

  const validateIndividualForm = (): boolean => {
    return !!(
      individualData.name.trim() &&
      individualData.email.trim() &&
      individualData.phone.trim()
    )
  }

  const validateTeamForm = (): boolean => {
    const hasRequiredFields = !!(
      teamData.teamName.trim() &&
      teamData.coachName.trim() &&
      teamData.contactEmail.trim() &&
      teamData.phone.trim()
    )
    
    const hasValidPlayers = teamData.players.some(player => player.trim())
    
    return hasRequiredFields && hasValidPlayers
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      let payload: RegistrationPayload

      if (event.registrationType === 'individual') {
        payload = {
          eventId: event.id,
          name: individualData.name,
          email: individualData.email,
          phone: individualData.phone
        }
      } else {
        payload = {
          eventId: event.id,
          teamName: teamData.teamName,
          coachName: teamData.coachName,
          contactEmail: teamData.contactEmail,
          phone: teamData.phone,
          players: teamData.players.filter(player => player.trim())
        }
      }

      const result = await apiClient.registerForEvent(payload)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess()
          onClose()
        }, 2000)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Register for {event.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {event.registrationType === 'team' ? 'Team' : 'Individual'} Registration
                {event.registrationType === 'team' && event.maxPlayersPerTeam && (
                  <span> • Max {event.maxPlayersPerTeam} players</span>
                )}
              </p>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h4>
                <p className="text-gray-600">Your registration has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {event.registrationType === 'individual' ? (
                  // Individual Registration Form
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={individualData.name}
                        onChange={(e) => setIndividualData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={individualData.email}
                        onChange={(e) => setIndividualData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={individualData.phone}
                        onChange={(e) => setIndividualData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={individualData.notes}
                        onChange={(e) => setIndividualData(prev => ({ ...prev, notes: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                ) : (
                  // Team Registration Form
                  <>
                    <div>
                      <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        required
                        value={teamData.teamName}
                        onChange={(e) => setTeamData(prev => ({ ...prev, teamName: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="coachName" className="block text-sm font-medium text-gray-700">
                        Coach / Contact Person *
                      </label>
                      <input
                        type="text"
                        id="coachName"
                        required
                        value={teamData.coachName}
                        onChange={(e) => setTeamData(prev => ({ ...prev, coachName: e.target.value }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          required
                          value={teamData.contactEmail}
                          onChange={(e) => setTeamData(prev => ({ ...prev, contactEmail: e.target.value }))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={teamData.phone}
                          onChange={(e) => setTeamData(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Players ({teamData.players.length}/{event.maxPlayersPerTeam || 5})
                      </label>
                      <div className="space-y-2">
                        {teamData.players.map((player, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Player ${index + 1} Name`}
                              value={player}
                              onChange={(e) => updatePlayer(index, e.target.value)}
                              className="flex-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {teamData.players.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePlayer(index)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                        {teamData.players.length < (event.maxPlayersPerTeam || 5) && (
                          <button
                            type="button"
                            onClick={addPlayer}
                            className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            + Add Player
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Registration Fee Display */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Registration Fee:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {event.registrationType === 'individual' 
                        ? `${event.currency === 'USD' ? '$' : '₱'}${parseFloat(event.price.toString()).toFixed(2)}`
                        : event.priceType === 'perTeam'
                          ? `${event.currency === 'USD' ? '$' : '₱'}${parseFloat(event.price.toString()).toFixed(2)} per team`
                          : `${event.currency === 'USD' ? '$' : '₱'}${parseFloat(event.price.toString()).toFixed(2)} per player`
                      }
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {!success && (
              <>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !validateIndividualForm() && !validateTeamForm()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
