# API Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Get Your API Key

- Log in to admin panel → **API** → **API Keys**
- Copy your organization's API key

### 2. Make Your First API Call

```javascript
// Test event registration
const response = await fetch(
  "https://admin-grit-digital-performance.vercel.app/api/events/register",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "your-api-key-here",
    },
    body: JSON.stringify({
      organization_slug: "your-org-slug",
      event_id: "evt_123456789",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    }),
  },
);

const result = await response.json();
console.log(result);
```

### 3. Add to Your Website

```html
<form id="registrationForm">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" required />
  <button type="submit">Register</button>
</form>

<script>
  document
    .getElementById("registrationForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const response = await fetch(
        "https://admin-grit-digital-performance.vercel.app/api/events/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "your-api-key",
          },
          body: JSON.stringify({
            organization_slug: "your-org-slug",
            event_id: "evt_123456789",
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
          }),
        },
      );

      const result = await response.json();
      if (result.success) {
        alert("Registration successful!");
      } else {
        alert("Error: " + result.error);
      }
    });
</script>
```

## 📋 Essential Endpoints

| Method | Full URL                                                                   | Purpose                 |
| ------ | -------------------------------------------------------------------------- | ----------------------- |
| `POST` | `https://admin-grit-digital-performance.vercel.app/api/events/register`    | Register participant    |
| `GET`  | `https://admin-grit-digital-performance.vercel.app/api/events/public/{id}` | Get event details       |
| `POST` | `https://admin-grit-digital-performance.vercel.app/api/events`             | Create event (advanced) |

## 🔑 Required Headers

```http
Content-Type: application/json
x-api-key: your-api-key
```

## ✅ Success Response

```json
{
  "success": true,
  "data": {
    "id": "reg_123456",
    "status": "confirmed",
    "confirmation_code": "CONF-123456"
  }
}
```

## ❌ Error Response

```json
{
  "success": false,
  "error": "Missing required field: email"
}
```

## 🧪 Testing

Use the **API Playground** in your admin panel to test endpoints without writing code.

## 📚 Full Documentation

See [API Developer Guide](./API-Developer-Guide.md) for complete documentation.

---

**Need help?** Contact support@gritdp.com
