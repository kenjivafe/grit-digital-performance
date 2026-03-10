# Grit Digital Performance API Developer Guide

## Overview

This guide helps developers integrate the Grit Digital Performance API into custom websites for event registration and management.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Available Endpoints](#available-endpoints)
4. [Event Registration](#event-registration)
5. [Event Creation](#event-creation)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Examples](#examples)
9. [Testing](#testing)

## Getting Started

### Prerequisites

- Valid organization account
- API key from your organization admin panel
- Basic knowledge of REST APIs
- Web development environment

### Base URL

```
https://admin-grit-digital-performance.vercel.app/api
```

### Quick Start

1. Get your API key from the admin panel
2. Make your first API call to test connectivity
3. Implement event registration on your website
4. Test thoroughly before going live

## Authentication

### API Key Authentication

All API requests require an API key in the header:

```http
x-api-key: your-organization-api-key-here
```

### Where to Find Your API Key

1. Log in to your admin panel
2. Navigate to **API** → **API Keys**
3. Copy your organization's API key
4. Keep it secure and never expose it in client-side code

### Security Best Practices

- ✅ Store API keys in environment variables
- ✅ Use server-side code for API calls when possible
- ✅ Implement rate limiting on your end
- ❌ Never commit API keys to version control
- ❌ Never expose API keys in frontend JavaScript

## Available Endpoints

### Event Registration

#### `POST /api/events/register`

Register a participant for an event.

**Headers:**

```http
Content-Type: application/json
x-api-key: your-api-key
```

**Request Body:**

```json
{
  "organization_slug": "your-org-slug",
  "event_id": "evt_123456789",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "date_of_birth": "1990-01-01",
  "address": "123 Main St",
  "city": "Denver",
  "state": "CO",
  "zip_code": "80202",
  "emergency_contact": "Jane Doe",
  "emergency_phone": "+1234567891"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "reg_123456789",
    "status": "confirmed",
    "confirmation_code": "CONF-123456",
    "event_details": {
      "name": "Summer Soccer Camp",
      "date": "2024-07-15",
      "location": "Denver Soccer Complex"
    }
  }
}
```

### Event Creation

#### `POST /api/events`

Create a new event (for advanced use cases).

**Headers:**

```http
Content-Type: application/json
x-api-key: your-api-key
```

**Request Body:**

```json
{
  "organizationId": "org_123456789",
  "name": "Basketball Tournament",
  "description": "Annual basketball competition",
  "startDate": "2024-08-15T09:00:00Z",
  "endDate": "2024-08-15T17:00:00Z",
  "location": "Sports Complex",
  "address": "123 Sports Ave",
  "city": "Denver",
  "state": "CO",
  "zipCode": "80202",
  "price": 50.0,
  "currency": "USD",
  "registrationStart": "2024-06-01T00:00:00Z",
  "registrationEnd": "2024-08-10T23:59:59Z",
  "maxParticipants": 100,
  "virtual": false
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "evt_123456789",
    "slug": "basketball-tournament-2024",
    "status": "published",
    "publishedAt": "2024-06-01T00:00:00Z"
  }
}
```

### Public Event Details

#### `GET /api/events/public/{eventId}`

Get public event information without authentication.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "evt_123456789",
    "name": "Summer Soccer Camp",
    "description": "Week-long soccer training camp",
    "startDate": "2024-07-15T09:00:00Z",
    "endDate": "2024-07-19T17:00:00Z",
    "location": "Denver Soccer Complex",
    "price": 250.0,
    "currency": "USD",
    "maxParticipants": 50,
    "currentRegistrations": 23,
    "registrationOpen": true,
    "registrationDeadline": "2024-07-10T23:59:59Z"
  }
}
```

## Event Registration Implementation

### Step 1: Get Event Details

```javascript
async function getEventDetails(eventId) {
  try {
    const response = await fetch(`/api/events/public/${eventId}`);
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
}
```

### Step 2: Create Registration Form

```html
<form id="registrationForm">
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input type="text" id="name" name="name" required />
  </div>

  <div class="form-group">
    <label for="email">Email Address *</label>
    <input type="email" id="email" name="email" required />
  </div>

  <div class="form-group">
    <label for="phone">Phone Number *</label>
    <input type="tel" id="phone" name="phone" required />
  </div>

  <!-- Add other required fields -->

  <button type="submit">Register Now</button>
</form>
```

### Step 3: Handle Form Submission

```javascript
document
  .getElementById("registrationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const registrationData = {
      organization_slug: "your-org-slug",
      event_id: "evt_123456789",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      // Add other fields
    };

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "your-api-key",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        showSuccessMessage(result.data.confirmation_code);
      } else {
        // Show error message
        showErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      showErrorMessage("Registration failed. Please try again.");
    }
  });
```

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "error": "Missing required field: email"
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

#### 404 Not Found

```json
{
  "success": false,
  "error": "Event not found"
}
```

#### 409 Conflict

```json
{
  "success": false,
  "error": "Email already registered for this event"
}
```

### Error Handling Best Practices

```javascript
async function handleApiCall(apiFunction, ...args) {
  try {
    const result = await apiFunction(...args);

    if (!result.success) {
      throw new Error(result.error || "API request failed");
    }

    return result.data;
  } catch (error) {
    console.error("API Error:", error);

    // Handle specific error types
    if (error.message.includes("Invalid API key")) {
      showAuthError();
    } else if (error.message.includes("not found")) {
      showNotFoundError();
    } else if (error.message.includes("already registered")) {
      showDuplicateError();
    } else {
      showGenericError();
    }

    throw error;
  }
}
```

## Best Practices

### 1. Form Validation

```javascript
function validateRegistrationForm(data) {
  const errors = [];

  // Required fields
  const required = ["name", "email", "phone"];
  required.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }

  // Phone format
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone format");
  }

  return errors;
}
```

### 2. Rate Limiting

```javascript
const rateLimiter = new Map(); // In production, use Redis or similar

function checkRateLimit(apiKey, limit = 100, window = 3600000) {
  const now = Date.now();
  const keyData = rateLimiter.get(apiKey) || {
    count: 0,
    resetTime: now + window,
  };

  if (now > keyData.resetTime) {
    keyData.count = 0;
    keyData.resetTime = now + window;
  }

  if (keyData.count >= limit) {
    throw new Error("Rate limit exceeded");
  }

  keyData.count++;
  rateLimiter.set(apiKey, keyData);
}
```

### 3. Security Considerations

```javascript
// Server-side implementation (Node.js example)
app.post("/api/register", async (req, res) => {
  // Validate API key
  const apiKey = req.headers["x-api-key"];
  if (!isValidApiKey(apiKey)) {
    return res.status(401).json({ success: false, error: "Invalid API key" });
  }

  // Sanitize input
  const sanitizedData = sanitizeInput(req.body);

  // Validate data
  const errors = validateRegistrationData(sanitizedData);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(", "),
    });
  }

  // Process registration
  try {
    const result = await processRegistration(sanitizedData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});
```

## Examples

### React Component Example

```jsx
import React, { useState } from "react";

function EventRegistration({ eventId, organizationSlug }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // ... other fields
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({
          organization_slug: organizationSlug,
          event_id: eventId,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <div>Registration successful!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
```

### Vanilla JavaScript Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Registration</title>
  </head>
  <body>
    <form id="registrationForm">
      <!-- Form fields -->
      <button type="submit">Register</button>
    </form>

    <div id="message"></div>

    <script>
      const API_KEY = "your-api-key-here";
      const ORG_SLUG = "your-org-slug";
      const EVENT_ID = "evt_123456789";

      document
        .getElementById("registrationForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);

          try {
            const response = await fetch("/api/events/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
              },
              body: JSON.stringify({
                organization_slug: ORG_SLUG,
                event_id: EVENT_ID,
                ...data,
              }),
            });

            const result = await response.json();

            if (result.success) {
              document.getElementById("message").innerHTML =
                `<div class="success">Registration successful! Confirmation: ${result.data.confirmation_code}</div>`;
            } else {
              document.getElementById("message").innerHTML =
                `<div class="error">Error: ${result.error}</div>`;
            }
          } catch (error) {
            document.getElementById("message").innerHTML =
              `<div class="error">Registration failed. Please try again.</div>`;
          }
        });
    </script>
  </body>
</html>
```

## Testing

### API Playground

Use the built-in API Playground to test endpoints:

1. Navigate to **API** → **API Playground** in your admin panel
2. Select the endpoint you want to test
3. Fill in the required fields
4. Click "Test API" to see the response

### Test API Key

For development and testing, use the test API key:

```
test-api-key-for-playground
```

This will return mock responses without affecting real data.

### Unit Testing Example

```javascript
// Jest example
describe("Event Registration API", () => {
  test("should register successfully with valid data", async () => {
    const mockData = {
      organization_slug: "test-org",
      event_id: "evt_123",
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
    };

    const response = await fetch("/api/events/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "test-api-key-for-playground",
      },
      body: JSON.stringify(mockData),
    });

    const result = await response.json();

    expect(result.success).toBe(true);
    expect(result.data.id).toBeDefined();
    expect(result.data.status).toBe("confirmed");
  });
});
```

## Support

### Getting Help

- **API Documentation**: Check this guide first
- **API Playground**: Test endpoints interactively
- **Admin Panel**: Monitor your API usage and manage keys
- **Support Team**: Contact support@gritdp.com for technical assistance

### Common Issues

| Issue                 | Solution                              |
| --------------------- | ------------------------------------- |
| "Invalid API key"     | Check your API key in the admin panel |
| "Event not found"     | Verify the event ID is correct        |
| "Registration closed" | Check if registration is still open   |
| "Rate limit exceeded" | Implement rate limiting on your end   |

### Rate Limits

- **Standard**: 100 requests per hour per API key
- **Premium**: 500 requests per hour per API key
- **Enterprise**: Custom limits available

Contact sales@gritdp.com for higher rate limits.

---

## Quick Reference

### Essential Headers

```http
Content-Type: application/json
x-api-key: your-api-key
```

### Registration Endpoint

```http
POST /api/events/register
```

### Public Event Details

```http
GET /api/events/public/{eventId}
```

### Success Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response Format

```json
{
  "success": false,
  "error": "Error message"
}
```

Happy coding! 🚀
