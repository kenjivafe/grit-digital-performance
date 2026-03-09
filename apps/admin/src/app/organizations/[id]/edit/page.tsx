'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
import AdminPageHeader from '@/components/admin/admin-page-header'
import {
  AdminOrganizationRecord,
  getAdminOrganizationById,
  upsertAdminOrganization,
} from '@/lib/admin-organizations-store'

export default function EditOrganizationPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [org, setOrg] = useState<AdminOrganizationRecord | null>(() => {
    if (!id) return null
    return getAdminOrganizationById(id)
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const canSave = Boolean(org?.name.trim() && org?.contactPerson.trim())

  const handleSave = () => {
    if (!org || !canSave) return
    upsertAdminOrganization({ ...org, logoUrl: logoPreview ?? org.logoUrl })
    router.push(`/admin/organizations/${org.id}`)
  }

  if (!org) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Organization" description="Organization not found" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Edit Organization"
        description={org.name}
        actions={
          <Button onClick={handleSave} disabled={!canSave}>
            <FloppyDisk className="h-4 w-4 mr-2" />
            Save
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={org.name}
              onChange={(e) => setOrg({ ...org, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={org.type}
              onValueChange={(v) => setOrg({ ...org, type: v as AdminOrganizationRecord['type'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="League">League</SelectItem>
                <SelectItem value="School">School</SelectItem>
                <SelectItem value="Club">Club</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalEventsHosted">Total Events Hosted</Label>
            <Input
              id="totalEventsHosted"
              type="number"
              min={0}
              value={org.totalEventsHosted}
              onChange={(e) => setOrg({ ...org, totalEventsHosted: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person</Label>
            <Input
              id="contact"
              value={org.contactPerson}
              onChange={(e) => setOrg({ ...org, contactPerson: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={org.email}
              onChange={(e) => setOrg({ ...org, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={org.phone}
              onChange={(e) => setOrg({ ...org, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Logo (mock upload)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = URL.createObjectURL(file)
                setLogoPreview(url)
              }}
            />
            {(logoPreview || org.logoUrl) ? (
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                  <Image
                    src={logoPreview ?? org.logoUrl ?? ''}
                    alt="Logo preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/organizations/${org.id}`}>View profile</Link>
                </Button>
              </div>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="logoUrl">Logo URL (optional)</Label>
            <Input
              id="logoUrl"
              value={org.logoUrl ?? ''}
              onChange={(e) => setOrg({ ...org, logoUrl: e.target.value || undefined })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
