'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, ArrowLeft } from '@phosphor-icons/react'
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
import Link from 'next/link'

interface Organization {
  id: string
  name: string
  slug: string
}

export default function NewEventPage() {
  const router = useRouter()

  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [organizationId, setOrganizationId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [maxParticipantsPerTeam, setMaxParticipantsPerTeam] = useState<number | undefined>(undefined)
  const [price, setPrice] = useState<number | ''>('')
  const [currency, setCurrency] = useState('USD')
  const [priceType, setPriceType] = useState<'per_head' | 'per_team'>('per_head')
  const [status, setStatus] = useState<'draft' | 'published' | 'cancelled' | 'completed'>('draft')
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual')

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const currentSlug = generateSlug(name)

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('Failed to fetch organizations')
        }
        const result = await response.json()
        
        if (result.success && result.data) {
          setOrganizations(result.data)
          if (result.data.length > 0) {
            setOrganizationId(result.data[0].id)
          }
        } else {
          setError('Failed to fetch organizations')
        }
      } catch (error) {
        console.error('Error fetching organizations:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  const canSave =
    name.trim().length > 0 &&
    organizationId &&
    startDate &&
    endDate

  const handleCreate = async () => {
    if (!canSave) return

    setIsCreating(true)
    setError('')

    try {
      const eventData = {
          name: name.trim(),
          slug: currentSlug,
          description: description.trim() || undefined,
          organizationId,
          startDate,
          endDate,
          location: location.trim() || undefined,
          maxParticipantsPerTeam: registrationType === 'team' ? (maxParticipantsPerTeam && maxParticipantsPerTeam > 0 ? maxParticipantsPerTeam : undefined) : undefined,
          price: price === '' ? 0 : Number.isFinite(price) ? price : 0,
          currency,
          priceType: registrationType === 'team' ? priceType : 'per_head',
          status,
          registrationType,
        }
        
        console.log('Sending event data:', eventData)

      const response = await fetch('/api/events?admin=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      console.log('API Response status:', response.status)
      console.log('API Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`Failed to create event: ${response.status} ${errorText}`)
      }

      const result = await response.json()
      console.log('API Success Response:', result)
      
      if (result.success) {
        router.push(`/events/${currentSlug}`)
      } else {
        setError(result.error || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsCreating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Create Event" description="Loading..." />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading organizations...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Create Event"
        description="Create a new sports event"
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button onClick={handleCreate} disabled={!canSave || isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              {isCreating ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Select
                value={organizationId}
                onValueChange={setOrganizationId}
                disabled={organizations.length === 0}
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
              {organizations.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No organizations available. <Link href="/organizations/new" className="text-blue-600 hover:underline">Create one first</Link>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as typeof status)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Event location"
            />
          </div>

          {registrationType === 'individual' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationType">Registration Type</Label>
                <Select
                  value={registrationType}
                  onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Registration</SelectItem>
                    <SelectItem value="team">Team Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (per head)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value) || '')}
                  placeholder="0.00"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={currency}
                  onValueChange={setCurrency}
                >
                  <SelectTrigger className="w-full">
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
          )}

          {registrationType === 'team' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationType">Registration Type</Label>
                  <Select
                    value={registrationType}
                    onValueChange={(value) => setRegistrationType(value as 'individual' | 'team')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual Registration</SelectItem>
                      <SelectItem value="team">Team Registration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipantsPerTeam">Max Participants Per Team</Label>
                  <Input
                    id="maxParticipantsPerTeam"
                    type="number"
                    min="1"
                    value={maxParticipantsPerTeam || ''}
                    onChange={(e) => setMaxParticipantsPerTeam(parseInt(e.target.value) || undefined)}
                    placeholder="Leave empty for no limit"
                    className="w-full"
                  />
                </div>
                <div className="col-span-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceType">Price Type</Label>
                  <Select
                    value={priceType}
                    onValueChange={(value) => setPriceType(value as 'per_head' | 'per_team')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_head">Per Head</SelectItem>
                      <SelectItem value="per_team">Per Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price ({priceType === 'per_head' ? 'per head' : 'per team'})
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value) || '')}
                    placeholder="0.00"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={currency}
                    onValueChange={setCurrency}
                  >
                    <SelectTrigger className="w-full">
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
