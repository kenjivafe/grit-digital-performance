'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FloppyDisk, ArrowLeft, Calendar as PhCalendar, MapPin, CurrencyDollar, Users } from '@phosphor-icons/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AdminPageHeader from '@/components/admin/admin-page-header'
import { toast } from 'sonner'
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar } from "@/components/ui/calendar"

interface Event {
  id: string
  organizationId: string
  name: string
  slug: string
  description?: string
  startDate: string
  endDate: string
  location?: string
  categoryId?: string
  maxParticipants?: number
  price: number
  currency: string
  registrationType: 'individual' | 'team'
  priceType: 'per_head' | 'per_team'
  registrationStart: string
  registrationEnd: string
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

interface Category {
  id: string
  name: string
}

export default function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const slug = unwrappedParams?.slug

  const [event, setEvent] = useState<Event | null>(null)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)

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

  useEffect(() => {
    const fetchCategories = async () => {
      if (!event?.organizationId) return

      try {
        setIsCategoriesLoading(true)
        const response = await fetch(`/api/organizations/${event.organizationId}/categories`)
        const result = await response.json()
        if (result.success) {
          setCategories(result.data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [event?.organizationId])

  const handleSave = async () => {
    if (!event) return

    setIsSaving(true)
    setSaveError('')

    // Generate new slug based on current name
    const newSlug = generateSlug(event.name)

    try {
      const response = await fetch(`/api/events/${event.id}?admin=true`, {
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
          maxParticipants: event.maxParticipants,
          price: event.price,
          currency: event.currency,
          registrationType: event.registrationType,
          priceType: event.priceType,
          registrationStart: event.registrationStart,
          registrationEnd: event.registrationEnd,
          status: event.status,
          categoryId: event.categoryId || null,
        }),
      })

      let result;
      try {
        result = await response.json()
      } catch (jsonError) {
        throw new Error(`Failed to parse response: ${response.status} ${response.statusText}`)
      }

      if (result.success) {
        console.log('Event successfully updated:', result.data || result);
        toast.success("Event updated successfully", {
          description: `${event.name} has been updated.`,
        })
        router.push(`/events/${newSlug}`)
      } else {
        const errorPayload = result.error || result.message || result;
        let errorMessage = 'Unknown error occurred';

        if (typeof errorPayload === 'string') {
          errorMessage = errorPayload;
        } else if (errorPayload && typeof errorPayload === 'object') {
          errorMessage = (errorPayload as any).message || (errorPayload as any).error || JSON.stringify(errorPayload);
        } else if (errorPayload) {
          errorMessage = String(errorPayload);
        }

        // Create a more helpful description if the error is generic or redundant
        const finalDescription = (errorMessage === 'Failed to update event' || errorMessage === 'Unknown error occurred') 
          ? "We couldn't save your changes. Please try again."
          : errorMessage;

        toast.error("Update Failed", {
          description: finalDescription,
        })
        setSaveError(errorMessage !== '"{}"' ? errorMessage : 'Failed to update event')
      }
    } catch (error) {
      toast.error("Update Error", {
        description: "A technical problem prevented saving your changes. Please try again.",
      })
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

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={event.categoryId || 'none'}
              onValueChange={(value) => setEvent({ ...event, categoryId: value === 'none' ? undefined : value })}
              disabled={isCategoriesLoading || categories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={isCategoriesLoading ? "Loading categories..." : categories.length === 0 ? "No categories available" : "Select category"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Category</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {event.organizationId && categories.length === 0 && !isCategoriesLoading && (
              <p className="text-xs text-muted-foreground">
                No categories defined for this organization. You can add them in <Link href={`/organizations/${organizations.find(o => o.id === event.organizationId)?.slug}/edit`} className="text-blue-600 hover:underline">Organization Settings</Link>.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <DatePicker
                value={event.startDate}
                onChange={(value) => setEvent({ ...event, startDate: value })}
                placeholder="Select start date and time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <DatePicker
                value={event.endDate}
                onChange={(value) => setEvent({ ...event, endDate: value })}
                placeholder="Select end date and time"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationType">Registration Type</Label>
              <Select
                value={event.registrationType}
                onValueChange={(value) => setEvent({ ...event, registrationType: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {event.registrationType === 'team' && (
              <div className="space-y-2">
                <Label htmlFor="priceType">Price Type</Label>
                <Select
                  value={event.priceType}
                  onValueChange={(value) => setEvent({ ...event, priceType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per_head">Per Head</SelectItem>
                    <SelectItem value="per_team">Per Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price {event.priceType === 'per_head' ? '(per head)' : '(per team)'}</Label>
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

          <div className="border-t pt-4">
            <Label className="text-base font-semibold">Registration Dates</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="registrationStart">Registration Start</Label>
                <DatePicker
                  value={event.registrationStart}
                  onChange={(value) => setEvent({ ...event, registrationStart: value })}
                  placeholder="Select registration start"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationEnd">Registration End</Label>
                <DatePicker
                  value={event.registrationEnd}
                  onChange={(value) => setEvent({ ...event, registrationEnd: value })}
                  placeholder="Select registration end"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 border-t pt-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
