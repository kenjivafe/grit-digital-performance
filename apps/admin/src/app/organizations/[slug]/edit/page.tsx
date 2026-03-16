'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FloppyDisk, ArrowLeft, Plus, Pencil, Trash, Tag, IdentificationCard, Info } from '@phosphor-icons/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AdminPageHeader from '@/components/admin/admin-page-header'
import { toast } from 'sonner'

interface Organization {
  id: string
  name: string
  slug: string
  email: string
  phone?: string
  website?: string
  logo?: string
  description?: string
  domain?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  apiKey: string
  webhookUrl?: string
  stripeAccountId?: string
  billingEmail?: string
  active: boolean
  verified: boolean
  createdAt: string
  updatedAt: string
  _count: {
    events: number
    registrations: number
  }
}

interface Category {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export default function EditOrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter()
  const unwrappedParams = use(params)
  const slug = unwrappedParams?.slug

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Category state
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const currentSlug = generateSlug(organization?.name || '')

  useEffect(() => {
    if (!slug) return

    const fetchOrganization = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/organizations')
        if (!response.ok) {
          throw new Error('Failed to fetch organizations')
        }
        const result = await response.json()

        if (result.success && result.data) {
          const org = result.data.find((o: Organization) => o.slug === slug)
          if (org) {
            setOrganization(org)
          } else {
            setError('Organization not found')
          }
        } else {
          setError('Failed to fetch organizations')
        }
      } catch (error) {
        console.error('Error fetching organization:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchOrganization()
  }, [slug])

  const fetchCategories = async () => {
    if (!organization?.id) return
    try {
      setIsCategoriesLoading(true)
      const response = await fetch(`/api/organizations/${organization.id}/categories`)
      const result = await response.json()
      if (result.success) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsCategoriesLoading(false)
    }
  }

  useEffect(() => {
    if (organization?.id) {
      fetchCategories()
    }
  }, [organization?.id])

  const handleCategorySubmit = async () => {
    if (!organization?.id || !categoryName) return

    try {
      const url = editingCategory 
        ? `/api/organizations/${organization.id}/categories/${editingCategory.id}`
        : `/api/organizations/${organization.id}/categories`
      
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName, description: categoryDescription })
      })

      const result = await response.json()
      if (result.success) {
        toast.success(editingCategory ? "Category updated" : "Category created")
        setIsCategoryDialogOpen(false)
        setEditingCategory(null)
        setCategoryName('')
        setCategoryDescription('')
        fetchCategories()
      } else {
        toast.error("Error", { description: result.error })
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to save category" })
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!organization?.id || !confirm('Are you sure you want to delete this category?')) return

    try {
      const response = await fetch(`/api/organizations/${organization.id}/categories/${id}`, {
        method: 'DELETE'
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Category deleted")
        fetchCategories()
      } else {
        toast.error("Error", { description: result.error })
      }
    } catch (error) {
      toast.error("Error", { description: "Failed to delete category" })
    }
  }

  const openCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryName(category.name)
      setCategoryDescription(category.description || '')
    } else {
      setEditingCategory(null)
      setCategoryName('')
      setCategoryDescription('')
    }
    setIsCategoryDialogOpen(true)
  }

  const handleSave = async () => {
    if (!organization) return

    setIsSaving(true)
    setSaveError('')

    // Generate new slug based on current name
    const newSlug = organization.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: organization.name,
          slug: newSlug,
          email: organization.email,
          phone: organization.phone,
          website: organization.website,
          description: organization.description,
          domain: organization.domain,
          address: organization.address,
          city: organization.city,
          state: organization.state,
          zipCode: organization.zipCode,
          country: organization.country,
          billingEmail: organization.billingEmail,
          active: organization.active,
          verified: organization.verified,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update organization')
      }

      const result = await response.json()
      if (result.success) {
        toast.success("Organization updated successfully", {
          description: `${organization.name} has been updated.`,
        })
        router.push(`/organizations/${newSlug}`)
      } else {
        const errorMessage = result.error || 'Unknown error occurred';
        const finalDescription = (errorMessage === 'Failed to update organization' || errorMessage === 'Unknown error occurred') 
          ? "We couldn't save your changes. Please try again."
          : errorMessage;

        toast.error("Update Failed", {
          description: finalDescription,
        })
        setSaveError(errorMessage)
      }
    } catch (error) {
      toast.error("Update Error", {
        description: "A technical problem prevented saving your changes. Please try again.",
      })
      setSaveError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Organization" description="Loading..." />
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading organization details...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !organization) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-4">
        <AdminPageHeader title="Edit Organization" description="Organization not found" />
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error || 'Organization not found'}</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-4">
      <AdminPageHeader
        title="Edit Organization"
        description={organization.name}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={`/organizations/${organization.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <FloppyDisk className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        }
      />

      {saveError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {saveError}
        </div>
      )}

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Organization Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={organization.name}
                    onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={currentSlug}
                      disabled
                      className="font-mono text-sm bg-muted"
                    />
                    <div className="text-xs text-muted-foreground">
                      Auto-generated from name
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={organization.email}
                    onChange={(e) => setOrganization({ ...organization, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={organization.phone || ''}
                    onChange={(e) => setOrganization({ ...organization, phone: e.target.value || undefined })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={organization.website || ''}
                    onChange={(e) => setOrganization({ ...organization, website: e.target.value || undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={organization.domain || ''}
                    onChange={(e) => setOrganization({ ...organization, domain: e.target.value || undefined })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingEmail">Billing Email</Label>
                <Input
                  id="billingEmail"
                  type="email"
                  value={organization.billingEmail || ''}
                  onChange={(e) => setOrganization({ ...organization, billingEmail: e.target.value || undefined })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={organization.address || ''}
                  onChange={(e) => setOrganization({ ...organization, address: e.target.value || undefined })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={organization.city || ''}
                    onChange={(e) => setOrganization({ ...organization, city: e.target.value || undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={organization.state || ''}
                    onChange={(e) => setOrganization({ ...organization, state: e.target.value || undefined })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={organization.zipCode || ''}
                    onChange={(e) => setOrganization({ ...organization, zipCode: e.target.value || undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={organization.country || ''}
                    onChange={(e) => setOrganization({ ...organization, country: e.target.value || undefined })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={organization.description || ''}
                  onChange={(e) => setOrganization({ ...organization, description: e.target.value || undefined })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={organization.webhookUrl || ''}
                    onChange={(e) => setOrganization({ ...organization, webhookUrl: e.target.value || undefined })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripeAccountId">Stripe Account ID</Label>
                  <Input
                    id="stripeAccountId"
                    value={organization.stripeAccountId || ''}
                    onChange={(e) => setOrganization({ ...organization, stripeAccountId: e.target.value || undefined })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={organization.active.toString()}
                    onValueChange={(v) => setOrganization({ ...organization, active: v === 'true' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Verification Status</Label>
                  <Select
                    value={organization.verified.toString()}
                    onValueChange={(v) => setOrganization({ ...organization, verified: v === 'true' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Verified</SelectItem>
                      <SelectItem value="false">Not Verified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </CardContent>
            <CardFooter className="justify-end border-t-0 pt-0 pb-6">
              <Button onClick={handleSave} disabled={isSaving}>
                <FloppyDisk className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg font-medium">Event Categories</CardTitle>
                <CardDescription>
                  Manage the categories available for events created by this organization.
                </CardDescription>
              </div>
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={() => openCategoryDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                    <DialogDescription>
                      Give this category a clear name and optional description.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cat-name">Category Name</Label>
                      <Input
                        id="cat-name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="e.g., Basketball, Leagues, Summer Camps, Tournaments"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cat-desc">Description (Optional)</Label>
                      <Textarea
                        id="cat-desc"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Brief description of the category..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCategorySubmit} disabled={!categoryName}>
                      {editingCategory ? 'Save Changes' : 'Create Category'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {isCategoriesLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="font-medium">No categories found</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get started by adding your first event category.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => openCategoryDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Category
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {category.description || '-'}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openCategoryDialog(category)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
