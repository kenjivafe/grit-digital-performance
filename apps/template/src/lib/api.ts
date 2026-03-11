// API types
export interface Organization {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  website?: string
  logo?: string
  description?: string
  sportCategory: string
  domain?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  active: boolean
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  showInNavigation: boolean
  navigationOrder: number
  organizationId: string
}

export interface Event {
  id: string
  name: string
  slug: string
  description?: string
  startDate: string
  endDate: string
  location?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  virtual: boolean
  maxParticipants?: number
  price: number
  currency: string
  earlyBirdPrice?: number
  earlyBirdDeadline?: string
  registrationStart: string
  registrationEnd: string
  waitlistEnabled: boolean
  requiresApproval: boolean
  status: string
  publishedAt?: string
  organizationId: string
  registrationType: 'individual' | 'team'
  maxPlayersPerTeam?: number
  priceType: 'perParticipant' | 'perTeam'
}

export interface RegistrationPayload {
  eventId: string
  name?: string
  email?: string
  phone?: string
  teamName?: string
  coachName?: string
  contactEmail?: string
  players?: string[]
}

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  phone?: string
  teamName?: string
  status: string
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// API Client
class ApiClient {
  private baseUrl: string
  private organizationSlug: string | null = null

  constructor() {
    // Use the admin API as the base URL
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-grit-digital-performance.vercel.app/api'
    this.organizationSlug = this.getOrganizationFromSubdomain()
  }

  private getOrganizationFromSubdomain(): string | null {
    if (typeof window === 'undefined') return null

    const hostname = window.location.hostname
    const parts = hostname.split('.')
    
    // Check if we're on a subdomain
    if (parts.length >= 3 && parts[parts.length - 2] === 'gritdp' && parts[parts.length - 1] === 'com') {
      return parts[0]
    }
    
    // Fallback to environment variable for development
    if (process.env.NEXT_PUBLIC_ORG_SLUG) {
      return process.env.NEXT_PUBLIC_ORG_SLUG
    }
    
    // Default to test organization for development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'tuguegaraoleague'
    }
    
    return null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      console.log('API Request:', url) // Debug log
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.organizationSlug || '', // Use organization slug as API key
          ...options.headers,
        },
        mode: 'cors',
        ...options,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug log
      return { success: true, data }
    } catch (error) {
      console.error('API request failed:', error)
      
      // Provide more specific error messages
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Network error - unable to connect to API. Please check your internet connection.'
        } else if (error.message.includes('CORS')) {
          errorMessage = 'CORS error - API access blocked by browser. Please contact support.'
        } else if (error.message.includes('401')) {
          errorMessage = 'Authentication failed - Invalid organization slug or API key.'
        } else if (error.message.includes('404')) {
          errorMessage = 'Resource not found - The requested data does not exist.'
        } else {
          errorMessage = error.message
        }
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  // Organization methods
  async getOrganization(): Promise<ApiResponse<Organization>> {
    if (!this.organizationSlug) {
      return { success: false, error: 'No organization slug detected' }
    }

    return this.request<Organization>(`/organizations/${this.organizationSlug}`)
  }

  // Category methods
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/categories')
  }

  // Event methods
  async getEvents(category?: string): Promise<ApiResponse<Event[]>> {
    // Use the events endpoint with API key
    const url = category ? `/events?category=${category}` : '/events'
    return this.request<Event[]>(url)
  }

  async getEventBySlug(slug: string): Promise<ApiResponse<Event>> {
    // For now, we'll need to find the event by filtering the events list
    // This can be updated when a direct slug lookup endpoint is available
    const eventsResponse = await this.getEvents()
    if (!eventsResponse.success || !eventsResponse.data) {
      return { success: false, error: 'Failed to fetch events' }
    }

    const event = eventsResponse.data.find(event => event.slug === slug)
    if (!event) {
      return { success: false, error: 'Event not found' }
    }

    return { success: true, data: event }
  }

  // Registration methods
  async createRegistration(data: RegistrationPayload): Promise<ApiResponse<Registration>> {
    return this.request<Registration>('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Utility methods
  getOrganizationSlug(): string | null {
    return this.organizationSlug
  }

  isValidOrganization(): boolean {
    return this.organizationSlug !== null
  }
}

// Create singleton instance
export const apiClient = new ApiClient()
