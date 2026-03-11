'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BuildingOffice,
  Plus,
  MagnifyingGlass,
  Copy,
  Eye,
  EyeClosed,
} from '@phosphor-icons/react'
import { Button } from '@repo/ui'
import { Input } from '@repo/ui'
import { Card, CardContent } from '@repo/ui'
import { Badge } from '@repo/ui'
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

interface ApiOrganization {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  website?: string
  sportCategory: string
  apiKey: string
  active: boolean
  verified: boolean
  createdAt: string
  _count: {
    events: number
    registrations: number
  }
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<ApiOrganization[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [visibleApiKeys, setVisibleApiKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/organizations')
      const result = await response.json()
      
      console.log('API Response:', result)
      
      if (result.success) {
        setOrganizations(result.data)
      } else {
        console.error('Failed to fetch organizations:', result.error)
        console.error('Error details:', result.details)
      }
    } catch (error) {
      console.error('Error fetching organizations:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.sportCategory.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'active' && org.active) ||
        (filterStatus === 'inactive' && !org.active)

      return matchesSearch && matchesStatus
    })
  }, [organizations, searchTerm, filterStatus])

  const copyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey)
  }

  const toggleApiKeyVisibility = (orgId: string) => {
    setVisibleApiKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orgId)) {
        newSet.delete(orgId)
      } else {
        newSet.add(orgId)
      }
      return newSet
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="API Organizations"
        description="Manage organizations with API access for template websites"
        actions={
          <Button asChild size="sm">
            <Link href="/organizations/new">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Organization</span>
              <span className="sm:hidden">New</span>
            </Link>
          </Button>
        }
      />

      {/* Search + Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as typeof filterStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead className="hidden sm:table-cell">Sport</TableHead>
                <TableHead className="hidden md:table-cell">API Key</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden xl:table-cell">Events</TableHead>
                <TableHead className="hidden xl:table-cell">Registrations</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading organizations...
                  </TableCell>
                </TableRow>
              ) : filteredOrganizations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="text-muted-foreground">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'No organizations match your filters' 
                        : 'No organizations found. Create your first organization to get started.'}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.email}</div>
                        {org.website && (
                          <div className="text-sm text-blue-600">
                            <a href={org.website} target="_blank" rel="noopener noreferrer">
                              {org.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">{org.sportCategory}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {visibleApiKeys.has(org.id) ? org.apiKey : '•'.repeat(20)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleApiKeyVisibility(org.id)}
                        >
                          {visibleApiKeys.has(org.id) ? <EyeClosed className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyApiKey(org.apiKey)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Badge variant={org.active ? 'default' : 'secondary'}>
                          {org.active ? 'Active' : 'Inactive'}
                        </Badge>
                        {org.verified && (
                          <Badge variant="outline" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-center">{org._count.events}</div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-center">{org._count.registrations}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(org.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col sm:flex-row sm:inline-flex items-center gap-1 sm:gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/organizations/${org.id}`}>
                            <span className="hidden sm:inline">View</span>
                            <span className="sm:hidden">V</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


