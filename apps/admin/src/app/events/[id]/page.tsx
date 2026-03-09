'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Download, Pencil } from '@phosphor-icons/react'
import { Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { getAdminEventById } from '@/lib/admin-events-store'
import { mockParticipants } from '@/lib/admin-mock-data'
import { formatCurrency, formatDateShort } from '@/lib/admin-utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui'

function exportParticipantsCsv(eventName: string, rows: typeof mockParticipants) {
  const header = ['Name', 'Email', 'Event', 'Payment Status', 'Registration Date']

  const csvRows = rows.map((p) => [
    p.name,
    p.email,
    p.eventName,
    p.paymentStatus,
    p.registrationDate,
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
  const params = useParams<{ id: string }>()
  const id = params?.id

  const event = useMemo(() => {
    if (!id) return null
    return getAdminEventById(id)
  }, [id])

  const participants = useMemo(() => {
    if (!event) return []
    return mockParticipants.filter((p) => p.eventName === event.name)
  }, [event])

  if (!event) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Event" description="Event not found" />
      </div>
    )
  }

  const revenue = event.price * event.registrationsCount

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title={event.name}
        description={event.organizationName}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => exportParticipantsCsv(event.name, participants)}
              disabled={participants.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Participants CSV
            </Button>
            <Button asChild variant="outline">
              <Link href={`/admin/events/${event.id}/edit`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.registrationStatus === 'Open' ? 'default' : 'secondary'}>
                {event.registrationStatus}
              </Badge>
              {event.registrationLimit != null ? (
                <Badge variant="outline">Limit: {event.registrationLimit}</Badge>
              ) : null}
            </div>

            <div>
              <span className="text-muted-foreground">Date: </span>
              {formatDateShort(event.date)}
            </div>
            <div>
              <span className="text-muted-foreground">Location: </span>
              {event.location}
            </div>
            <div>
              <span className="text-muted-foreground">Price: </span>
              {formatCurrency(event.price)}
            </div>
            <div>
              <span className="text-muted-foreground">Registrations: </span>
              {event.registrationsCount}
            </div>
            <div>
              <span className="text-muted-foreground">Revenue: </span>
              {formatCurrency(revenue)}
            </div>

            {event.description ? (
              <div className="pt-2">
                <div className="text-muted-foreground">Description</div>
                <div>{event.description}</div>
              </div>
            ) : null}

            {event.schedule ? (
              <div className="pt-2">
                <div className="text-muted-foreground">Schedule</div>
                <pre className="text-xs whitespace-pre-wrap">{event.schedule}</pre>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Event analytics will appear here (registrations over time, revenue, and payment status breakdown).
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Participants</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>
                    <Badge variant={p.paymentStatus === 'Paid' ? 'default' : 'secondary'}>
                      {p.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateShort(p.registrationDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {participants.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">
              No participants registered yet.
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
