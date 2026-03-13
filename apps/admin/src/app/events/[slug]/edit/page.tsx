'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FloppyDisk, ArrowLeft, Calendar, MapPin, CurrencyDollar, Users } from '@phosphor-icons/react'
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

interface Event {
  id: string
  organizationId: string
  name: string
  slug: string
  description?: string
  startDate: string
  endDate: string
  location?: string
  virtual: boolean
  maxParticipants?: number
  price: number
  currency: string
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  createdAt: string
  updatedAt: string
  organization: {
    id: string
    name: string
    slug: string
  }
}

interface Organization {
  id: string
  name: string
  slug: string
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  const [event, setEvent] = useState<Event | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const currentSlug = generateSlug(event?.name || '')

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch all events and organizations
        const [eventsResponse, orgsResponse] = await Promise.all([
          fetch('/api/events?admin=true'),
          fetch('/api/organizations')
        ])

        if (!eventsResponse.ok || !orgsResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const eventsData = await eventsResponse.json()
        const orgsData = await orgsResponse.json()
        
        if (eventsData.success && eventsData.data) {
          const foundEvent = eventsData.data.find((e: Event) => e.slug === slug)
          if (foundEvent) {
            setEvent(foundEvent)
          } else {
            setError('Event not found')
          }
        }

        if (orgsData.success && orgsData.data) {
          setOrganizations(orgsData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleSave = async () => {
    if (!event) return

    setIsSaving(true)
    setSaveError('')

    // Generate new slug based on current name
    const newSlug = generateSlug(event.name)

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.name,
          slug: newSlug,
          description: event.description,
          organizationId: event.organizationId,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          virtual: event.virtual,
          maxParticipants: event.maxParticipants,
          price: event.price,
          currency: event.currency,
          status: event.status,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update event')
      }

      const result = await response.json()
      if (result.success) {
        router.push(`/events/${newSlug}`)
      } else {
        setSaveError(result.error || 'Failed to update event')
      }
    } catch (error) {
      console.error('Error updating event:', error)
      setSaveError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Event" description="Loading..." />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading event details...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Event" description="Event not found" />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error || 'Event not found'}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Edit Event"
        description={event.name}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/events/${event.slug}`}>
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
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={event.description || ''}
              onChange={(e) => setEvent({ ...event, description: e.target.value || undefined })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization</Label>
            <Select
              value={event.organizationId}
              onValueChange={(value) => setEvent({ ...event, organizationId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={event.price}
                onChange={(e) => setEvent({ ...event, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={event.currency}
                onValueChange={(value) => setEvent({ ...event, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="PHP">PHP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                value={event.maxParticipants || ''}
                onChange={(e) => setEvent({ ...event, maxParticipants: parseInt(e.target.value) || undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={event.location || ''}
                onChange={(e) => setEvent({ ...event, location: e.target.value || undefined })}
                placeholder="Event location (leave blank for virtual)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={event.status}
                onValueChange={(value) => setEvent({ ...event, status: value as Event['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="virtual">Event Type</Label>
              <Select
                value={event.virtual.toString()}
                onValueChange={(value) => setEvent({ ...event, virtual: value === 'true' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">In-Person</SelectItem>
                  <SelectItem value="true">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
