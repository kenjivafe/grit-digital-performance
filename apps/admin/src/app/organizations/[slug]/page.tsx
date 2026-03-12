'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Pencil, Users, Calendar } from '@phosphor-icons/react'
import { Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'

interface Organization {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  website?: string
  logo?: string
  description?: string
  domain?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  apiKey: string
  webhookUrl?: string
  stripeAccountId?: string
  billingEmail?: string
  active: boolean
  verified: boolean
  createdAt: string
  updatedAt: string
  _count: {
    events: number
    registrations: number
  }
}

export default function OrganizationDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchOrganization = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('Failed to fetch organizations')
        }
        const result = await response.json()
        
        if (result.success && result.data) {
          const org = result.data.find((o: Organization) => o.slug === slug)
          if (org) {
            setOrganization(org)
          } else {
            setError('Organization not found')
          }
        } else {
          setError('Failed to fetch organizations')
        }
      } catch (error) {
        console.error('Error fetching organization:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchOrganization()
  }, [slug])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Organization" description="Loading..." />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading organization details...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !organization) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Organization" description="Organization not found" />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error || 'Organization not found'}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title={organization.name}
        description="Sports Organization"
        actions={
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Link href={`/organizations/${organization.slug}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                {organization.logo ? (
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {organization.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-base">{organization.name}</div>
                <div className="text-xs text-muted-foreground">{organization.email}</div>
                <div className="text-xs text-blue-600 font-mono">/{organization.slug}</div>
                {organization.domain && (
                  <div className="text-xs text-blue-600">{organization.domain}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Status: </span>
                <Badge variant={organization.active ? 'default' : 'secondary'}>
                  {organization.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Verified: </span>
                <Badge variant={organization.verified ? 'default' : 'outline'}>
                  {organization.verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
            </div>

            {organization.description && (
              <div>
                <span className="text-muted-foreground">Description: </span>
                <p className="mt-1">{organization.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Email: </span>
                <div>{organization.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Phone: </span>
                <div>{organization.phone || 'Not provided'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Website: </span>
                <div>
                  {organization.website ? (
                    <Link href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {organization.website}
                    </Link>
                  ) : 'Not provided'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Domain: </span>
                <div>{organization.domain || 'Not provided'}</div>
              </div>
            </div>

            {(organization.address || organization.city || organization.state || organization.zipCode || organization.country) && (
              <div>
                <span className="text-muted-foreground">Address: </span>
                <div className="mt-1">
                  {organization.address && <div>{organization.address}</div>}
                  {(organization.city || organization.state || organization.zipCode) && (
                    <div>
                      {organization.city && organization.city}
                      {organization.city && organization.state && ', '}
                      {organization.state && organization.state}
                      {(organization.city || organization.state) && organization.zipCode && ' '}
                      {organization.zipCode && organization.zipCode}
                    </div>
                  )}
                  {organization.country && <div>{organization.country}</div>}
                </div>
              </div>
            )}

            <div>
              <span className="text-muted-foreground">API Key: </span>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                  {organization.apiKey.substring(0, 8)}••••••••••••••••••••••••••••••••
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(organization.apiKey)}
                >
                  Copy
                </Button>
              </div>
            </div>

            {organization.webhookUrl && (
              <div>
                <span className="text-muted-foreground">Webhook URL: </span>
                <div className="font-mono text-sm break-all">{organization.webhookUrl}</div>
              </div>
            )}

            {organization.billingEmail && (
              <div>
                <span className="text-muted-foreground">Billing Email: </span>
                <div>{organization.billingEmail}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-medium">{organization._count.events}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Registrations</span>
                <span className="font-medium">{organization._count.registrations}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href={`/organizations/${organization.slug}/edit`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Organization
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href={`/events?organization=${organization.id}`}>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Events
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href={`/registrations?organization=${organization.id}`}>
                  <Users className="h-4 w-4 mr-2" />
                  View Registrations
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
