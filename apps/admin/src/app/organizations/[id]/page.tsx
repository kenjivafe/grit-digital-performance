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
import { formatDateShort } from '@/lib/admin-utils'

interface Organization {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  website?: string
  logo?: string
  description?: string
  sportCategory?: string
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
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchOrganization = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('Failed to fetch organizations')
        }
        const result = await response.json()
        
        if (result.success && result.data) {
          const org = result.data.find((o: Organization) => o.id === id)
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
  }, [id])

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
        description={organization.sportCategory || 'Sports Organization'}
        actions={
          <Button asChild variant="outline">
            <Link href={`/organizations/${organization.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              {organization.logo ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                  <Image src={organization.logo} alt={organization.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">
                    {organization.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium text-base">{organization.name}</div>
                <div className="text-xs text-muted-foreground">{organization.email}</div>
                {organization.domain && (
                  <div className="text-xs text-blue-600">{organization.domain}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Sport Category: </span>
                <Badge variant="outline">{organization.sportCategory}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Status: </span>
                <Badge variant={organization.active ? 'default' : 'secondary'}>
                  {organization.active ? 'Active' : 'Inactive'}
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
                <span className="text-muted-foreground">Phone: </span>
                {organization.phone || 'Not provided'}
              </div>
              <div>
                <span className="text-muted-foreground">Website: </span>
                {organization.website ? (
                  <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {organization.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
              <div>
                <span className="text-muted-foreground">Billing Email: </span>
                {organization.billingEmail || organization.email}
              </div>
              <div>
                <span className="text-muted-foreground">Verified: </span>
                <Badge variant={organization.verified ? 'default' : 'outline'}>
                  {organization.verified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
            </div>

            {(organization.address || organization.city || organization.state || organization.country) && (
              <div>
                <span className="text-muted-foreground">Address: </span>
                <div className="mt-1">
                  {organization.address && <div>{organization.address}</div>}
                  {(organization.city || organization.state || organization.zipCode) && (
                    <div>
                      {[organization.city, organization.state, organization.zipCode].filter(Boolean).join(', ')}
                    </div>
                  )}
                  {organization.country && <div>{organization.country}</div>}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <span>Created: </span>
                {formatDateShort(organization.createdAt)}
              </div>
              <div>
                <span>Last Updated: </span>
                {formatDateShort(organization.updatedAt)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  <Calendar className="h-5 w-5" />
                  {organization._count.events}
                </div>
                <div className="text-xs text-muted-foreground">Total Events</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                  <Users className="h-5 w-5" />
                  {organization._count.registrations}
                </div>
                <div className="text-xs text-muted-foreground">Total Registrations</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">API Key:</span>
                <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                  {organization.apiKey}
                </code>
              </div>
            </div>

            {organization.webhookUrl && (
              <div>
                <span className="text-muted-foreground text-xs">Webhook URL:</span>
                <div className="text-xs mt-1 truncate">{organization.webhookUrl}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
