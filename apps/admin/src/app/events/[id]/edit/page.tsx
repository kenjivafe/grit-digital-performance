'use client'

import { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FloppyDisk } from '@phosphor-icons/react'
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
import {
  AdminEventRecord,
  getAdminEventById,
  getAdminEvents,
  upsertAdminEvent,
} from '@/lib/admin-events-store'

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  const organizations = useMemo(() => {
    return Array.from(new Set(getAdminEvents().map((e) => e.organizationName))).sort()
  }, [])

  const [event, setEvent] = useState<AdminEventRecord | null>(() => {
    if (!id) return null
    return getAdminEventById(id)
  })

  const canSave = Boolean(event?.name.trim() && event?.organizationName.trim())

  const handleSave = () => {
    if (!event || !canSave) return
    upsertAdminEvent(event)
    router.push(`/admin/events/${event.id}`)
  }

  if (!event) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Event" description="Event not found" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Edit Event"
        description={event.name}
        actions={
          <Button onClick={handleSave} disabled={!canSave}>
            <FloppyDisk className="h-4 w-4 mr-2" />
            Save
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={event.name}
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Organization</Label>
            <Select
              value={event.organizationName}
              onValueChange={(v) => setEvent({ ...event, organizationName: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org} value={org}>
                    {org}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Registration Status</Label>
            <Select
              value={event.registrationStatus}
              onValueChange={(v) => setEvent({ ...event, registrationStatus: v as 'Open' | 'Closed' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={event.price}
              min={0}
              onChange={(e) => setEvent({ ...event, price: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Registration Limit</Label>
            <Input
              id="limit"
              type="number"
              value={event.registrationLimit ?? 0}
              min={0}
              onChange={(e) => {
                const value = Number(e.target.value)
                setEvent({ ...event, registrationLimit: value > 0 ? value : undefined })
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Registrations Count</Label>
            <Input
              id="count"
              type="number"
              value={event.registrationsCount}
              min={0}
              onChange={(e) => setEvent({ ...event, registrationsCount: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="banner">Banner Image URL</Label>
            <Input
              id="banner"
              value={event.bannerImage ?? ''}
              onChange={(e) => setEvent({ ...event, bannerImage: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={event.description ?? ''}
              onChange={(e) => setEvent({ ...event, description: e.target.value || undefined })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Textarea
              id="schedule"
              value={event.schedule ?? ''}
              onChange={(e) => setEvent({ ...event, schedule: e.target.value || undefined })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
