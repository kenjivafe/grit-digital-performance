# Portal Migration Guide

This guide helps users transition from the deprecated portal application to the new two-app architecture.

## 🚨 Important Notice

**The portal application has been deprecated and removed.** All functionality has been consolidated into the admin application and API endpoints.

## 📋 What Changed

### Before (Portal App)
- Separate portal application at `portal.gritdp.com`
- Limited API access
- Basic management features
- Separate authentication system

### After (New Architecture)
- **Admin + API Server** at `admin.gritdp.com`
- Comprehensive API endpoints
- Advanced analytics and monitoring
- Centralized authentication
- Client site integrations

## 🔄 Migration Steps

### Step 1: Update Your Bookmarks

**Old URL:** `https://portal.gritdp.com`
**New URL:** `https://admin.gritdp.com`

### Step 2: Update API Integrations

If you were using portal APIs, update your endpoints:

#### Old Portal Endpoints
```
GET https://portal.gritdp.com/api/events
POST https://portal.gritdp.com/api/register
```

#### New Admin Endpoints
```
GET https://admin.gritdp.com/api/events/public?organization_slug=your-org
POST https://admin.gritdp.com/api/events/register
```

### Step 3: Update Authentication

Portal credentials no longer work. Use your admin credentials:

1. Go to `https://admin.gritdp.com/auth/signin`
2. Use your existing admin credentials
3. If you don't have admin access, contact your organization admin

### Step 4: Update Client Website Integrations

If you had client websites integrated with the portal:

#### Option A: Use the New API Client Library (Recommended)
```html
<script src="https://admin.gritdp.com/docs/grit-api-client.js"></script>
<script>
const api = new GritAPIClient('https://admin.gritdp.com/api');
api.setOrganization('your-organization-slug');
</script>
```

#### Option B: Manual API Integration
```javascript
// Update your API calls to use the new endpoints
const response = await fetch('https://admin.gritdp.com/api/events/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    organization_slug: 'your-org',
    event_id: 'evt_123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '09123456789',
    team: 'Team Name'
  })
});
```

## 🆚 Feature Comparison

| Feature | Portal (Old) | Admin + API (New) |
|---------|---------------|-------------------|
| Event Management | ✅ Basic | ✅ Advanced |
| Registration | ✅ Limited | ✅ Full-featured |
| Analytics | ❌ None | ✅ Comprehensive |
| API Access | ❌ Limited | ✅ Full REST API |
| Client Integration | ❌ None | ✅ Full support |
| Monitoring | ❌ None | ✅ Real-time |
| API Keys | ❌ None | ✅ Management |
| Source Tracking | ❌ None | ✅ Detailed |

## 🔑 New Features Available

### 1. Advanced Analytics
- **Cross-site registration tracking**
- **Source attribution** (internal vs external)
- **Domain performance metrics**
- **API usage monitoring**

### 2. API Key Management
- **Generate secure API keys** for client sites
- **Rate limiting and monitoring**
- **Key rotation capabilities**
- **Usage analytics**

### 3. Enhanced Event Management
- **Custom fields support**
- **Advanced filtering**
- **Bulk operations**
- **Automated notifications**

### 4. Client Site Integration
- **JavaScript client library**
- **CORS support**
- **Domain verification**
- **Source tracking**

## 📧 Migration Timeline

| Date | Action | Status |
|------|--------|---------|
| March 11, 2026 | Portal decommissioned | ✅ Complete |
| March 11, 2026 | New admin system live | ✅ Complete |
| March 15, 2026 | Legacy URLs redirect | 📋 Planned |
| April 1, 2026 | Portal data archived | 📋 Planned |

## 🔧 Technical Migration Guide

### For Developers

#### Update Environment Variables
```bash
# Old
PORTAL_API_URL="https://portal.gritdp.com/api"

# New
ADMIN_API_URL="https://admin.gritdp.com/api"
```

#### Update API Client Code
```javascript
// Old
const response = await fetch(`${PORTAL_API_URL}/events`, {
  headers: {
    'Authorization': `Bearer ${PORTAL_TOKEN}`
  }
});

// New
const response = await fetch(`${ADMIN_API_URL}/events/public?organization_slug=${ORG_SLUG}`, {
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### Update Webhook URLs
```bash
# Old
https://portal.gritdp.com/webhooks/events

# New
https://admin.gritdp.com/api/webhooks/events
```

### For System Administrators

#### Update DNS Records
```dns
# Remove (if exists)
portal CNAME -> vercel.app

# Add (if needed for redirects)
portal CNAME -> admin.gritdp.com
```

#### Update Firewall Rules
```bash
# Allow new admin domain
admin.gritdp.com - ALLOW

# Remove old portal domain (if exists)
portal.gritdp.com - REMOVE
```

#### Update Monitoring
```bash
# Update monitoring endpoints
OLD: https://portal.gritdp.com/health
NEW: https://admin.gritdp.com/api/health
```

## 🆘 Getting Help

### Common Issues

**Q: I can't log in with my portal credentials**
A: Portal credentials are deprecated. Use your admin credentials or contact your organization admin.

**Q: My API integrations stopped working**
A: Update your API endpoints to use `admin.gritdp.com/api/*` instead of `portal.gritdp.com/api/*`

**Q: I can't find a feature that was in the portal**
A: Most features have been enhanced in the admin app. Check the admin dashboard or contact support.

**Q: My client website registration forms broke**
A: Update your integration to use the new API client library or manual API endpoints.

### Support Channels

1. **Documentation**: [API Integration Guide](../apps/admin/docs/API-Integration-Guide.md)
2. **Admin Dashboard**: Built-in help and support
3. **Email**: migration-support@gritdp.com
4. **Phone**: +1 (555) 123-4567 (Migration Hotline)

### Training Resources

- **Video Tutorial**: Portal to Admin Migration (15 minutes)
- **Webinar**: Live Q&A Sessions (Weekly)
- **Documentation**: Complete API Reference
- **Examples**: Code samples and templates

## 📊 Migration Checklist

### For Users
- [ ] Update bookmarks to admin.gritdp.com
- [ ] Test login with admin credentials
- [ ] Explore new admin dashboard features
- [ ] Check analytics and reporting

### For Developers
- [ ] Update API endpoint URLs
- [ ] Test API integrations
- [ ] Update authentication methods
- [ ] Implement new API client library

### For System Admins
- [ ] Update DNS and firewall rules
- [ ] Update monitoring systems
- [ ] Archive old portal data
- [ ] Update documentation

## 🎯 Quick Start Checklist

1. **Immediate Actions (Today)**
   - [ ] Bookmark admin.gritdp.com
   - [ ] Test admin login
   - [ ] Notify your team

2. **This Week**
   - [ ] Update API integrations
   - [ ] Test client website forms
   - [ ] Explore new features

3. **This Month**
   - [ ] Implement enhanced analytics
   - [ ] Set up API keys for client sites
   - [ ] Train team on new features

## 📈 Benefits of Migration

### What You Gain
- **Better Performance**: Faster, more reliable system
- **More Features**: Advanced analytics and monitoring
- **Better Security**: API keys and enhanced authentication
- **Client Integration**: Full support for external sites
- **Real-time Data**: Live monitoring and alerts

### What You Don't Lose
- **Data**: All your data is preserved
- **Functionality**: All features are enhanced, not removed
- **Access**: Same or better access levels
- **Support**: Enhanced support options

## 🔮 Future Enhancements

Coming soon to the admin system:
- **Mobile App**: Native admin mobile application
- **Advanced AI**: Predictive analytics and insights
- **Enhanced APIs**: GraphQL support and webhooks
- **Multi-tenant**: Advanced organization management

---

**Migration Support Available**: Don't hesitate to reach out if you need help with the migration process.

*Last updated: March 11, 2026*
