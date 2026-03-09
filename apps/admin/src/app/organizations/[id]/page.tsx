'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Pencil } from '@phosphor-icons/react'
import { Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import AdminPageHeader from '@/components/admin/admin-page-header'
import { getAdminOrganizationById } from '@/lib/admin-organizations-store'
import { formatDateShort } from '@/lib/admin-utils'

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const org = useMemo(() => {
    if (!id) return null
    return getAdminOrganizationById(id)
  }, [id])

  if (!org) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Organization" description="Organization not found" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title={org.name}
        description={org.type}
        actions={
          <Button asChild variant="outline">
            <Link href={`/admin/organizations/${org.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              {org.logoUrl ? (
                <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                  <Image src={org.logoUrl} alt={org.name} fill className="object-cover" />
                </div>
              ) : null}
              <div>
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-muted-foreground">{org.email}</div>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Type: </span>
              <Badge variant="outline">{org.type}</Badge>
            </div>

            <div>
              <span className="text-muted-foreground">Contact: </span>
              {org.contactPerson}
            </div>

            <div>
              <span className="text-muted-foreground">Phone: </span>
              {org.phone}
            </div>

            <div>
              <span className="text-muted-foreground">Created: </span>
              {formatDateShort(org.createdAt)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Total Events Hosted: </span>
              {org.totalEventsHosted}
            </div>
            <div className="text-muted-foreground">
              Portfolio projects and hosted events will appear here.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
