'use client'

import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import "./globals.css"
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/dashboard/theme-provider'
import { SidebarProvider, SidebarInset } from '@repo/ui'
import AdminSidebar from '@/components/admin/sidebar'
import { ErrorBoundary } from '@/components/admin/error-boundary'
import { NotificationProvider } from '@/components/admin/notifications'
import './admin.css'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Don't render sidebar on auth pages
  const isAuthPage = pathname?.includes('/auth')
  
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider>
            {isAuthPage ? (
              children
            ) : (
              <NotificationProvider>
                <SidebarProvider
                  style={{
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                  } as React.CSSProperties}
                >
                  <AdminSidebar />
                  <SidebarInset>
                    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 pt-3 sm:pt-4 min-h-0 admin-layout">
                      <ErrorBoundary>
                        {children}
                      </ErrorBoundary>
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </NotificationProvider>
            )}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}


