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
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin-grit-digital-performance.vercel.app/api'
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
    return process.env.NEXT_PUBLIC_ORG_SLUG || null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
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
    if (!this.organizationSlug) {
      return { success: false, error: 'No organization slug detected' }
    }

    return this.request<Category[]>(`/orgs/${this.organizationSlug}/categories`)
  }

  // Event methods
  async getEvents(category?: string): Promise<ApiResponse<Event[]>> {
    if (!this.organizationSlug) {
      return { success: false, error: 'No organization slug detected' }
    }

    const params = new URLSearchParams()
    if (category) params.append('category', category)
    
    const query = params.toString()
    const endpoint = `/orgs/${this.organizationSlug}/events${query ? `?${query}` : ''}`
    
    return this.request<Event[]>(endpoint)
  }

  async getEventBySlug(slug: string): Promise<ApiResponse<Event>> {
    return this.request<Event>(`/events/public/${slug}`)
  }

  // Registration methods
  async registerForEvent(payload: RegistrationPayload): Promise<ApiResponse<unknown>> {
    return this.request<unknown>('/events/register', {
      method: 'POST',
      body: JSON.stringify(payload),
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
