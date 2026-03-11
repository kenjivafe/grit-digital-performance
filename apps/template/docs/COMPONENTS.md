# Component Documentation

This guide covers all the components used in the Grit Hub template app, their props, usage examples, and customization options.

## 📋 Component Overview

The template app includes the following main components:

### Layout Components
- **Layout** - Main layout wrapper with navbar and footer
- **Container** - Responsive container component
- **PageHeader** - Page header with title and actions

### UI Components
- **Navbar** - Dynamic navigation bar with organization menu
- **EventCard** - Event listing card with registration
- **CategoryHero** - Category page hero section
- **RegistrationModal** - Modal for event registration

### Utility Components
- **LoadingSpinner** - Loading indicator
- **ErrorMessage** - Error display with retry

## 🏗️ Layout Components

### Layout

Main layout component that wraps all pages with navbar and footer.

```typescript
interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps)
```

**Usage:**
```typescript
import { Layout } from '@/components/Layout'

export default function MyPage() {
  return (
    <Layout>
      <div>Page content</div>
    </Layout>
  )
}
```

**Features:**
- Responsive navbar with mobile menu
- Footer with organization information
- Consistent page structure
- SEO meta tags support

### Container

Responsive container with consistent max-width and padding.

```typescript
interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps)
```

**Usage:**
```typescript
<Container className="py-8">
  <div>Content with container spacing</div>
</Container>
```

**Features:**
- Max-width of 7xl (1280px)
- Responsive padding (4, 6, 8 on sm, md, lg)
- Custom className support
- Consistent spacing across pages

### PageHeader

Page header with title, description, and action buttons.

```typescript
interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps)
```

**Usage:**
```typescript
<PageHeader
  title="Events"
  description="Browse and register for upcoming events"
>
  <button>Add Event</button>
</PageHeader>
```

**Features:**
- Consistent header styling
- Optional description text
- Action buttons area
- Responsive design

## 🧭 Navigation Components

### Navbar

Dynamic navigation bar with organization branding and category-based menu.

```typescript
// No explicit props - uses hooks for data
export function Navbar()
```

**Features:**
- Dynamic category navigation from API
- Organization logo and name
- Mobile responsive hamburger menu
- Active link highlighting
- Loading and error states

**Customization:**
```typescript
// Modify navigation items in Navbar.tsx
const staticNavItems = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' }
]
```

**Mobile Menu:**
- Hamburger button on mobile
- Full-screen overlay menu
- Smooth transitions
- Touch-friendly interface

## 📋 Event Components

### EventCard

Card component for displaying event information with registration button.

```typescript
interface EventCardProps {
  event: Event
  onRegister: (event: Event) => void
}

export function EventCard({ event, onRegister }: EventCardProps)
```

**Usage:**
```typescript
<EventCard
  event={event}
  onRegister={(event) => openRegistrationModal(event)}
/>
```

**Features:**
- Event name and description
- Date and time formatting
- Location information
- Registration type indicator
- Price display with currency
- Registration button with status
- Hover effects and transitions

**Event Data Structure:**
```typescript
interface Event {
  id: string
  name: string
  slug: string
  description?: string
  startDate: string
  endDate?: string
  location?: string
  registrationType: 'individual' | 'team'
  price: number
  currency: string
  // ... other fields
}
```

**Customization Options:**
```typescript
// Modify card appearance
<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  {/* Card content */}
</div>
```

### CategoryHero

Hero section for category pages with gradient background.

```typescript
interface CategoryHeroProps {
  category: Category
  eventCount: number
}

export function CategoryHero({ category, eventCount }: CategoryHeroProps)
```

**Usage:**
```typescript
<CategoryHero
  category={category}
  eventCount={events.length}
/>
```

**Features:**
- Gradient background
- Category name and description
- Event count statistics
- Current month display
- Call-to-action button
- Responsive design

**Category Data Structure:**
```typescript
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  navigationOrder: number
  showInNavigation: boolean
}
```

## 📝 Registration Components

### RegistrationModal

Modal component for event registration with individual and team forms.

```typescript
interface RegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function RegistrationModal({ event, isOpen, onClose, onSuccess }: RegistrationModalProps)
```

**Usage:**
```typescript
<RegistrationModal
  event={selectedEvent}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={handleRegistrationSuccess}
/>
```

**Features:**
- Individual registration form
- Team registration with dynamic players
- Form validation with error messages
- Loading states during submission
- Success confirmation
- Error handling with retry

**Individual Registration Fields:**
- Name (required)
- Email (required, email validation)
- Phone (optional)
- Notes (optional)

**Team Registration Fields:**
- Team name (required)
- Coach name (optional)
- Coach email (optional)
- Coach phone (optional)
- Dynamic player list (1+ players required)

**Validation Rules:**
```typescript
// Individual registration
const individualValidation = {
  name: { required: true, minLength: 2 },
  email: { required: true, format: 'email' },
  phone: { format: 'phone' }
}

// Team registration
const teamValidation = {
  teamName: { required: true, minLength: 2 },
  players: { required: true, minLength: 1, maxLength: maxPlayers }
}
```

## 🎨 UI Components

### LoadingSpinner

Animated loading spinner component.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps)
```

**Usage:**
```typescript
<LoadingSpinner size="lg" className="text-blue-600" />
```

**Sizes:**
- `sm`: 16px
- `md`: 24px (default)
- `lg`: 32px

**Features:**
- Smooth rotation animation
- Customizable size and color
- Accessibility support
- CSS-only implementation

### ErrorMessage

Error display component with optional retry button.

```typescript
interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ message, onRetry, className = '' }: ErrorMessageProps)
```

**Usage:**
```typescript
<ErrorMessage
  message="Failed to load events"
  onRetry={() => refetch()}
/>
```

**Features:**
- Clear error messaging
- Optional retry functionality
- Consistent styling
- Accessibility support

## 🎯 Component Patterns

### Data Fetching Pattern

Most components use custom hooks for data fetching:

```typescript
// Hook usage in components
const { data: events, loading, error } = useEvents()

// Conditional rendering
if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error} />
return <EventList events={events} />
```

### Error Boundary Pattern

Components include error handling:

```typescript
try {
  const response = await apiClient.getEvents()
  setEvents(response.data)
} catch (error) {
  setError(error.message)
}
```

### Responsive Design Pattern

Components use Tailwind responsive utilities:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid layout */}
</div>
```

## 🔧 Customization Guide

### Styling Customization

1. **CSS Variables**: Update in `globals.css`
2. **Tailwind Classes**: Modify component class names
3. **Theme Colors**: Update color variables

### Component Extension

```typescript
// Extend EventCard with custom features
interface CustomEventCardProps extends EventCardProps {
  showExtraInfo?: boolean
  customAction?: (event: Event) => void
}

export function CustomEventCard({ showExtraInfo, customAction, ...props }: CustomEventCardProps) {
  return (
    <EventCard {...props}>
      {showExtraInfo && <ExtraInfo />}
      {customAction && <CustomAction />}
    </EventCard>
  )
}
```

### Theme Variants

```typescript
// Create themed variants
const EventCardVariants = {
  default: 'bg-white border-gray-200',
  featured: 'bg-blue-50 border-blue-200',
  compact: 'bg-gray-50 border-gray-300'
}
```

## 📱 Mobile Considerations

### Responsive Breakpoints

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

### Touch Targets

Minimum touch target size: 44px × 44px

```typescript
// Mobile-friendly button
<button className="min-h-[44px] min-w-[44px] px-4 py-2">
  Click me
</button>
```

### Mobile Navigation

Hamburger menu with overlay:
```typescript
// Mobile menu implementation
const [isMenuOpen, setIsMenuOpen] = useState(false)

// Touch-friendly menu items
<div className="md:hidden">
  <button 
    className="p-2"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    Menu
  </button>
</div>
```

## ♿ Accessibility Features

### ARIA Labels

```typescript
// Accessible button
<button
  aria-label="Register for event"
  aria-describedby={`event-${event.id}-description`}
>
  Register
</button>
```

### Keyboard Navigation

```typescript
// Focus management
const modalRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus()
  }
}, [isOpen])
```

### Screen Reader Support

```typescript
// Semantic HTML
<main role="main" aria-label="Event listings">
  <h1>Upcoming Events</h1>
  <EventList />
</main>
```

## 🧪 Testing Components

### Unit Testing Example

```typescript
import { render, screen } from '@testing-library/react'
import { EventCard } from '@/components/EventCard'

test('renders event name and date', () => {
  const mockEvent = {
    id: '1',
    name: 'Test Event',
    startDate: '2024-03-15',
    // ... other fields
  }

  render(<EventCard event={mockEvent} onRegister={jest.fn()} />)
  
  expect(screen.getByText('Test Event')).toBeInTheDocument()
  expect(screen.getByText(/2024-03-15/)).toBeInTheDocument()
})
```

### Integration Testing

```typescript
test('registration flow opens modal', async () => {
  const onRegister = jest.fn()
  render(<EventCard event={mockEvent} onRegister={onRegister} />)
  
  fireEvent.click(screen.getByText('Register'))
  expect(onRegister).toHaveBeenCalledWith(mockEvent)
})
```

## 🔄 Component Lifecycle

### Mounting

```typescript
useEffect(() => {
  // Component mounted
  console.log('EventCard mounted')
}, [])
```

### Updates

```typescript
useEffect(() => {
  // Event prop changed
  console.log('Event changed:', event.id)
}, [event])
```

### Unmounting

```typescript
useEffect(() => {
  return () => {
    // Cleanup
    console.log('EventCard unmounted')
  }
}, [])
```

## 📚 Best Practices

### Component Design

1. **Single Responsibility**: Each component has one purpose
2. **Props Interface**: Strong TypeScript typing
3. **Error Boundaries**: Graceful error handling
4. **Accessibility**: ARIA labels and keyboard support
5. **Performance**: Memoization for expensive operations

### Code Organization

```typescript
// Component structure
export function ComponentName() {
  // 1. State and hooks
  const [state, setState] = useState()
  const { data } = useHook()
  
  // 2. Event handlers
  const handleClick = () => {}
  
  // 3. Effects
  useEffect(() => {}, [])
  
  // 4. Conditional rendering
  if (loading) return <LoadingSpinner />
  
  // 5. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Performance Optimization

```typescript
// Memoize expensive computations
const processedData = useMemo(() => {
  return expensiveCalculation(data)
}, [data])

// Memoize event handlers
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

## 🔍 Debugging

### Component Debug Mode

```typescript
// Enable debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('EventCard props:', props)
}
```

### React DevTools

Use React DevTools to:
- Inspect component props and state
- Profile component performance
- Debug component hierarchy

### Common Issues

1. **Props Not Updating**: Check dependency arrays
2. **Memory Leaks**: Cleanup effects properly
3. **Performance**: Use React.memo for expensive components
4. **Styling**: Verify Tailwind class names

---

Last updated: 2024-03-12
Version: 1.0.0
