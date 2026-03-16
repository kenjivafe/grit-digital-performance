'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  CurrencyDollar,
  Users,
  MagnifyingGlass, 
  Plus,
  ChartLine
} from '@phosphor-icons/react'
import { useRequireAuth } from '@/lib/client-auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LoadingState } from '@/components/admin/loading-states'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { formatCurrency, formatDateShort } from '@/lib/admin-utils'


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
  organization: {
    id: string
    name: string
    slug: string
  }
  category?: {
    id: string
    name: string
  } | null
  categoryId?: string | null
  _count: {
    registrations: number
  }
}

interface Organization {
  id: string
  name: string
  slug: string
}

const statusVariant = (status: string) => {
  if (status === 'published') return 'default'
  if (status === 'completed') return 'secondary'
  if (status === 'cancelled') return 'destructive'
  if (status === 'draft') return 'outline'
  return 'outline'
}

export default function EventsPage() {
  const { loading, authenticated } = useRequireAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOrg, setFilterOrg] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true)
        
        const eventsResponse = await fetch('/api/events?admin=true')
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventsData = await eventsResponse.json()
        
        const orgsResponse = await fetch('/api/organizations')
        if (!orgsResponse.ok) {
          throw new Error('Failed to fetch organizations')
        }
        const orgsData = await orgsResponse.json()
        
        setEvents(eventsData.data || [])
        setOrganizations(orgsData.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setDataLoading(false)
      }
    }

    if (authenticated) {
      fetchData()
    }
  }, [authenticated])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !searchTerm ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === 'all' || event.status === filterStatus
      const matchesOrg = filterOrg === 'all' || event.organizationId === filterOrg
      const matchesCategory = filterCategory === 'all' || event.categoryId === filterCategory

      return matchesSearch && matchesStatus && matchesOrg && matchesCategory
    })
  }, [events, searchTerm, filterStatus, filterOrg, filterCategory])

  if (loading) {
    return <LoadingState type="page" message="Loading events..." />
  }

  if (!authenticated) {
    return <LoadingState type="page" message="Authentication required" />
  }

  if (dataLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader
          title="Events"
          description="Manage sports events and tournaments"
          actions={
            <Button asChild size="sm">
              <Link href="/events/new">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Event</span>
                <span className="sm:hidden">New</span>
              </Link>
            </Button>
          }
        />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading events...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader
          title="Events"
          description="Manage sports events and tournaments"
          actions={
            <Button asChild size="sm">
              <Link href="/events/new">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Event</span>
                <span className="sm:hidden">New</span>
              </Link>
            </Button>
          }
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
        title="Events"
        description="Manage sports events and tournaments"
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {filteredEvents.length} events
            </div>
            <Button asChild size="sm">
              <Link href="/events/new">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Add Event</span>
                <span className="sm:hidden">New</span>
              </Link>
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">+2</Badge> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.reduce((sum, event) => sum + event._count.registrations, 0)}</div>
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
              ${events.reduce((sum, event) => sum + (event.price * event._count.registrations), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">+20%</Badge> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Published Events</CardTitle>
            <ChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.filter(event => event.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((events.filter(event => event.status === 'published').length / events.length) * 100) || 0}% published
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:col-span-2">

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterOrg} onValueChange={setFilterOrg}>
              <SelectTrigger>
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Array.from(new Set(events.filter(e => e.category).map(e => JSON.stringify(e.category)))).map((catStr) => {
                  const cat = JSON.parse(catStr)
                  return (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.name}</div>
                      {event.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {event.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{event.organization.name}</TableCell>
                  <TableCell>
                    {event.category ? (
                      <Badge variant="outline">{event.category.name}</Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">Uncategorized</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDateShort(event.startDate)}</div>
                      {event.endDate !== event.startDate && (
                        <div className="text-muted-foreground">
                          to {formatDateShort(event.endDate)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {event.virtual ? (
                        <Badge variant="outline">Virtual</Badge>
                      ) : (
                        event.location || 'TBD'
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <CurrencyDollar className="h-3 w-3" />
                      {formatCurrency(event.price, event.currency)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event._count.registrations}
                      {event.maxParticipants && (
                        <span className="text-muted-foreground">
                          /{event.maxParticipants}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/events/${event.slug}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredEvents.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              No events found.
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
