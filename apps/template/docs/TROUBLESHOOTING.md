# Troubleshooting Guide

This guide covers common issues, debugging techniques, and solutions for the Grit Hub template app.

## 🔍 Common Issues

### Organization Detection Issues

#### Issue: Organization Not Found
**Symptoms:**
- "Organization Not Found" error page
- Invalid subdomain message
- Redirect to homepage

**Causes:**
- Incorrect subdomain configuration
- API endpoint not accessible
- Organization doesn't exist in database
- Environment variable override issues

**Solutions:**
1. **Check Subdomain:**
   ```bash
   # Verify subdomain format
   organization.gritdp.com  # Correct
   www.gritdp.com           # Invalid
   ```

2. **Verify API Access:**
   ```bash
   # Test API endpoint
   curl "https://admin-grit-digital-performance.vercel.app/api/organizations/your-slug"
   ```

3. **Check Environment Variables:**
   ```env
   # In .env.local
   NEXT_PUBLIC_ORG_SLUG=your-organization
   ```

4. **Debug Organization Detection:**
   ```typescript
   // In browser console
   console.log('Organization slug:', window.location.hostname.split('.')[0])
   ```

#### Issue: Subdomain Not Extracted Correctly
**Symptoms:**
- Organization slug is null or undefined
- Fallback to environment variable

**Causes:**
- Wrong domain format
- Local development without subdomain
- DNS configuration issues

**Solutions:**
1. **Use Environment Variable for Local Dev:**
   ```env
   NEXT_PUBLIC_ORG_SLUG=test-organization
   ```

2. **Check Hostname Parsing:**
   ```javascript
   // Test in browser console
   const hostname = window.location.hostname
   const parts = hostname.split('.')
   console.log('Hostname parts:', parts)
   ```

### API Integration Issues

#### Issue: API Calls Failing
**Symptoms:**
- Loading spinners never disappear
- Error messages about network failures
- Empty data displays

**Causes:**
- API base URL incorrect
- Network connectivity issues
- CORS configuration problems
- API server downtime

**Solutions:**
1. **Verify API Base URL:**
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://admin-grit-digital-performance.vercel.app/api
   ```

2. **Test API Endpoints:**
   ```bash
   # Test organization endpoint
   curl -I "https://admin-grit-digital-performance.vercel.app/api/organizations/test"
   
   # Test events endpoint
   curl -I "https://admin-grit-digital-performance.vercel.app/api/events?organization=test"
   ```

3. **Check Network Tab:**
   - Open browser DevTools
   - Go to Network tab
   - Look for failed API calls
   - Check response codes and errors

4. **Enable Debug Logging:**
   ```typescript
   // In src/lib/api.ts
   if (process.env.NODE_ENV === 'development') {
     console.log('API Request:', url, options)
     console.log('API Response:', response)
   }
   ```

#### Issue: Data Not Loading
**Symptoms:**
- Components show loading state indefinitely
- Empty lists instead of data
- Error messages about missing data

**Causes:**
- API response format changed
- Data structure mismatch
- Cache invalidation issues
- Hook dependency problems

**Solutions:**
1. **Check API Response Format:**
   ```bash
   curl "https://admin-grit-digital-performance.vercel.app/api/events?organization=test" | jq .
   ```

2. **Verify Data Interfaces:**
   ```typescript
   // Check if API response matches TypeScript interfaces
   interface Event {
     id: string
     name: string
     // ... other fields
   }
   ```

3. **Clear Cache:**
   ```typescript
   // Clear in-memory cache
   localStorage.clear()
   // Or refresh page with hard refresh
   ```

4. **Check Hook Dependencies:**
   ```typescript
   // Verify useEffect dependencies
   useEffect(() => {
     fetchEvents()
   }, [organizationSlug]) // Make sure dependencies are correct
   ```

### Registration Issues

#### Issue: Registration Form Not Submitting
**Symptoms:**
- Submit button disabled
- Validation errors not showing
- Form submission hangs

**Causes:**
- Form validation errors
- Required fields missing
- API submission failures
- Network connectivity issues

**Solutions:**
1. **Check Form Validation:**
   ```typescript
   // In RegistrationModal, check form state
   console.log('Form valid:', isFormValid)
   console.log('Form errors:', formErrors)
   ```

2. **Verify Required Fields:**
   ```typescript
   // Individual registration requirements
   const requiredFields = ['name', 'email']
   
   // Team registration requirements
   const requiredFields = ['teamName', 'players']
   ```

3. **Test API Submission:**
   ```bash
   # Test registration endpoint
   curl -X POST "https://admin-grit-digital-performance.vercel.app/api/registrations" \
     -H "Content-Type: application/json" \
     -d '{"eventId":"test","type":"individual","individualData":{...}}'
   ```

4. **Check Network Tab for Submission:**
   - Look for POST requests to `/api/registrations`
   - Check request payload
   - Verify response status

#### Issue: Team Registration Player Limit
**Symptoms:**
- Cannot add more players
- Error about maximum players
- Player removal not working

**Causes:**
- Event maxPlayersPerTeam limit
- JavaScript array manipulation issues
- State management problems

**Solutions:**
1. **Check Event Configuration:**
   ```typescript
   // Verify event has maxPlayersPerTeam
   console.log('Max players:', event.maxPlayersPerTeam)
   ```

2. **Debug Player Management:**
   ```typescript
   // In RegistrationModal, check player state
   console.log('Current players:', players.length)
   console.log('Max allowed:', maxPlayers)
   ```

3. **Test Player Addition/Removal:**
   ```javascript
   // Test in browser console
   // Add player
   addPlayer({ name: 'Test Player' })
   
   // Remove player
   removePlayer(0)
   ```

### Styling and UI Issues

#### Issue: Responsive Design Not Working
**Symptoms:**
- Mobile layout broken
- Navigation menu not working
- Elements overlapping

**Causes:**
- Tailwind CSS not loading
- Breakpoint issues
- CSS conflicts
- Missing responsive classes

**Solutions:**
1. **Check Tailwind CSS Loading:**
   ```html
   <!-- Verify globals.css is imported -->
   <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
   ```

2. **Test Responsive Breakpoints:**
   - Open DevTools
   - Use device simulation
   - Test different screen sizes

3. **Check CSS Classes:**
   ```bash
   # Verify Tailwind classes are applied
   # Look for responsive prefixes: sm:, md:, lg:, xl:
   ```

4. **Debug Navigation Menu:**
   ```javascript
   // Test mobile menu state
   console.log('Menu open:', isMenuOpen)
   ```

#### Issue: Dark Mode Not Working
**Symptoms:**
- Dark mode not applying
- Colors not switching
- Theme toggle not working

**Causes:**
- CSS variables not defined
- Dark mode class not applied
- Tailwind dark mode config issues

**Solutions:**
1. **Check CSS Variables:**
   ```css
   /* Verify dark mode variables exist */
   .dark {
     --background: 15 23 42;
     --foreground: 243 244 246;
   }
   ```

2. **Test Dark Mode Class:**
   ```javascript
   // Add dark class manually
   document.documentElement.classList.add('dark')
   
   // Remove dark class
   document.documentElement.classList.remove('dark')
   ```

3. **Check Tailwind Config:**
   ```javascript
   // In tailwind.config.ts
   darkMode: 'class', // Should be 'class' for manual dark mode
   ```

### Performance Issues

#### Issue: Slow Page Loading
**Symptoms:**
- Pages take long to load
- Images loading slowly
- API calls taking too long

**Causes:**
- Large bundle size
- Unoptimized images
- API response times
- Too many API calls

**Solutions:**
1. **Check Bundle Size:**
   ```bash
   npm run build:template
   # Check .next/build analyze
   ```

2. **Optimize Images:**
   ```typescript
   // Use Next.js Image component
   import Image from 'next/image'
   
   <Image
     src={imageUrl}
     alt="Description"
     width={300}
     height={200}
     priority // For above-fold images
   />
   ```

3. **Check API Performance:**
   ```bash
   # Time API calls
   time curl "https://admin-grit-digital-performance.vercel.app/api/events"
   ```

4. **Enable Caching:**
   ```typescript
   // Check if caching is working
   console.log('Cache status:', cache.size)
   ```

#### Issue: Memory Leaks
**Symptoms:**
- Browser memory usage increasing
- Page becoming slow over time
- React warnings about updates

**Causes:**
- Uncleaned up effects
- Event listeners not removed
- Memory leaks in components

**Solutions:**
1. **Check Effect Cleanup:**
   ```typescript
   useEffect(() => {
     // Setup
     const timer = setInterval(() => {}, 1000)
     
     return () => {
       // Cleanup
       clearInterval(timer)
     }
   }, [])
   ```

2. **Remove Event Listeners:**
   ```typescript
   useEffect(() => {
     const handleResize = () => {}
     window.addEventListener('resize', handleResize)
     
     return () => {
       window.removeEventListener('resize', handleResize)
     }
   }, [])
   ```

3. **Use React.memo:**
   ```typescript
   const MemoizedComponent = React.memo(({ data }) => {
     return <div>{data}</div>
   })
   ```

## 🛠️ Debugging Techniques

### Browser DevTools

#### Network Tab
- Monitor API calls
- Check response status
- Analyze request/response payload
- Identify failed requests

#### Console Tab
- Check for JavaScript errors
- Monitor console.log output
- Debug component state
- Test API calls manually

#### Elements Tab
- Inspect DOM structure
- Check applied CSS
- Debug responsive design
- Analyze component hierarchy

#### Performance Tab
- Analyze page load performance
- Check JavaScript execution time
- Monitor memory usage
- Identify performance bottlenecks

### React DevTools

#### Component Tree
- Inspect component props and state
- Debug component hierarchy
- Monitor component updates
- Check hook dependencies

#### Profiler
- Profile component performance
- Identify expensive renders
- Analyze render times
- Optimize component updates

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
NEXT_PUBLIC_DEBUG=true
```

Add debug statements:
```typescript
if (process.env.NEXT_PUBLIC_DEBUG) {
  console.log('Debug info:', data)
}
```

## 🧪 Testing Solutions

### Unit Testing

Test individual components:
```typescript
import { render, screen } from '@testing-library/react'
import { EventCard } from '@/components/EventCard'

test('EventCard renders correctly', () => {
  const mockEvent = {
    id: '1',
    name: 'Test Event',
    // ... other fields
  }
  
  render(<EventCard event={mockEvent} onRegister={jest.fn()} />)
  
  expect(screen.getByText('Test Event')).toBeInTheDocument()
})
```

### Integration Testing

Test component interactions:
```typescript
test('Registration flow works', async () => {
  const onRegister = jest.fn()
  render(<EventCard event={mockEvent} onRegister={onRegister} />)
  
  fireEvent.click(screen.getByText('Register'))
  expect(onRegister).toHaveBeenCalledWith(mockEvent)
})
```

### E2E Testing

Test complete user flows:
```typescript
// Using Playwright or Cypress
test('Complete registration flow', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="event-card"]')
  await page.fill('[data-testid="name-input"]', 'John Doe')
  await page.fill('[data-testid="email-input"]', 'john@example.com')
  await page.click('[data-testid="submit-button"]')
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## 📋 Troubleshooting Checklist

### Before Starting

- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] Dependencies installed
- [ ] Browser cache cleared
- [ ] Console checked for errors

### During Debugging

- [ ] Identify specific error
- [ ] Reproduce issue consistently
- [ ] Check browser DevTools
- [ ] Test in different browsers
- [ ] Verify API responses

### After Fixing

- [ ] Test solution thoroughly
- [ ] Check for regression
- [ ] Update documentation
- [ ] Commit changes with clear message
- [ ] Test in production environment

## 🆘 Getting Help

### Resources

1. **Documentation**: Check existing docs first
2. **GitHub Issues**: Search for similar issues
3. **Community Forums**: Ask for help
4. **Support Team**: Contact for critical issues

### Contact Information

- **Technical Support**: tech-support@gritdp.com
- **API Issues**: api-support@gritdp.com
- **Documentation Feedback**: docs@gritdp.com

### Reporting Issues

When reporting issues, include:

1. **Environment Details**:
   - Browser version
   - Node.js version
   - Operating system
   - Deployment platform

2. **Error Description**:
   - What happened
   - Expected behavior
   - Actual behavior
   - Steps to reproduce

3. **Error Logs**:
   - Console errors
   - Network request failures
   - Server logs (if available)

4. **Screenshots**:
   - Visual representation of issue
   - Before/after comparisons

## 🔄 Common Workflows

### Reset Development Environment

```bash
# Clean slate
rm -rf node_modules package-lock.json
npm install
npm run dev:template
```

### Clear All Caches

```bash
# Clear npm cache
npm cache clean --force

# Clear Next.js cache
rm -rf .next

# Clear browser cache
# In browser: Ctrl+Shift+R (hard refresh)
```

### Rebuild from Scratch

```bash
# Clean build
npm run clean
npm run build:template
npm run start:template
```

### Debug Production Issues

```bash
# Build production version
npm run build:template

# Start production server
npm run start:template

# Test production build locally
```

## 📚 Additional Resources

### Documentation

- [Next.js Debugging](https://nextjs.org/docs/advanced-features/debugging)
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Tools

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

### Communities

- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nextjs)
- [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

Last updated: 2024-03-12
Version: 1.0.0
