# Grit Digital Performance API Documentation

## Overview

This API provides endpoints for managing sports organizations, events, and registrations. The API is hosted at `admin.gritdp.com/api/*` and supports cross-origin requests from authorized client sites.

## Base URL

```
https://admin.gritdp.com/api
```

## Authentication

Most endpoints are public for client site integrations. Admin endpoints require authentication via NextAuth.js session.

## CORS Policy

API supports cross-origin requests from authorized domains:
- `https://gritdp.com`
- `https://admin.gritdp.com`
- Client organization domains (e.g., `https://tuguegaraoleague.gritdp.com`)
- Localhost for development

## Endpoints

### Events

#### Register for Event
```http
POST /api/events/register
```

Registers a participant for an event from a client site.

**Request Body:**
```json
{
  "organization_slug": "tuguegaraoleague",
  "event_id": "evt_123",
  "name": "Juan Dela Cruz",
  "email": "juan@email.com",
  "phone": "09123456789",
  "team": "Tuguegarao Warriors"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "id": "reg_1234567890",
    "organization_slug": "tuguegaraoleague",
    "event_id": "evt_123",
    "name": "Juan Dela Cruz",
    "email": "juan@email.com",
    "phone": "09123456789",
    "team": "Tuguegarao Warriors",
    "status": "confirmed",
    "created_at": "2026-03-11T02:49:00.000Z",
    "source": "external"
  }
}
```

#### Get Events by Organization
```http
GET /api/events?organization_slug={slug}
```

Retrieves all events for a specific organization.

**Query Parameters:**
- `organization_slug` (string): Organization slug

**Response:**
```json
{
  "events": [
    {
      "id": "evt_123",
      "name": "Basketball Tournament",
      "date": "2026-04-15T09:00:00.000Z",
      "location": "Tuguegarao Sports Complex",
      "max_participants": 100,
      "current_participants": 45,
      "registration_status": "open"
    }
  ]
}
```

#### Get Event Details
```http
GET /api/events/{event_id}
```

Retrieves detailed information about a specific event.

**Response:**
```json
{
  "id": "evt_123",
  "name": "Basketball Tournament",
  "description": "Annual basketball tournament for high school teams",
  "date": "2026-04-15T09:00:00.000Z",
  "location": "Tuguegarao Sports Complex",
  "max_participants": 100,
  "current_participants": 45,
  "registration_status": "open",
  "organization": {
    "id": "org_123",
    "name": "Tuguegarao League",
    "slug": "tuguegaraoleague"
  }
}
```

### Organizations

#### Get Organization by Slug
```http
GET /api/organizations/{slug}
```

Retrieves organization information.

**Response:**
```json
{
  "id": "org_123",
  "name": "Tuguegarao League",
  "slug": "tuguegaraoleague",
  "domain": "tuguegaraoleague.gritdp.com",
  "description": "High school sports league in Tuguegarao"
}
```

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `400 Bad Request`: Missing or invalid parameters
- `401 Unauthorized`: Authentication required
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate registration
- `500 Internal Server Error`: Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per domain

## Client Site Integration

### JavaScript Example

```javascript
// Register for event
async function registerForEvent(registrationData) {
  try {
    const response = await fetch('https://admin.gritdp.com/api/events/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData)
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      console.log('Registration successful:', result.data);
      // Show success message to user
    } else {
      console.error('Registration failed:', result.error);
      // Show error message to user
    }
  } catch (error) {
    console.error('Network error:', error);
    // Show network error message
  }
}

// Usage
registerForEvent({
  organization_slug: 'tuguegaraoleague',
  event_id: 'evt_123',
  name: 'Juan Dela Cruz',
  email: 'juan@email.com',
  phone: '09123456789',
  team: 'Tuguegarao Warriors'
});
```

### Form Integration

```html
<form id="registrationForm">
  <input type="hidden" name="organization_slug" value="tuguegaraoleague">
  <input type="hidden" name="event_id" value="evt_123">
  
  <input type="text" name="name" required placeholder="Full Name">
  <input type="email" name="email" required placeholder="Email">
  <input type="tel" name="phone" placeholder="Phone">
  <input type="text" name="team" placeholder="Team Name">
  
  <button type="submit">Register</button>
</form>

<script>
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  await registerForEvent(data);
});
</script>
```

## Support

For API support and questions:
- Email: api@gritdp.com
- Documentation: https://docs.gritdp.com/api
