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
import { createOrganization } from '@/lib/events-api'

export default function NewOrganizationPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [sportCategory, setSportCategory] = useState('')
  const [billingEmail, setBillingEmail] = useState('')
  const [description, setDescription] = useState('')

  const canSave = name.trim().length > 0 && 
                 email.trim().length > 0 && 
                 sportCategory.trim().length > 0 &&
                 billingEmail.trim().length > 0

  const handleCreate = async () => {
    if (!canSave) return

    setIsCreating(true)
    setError('')

    try {
      const result = await createOrganization({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        website: website.trim() || undefined,
        sportCategory: sportCategory.trim(),
        billingEmail: billingEmail.trim(),
      })

      if (result.success && result.data) {
        // Redirect to organizations page (not admin/organizations)
        router.push('/organizations')
      } else {
        setError(result.error || 'Failed to create organization')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error creating organization:', err)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Add Organization"
        description="Create a new sports organization with API access"
        actions={
          <Button onClick={handleCreate} disabled={!canSave || isCreating}>
            <Plus className="h-4 w-4 mr-2" />
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        }
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Organization Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter organization name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@organization.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://organization.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sportCategory">Sport Category *</Label>
            <Select value={sportCategory} onValueChange={setSportCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Soccer">Soccer</SelectItem>
                <SelectItem value="Baseball">Baseball</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Track">Track & Field</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Billing Email *</Label>
            <Input
              id="billingEmail"
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              placeholder="billing@organization.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the organization..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
