# Environment Variables Documentation

This document covers all environment variables used across the two-app architecture.

## 🏗️ Architecture Overview

```
grit-digital-performance/
├── apps/website/          # Public website (gritdp.com)
├── apps/admin/            # Admin + API Server (admin.gritdp.com)
├── packages/              # Shared packages
└── prisma/               # Database schema
```

## 📁 Environment Files

### Required Files
- `.env` - Root environment variables
- `apps/website/.env.local` - Website-specific variables
- `apps/admin/.env.local` - Admin-specific variables

### File Priority (Next.js loads in this order)
1. `.env.local` - Local overrides (highest priority)
2. `.env.development` - Development environment
3. `.env` - Default environment variables
4. `.env.production` - Production environment

## 🌐 Root Environment Variables

### `.env` (Root Directory)
```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:5432/database"

# Prisma Cloud (Recommended)
DATABASE_URL="postgres://71d12fdf9fd660836718242fde9035600092e02601a28e234967e4666d393233:sk_Ut9JqPKd30YWtMFM5b3PO@db.prisma.io:5432/postgres?sslmode=require"

# Development Configuration
NODE_ENV="development"
```

## 🌍 Website Environment Variables

### `apps/website/.env.local`
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"              # Development
NEXTAUTH_URL="https://gritdp.com"                 # Production
NEXTAUTH_SECRET="grit-digital-performance-secret-key-2024"

# Stripe Payment Processing
STRIPE_PUBLISHABLE_KEY="pk_test_..."              # Test mode
STRIPE_PUBLISHABLE_KEY="pk_live_..."              # Live mode
STRIPE_WEBHOOK_SECRET="whsec_..."                  # Webhook verification

# Email Configuration (Optional)
EMAIL_FROM="noreply@gritdigitalperformance.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
VERCEL_ANALYTICS_ID="..."

# Feature Flags
ENABLE_PAYMENTS="true"
ENABLE_ANALYTICS="true"
```

## 🛡️ Admin Environment Variables

### `apps/admin/.env.local`
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3001"              # Development  
NEXTAUTH_URL="https://admin.gritdp.com"            # Production
NEXTAUTH_SECRET="grit-digital-performance-secret-key-2024"

# Stripe Configuration (for admin payment processing)
STRIPE_SECRET_KEY="sk_test_..."                  # Test mode
STRIPE_SECRET_KEY="sk_live_..."                  # Live mode
STRIPE_WEBHOOK_SECRET="whsec_..."                  # Webhook verification

# API Configuration
API_BASE_URL="http://localhost:3001/api"          # Development
API_BASE_URL="https://admin.gritdp.com/api"        # Production
API_RATE_LIMIT="1000"                             # Requests per hour
API_CORS_ORIGINS="https://gritdp.com,https://*.gritdp.com"

# Email Configuration
EMAIL_FROM="noreply@gritdigitalperformance.com"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="admin-email@gritdp.com"
SMTP_PASS="admin-app-password"

# Security
JWT_SECRET="your-jwt-secret-key"
SESSION_SECRET="your-session-secret"
ENCRYPTION_KEY="your-encryption-key"

# Monitoring (Optional)
SENTRY_DSN="https://..."                           # Error tracking
LOG_LEVEL="info"                                  # debug, info, warn, error

# Feature Flags
ENABLE_API_MONITORING="true"
ENABLE_CROSS_SITE_ANALYTICS="true"
ENABLE_API_KEYS="true"
```

## 🔧 Shared Package Environment Variables

### `packages/ui/.env.local` (Optional)
```env
# UI Configuration
THEME_DEFAULT="light"
ANIMATION_DURATION="300"
BREAKPOINT_MOBILE="768"
```

### `packages/utils/.env.local` (Optional)
```env
# Utility Configuration
DATE_FORMAT="MM/dd/yyyy"
TIMEZONE="UTC"
CURRENCY="USD"
```

## 🗄️ Database Environment Variables

### Prisma Configuration
```env
# Database Connection
DATABASE_URL="postgresql://username:password@host:port/database"

# Prisma Cloud (Alternative)
DATABASE_URL="postgres://connection-string@db.prisma.io:5432/postgres?sslmode=require"

# Database SSL (Production)
DATABASE_SSL_MODE="require"
DATABASE_SSL_CERT="/path/to/cert.pem"
```

### Database Pooling (Production)
```env
# Connection Pool
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_POOL_IDLE_TIMEOUT=30000
```

## 🚀 Deployment Environment Variables

### Vercel Environment Variables
```env
# Vercel-specific
VERCEL_ENV="production"
VERCEL_URL="gritdp.com"
VERCEL_PROJECT_NAME="grit-website"

# Build Configuration
BUILD_COMMAND="npm run build"
DEV_COMMAND="npm run dev"
INSTALL_COMMAND="npm install"
```

### Docker Environment Variables (Optional)
```env
# Docker Configuration
DOCKER_REGISTRY="ghcr.io"
DOCKER_IMAGE="grit-digital-performance"
DOCKER_TAG="latest"
PORT=3000
```

## 🔐 Security Environment Variables

### Authentication
```env
# NextAuth.js
NEXTAUTH_SECRET="minimum-32-characters-long-random-string"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"      # Internal URL

# JWT Configuration
JWT_SECRET="your-256-bit-secret"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
```

### API Security
```env
# API Keys
API_SECRET_KEY="your-api-secret-key"
API_ENCRYPTION_KEY="your-encryption-key"

# CORS Configuration
CORS_ORIGIN="https://gritdp.com"
CORS_METHODS="GET,POST,PUT,DELETE,OPTIONS"
CORS_CREDENTIALS="true"
```

### Encryption
```env
# Data Encryption
ENCRYPTION_ALGORITHM="aes-256-gcm"
ENCRYPTION_KEY="your-32-character-hex-key"
HASH_SALT_ROUNDS="12"
```

## 📊 Analytics Environment Variables

### Google Analytics
```env
# Google Analytics 4
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
GA_MEASUREMENT_ID="G-XXXXXXXXXX"
GA_API_SECRET="your-ga-api-secret"

# Google Tag Manager
GTM_ID="GTM-XXXXXXX"
```

### Vercel Analytics
```env
# Vercel Analytics
VERCEL_ANALYTICS_ID="your-vercel-analytics-id"
VERCEL_WEB_ANALYTICS="1"
```

### Custom Analytics
```env
# Custom Analytics Service
ANALYTICS_ENDPOINT="https://analytics.example.com/api"
ANALYTICS_API_KEY="your-analytics-api-key"
ANALYTICS_DEBUG="false"
```

## 🌐 Third-Party Services

### Stripe
```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY="pk_test_..."               # Website
STRIPE_SECRET_KEY="sk_test_..."                   # Admin
STRIPE_WEBHOOK_SECRET="whsec_..."                  # Both
STRIPE_CONNECT_CLIENT_ID="ca_..."                  # Optional
STRIPE_API_VERSION="2023-10-16"

# Stripe Webhooks
STRIPE_WEBHOOK_ENDPOINT="/api/webhooks/stripe"
STRIPE_WEBHOOK_TOLERANCE="300"
```

### Email Services
```env
# SendGrid (Alternative to SMTP)
SENDGRID_API_KEY="SG.your-api-key"
SENDGRID_FROM_EMAIL="noreply@gritdp.com"

# Mailgun (Alternative)
MAILGUN_API_KEY="your-mailgun-api-key"
MAILGUN_DOMAIN="mg.gritdp.com"
```

### Cloud Storage
```env
# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="grit-digital-performance"

# Cloudinary (Alternative)
CLOUDINARY_URL="cloudinary://your-cloudinary-url"
```

## 🧪 Development Environment Variables

### Local Development
```env
# Development Settings
NODE_ENV="development"
DEBUG="true"
LOG_LEVEL="debug"

# Mock Services
USE_MOCK_DATA="true"
MOCK_API_DELAY="1000"
MOCK_ERRORS="false"

# Hot Reload
FAST_REFRESH="true"
REACT_REFRESH="true"
```

### Testing
```env
# Testing Configuration
NODE_ENV="test"
TEST_DATABASE_URL="postgresql://test:test@localhost:5432/grit_test"
CI="true"
COVERAGE="true"
```

## 📱 Mobile Environment Variables (Future)

### React Native (Planned)
```env
# Mobile App Configuration
MOBILE_API_BASE_URL="https://admin.gritdp.com/api"
MOBILE_PUSH_NOTIFICATION_KEY="your-push-key"
MOBILE_DEEP_LINK_SCHEME="grit"
MOBILE_BUNDLE_ID="com.grit.mobile"
```

## 🔍 Environment Variable Validation

### Required Variables Check
```javascript
// Example validation script
const requiredVars = {
  website: ['DATABASE_URL', 'NEXTAUTH_SECRET'],
  admin: ['DATABASE_URL', 'NEXTAUTH_SECRET', 'STRIPE_SECRET_KEY']
};

function validateEnvironment(app) {
  const missing = requiredVars[app].filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables for ${app}: ${missing.join(', ')}`);
  }
}
```

### Type Safety
```typescript
// Environment variable types
interface EnvVars {
  DATABASE_URL: string;
  NEXTAUTH_SECRET: string;
  STRIPE_SECRET_KEY?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

declare global {
  namespace NodeJS {
    process {
      env: EnvVars;
    }
  }
}
```

## 🚨 Security Best Practices

### 1. Never Commit Secrets
```bash
# .gitignore
.env.local
.env.*.local
*.key
*.pem
```

### 2. Use Different Values per Environment
```env
# Development
NEXTAUTH_SECRET="dev-secret-not-for-production"

# Production
NEXTAUTH_SECRET="super-secure-production-secret-256-bits"
```

### 3. Rotate Secrets Regularly
- Change secrets every 90 days
- Use different secrets for each environment
- Monitor for leaked credentials

### 4. Use Environment-Specific Values
```env
# Development
DATABASE_URL="postgresql://dev:dev@localhost:5432/grit_dev"

# Production
DATABASE_URL="postgresql://user:secure-pass@db.prisma.io:5432/grit_prod"
```

## 🔄 Environment Setup Scripts

### Setup Script
```bash
#!/bin/bash
# setup-env.sh

echo "Setting up environment variables..."

# Create .env files if they don't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file"
fi

if [ ! -f apps/website/.env.local ]; then
  cp apps/website/.env.example apps/website/.env.local
  echo "Created website .env.local"
fi

if [ ! -f apps/admin/.env.local ]; then
  cp apps/admin/.env.example apps/admin/.env.local
  echo "Created admin .env.local"
fi

echo "Environment setup complete!"
echo "Please update the .env files with your actual values."
```

### Validation Script
```bash
#!/bin/bash
# validate-env.sh

echo "Validating environment variables..."

# Check required variables
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is required"
  exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
  echo "❌ NEXTAUTH_SECRET is required"
  exit 1
fi

echo "✅ Environment variables validated"
```

## 📞 Support

For environment variable issues:

1. **Documentation**: Check this guide first
2. **Templates**: Use `.env.example` files as templates
3. **Security**: Never share actual secret values
4. **Support**: env-support@gritdp.com

---

*Last updated: March 11, 2026*
