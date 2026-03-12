'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FloppyDisk, ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { Input } from '@repo/ui'
import { Label } from '@repo/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui'
import { Textarea } from '@repo/ui'
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

export default function EditOrganizationPage() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const currentSlug = generateSlug(organization?.name || '')

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

  const handleSave = async () => {
    if (!organization) return

    setIsSaving(true)
    setSaveError('')

    // Generate new slug based on current name
    const newSlug = organization.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: organization.name,
          slug: newSlug,
          email: organization.email,
          phone: organization.phone,
          website: organization.website,
          description: organization.description,
          domain: organization.domain,
          address: organization.address,
          city: organization.city,
          state: organization.state,
          zipCode: organization.zipCode,
          country: organization.country,
          billingEmail: organization.billingEmail,
          active: organization.active,
          verified: organization.verified,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update organization')
      }

      const result = await response.json()
      if (result.success) {
        router.push(`/organizations/${newSlug}`)
      } else {
        setSaveError(result.error || 'Failed to update organization')
      }
    } catch (error) {
      console.error('Error updating organization:', error)
      setSaveError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Organization" description="Loading..." />
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
        <AdminPageHeader title="Edit Organization" description="Organization not found" />
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
        title="Edit Organization"
        description={organization.name}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/organizations/${organization.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <FloppyDisk className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        }
      />

      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {saveError}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={organization.name}
              onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>URL Slug</Label>
            <div className="flex items-center gap-2">
              <Input
                value={currentSlug}
                disabled
                className="font-mono text-sm bg-muted"
              />
              <div className="text-xs text-muted-foreground">
                Auto-generated from name
              </div>
            </div>
          </div>
        </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={organization.email}
              onChange={(e) => setOrganization({ ...organization, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={organization.phone || ''}
              onChange={(e) => setOrganization({ ...organization, phone: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={organization.website || ''}
              onChange={(e) => setOrganization({ ...organization, website: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              value={organization.domain || ''}
              onChange={(e) => setOrganization({ ...organization, domain: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email</Label>
            <Input
              id="billingEmail"
              type="email"
              value={organization.billingEmail || ''}
              onChange={(e) => setOrganization({ ...organization, billingEmail: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={organization.address || ''}
              onChange={(e) => setOrganization({ ...organization, address: e.target.value || undefined })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={organization.city || ''}
                onChange={(e) => setOrganization({ ...organization, city: e.target.value || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={organization.state || ''}
                onChange={(e) => setOrganization({ ...organization, state: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={organization.zipCode || ''}
                onChange={(e) => setOrganization({ ...organization, zipCode: e.target.value || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={organization.country || ''}
                onChange={(e) => setOrganization({ ...organization, country: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={organization.description || ''}
              onChange={(e) => setOrganization({ ...organization, description: e.target.value || undefined })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={organization.webhookUrl || ''}
                onChange={(e) => setOrganization({ ...organization, webhookUrl: e.target.value || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripeAccountId">Stripe Account ID</Label>
              <Input
                id="stripeAccountId"
                value={organization.stripeAccountId || ''}
                onChange={(e) => setOrganization({ ...organization, stripeAccountId: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={organization.active.toString()}
                onValueChange={(v) => setOrganization({ ...organization, active: v === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Verification Status</Label>
              <Select
                value={organization.verified.toString()}
                onValueChange={(v) => setOrganization({ ...organization, verified: v === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Verified</SelectItem>
                  <SelectItem value="false">Not Verified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <div className="flex gap-2">
              <Input
                value="••••••••••••••••••••••••••••••••"
                disabled
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(organization.apiKey)}
              >
                Copy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
