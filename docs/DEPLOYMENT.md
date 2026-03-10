# Deployment Guide

This guide covers deployment for the two-app architecture after portal removal.

## 🏗️ Architecture Overview

After restructuring, we now have a two-app system:

1. **Website** (`apps/website`) - gritdp.com
2. **Admin + API Server** (`apps/admin`) - admin.gritdp.com

## 🚀 Deployment Options

### Vercel (Recommended)

#### Website Deployment
```bash
# Deploy website to gritdp.com
cd apps/website
vercel --prod

# Or use Vercel CLI from root
vercel --prod --scope website
```

#### Admin + API Server Deployment
```bash
# Deploy admin to admin.gritdp.com
cd apps/admin
vercel --prod

# Or use Vercel CLI from root
vercel --prod --scope admin
```

### Environment Variables

#### Website Environment Variables
```env
# apps/website/.env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://gritdp.com"
NEXTAUTH_SECRET="your-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

#### Admin Environment Variables
```env
# apps/admin/.env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://admin.gritdp.com"
NEXTAUTH_SECRET="your-secret-key"
STRIPE_SECRET_KEY="sk_live_..."
```

## 📋 Build Scripts

### Root Package Scripts
```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "dev:website": "turbo dev --filter=website",
    "dev:admin": "turbo dev --filter=admin",
    "build:website": "turbo build --filter=website",
    "build:admin": "turbo build --filter=admin"
  }
}
```

### Individual App Scripts

#### Website (`apps/website/package.json`)
```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  }
}
```

#### Admin (`apps/admin/package.json`)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 🔧 Turborepo Configuration

The `turbo.json` is configured for the two-app architecture:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 🌐 Domain Configuration

### Website Domain
- **Primary**: gritdp.com
- **Redirects**: www.gritdp.com → gritdp.com

### Admin Domain
- **Primary**: admin.gritdp.com
- **API Endpoints**: admin.gritdp.com/api/*

### Client Site Domains
- **Pattern**: [organization].gritdp.com
- **Examples**: tuguegaraoleague.gritdp.com, spupathletics.gritdp.com

## 📊 Database Deployment

### Prisma Cloud
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# View database
npx prisma studio
```

### Migration Files
- Location: `prisma/migrations/`
- Latest: `20260310190943_init/`
- Includes: domain and source tracking fields

## 🔒 Security Configuration

### CORS Settings
- Admin API handles CORS automatically
- Client domains must be configured in organization records
- API keys available for enhanced security

### Environment Security
- Use separate secrets for each app
- Rotate keys regularly
- Monitor API usage in admin dashboard

## 📈 Monitoring

### Admin Dashboard Monitoring
- **API Usage**: `/analytics/api-monitoring`
- **Cross-Site Analytics**: `/analytics/cross-site`
- **API Keys**: `/settings/api-keys`

### Vercel Analytics
- Website metrics: gritdp.com vercel dashboard
- Admin metrics: admin.gritdp.com vercel dashboard

## 🚦 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-website:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID_WEBSITE }}
          working-directory: apps/website

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID_ADMIN }}
          working-directory: apps/admin
```

## 🔄 Rollback Procedures

### Quick Rollback
```bash
# Rollback to previous deployment
vercel rollback [deployment-url]

# Or redeploy previous commit
git checkout [previous-commit]
vercel --prod
```

### Database Rollback
```bash
# Reset database (emergency only)
npx prisma migrate reset --force

# Redeploy with backup data
npx prisma db seed
```

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] API keys generated
- [ ] CORS domains configured
- [ ] SSL certificates valid

### Post-Deployment
- [ ] Test website functionality
- [ ] Test admin dashboard
- [ ] Test API endpoints
- [ ] Test client site integrations
- [ ] Verify monitoring dashboards

## 🆘 Troubleshooting

### Common Issues

**Build Failures**
- Check environment variables
- Verify dependencies in package.json
- Clear Turborepo cache: `turbo prune`

**API Errors**
- Check CORS configuration
- Verify API keys
- Test endpoints manually

**Database Issues**
- Check connection string
- Run migrations: `npx prisma migrate deploy`
- Verify schema: `npx prisma db pull`

### Support Contacts
- **Technical**: dev-team@gritdp.com
- **Deployment**: ops@gritdp.com
- **Emergency**: 24/7 hotline

---

*Updated: March 11, 2026*
