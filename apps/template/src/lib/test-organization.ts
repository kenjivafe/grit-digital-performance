// Test utility for organization detection across different environments
// This file is for development and testing purposes only

interface TestResult {
  hostname: string
  expectedSlug: string | null
  actualSlug: string | null
  isValid: boolean
  passed: boolean
}

export function testOrganizationDetection(): TestResult[] {
  const testCases = [
    // Valid subdomain cases
    {
      hostname: 'tuguegaraoleague.gritdp.com',
      expectedSlug: 'tuguegaraoleague',
      description: 'Valid organization subdomain'
    },
    {
      hostname: 'spupathletics.gritdp.com',
      expectedSlug: 'spupathletics',
      description: 'Valid organization subdomain'
    },
    {
      hostname: 'cagayanesports.gritdp.com',
      expectedSlug: 'cagayanesports',
      description: 'Valid organization subdomain'
    },
    
    // Invalid cases
    {
      hostname: 'www.gritdp.com',
      expectedSlug: null,
      description: 'WWW subdomain (invalid)'
    },
    {
      hostname: 'admin.gritdp.com',
      expectedSlug: null,
      description: 'Admin subdomain (invalid)'
    },
    {
      hostname: 'gritdp.com',
      expectedSlug: null,
      description: 'No subdomain'
    },
    {
      hostname: 'example.com',
      expectedSlug: null,
      description: 'Wrong domain'
    },
    {
      hostname: 'test.otherdomain.com',
      expectedSlug: null,
      description: 'Wrong domain'
    },
    
    // Edge cases
    {
      hostname: 'very-long-organization-name.gritdp.com',
      expectedSlug: 'very-long-organization-name',
      description: 'Long organization name'
    },
    {
      hostname: 'org123.gritdp.com',
      expectedSlug: 'org123',
      description: 'Organization with numbers'
    },
    {
      hostname: 'test_org.gritdp.com',
      expectedSlug: 'test_org',
      description: 'Organization with underscore'
    }
  ]

  const results: TestResult[] = []

  // Test the subdomain extraction logic directly
  for (const testCase of testCases) {
    const parts = testCase.hostname.split('.')
    let actualSlug: string | null = null
    let isValid = false
    
    // Check if we're on a subdomain
    if (parts.length >= 3 && parts[parts.length - 2] === 'gritdp' && parts[parts.length - 1] === 'com') {
      actualSlug = parts[0]
      isValid = true
    }
    
    const passed = actualSlug === testCase.expectedSlug
    
    results.push({
      hostname: testCase.hostname,
      expectedSlug: testCase.expectedSlug,
      actualSlug,
      isValid,
      passed
    })
  }

  return results
}

export function displayTestResults(): void {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('Organization detection tests only available in development mode')
    return
  }

  console.group('🧪 Organization Detection Tests')
  console.log('Testing subdomain extraction and validation logic\n')
  
  const results = testOrganizationDetection()
  const passed = results.filter(r => r.passed).length
  const total = results.length
  
  console.log(`📊 Results: ${passed}/${total} tests passed\n`)
  
  results.forEach((result, index) => {
    const status = result.passed ? '✅' : '❌'
    const slugDisplay = result.actualSlug === 'ERROR' ? 'ERROR' : `"${result.actualSlug}"`
    
    console.log(`${status} Test ${index + 1}: ${result.hostname}`)
    console.log(`   Expected: ${result.expectedSlug ? `"${result.expectedSlug}"` : 'null'}`)
    console.log(`   Actual: ${slugDisplay}`)
    console.log(`   Valid Domain: ${result.isValid}`)
    
    if (!result.passed) {
      console.log(`   ⚠️  Test Failed!`)
    }
    console.log('')
  })
  
  console.groupEnd()
  
  // Summary
  if (passed === total) {
    console.log('🎉 All tests passed! Organization detection is working correctly.')
  } else {
    console.log(`⚠️  ${total - passed} tests failed. Please check the implementation.`)
  }
}

// Environment-specific test
export function testEnvironmentDetection(): void {
  console.group('🌍 Environment Detection Test')
  
  const context = {
    slug: process.env.NEXT_PUBLIC_ORG_SLUG || null,
    isValid: !!process.env.NEXT_PUBLIC_ORG_SLUG,
    domain: typeof window !== 'undefined' ? window.location.hostname : 'localhost'
  }
  
  console.log('Current Environment Context:')
  console.log(`  Organization Slug: ${context.slug}`)
  console.log(`  Is Valid: ${context.isValid}`)
  console.log(`  Domain: ${context.domain}`)
  console.log(`  Environment Variable: ${process.env.NEXT_PUBLIC_ORG_SLUG || 'not set'}`)
  
  // Test environment variable override simulation
  console.log('\nEnvironment Override Test:')
  console.log(`  If NEXT_PUBLIC_ORG_SLUG is set, it would override subdomain detection`)
  console.log(`  Current value: ${process.env.NEXT_PUBLIC_ORG_SLUG || 'not set'}`)
  
  console.groupEnd()
}
