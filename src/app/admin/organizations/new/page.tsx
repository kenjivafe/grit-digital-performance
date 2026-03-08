'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AdminPageHeader from '@/components/admin/admin-page-header'
import {
  AdminOrganizationRecord,
  getAdminOrganizations,
  upsertAdminOrganization,
} from '@/lib/admin-organizations-store'

export default function NewOrganizationPage() {
  const router = useRouter()

  const existingNames = useMemo(() => getAdminOrganizations().map((o) => o.name), [])

  const [name, setName] = useState('')
  const [type, setType] = useState<AdminOrganizationRecord['type']>('Club')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [totalEventsHosted, setTotalEventsHosted] = useState<number>(0)
  const [logoUrl, setLogoUrl] = useState('')

  const canSave = name.trim().length > 0 && contactPerson.trim().length > 0

  const handleCreate = () => {
    if (!canSave) return

    const org: AdminOrganizationRecord = {
      id: `org_${Date.now()}`,
      name: name.trim(),
      type,
      contactPerson: contactPerson.trim(),
      email: email.trim() || 'contact@example.com',
      phone: phone.trim() || '(000) 000-0000',
      totalEventsHosted: Number.isFinite(totalEventsHosted) ? totalEventsHosted : 0,
      logoUrl: logoUrl.trim() || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    upsertAdminOrganization(org)
    router.push('/admin/organizations')
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Add Organization"
        description="Create a new sports organization / client"
        actions={
          <Button onClick={handleCreate} disabled={!canSave}>
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Denver Soccer Academy"
              list="org-names"
            />
            <datalist id="org-names">
              {existingNames.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as AdminOrganizationRecord['type'])}>
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
              value={totalEventsHosted}
              onChange={(e) => setTotalEventsHosted(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL (optional)</Label>
            <Input
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="/images/orgs/logo.png or https://..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
