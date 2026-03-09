'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from '@phosphor-icons/react'
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
  getAdminEvents,
  upsertAdminEvent,
} from '@/lib/admin-events-store'

export default function NewEventPage() {
  const router = useRouter()

  const organizations = useMemo(() => {
    return Array.from(new Set(getAdminEvents().map((e) => e.organizationName))).sort()
  }, [])

  const [name, setName] = useState('')
  const [organizationName, setOrganizationName] = useState(organizations[0] ?? '')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [registrationStatus, setRegistrationStatus] = useState<'Open' | 'Closed'>('Open')
  const [price, setPrice] = useState<number>(0)
  const [registrationsCount, setRegistrationsCount] = useState<number>(0)
  const [registrationLimit, setRegistrationLimit] = useState<number>(0)
  const [description, setDescription] = useState('')
  const [schedule, setSchedule] = useState('')
  const [bannerImage, setBannerImage] = useState('')

  const canSave =
    name.trim().length > 0 &&
    organizationName.trim().length > 0 &&
    date.trim().length > 0 &&
    location.trim().length > 0

  const handleCreate = () => {
    if (!canSave) return

    const event: AdminEventRecord = {
      id: `evt_${Date.now()}`,
      name: name.trim(),
      organizationName: organizationName.trim(),
      date,
      location: location.trim(),
      registrationStatus,
      price: Number.isFinite(price) ? price : 0,
      registrationsCount: Number.isFinite(registrationsCount) ? registrationsCount : 0,
      registrationLimit: registrationLimit > 0 ? registrationLimit : undefined,
      description: description.trim() || undefined,
      schedule: schedule.trim() || undefined,
      bannerImage: bannerImage.trim() || undefined,
    }

    upsertAdminEvent(event)
    router.push('/admin/events')
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Create Event"
        description="Create a new tournament or competition"
        actions={
          <Button onClick={handleCreate} disabled={!canSave}>
            <Plus className="h-4 w-4 mr-2" />
            Create
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Soccer Camp"
            />
          </div>

          <div className="space-y-2">
            <Label>Organization</Label>
            <Select value={organizationName} onValueChange={setOrganizationName}>
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
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Denver, CO"
            />
          </div>

          <div className="space-y-2">
            <Label>Registration Status</Label>
            <Select value={registrationStatus} onValueChange={(v) => setRegistrationStatus(v as 'Open' | 'Closed')}>
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
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Registration Limit</Label>
            <Input
              id="limit"
              type="number"
              value={registrationLimit}
              onChange={(e) => setRegistrationLimit(Number(e.target.value))}
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Registrations Count</Label>
            <Input
              id="count"
              type="number"
              value={registrationsCount}
              onChange={(e) => setRegistrationsCount(Number(e.target.value))}
              min={0}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="banner">Banner Image URL</Label>
            <Input
              id="banner"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              placeholder="/images/events/banner.jpg or https://..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Textarea
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="Day 1: ...\nDay 2: ..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


