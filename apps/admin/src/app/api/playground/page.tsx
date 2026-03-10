'use client'

import { useState, useEffect } from 'react'
import { 
  Code,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  XCircle,
  Copy,
  Play,
  BracketsCurly,
} from '@phosphor-icons/react'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { Badge } from '@repo/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui'
import { Input } from '@repo/ui'
import { Textarea } from '@repo/ui'
import { Label } from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { getAdminOrganizations } from '@/lib/admin-organizations-store'
import { getAdminEvents } from '@/lib/admin-events-store'

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  emergencyContact: string
  emergencyPhone: string
  medicalInfo: string
  waiverAccepted: boolean
}

export default function ApiPlayground() {
  const [organizations, setOrganizations] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [selectedOrg, setSelectedOrg] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<string>('')
  const [apiEndpoint, setApiEndpoint] = useState<string>('')
  const [apiRequest, setApiRequest] = useState<string>('')
  const [apiResponse, setApiResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'registration' | 'create-event'>('registration')
  
  // Registration form state
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    medicalInfo: 'No known allergies',
    waiverAccepted: false,
  })

  // Event creation state
  const [eventData, setEventData] = useState({
    name: 'Basketball Tournament 2026',
    description: 'Annual basketball tournament for high school teams',
    startDate: '2026-04-15T09:00',
    endDate: '2026-04-17T18:00',
    location: 'Sports Complex',
    address: '123 Main Street',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    country: 'USA',
    virtual: false,
    maxParticipants: '100',
    price: '299.00',
    currency: 'USD',
    earlyBirdPrice: '249.00',
    earlyBirdDeadline: '2026-03-15T23:59',
    registrationStart: '2026-02-01T00:00',
    registrationEnd: '2026-04-10T23:59',
    waitlistEnabled: false,
    requiresApproval: false,
  })

  // Generate API request for event creation
  const generateEventCreationRequest = () => {
    if (!selectedOrg) return ''
    
    const requestBody = {
      name: eventData.name,
      description: eventData.description,
      startDate: eventData.startDate ? new Date(eventData.startDate) : undefined,
      endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
      location: eventData.location,
      address: eventData.address,
      city: eventData.city,
      state: eventData.state,
      zipCode: eventData.zipCode,
      country: eventData.country,
      virtual: eventData.virtual,
      maxParticipants: eventData.maxParticipants ? parseInt(eventData.maxParticipants) : undefined,
      price: parseFloat(eventData.price) || 0,
      currency: eventData.currency,
      earlyBirdPrice: eventData.earlyBirdPrice ? parseFloat(eventData.earlyBirdPrice) : undefined,
      earlyBirdDeadline: eventData.earlyBirdDeadline ? new Date(eventData.earlyBirdDeadline) : undefined,
      registrationStart: eventData.registrationStart ? new Date(eventData.registrationStart) : new Date(),
      registrationEnd: eventData.registrationEnd ? new Date(eventData.registrationEnd) : undefined,
      waitlistEnabled: eventData.waitlistEnabled,
      requiresApproval: eventData.requiresApproval,
    }

    return JSON.stringify({
      method: 'POST',
      url: '/api/events',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'your-organization-api-key-here'
      },
      body: requestBody
    }, null, 2)
  }

  useEffect(() => {
    // Load organizations and events
    const orgs = getAdminOrganizations()
    const evts = getAdminEvents()
    setOrganizations(orgs)
    setEvents(evts)
    
    // Set default selections for easier testing
    if (orgs.length > 0 && !selectedOrg) {
      setSelectedOrg(orgs[0].id)
    }
    if (evts.length > 0 && !selectedEvent) {
      setSelectedEvent(evts[0].id)
    }
  }, [])

  useEffect(() => {
    // Update API endpoint when organization and event are selected
    if (selectedOrg && selectedEvent) {
      const endpoint = `/api/events/register`
      setApiEndpoint(endpoint)
      
      // Generate sample API request for registration
      const sampleRequest = {
        organization_slug: selectedOrg, // This would be the org slug in real implementation
        event_id: selectedEvent,
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: registrationData.email,
        phone: registrationData.phone,
        team: '', // Optional field
        // Include additional registration data if needed
        ...(registrationData.firstName && { firstName: registrationData.firstName }),
        ...(registrationData.lastName && { lastName: registrationData.lastName }),
        ...(registrationData.dateOfBirth && { dateOfBirth: registrationData.dateOfBirth }),
        ...(registrationData.emergencyContact && { emergencyContact: registrationData.emergencyContact }),
        ...(registrationData.emergencyPhone && { emergencyPhone: registrationData.emergencyPhone }),
        ...(registrationData.medicalInfo && { medicalInfo: registrationData.medicalInfo }),
      }
      setApiRequest(JSON.stringify(sampleRequest, null, 2))
    } else {
      setApiEndpoint('')
      setApiRequest('')
    }
  }, [selectedOrg, selectedEvent, registrationData])

  // Update API request for event creation
  useEffect(() => {
    if (activeTab === 'create-event' && selectedOrg) {
      setApiRequest(generateEventCreationRequest())
    }
  }, [activeTab, selectedOrg, eventData])

  const handleTestApi = async () => {
    if (!selectedOrg || !selectedEvent) {
      alert('Please select both an organization and an event')
      return
    }

    setIsLoading(true)
    setRequestStatus('idle')
    setApiResponse('')

    try {
      const requestBody = {
        organization_slug: selectedOrg, // This would be the org slug in real implementation
        event_id: selectedEvent,
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: registrationData.email,
        phone: registrationData.phone,
        team: '', // Optional field
        // Include additional registration data if needed
        ...(registrationData.firstName && { firstName: registrationData.firstName }),
        ...(registrationData.lastName && { lastName: registrationData.lastName }),
        ...(registrationData.dateOfBirth && { dateOfBirth: registrationData.dateOfBirth }),
        ...(registrationData.emergencyContact && { emergencyContact: registrationData.emergencyContact }),
        ...(registrationData.emergencyPhone && { emergencyPhone: registrationData.emergencyPhone }),
        ...(registrationData.medicalInfo && { medicalInfo: registrationData.medicalInfo }),
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseData = await response.json()
      
      if (response.ok) {
        setRequestStatus('success')
        setApiResponse(JSON.stringify(responseData, null, 2))
      } else {
        setRequestStatus('error')
        setApiResponse(JSON.stringify(responseData, null, 2))
      }
    } catch (error) {
      setRequestStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setApiResponse(JSON.stringify({ error: errorMessage }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    if (!selectedOrg) {
      alert('Please select an organization')
      return
    }

    setIsLoading(true)
    setRequestStatus('idle')
    setApiResponse('')

    try {
      const requestBody = {
        name: eventData.name,
        description: eventData.description,
        startDate: eventData.startDate ? new Date(eventData.startDate) : undefined,
        endDate: eventData.endDate ? new Date(eventData.endDate) : undefined,
        location: eventData.location,
        address: eventData.address,
        city: eventData.city,
        state: eventData.state,
        zipCode: eventData.zipCode,
        country: eventData.country,
        virtual: eventData.virtual,
        maxParticipants: eventData.maxParticipants ? parseInt(eventData.maxParticipants) : undefined,
        price: parseFloat(eventData.price) || 0,
        currency: eventData.currency,
        earlyBirdPrice: eventData.earlyBirdPrice ? parseFloat(eventData.earlyBirdPrice) : undefined,
        earlyBirdDeadline: eventData.earlyBirdDeadline ? new Date(eventData.earlyBirdDeadline) : undefined,
        registrationStart: eventData.registrationStart ? new Date(eventData.registrationStart) : new Date(),
        registrationEnd: eventData.registrationEnd ? new Date(eventData.registrationEnd) : undefined,
        waitlistEnabled: eventData.waitlistEnabled,
        requiresApproval: eventData.requiresApproval,
      }

      console.log('Event creation request body:', requestBody)

      // For testing purposes, we'll use a mock API key
      // In real implementation, this would come from the organization's API key management
      const testApiKey = 'test-api-key-for-playground'

      console.log('Sending event creation request with API key:', testApiKey)

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': testApiKey,
        },
        body: JSON.stringify(requestBody),
      })

      console.log('Event creation response status:', response.status)

      const responseData = await response.json()
      console.log('Event creation response data:', responseData)
      
      if (response.ok) {
        setRequestStatus('success')
        setApiResponse(JSON.stringify(responseData, null, 2))
      } else {
        setRequestStatus('error')
        setApiResponse(JSON.stringify(responseData, null, 2))
      }
    } catch (error) {
      console.error('Event creation error:', error)
      setRequestStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setApiResponse(JSON.stringify({ error: errorMessage }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEventInputChange = (field: string, value: string | boolean) => {
    setEventData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const filteredEvents = selectedOrg 
    ? events.filter(event => {
        // In a real app, you'd filter by organizationId
        // For now, let's just show all events
        return true
      })
    : []

  const selectedEventDetails = events.find(event => event.id === selectedEvent)

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="API Playground"
        description="Test and preview the registration API for custom websites"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => copyToClipboard(apiRequest)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Request
            </Button>
            <Button onClick={activeTab === 'registration' ? handleTestApi : handleCreateEvent} disabled={isLoading}>
              <Play className="mr-2 h-4 w-4" />
              {isLoading ? 'Testing...' : activeTab === 'registration' ? 'Test API' : 'Create Event'}
            </Button>
          </div>
        }
      />

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'registration'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('registration')}
            >
              <Calendar className="mr-2 h-4 w-4 inline" />
              Registration API
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'create-event'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('create-event')}
            >
              <Code className="mr-2 h-4 w-4 inline" />
              Create Event API
            </button>
          </div>
        </CardContent>
      </Card>

      {activeTab === 'registration' ? (
        // Registration API Content
        <>
          {/* Configuration Section */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Organization and Event Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Select value={selectedEvent} onValueChange={setSelectedEvent} disabled={!selectedOrg}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredEvents.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedEventDetails && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Event Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Date:</strong> {selectedEventDetails.date}</p>
                      <p><strong>Location:</strong> {selectedEventDetails.location}</p>
                      <p><strong>Price:</strong> ${selectedEventDetails.price}</p>
                      <p><strong>Status:</strong> 
                        <Badge variant={selectedEventDetails.registrationStatus === 'Open' ? 'default' : 'secondary'} className="ml-2">
                          {selectedEventDetails.registrationStatus}
                        </Badge>
                      </p>
                      {selectedEventDetails.description && (
                        <p><strong>Description:</strong> {selectedEventDetails.description}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint</Label>
                  <Input 
                    id="endpoint"
                    value={apiEndpoint} 
                    readOnly 
                    className="font-mono text-sm"
                    placeholder="Select organization and event to see endpoint"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Registration Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={registrationData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={registrationData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={registrationData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={registrationData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={registrationData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                    <Input
                      id="emergencyPhone"
                      value={registrationData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      placeholder="+1 (555) 987-6543"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo">Medical Information</Label>
                  <Textarea
                    id="medicalInfo"
                    value={registrationData.medicalInfo}
                    onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                    placeholder="Any allergies, medications, or medical conditions..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // Event Creation API Content
        <>
          {/* Event Creation Form */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map((org) => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint</Label>
                  <Input 
                    value="/api/events" 
                    readOnly 
                    className="font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    value={eventData.name}
                    onChange={(e) => handleEventInputChange('name', e.target.value)}
                    placeholder="Basketball Tournament"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={eventData.description}
                    onChange={(e) => handleEventInputChange('description', e.target.value)}
                    placeholder="Event description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={eventData.startDate}
                      onChange={(e) => handleEventInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={eventData.endDate}
                      onChange={(e) => handleEventInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventData.location}
                    onChange={(e) => handleEventInputChange('location', e.target.value)}
                    placeholder="Sports Complex"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={eventData.price}
                      onChange={(e) => handleEventInputChange('price', e.target.value)}
                      placeholder="299.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={eventData.maxParticipants}
                      onChange={(e) => handleEventInputChange('maxParticipants', e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* API Request and Response */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* API Request */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              API Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={apiRequest}
              onChange={(e) => setApiRequest(e.target.value)}
              className="font-mono text-sm h-64"
              placeholder={activeTab === 'registration' 
                ? "Select organization and event to see the API request"
                : "Fill in event details to see the API request"
              }
            />
          </CardContent>
        </Card>

        {/* API Response */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BracketsCurly className="h-5 w-5" />
              API Response
              {requestStatus !== 'idle' && (
                <Badge variant={requestStatus === 'success' ? 'default' : 'destructive'} className="ml-2">
                  {requestStatus === 'success' ? (
                    <><CheckCircle className="mr-1 h-3 w-3" /> Success</>
                  ) : (
                    <><XCircle className="mr-1 h-3 w-3" /> Error</>
                  )}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={apiResponse}
              readOnly
              className="font-mono text-sm h-64"
              placeholder="API response will appear here after testing"
            />
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use This Playground</CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'registration' ? (
            <>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Select an organization from the dropdown</li>
                <li>Select an event for that organization</li>
                <li>Fill out the registration form with sample data</li>
                <li>Review the generated API request in the request panel</li>
                <li>Click "Test API" to send the request and see the response</li>
                <li>Use the "Copy Request" button to copy the request for your custom website implementation</li>
              </ol>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Registration Integration Notes:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>The API endpoint shown is what you&apos;ll use in your custom website</li>
                  <li>Include the `organization_slug` and `event_id` in your request body</li>
                  <li>Send the registration data directly in the request body</li>
                  <li>Handle both success and error responses appropriately</li>
                  <li>Consider adding client-side validation before sending the request</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Select an organization from the dropdown</li>
                <li>Fill out the event details form</li>
                <li>Review the generated API request in the request panel</li>
                <li>Click &quot;Create Event&quot; to send the request and see the response</li>
                <li>Use the &quot;Copy Request&quot; button to copy the request for your custom website implementation</li>
              </ol>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Event Creation Integration Notes:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>API Endpoint: `POST /api/events`</li>
                  <li>Requires API key in `x-api-key` header</li>
                  <li>Organization ID is automatically added from the API key</li>
                  <li>Required fields: `name`, `startDate`, `endDate`, `price`</li>
                  <li>Optional fields: `description`, `location`, `maxParticipants`, etc.</li>
                  <li>Returns the created event object on success</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
