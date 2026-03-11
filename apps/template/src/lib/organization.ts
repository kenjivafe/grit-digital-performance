export function getOrganizationFromSubdomain(): string | null {
  if (typeof window === 'undefined') return null

  const hostname = window.location.hostname
  const parts = hostname.split('.')
  
  // Check if we're on a subdomain
  if (parts.length >= 3 && parts[parts.length - 2] === 'gritdp' && parts[parts.length - 1] === 'com') {
    return parts[0]
  }
  
  // Fallback to environment variable for development
  if (process.env.NEXT_PUBLIC_ORG_SLUG) {
    return process.env.NEXT_PUBLIC_ORG_SLUG
  }
  
  // Default to test organization for development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'tuguegaraoleague'
  }
  
  return null
}

export function isValidOrganizationDomain(hostname: string): boolean {
  const parts = hostname.split('.')
  
  // Check for organization.gritdp.com pattern
  if (parts.length >= 3 && parts[parts.length - 2] === 'gritdp' && parts[parts.length - 1] === 'com') {
    return true
  }
  
  // Check for custom domain (would need to be validated against database)
  // This is a placeholder for future custom domain validation
  return false
}

export function getOrganizationContext(): {
  slug: string | null
  isValid: boolean
  domain: string
} {
  if (typeof window === 'undefined') {
    const slug = process.env.NEXT_PUBLIC_ORG_SLUG || 'tuguegaraoleague'
    return {
      slug,
      isValid: !!slug,
      domain: 'localhost'
    }
  }

  const hostname = window.location.hostname
  const slug = getOrganizationFromSubdomain()
  
  return {
    slug,
    isValid: isValidOrganizationDomain(hostname) && !!slug,
    domain: hostname
  }
}
