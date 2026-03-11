# Grit Hub Template App

A modern, responsive Next.js template for sports organization websites with dynamic content management, event registration, and comprehensive theming.

## 🚀 Features

- **Dynamic Organization Detection**: Subdomain-based organization identification
- **Event Management**: Complete event listings, details, and registration
- **Category-Based Navigation**: Dynamic navigation from organization categories
- **Registration System**: Individual and team event registration with validation
- **Responsive Design**: Mobile-first design with dark mode support
- **Performance Optimized**: Image optimization, lazy loading, and caching
- **SEO Ready**: Complete meta tags and structured data
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/grit-digital-performance.git
   cd grit-digital-performance
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/template/.env.example apps/template/.env.local
   ```
   
   Edit `apps/template/.env.local` with your configuration:
   ```env
   # Organization slug for local development (optional)
   NEXT_PUBLIC_ORG_SLUG=your-organization
   
   # API base URL (defaults to production)
   NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
   ```

4. **Run the development server**
   ```bash
   npm run dev:template
   # or
   yarn dev:template
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
apps/template/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── [category]/     # Dynamic category pages
│   │   ├── events/[slug]/   # Dynamic event pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable React components
│   │   ├── ui/             # Base UI components
│   │   ├── Layout.tsx      # Main layout component
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── EventCard.tsx   # Event listing card
│   │   ├── CategoryHero.tsx # Category header
│   │   └── RegistrationModal.tsx # Registration modal
│   ├── lib/                # Utility libraries
│   │   ├── api.ts          # API client
│   │   ├── cache.ts        # Caching utilities
│   │   ├── hooks.ts        # Custom React hooks
│   │   ├── organization.ts # Organization detection
│   │   └── utils.ts        # General utilities
├── public/                 # Static assets
├── components.json         # ShadCN UI configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Usage

### Organization Detection

The template automatically detects organizations from subdomains:

- `organization.gritdp.com` → Detects `organization` slug
- Falls back to `NEXT_PUBLIC_ORG_SLUG` environment variable
- Shows error page for invalid organizations

### Dynamic Content

All content is dynamically fetched from the central API:

- **Organization Info**: Name, logo, description, location
- **Categories**: Navigation categories with ordering
- **Events**: Event listings with details and registration
- **Registration**: Individual and team registration forms

### Customization

#### Branding

Update organization branding by modifying:

1. **Logo**: Replace in Navbar component
2. **Colors**: Modify CSS variables in `globals.css`
3. **Typography**: Update Tailwind config

#### Styling

The template uses:
- **Tailwind CSS** for styling
- **ShadCN UI** for components
- **CSS Variables** for theming
- **Dark Mode** support

#### API Integration

Update API configuration in `src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-grit-digital-performance.vercel.app/api'
```

## 📱 Development

### Available Scripts

```bash
# Development
npm run dev:template          # Start development server
npm run dev                   # Start all apps (monorepo)

# Building
npm run build:template        # Build for production
npm run build                 # Build all apps

# Linting
npm run lint:template         # Lint template app
npm run lint                   # Lint all apps

# Type checking
npm run type-check:template   # TypeScript checking
npm run type-check            # Type check all apps
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ORG_SLUG` | Organization slug for local development | `null` |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL | `https://admin-grit-digital-performance.vercel.app/api` |

### Component Development

1. **Create new components** in `src/components/`
2. **Use TypeScript** for type safety
3. **Follow naming conventions** (PascalCase)
4. **Add proper exports** for easy importing

### API Integration

1. **Define interfaces** in `src/lib/api.ts`
2. **Create hooks** in `src/lib/hooks.ts`
3. **Handle errors** gracefully
4. **Add loading states** for better UX

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure environment variables**
3. **Deploy** automatically on push

### Manual Deployment

```bash
# Build
npm run build:template

# Start production server
npm run start:template
```

### Environment Setup

For production, ensure:

1. **API URL** is correctly configured
2. **Organization domains** are properly set up
3. **Environment variables** are set
4. **Image domains** are configured in Next.js config

## 🎨 Customization Guide

### Colors

Update CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: 59 130 246;        /* blue-500 */
  --primary-foreground: 255 255 255;
  --secondary: 243 244 246;      /* gray-100 */
  /* ... */
}
```

### Fonts

Update in `src/app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### Components

Customize components in `src/components/`:

- **Navbar**: Modify navigation items and branding
- **EventCard**: Update event display layout
- **RegistrationModal**: Customize registration forms
- **Layout**: Modify footer and structure

## 🔧 Configuration

### Next.js Configuration

Key settings in `next.config.js`:

- **Image domains**: Configure external image sources
- **Transpile packages**: Include monorepo packages
- **Experimental features**: Enable Next.js features

### Tailwind Configuration

Customize in `tailwind.config.ts`:

- **Theme colors**: Extend color palette
- **Animations**: Add custom animations
- **Plugins**: Include Tailwind plugins

### TypeScript Configuration

Strict TypeScript settings in `tsconfig.json`:

- **Strict mode**: Enable all strict checks
- **Path aliases**: Configure import shortcuts
- **Target**: ES2022+ features

## 🐛 Troubleshooting

### Common Issues

1. **Organization not found**
   - Check subdomain configuration
   - Verify API endpoints
   - Check environment variables

2. **API errors**
   - Verify API base URL
   - Check network connectivity
   - Review API response format

3. **Styling issues**
   - Clear browser cache
   - Check Tailwind class names
   - Verify CSS variables

4. **Build errors**
   - Check TypeScript types
   - Verify imports
   - Review configuration files

### Debug Mode

Enable debug mode by setting:

```env
NODE_ENV=development
```

Check browser console for detailed error information.

## 📚 API Documentation

See [API Integration Guide](../admin/docs/API-Integration-Guide.md) for detailed API documentation.

## 🤝 Contributing

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🆘 Support

For support:

- **Documentation**: Check this README and API docs
- **Issues**: Create GitHub issue
- **Contact**: info@gritdp.com

## 🎉 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - CSS framework
- **ShadCN UI** - Component library
- **TypeScript** - Type safety
- **Vercel** - Hosting platform

---

Built with ❤️ by [Grit Digital Performance](https://gritdp.com)
