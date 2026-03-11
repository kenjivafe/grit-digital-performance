'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { MagnifyingGlass, Users, CurrencyDollar, Calendar, TrendingUp } from '@phosphor-icons/react'
import { Button } from '@repo/ui'
import { Badge } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { Input } from '@repo/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { formatDateShort } from '@/lib/admin-utils'

interface Registration {
  id: string
  eventId: string
  organizationId: string
  participantId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  amount: number
  currency: string
  paid: boolean
  paidAt?: string
  status: 'pending' | 'confirmed' | 'waitlisted' | 'cancelled' | 'refunded'
  source: string
  createdAt: string
  updatedAt: string
  event: {
    id: string
    name: string
    startDate: string
    endDate: string
    price: number
    currency: string
  }
  organization: {
    id: string
    name: string
    slug: string
  }
}

const statusVariant = (status: string) => {
  if (status === 'confirmed') return 'default'
  if (status === 'refunded') return 'secondary'
  if (status === 'cancelled') return 'destructive'
  if (status === 'waitlisted') return 'outline'
  return 'outline'
}

export default function RegistrationsPage() {
  const [search, setSearch] = useState('')
  const [eventId, setEventId] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        const registrationsResponse = await fetch('/api/registrations?admin=true')
        if (!registrationsResponse.ok) {
          throw new Error('Failed to fetch registrations')
        }
        const registrationsData = await registrationsResponse.json()
        
        const eventsResponse = await fetch('/api/events?admin=true')
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await eventsResponse.json()
        
        setRegistrations(registrationsData.data || [])
        setEvents(eventsData.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((reg) => {
      const matchesSearch =
        !search ||
        `${reg.firstName} ${reg.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        reg.email.toLowerCase().includes(search.toLowerCase())

      const matchesEvent = eventId === 'all' || reg.eventId === eventId
      const matchesStatus = status === 'all' || reg.status === status

      return matchesSearch && matchesEvent && matchesStatus
    })
  }, [registrations, eventId, status, search])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader
          title="Registrations"
          description="Manage event registrations"
          actions={[]}
        />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading registrations...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader
          title="Registrations"
          description="Manage event registrations"
          actions={[]}
        />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">Error: {error}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Registrations"
        description="Manage event registrations and payments"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {filteredRegistrations.length} registrations
            </div>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">+12%</Badge> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CurrencyDollar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${registrations.reduce((sum, reg) => sum + reg.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">+20%</Badge> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(reg => reg.status === 'confirmed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((registrations.filter(reg => reg.status === 'confirmed').length / registrations.length) * 100) || 0}% confirmed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(reg => reg.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((registrations.filter(reg => reg.status === 'pending').length / registrations.length) * 100) || 0}% pending
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name or email..."
                className="pl-10"
              />
            </div>

            <Select value={eventId} onValueChange={setEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="waitlisted">Waitlisted</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">
                    {reg.firstName} {reg.lastName}
                  </TableCell>
                  <TableCell>{reg.email}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{reg.event.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDateShort(reg.event.startDate)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{reg.organization.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(reg.status)}>
                      {reg.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CurrencyDollar className="h-3 w-3" />
                      {reg.amount} {reg.currency}
                    </div>
                  </TableCell>
                  <TableCell>{formatDateShort(reg.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/registrations/${reg.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRegistrations.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              No registrations found.
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
