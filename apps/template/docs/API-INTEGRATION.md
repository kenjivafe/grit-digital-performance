# API Integration Guide

This guide covers how the template app integrates with the Grit Hub API for dynamic content management.

## 🌐 API Overview

The template app connects to the central Grit Hub API to fetch:
- Organization information
- Categories and navigation
- Event listings and details
- Registration submissions

## 🔗 API Configuration

### Base URL

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
  'https://admin-grit-digital-performance.vercel.app/api'
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
NEXT_PUBLIC_ORG_SLUG=your-organization  # Optional for local development
```

## 📡 API Client

The API client is implemented in `src/lib/api.ts`:

```typescript
export class ApiClient {
  private baseUrl: string
  private organizationSlug: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_URL
    this.organizationSlug = getOrganizationSlug()
  }

  // Organization endpoints
  async getOrganization(): Promise<ApiResponse<Organization>> { /* ... */ }
  
  // Category endpoints
  async getCategories(): Promise<ApiResponse<Category[]>> { /* ... */ }
  
  // Event endpoints
  async getEvents(category?: string): Promise<ApiResponse<Event[]>> { /* ... */ }
  async getEventBySlug(slug: string): Promise<ApiResponse<Event>> { /* ... */ }
  
  // Registration endpoints
  async createRegistration(data: RegistrationPayload): Promise<ApiResponse<Registration>> { /* ... */ }
}
```

## 🏗️ Data Models

### Organization

```typescript
interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  city?: string
  sportCategory?: string
  active: boolean
  domain?: string
}
```

### Category

```typescript
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  navigationOrder: number
  showInNavigation: boolean
}
```

### Event

```typescript
interface Event {
  id: string
  name: string
  slug: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
  address?: string
  registrationType: 'individual' | 'team'
  price: number
  currency: string
  priceType?: 'perParticipant' | 'perTeam'
  earlyBirdPrice?: number
  earlyBirdDeadline?: string
  registrationStart: string
  registrationEnd: string
  maxParticipants?: number
  maxPlayersPerTeam?: number
  requiresApproval: boolean
  categoryId?: string
}
```

### Registration

```typescript
interface RegistrationPayload {
  eventId: string
  type: 'individual' | 'team'
  individualData?: {
    name: string
    email: string
    phone?: string
    notes?: string
  }
  teamData?: {
    teamName: string
    coachName?: string
    coachEmail?: string
    coachPhone?: string
    players: Player[]
  }
}

interface Player {
  name: string
  email?: string
  phone?: string
}
```

## 🎣 Custom Hooks

The app uses custom hooks for API integration:

### useOrganization

```typescript
const { data: organization, loading, error } = useOrganization()

// Returns:
// - data: Organization | null
// - loading: boolean
// - error: string | null
// - refetch: () => void
```

### useCategories

```typescript
const { data: categories, loading, error } = useCategories()

// Returns organization categories for navigation
```

### useEvents

```typescript
const { data: events, loading, error } = useEvents(categorySlug?)

// Returns events, optionally filtered by category
```

### useEventBySlug

```typescript
const { data: event, loading, error } = useEventBySlug(slug)

// Returns specific event by slug
```

## 🔄 API Flow

### 1. Organization Detection

```
User visits domain → Extract subdomain → Validate organization → Fetch organization data
```

### 2. Content Loading

```
Organization detected → Fetch categories → Fetch events → Render navigation and content
```

### 3. Event Registration

```
User fills form → Validate data → Submit to API → Handle response → Show confirmation
```

## 💾 Caching Strategy

### In-Memory Cache

```typescript
// Cache with 5-minute TTL
const cache = new Map<string, CacheEntry>()

function withCache<T>(
  key: string, 
  fetcher: () => Promise<T>, 
  ttl: number = 300000 // 5 minutes
): Promise<T>
```

### Cache Keys

- `organization-${slug}`: Organization data
- `categories-${slug}`: Categories list
- `events-${slug}`: Events list
- `events-${slug}-${category}`: Category events
- `event-${slug}`: Single event

## 🚨 Error Handling

### API Error Response

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

### Error Handling Pattern

```typescript
try {
  const response = await apiClient.getOrganization()
  if (response.success) {
    setOrganization(response.data)
  } else {
    setError(response.error)
  }
} catch (error) {
  setError('Failed to fetch organization')
}
```

### Error Types

1. **Network Errors**: Connection issues, timeouts
2. **Validation Errors**: Invalid data format
3. **Authorization Errors**: API access denied
4. **Not Found Errors**: Resource doesn't exist
5. **Server Errors**: API internal errors

## 🔧 Customization

### Adding New API Endpoints

1. **Update API Client** (`src/lib/api.ts`):
   ```typescript
   async getCustomData(): Promise<ApiResponse<CustomData>> {
     return this.request<CustomData>('/custom-endpoint')
   }
   ```

2. **Create Custom Hook** (`src/lib/hooks.ts`):
   ```typescript
   export function useCustomData() {
     return useApi(() => apiClient.getCustomData())
   }
   ```

3. **Use in Component**:
   ```typescript
   const { data, loading, error } = useCustomData()
   ```

### Modifying Data Models

1. **Update Interfaces** in `src/lib/api.ts`
2. **Update Type Checking** in components
3. **Test API Responses** with new structure

### API Base URL Changes

Update environment variable:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

## 🧪 Testing

### Mock API Responses

For testing, you can mock API responses:

```typescript
// In test environment
if (process.env.NODE_ENV === 'test') {
  // Return mock data instead of API calls
}
```

### API Testing Tools

1. **Browser DevTools**: Network tab for API calls
2. **Postman**: API endpoint testing
3. **Curl**: Command-line testing

```bash
# Test organization endpoint
curl "https://admin-grit-digital-performance.vercel.app/api/organizations/tuguegaraoleague"

# Test events endpoint
curl "https://admin-grit-digital-performance.vercel.app/api/events?organization=tuguegaraoleague"
```

## 📊 Performance Considerations

### API Optimization

1. **Request Deduplication**: Multiple requests for same data
2. **Caching**: In-memory cache with TTL
3. **Lazy Loading**: Load data when needed
4. **Error Boundaries**: Prevent crashes from API errors

### Bundle Size

API client code is optimized:
- Tree shaking removes unused endpoints
- Minimal dependencies
- Efficient error handling

## 🔍 Debugging

### API Debug Mode

Enable detailed logging:

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('API Request:', url, options)
  console.log('API Response:', response)
}
```

### Common Issues

1. **CORS Errors**: Check API CORS configuration
2. **Timeout Issues**: Increase timeout or optimize API
3. **Data Format**: Verify API response format
4. **Authentication**: Check API keys/tokens

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [React Query](https://tanstack.com/query/latest)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🆘 Support

For API integration issues:

1. **Check API Status**: Verify API is accessible
2. **Review Logs**: Check browser console for errors
3. **Validate Data**: Ensure correct data format
4. **Contact Support**: api-support@gritdp.com

---

Last updated: 2024-03-12
Version: 1.0.0
