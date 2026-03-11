import { useEffect } from 'react'
import { getOrganizationContext } from '@/lib/organization'

interface InvalidOrganizationProps {
  detectedSubdomain?: string | null
}

export function InvalidOrganization({ detectedSubdomain }: InvalidOrganizationProps) {
  useEffect(() => {
    // Log the invalid organization attempt for debugging
    if (detectedSubdomain) {
      console.warn(`Invalid organization subdomain detected: ${detectedSubdomain}`)
    }
  }, [detectedSubdomain])

  const context = getOrganizationContext()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Grit Hub</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Organization Not Found
            </h2>
            
            <p className="text-gray-600 mb-6">
              {detectedSubdomain 
                ? `The organization "${detectedSubdomain}" was not found in our system.`
                : 'No valid organization could be detected from this domain.'
              }
            </p>

            {/* Possible Solutions */}
            <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Possible solutions:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check the organization name in the URL</li>
                <li>• Ensure you're using the correct subdomain format</li>
                <li>• Contact the organization administrator</li>
                <li>• Visit our main site to find organizations</li>
              </ul>
            </div>

            {/* Example URLs */}
            <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">Example URLs:</h3>
              <ul className="text-sm text-blue-800 space-y-1 font-mono">
                <li>• tuguegaraoleague.gritdp.com</li>
                <li>• spupathletics.gritdp.com</li>
                <li>• cagayanesports.gritdp.com</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href="https://gritdp.com"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Find Organizations
              </a>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>

            {/* Debug Info (only in development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <p className="font-medium text-yellow-800 mb-1">Debug Information:</p>
                <div className="text-yellow-700 space-y-1">
                  <p>Detected Subdomain: {detectedSubdomain || 'null'}</p>
                  <p>Current Domain: {context.domain}</p>
                  <p>Is Valid: {context.isValid ? 'true' : 'false'}</p>
                  <p>Environment Variable: {process.env.NEXT_PUBLIC_ORG_SLUG || 'not set'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by Grit Digital Performance</p>
        <p className="mt-1">
          Need help?{' '}
          <a href="mailto:support@gritdp.com" className="text-blue-600 hover:text-blue-800">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
