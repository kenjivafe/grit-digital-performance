# Deployment Guide

This guide covers how to deploy the Grit Hub template app to various platforms and environments.

## 🚀 Deployment Overview

The template app is a Next.js application that can be deployed to:
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **Docker containers**
- **Traditional hosting**

## 🌐 Vercel Deployment (Recommended)

### Prerequisites

- Vercel account
- GitHub repository
- Domain name (optional)

### Step-by-Step Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub if not already done
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `apps/template` directory

3. **Configure Build Settings**
   ```json
   {
     "buildCommand": "npm run build:template",
     "outputDirectory": "apps/template/.next",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

4. **Environment Variables**
   Set these in Vercel dashboard:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
   NEXT_PUBLIC_ORG_SLUG=your-organization
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Test the deployed application

### Custom Domain Setup

1. **Add Domain** in Vercel dashboard
2. **DNS Configuration**:
   ```
   A @ 76.76.19.19
   A @ 76.76.21.21
   CNAME www vercel-dns.com
   ```

### Vercel Configuration

Create `vercel.json` in `apps/template`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api_base_url"
  }
}
```

## 🌿 Netlify Deployment

### Prerequisites

- Netlify account
- GitHub repository

### Deployment Steps

1. **Build Configuration**
   Create `netlify.toml` in `apps/template`:
   ```toml
   [build]
     base = "apps/template"
     command = "npm run build"
     publish = ".next"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables**
   Set in Netlify dashboard:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
   NEXT_PUBLIC_ORG_SLUG=your-organization
   ```

3. **Deploy**
   - Connect GitHub repository
   - Configure build settings
   - Deploy automatically on push

## ☁️ AWS Amplify Deployment

### Prerequisites

- AWS account
- Amplify console access

### Deployment Steps

1. **Initialize Amplify**
   ```bash
   npm install -g @aws-amplify/cli
   amplify init
   ```

2. **Add Hosting**
   ```bash
   amplify add hosting
   # Choose: Continuous deployment (Git-based)
   # Choose: Yes, use existing GitHub repository
   ```

3. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Deploy**
   ```bash
   amplify publish
   ```

## 🐳 Docker Deployment

### Dockerfile

Create `apps/template/Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/template/package*.json ./apps/template/
COPY apps/admin/package*.json ./apps/admin/
COPY packages/*/package*.json ./packages/*/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build:template

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/template/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/apps/template/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/template/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/template/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  template-app:
    build:
      context: .
      dockerfile: apps/template/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
      - NEXT_PUBLIC_ORG_SLUG=your-organization
    restart: unless-stopped
```

### Running Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🖥️ Traditional Hosting

### Build for Production

```bash
# Install dependencies
npm install

# Build application
npm run build:template

# Start production server
npm run start:template
```

### Nginx Configuration

Create nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
pm2 ecosystem

# Start with PM2
pm2 start ecosystem.config.js --env production
```

## 🔧 Environment Configuration

### Production Environment Variables

Create `.env.production`:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
NEXT_PUBLIC_ORG_SLUG=your-organization

# Analytics (optional)
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_HOTJAR_ID=HOTJAR_ID

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Build Optimization

Update `next.config.js` for production:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## 📊 Performance Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Go to project settings
- Enable "Web Analytics"
- Configure data retention

### Custom Analytics

Add Google Analytics:
```typescript
// src/components/Analytics.tsx
import { useEffect } from 'react'
import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </>
  )
}
```

## 🔍 Health Checks

### Health Endpoint

Create `src/app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  })
}
```

### Monitoring Setup

```bash
# Health check script
#!/bin/bash
HEALTH_URL="https://your-domain.com/api/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
    echo "Application is healthy"
else
    echo "Application is unhealthy (HTTP $RESPONSE)"
    # Send alert
fi
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Template App

on:
  push:
    branches: [main]
    paths: ['apps/template/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build:template
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: apps/template
```

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check build logs
   npm run build:template
   
   # Common fixes:
   # - Update dependencies
   # - Check TypeScript errors
   # - Verify environment variables
   ```

2. **Environment Variables Not Working**
   ```bash
   # Verify variables are set correctly
   echo $NEXT_PUBLIC_API_BASE_URL
   
   # Check build-time vs runtime variables
   # NEXT_PUBLIC_* variables are available in browser
   ```

3. **Routing Issues**
   ```bash
   # Check Next.js configuration
   # Verify trailing slashes
   # Test dynamic routes
   ```

4. **Performance Issues**
   ```bash
   # Analyze bundle size
   npm run build:template
   
   # Check images and assets
   # Verify caching headers
   ```

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

### Rollback Strategy

```bash
# Vercel rollback
vercel rollback [deployment-url]

# Git rollback
git revert <commit-hash>
git push origin main
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Build process tested locally
- [ ] API endpoints accessible
- [ ] Domain DNS configured
- [ ] SSL certificates ready
- [ ] Monitoring set up

### Post-Deployment

- [ ] Application loads correctly
- [ ] API integration working
- [ ] Organization detection functional
- [ ] Registration forms working
- [ ] Mobile responsive
- [ ] Performance metrics acceptable

### Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] API endpoints protected
- [ ] Error messages sanitized
- [ ] Rate limiting configured

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/hosting.html)

---

Last updated: 2024-03-12
Version: 1.0.0
