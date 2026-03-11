# Branding Customization Guide

This guide covers how to customize the template app's branding, colors, fonts, and visual identity to match your organization's style.

## 🎨 Overview

The template app is designed to be easily customizable while maintaining a consistent, professional appearance. All branding elements are centralized and can be modified without affecting core functionality.

## 🌈 Color System

### CSS Variables

The app uses CSS custom properties for consistent theming:

```css
/* src/app/globals.css */
:root {
  /* Primary Colors */
  --primary: 59 130 246;              /* blue-500 */
  --primary-foreground: 255 255 255;
  
  /* Secondary Colors */
  --secondary: 243 244 246;            /* gray-100 */
  --secondary-foreground: 15 23 42;    /* slate-900 */
  
  /* Accent Colors */
  --accent: 59 130 246;                 /* blue-500 */
  --accent-foreground: 255 255 255;
  
  /* Neutral Colors */
  --background: 255 255 255;
  --foreground: 15 23 42;              /* slate-900 */
  --muted: 243 244 246;                /* gray-100 */
  --muted-foreground: 107 114 128;     /* gray-500 */
  
  /* Border Colors */
  --border: 229 231 235;               /* gray-200 */
  --input: 255 255 255;
  --ring: 59 130 246;                  /* blue-500 */
}
```

### Dark Mode Colors

```css
.dark {
  --background: 15 23 42;              /* slate-900 */
  --foreground: 243 244 246;            /* gray-100 */
  --muted: 30 41 59;                   /* slate-800 */
  --muted-foreground: 148 163 184;     /* slate-400 */
  --border: 30 41 59;                  /* slate-800 */
  --input: 30 41 59;                   /* slate-800 */
}
```

### Customizing Colors

1. **Update CSS Variables** in `src/app/globals.css`:
   ```css
   :root {
     --primary: 16 185 129;            /* emerald-500 */
     --primary-foreground: 255 255 255;
     /* ... other colors */
   }
   ```

2. **Update Tailwind Config** in `tailwind.config.ts`:
   ```typescript
   theme: {
     extend: {
       colors: {
         primary: {
           DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
           foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
         }
       }
     }
   }
   ```

## 🔤 Typography

### Font Configuration

Update fonts in `src/app/layout.tsx`:

```typescript
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})
```

### Font Classes

Apply fonts using CSS variables:

```css
body {
  font-family: var(--font-inter), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-montserrat), sans-serif;
}
```

### Typography Scale

Update in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
      heading: ['var(--font-montserrat)', 'sans-serif'],
    },
    fontSize: {
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    }
  }
}
```

## 🖼️ Logo and Branding

### Logo Implementation

Update the logo in `src/components/Navbar.tsx`:

```typescript
// Replace with your logo component
<div className="flex items-center space-x-2">
  {organization?.logo ? (
    <img
      src={organization.logo}
      alt={organization.name}
      className="w-8 h-8 rounded-lg object-contain"
    />
  ) : (
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">Y</span>
    </div>
  )}
  <span className="text-xl font-bold text-gray-900">Your Brand</span>
</div>
```

### Logo Options

1. **Dynamic Logo**: From organization API
2. **Static Logo**: Import SVG or image
3. **Text Logo**: Custom typography
4. **Icon Logo**: Font Awesome or custom SVG

### Footer Branding

Update footer in `src/components/Layout.tsx`:

```typescript
<div className="flex items-center space-x-2">
  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold text-sm">Y</span>
  </div>
  <span className="text-xl font-bold text-gray-900">Your Brand</span>
</div>
```

## 🎯 Component-Specific Branding

### Navigation Bar

Customize navbar styling in `src/components/Navbar.tsx`:

```typescript
// Update colors
<div className="bg-white border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Navigation content */}
  </div>
</div>
```

### Event Cards

Update event card styling in `src/components/EventCard.tsx`:

```typescript
// Update card appearance
<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### Registration Modal

Customize modal in `src/components/RegistrationModal.tsx`:

```typescript
// Update modal styling
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    {/* Modal content */}
  </div>
</div>
```

## 🌐 Theme Variants

### Creating Theme Variants

1. **Create theme file** `src/themes/your-theme.css`:
   ```css
   :root {
     --primary: 16 185 129;            /* emerald-500 */
     --primary-foreground: 255 255 255;
     --secondary: 240 253 244;          /* emerald-50 */
     --secondary-foreground: 4 120 84;   /* emerald-700 */
   }
   ```

2. **Import theme** in `src/app/globals.css`:
   ```css
   @import '../themes/your-theme.css';
   ```

### Theme Switching

Implement theme switching:

```typescript
// Theme context
const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({ theme: 'default', setTheme: () => {} });

// Theme provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('default');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
```

## 📱 Mobile Branding

### Mobile Navigation

Customize mobile menu in `src/components/Navbar.tsx`:

```typescript
// Mobile menu styling
<div className="md:hidden">
  <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
    {/* Hamburger icon */}
  </button>
</div>
```

### Responsive Logo

Adjust logo size for mobile:

```css
.logo {
  width: 2rem;
  height: 2rem;
}

@media (max-width: 768px) {
  .logo {
    width: 1.5rem;
    height: 1.5rem;
  }
}
```

## 🎪 Event-Specific Branding

### Category Colors

Apply different colors per category:

```typescript
// Category color mapping
const categoryColors = {
  basketball: 'orange',
  volleyball: 'blue',
  football: 'green',
  // ... other categories
};

// Apply in component
<div className={`bg-${categoryColors[category]}-500 text-white`}>
  {category.name}
</div>
```

### Event Status Badges

Customize status badges:

```typescript
// Status badge styling
<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
  status === 'open' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800'
}`}>
  {status}
</span>
```

## 🔧 Advanced Customization

### Custom CSS

Add custom CSS in `src/app/globals.css`:

```css
/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom components */
.custom-card {
  @apply bg-white border border-gray-200 rounded-lg shadow-md;
  animation: fadeIn 0.3s ease-out;
}

/* Custom utilities */
.text-gradient {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Component Overrides

Override component styles:

```typescript
// Custom button variant
const CustomButton = ({ children, ...props }) => (
  <button
    className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-accent-600 transition-all"
    {...props}
  >
    {children}
  </button>
);
```

## 📋 Branding Checklist

### Before Launch

- [ ] Update primary and secondary colors
- [ ] Customize logo and favicon
- [ ] Set up typography (fonts, sizes)
- [ ] Test dark mode appearance
- [ ] Verify responsive behavior
- [ ] Check accessibility (contrast ratios)
- [ ] Test across different browsers
- [ ] Validate brand consistency

### Brand Guidelines

1. **Color Usage**: Maintain consistent color hierarchy
2. **Typography**: Use established font families and sizes
3. **Spacing**: Follow consistent spacing patterns
4. **Imagery**: Use high-quality, consistent imagery
5. **Voice**: Maintain consistent tone in copy

## 🎨 Design Resources

### Color Palette Generator

- [Coolors](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Color theme tools
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Tailwind color system

### Typography Resources

- [Google Fonts](https://fonts.google.com/) - Free fonts
- [Font Pair](https://fontpair.co/) - Font pairing
- [Typewolf](https://www.typewolf.com/) - Typography inspiration

### Icon Libraries

- [Heroicons](https://heroicons.com/) - SVG icons
- [Lucide](https://lucide.dev/) - Icon library
- [Font Awesome](https://fontawesome.com/) - Icon set

## 🔍 Testing Branding

### Visual Testing

1. **Screenshot Testing**: Compare before/after screenshots
2. **Cross-Browser Testing**: Test in Chrome, Firefox, Safari
3. **Device Testing**: Test on mobile, tablet, desktop
4. **Accessibility Testing**: Check contrast ratios and screen readers

### Automated Testing

```typescript
// Color contrast testing
test('primary color has sufficient contrast', () => {
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary');
  // Test contrast ratio
});

// Responsive testing
test('logo is responsive', () => {
  // Test logo size at different breakpoints
});
```

## 🆘 Troubleshooting

### Common Issues

1. **Colors Not Applying**: Check CSS variable syntax
2. **Fonts Not Loading**: Verify font imports and paths
3. **Responsive Issues**: Check Tailwind breakpoints
4. **Dark Mode Problems**: Verify dark mode CSS variables

### Debug Tools

1. **Browser DevTools**: Inspect elements and styles
2. **Color Contrast Checker**: Verify accessibility
3. **Responsive Design Mode**: Test different screen sizes
4. **Performance Tab**: Check CSS performance

## 📚 Additional Resources

- [Tailwind CSS Customization](https://tailwindcss.com/docs/configuration)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

Last updated: 2024-03-12
Version: 1.0.0
