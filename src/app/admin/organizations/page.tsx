'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { 
  BuildingOffice,
  Plus,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AdminPageHeader from '@/components/admin/admin-page-header'
import {
  getAdminOrganizations,
  deleteAdminOrganization,
  type AdminOrganizationRecord,
} from '@/lib/admin-organizations-store'
import { formatDateShort } from '@/lib/admin-utils'

export default function OrganizationsManagement() {
  const [organizations, setOrganizations] = useState<AdminOrganizationRecord[]>(() =>
    getAdminOrganizations()
  )
  const [searchTerm, setSearchTerm] = useState('')

  const [filterType, setFilterType] = useState<'all' | AdminOrganizationRecord['type']>('all')

  const types = useMemo(() => {
    return Array.from(new Set(organizations.map((o) => o.type)))
  }, [organizations])

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === 'all' || org.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Organizations"
        description="Manage sports organizations / clients"
        actions={
          <Button asChild>
            <Link href="/admin/organizations/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Link>
          </Button>
        }
      />

      {/* Search + Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setFilterType('all')
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Total Events Hosted</TableHead>
                <TableHead className="text-right">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.type}</Badge>
                  </TableCell>
                  <TableCell>{org.contactPerson}</TableCell>
                  <TableCell>{org.email}</TableCell>
                  <TableCell>{org.phone}</TableCell>
                  <TableCell className="text-right">{org.totalEventsHosted}</TableCell>
                  <TableCell className="text-right">{formatDateShort(org.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/organizations/${org.id}`}>View</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/organizations/${org.id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteAdminOrganization(org.id)
                          setOrganizations(getAdminOrganizations())
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrganizations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <BuildingOffice className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No organizations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms'
                  : 'Get started by adding your first organization'
                }
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/admin/organizations/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Organization
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
