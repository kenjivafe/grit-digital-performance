# API Integration Guide for Client Sites

This guide explains how to integrate your client website with the Grit Digital Performance API server for event registration and data management.

## 🚀 Quick Start

### 1. Include the API Client Library

```html
<!-- Option 1: CDN (recommended for quick setup) -->
<script src="https://admin.gritdp.com/docs/grit-api-client.js"></script>

<!-- Option 2: Download and host locally -->
<script src="/js/grit-api-client.js"></script>
```

### 2. Initialize the Client

```javascript
// Initialize with your organization slug
const api = new GritAPIClient('https://admin.gritdp.com/api');
api.setOrganization('your-organization-slug');
```

### 3. Create a Registration Form

```html
<form id="registrationForm">
  <input type="hidden" name="event_id" value="evt_123">
  
  <div>
    <label>Name:</label>
    <input type="text" name="name" required>
  </div>
  
  <div>
    <label>Email:</label>
    <input type="email" name="email" required>
  </div>
  
  <div>
    <label>Phone:</label>
    <input type="tel" name="phone">
  </div>
  
  <div>
    <label>Team:</label>
    <input type="text" name="team">
  </div>
  
  <button type="submit">Register</button>
</form>

<div id="result"></div>
```

```javascript
// Handle form submission
const form = document.getElementById('registrationForm');
const result = document.getElementById('result');

const handler = api.createFormHandler(form, {
  onSuccess: (data) => {
    result.innerHTML = `
      <div style="color: green;">
        ✅ Registration successful! 
        Registration ID: ${data.data.id}
      </div>
    `;
  },
  onError: (error) => {
    result.innerHTML = `
      <div style="color: red;">
        ❌ Registration failed: ${error.message}
      </div>
    `;
  }
});
```

## 📋 Available API Endpoints

### Event Registration

**POST** `/api/events/register`

Register a participant for an event.

```javascript
const registration = await api.registerForEvent({
  event_id: 'evt_123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '09123456789',
  team: 'Team Name'
});
```

**Response:**
```json
{
  "status": "success",
  "message": "Registration successful",
  "data": {
    "id": "reg_123",
    "event_id": "evt_123",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "confirmed",
    "created_at": "2026-03-11T15:30:00.000Z"
  }
}
```

### Public Event Listings

**GET** `/api/events/public?organization_slug=your-org`

Get public events for your organization.

```javascript
const events = await api.getEvents();
```

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "evt_123",
        "name": "Basketball Tournament",
        "description": "Annual basketball tournament",
        "date": "2026-04-15T09:00:00.000Z",
        "location": "Tuguegarao Sports Complex",
        "max_participants": 100,
        "current_participants": 45,
        "registration_status": "open",
        "registration_deadline": "2026-04-10T23:59:59.000Z",
        "entry_fee": 500
      }
    ],
    "total": 1
  }
}
```

### Event Details

**GET** `/api/events/public/[eventId]?organization_slug=your-org`

Get detailed information about a specific event.

```javascript
const event = await api.getEvent('evt_123');
```

## 🔐 Authentication & Security

### API Keys

For enhanced security, you can use API keys instead of organization slugs:

```javascript
// Initialize with API key
const api = new GritAPIClient('https://admin.gritdp.com/api');
api.setApiKey('your-api-key-here');
```

### CORS Configuration

The API supports cross-origin requests from approved domains. Ensure your domain is:
1. Added to your organization record in the admin panel
2. Configured in the CORS settings

### Request Headers

The API automatically handles CORS headers, but you can add custom headers:

```javascript
const response = await api.request('/events', {
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

## 🎨 Advanced Integration Examples

### Dynamic Event List

```html
<div id="eventsList"></div>

<script>
async function loadEvents() {
  try {
    const response = await api.getEvents();
    const events = response.data.events;
    
    const eventsHtml = events.map(event => `
      <div class="event-card">
        <h3>${event.name}</h3>
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Fee:</strong> ₱${event.entry_fee}</p>
        <p><strong>Spots:</strong> ${event.current_participants}/${event.max_participants}</p>
        
        ${event.registration_status === 'open' ? 
          `<button onclick="openRegistration('${event.id}')">Register Now</button>` :
          `<span class="closed">Registration Closed</span>`
        }
      </div>
    `).join('');
    
    document.getElementById('eventsList').innerHTML = eventsHtml;
  } catch (error) {
    document.getElementById('eventsList').innerHTML = 
      `<p>Error loading events: ${error.message}</p>`;
  }
}

function openRegistration(eventId) {
  // Set the event ID in the form
  document.querySelector('input[name="event_id"]').value = eventId;
  // Show registration form modal or scroll to form
  document.getElementById('registrationForm').scrollIntoView();
}

// Load events when page loads
loadEvents();
</script>
```

### Registration with Validation

```javascript
const handler = api.createFormHandler(form, {
  onSubmit: () => {
    // Show loading state
    result.innerHTML = '<div>Processing registration...</div>';
  },
  onSuccess: (data) => {
    result.innerHTML = `
      <div class="success-message">
        <h3>🎉 Registration Successful!</h3>
        <p>Thank you for registering! Your registration ID is: <strong>${data.data.id}</strong></p>
        <p>We've sent a confirmation email to ${data.data.email}</p>
        <button onclick="resetForm()">Register Another Participant</button>
      </div>
    `;
  },
  onError: (error) => {
    let errorMessage = error.message;
    
    // Handle specific error cases
    if (error.message.includes('email')) {
      errorMessage = 'Please enter a valid email address';
    } else if (error.message.includes('required')) {
      errorMessage = 'Please fill in all required fields';
    } else if (error.message.includes('event')) {
      errorMessage = 'This event is no longer accepting registrations';
    }
    
    result.innerHTML = `
      <div class="error-message">
        <h3>❌ Registration Failed</h3>
        <p>${errorMessage}</p>
        <button onclick="resetForm()">Try Again</button>
      </div>
    `;
  }
});

function resetForm() {
  form.reset();
  result.innerHTML = '';
}
```

## 🛠️ Custom Styling

### CSS Classes

The API client doesn't impose any specific styling, but here are recommended CSS classes:

```css
.event-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
}

.event-card h3 {
  margin-top: 0;
  color: #333;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #c3e6cb;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #f5c6cb;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.closed {
  color: #6c757d;
  font-style: italic;
}
```

## 📊 Tracking & Analytics

### Registration Source Tracking

All registrations automatically track the source domain:

```javascript
// The API automatically captures:
// - Source domain (your website)
// - User agent
// - IP address
// - Timestamp
// - Referrer information

// You can view this data in the admin dashboard under:
// Analytics → Cross-Site Analytics
```

### Custom Events

You can send custom analytics events:

```javascript
// Track custom events (coming soon)
await api.trackEvent('form_viewed', {
  event_id: 'evt_123',
  form_type: 'registration'
});
```

## 🔧 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure your domain is added to your organization record
- Check that you're using HTTPS in production

**401 Unauthorized**
- Verify your organization slug is correct
- Check if your API key is valid (if using API keys)

**400 Bad Request**
- Ensure all required fields are included
- Check field formats (email, phone, etc.)

**404 Not Found**
- Verify the event ID exists
- Check that the event is still open for registration

### Debug Mode

Enable debug logging:

```javascript
// Enable debug mode
api.setDebugMode(true);

// All API calls will be logged to console
```

### Error Handling

Always implement proper error handling:

```javascript
try {
  const result = await api.registerForEvent(data);
  console.log('Success:', result);
} catch (error) {
  console.error('API Error:', error);
  
  // Show user-friendly error message
  alert('Registration failed. Please try again later.');
}
```

## 📞 Support

For integration support:

1. **Documentation**: Check this guide and the [API Reference](./API.md)
2. **Admin Dashboard**: View API usage and errors in the monitoring section
3. **Contact**: Reach out to your Grit Digital Performance representative

## 🚀 Next Steps

1. **Test Integration**: Use the test endpoints to verify your setup
2. **Go Live**: Deploy your integration to production
3. **Monitor**: Check the admin dashboard for registration activity
4. **Optimize**: Use analytics to improve conversion rates

---

*Last updated: March 11, 2026*
