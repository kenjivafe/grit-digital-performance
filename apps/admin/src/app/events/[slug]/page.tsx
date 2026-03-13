'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Download, Pencil, Users, Calendar, MapPin, CurrencyDollar } from '@phosphor-icons/react'
import { Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { formatCurrency, formatDateShort } from '@/lib/admin-utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui'

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
  _count: {
    registrations: number
  }
}

interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
}

function exportParticipantsCsv(eventName: string, rows: Registration[]) {
  const header = ['Name', 'Email', 'Status', 'Payment Status', 'Registration Date']

  const csvRows = rows.map((p) => [
    p.name,
    p.email,
    p.status,
    p.paymentStatus,
    new Date(p.createdAt).toLocaleDateString(),
  ])

  const csv = [header, ...csvRows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${eventName.toLowerCase().replace(/\s+/g, '-')}-participants.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function EventDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch all events and find by slug
        const eventsResponse = await fetch('/api/events?admin=true')
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await eventsResponse.json()
        
        if (eventsData.success && eventsData.data) {
          const foundEvent = eventsData.data.find((e: Event) => e.slug === slug)
          if (foundEvent) {
            setEvent(foundEvent)
            
            // Fetch registrations for this event
            const registrationsResponse = await fetch(`/api/registrations?admin=true`)
            if (registrationsResponse.ok) {
              const registrationsData = await registrationsResponse.json()
              if (registrationsData.success && registrationsData.data) {
                const eventRegistrations = registrationsData.data.filter(
                  (r: Registration) => r.eventId === foundEvent.id
                )
                setRegistrations(eventRegistrations)
              }
            }
          } else {
            setError('Event not found')
          }
        } else {
          setError('Failed to fetch events')
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Event" description="Loading..." />
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
        <AdminPageHeader title="Event" description="Event not found" />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error || 'Event not found'}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const revenue = event.price * registrations.filter(r => r.paymentStatus === 'paid').length

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title={event.name}
        description={event.organization.name}
        actions={
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Link href={`/events/${event.slug}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-base mb-2">{event.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description || 'No description provided'}
              </p>
              <div className="text-xs text-blue-600 font-mono mb-2">/{event.slug}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{formatDateShort(event.startDate)}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.startDate).toLocaleTimeString()} - {new Date(event.endDate).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">
                    {event.virtual ? 'Virtual Event' : event.location || 'TBD'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.virtual ? 'Online' : 'In-person'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CurrencyDollar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{formatCurrency(event.price)}</div>
                  <div className="text-xs text-muted-foreground">per participant</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{registrations.length} registered</div>
                  <div className="text-xs text-muted-foreground">
                    {event.maxParticipants ? `/ ${event.maxParticipants} max` : 'No limit'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={
                event.status === 'published' ? 'default' :
                event.status === 'completed' ? 'secondary' :
                event.status === 'cancelled' ? 'destructive' : 'outline'
              }>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Organization:</span>
              <Button asChild variant="outline" size="sm">
                <Link href={`/organizations/${event.organization.slug}`}>
                  {event.organization.name}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-medium">{formatCurrency(revenue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Paid Registrations</span>
                <span className="font-medium">
                  {registrations.filter(r => r.paymentStatus === 'paid').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Pending Registrations</span>
                <span className="font-medium">
                  {registrations.filter(r => r.paymentStatus === 'pending').length}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href={`/events/${event.slug}/edit`}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Event
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => exportParticipantsCsv(event.name, registrations)}
                disabled={registrations.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Participants
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href={`/organizations/${event.organization.slug}`}>
                  <Users className="h-4 w-4 mr-2" />
                  View Organization
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {registrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Participants ({registrations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>
                      <Badge variant={
                        registration.status === 'confirmed' ? 'default' :
                        registration.status === 'cancelled' ? 'destructive' : 'outline'
                      }>
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        registration.paymentStatus === 'paid' ? 'default' :
                        registration.paymentStatus === 'refunded' ? 'destructive' : 'outline'
                      }>
                        {registration.paymentStatus.charAt(0).toUpperCase() + registration.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDateShort(registration.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
