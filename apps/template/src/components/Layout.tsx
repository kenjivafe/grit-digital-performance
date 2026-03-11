import { ReactNode } from 'react'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Organization Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Grit Hub</span>
              </div>
              <p className="text-gray-600 text-sm">
                Powered by Grit Digital Performance platform. 
                Bringing sports organizations and communities together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/events" className="text-gray-600 hover:text-gray-900 text-sm">
                    All Events
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Get in Touch
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">
                  Questions about events or registration?
                </p>
                <a 
                  href="mailto:info@gritdp.com" 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  info@gritdp.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Grit Digital Performance. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Container component for consistent page layouts
interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

// Page header component
interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
            {children && (
              <div className="mt-4 md:mt-0 md:ml-6">
                {children}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

// Loading skeleton for pages
export function PageSkeleton() {
  return (
    <Layout>
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <Container>
          <div className="py-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}
