import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Grit Hub - Sports Events & Registration',
    template: '%s | Grit Hub'
  },
  description: 'Join sports events, tournaments, and community activities. Register online for individual and team events in your area.',
  keywords: ['sports', 'events', 'registration', 'tournaments', 'community', 'athletics'],
  authors: [{ name: 'Grit Digital Performance' }],
  creator: 'Grit Digital Performance',
  publisher: 'Grit Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gritdp.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gritdp.com',
    title: 'Grit Hub - Sports Events & Registration',
    description: 'Join sports events, tournaments, and community activities. Register online for individual and team events in your area.',
    siteName: 'Grit Hub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Grit Hub - Sports Events Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grit Hub - Sports Events & Registration',
    description: 'Join sports events, tournaments, and community activities. Register online for individual and team events in your area.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Grit Hub",
              "url": "https://gritdp.com",
              "description": "Sports events and registration platform for communities and organizations",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://gritdp.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://www.facebook.com/gritdp",
                "https://twitter.com/gritdp",
                "https://www.instagram.com/gritdp"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
